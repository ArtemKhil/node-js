const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../configs/configs');
const emailTemplates = require('../email-templates');
const MyError = require("../errors/myError");


const sendEmail = async (receiverEmail, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass: NO_REPLY_EMAIL_PASSWORD
        }
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
        throw new MyError('Wrong template', 500);
    }

    const templateViewer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    Object.assign(locals || {}, {frontendURL: 'google.com'});

    const html = await templateViewer.render(templateInfo.templateName, locals);

    return transporter.sendMail({
        from: 'no reply',
        to: receiverEmail,
        subject: templateInfo.subject,
        html
    });
};


module.exports = {
    sendEmail
};
