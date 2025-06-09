import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesAchatService } from './categories-achat.service';
import { CategorieAchatDto } from './dto/categorie-achat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategorieAchat } from '../../../generated/prisma';
// Importer les rôles si nécessaire pour protéger la route
// import { Roles } from '../auth/decorators/roles.decorator';
// import { RoleEnum } from '../../generated/prisma';

@ApiTags('categories-achat')
@Controller('categories-achat')
@ApiBearerAuth() // Si toutes les routes de ce contrôleur nécessitent une authentification
@UseGuards(JwtAuthGuard) // Protéger toutes les routes par défaut
export class CategoriesAchatController {
  constructor(private readonly categoriesAchatService: CategoriesAchatService) {}

  @Get()
  // @Roles(RoleEnum.ACHETEUR, RoleEnum.ADMIN_SYS, RoleEnum.CHARGE_AFFAIRE) // Spécifier les rôles si nécessaire
  @ApiOperation({ summary: "Récupérer toutes les catégories d'achat" })
  @ApiResponse({ 
    status: 200, 
    description: "Liste des catégories d'achat récupérée avec succès",
    type: CategorieAchatDto,
    isArray: true,
  })
  async findAll(): Promise<CategorieAchat[]> {
    return this.categoriesAchatService.findAll();
  }

  // D'autres endpoints (POST, PATCH, DELETE, GET /:id) pourraient être ajoutés ici si la gestion CRUD complète est nécessaire.
} 