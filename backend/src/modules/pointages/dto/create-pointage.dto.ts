import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsNumber, Min, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TypeHeure } from '@prisma/client';

export class CreatePointageDto {
  @ApiProperty({
    description: 'Date du pointage au format ISO 8601 (YYYY-MM-DD)',
    example: '2024-05-20',
  })
  @IsNotEmpty()
  @IsDateString()
  datePointage: string;

  @ApiProperty({
    description: 'Nombre d\'heures pointées',
    example: 7.5,
    minimum: 0.25, // Par exemple, un minimum de 15 minutes
  })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.25)
  nbHeures: number;

  @ApiPropertyOptional({
    description: 'Commentaire additionnel sur le pointage',
    example: 'Finalisation de la découpe',
  })
  @IsOptional()
  @IsString()
  commentaire?: string;

  @ApiProperty({
    description: 'Type d\'heure pointée',
    enum: TypeHeure,
    example: TypeHeure.FAB,
  })
  @IsNotEmpty()
  @IsEnum(TypeHeure)
  typeHeure: TypeHeure;

  @ApiProperty({
    description: 'ID de l\'affaire concernée',
    example: 'clq2p5zvh0000s97p7q3g3k8d',
  })
  @IsNotEmpty()
  @IsUUID()
  affaireId: string;
} 