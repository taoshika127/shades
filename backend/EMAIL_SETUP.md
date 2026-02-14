# Email Setup Guide - Resend

This guide explains how to configure email functionality for the contact form using Resend.

## What is Resend?

Resend is a modern email API service that makes sending emails simple and reliable. Instead of configuring SMTP servers, you just need an API key and a verified domain.

## Benefits of Resend

- ✅ **Simple Setup** - Just an API key, no SMTP configuration needed
- ✅ **Better Deliverability** - Professional email infrastructure
- ✅ **Easy Domain Verification** - Simple DNS setup
- ✅ **Built-in Analytics** - Track email opens, clicks, etc.
- ✅ **Free Tier** - 3,000 emails/month free

## Important: Understanding the Email Addresses

There are **two different email addresses** you need to configure:

1. **RESEND_FROM_EMAIL**: This is the email address that appears in the **"From" field** of the email. This must be a verified domain in Resend (e.g., `info@pacificlightshades.com` or `noreply@pacificlightshades.com`).
2. **CONTACT_EMAIL**: This is where contact form submissions will be **DELIVERED TO** (e.g., `info@pacificlightshades.com`). This can be any email address.

**Important:** The customer's email address will be:
- **Visible in the email body** - The customer's email is clearly displayed in the email content
- **Set as the Reply-To address** - When you click "Reply", it will automatically reply to the customer's email address
- **Shown in the "From" field** - The email will appear to come from your verified domain (e.g., `info@pacificlightshades.com`), but the Reply-To field ensures replies go to the customer

This way, you can see all contact form submissions in your inbox, but when you reply, it goes directly to the customer.

## Installation

First, install the required package:

```bash
cd backend
npm install resend
```

## Getting Your Resend API Key

1. **Sign up for Resend**: Go to [https://resend.com](https://resend.com) and create an account
2. **Get your API Key**:
   - Log into your Resend dashboard
   - Go to **API Keys** section
   - Click **Create API Key**
   - Give it a name (e.g., "Pacific Light Shades Backend")
   - Copy the API key (you'll only see it once!)

## Domain Verification

To send emails from your domain (`pacificlightshades.com`), you need to verify it in Resend:

1. **Add Domain**:
   - In Resend dashboard, go to **Domains**
   - Click **Add Domain**
   - Enter `pacificlightshades.com`

2. **Add DNS Records**:
   - Resend will provide you with DNS records to add
   - You'll need to add these to your domain's DNS settings (in GoDaddy or wherever your domain is hosted)
   - Typically includes:
     - SPF record
     - DKIM record
     - DMARC record (optional but recommended)

3. **Verify Domain**:
   - Once DNS records are added, Resend will verify your domain (can take a few minutes to 24 hours)
   - You'll see a green checkmark when verified

**Note**: Until your domain is verified, you can use Resend's test domain (`onboarding@resend.dev`) for testing, but emails will show as coming from Resend.

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5001

# Resend Configuration
RESEND_API_KEY=re_your_api_key_here

# Email From Address (must be from verified domain)
RESEND_FROM_EMAIL=info@pacificlightshades.com

# Contact Form Recipient Email - Where emails are DELIVERED TO
CONTACT_EMAIL=info@pacificlightshades.com
```

## Configuration Examples

### Using Your Verified Domain

Once your domain is verified in Resend:

```env
RESEND_API_KEY=re_abc123xyz...
RESEND_FROM_EMAIL=info@pacificlightshades.com
CONTACT_EMAIL=info@pacificlightshades.com
```

### Using Alias Email

If you want emails to appear from `noreply@pacificlightshades.com`:

```env
RESEND_API_KEY=re_abc123xyz...
RESEND_FROM_EMAIL=noreply@pacificlightshades.com
CONTACT_EMAIL=info@pacificlightshades.com
```

**Note**: The email in `RESEND_FROM_EMAIL` must be from a verified domain in Resend.

### Testing (Before Domain Verification)

For testing before your domain is verified:

```env
RESEND_API_KEY=re_abc123xyz...
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_EMAIL=info@pacificlightshades.com
```

**Note**: Emails sent from `onboarding@resend.dev` will show as coming from Resend, not your domain.

## How It Works

1. Customer fills out the contact form on your website
2. Form data is sent to your backend server
3. Your server uses Resend API to send an email
4. An email is **sent FROM** the `RESEND_FROM_EMAIL` address **TO** `info@pacificlightshades.com` (or the email specified in `CONTACT_EMAIL`)
5. The email includes:
   - Customer's name, email, phone, zip code, subject, and message
   - Customer's email is set as the **Reply-To** address
   - Any file attachments from the form

## Quick Setup Steps

1. **Sign up for Resend**: [https://resend.com](https://resend.com)
2. **Get API Key**: Copy your API key from the Resend dashboard
3. **Add Domain** (optional but recommended):
   - Add `pacificlightshades.com` in Resend dashboard
   - Add DNS records to your domain
   - Wait for verification
4. **Create `.env` file** in `backend/` directory:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=info@pacificlightshades.com
   CONTACT_EMAIL=info@pacificlightshades.com
   ```
5. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```
6. **Restart your backend server**

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox (`info@pacificlightshades.com` or whatever you set in `CONTACT_EMAIL`)
4. You should receive an email with the form submission
5. Try replying to the email - it should go to the customer's email address

## Troubleshooting

### "Resend client not configured"
- Make sure `RESEND_API_KEY` is set in your `.env` file
- Restart your backend server after adding the API key

### "Invalid API key"
- Verify your API key is correct
- Make sure there are no extra spaces or quotes around the API key
- Check that you copied the full API key from Resend dashboard

### "Domain not verified"
- If using a custom domain, make sure it's verified in Resend
- Check that DNS records are correctly added
- Wait a few hours for DNS propagation

### "Email not received"
- Check your spam folder
- Verify `CONTACT_EMAIL` is correct
- Check Resend dashboard for email logs and any errors
- Make sure you haven't exceeded your Resend plan limits

### "Attachments not working"
- Check file size limits (Resend has limits on attachment sizes)
- Verify file types are supported
- Check server logs for specific error messages

## Resend Pricing

- **Free Tier**: 3,000 emails/month
- **Pro**: Starting at $20/month for 50,000 emails
- See [Resend Pricing](https://resend.com/pricing) for current plans

## Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)
