import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { storageManager } from '../../shared/storage/storage-manager';

@ApiTags('publish')
@Controller('publish')
export class PublishController {

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publish content' })
  @ApiResponse({ status: 200, description: 'Content published successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async publish(@Body() data: any, @Req() req: Request) {
    try {
      console.log('Publishing store data...');

      const { pages, storeSettings } = data;

      if (!pages || !storeSettings) {
        return {
          success: false,
          message: 'Missing required data: pages and storeSettings are required',
        };
      }

      // Get subdomain from request or use default
      const subdomain = storageManager.resolveStore(req.headers.host);
      console.log(`Publishing to subdomain: ${subdomain}`);

      // Save pages data
      storageManager.set('editor-pages-storage', pages, req.headers.host);
      console.log(`✅ Saved pages to ${subdomain}:editor-pages-storage`, {
        pagesCount: Array.isArray(pages) ? pages.length : 'not array',
      });

      // Save store settings data
      storageManager.set('editor-store-settings-storage', storeSettings, req.headers.host);
      console.log(`✅ Saved settings to ${subdomain}:editor-store-settings-storage`, {
        hasSettings: !!storeSettings,
      });

      return {
        success: true,
        message: 'Content published successfully',
        subdomain,
      };
    } catch (error) {
      console.error('Publish error:', error);
      return {
        success: false,
        message: 'Failed to publish content',
        error: error.message
      };
    }
  }
}
