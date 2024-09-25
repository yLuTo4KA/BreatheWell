// path: src/extensions/users-permissions/strapi-server.js




module.exports = (plugin) => {
    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');
    const bot = require('../../../config/tg-bot');
    // Перезаписываем стандартную функцию регистрации
    plugin.controllers.auth.register = async (ctx) => {
        const { initData } = ctx.request.body;


        if (!initData || !validateInitData(initData)) {
            return ctx.badRequest('Invalid initData');
        }
        const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({
            where: { type: 'authenticated' },
        });

        const userData = parseUserData(initData);
        // Используем новый API для работы с пользователями
        let user = await strapi.query('plugin::users-permissions.user').findOne({
            where: { tg_id: userData.id },
        });
        let newUser = false;
        const avatar = await getUserAvatar(userData.id);
        const currentDate = new Date();
        if (!user) {
            // Генерация email, username, и пароля для пользователя
            newUser = true;
            const email = `${userData.id}@telegram.com`;
            const username = `${userData.username}`;
            const password = crypto.randomBytes(8).toString('hex');
            // Создаем нового пользователя
            user = await strapi.query('plugin::users-permissions.user').create({
                data: {
                    username,
                    email,
                    password,
                    confirmed: true,
                    provider: 'telegram',
                    lastVisit: currentDate,
                    avatar,
                    language_code: userData.language_code,
                    tg_id: userData.id,
                    role: authenticatedRole.id,
                },
            });
            await strapi.query('api::course-progress.course-progress').create({
                data: {
                    user: user,
                    lesson: 1,
                    tasks: [],
                    completed_lessons: [],
                }
            })
        } else {
            // Обновляем данные существующего пользователя
            newUser = false;
            let todayActive = false;
            let currentStreak = user.activeDays;
            if (user.lastActiveDate) {
                const lastActiveDate = new Date(user.lastActiveDate);
                // @ts-ignore
                const diffInMs = currentDate - lastActiveDate;
                const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
                if (diffInDay < 1) todayActive = true;
                if (diffInDay >= 2) currentStreak = 0
            }
            user = await strapi.query('plugin::users-permissions.user').update({
                where: { tg_id: userData.id },
                data: { lastVisit: new Date(), todayActive: todayActive, activeDays: currentStreak, avatar: avatar },
            });
            const progress = await strapi.db.query('api::course-progress.course-progress').findOne({
                where: { user: user },
                populate: {
                    lesson: {
                        fields: ['*'],
                    },
                }
            });
            if (progress) {
                const lastComplete = new Date(progress.lastComplete);
                // @ts-ignore
                const diffInMs = currentDate - lastComplete;
                const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
                if (diffInDay >= 1) {
                    if (progress && progress.todayComplete && progress.lesson_learned) {
                        await strapi.db.query('api::course-progress.course-progress').update({
                            where: { user: user },
                            data: {
                                todayComplete: false,
                                lesson_learned: false,
                                lastComplete: Date.now(),
                            },
                        });
                    }
                }
            }
        }

        // Генерация JWT токена
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Отправляем ответ с токеном и данными пользователя
        ctx.send({
            jwt: token,
            user,
            newUser,
        });
    };


    function validateInitData(initData) {
        const decoded = decodeURIComponent(initData);
        const arr = decoded.split('&');
        const hashIndex = arr.findIndex((str) => str.startsWith('hash='));
        const hash = arr.splice(hashIndex)[0].split('=')[1];
        arr.sort((a, b) => a.localeCompare(b));
        const dataCheckString = arr.join('\n');
        const secret = crypto.createHmac('sha256', 'WebAppData')
            .update(process.env.BOT_TOKEN)
            .digest();
        const computedHash = crypto.createHmac('sha256', secret)
            .update(dataCheckString)
            .digest('hex');

        return computedHash === hash;
    }



    function parseUserData(initData) {
        const parsedData = new URLSearchParams(initData);
        const userJson = decodeURIComponent(parsedData.get('user'));
        return JSON.parse(userJson);
    }

    async function getUserAvatar(userId) {
        const userProfilePhotos = await bot.telegram.getUserProfilePhotos(userId);
        let avatarUrl = null;

        if (userProfilePhotos.total_count > 0) {
            const photo = userProfilePhotos.photos[0][0];
            const fileId = photo.file_id;

            const file = await bot.telegram.getFile(fileId);
            avatarUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
        }
        return avatarUrl;
    }

    return plugin;
};
