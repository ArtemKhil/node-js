const {CronJob} = require('cron');
const dayjs = require('dayjs');
const OldPassword = require('../dataBase/OldPassword');

const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = new CronJob(
    '* * * * * *',
    async function () {
        try {
            console.log('Start removing old password')

            const yearAgo = dayjs().utc().subtract(1, 'year');

            await OldPassword.deleteMany({createdAt: {$lte: yearAgo}});

            console.log('Finish removing old password');

        } catch (e) {
            console.log(e);
        }
    },
);