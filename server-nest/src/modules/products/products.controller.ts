import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // Legacy endpoint for compatibility with server API (primary route)
  @Get()
  @ApiOperation({ summary: 'Get products by store (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'Returns products for the store' })
  async getProductsByStore(@Req() req: Request, @Res() res: Response) {
    try {
      const host = req.get('host') || '';
      const products = await this.productsService.getProductsByStore(host);
      res.json({ data: products });
    } catch (e) {
      console.error('API Error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @ApiOperation({ summary: 'Get categories by store' })
  @ApiResponse({ status: 200, description: 'Returns categories for the store' })
  async getCategoriesByStore(@Req() req: Request, @Res() res: Response) {
    try {
      const host = req.get('host') || '';
      const categories = await this.productsService.getCategoriesByStore(host);
      res.json({ data: categories });
    } catch (e) {
      console.error('API Error:', e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
