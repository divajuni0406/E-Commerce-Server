const mailer = require("nodemailer");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: "idhamdummy1@gmail.com",
    pass: "ygmtqbosnfqpcafq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const resetPasswordVerif = async (dataEmail) => {
  const transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "idhamdummy1@gmail.com",
      pass: "ygmtqbosnfqpcafq",
    },
  });
  try {
    const sendEmail = await transporter.sendMail(dataEmail);
    console.log(sendEmail);
    return sendEmail.accepted[0];
  } catch (error) {
    console.log(error);
    return sendEmail.rejected[0];
  }
};

module.exports = { transporter, resetPasswordVerif };
