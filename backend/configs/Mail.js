import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// Create reusable transporter object using SMTP
let transporter

// Development configuration (for local system)
if (process.env.NODE_ENV !== 'production') {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL || "aditya.rastogi0304@gmail.com", // your Gmail
      pass: process.env.EMAIL_PASS // your Gmail app password
    }
  })
} else {
  // Production configuration (for Render)
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL || "aditya.rastogi0304@gmail.com",
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

const sendMail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL || "aditya.rastogi0304@gmail.com",
      to: to,
      subject: "Indraprashta Academy",
      html: `<p>Your OTP for Password Reset is <b>${otp}</b>.
        It expires in 5 minutes.</p>`
    })
    console.log("Email sent successfully:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export default sendMail
