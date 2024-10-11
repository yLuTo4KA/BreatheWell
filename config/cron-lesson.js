const bot = require("./tg-bot");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    "0 20 * * *": async ({ strapi }) => {
        try {
            const pageSize = 100;
            let page = 1;
            let incompleteUsers;

            do {
                incompleteUsers = await strapi.db.query('api::course-progress.course-progress').findMany({
                    where: {
                        todayComplete: false,
                    },
                    populate: {
                        user: true,
                        lesson: true
                    },
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                });

                for (const progress of incompleteUsers) {
                    const user = progress.user;
                    if (user && user.tg_id) {
                        const imageUrl = 'https://breathwell.space/uploads/lesson_notification_f564b8638b.jpg';

                        await bot.telegram.sendPhoto(user.tg_id, imageUrl, {
                            caption: `Хочу напомнить про сегодняшний урок... \n\nЗаверши его, чтобы открыть доступ к следующему.`,
                            parse_mode: 'Markdown',
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: 'Начать урок', url: `https://t.me/${process.env.BOT_NAME}/${process.env.BOT_START}?startapp=${progress.lesson.id}` }
                                    ]
                                ]
                            }
                        });
                    }
                }

                await delay(500);
                page++;
            } while (incompleteUsers.length > 0);

        } catch (error) {
            console.error('Ошибка отправки сообщений: ', error);
        }
    },
    "59 23 * * *": async ({ strapi }) => {
        try {
            const currentDate = new Date();
            let page = 1;
            const pageSize = 100;
            let users;

            do {
                users = await strapi.query('plugin::users-permissions.user').findMany({
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                });

                for (const user of users) {
                    let currentStreak = user.activeDays;
                    let prevStreak = user.prevActiveDays;
                    const prevActiveDate = new Date(user.prevActiveDate);

                    if (user.lastActiveDate) {
                        const lastActiveDate = new Date(user.lastActiveDate);
                        // @ts-ignore
                        const diffInMs = currentDate - lastActiveDate;
                        const diffInDay = diffInMs / (1000 * 60 * 60 * 24);
                        console.log(diffInDay);
                        if (diffInDay > 1) {
                            if (user.activeDays >= 1) {
                                prevStreak = user.activeDays;
                                prevActiveDate.setDate(prevActiveDate.getDate() - Math.floor(diffInDay))
                                console.log(diffInDay);
                                console.log(prevActiveDate.getDate());
                            }
                            currentStreak = 0;
                        }
                        if (diffInDay > 7) {
                            prevStreak = 0;
                        }
                    }
                    await strapi.query('plugin::users-permissions.user').update({
                        where: { id: user.id },
                        data: { todayActive: false, activeDays: currentStreak, prevActiveDays: prevStreak, prevActiveDate: prevActiveDate },
                    });
                }

                await delay(500);
                page++;
            } while (users.length > 0);

            strapi.log.info('Параметр пользователей успешно обновлен');

        } catch (e) {
            console.log(e);
        }
    },

};