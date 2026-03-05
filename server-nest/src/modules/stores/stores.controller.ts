import { Controller, Get, Post, Param, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { storageManager } from '../../shared/storage/storage-manager';

@ApiTags('stores')
@Controller('store')
export class StoresController {
  @Get(':key')
  @ApiOperation({ summary: 'Get stored data by key' })
  @ApiResponse({ status: 200, description: 'Returns stored data' })
  async getStoreData(@Param('key') key: string, @Req() req: Request, @Res() res: Response) {
    try {
      const data = storageManager.get(key, req.headers.host);
      res.json({ data });
    } catch (e) {
      console.error('Database Error:', e);
      res.status(500).json({ error: 'Database Error' });
    }
  }

  @Post(':key')
  @ApiOperation({ summary: 'Store data by key' })
  @ApiResponse({ status: 200, description: 'Data stored successfully' })
  async setStoreData(@Param('key') key: string, @Req() req: Request, @Res() res: Response) {
    try {
      const { value } = req.body;
      storageManager.set(key, value, req.headers.host);
      res.json({ success: true });
    } catch (e) {
      console.error('Database Error:', e);
      res.status(500).json({ error: 'Database Error' });
    }
  }
}
