import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber, Min, IsOptional, IsEnum } from 'class-validator';
import { TypeHeure } from '@prisma/client';

export class UpdatePointageDto {
  @ApiPropertyOptional({
    description: 'Date du pointage au format ISO 8601 (YYYY-MM-DD)',
    example: '2024-05-21',
  })
  @IsOptional()
  @IsDateString()
  datePointage?: string;

  @ApiPropertyOptional({
    description: 'Nombre d\'heures pointées',
    example: 8.0,
    minimum: 0.25,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.25)
  nbHeures?: number;

  @ApiPropertyOptional({
    description: 'Commentaire additionnel sur le pointage',
    example: 'Correction et finitions',
  })
  @IsOptional()
  @IsString()
  commentaire?: string;

  @ApiPropertyOptional({
    description: 'Type d\'heure pointée',
    enum: TypeHeure,
    example: TypeHeure.POSE,
  })
  @IsOptional()
  @IsEnum(TypeHeure)
  typeHeure?: TypeHeure;

  // affaireId et userId ne sont généralement pas modifiables après création.
} 