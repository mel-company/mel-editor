import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('root')
@Controller()
export class RootController {

  @Get('test')
  @ApiOperation({ summary: 'Test endpoint' })
  @ApiResponse({ status: 200, description: 'Server is working' })
  async test(@Req() req: Request, @Res() res: Response) {
    res.json({ message: 'Server is working' });
  }
}
