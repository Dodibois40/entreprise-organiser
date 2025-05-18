import { Module } from '@nestjs/common';
import { AffairesService } from './affaires.service';
import { AffairesController } from './affaires.controller';

@Module({
  controllers: [AffairesController],
  providers: [AffairesService],
  exports: [AffairesService],
})
export class AffairesModule {} 