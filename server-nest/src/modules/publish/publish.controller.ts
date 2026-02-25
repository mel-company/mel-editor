import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('publish')
@Controller('publish')
export class PublishController {

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publish content' })
  @ApiResponse({ status: 200, description: 'Content published successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async publish(@Body() data: any) {
    try {
      // Implement publish logic directly (similar to other controllers)
      console.log('Publishing data:', data);

      // For now, return a success response
      const result = {
        success: true,
        message: 'Content published successfully',
        data: data
      };

      return result;
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
