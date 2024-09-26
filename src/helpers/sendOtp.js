import nodemailer from 'nodemailer';

// Setup nodemailer transport using Mailtrap
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  
  // Function to send OTP email
  export  async function sendOTPEmail(email, otp) {
    try {
      await transporter.sendMail({
        from: 'noreply.chatapp@gmail.com',
        to: email,
        subject: 'Email Verification OTP',
        html: `<p>Your OTP for verification is: <b>${otp}</b>. It will expire in 5 minutes.</p>`,
      });
      console.log('Email sent successfully to:', email);
    } catch (error) {
      throw(error.message || "failed to send email!!")
    }
  }