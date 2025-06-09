import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAffaireDto } from './dto/create-affaire.dto';
import { UpdateAffaireDto } from './dto/update-affaire.dto';
import { Affaire, Prisma, StatutAffaire } from '../../../generated/prisma';

@Injectable()
export class AffairesService {
  constructor(private prisma: PrismaService) {}

  async create(createAffaireDto: CreateAffaireDto): Promise<Affaire> {
    try {
      // Générer automatiquement le numéro si non fourni
      const numero = createAffaireDto.numero || await this.generateNumeroAffaire();
      
      return await this.prisma.affaire.create({
        data: {
          ...createAffaireDto,
          numero,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Une affaire avec le numéro ${createAffaireDto.numero || 'généré'} existe déjà`);
        }
      }
      throw error;
    }
  }

  // Méthode pour générer automatiquement un numéro d'affaire
  private async generateNumeroAffaire(): Promise<string> {
    const currentYear = new Date().getFullYear().toString().slice(-2); // 2024 -> 24
    const prefix = `${currentYear}-BOIS`;
    
    // Trouver le dernier numéro pour cette année
    const lastAffaire = await this.prisma.affaire.findFirst({
      where: {
        numero: {
          startsWith: prefix,
        },
      },
      orderBy: {
        numero: 'desc',
      },
    });

    let nextNumber = 1;
    if (lastAffaire) {
      // Extraire le numéro séquentiel du dernier numéro (ex: 24-BOIS-003 -> 3)
      const lastNumParts = lastAffaire.numero.split('-');
      if (lastNumParts.length === 3) {
        const lastSeq = parseInt(lastNumParts[2], 10);
        if (!isNaN(lastSeq)) {
          nextNumber = lastSeq + 1;
        }
      }
    }

    // Formater avec des zéros en tête (ex: 001, 002, etc.)
    const formattedNumber = nextNumber.toString().padStart(3, '0');
    
    return `${prefix}-${formattedNumber}`;
  }

  async findAll(
    search?: string,
    statut?: StatutAffaire,
    skip = 0,
    take = 10,
  ): Promise<{ affaires: Affaire[]; total: number }> {
    const where: Prisma.AffaireWhereInput = {};

    if (search) {
      where.OR = [
        { numero: { contains: search, mode: 'insensitive' } },
        { libelle: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (statut) {
      where.statut = statut;
    }

    const [affaires, total] = await Promise.all([
      this.prisma.affaire.findMany({
        where,
        skip,
        take,
        orderBy: { dateCreation: 'desc' },
      }),
      this.prisma.affaire.count({ where }),
    ]);

    return { affaires, total };
  }

  async findOne(id: string): Promise<Affaire> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
      include: {
        bdc: true,
        pointages: {
          include: {
            user: {
              select: {
                id: true,
                nom: true,
                prenom: true,
              },
            },
          },
        },
      },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    return affaire;
  }

  async update(id: string, updateAffaireDto: UpdateAffaireDto): Promise<Affaire> {
    try {
      // Vérifier que l'affaire existe
      const existingAffaire = await this.prisma.affaire.findUnique({
        where: { id },
      });

      if (!existingAffaire) {
        throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
      }

      return await this.prisma.affaire.update({
        where: { id },
        data: updateAffaireDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Une affaire avec le numéro ${updateAffaireDto.numero} existe déjà`);
        }
      }
      throw error;
    }
  }

  async updateStatut(id: string, statut: StatutAffaire): Promise<Affaire> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    return this.prisma.affaire.update({
      where: { id },
      data: { statut },
    });
  }

  // Cette méthode vérifie si une affaire peut être supprimée (absence de BDC et pointages)
  async canDelete(id: string): Promise<{ canDelete: boolean; message?: string }> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            bdc: true,
            pointages: true,
          },
        },
      },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    if (affaire._count.bdc > 0) {
      return {
        canDelete: false,
        message: `Impossible de supprimer l'affaire: ${affaire._count.bdc} bon(s) de commande associé(s)`,
      };
    }

    if (affaire._count.pointages > 0) {
      return {
        canDelete: false,
        message: `Impossible de supprimer l'affaire: ${affaire._count.pointages} pointage(s) associé(s)`,
      };
    }

    return { canDelete: true };
  }

  async remove(id: string): Promise<Affaire> {
    const { canDelete, message } = await this.canDelete(id);

    if (!canDelete) {
      throw new ConflictException(message);
    }

    return this.prisma.affaire.delete({
      where: { id },
    });
  }

  // Méthode pour calculer les indicateurs globaux des affaires
  async getGlobalStats() {
    // Calculer les stats globales en utilisant la vue matérialisée
    // (Ceci est simulé car nous n'avons pas encore la vraie DB)
    const [
      totalAffaires,
      affairesEnCours,
      totauxObjectifs,
      margeGlobale,
    ] = await Promise.all([
      this.prisma.affaire.count(),
      this.prisma.affaire.count({ where: { statut: 'EN_COURS' } }),
      this.prisma.affaire.aggregate({
        _sum: {
          objectifCaHt: true,
          objectifAchatHt: true,
          objectifHeuresFab: true,
        },
      }),
      // Cette requête est une approximation - dans un environnement réel, on utiliserait la vue matérialisée
      this.prisma.$queryRaw`
        SELECT 
          COALESCE(SUM(a."objectifCaHt" - (
            COALESCE((SELECT SUM(b."montantHt") FROM "bdc" b WHERE b."affaireId" = a.id), 0) +
            COALESCE((SELECT SUM(p."nbHeures" * 45) FROM "pointages" p WHERE p."affaireId" = a.id), 0)
          )), 0) as marge_totale,
          CASE 
            WHEN SUM(a."objectifCaHt") > 0 
            THEN COALESCE(SUM(a."objectifCaHt" - (
              COALESCE((SELECT SUM(b."montantHt") FROM "bdc" b WHERE b."affaireId" = a.id), 0) +
              COALESCE((SELECT SUM(p."nbHeures" * 45) FROM "pointages" p WHERE p."affaireId" = a.id), 0)
            )) / SUM(a."objectifCaHt") * 100, 0) 
            ELSE 0 
          END as pourcentage_marge
        FROM "affaires" a
      `,
    ]);

    return {
      totalAffaires,
      affairesEnCours,
      objectifCaHt: totauxObjectifs._sum.objectifCaHt || 0,
      objectifAchatHt: totauxObjectifs._sum.objectifAchatHt || 0,
      objectifHeuresFab: totauxObjectifs._sum.objectifHeuresFab || 0,
      margeGlobale,
    };
  }
} 