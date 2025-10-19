import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // More reliable than using 'service'
  port: 587, // Using port 587 for TLS
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Helps prevent certificate issues
  },
  // Add timeout settings
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 10000,     // 10 seconds
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});

const sendMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: "Inraprashta Academy",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>`
    });
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw to handle in the calling function
  }
}

export default sendMail
