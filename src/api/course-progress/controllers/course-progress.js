'use strict';


/**
 * course-progress controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');

module.exports = createCoreController('api::course-progress.course-progress', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest('User is required');
        }


        const progress = await strapi.query('api::course-progress.course-progress').findOne({
            where: { user },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                            populate: {
                                preview_icon: true,
                                task_image: true
                            }
                        },
                        lesson_preview: true,
                        lesson_icon: true,
                    }
                },
                tasks: true
            },
        });

        const formateData = {
            todayComplete: progress.todayComplete,
            lesson_learned: progress.lesson_learned,
            todayLesson: {
                id: progress.lesson.id,
                title: progress.lesson.title,
                description: progress.lesson.subtitle,
                reading_time: progress.lesson.reading_time,
                lesson_preview: baseUrl + progress.lesson.lesson_preview.url,
                icon: baseUrl + progress.lesson.lesson_icon.url
            },
            todayTasks: progress.lesson.tasks.map(task => {
                return {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    preview_icon: baseUrl + task.preview_icon.url,
                    task_image: baseUrl + task.task_image.url
                }
            }),
            completedTasks: progress.tasks.map(task => { return task.id }),
            completedLessons: progress.completed_lessons,
        }

        return formateData;
    },
    async completeTask(ctx) {
        const user = ctx.state.user;
        const { completedTasks } = ctx.request.body;
    
        if (!user) {
            return ctx.badRequest('User is required');
        }
    
        // Проверяем, что получен массив с выполненными заданиями
        if (!Array.isArray(completedTasks)) {
            return ctx.badRequest('Array of completed tasks is required');
        }
    
        // Получаем прогресс пользователя
        const progress = await strapi.query('api::course-progress.course-progress').findOne({
            where: { user },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                        }
                    },
                },
                tasks: true
            }
        });
    
        if (!progress) {
            return ctx.notFound('Progress not found');
        };
    
        // Проверяем, завершены ли все задачи текущего урока
        const allTasksCompleted = progress.lesson.tasks.length > 0 &&
            progress.lesson.tasks.every(lessonTask => completedTasks.includes(lessonTask.id));
    
        
        let todayComplete = progress.todayComplete;
        let todayLesson = progress.lesson.id;
        let completedLessons = progress.completed_lessons && progress.completed_lessons.length > 0 ? progress.completed_lessons : [];
        
        if (allTasksCompleted) {
            todayComplete = true;
            const nextLesson = await strapi.query('api::lesson.lesson').findOne({
                where: { id: { $gt: progress.lesson.id } },
                orderBy: { id: 'asc' },
                fields: ['id'],
            });
            if(!completedLessons.includes(progress.lesson.id)) {
                completedLessons.push(progress.lesson.id);
            }
    
            if (nextLesson) {
                todayLesson = nextLesson.id;
            } else {
                console.log('Это был последний урок'); 
            }
        }
       
    
        // Обновляем прогресс в базе данных
        const updatedProgress = await strapi.entityService.update('api::course-progress.course-progress', progress.id, {
            data: {
                tasks: completedTasks,
                lesson: todayLesson, 
                todayComplete,
                lastComplete: progress.todayComplete ? progress.lastComplete : Date.now(),
                completed_lessons: completedLessons, 
            },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                            populate: {
                                preview_icon: true
                            }
                        },
                        lesson_preview: true,
                        lesson_icon: true,
                    }
                },
                tasks: true
            }
        });
    
        // Формируем данные для ответа
        const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');
    
        const formateData = {
            todayComplete: updatedProgress.todayComplete,
            lesson_learned: updatedProgress.lesson_learned,
            todayLesson: {
                id: updatedProgress.lesson.id,
                title: updatedProgress.lesson.title,
                description: updatedProgress.lesson.subtitle,
                reading_time: updatedProgress.lesson.reading_time,
                lesson_preview: baseUrl + updatedProgress.lesson.lesson_preview.url,
                icon: baseUrl + updatedProgress.lesson.lesson_icon.url
            },
            todayTasks: updatedProgress.lesson.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                preview_icon: baseUrl + task.preview_icon.url
            })),
            completedTasks: updatedProgress.tasks.map(task => task.id),
            completedLessons: updatedProgress.completed_lessons
        };
    
        return formateData;
    },
    async learnLesson(ctx) {
        const user = ctx.state.user;
        const { lessonId } = ctx.request.body;
        
        if (!user) {
            return ctx.badRequest('User is required');
        }

        const progress = await strapi.query('api::course-progress.course-progress').findOne({
            where: { user },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                        }
                    },
                },
                tasks: true
            }
        });

        console.log(progress.lesson.id);
        console.log(lessonId);
        if(lessonId !== progress.lesson.id) {
            return ctx.badRequest("Lesson is not currentDay")
        }
        

        const updatedProgress = await strapi.entityService.update('api::course-progress.course-progress', progress.id, {
            data: {
                lesson_learned: true
            },
            populate: {
                lesson: {
                    fields: ['*'],
                    populate: {
                        tasks: {
                            fields: ['*'],
                            populate: {
                                preview_icon: true
                            }
                        },
                        lesson_preview: true,
                        lesson_icon: true,
                    }
                },
                tasks: true
            }
        });

        const baseUrl = process.env.BACKEND_URL || strapi.config.get('server.url');
    
        const formateData = {
            todayComplete: updatedProgress.todayComplete,
            lesson_learned: updatedProgress.lesson_learned,
            todayLesson: {
                id: updatedProgress.lesson.id,
                title: updatedProgress.lesson.title,
                description: updatedProgress.lesson.subtitle,
                reading_time: updatedProgress.lesson.reading_time,
                lesson_preview: baseUrl + updatedProgress.lesson.lesson_preview.url,
                icon: baseUrl + updatedProgress.lesson.lesson_icon.url
            },
            todayTasks: updatedProgress.lesson.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                preview_icon: baseUrl + task.preview_icon.url
            })),
            completedTasks: updatedProgress.tasks.map(task => task.id)  // Возвращаем обновленный список выполненных задач
        };

        return formateData;
        
    }
    
    
}));
