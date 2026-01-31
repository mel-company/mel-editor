# Cloudflare R2 Image Upload Integration

This document explains how to set up and use the Cloudflare R2 direct image upload feature in the editor.

## Overview

The editor now supports direct image uploads to Cloudflare R2 storage, which provides:
- Faster uploads (direct from browser to R2)
- Reduced server load
- Scalable storage solution
- CDN delivery through R2's public URLs

## Setup Instructions

### 1. Cloudflare R2 Configuration

1. Create a Cloudflare account if you don't have one
2. Create an R2 bucket in your Cloudflare dashboard
3. Generate R2 API tokens:
   - Go to Cloudflare Dashboard → R2 → Manage R2 API Tokens
   - Create a token with Object permissions: Read & Write
   - Save the Access Key ID and Secret Access Key

### 2. Environment Configuration

Copy `.env.example` to `.env` and update with your R2 credentials:

```bash
cp .env.example .env
```

Update the following variables in your `.env` file:

```env
# Cloudflare R2 Configuration
R2_ACCESS_KEY_ID=your_r2_access_key_here
R2_SECRET_ACCESS_KEY=your_r2_secret_key_here
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

**Important:**
- `R2_ENDPOINT`: Use your Cloudflare account ID
- `R2_BUCKET_NAME`: The name of your R2 bucket
- `R2_PUBLIC_URL`: The public URL for your bucket (enable public access in R2 settings)

### 3. Enable Public Access (Optional but Recommended)

For direct image access without signed URLs:

1. Go to your R2 bucket settings
2. Enable "Public access"
3. Set up a custom domain if desired (recommended for production)

## How It Works

### Backend Changes

1. **Presigned URL Generation** (`/api/v1/upload/presigned-url`)
   - Generates secure, time-limited upload URLs
   - Validates file type and size
   - Returns both upload URL and final file URL

2. **Storage Service** (`server/services/storage.ts`)
   - Handles R2 client configuration
   - Manages presigned URL generation
   - Maintains backward compatibility with local storage

### Frontend Changes

1. **R2 Upload Hook** (`client/src/shared/hooks/use-r2-upload.ts`)
   - Handles direct browser-to-R2 uploads
   - Provides loading states and error handling
   - No base64 conversion needed

2. **Updated Components**
   - `ImageUploadModal`: Uses R2 upload with progress indication
   - `FileUploadListItem`: Direct R2 uploads
   - `FileUploadBar`: Direct R2 uploads

## Usage

### For Users

1. In the editor side nav, click on any image section
2. Click "إضافة مع خيارات" (Add with options) or "تعديل" (Edit)
3. Upload an image using the modal
4. Image is uploaded directly to R2 and the URL is stored

### For Developers

The upload flow is:
1. User selects image → Frontend requests presigned URL
2. Backend generates presigned URL → Returns to frontend
3. Frontend uploads directly to R2 → R2 stores the file
4. Frontend receives confirmation → Updates image src with R2 URL

## File Structure

```
server/
├── services/
│   └── storage.ts          # R2 client and presigned URL generation
└── api-routes.ts          # New /api/v1/upload/presigned-url endpoint

client/src/shared/
├── hooks/
│   ├── use-r2-upload.ts    # New R2 upload hook
│   └── use-file-upload.ts  # Legacy base64 upload (preserved)
└── components/ui/
    ├── image-upload-modal/
    └── file-upload/
        ├── item/
        └── bar/
```

## Migration Notes

- Existing base64 images continue to work
- New uploads use R2 URLs
- No data migration required
- Backward compatibility maintained

## Security Considerations

- Presigned URLs expire after 60 seconds
- File size limited to 10MB
- Content-Type validation enforced
- R2 bucket permissions should be properly configured

## Troubleshooting

### Common Issues

1. **"Access Denied" errors**
   - Check R2 credentials in `.env`
   - Verify bucket permissions
   - Ensure API token has correct permissions

2. **"CORS errors"**
   - Enable CORS on your R2 bucket
   - Add your domain to allowed origins

3. **"Upload fails"**
   - Check file size (max 10MB)
   - Verify file type (images only)
   - Check network connectivity

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=r2-upload
```

## Performance Benefits

- **Faster uploads**: Direct browser-to-R2, no server bottleneck
- **Reduced server load**: No file processing on server
- **Better scalability**: R2 handles storage and CDN
- **Cost effective**: Pay only for storage and egress

## Future Enhancements

- Image optimization on upload
- Multiple file upload support
- Drag-and-drop improvements
- Upload progress indicators
- Image preview with zoom
