const { Telegraf } = require('telegraf');


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('welcome STRAPI WORKS!'));
bot.command('start', (ctx) => ctx.reply('ping'));

bot.launch(
    {
        webhook: {
            domain: 'taroai-546ac6a4db3b.herokuapp.com/payment',
            path: '/telegraf/' + process.env.WEBHOOK_SECRET
        }
    }
).then(() => console.log('Telegram bot is running...'))
    .catch(error => console.error('Failed to start bot:', error));

module.exports = bot;


