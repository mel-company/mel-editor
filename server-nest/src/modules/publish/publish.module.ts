import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [StoresModule],
  controllers: [PublishController],
})
export class PublishModule { }
