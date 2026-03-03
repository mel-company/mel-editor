import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [CategoriesController],
  providers: [ProductsService],
})
export class CategoriesModule {}