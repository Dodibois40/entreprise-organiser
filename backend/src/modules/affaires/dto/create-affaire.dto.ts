import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, Min, Matches, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAffaireDto {
  @ApiPropertyOptional({
    description: 'Numéro unique de l\'affaire (généré automatiquement si non fourni)',
    example: '24-BOIS-003',
  })
  @IsOptional()
  numero?: string;

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
    description: 'Adresse complète du chantier',
    example: '123 Rue des Érables, 75000 Paris',
  })
  @IsString()
  @IsOptional()
  adresse?: string;

  @ApiPropertyOptional({
    description: 'Rue (numéro et nom)',
    example: '123 Rue des Érables',
  })
  @IsString()
  @IsOptional()
  rue?: string;

  @ApiPropertyOptional({
    description: 'Code postal',
    example: '75000',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{5}$/, { message: 'Le code postal doit contenir exactement 5 chiffres' })
  codePostal?: string;

  @ApiPropertyOptional({
    description: 'Ville',
    example: 'Paris',
  })
  @IsString()
  @IsOptional()
  ville?: string;

  @ApiPropertyOptional({
    description: 'Pays',
    example: 'France',
  })
  @IsString()
  @IsOptional()
  pays?: string;

  @ApiPropertyOptional({
    description: 'Latitude GPS',
    example: 48.8566,
  })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude GPS',
    example: 2.3522,
  })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Date de commencement prévue',
    example: '2024-03-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCommencement?: Date;

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
    description: 'Objectif d\'heures de service',
    example: 15,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  objectifHeuresSer?: number = 0;

  @ApiPropertyOptional({
    description: 'Objectif de frais généraux',
    example: 3000,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  objectifFraisGeneraux?: number = 0;

  @ApiPropertyOptional({
    description: 'Objectif d\'heures de pose',
    example: 25,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  objectifHeuresPose?: number = 0;
} 