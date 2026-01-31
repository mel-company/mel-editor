# Quick R2 Setup Guide

## Step 1: Get Your R2 Credentials

### 1.1 Create R2 Bucket
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage**
3. Click **"Create bucket"**
4. Give it a name (e.g., `editor-uploads`)
5. Select a location (choose closest to your users)

### 1.2 Get API Credentials
1. In Cloudflare Dashboard → **R2** → **Manage R2 API tokens**
2. Click **"Create API token"**
3. Use these settings:
   - **Token name**: `editor-uploads`
   - **Permissions**: `Object Read and Write`
   - **Account resources**: `All accounts`
   - **Zone resources**: `None`
4. Copy the **Access Key ID** and **Secret Access Key**

### 1.3 Get Account ID
1. In Cloudflare Dashboard sidebar → **Account ID** (copy this number)

### 1.4 Enable Public Access (Optional but recommended)
1. Go to your bucket settings
2. Enable **"Public access"**
3. Note the public URL or set up custom domain

## Step 2: Update Your .env File

Replace the placeholder values in your `.env` file:

```env
# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=YOUR_ACTUAL_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY=YOUR_ACTUAL_SECRET_KEY
R2_ENDPOINT=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

**Where to find each value:**
- `R2_ACCESS_KEY_ID`: From the API token you created
- `R2_SECRET_ACCESS_KEY`: From the API token you created  
- `R2_ENDPOINT`: `https://` + your Account ID + `.r2.cloudflarestorage.com`
- `R2_BUCKET_NAME`: The name you gave your bucket
- `R2_PUBLIC_URL`: Your bucket's public URL (from R2 settings)

## Step 3: Restart Server

After updating `.env`:
```bash
pkill -f "tsx server/index.ts"
npm run dev
```

## Step 4: Test R2 Upload

1. Try uploading an image in the editor
2. Check the URL - it should now be an R2 URL like:
   `https://pub-xxxxxxxx.r2.dev/uploads/1738301234567-image.jpg`

## Current Status: Local Fallback

Right now, uploads go to `/uploads/filename` because R2 credentials aren't set.
Once you configure R2, uploads will automatically switch to R2 URLs.

## Troubleshooting

If uploads still go to local storage:
1. Check that all 5 R2 variables are set in `.env`
2. Restart the server
3. Check server console for R2 configuration errors
4. Verify your R2 bucket permissions
