const bot = require("./tg-bot");

module.exports = {
    "* */5 * * *": async ({ strapi }) => {
        try {
            const incompleteUsers = await strapi.db.query('api::course-progress.course-progress').findMany({
                where: {
                    todayComplete: false,
                },
                populate: {
                    user: true,
                    lesson: true
                },
            });
            for (const progress of incompleteUsers) {
                const user = progress.user;
                console.log(progress.lesson);
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
        } catch (error) {
            console.error('Ошибка отправки сообщений: ', error);
        }
    },
};