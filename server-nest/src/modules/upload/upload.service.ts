import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { Express } from 'express';

@Injectable()
export class UploadService {
  resolveStore(host: string): string {
    // Extract subdomain from host or return default
    if (!host) return 'demo';
    
    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }
    
    return 'demo';
  }

  async processUpload(file: Express.Multer.File, storeId: string): Promise<string> {
    const fileBuffer = await fs.readFile(file.path);
    
    // For now, always return local path
    // In the future, this could integrate with R2 like the original server
    const fileUrl = `/uploads/${file.filename}`;
    console.log('📁 File saved locally:', fileUrl);
    
    // Clean up temp file after processing
    await fs.unlink(file.path);
    
    return fileUrl;
  }

  isR2Available(): boolean {
    // Check if R2 environment variables are configured
    return !!(
      process.env.R2_ACCESS_KEY &&
      process.env.R2_SECRET_KEY &&
      process.env.R2_ENDPOINT &&
      process.env.R2_BUCKET &&
      process.env.R2_PUBLIC_URL
    );
  }
}
