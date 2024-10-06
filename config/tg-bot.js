const { Telegraf } = require('telegraf');
const axios = require('axios');


const bot = new Telegraf(process.env.BOT_TOKEN);

const checkServerReady = async () => {
    try {
        await axios.get(`${process.env.STRAPI_URL}`);
        return true;
    }catch(e) {
        return false
    }
}

const setupWebhook = async () => {
    const maxRetries = 10;
    let retries = 0;

    while (retries < maxRetries) {
        if (await checkServerReady()) {
            try {
                await bot.telegram.setWebhook(`${process.env.STRAPI_URL}/api/payment/telegraf/${process.env.WEBHOOK_SECRET}`);
                console.log('Вебхук успешно установлен.');
                return;
            } catch (error) {
                console.error('Ошибка установки вебхука:', error.message);
            }
        } else {
            console.log('Сервер еще не готов, повторная попытка через 5 секунд...');
            await new Promise(res => setTimeout(res, 5000)); // Ждем 5 секунд перед повторной проверкой
            retries++;
        }
    }

    console.error('Не удалось установить вебхук после нескольких попыток.');
};


bot.launch().then(() => {
    console.log('Бот Telegraf запущен.');
    
}).catch(error => console.error('Ошибка запуска бота:', error));
setupWebhook(); // Установка вебхука после запуска бота
module.exports = bot;


