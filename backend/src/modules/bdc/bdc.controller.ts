import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam, 
  ApiQuery,
  ApiProperty 
} from '@nestjs/swagger';
import { BdcService } from './bdc.service';
import { CreateBdcDto } from './dto/create-bdc.dto';
import { UpdateBdcDto } from './dto/update-bdc.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../../../generated/prisma';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

// DTO pour la réception d'un BDC
class ReceptionBdcDto {
  @ApiProperty({
    description: 'Date de réception du bon de commande',
    example: '2024-03-30',
  })
  @IsDate()
  @Type(() => Date)
  dateReception: Date;
}

@ApiTags('bdc')
@Controller('bdc')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BdcController {
  constructor(private readonly bdcService: BdcService) {}

  @Post()
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.ACHETEUR, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Créer un nouveau bon de commande' })
  @ApiResponse({ status: 201, description: 'Bon de commande créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Conflit - numéro déjà existant' })
  create(@Body() createBdcDto: CreateBdcDto) {
    return this.bdcService.create(createBdcDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les bons de commande avec pagination et filtres' })
  @ApiQuery({ name: 'affaireId', required: false, description: 'Filtrer par ID d\'affaire' })
  @ApiQuery({ name: 'fournisseur', required: false, description: 'Filtrer par fournisseur' })
  @ApiQuery({ name: 'skip', required: false, description: 'Nombre d\'éléments à sauter (pagination)' })
  @ApiQuery({ name: 'take', required: false, description: 'Nombre d\'éléments à prendre (pagination)' })
  @ApiResponse({ status: 200, description: 'Liste des bons de commande récupérée avec succès' })
  findAll(
    @Query('affaireId') affaireId?: string,
    @Query('fournisseur') fournisseur?: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
  ) {
    return this.bdcService.findAll(affaireId, fournisseur, skip, take);
  }

  @Get('affaire/:affaireId/stats')
  @ApiOperation({ summary: 'Récupérer les statistiques d\'achat pour une affaire' })
  @ApiParam({ name: 'affaireId', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  getStatsByAffaire(@Param('affaireId', ParseUUIDPipe) affaireId: string) {
    return this.bdcService.getStatsByAffaire(affaireId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un bon de commande par son ID' })
  @ApiParam({ name: 'id', description: 'ID du bon de commande' })
  @ApiResponse({ status: 200, description: 'Bon de commande récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Bon de commande non trouvé' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bdcService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.ACHETEUR, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Mettre à jour un bon de commande' })
  @ApiParam({ name: 'id', description: 'ID du bon de commande' })
  @ApiResponse({ status: 200, description: 'Bon de commande mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Bon de commande non trouvé' })
  @ApiResponse({ status: 409, description: 'Conflit - numéro déjà existant' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBdcDto: UpdateBdcDto,
  ) {
    return this.bdcService.update(id, updateBdcDto);
  }

  @Patch(':id/receptionner')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.ACHETEUR)
  @ApiOperation({ summary: 'Réceptionner un bon de commande' })
  @ApiParam({ name: 'id', description: 'ID du bon de commande' })
  @ApiResponse({ status: 200, description: 'Bon de commande réceptionné avec succès' })
  @ApiResponse({ status: 404, description: 'Bon de commande non trouvé' })
  receptionner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() receptionDto: ReceptionBdcDto,
  ) {
    return this.bdcService.receptionner(id, receptionDto.dateReception);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN_SYS)
  @ApiOperation({ summary: 'Supprimer un bon de commande' })
  @ApiParam({ name: 'id', description: 'ID du bon de commande' })
  @ApiResponse({ status: 200, description: 'Bon de commande supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Bon de commande non trouvé' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bdcService.remove(id);
  }
} 