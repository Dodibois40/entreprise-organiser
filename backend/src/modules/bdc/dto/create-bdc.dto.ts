import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsDate, Min, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBdcDto {
  @ApiProperty({
    description: 'Numéro unique du bon de commande',
    example: 'BDC-2024-001',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^BDC-\d{4}-\d{3}$/, {
    message: 'Le numéro doit être au format BDC-XXXX-XXX (ex: BDC-2024-001)',
  })
  numero: string;

  @ApiProperty({
    description: 'Montant HT du bon de commande',
    example: 3200.5,
  })
  @IsNumber()
  @Min(0)
  montantHt: number;

  @ApiProperty({
    description: 'ID de l\'affaire associée',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  affaireId: string;

  @ApiProperty({
    description: 'ID de la catégorie d\'achat',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  categorieId: string;

  @ApiProperty({
    description: 'Nom du fournisseur',
    example: 'BoisPro SARL',
  })
  @IsString()
  @IsNotEmpty()
  fournisseur: string;

  @ApiPropertyOptional({
    description: 'Date du bon de commande',
    example: '2024-03-15',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateBdc?: Date;

  @ApiPropertyOptional({
    description: 'Date de réception',
    example: '2024-03-30',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateReception?: Date;

  @ApiPropertyOptional({
    description: 'Commentaire sur le bon de commande',
    example: 'Livraison urgente requise',
  })
  @IsString()
  @IsOptional()
  commentaire?: string;
} 