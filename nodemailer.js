import nodemailer from "nodemailer";

const baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 30px auto;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }
    .header {
      border-bottom: 2px solid #eeeeee;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      color: #333333;
      margin: 0;
    }
    .info {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      color: #555555;
    }
    .value {
      margin: 5px 0 15px;
      color: #222222;
    }
    .footer {
      font-size: 12px;
      color: #999999;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📩 New Message via Portfolio Contact Form</h2>
    </div>
    <div class="info">
      <div><span class="label">👤 Name:</span></div>
      <div class="value">{{name}}</div>

      <div><span class="label">📧 Email:</span></div>
      <div class="value">{{email}}</div>

      <div><span class="label">📝 Message:</span></div>
      <div class="value">{{message}}</div>
    </div>
    <div class="footer">
      This message was generated from your portfolio site contact form.
    </div>
  </div>
</body>
</html>
`;

const sendEmail = async (to, subject = "📩 New Message via Portfolio Contact Form", text = "", { name, email, message }) => {
  const html = baseHTML
    .replace("{{name}}", name)
    .replace("{{email}}", email)
    .replace("{{message}}", message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "connected.eep.project@gmail.com",
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
export { sendEmail };
