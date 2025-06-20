import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN_SYS', 'CHARGE_AFFAIRE')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('actif') actif?: string,
  ) {
    try {
      return await this.usersService.findAll({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
        search,
        role,
        actif,
      });
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des utilisateurs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  @Roles('ADMIN_SYS', 'CHARGE_AFFAIRE')
  async getStats() {
    try {
      return await this.usersService.getStats();
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des statistiques',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('by-role/:role')
  @Roles('ADMIN_SYS', 'CHARGE_AFFAIRE')
  async findByRole(@Param('role') role: string) {
    try {
      return await this.usersService.findByRole(role);
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des utilisateurs par rôle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @Roles('ADMIN_SYS', 'CHARGE_AFFAIRE')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error.message === 'Utilisateur non trouvé') {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur lors de la récupération de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @Roles('ADMIN_SYS')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Cet email est déjà utilisé', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Erreur lors de la création de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @Roles('ADMIN_SYS')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('Cet email est déjà utilisé', HttpStatus.CONFLICT);
      }
      if (error.code === 'P2025') {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur lors de la modification de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @Roles('ADMIN_SYS')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur lors de la suppression de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/reactivate')
  @Roles('ADMIN_SYS')
  async reactivate(@Param('id') id: string) {
    try {
      return await this.usersService.reactivate(id);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erreur lors de la réactivation de l\'utilisateur',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/password')
  @Roles('ADMIN_SYS')
  async changePassword(
    @Param('id') id: string,
    @Body() passwordData: { currentPassword: string; newPassword: string },
  ) {
    try {
      return await this.usersService.changePassword(id, passwordData);
    } catch (error) {
      if (error.message === 'Utilisateur non trouvé') {
        throw new HttpException('Utilisateur non trouvé', HttpStatus.NOT_FOUND);
      }
      if (error.message === 'Mot de passe actuel incorrect') {
        throw new HttpException('Mot de passe actuel incorrect', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Erreur lors du changement de mot de passe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 