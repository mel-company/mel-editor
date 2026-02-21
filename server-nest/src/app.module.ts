import { Module } from '@nestjs/common';
import { StoresModule } from './modules/stores/stores.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { StorageModule } from './modules/storage/storage.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, StoresModule, TemplatesModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
