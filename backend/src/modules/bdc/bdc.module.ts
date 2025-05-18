import { Module } from '@nestjs/common';
import { BdcService } from './bdc.service';
import { BdcController } from './bdc.controller';

@Module({
  controllers: [BdcController],
  providers: [BdcService],
  exports: [BdcService],
})
export class BdcModule {} 