import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBdcDto } from './dto/create-bdc.dto';
import { UpdateBdcDto } from './dto/update-bdc.dto';
import { Bdc, Prisma } from '@prisma/client';
import { UploadService } from '../../common/services/upload.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BdcService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  /**
   * Génère automatiquement un numéro de BDC au format "BDC-YYYY-XXX"
   * YYYY = année courante
   * XXX = numéro séquentiel du BDC pour l'année (001, 002, etc.)
   */
  private async generateBdcNumber(): Promise<string> {
    const currentYear = new Date().getFullYear();
    const prefix = `BDC-${currentYear}-`;
    
    // Trouver le dernier numéro de BDC pour cette année
    const lastBdc = await this.prisma.bdc.findFirst({
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
    if (lastBdc) {
      // Extraire le numéro séquentiel du dernier numéro (ex: BDC-2025-003 -> 3)
      const lastNumParts = lastBdc.numero.split('-');
      if (lastNumParts.length === 3) {
        const lastSeq = parseInt(lastNumParts[2], 10);
        if (!isNaN(lastSeq)) {
          nextNumber = lastSeq + 1;
        }
      }
    }

    // Formater avec des zéros en tête (ex: 001, 002, etc.)
    const formattedNumber = nextNumber.toString().padStart(3, '0');
    
    return `${prefix}${formattedNumber}`;
  }

  async create(createBdcDto: CreateBdcDto): Promise<Bdc> {
    try {
      // Générer automatiquement le numéro de BDC
      const numeroBdc = await this.generateBdcNumber();
      
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
      
      // Créer le BDC avec le numéro généré automatiquement et les frais généraux calculés
      return await this.prisma.bdc.create({
        data: {
          ...createBdcDto,
          numero: numeroBdc, // Utiliser le numéro généré automatiquement
          montantFg,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Un bon de commande avec ce numéro existe déjà`);
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
          throw new ConflictException(`Erreur de contrainte d'unicité lors de la mise à jour du bon de commande`);
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
      data: { 
        dateReception,
        statut: 'RECEPTIONNE' // Mettre à jour le statut lors de la réception
      },
    });
  }

  // Valider un bon de commande (changer le statut vers VALIDE)
  async valider(id: string): Promise<Bdc> {
    const bdc = await this.prisma.bdc.findUnique({
      where: { id },
    });

    if (!bdc) {
      throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
    }

    return this.prisma.bdc.update({
      where: { id },
      data: { 
        statut: 'VALIDE'
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
  }

  // Annuler un bon de commande (changer le statut vers ANNULE)
  async annuler(id: string): Promise<Bdc> {
    const bdc = await this.prisma.bdc.findUnique({
      where: { id },
    });

    if (!bdc) {
      throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
    }

    return this.prisma.bdc.update({
      where: { id },
      data: { 
        statut: 'ANNULE'
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
  }

  async remove(id: string, password?: string): Promise<Bdc> {
    try {
      const bdc = await this.prisma.bdc.findUnique({
        where: { id },
      });

      if (!bdc) {
        throw new NotFoundException(`Bon de commande avec ID ${id} non trouvé`);
      }

      // Si le BDC est validé, un mot de passe est requis
      if (bdc.statut === 'VALIDE') {
        if (!password) {
          throw new BadRequestException('Un mot de passe est requis pour supprimer un bon de commande validé');
        }
        
        // Vérifier le mot de passe (mot de passe par défaut : "1234")
        const ADMIN_PASSWORD = process.env.BDC_DELETE_PASSWORD || '1234';
        if (password !== ADMIN_PASSWORD) {
          throw new UnauthorizedException('Mot de passe incorrect');
        }
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

    // Récupérer la liste complète des BDC de l'affaire
    const bdcs = await this.prisma.bdc.findMany({
      where: { affaireId },
      include: {
        categorie: {
          select: {
            code: true,
            intitule: true,
          },
        },
      },
      orderBy: { dateBdc: 'desc' },
    });

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
      bdcs, // Ajouter la liste des BDC
    };
  }

  // Upload d'un fichier PDF pour un BDC
  async uploadPdf(id: string, file: Express.Multer.File): Promise<Bdc> {
    const bdc = await this.findOne(id);

    // Si un fichier existe déjà, le supprimer
    if (bdc.fichierPdf) {
      try {
        await this.uploadService.deletePdf(bdc.fichierPdf);
      } catch (error) {
        console.warn(`Impossible de supprimer l'ancien fichier: ${error.message}`);
      }
    }

    // Uploader le nouveau fichier
    const uploadResult = await this.uploadService.uploadPdf(file);

    // Mettre à jour le BDC avec les informations du fichier
    return this.prisma.bdc.update({
      where: { id },
      data: {
        fichierPdf: uploadResult.filename,
        nomFichier: uploadResult.originalName,
        tailleFichier: uploadResult.size,
        dateUpload: new Date(),
      },
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
            code: true,
            intitule: true,
          },
        },
      },
    });
  }

  // Supprimer le fichier PDF d'un BDC
  async deletePdf(id: string): Promise<Bdc> {
    const bdc = await this.findOne(id);

    if (!bdc.fichierPdf) {
      throw new NotFoundException('Aucun fichier PDF associé à ce BDC');
    }

    // Supprimer le fichier physique
    try {
      await this.uploadService.deletePdf(bdc.fichierPdf);
    } catch (error) {
      console.warn(`Impossible de supprimer le fichier: ${error.message}`);
    }

    // Mettre à jour le BDC pour supprimer les références au fichier
    return this.prisma.bdc.update({
      where: { id },
      data: {
        fichierPdf: null,
        nomFichier: null,
        tailleFichier: null,
        dateUpload: null,
      },
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
            code: true,
            intitule: true,
          },
        },
      },
    });
  }
} 