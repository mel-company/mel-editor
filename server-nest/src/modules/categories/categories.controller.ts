import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {

  // Legacy endpoint for compatibility with server API (primary route)
  @Get()
  @ApiOperation({ summary: 'Get categories by store (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'Returns categories for the store' })
  async getCategoriesByStore(@Req() req: Request, @Res() res: Response) {
    try {
      // Return mock data directly
      const mockCategories = [
        {
          id: "1",
          name: "ملابس",
          thumbnail: {
            url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200",
          },
        },
        {
          id: "2",
          name: "أحذية",
          thumbnail: {
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
          },
        },
        {
          id: "3",
          name: "إلكترونيات",
          thumbnail: {
            url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200",
          },
        },
        {
          id: "4",
          name: "إكسسوارات",
          thumbnail: {
            url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200",
          },
        },
        {
          id: "5",
          name: "عطور",
          thumbnail: {
            url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200",
          },
        }
      ];

      res.json({ data: mockCategories });
    } catch (e) {
      console.error('API Error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
