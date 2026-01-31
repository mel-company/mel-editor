import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AWS from 'aws-sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../../client/public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Cloudflare R2 configuration
console.log('R2 ENV CHECK:', {
    hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY,
    hasEndpoint: !!process.env.R2_ENDPOINT,
    hasBucket: !!process.env.R2_BUCKET_NAME,
    hasPublicUrl: !!process.env.R2_PUBLIC_URL,
});
const hasR2Config = process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_ENDPOINT;

let r2Client: AWS.S3 | null = null;
if (hasR2Config) {
    r2Client = new AWS.S3({
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    });
}

const R2_BUCKET = process.env.R2_BUCKET_NAME || 'my-bucket';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-xxxxxxxx.r2.dev';

const isR2Configured = !!r2Client;

console.log('R2 Configuration:', isR2Configured ? '✅ Enabled' : '❌ Disabled (missing env vars)');

// Upload file to R2 via server (avoids CORS issues with direct browser upload)
export const uploadFileToR2 = async (fileName: string, fileBuffer: Buffer, mimeType: string, storeId?: string): Promise<string> => {
    if (!isR2Configured || !r2Client) {
        throw new Error('R2 is not configured');
    }
    
    // Organize files by store ID if provided
    const basePath = storeId ? `stores/${storeId}` : 'uploads';
    const key = `${basePath}/${Date.now()}-${fileName}`;
    
    await r2Client.putObject({
        Bucket: R2_BUCKET,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
    }).promise();
    
    return `${R2_PUBLIC_URL}/${key}`;
};

export const isR2Available = () => isR2Configured;

// Legacy local storage function (for CSS files)
export const uploadFile = async (fileName: string, content: string): Promise<string> => {
    const filePath = path.join(UPLOAD_DIR, fileName);
    await fs.promises.writeFile(filePath, content, 'utf-8');

    // Return URL relative to public (will be served by Vite/Express)
    return `/uploads/${fileName}`;
};

// Upload file directly to R2 (for server-side uploads)
export const uploadToR2 = async (fileName: string, content: Buffer, mimeType: string): Promise<string> => {
    if (!r2Client) {
        throw new Error('R2 is not configured');
    }
    
    const key = `uploads/${Date.now()}-${fileName}`;
    
    await r2Client.upload({
        Bucket: R2_BUCKET,
        Key: key,
        Body: content,
        ContentType: mimeType,
        ACL: 'public-read',
    }).promise();
    
    return `${R2_PUBLIC_URL}/${key}`;
};
