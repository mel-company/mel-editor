# R2 Upload Test

## Testing the Implementation

### 1. Server Status ✅
The server is running successfully at http://localhost:5173

### 2. API Endpoint Test
You can test the presigned URL endpoint:

```bash
curl -X POST http://localhost:5173/api/v1/upload/presigned-url \
  -H "Content-Type: application/json" \
  -d '{"fileName": "test.jpg", "mimeType": "image/jpeg"}'
```

### 3. Frontend Test
1. Open http://localhost:5173 in your browser
2. Navigate to any section with images
3. Click "إضافة مع خيارات" (Add with options)
4. Try uploading an image

### 4. Expected Behavior
- Image should upload directly to R2 (if configured)
- Loading state should show during upload
- Image URL should be stored in the section data
- Image should display in the preview

### 5. Configuration Required
Before testing, ensure your `.env` file contains:
```env
R2_ACCESS_KEY_ID=your_r2_access_key_here
R2_SECRET_ACCESS_KEY=your_r2_secret_key_here
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

### 6. Fallback Behavior
If R2 is not configured, the system will:
- Show errors in the console
- Fail to generate presigned URLs
- Not upload images (but won't crash the application)

## Implementation Status

✅ **Backend API**: Presigned URL endpoint created  
✅ **Storage Service**: R2 client configured  
✅ **Frontend Hook**: R2 upload hook implemented  
✅ **UI Components**: Updated to use R2 upload  
✅ **Documentation**: Setup guide created  
✅ **Server**: Running successfully  

⚠️ **Environment**: R2 credentials needed for full testing
