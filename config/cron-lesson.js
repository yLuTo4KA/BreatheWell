const bot = require("./tg-bot");

module.exports = {
    "0 20 * * *": async ({ strapi }) => {
        try {
            const incompleteUsers = await strapi.db.query('api::course-progress.course-progress').findMany({
                where: {
                    todayComplete: false,
                },
                populate: ['user'],
            });
        
            for (const progress of incompleteUsers) {
                const user = progress.user;

                if (user && user.tg_id) {
                    const imageUrl = 'https://breathwell.space/uploads/lesson_notification_f564b8638b.jpg';

                    await bot.telegram.sendPhoto(user.tg_id, imageUrl, {
                        caption: `Хочу напомнить про сегодняшний урок... \n\nЗаверши его, чтобы открыть доступ к следующему.`,
                        parse_mode: 'Markdown'
                    });
                }
            }
        } catch (error) {
            console.error('Ошибка отправки сообщений: ', error);
        }
    },
};