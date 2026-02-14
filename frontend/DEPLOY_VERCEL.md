# Deploy Frontend to Vercel - Step-by-Step Guide

This guide will walk you through deploying your React frontend to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free account works)
2. **GitHub Account**: Your code should be in a GitHub repository (recommended)
3. **Backend URL**: Your backend server should be deployed and accessible (e.g., Railway, Heroku, DigitalOcean)

## Step 1: Prepare Your Code

### Option A: Using GitHub (Recommended)

1. **Push your code to GitHub** (if not already):
   ```bash
   cd /Users/cts1988/Documents/PacificLight
   git init  # if not already a git repo
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/pacificlight.git
   git push -u origin main
   ```

### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

## Step 2: Update Configuration

### Update `vercel.json`

1. Open `frontend/vercel.json`
2. Replace `https://your-backend-url.com` with your actual backend URL:
   ```json
   {
     "source": "/api/:path*",
     "destination": "https://your-backend.railway.app/api/:path*"
   }
   ```

**Important**: Update both `/api` and `/assets` rewrites with your backend URL.

## Step 3: Deploy via Vercel Dashboard (Easiest)

### 3.1 Import Your Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
   - If not connected, click **"Import Git Repository"** and authorize GitHub
   - Select your `PacificLight` repository

### 3.2 Configure Project Settings

1. **Root Directory**: Set to `frontend`
   - Click **"Edit"** next to Root Directory
   - Enter: `frontend`
   - Click **"Continue"**

2. **Framework Preset**: Vite (should auto-detect)
   - If not, select **"Vite"**

3. **Build Settings** (should auto-detect):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed):
   - Usually not needed for frontend-only deployment
   - Only add if you have frontend-specific env vars

### 3.3 Update Rewrites

1. After importing, go to **Settings** → **Functions**
2. Or edit `vercel.json` directly in your repo with the correct backend URL
3. Make sure `vercel.json` has your actual backend URL

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 1-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Step 4: Deploy via Vercel CLI (Alternative)

### 4.1 Install and Login

```bash
cd /Users/cts1988/Documents/PacificLight/frontend
npm install -g vercel
vercel login
```

### 4.2 Deploy

```bash
# First deployment (will ask questions)
vercel

# Production deployment
vercel --prod
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → pacificlight (or your choice)
- **Directory?** → `./frontend` (or just `.` if already in frontend folder)
- **Override settings?** → No (uses vercel.json)

## Step 5: Configure Backend URL

### Option A: Update vercel.json (Recommended)

Edit `frontend/vercel.json` and replace the placeholder URLs:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-actual-backend-url.com/api/:path*"
    },
    {
      "source": "/assets/:path*",
      "destination": "https://your-actual-backend-url.com/assets/:path*"
    }
  ]
}
```

Then redeploy:
```bash
git add frontend/vercel.json
git commit -m "Update backend URL"
git push
# Vercel will auto-deploy
```

### Option B: Use Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_API_URL` = `https://your-backend-url.com`
3. Update your frontend code to use `import.meta.env.VITE_API_URL`
4. Redeploy

## Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `pacificlightshades.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically configure SSL

## Step 7: Verify Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test:
   - Homepage loads
   - Navigation works
   - Forms submit correctly
   - API calls work (check browser console)
   - Images/assets load

## Troubleshooting

### API Calls Not Working

**Problem**: Frontend can't reach backend

**Solution**:
1. Check `vercel.json` has correct backend URL
2. Ensure backend CORS allows your Vercel domain
3. Check backend is running and accessible
4. Check browser console for errors

### Build Fails

**Problem**: Build errors during deployment

**Solution**:
1. Test build locally: `cd frontend && npm run build`
2. Fix any TypeScript/compilation errors
3. Check build logs in Vercel dashboard
4. Ensure all dependencies are in `package.json`

### Assets Not Loading

**Problem**: Images or assets return 404

**Solution**:
1. Verify `/assets` rewrite in `vercel.json` points to backend
2. Check backend serves assets correctly
3. Verify asset paths in code are relative (e.g., `/assets/...`)

### Routing Issues

**Problem**: Direct URL access or refresh shows 404

**Solution**:
- The `vercel.json` already includes a catch-all rewrite to `/index.html`
- This should handle React Router routing automatically

## Important Notes

1. **Backend Must Be Deployed**: Your backend server must be running and accessible for API calls to work
2. **CORS Configuration**: Make sure your backend allows requests from your Vercel domain
3. **Environment Variables**: Frontend env vars must start with `VITE_` to be accessible
4. **Auto-Deployments**: Vercel auto-deploys on every push to main branch (if connected to GitHub)

## Next Steps

1. ✅ Deploy backend (if not already done)
2. ✅ Update `vercel.json` with backend URL
3. ✅ Deploy frontend to Vercel
4. ✅ Test all functionality
5. ✅ Set up custom domain (optional)
6. ✅ Configure auto-deployments

## Quick Reference

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: https://vercel.com/docs
- **Support**: https://vercel.com/support

