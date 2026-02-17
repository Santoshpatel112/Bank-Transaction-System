import nodemailer from 'nodemailer';

// Check if email credentials are configured
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'your_app_password_here';

let transporter;

if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify the connection configuration
  transporter.verify((error) => {
    if (error) {
      console.error('Error connecting to email server:', error.message);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
} else {
  console.log('Email not configured - emails will be logged to console only');
}

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  if (!isEmailConfigured) {
    console.log('\n--- EMAIL (Not Sent - No Credentials) ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    console.log('--- END EMAIL ---\n');
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Backend-Banking" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

async function sendRegisterEmail(userEmail, name){
    const subject = 'Welcome to Backend-Banking';
    const text = `Hello ${name},\n\nWelcome to Backend-Banking! Your account has been successfully created.\n\nThank you for joining us.\n\nBest regards,\nBackend-Banking Team`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Welcome to Backend-Banking!</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your account has been successfully created. We're excited to have you on board!</p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;">You can now access all our banking features and services.</p>
            </div>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p style="margin-top: 30px;">Best regards,<br><strong>Backend-Banking Team</strong></p>
        </div>
    `;
    
    await sendEmail(userEmail, subject, text, html);
}

export { sendEmail, sendRegisterEmail, transporter };