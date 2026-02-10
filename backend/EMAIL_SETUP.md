# Email Setup Guide

This guide explains how to configure email functionality for the contact form.

## Important: Understanding the Two Email Addresses

There are **two different email addresses** you need to configure:

1. **SMTP Sending Account** (`SMTP_USER`, `SMTP_FROM`): This is the email account that will **SEND** the emails. You need SMTP credentials for this account.
2. **Recipient Email** (`CONTACT_EMAIL`): This is where contact form submissions will be **DELIVERED TO** (e.g., `info@pacificlightshades.com`).

**Example:** If you have email hosting for `pacificlightshades.com`, you should use that SMTP server. The sending account could be `noreply@pacificlightshades.com` or `contact@pacificlightshades.com`, and it will send emails TO `info@pacificlightshades.com`.

## Installation

First, install the required packages:

```bash
cd backend
npm install nodemailer @types/nodemailer
```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5001

# Email Configuration (SMTP) - The account that SENDS emails
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sending-email@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=your-sending-email@yourdomain.com

# Contact Form Recipient Email - Where emails are DELIVERED TO
CONTACT_EMAIL=info@pacificlightshades.com
```

## SMTP Configuration Examples

### Custom Domain Email (Recommended if you have email hosting for pacificlightshades.com)

If you have email hosting for your domain (through cPanel, Google Workspace, Microsoft 365, etc.), use those SMTP settings:

**Example for cPanel/Standard Web Hosting:**
```env
SMTP_HOST=mail.pacificlightshades.com  # or smtp.pacificlightshades.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@pacificlightshades.com  # or contact@pacificlightshades.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@pacificlightshades.com
CONTACT_EMAIL=info@pacificlightshades.com
```

**Example for Google Workspace (if you use Google for your domain):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@pacificlightshades.com  # Your Google Workspace email
SMTP_PASS=your-app-password
SMTP_FROM=noreply@pacificlightshades.com
CONTACT_EMAIL=info@pacificlightshades.com
```

### Microsoft 365 from GoDaddy (Recommended for pacificlightshades.com)

**Important:** You must enable SMTP Auth in your GoDaddy email dashboard before this will work.

1. Log into your GoDaddy account
2. Go to your email settings/dashboard
3. Enable SMTP Authentication for your email account

**Configuration:**
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@pacificlightshades.com  # Your Microsoft 365 email address
SMTP_PASS=your-email-password
SMTP_FROM=info@pacificlightshades.com
CONTACT_EMAIL=info@pacificlightshades.com
```

**Note:**
- Port 587 with `SMTP_SECURE=false` uses STARTTLS encryption (this is correct)
- Use the same email address for both `SMTP_USER` and `SMTP_FROM` if you want emails to appear from `info@pacificlightshades.com`
- Or use a different sending address like `noreply@pacificlightshades.com` if you have multiple email accounts

### Gmail (Personal Account - Not Recommended for Business)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
SMTP_FROM=your-email@gmail.com
```

**Note:** For Gmail personal accounts, you need to:
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password (not your regular password) in `SMTP_PASS`

**Note:** If you have a business email at `pacificlightshades.com`, you should use your domain's email hosting instead of a personal Gmail account.

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-email@outlook.com
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=your-verified-sender@yourdomain.com
```

### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com  # Use your region
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
SMTP_FROM=your-verified-email@yourdomain.com
```

## How It Works

1. When a user submits the contact form, the data is sent to `/api/contact`
2. The backend validates the form data
3. An email is **sent FROM** the `SMTP_FROM` address **TO** `info@pacificlightshades.com` (or the email specified in `CONTACT_EMAIL`)
4. The email includes:
   - Customer's name and email (as reply-to address)
   - Phone number (if provided)
   - ZIP code (if provided)
   - Subject
   - Message content
5. You can reply directly to the email to respond to the customer (the reply will go to the customer's email address)

**Example Flow:**
- Customer fills out form with email: `customer@example.com`
- Your server sends email FROM: `noreply@pacificlightshades.com` TO: `info@pacificlightshades.com`
- When you reply, it goes TO: `customer@example.com`

## Quick Setup for GoDaddy Microsoft 365

1. **Enable SMTP Auth in GoDaddy:**
   - Log into your GoDaddy account
   - Navigate to your email dashboard
   - Enable SMTP Authentication for your email account

2. **Create `.env` file in the `backend` directory:**
   ```env
   PORT=5001
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=info@pacificlightshades.com
   SMTP_PASS=your-email-password
   SMTP_FROM=info@pacificlightshades.com
   CONTACT_EMAIL=info@pacificlightshades.com
   ```

3. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

4. **Restart your backend server** (environment variables are loaded at startup)

5. **Test it:**
   - Submit a test form from the contact page
   - Check your email inbox at `info@pacificlightshades.com`

## Testing

After setting up your `.env` file:

1. Restart your backend server (environment variables are loaded at startup)
2. Submit a test form from the contact page
3. Check your email inbox at `info@pacificlightshades.com`

## Troubleshooting

### Email not sending
- Check that all SMTP environment variables are set correctly
- Verify your SMTP credentials are correct
- Check server logs for error messages
- For Gmail, make sure you're using an App Password, not your regular password

### "Email transporter not configured" warning
- Make sure your `.env` file exists in the `backend` directory
- Verify all required SMTP variables are set (SMTP_HOST, SMTP_USER, SMTP_PASS)
- Restart the server after creating/updating the `.env` file

### GoDaddy Microsoft 365 specific issues
- **"Authentication failed"**: Make sure SMTP Auth is enabled in your GoDaddy email dashboard
- **"Connection timeout"**: Verify `SMTP_HOST=smtp.office365.com` and `SMTP_PORT=587`
- **"Invalid credentials"**: Double-check your email password is correct
- **"STARTTLS error"**: Make sure `SMTP_SECURE=false` (STARTTLS is used automatically on port 587)

