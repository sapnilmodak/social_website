import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  // Specific settings for Titan/Hostinger
  authMethod: 'LOGIN', 
  debug: true,
  logger: true
});

// Verify connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Verification Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
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
export const sendContactEmail = async (firstName: string, lastName: string, email: string, message: string) => {
  // 1. Notification to the Campaign Team
  const adminMailOptions = {
    from: `"Campaign Website" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // Send to the official campaign email
    replyTo: email,
    subject: `New Message from ${firstName} ${lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-top: 5px solid #1B4332;">
        <h2 style="color: #1B4332;">New Supporter Message</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #333;">
          ${message}
        </div>
        <p style="margin-top: 20px;">
          <a href="mailto:${email}" style="background: #1B4332; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reply to ${firstName}
          </a>
        </p>
      </div>
    `,
  };

  // 2. Confirmation to the Supporter
  const userMailOptions = {
    from: `"Jagdeep Sacha for Mayor" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'We Received Your Message - Jagdeep Sacha Campaign',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-top: 5px solid #1B4332;">
        <h2 style="color: #1B4332;">Hello ${firstName},</h2>
        <p>Thank you for reaching out to the Jagdeep Sacha Campaign for Mayor.</p>
        <p>We have received your message and our team will get back to you as soon as possible.</p>
        <p>Your interest and support are vital as we work together to build a stronger Caledon.</p>
        <hr />
        <p><strong>Your Message:</strong></p>
        <div style="font-style: italic; color: #666; margin-bottom: 20px;">
          "${message}"
        </div>
        <p>Best regards,</p>
        <p><strong>Jagdeep Sacha & The Campaign Team</strong></p>
      </div>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    console.log(`Contact emails sent for ${email}`);
  } catch (error) {
    console.error('Error sending contact emails:', error);
  }
};
