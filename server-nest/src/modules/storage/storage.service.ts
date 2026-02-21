import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import 'dotenv/config';

@Injectable()
export class StorageService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.R2_ENDPOINT,
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
      region: 'auto',
    });
    this.bucketName = process.env.R2_BUCKET_NAME || '';
  }

  async uploadFile(file: Express.Multer.File) {
    const key = `uploads/${Date.now()}-${file.originalname}`;
    
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();
    
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    
    return {
      success: true,
      url: publicUrl,
      key: key,
    };
  }

  async deleteFile(key: string) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
    
    return {
      success: true,
      message: 'File deleted successfully',
    };
  }
}
