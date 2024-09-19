const cron = require('node-cron');
const { updateCourseProgress } = require('./services/progress'); // Импортируй функцию обновления

// Планируем задачу на выполнение каждый день в 12:00
cron.schedule('0 0 * * *', async () => {
  console.log('Updating course progress...');
  try {
    await updateCourseProgress();
    console.log('Course progress updated successfully');
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
});
