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
  Put,
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
import { UpdateAffaireReelDto } from './dto/update-affaire-reel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { RoleEnum, StatutAffaire } from '@prisma/client';

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

  @Patch(':id/reel')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Mettre à jour les données réelles d\'une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Données réelles mises à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  updateReel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAffaireReelDto: UpdateAffaireReelDto,
  ) {
    return this.affairesService.updateReel(id, updateAffaireReelDto);
  }

  @Post(':id/calculate-real')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Calculer automatiquement les données réelles à partir des devis validés, achats validés et pointages' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Données réelles calculées avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  calculateReal(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.calculateRealFromData(id);
  }

  @Get(':id/comparative-stats')
  @ApiOperation({ summary: 'Obtenir les statistiques comparatives (Objectif vs Réel)' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Statistiques comparatives récupérées avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  getComparativeStats(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.getComparativeStats(id);
  }

  @Get(':id/financial-situation')
  @ApiOperation({ summary: 'Obtenir la situation financière complète d\'une affaire (incluant les coûts des phases)' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Situation financière récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  getFinancialSituation(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.getFinancialSituation(id);
  }

  @Get(':id/phases-costs')
  @ApiOperation({ summary: 'Calculer les coûts totaux des phases d\'une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Coûts des phases calculés avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  getPhasesCosts(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.calculatePhasesTotalCosts(id);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN_SYS)
  @ApiOperation({ summary: 'Supprimer une affaire' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Affaire supprimée avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  @ApiResponse({ status: 409, description: 'Conflit - l\'affaire a des dépendances associées' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.remove(id);
  }

  @Delete(':id/force')
  @Roles(RoleEnum.ADMIN_SYS)
  @ApiOperation({ summary: 'Supprimer une affaire et toutes ses dépendances (suppression forcée)' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire' })
  @ApiResponse({ status: 200, description: 'Affaire et toutes ses dépendances supprimées avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  @ApiResponse({ status: 409, description: 'Erreur lors de la suppression' })
  removeWithDependencies(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.removeWithDependencies(id);
  }

  @Get(':id/achats-categorie')
  async getAchatsParCategorie(@Param('id') id: string) {
    // Version temporaire avec données mockées
    return {
      affaire: {
        id,
        numero: 'AF2024-001',
        libelle: 'Projet Test',
        objectifAchatHt: 15000,
      },
      comparatifParCategorie: [
        {
          categorie: {
            id: '1',
            code: 'BOIS',
            intitule: 'Bois',
            pourcentageFg: 10,
          },
          montantEstime: 5000,
          montantReel: 4800,
          montantFgReel: 480,
          nombreAchats: 3,
          ecart: -200,
          pourcentageRealise: 96,
        },
        {
          categorie: {
            id: '2',
            code: 'QUINC',
            intitule: 'Quincaillerie',
            pourcentageFg: 15,
          },
          montantEstime: 3000,
          montantReel: 3200,
          montantFgReel: 480,
          nombreAchats: 2,
          ecart: 200,
          pourcentageRealise: 106.7,
        },
        {
          categorie: {
            id: '3',
            code: 'CONSOM',
            intitule: 'Consommables',
            pourcentageFg: 5,
          },
          montantEstime: 1500,
          montantReel: 1200,
          montantFgReel: 60,
          nombreAchats: 5,
          ecart: -300,
          pourcentageRealise: 80,
        },
      ],
      achatsNonAffectes: [
        {
          id: 'a1',
          numero: 'ACH001',
          numeroFacture: 'F001',
          montantHt: 250,
          fournisseur: 'Fournisseur X',
          dateFacture: new Date().toISOString(),
        },
        {
          id: 'a2',
          numero: 'ACH002',
          numeroFacture: 'F002',
          montantHt: 180,
          fournisseur: 'Fournisseur Y',
          dateFacture: new Date().toISOString(),
        },
      ],
      totaux: {
        totalEstime: 9500,
        totalReel: 9200,
        totalFgReel: 1020,
        totalNonAffecte: 430,
        ecartGlobal: -300,
        pourcentageGlobalRealise: 96.8,
      },
    };
  }

  @Put(':id/estimations-achat-categorie')
  async updateEstimationsAchatCategorie(
    @Param('id') id: string,
    @Body() estimationsData: { estimations: Array<{ categorieId: string; montantEstime: number }> }
  ) {
    // Version temporaire - renvoie juste les données mises à jour mockées
    return this.getAchatsParCategorie(id);
  }

  @Post(':id/duplicate')
  @Roles(RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE)
  @ApiOperation({ summary: 'Dupliquer une affaire avec un nouveau numéro' })
  @ApiParam({ name: 'id', description: 'ID de l\'affaire à dupliquer' })
  @ApiResponse({ status: 201, description: 'Affaire dupliquée avec succès' })
  @ApiResponse({ status: 404, description: 'Affaire non trouvée' })
  @ApiResponse({ status: 409, description: 'Erreur lors de la duplication' })
  duplicate(@Param('id', ParseUUIDPipe) id: string) {
    return this.affairesService.duplicate(id);
  }
} 