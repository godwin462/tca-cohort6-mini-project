const nodemailer = require("nodemailer");

exports.sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.APP_USERNAME,
      pass: process.env.APP_PASSWORD,
    },
  });

  (async () => {
    const info = await transporter.sendMail({
      from: `Chowfinder <${process.env.APP_USERNAME}>`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("Message sent to:", email);
  })();
};
