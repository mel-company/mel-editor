import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Req,
  Res,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {
    console.log('UploadController initialized, uploadService:', !!uploadService);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './client/public/uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => (Math.round(Math.random() * 16)).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    })
  )
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'No file uploaded' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Temporarily inline the upload logic to bypass DI issue
      const storeId = body.storeId || 'demo';
      console.log('📤 Upload - storeId:', storeId, 'host:', req.get('host'));

      // Simple inline upload logic
      const fileUrl = `/uploads/${file.filename}`;
      console.log('📁 File saved locally:', fileUrl);

      res.json({
        success: true,
        fileUrl,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }
}
