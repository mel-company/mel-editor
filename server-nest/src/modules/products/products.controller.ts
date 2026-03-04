import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  // Legacy endpoint for compatibility with server API (primary route)
  @Get()
  @ApiOperation({ summary: 'Get products by store (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'Returns products for the store' })
  async getProductsByStore(@Req() req: Request, @Res() res: Response) {
    try {
      // Return mock products directly for now
      const mockProducts = [
        {
          id: 'p1',
          name: 'قميص كلاسيكي',
          title: 'قميص كلاسيكي',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400',
          price: 25,
          description: 'قميص أنيق مناسب للحياة اليومية.',
          variants: [],
          categories: [
            {
              id: '1',
              name: 'ملابس',
              image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200',
            },
          ],
        },
        {
          id: 'p2',
          name: 'حذاء رياضي',
          title: 'حذاء رياضي',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
          price: 45,
          description: 'حذاء مريح للمشي والجري.',
          variants: [],
          categories: [
            {
              id: '2',
              name: 'أحذية',
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
            },
          ],
        },
      ];

      res.json({ data: mockProducts });
    } catch (e) {
      console.error('API Error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
