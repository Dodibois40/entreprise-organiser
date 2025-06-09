import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Pointage, Prisma, User } from '@prisma/client';
import { CreatePointageDto } from './dto/create-pointage.dto';
import { UpdatePointageDto } from './dto/update-pointage.dto';

@Injectable()
export class PointagesService {
  constructor(private prisma: PrismaService) {}

  async create(createPointageDto: CreatePointageDto, user: User): Promise<Pointage> {
    // Vérifier que l'affaire existe
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: createPointageDto.affaireId },
    });
    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${createPointageDto.affaireId} non trouvée.`);
    }

    return this.prisma.pointage.create({
      data: {
        ...createPointageDto,
        datePointage: new Date(createPointageDto.datePointage), // Convertir la chaîne en Date
        userId: user.id, // Associer le pointage à l'utilisateur authentifié
      },
    });
  }

  async findAll(
    affaireId?: string,
    userId?: string,
    dateDebut?: string,
    dateFin?: string,
    skip = 0,
    take = 100, // Augmenter la valeur par défaut pour les calendriers/timesheets
  ): Promise<{ pointages: Pointage[]; total: number }> {
    const where: Prisma.PointageWhereInput = {};
    if (affaireId) where.affaireId = affaireId;
    if (userId) where.userId = userId;

    // Correction pour le spread operator sur un possible undefined
    if (dateDebut || dateFin) {
      where.datePointage = where.datePointage || {}; // Initialiser si undefined
      if (dateDebut) {
        (where.datePointage as Prisma.DateTimeFilter).gte = new Date(dateDebut);
      }
      if (dateFin) {
        (where.datePointage as Prisma.DateTimeFilter).lte = new Date(dateFin);
      }
    }

    const [pointages, total] = await this.prisma.$transaction([
      this.prisma.pointage.findMany({
        where,
        include: {
          user: { select: { id: true, nom: true, prenom: true } }, // Inclure les infos de l'utilisateur
          affaire: { select: { id: true, numero: true, libelle: true } }, // Inclure les infos de l'affaire
        },
        orderBy: { datePointage: 'desc' },
        skip,
        take,
      }),
      this.prisma.pointage.count({ where }),
    ]);
    return { pointages, total };
  }

  async findOne(id: string, currentUser: User): Promise<Pointage> {
    const pointage = await this.prisma.pointage.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, nom: true, prenom: true } },
        affaire: { select: { id: true, numero: true, libelle: true } },
      },
    });

    if (!pointage) {
      throw new NotFoundException(`Pointage avec ID ${id} non trouvé.`);
    }

    // Optionnel: Vérifier si l'utilisateur a le droit de voir ce pointage
    // (par exemple, si c'est son propre pointage ou s'il est admin/chef d'atelier)
    // if (pointage.userId !== currentUser.id && currentUser.role !== RoleEnum.ADMIN_SYS && currentUser.role !== RoleEnum.CHEF_ATELIER) {
    //   throw new ForbiddenException("Vous n'êtes pas autorisé à voir ce pointage.");
    // }

    return pointage;
  }

  async update(id: string, updatePointageDto: UpdatePointageDto, currentUser: User): Promise<Pointage> {
    const pointage = await this.prisma.pointage.findUnique({ where: { id } });

    if (!pointage) {
      throw new NotFoundException(`Pointage avec ID ${id} non trouvé.`);
    }

    // Vérifier les permissions: seul le propriétaire du pointage ou un admin/chef d'atelier peut modifier
    // Adapter cette logique en fonction des rôles exacts (RoleEnum.CHEF_ATELIER, etc.)
    if (pointage.userId !== currentUser.id && currentUser.role !== 'ADMIN_SYS' && currentUser.role !== 'CHEF_ATELIER') {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier ce pointage.");
    }

    const dataToUpdate: Prisma.PointageUpdateInput = { ...updatePointageDto };
    if (updatePointageDto.datePointage) {
      dataToUpdate.datePointage = new Date(updatePointageDto.datePointage);
    }

    return this.prisma.pointage.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string, currentUser: User): Promise<Pointage> {
    const pointage = await this.prisma.pointage.findUnique({ where: { id } });

    if (!pointage) {
      throw new NotFoundException(`Pointage avec ID ${id} non trouvé.`);
    }

    // Vérifier les permissions pour la suppression
    if (pointage.userId !== currentUser.id && currentUser.role !== 'ADMIN_SYS' && currentUser.role !== 'CHEF_ATELIER') {
      throw new ForbiddenException("Vous n'êtes pas autorisé à supprimer ce pointage.");
    }

    return this.prisma.pointage.delete({ where: { id } });
  }
} 