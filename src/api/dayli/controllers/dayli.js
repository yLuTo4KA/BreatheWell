module.exports = {
    async dayliCheck(ctx, next) {
        // Получение данных текущего пользователя
        const user = ctx.state.user;

        // Проверка, есть ли пользователь
        if (!user) {
            return ctx.unauthorized('You must be logged in to perform this action');
        }

        const today = new Date();
        if (user.todayActive) {
            return ctx.send({ user: user, success: false });
        }
        const currentActiveDays = user.activeDays;

        const updatedUser = await strapi.query('plugin::users-permissions.user').update({
            where: { id: user.id },
            data: { lastActiveDate: today, todayActive: true, activeDays: currentActiveDays + 1 },
        });

        ctx.send({user: updatedUser, success: true});
    },
};
