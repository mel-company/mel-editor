import { Module } from '@nestjs/common';
import { RootModule } from './modules/root/root.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StoresModule } from './modules/stores/stores.module';

@Module({
  imports: [RootModule, ProductsModule, CategoriesModule, StoresModule],
})
export class AppModule { }
