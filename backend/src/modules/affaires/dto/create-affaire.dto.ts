import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, Min, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAffaireDto {
  @ApiProperty({
    description: 'Numéro unique de l\'affaire',
    example: '24-BOIS-003',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-[A-Z]{3,4}-\d{3}$/, {
    message: 'Le numéro doit être au format XX-XXX-XXX (ex: 24-BOIS-003)',
  })
  numero: string;

  @ApiProperty({
    description: 'Libellé de l\'affaire',
    example: 'Rénovation fenêtres maison',
  })
  @IsString()
  @IsNotEmpty()
  libelle: string;

  @ApiProperty({
    description: 'Nom du client',
    example: 'M. Dupont',
  })
  @IsString()
  @IsNotEmpty()
  client: string;

  @ApiPropertyOptional({
    description: 'Adresse du chantier',
    example: '123 Rue des Érables, 75000 Paris',
  })
  @IsString()
  @IsOptional()
  adresse?: string;

  @ApiPropertyOptional({
    description: 'Date prévue de clôture',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCloturePrevue?: Date;

  @ApiProperty({
    description: 'Objectif de chiffre d\'affaires HT',
    example: 15000,
  })
  @IsNumber()
  @Min(0)
  objectifCaHt: number;

  @ApiProperty({
    description: 'Objectif d\'achat HT',
    example: 8000,
  })
  @IsNumber()
  @Min(0)
  objectifAchatHt: number;

  @ApiProperty({
    description: 'Objectif d\'heures de fabrication',
    example: 120,
  })
  @IsNumber()
  @Min(0)
  objectifHeuresFab: number;

  @ApiPropertyOptional({
    description: 'Heures de service',
    example: 10,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  ser?: number = 0;

  @ApiPropertyOptional({
    description: 'Heures de pose',
    example: 25,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  pose?: number = 0;
} 