import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendReceiptEmail = async (to: string, name: string, amount: number, orderId: string) => {
  const mailOptions = {
    from: `"Jagdeep Sacha Campaign" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Donation Receipt - Jagdeep Sacha Campaign',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #003366;">Thank You for Your Support, ${name}!</h2>
        <p>Your donation to the Jagdeep Sacha Campaign has been successfully processed.</p>
        <hr />
        <p><strong>Donation Details:</strong></p>
        <ul>
          <li><strong>Amount:</strong> $${amount.toFixed(2)}</li>
          <li><strong>Order ID:</strong> ${orderId}</li>
          <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
        </ul>
        <hr />
        <p>Your contribution helps us build a stronger Caledon. We truly appreciate your commitment to our vision.</p>
        <p>Best regards,<br /><strong>The Jagdeep Sacha Campaign Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Receipt sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendWelcomeEmail = async (to: string, name: string) => {
  const mailOptions = {
    from: `"Jagdeep Sacha Campaign" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Welcome to the Movement - Jagdeep Sacha Campaign',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #0A1128;">Welcome to the Movement, ${name}!</h2>
        <p>Thank you for joining our campaign to build a stronger, more inclusive Caledon. Your support means the world to us.</p>
        <p>We'll keep you updated on upcoming events, volunteer opportunities, and our vision for the community.</p>
        <hr />
        <p style="font-style: italic;">"Together, we can ensure that Caledon remains a land of opportunity for everyone."</p>
        <hr />
        <p>Stay tuned for more updates!</p>
        <p>Best regards,<br /><strong>Jagdeep Sacha & The Campaign Team</strong></p>
        <div style="margin-top: 20px; font-size: 0.8rem; color: #888;">
          <p>Follow us on social media to stay connected!</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
