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
  ApiQuery 
} from '@nestjs/swagger';
import { AffairesService } from './affaires.service';
import { CreateAffaireDto } from './dto/create-affaire.dto';
import { UpdateAffaireDto } from './dto/update-affaire.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum, StatutAffaire } from '../../../generated/prisma';

@ApiTags('affaires')
@Controller('affaires')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AffairesController {
  constructor(private readonly affairesService: AffairesService) {}

  @Post()
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Créer une nouvelle affaire' })
  @ApiResponse({ status: 201, description: 'Affaire créée avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Conflit - numéro déjà existant' })
  create(@Body() createAffaireDto: CreateAffaireDto) {
    return this.affairesService.create(createAffaireDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les affaires avec pagination et filtres' })
  @ApiQuery({ name: 'search', required: false, description: 'Recherche par numéro, libellé ou client' })
  @ApiQuery({ name: 'statut', required: false, enum: StatutAffaire, description: 'Filtre par statut' })
  @ApiQuery({ name: 'skip', required: false, description: 'Nombre d\'éléments à sauter (pagination)' })
  @ApiQuery({ name: 'take', required: false, description: 'Nombre d\'éléments à prendre (pagination)' })
  @ApiResponse({ status: 200, description: 'Liste des affaires récupérée avec succès' })
  findAll(
    @Query('search') search?: string,
    @Query('statut') statut?: StatutAffaire,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
  ) {
    return this.affairesService.findAll(search, statut, skip, take);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques globales des affaires' })
  @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès' })
  getStats() {
    return this.affairesService.getGlobalStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une affaire par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Affaire récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Mettre à jour une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Affaire mise à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  @ApiResponse({ status: 409, description: 'Conflit - numéro déjà existant' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAffaireDto: UpdateAffaireDto,
  ) {
    return this.affairesService.update(id, updateAffaireDto);
  }

  @Patch(':id/statut')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Mettre à jour le statut d\'une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  updateStatut(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('statut') statut: StatutAffaire,
  ) {
    return this.affairesService.updateStatut(id, statut);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN_SYS)
  @ApiOperation({ summary: 'Supprimer une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Affaire supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  @ApiResponse({ status: 409, description: 'Conflit - l\'affaire a des BDC ou pointages associés' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.remove(id);
  }
} 