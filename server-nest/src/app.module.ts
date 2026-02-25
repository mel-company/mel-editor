import { Module } from '@nestjs/common';
import { RootModule } from './modules/root/root.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StoresModule } from './modules/stores/stores.module';
import { PublishModule } from './modules/publish/publish.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [RootModule, ProductsModule, CategoriesModule, StoresModule, PublishModule, UploadModule],
})
export class AppModule { }
