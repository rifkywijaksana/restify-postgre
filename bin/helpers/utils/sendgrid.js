const sgMail = require("@sendgrid/mail");
const logger = require("./logger");

const sendMail = (payload) => {

    if(payload.username === undefined || payload.username === ''){
        payload.username = '';
    }

    const html =
        `<!DOCTYPE html><html lang="en"> <head> <title>Digitalpass.id - Notification Mail</title> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%}table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt}img{-ms-interpolation-mode: bicubic}img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none}table{border-collapse: collapse !important}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important}a[x-apple-data-detectors]{color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important}u + #body a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit}a{color: #B200FD; font-weight: 600; text-decoration: underline}a:hover{color: #000 !important; text-decoration: none !important}@media screen and (min-width:600px){h1{font-size: 48px !important; line-height: 48px !important}.intro{font-size: 24px !important; line-height: 36px !important}}</style> </head> <body style="margin: 0 !important; padding: 0 !important;"> <div role="article" lang="en" style="background-color: white; color: #2b2b2b; font-family: \'Avenir Next\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 720px; padding: 40px 20px 40px 20px;"> <main> <div style="background-color: ghostwhite; border-radius: 4px; padding: 24px 48px;"> <a href=""><center><img src="https://minio.digitalpass.id/template/logo_db.jpg" style="width: 200px" ></center> </a> <hr/> <p>Halo ${payload.username}, <br/> ${payload.email_body}</p><br/><p> Salam , <br>Admin Digitalpass</p></div></main> </div> </body></html>`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail
        .send({
            to: payload.destination,
            from: "noreply@digitalpass.id",
            subject: payload.subject,
            text: payload.text,
            html: html,
        })
        .then(() => {
            logger.log("Sgmail.send", [], "Sendgrid mail notification success");
        })
        .catch((error) => {
            logger.log(
                "Sgmail.send",
                error,
                "Sendgrid mail notification success"
            );
        });
};

module.exports = {
    sendMail,
};
