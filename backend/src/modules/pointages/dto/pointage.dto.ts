import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeHeure } from '@prisma/client';

// DTO simplifié pour l'utilisateur dans la réponse de pointage
class PointageUserDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  nom?: string;
  @ApiPropertyOptional()
  prenom?: string;
}

// DTO simplifié pour l'affaire dans la réponse de pointage
class PointageAffaireDto {
  @ApiProperty()
  id: string;
  @ApiPropertyOptional()
  numero?: string;
  @ApiPropertyOptional()
  libelle?: string;
}

export class PointageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  datePointage: Date; // Le service convertit la chaîne en Date

  @ApiProperty()
  nbHeures: number;

  @ApiPropertyOptional()
  commentaire?: string;

  @ApiProperty({ enum: TypeHeure })
  typeHeure: TypeHeure;

  @ApiProperty()
  affaireId: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional({ type: () => PointageUserDto })
  user?: PointageUserDto;

  @ApiPropertyOptional({ type: () => PointageAffaireDto })
  affaire?: PointageAffaireDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 