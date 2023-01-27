const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, FRONTEND_URL} = require('../configs/configs');
const emailTemplates = require('../email-templates');
const MyError = require("../errors/myError");


const sendEmail = async (receiverEmail, emailAction, context = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo?.subject || !templateInfo.templateName) {
        throw new MyError('Wrong template', 500);
    }

    const options = {
        viewEngine: {
            defaultLayout: 'main',
            layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
            partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            extname: '.hbs'
        },
        extName: '.hbs',
        viewPath: path.join(process.cwd(), 'email-templates', 'views')
    };

    transporter.use('compile', hbs(options));

    context.frontendURL = FRONTEND_URL;

    return transporter.sendMail({
        from: 'no reply',
        to: receiverEmail,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    });
};

module.exports = {
    sendEmail
};
