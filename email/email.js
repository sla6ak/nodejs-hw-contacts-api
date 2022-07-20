const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const BOT_EMAIL = "slabakxaker@gmail.com";

// const data = {
//     to: "test@example.com",
//     subject: "Тестовое письмо для изучения  node js",
//     html: "<strong>Если вы видите это письмо значит вы счастливчик избранный и вообще герой!</strong>",
// };

const sendEmail = async (data) => {
    try {
        await sgMail.send({ ...data, from: BOT_EMAIL });
        console.log("email send!");
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
};

module.exports = sendEmail;
