import { Module } from '@nestjs/common';
import { BdcService } from './bdc.service';
import { BdcController } from './bdc.controller';
import { UploadService } from '../../common/services/upload.service';

@Module({
  controllers: [BdcController],
  providers: [BdcService, UploadService],
  exports: [BdcService],
})
export class BdcModule {} 