import { Module, Global } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Global()
@Module({
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule { }
