const bot = require("./tg-bot");

module.exports = {
    "59 21 * * *": async ({ strapi }) => {
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

                if (user && user.tg_id) {
                    const imageUrl = 'https://breathwell.space/uploads/lesson_notification_f564b8638b.jpg';

                    await bot.telegram.sendPhoto(901201138, imageUrl, {
                        caption: `Хочу напомнить про сегодняшний урок... \n\nЗаверши его, чтобы открыть доступ к следующему.`,
                        parse_mode: 'Markdown',
                        reply_markup: {
                            inline_keyboard: [
                              [
                                { text: 'Начать урок', url: `https://t.me/${process.env.BOT_NAME}/${process.env.BOT_START}?lesson=${progress.lesson.id}` }
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