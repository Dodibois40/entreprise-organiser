import { PartialType } from '@nestjs/swagger';
import { CreateBdcDto } from './create-bdc.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateBdcDto extends PartialType(CreateBdcDto) {
  @ApiPropertyOptional({
    description: 'Montant des frais généraux calculés',
    example: 320,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  montantFg?: number;
} 