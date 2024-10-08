const bot = require('../../../../config/tg-bot');
module.exports = {
    async telegraf(ctx) {
        const { secret } = ctx.params;

        if (secret !== process.env.WEBHOOK_SECRET) {
            return ctx.send('Forbidden', 403);
        }

        try {
            const update = ctx.request.body;
            if (update.message && update.message.text === '/start') {
                const userId = update.message.from.id;
                const imageUrl = 'https://breathwell.space/uploads/welcome_b444b0c832.jpg';
    
                await bot.telegram.sendPhoto(userId, imageUrl, {
                    caption: `*Давай дышать вместе! 🌬️*\n\nПриветствую тебя 👋 Ты оказался в нужном месте, чтобы открыть в себе новую суперспособность — твоё дыхание.\n\nПредставь, что у тебя всегда под рукой есть секретный инструмент против стресса и усталости. Да-да, это твое дыхание! И я уверен, что ты даже не представляешь, насколько оно мощное. Вместе мы будем учиться простым, но невероятно полезным техникам, которые помогут тебе чувствовать себя спокойнее, собраннее и заряжаться энергией буквально на ходу.\n\nЭто не просто упражнения — это твой новый друг, который всегда готов поддержать, где бы ты ни был. Давай начнем, я тебе всё покажу!`,
                    parse_mode: 'Markdown'
                });
            }
            if (update.pre_checkout_query) {
                const { id, from, invoice_payload, shipping_option_id, order_info } = update.pre_checkout_query;
                const allGoodsAvailable = true;

                if (allGoodsAvailable) {
                    await bot.telegram.answerPreCheckoutQuery(id, true);
                } else {
                    await bot.telegram.answerPreCheckoutQuery(id, false, "Sorry, the item you wanted is no longer available. Please choose another item.");
                }
            }
            // Обработка успешного платежа
            else if (update.message && update.message.successful_payment) {
                const { invoice_payload, total_amount, currency, date } = update.message.successful_payment;
                const paymentStatus = "Paid";
                const userId = update.message.from.id;
                const user = await strapi.query('plugin::users-permissions.user').findOne({
                    where: { tg_id: userId },
                });

                const existingPayment = await strapi.query('api::payment.payment').findOne({
                    where: { user: user.id, status: paymentStatus },
                });
                if (existingPayment) {
                    // Обновляем существующую запись
                    await strapi.query('api::payment.payment').update({
                        where: { id: existingPayment.id },
                        data: {
                            total_amount,
                            currency,
                            status: paymentStatus,
                            payment_date: date,
                        }
                    });
                } else {
                    // Создаём новую запись
                    await strapi.query('api::payment.payment').create({
                        data: {
                            total_amount,
                            currency,
                            status: paymentStatus,
                            payment_date: date,
                            user: user.id,
                        }
                    });
                }
                const imageUrl = 'https://breathwell.space/uploads/premium_buy_256b9236be.jpg';
                await bot.telegram.sendPhoto(user.tg_id, imageUrl, {
                    caption: `Поздравляю, ты успешно оплатил Премиум доступ к курсу! \n\nТеперь тебе доступен полный функционал приложения, включая уроки, ежедневные задания и аудио практики.`,
                    parse_mode: 'Markdown'
                });
                await strapi.query('plugin::users-permissions.user').update({
                    where: { tg_id: userId },
                    data: { premium: true }
                });

            } else {
                console.error('Invalid update data:', update);
            }

            ctx.send('123');
        } catch (e) {
            console.error('Error handling payment or pre-checkout query:', e.message);
            ctx.send('Internal error', 500);
        }
    },
    async getInvoice(ctx, next) {
        const user = ctx.state.user;
        const body = ctx.request.body;
        const date = new Date();
        if (!user) {
            return ctx.unauthorized('You must be logged in to perform this action');
        }

        const payment = await strapi.query('api::payment.payment').create({
            data: {
                total_amount: body.amount ? body.amount : 1900,
                currency: body.currency ? body.currency : 'XTR',
                status: 'Pending',
                payment_date: date,
                user: user.id
            }
        });

        const invoice = {
            title: `BreathWell Premium`,
            description: 'Breath well course is good!',
            payload: payment.id.toString(),
            provider_token: process.env.PROVIDER_TOKEN ?? '',
            currency: body.currency ? body.currency : 'XTR',
            prices: [{ label: `Premium`, amount: body.amount ? body.amount : 1900 }],
        }

        const invoiceLink = await bot.telegram.createInvoiceLink(invoice);
        ctx.send({url: invoiceLink});
    }


};
