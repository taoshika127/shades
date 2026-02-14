# Deploy Backend to Railway - Step-by-Step Guide

This guide will walk you through deploying your Express.js backend to Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app) (free tier available)
2. **GitHub Account**: Your code should be in a GitHub repository (recommended)
3. **Resend API Key**: You'll need your Resend API key for email functionality

## Step 1: Prepare Your Code

### 1.1 Push to GitHub (if not already done)

```bash
cd /Users/cts1988/Documents/PacificLight
git init  # if not already a git repo
git add .
git commit -m "Prepare for Railway deployment"
git remote add origin https://github.com/yourusername/pacificlight.git
git push -u origin main
```

### 1.2 Verify Build Scripts

Your `backend/package.json` should have:
- ✅ `"build": "tsc"` - Compiles TypeScript
- ✅ `"start": "node dist/index.js"` - Runs the compiled code

These are already correct!

## Step 2: Create Railway Account & Project

### 2.1 Sign Up / Login

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with GitHub (recommended) or email

### 2.2 Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"** (recommended)
   - Or choose **"Empty Project"** if deploying manually

## Step 3: Deploy from GitHub (Recommended)

### 3.1 Connect GitHub Repository

1. If you selected "Deploy from GitHub repo":
   - Authorize Railway to access your GitHub account
   - Select your `PacificLight` repository
   - Click **"Deploy Now"**

2. Railway will automatically detect it's a Node.js project

### 3.2 Configure Service Settings

1. **IMPORTANT - Set Root Directory**:
   - Click on your service
   - Go to **Settings** tab
   - Scroll to **"Root Directory"** section
   - Set **Root Directory** to: `backend`
   - This tells Railway to use the `backend` folder, not the root

2. **Build Command**: Should auto-detect as `npm run build` (runs from backend folder)
3. **Start Command**: Should auto-detect as `npm start` (runs from backend folder)

**Critical**: If Root Directory is not set to `backend`, Railway will try to build from the root and fail!

## Step 4: Configure Environment Variables

### 4.1 Add Environment Variables

1. In Railway dashboard, go to your service
2. Click on **Variables** tab
3. Add the following environment variables:

**Critical**: Add `NODE_VERSION=20` FIRST - This ensures Node 20 is used (required for better-sqlite3)

#### Required Variables (Add in this order):

```env
# Node Version (REQUIRED - must be 20+ for better-sqlite3)
# Railway will auto-detect from .nvmrc, but you can also set this explicitly
NODE_VERSION=20

# Server Port (Railway will set this automatically, but you can override)
PORT=5001

# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=noreply@pacificlightshades.com

# Contact Email (where form submissions are sent)
CONTACT_EMAIL=info@pacificlightshades.com
```

**Important Notes**:
- Railway will auto-detect Node.js from your `package.json` and `.nvmrc` file (which specifies Node 20)
- The `.nvmrc` file in the `backend` folder tells Railway to use Node 20
- For `better-sqlite3` compilation, Railway's build environment should include Python automatically
- If you still get Python errors, you may need to add a `nixpacks.toml` with just Python (see troubleshooting section)

#### How to Add Variables:

1. Click **"New Variable"**
2. Enter variable name (e.g., `RESEND_API_KEY`)
3. Enter variable value (e.g., your actual API key)
4. Click **"Add"**
5. Repeat for all variables

**Important**:
- Never commit `.env` file to git
- Railway variables are encrypted and secure
- You can reference other variables using `$VARIABLE_NAME`

### 4.2 Verify Your Resend Setup

Make sure you have:
- ✅ Resend account created
- ✅ API key from Resend dashboard
- ✅ Domain verified in Resend (or use `onboarding@resend.dev` for testing)

## Step 5: Configure Database (SQLite)

### 5.1 Railway Persistent Volume

Railway supports persistent volumes for SQLite databases:

1. Go to your service in Railway
2. Click **"Settings"** tab
3. Scroll to **"Volumes"** section
4. Click **"Add Volume"**
5. Configure:
   - **Mount Path**: `/app/data` (or `/app/backend/data`)
   - **Name**: `database-storage`
   - Click **"Add"**

### 5.2 Update Database Path (if needed)

Your current database path should work, but verify in `backend/src/database.ts`:
- It uses `path.join(__dirname, '../data')` which should work on Railway
- The volume will persist data between deployments

## Step 6: Configure Static Assets

### 6.1 Assets Directory

Your backend serves static assets from `/assets`. Railway will serve these automatically, but verify:

1. Assets are in `backend/assets/` directory
2. Your Express app serves them correctly (check `index.ts`)

### 6.2 Verify Asset Serving

Check that your `index.ts` has:
```typescript
app.use('/assets', express.static(path.join(__dirname, '../assets')));
```

## Step 7: Deploy

### 7.1 Automatic Deployment

If connected to GitHub:
- Railway automatically deploys on every push to main branch
- You can trigger manual deployment from the dashboard

### 7.2 Manual Deployment (if not using GitHub)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login:
   ```bash
   railway login
   ```

3. Link project:
   ```bash
   cd backend
   railway link
   ```

4. Deploy:
   ```bash
   railway up
   ```

## Step 8: Get Your Backend URL

### 8.1 Find Your Railway URL

1. After deployment, Railway will provide a URL
2. Go to your service dashboard
3. Click **"Settings"** → **"Networking"**
4. You'll see your public URL (e.g., `https://your-app.railway.app`)
5. Copy this URL - you'll need it for your frontend!

