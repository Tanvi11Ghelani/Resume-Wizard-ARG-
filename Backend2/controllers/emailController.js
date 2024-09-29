import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to,
    subject,
    text,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    // Log error and return failure response
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
