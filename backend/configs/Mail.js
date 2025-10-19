import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// --- Nodemailer Transporter Configuration ---
// Using explicit host/port for better reliability on Render
const transporter = nodemailer.createTransport({
    // Use the explicit Gmail SMTP host
    host: "smtp.gmail.com", 
    port: 465,
    secure: true, // true for port 465 (SSL)
    auth: {
        // Ensure EMAIL and EMAIL_PASS variables are correctly defined in .env
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, // This MUST be the 16-character App Password
    },
});

// --- Mail Sending Function with Error Handling ---
const sendMail = async (to, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: "Indraprashta Academy - Password Reset OTP",
            html: `<p>Your OTP for Password Reset is <b>${otp}</b>.</p><p>It expires in 5 minutes.</p>`,
        };

        // Use 'await' to wait for the email to be sent
        const info = await transporter.sendMail(mailOptions);
        
        console.log("Email sent successfully: %s", info.messageId);
        return true; // Return true on success

    } catch (error) {
        // Log the error (this will show the ETIMEDOUT or EAUTH error details)
        console.error("Error sending email:", error.message, error.stack);
        
        // Throw a specific error or return false to indicate failure
        throw new Error("Failed to send email due to SMTP connection or authentication error.");
    }
};

export default sendMail;
