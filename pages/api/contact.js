const handler = async (req, res) => {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_GMAIL_USERNAME,
      pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD,
    },
    secure: true,
  });

  const {subject, text, html} = req.body

  const mailData = {
    from: process.env.NODEMAILER_GMAIL_USERNAME,
    to: 'seklerek@gmail.com',
    subject: subject,
    text: text,
    html: html
   }

   transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info)
      res.status(200).json(info);
  })

};

export default handler;
