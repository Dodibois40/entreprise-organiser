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
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PointagesService } from './pointages.service';
import { CreatePointageDto } from './dto/create-pointage.dto';
import { UpdatePointageDto } from './dto/update-pointage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum, User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PointageDto } from './dto/pointage.dto'; // Importer le DTO de réponse

@ApiTags('pointages')
@Controller('pointages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Protéger toutes les routes par défaut
export class PointagesController {
  constructor(private readonly pointagesService: PointagesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.CHEF_ATELIER, RoleEnum.CHARGE_AFFAIRE, RoleEnum.ADMIN_SYS) // Seuls certains rôles peuvent créer des pointages pour d'autres, ou l'utilisateur pour lui-même (géré dans le service)
  @ApiOperation({ summary: 'Créer un nouveau pointage' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Pointage créé avec succès', type: PointageDto }) // Utiliser PointageDto
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Données invalides' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Affaire non trouvée' })
  create(@Body() createPointageDto: CreatePointageDto, @CurrentUser() user: User) {
    return this.pointagesService.create(createPointageDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les pointages avec filtres et pagination' })
  @ApiQuery({ name: 'affaireId', required: false, type: String, description: "ID de l'affaire" })
  @ApiQuery({ name: 'userId', required: false, type: String, description: "ID de l'utilisateur" })
  @ApiQuery({ name: 'dateDebut', required: false, type: String, description: "Date de début (YYYY-MM-DD)" })
  @ApiQuery({ name: 'dateFin', required: false, type: String, description: "Date de fin (YYYY-MM-DD)" })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: "Nombre d'éléments à sauter" })
  @ApiQuery({ name: 'take', required: false, type: Number, description: "Nombre d'éléments à prendre" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Liste des pointages', type: [PointageDto] }) // Utiliser [PointageDto]
  findAll(
    @CurrentUser() user: User, // Pour filtrer par utilisateur si pas admin
    @Query('affaireId') affaireId?: string,
    @Query('userId') queryUserId?: string,
    @Query('dateDebut') dateDebut?: string,
    @Query('dateFin') dateFin?: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(100), ParseIntPipe) take?: number,
  ) {
    // Si l'utilisateur n'est pas admin ou chef d'atelier, il ne voit que ses propres pointages
    // Sauf si un userId spécifique est demandé (et qu'il a le droit de le voir, à gérer plus finement si besoin)
    let effectiveUserId = queryUserId;
    if (user.role !== RoleEnum.ADMIN_SYS && user.role !== RoleEnum.CHEF_ATELIER && user.role !== RoleEnum.CHARGE_AFFAIRE) {
      effectiveUserId = user.id;
    }
    return this.pointagesService.findAll(affaireId, effectiveUserId, dateDebut, dateFin, skip, take);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un pointage par son ID' })
  @ApiParam({ name: 'id', description: "ID du pointage", type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pointage trouvé', type: PointageDto }) // Utiliser PointageDto
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pointage non trouvé' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.pointagesService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.CHEF_ATELIER, RoleEnum.ADMIN_SYS) // Ou l'utilisateur lui-même (géré dans le service)
  @ApiOperation({ summary: 'Mettre à jour un pointage' })
  @ApiParam({ name: 'id', description: "ID du pointage", type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pointage mis à jour', type: PointageDto }) // Utiliser PointageDto
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pointage non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Action non autorisée' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePointageDto: UpdatePointageDto,
    @CurrentUser() user: User,
  ) {
    return this.pointagesService.update(id, updatePointageDto, user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.CHEF_ATELIER, RoleEnum.ADMIN_SYS) // Ou l'utilisateur lui-même (géré dans le service)
  @ApiOperation({ summary: 'Supprimer un pointage' })
  @ApiParam({ name: 'id', description: "ID du pointage", type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pointage supprimé', type: PointageDto }) // Utiliser PointageDto
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pointage non trouvé' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Action non autorisée' })
  remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    return this.pointagesService.remove(id, user);
  }
} 