import { Controller, Get, Post, Param, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('stores')
@Controller('store')
export class StoresController {

  // Simple in-memory storage
  private storage: Map<string, any> = new Map();

  resolveStore(host: string | undefined): string {
    if (!host) return 'demo';
    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }
    return 'demo';
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get stored data by key' })
  @ApiResponse({ status: 200, description: 'Returns stored data' })
  async getStoreData(@Param('key') key: string, @Req() req: Request, @Res() res: Response) {
    try {
      const subdomain = this.resolveStore(req.headers.host);
      const storageKey = `${subdomain}:${key}`;
      const data = this.storage.get(storageKey) || null;
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
      const subdomain = this.resolveStore(req.headers.host);
      const storageKey = `${subdomain}:${key}`;
      this.storage.set(storageKey, value);
      res.json({ success: true });
    } catch (e) {
      console.error('Database Error:', e);
      res.status(500).json({ error: 'Database Error' });
    }
  }
}
