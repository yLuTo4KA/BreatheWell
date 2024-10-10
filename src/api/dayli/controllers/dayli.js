module.exports = {
    async dayliCheck(ctx, next) {
        // Получение данных текущего пользователя
        const user = ctx.state.user;
    
        // Проверка, есть ли пользователь
        if (!user) {
            return ctx.unauthorized('You must be logged in to perform this action');
        }
    
        const today = new Date();
        const prevActiveDate = new Date(user.prevActiveDate);
    
        // Проверяем, активен ли пользователь сегодня
        if (user.todayActive) {
            return ctx.send({ user: user, success: false });
        }
    
        // Проверяем, прошло ли более 2 дней с предыдущей активности
        // @ts-ignore
        const timeDiff = today - prevActiveDate; // разница в миллисекундах
        const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 дня в миллисекундах
    
        let updatedUser;
    
        if (timeDiff > twoDaysInMillis) {
            // Если прошло более 2 дней, обновляем prevActiveDate и lastActiveDate
            updatedUser = await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    lastActiveDate: today,
                    prevActiveDate: today,
                    todayActive: true,
                    activeDays: user.activeDays + 1,
                },
            });
        } else {
            // Если не прошло более 2 дней, обновляем только todayActive
            updatedUser = await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    todayActive: true,
                    activeDays: user.activeDays + 1,
                },
            });
        }
    
        ctx.send({ user: updatedUser, success: true });
    }    
};
