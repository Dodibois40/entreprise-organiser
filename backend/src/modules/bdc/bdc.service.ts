import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBdcDto } from './dto/create-bdc.dto';
import { UpdateBdcDto } from './dto/update-bdc.dto';
import { Bdc, Prisma } from '../../generated/prisma';

@Injectable()
export class BdcService {
  constructor(private prisma: PrismaService) {}

  async create(createBdcDto: CreateBdcDto): Promise<Bdc> {
    try {
      // Vérifier que l'affaire existe
      const affaire = await this.prisma.affaire.findUnique({
        where: { id: createBdcDto.affaireId },
      });
      
      if (!affaire) {
        throw new NotFoundException(`Affaire avec ID ${createBdcDto.affaireId} non trouvée`);
      }
      
      // Vérifier que la catégorie existe
      const categorie = await this.prisma.categorieAchat.findUnique({
        where: { id: createBdcDto.categorieId },
      });
      
      if (!categorie) {
        throw new NotFoundException(`Catégorie avec ID ${createBdcDto.categorieId} non trouvée`);
      }
      
      // Calculer le montant des frais généraux
      const montantFg = (createBdcDto.montantHt * categorie.pourcentageFg) / 100;
      
      // Créer le BDC avec les frais généraux calculés
      return await this.prisma.bdc.create({
        data: {
          ...createBdcDto,
          montantFg,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Un bon de commande avec le numéro ${createBdcDto.numero} existe déjà`);
        }
      }
      throw error;
    }
  }

  async findAll(
    affaireId?: string,
    fournisseur?: string,
    skip = 0,
    take = 10,
  ): Promise<{ bdc: Bdc[]; total: number }> {
    const where: Prisma.BdcWhereInput = {};

    if (affaireId) {
      where.affaireId = affaireId;
    }

    if (fournisseur) {
      where.fournisseur = { contains: fournisseur, mode: 'insensitive' };
    }

    const [bdc, total] = await Promise.all([
      this.prisma.bdc.findMany({
        where,
        skip,
        take,
        orderBy: { dateBdc: 'desc' },
        include: {
          affaire: {
            select: {
              numero: true,
              libelle: true,
            },
          },
          categorie: {
            select: {
              code: true,
              intitule: true,
              pourcentageFg: true,
            },
          },
        },
      }),
      this.prisma.bdc.count({ where }),
    ]);

    return { bdc, total };
  }

  async findOne(id: string): Promise<Bdc> {
    const bdc = await this.prisma.bdc.findUnique({
      where: { id },
      include: {
        affaire: {
          select: {
            id: true,
            numero: true,
            libelle: true,
            client: true,
          },
        },
        categorie: {
          select: {
            id: true,
            code: true,
            intitule: true,
            pourcentageFg: true,
          },
        },
      },
    });

    if (!bdc) {
      throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
    }

    return bdc;
  }

  async update(id: string, updateBdcDto: UpdateBdcDto): Promise<Bdc> {
    try {
      // Vérifier que le BDC existe
      const bdcExistant = await this.prisma.bdc.findUnique({
        where: { id },
        include: {
          categorie: true,
        },
      });

      if (!bdcExistant) {
        throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
      }

      // Si on modifie la catégorie ou le montant, recalculer les frais généraux
      let montantFg = bdcExistant.montantFg;
      
      if (updateBdcDto.categorieId || updateBdcDto.montantHt !== undefined) {
        // Récupérer la catégorie (existante ou nouvelle)
        const categorieId = updateBdcDto.categorieId || bdcExistant.categorieId;
        const categorie = await this.prisma.categorieAchat.findUnique({
          where: { id: categorieId },
        });
        
        if (!categorie) {
          throw new NotFoundException(`Catégorie avec ID ${categorieId} non trouvée`);
        }
        
        // Utiliser le montant HT mis à jour ou existant
        const montantHt = updateBdcDto.montantHt !== undefined 
          ? updateBdcDto.montantHt 
          : bdcExistant.montantHt;
        
        // Recalculer les frais généraux
        montantFg = (montantHt * categorie.pourcentageFg) / 100;
      }
      
      // Mise à jour du BDC avec les frais généraux recalculés si nécessaire
      return await this.prisma.bdc.update({
        where: { id },
        data: {
          ...updateBdcDto,
          montantFg,
        },
        include: {
          affaire: {
            select: {
              numero: true,
              libelle: true,
            },
          },
          categorie: {
            select: {
              code: true,
              intitule: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Un bon de commande avec le numéro ${updateBdcDto.numero} existe déjà`);
        }
      }
      throw error;
    }
  }

  async receptionner(id: string, dateReception: Date): Promise<Bdc> {
    const bdc = await this.prisma.bdc.findUnique({
      where: { id },
    });

    if (!bdc) {
      throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
    }

    return this.prisma.bdc.update({
      where: { id },
      data: { dateReception },
    });
  }

  async remove(id: string): Promise<Bdc> {
    try {
      const bdc = await this.prisma.bdc.findUnique({
        where: { id },
      });

      if (!bdc) {
        throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
      }

      return await this.prisma.bdc.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour obtenir les statistiques d'achat par catégorie pour une affaire
  async getStatsByAffaire(affaireId: string) {
    // Vérifier que l'affaire existe
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: affaireId },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${affaireId} non trouvée`);
    }

    // Récupérer les statistiques d'achat par catégorie
    const statsByCategorie = await this.prisma.bdc.groupBy({
      by: ['categorieId'],
      where: {
        affaireId,
      },
      _sum: {
        montantHt: true,
        montantFg: true,
      },
      orderBy: {
        _sum: {
          montantHt: 'desc',
        },
      },
    });

    // Enrichir avec les informations de catégorie
    const statsWithCategories = await Promise.all(
      statsByCategorie.map(async (stat) => {
        const categorie = await this.prisma.categorieAchat.findUnique({
          where: { id: stat.categorieId },
        });

        return {
          categorieId: stat.categorieId,
          code: categorie?.code,
          intitule: categorie?.intitule,
          montantHt: stat._sum.montantHt || 0,
          montantFg: stat._sum.montantFg || 0,
        };
      })
    );

    // Calcul des totaux
    const totalMontantHt = statsWithCategories.reduce((sum, stat) => sum + stat.montantHt, 0);
    const totalMontantFg = statsWithCategories.reduce((sum, stat) => sum + stat.montantFg, 0);

    // Comparer avec les objectifs de l'affaire
    const ecartObjectif = (affaire.objectifAchatHt > 0)
      ? ((totalMontantHt / affaire.objectifAchatHt) * 100) - 100
      : 0;

    return {
      affaireId,
      numeroAffaire: affaire.numero,
      libelleAffaire: affaire.libelle,
      objectifAchatHt: affaire.objectifAchatHt,
      totalMontantHt,
      totalMontantFg,
      ecartObjectif,
      detailsCategories: statsWithCategories,
    };
  }
} 