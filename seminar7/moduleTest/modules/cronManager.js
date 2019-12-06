const cron = require('node-cron');
const jobList = [];
module.exports = {
    addTask: (syntax, task, immediate = false) => {
        const job = cron.schedule(syntax, task, {scheduled: immediate});
        const idx = jobList.push(job) - 1;
        return idx;
    },
    startTask: (idx) => {
        jobList[idx].start();
    },
    stopTask: (idx) => {
        jobList[idx].stop();
    },
    destroy: (idx) => {
        jobList[idx].destroy();
    },
    validate: (idx, syntax) => {
        return jobList[idx].validate(syntax);
    },
    clear: () => {
        jobList.forEach(it => it.destroy());
        jobList.length = 0;
    }
}