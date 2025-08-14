# 🚀 Deployment Instructions for Netlify

## Your GitHub Repository is Ready! ✅
Repository URL: https://github.com/nickaw97/xental-landing-page

## Deploy to Netlify (Web Interface Method)

### Step 1: Go to Netlify
1. Open your browser and go to: https://app.netlify.com
2. Log in to your Netlify account (or create one if you don't have one)

### Step 2: Import from GitHub
1. Click the **"Add new site"** button
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account if prompted

### Step 3: Select Your Repository
1. Search for **"xental-landing-page"** or find it in the list
2. Click on the repository to select it

### Step 4: Configure Build Settings
Netlify should automatically detect these settings from the `netlify.toml` file, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (should be auto-configured)

### Step 5: Set Environment Variables (IMPORTANT!)
Before deploying, click on **"Show advanced"** and add your Supabase environment variables:
1. Click **"New variable"**
2. Add the following:
   - Key: `VITE_SUPABASE_URL`
   - Value: [Your Supabase URL from your .env file]
3. Add another variable:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: [Your Supabase Anonymous Key from your .env file]

### Step 6: Deploy
1. Click **"Deploy site"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at a URL like: `https://[your-site-name].netlify.app`

### Step 7: (Optional) Custom Domain
Once deployed, you can:
1. Go to **"Domain settings"**
2. Add a custom domain (xental.ai or a subdomain)
3. Follow Netlify's instructions for DNS configuration

## Alternative: Drag & Drop Method

If you prefer, you can also:
1. Build the site locally: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder to the browser window
4. Site will be instantly deployed!

## Automatic Deployments

Once connected via GitHub:
- Every push to the `main` branch will trigger an automatic deployment
- You can see deployment status in both GitHub and Netlify dashboards

## Support

If you encounter any issues:
- Check the deployment logs in Netlify
- Ensure environment variables are correctly set
- Verify the build command and publish directory

## Your Repository Details
- **GitHub URL**: https://github.com/nickaw97/xental-landing-page
- **Main branch**: main
- **Build output**: dist folder
- **Framework**: React + Vite + TypeScript

---

## Quick Commands for Future Updates

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push

# Netlify will automatically deploy!
```

Congratulations! Your stunning Xental.ai landing page is ready for deployment! 🎉