import { Resend } from 'resend';
import fs from 'fs';

// Lazy initialization of Resend client (after dotenv.config() is called)
let resend: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      resend = new Resend(apiKey);
    } else {
      console.warn('Resend API key not found. Emails will not be sent.');
    }
  }
  return resend;
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  zipCode?: string;
  subject: string;
  message: string;
}

interface FileAttachment {
  originalname: string;
  path: string;
}

export const sendContactEmail = async (formData: ContactFormData, attachments: FileAttachment[] = []): Promise<boolean> => {
  const resendClient = getResendClient();

  if (!resendClient) {
    console.error('Resend client not configured. Please set up RESEND_API_KEY in .env file.');
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'info@pacificlightshades.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  // Prepare attachments - Resend expects base64 encoded files
  const emailAttachments = await Promise.all(
    attachments.map(async (file) => {
      const fileBuffer = fs.readFileSync(file.path);
      const base64Content = fileBuffer.toString('base64');
      return {
        filename: file.originalname,
        content: base64Content,
      };
    })
  );

  // Format the email content
  const htmlContent = `
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
  `;

  const textContent = `
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
  `.trim();

  try {
    const { data, error } = await resendClient.emails.send({
      from: `Pacific Light Shades Contact Form <${fromEmail}>`,
      to: [recipientEmail],
      reply_to: formData.email,
      subject: `Contact Form: ${formData.subject}`,
      html: htmlContent,
      text: textContent,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
    });

    if (error) {
      console.error('Error sending contact email:', error);
      return false;
    }

    console.log('Contact email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

interface ConsultationFormData {
  fullName: string;
  email: string;
  phone?: string;
  serviceAddress: string;
  consultationType: string;
  preferredTime: string[];
  lookingFor: string[];
  installTimeline: string;
  numberOfWindows: string[];
  budgetRange: string;
  additionalInfo?: string;
}

export const sendConsultationEmail = async (formData: ConsultationFormData): Promise<boolean> => {
  const resendClient = getResendClient();

  if (!resendClient) {
    console.error('Resend client not configured. Please set up RESEND_API_KEY in .env file.');
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'info@pacificlightshades.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #5c4717;">New Consultation Request</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
        <p><strong>Service Address:</strong> ${formData.serviceAddress}</p>
        <p><strong>Consultation Type:</strong> ${formData.consultationType}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime.join(', ') || 'Not specified'}</p>
        <p><strong>Looking For:</strong> ${formData.lookingFor.join(', ') || 'Not specified'}</p>
        <p><strong>Install Timeline:</strong> ${formData.installTimeline || 'Not specified'}</p>
        <p><strong>Number of Windows:</strong> ${formData.numberOfWindows.join(', ') || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${formData.budgetRange || 'Not specified'}</p>
        ${formData.additionalInfo ? `<p><strong>Additional Info:</strong> ${formData.additionalInfo}</p>` : ''}
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This email was sent from the Pacific Light Shades consultation form.<br>
        You can reply directly to this email to respond to ${formData.fullName}.
      </p>
    </div>
  `;

  const textContent = `
New Consultation Request

Name: ${formData.fullName}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
Service Address: ${formData.serviceAddress}
Consultation Type: ${formData.consultationType}
Preferred Time: ${formData.preferredTime.join(', ') || 'Not specified'}
Looking For: ${formData.lookingFor.join(', ') || 'Not specified'}
Install Timeline: ${formData.installTimeline || 'Not specified'}
Number of Windows: ${formData.numberOfWindows.join(', ') || 'Not specified'}
Budget Range: ${formData.budgetRange || 'Not specified'}
${formData.additionalInfo ? `Additional Info: ${formData.additionalInfo}` : ''}

---
This email was sent from the Pacific Light Shades consultation form.
You can reply directly to this email to respond to ${formData.fullName}.
  `.trim();

  try {
    const { data, error } = await resendClient.emails.send({
      from: `Pacific Light Shades Consultation Form <${fromEmail}>`,
      to: [recipientEmail],
      reply_to: formData.email,
      subject: `Consultation Request: ${formData.fullName}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Error sending consultation email:', error);
      return false;
    }

    console.log('Consultation email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending consultation email:', error);
    return false;
  }
};

interface QuoteFormData {
  formData: {
    fullName: string;
    email: string;
    city: string;
    state: string;
    projectTimeline: string;
    zipcode: string;
    serviceOption: string;
    serviceType?: string;
    numberOfWindows?: string;
    shadeInterest?: string[];
    spaceNotes?: string;
  };
  windows: Array<{
    id: number;
    roomName: string;
    windowName: string;
    width: string;
    height: string;
    shadeType: string;
    motorized: string;
  }>;
}

export const sendQuoteEmail = async (quoteData: QuoteFormData): Promise<boolean> => {
  const resendClient = getResendClient();

  if (!resendClient) {
    console.error('Resend client not configured. Please set up RESEND_API_KEY in .env file.');
    return false;
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'info@pacificlightshades.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const fd = quoteData.formData;
  const windowsWithMeasurements = quoteData.windows.filter(w => (w.width && w.width.trim()) && (w.height && w.height.trim()));

  const windowsHtml = windowsWithMeasurements.length > 0
    ? windowsWithMeasurements.map((window, index) => `
    <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
      <h4 style="color: #5c4717; margin-top: 0;">Window ${index + 1}</h4>
      <p><strong>Room:</strong> ${window.roomName || 'Not specified'}</p>
      <p><strong>Window Name:</strong> ${window.windowName || 'Not specified'}</p>
      <p><strong>Dimensions:</strong> ${window.width}" × ${window.height}"</p>
      <p><strong>Shade Type:</strong> ${window.shadeType || 'Not specified'}</p>
      <p><strong>Motorized:</strong> ${window.motorized || 'Not specified'}</p>
    </div>
  `).join('')
    : '<p><em>Window measurements not provided (full-service or not yet measured).</em></p>';

  const numberOfWindowsDisplay = fd.numberOfWindows
    ? fd.numberOfWindows
    : (windowsWithMeasurements.length > 0 ? String(windowsWithMeasurements.length) : 'Not specified');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #5c4717;">New Quote Request</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${fd.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${fd.email}">${fd.email}</a></p>
        <p><strong>Location:</strong> ${fd.city}, ${fd.state} ${fd.zipcode}</p>
        <p><strong>Service Option:</strong> ${fd.serviceOption}</p>
        ${fd.serviceType ? `<p><strong>Service Type:</strong> ${fd.serviceType === 'full-service' ? 'Full-Service' : fd.serviceType === 'measurements-ready' ? 'I Have Measurements Ready' : fd.serviceType}</p>` : ''}
        <p><strong>Number of Windows:</strong> ${numberOfWindowsDisplay}</p>
        ${(fd.shadeInterest && fd.shadeInterest.length > 0) ? `<p><strong>Shade Interest:</strong> ${fd.shadeInterest.join(', ')}</p>` : ''}
        ${fd.spaceNotes ? `<p><strong>Tell Us About Your Space:</strong><br/>${fd.spaceNotes.replace(/\n/g, '<br/>')}</p>` : ''}
        <p><strong>Project Timeline:</strong> ${fd.projectTimeline || 'Not specified'}</p>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #5c4717;">Window Details:</h3>
        ${windowsHtml}
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">
        This email was sent from the Pacific Light Shades quote form.
      </p>
    </div>
  `;

  const windowsText = windowsWithMeasurements.length > 0
    ? windowsWithMeasurements.map((window, index) => `
Window ${index + 1}:
  Room: ${window.roomName || 'Not specified'}
  Window Name: ${window.windowName || 'Not specified'}
  Dimensions: ${window.width}" × ${window.height}"
  Shade Type: ${window.shadeType || 'Not specified'}
  Motorized: ${window.motorized || 'Not specified'}
  `).join('\n')
    : 'Window measurements not provided (full-service or not yet measured).';

  const textContent = `
New Quote Request

Name: ${fd.fullName}
Email: ${fd.email}
Location: ${fd.city}, ${fd.state} ${fd.zipcode}
Service Option: ${fd.serviceOption}
${fd.serviceType ? `Service Type: ${fd.serviceType === 'full-service' ? 'Full-Service' : fd.serviceType === 'measurements-ready' ? 'I Have Measurements Ready' : fd.serviceType}\n` : ''}
Number of Windows: ${numberOfWindowsDisplay}
${(fd.shadeInterest && fd.shadeInterest.length > 0) ? `Shade Interest: ${fd.shadeInterest.join(', ')}\n` : ''}${fd.spaceNotes ? `Tell Us About Your Space: ${fd.spaceNotes}\n` : ''}
Project Timeline: ${fd.projectTimeline || 'Not specified'}

Window Details:
${windowsText}

---
This email was sent from the Pacific Light Shades quote form.
You can reply directly to this email to respond to ${fd.fullName}.
  `.trim();

  try {
    const { data, error } = await resendClient.emails.send({
      from: `Pacific Light Shades Quote Form <${fromEmail}>`,
      to: [recipientEmail],
      reply_to: quoteData.formData.email,
      subject: `Quote Request: ${windowsWithMeasurements.length > 0 ? `${windowsWithMeasurements.length} Window(s) - ` : ''}${fd.serviceType === 'full-service' ? 'Full-Service - ' : ''}${fd.city}, ${fd.state}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Error sending quote email:', error);
      return false;
    }

    console.log('Quote email sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending quote email:', error);
    return false;
  }
};