### 8.2 Custom Domain (Optional)

1. Go to **Settings** → **Networking**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `api.pacificlightshades.com`)
4. Follow DNS configuration instructions
5. Railway will automatically configure SSL

## Step 9: Verify Deployment

### 9.1 Check Logs

1. In Railway dashboard, click **"Deployments"** tab
2. Click on the latest deployment
3. Check **"Logs"** for any errors
4. Look for: `Server is running on port...`

### 9.2 Test Your API

1. Open your Railway URL in browser: `https://your-app.railway.app`
2. Test endpoints:
   - `https://your-app.railway.app/api/categories` - Should return categories
   - `https://your-app.railway.app/api/products` - Should return products
   - `https://your-app.railway.app/assets/contact/contact_background.jpg` - Should show image

### 9.3 Test Form Submission

1. Use your frontend (or Postman) to test:
   - POST to `/api/contact`
   - POST to `/api/consultation`
   - POST to `/api/quote`
2. Check your email inbox for test submissions
3. Check Railway logs for any errors

## Step 10: Update Frontend Configuration

### 10.1 Update Vercel Configuration

Once your backend is deployed, update `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-app.railway.app/api/:path*"
    },
    {
      "source": "/assets/:path*",
      "destination": "https://your-app.railway.app/assets/:path*"
    }
  ]
}
```

Replace `https://your-app.railway.app` with your actual Railway URL.

## Troubleshooting

### Build Fails

**Problem**: Build errors during deployment

**Solutions**:
1. Check build logs in Railway dashboard
2. Test build locally: `cd backend && npm run build`
3. Ensure all dependencies are in `package.json` (not just `devDependencies`)
4. Check TypeScript errors: `npm run build`
5. Verify Root Directory is set to `backend` in Railway settings
6. Ensure `.nvmrc` file exists with `20` (for Node 20)

### "npm: command not found"

**Problem**: npm is not available during build

**Solutions**:
1. **Remove `nixpacks.toml`** - Let Railway auto-detect Node.js from `package.json` and `.nvmrc`
2. Verify `.nvmrc` file exists in `backend/` with content `20`
3. Check Root Directory is set to `backend` in Railway settings
4. Railway should auto-detect Node.js - if it doesn't, check that `package.json` is in the root directory Railway is looking at

### "Python not found" or "better-sqlite3 compilation fails"

**Problem**: `better-sqlite3` needs Python to compile native bindings

**Solutions**:
1. Railway's build environment should include Python automatically
2. If not, create a minimal `nixpacks.toml` in `backend/`:
   ```toml
   [phases.setup]
   nixPkgs = ["python3"]
   ```
3. This adds Python without interfering with Node.js auto-detection

### Server Won't Start

**Problem**: Application crashes on startup

**Solutions**:
1. Check logs in Railway dashboard
2. Verify environment variables are set correctly
3. Ensure `PORT` is set (Railway sets this automatically)
4. Check database initialization doesn't fail
5. Verify all required files exist (assets, etc.)

### Database Issues

**Problem**: Database not persisting or errors

**Solutions**:
1. Ensure persistent volume is mounted correctly
2. Check volume mount path matches code expectations
3. Verify database directory is writable
4. Check logs for database initialization errors

### API Not Accessible

**Problem**: Can't reach API endpoints

**Solutions**:
1. Check Railway service is running (not paused)
2. Verify public URL is correct
3. Check CORS configuration allows your frontend domain
4. Test endpoints directly in browser/Postman
5. Check Railway networking settings

### Email Not Sending

**Problem**: Forms submit but no emails received

**Solutions**:
1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for email logs
3. Verify `RESEND_FROM_EMAIL` is from verified domain
4. Check Railway logs for email errors
5. Test Resend API key is valid

### Assets Not Loading

**Problem**: Images/assets return 404

**Solutions**:
1. Verify assets directory is included in deployment
2. Check asset paths in code are correct
3. Ensure Express static middleware is configured
4. Test asset URLs directly in browser

## Railway Pricing

- **Free Tier**: $5 credit/month (usually enough for small projects)
- **Hobby Plan**: $5/month + usage
- **Pro Plan**: $20/month + usage

Most small projects stay within free tier limits.

## Important Notes

1. **Environment Variables**: Never commit `.env` file. Use Railway's Variables tab.
2. **Database**: SQLite works on Railway with persistent volumes, but for production scale, consider PostgreSQL.
3. **Auto-Deployments**: Railway auto-deploys on git push (if connected to GitHub).
4. **Logs**: Check Railway dashboard logs for debugging.
5. **Restarts**: Railway auto-restarts on crashes (with limits).

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Get Railway URL
3. ✅ Test all endpoints
4. ✅ Update frontend `vercel.json` with Railway URL
5. ✅ Deploy frontend to Vercel
6. ✅ Test full integration

## Quick Reference

- **Railway Dashboard**: https://railway.app/dashboard
- **Documentation**: https://docs.railway.app
- **Support**: https://railway.app/support

## Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] Resend API key ready
- [ ] Resend domain verified (or using test domain)
- [ ] Environment variables list prepared
- [ ] Database path verified
- [ ] Build command works locally (`npm run build`)
- [ ] Start command works locally (`npm start`)

After deploying:
- [ ] Service is running (not paused)
- [ ] Environment variables set
- [ ] Persistent volume added (for database)
- [ ] Public URL obtained
- [ ] API endpoints tested
- [ ] Email sending tested
- [ ] Assets loading correctly
- [ ] Logs checked for errors

