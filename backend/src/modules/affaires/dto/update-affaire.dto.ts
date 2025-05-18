import { PartialType } from '@nestjs/swagger';
import { CreateAffaireDto } from './create-affaire.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { StatutAffaire } from '../../../generated/prisma';

export class UpdateAffaireDto extends PartialType(CreateAffaireDto) {
  @ApiPropertyOptional({
    description: 'Statut de l\'affaire',
    enum: StatutAffaire,
    example: 'EN_COURS',
  })
  @IsEnum(StatutAffaire)
  @IsOptional()
  statut?: StatutAffaire;
} 