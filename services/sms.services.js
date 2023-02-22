const twilio = require('twilio');

const {TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = require("../configs/configs");

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message,phoneNumber) => {
    try {
        console.log(`SMS start sending ~ ${phoneNumber}`);

        const smsResponse = await client.messages.create({
            body: message,
            to: phoneNumber,
            messagingServiceSid: TWILIO_SERVICE_SID,
        });
        console.log(`SMS response ~ status: ${smsResponse.status}`);
    }catch (e) {
        console.error(`SMS service: ${e.message}`);
    }
};

module.exports = {sendSms};
