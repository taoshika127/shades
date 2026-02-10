import nodemailer from 'nodemailer';

// Email configuration from environment variables
const createTransporter = () => {
  // Check if email is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email configuration not found. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  zipCode?: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  const transporter = createTransporter();

  if (!transporter) {
    console.error('Email transporter not configured. Please set up SMTP settings in .env file.');
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'info@pacificlightshades.com';

  // Format the email content
  const mailOptions = {
    from: `"Pacific Light Shades Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: recipientEmail,
    replyTo: formData.email,
    subject: `Contact Form: ${formData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5c4717;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          ${formData.zipCode ? `<p><strong>ZIP Code:</strong> ${formData.zipCode}</p>` : ''}
          <p><strong>Subject:</strong> ${formData.subject}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #5c4717;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Pacific Light Shades contact form.<br>
          You can reply directly to this email to respond to ${formData.name}.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.zipCode ? `ZIP Code: ${formData.zipCode}` : ''}
Subject: ${formData.subject}

Message:
${formData.message}

---
This email was sent from the Pacific Light Shades contact form.
You can reply directly to this email to respond to ${formData.name}.
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

