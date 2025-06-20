import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAffaireDto } from './dto/create-affaire.dto';
import { UpdateAffaireDto } from './dto/update-affaire.dto';
import { UpdateAffaireReelDto } from './dto/update-affaire-reel.dto';
import { Affaire, Prisma, StatutAffaire } from '@prisma/client';

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
    const where: any = {};

    if (statut) {
      where.statut = statut;
    }

    if (search) {
      where.OR = [
        { numero: { contains: search, mode: 'insensitive' } },
        { libelle: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [affaires, total] = await Promise.all([
      this.prisma.affaire.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              bdc: true,
              pointages: true,
              devis: true,
              achats: true,
            },
          },
        },
      }),
      this.prisma.affaire.count({ where }),
    ]);

    // Ajouter l'information canDelete à chaque affaire
    const affairesWithDeleteInfo = affaires.map(affaire => ({
      ...affaire,
      canDelete: affaire._count.bdc === 0 && affaire._count.pointages === 0,
      deleteReasons: [
        ...(affaire._count.bdc > 0 ? [`${affaire._count.bdc} bon(s) de commande`] : []),
        ...(affaire._count.pointages > 0 ? [`${affaire._count.pointages} pointage(s)`] : []),
      ],
    }));

    return { affaires: affairesWithDeleteInfo, total };
  }

  async findOne(id: string): Promise<Affaire> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
      include: {
        bdc: {
          include: {
            categorie: true,
          },
        },
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
            phases: true,
            devis: true,
            achats: true,
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

    if (affaire._count.phases > 0) {
      return {
        canDelete: false,
        message: `Impossible de supprimer l'affaire: ${affaire._count.phases} phase(s) de chantier associée(s)`,
      };
    }

    if (affaire._count.devis > 0) {
      return {
        canDelete: false,
        message: `Impossible de supprimer l'affaire: ${affaire._count.devis} devis associé(s)`,
      };
    }

    if (affaire._count.achats > 0) {
      return {
        canDelete: false,
        message: `Impossible de supprimer l'affaire: ${affaire._count.achats} achat(s) associé(s)`,
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

  // Méthode pour supprimer une affaire et toutes ses dépendances (suppression en cascade)
  async removeWithDependencies(id: string): Promise<{ success: boolean; message: string }> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
      include: {
        phases: {
          include: {
            taches: {
              include: {
                pointages: true
              }
            }
          }
        },
        devis: true,
        bdc: true,
        achats: true,
        pointages: true,
      },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    try {
      // Utiliser une transaction pour la suppression en cascade
      await this.prisma.$transaction(async (prisma) => {
        // 1. Supprimer tous les pointages associés aux tâches des phases
        for (const phase of affaire.phases) {
          for (const tache of phase.taches) {
            await prisma.pointage.deleteMany({
              where: { tacheId: tache.id }
            });
          }
        }

        // 2. Supprimer toutes les tâches des phases
        for (const phase of affaire.phases) {
          await prisma.tacheAffectation.deleteMany({
            where: { phaseId: phase.id }
          });
        }

        // 3. Supprimer toutes les phases
        await prisma.phaseChantier.deleteMany({
          where: { affaireId: id }
        });

        // 4. Supprimer tous les pointages directs de l'affaire
        await prisma.pointage.deleteMany({
          where: { affaireId: id }
        });

        // 5. Supprimer tous les devis
        await prisma.devis.deleteMany({
          where: { affaireId: id }
        });

        // 6. Supprimer tous les achats
        await prisma.achat.deleteMany({
          where: { affaireId: id }
        });

        // 7. Supprimer tous les BDC
        await prisma.bdc.deleteMany({
          where: { affaireId: id }
        });

        // 8. Enfin, supprimer l'affaire
        await prisma.affaire.delete({
          where: { id }
        });
      });

      return {
        success: true,
        message: `Affaire ${affaire.numero} et toutes ses dépendances ont été supprimées avec succès`
      };
    } catch (error) {
      throw new ConflictException(
        `Erreur lors de la suppression de l'affaire: ${error.message}`
      );
    }
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

  // Nouvelle méthode pour mettre à jour les données réelles d'une affaire
  async updateReel(id: string, updateAffaireReelDto: UpdateAffaireReelDto): Promise<Affaire> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    return this.prisma.affaire.update({
      where: { id },
      data: updateAffaireReelDto,
    });
  }

  // Méthode pour calculer automatiquement les données réelles à partir des devis validés, BDC réceptionnés et pointages
  async calculateRealFromData(affaireId: string): Promise<Affaire> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: affaireId },
      include: {
        devis: {
          where: { statut: { in: ['VALIDE', 'REALISE'] } }, // Devis validés ET réalisés
        },
        bdc: {
          where: { statut: 'RECEPTIONNE' }, // Seulement les BDC réceptionnés
        },
        pointages: true,
      },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${affaireId} non trouvée`);
    }

    // Calculer le CA réel à partir des devis validés ET réalisés
    const caReelHt = affaire.devis.reduce((sum, devis) => sum + devis.montantHt, 0);

    // Calculer l'achat réel à partir des BDC réceptionnés ET validés
    const achatReelHt = affaire.bdc
      .filter(bdc => bdc.statut === 'RECEPTIONNE' || bdc.statut === 'VALIDE')
      .reduce((sum, bdc) => sum + bdc.montantHt, 0);

    // Calculer les heures réelles par type
    const heuresReelles = affaire.pointages.reduce(
      (acc, pointage) => {
        switch (pointage.typeHeure) {
          case 'FAB':
            acc.fab += pointage.nbHeures;
            break;
          case 'SER':
            acc.ser += pointage.nbHeures;
            break;
          case 'POSE':
            acc.pose += pointage.nbHeures;
            break;
        }
        return acc;
      },
      { fab: 0, ser: 0, pose: 0 }
    );

    // Mettre à jour l'affaire avec les données calculées
    return this.prisma.affaire.update({
      where: { id: affaireId },
      data: {
        caReelHt, // CA réel à partir des devis validés ET réalisés
        achatReelHt, // Achats réels à partir des BDC réceptionnés
        heuresReellesFab: heuresReelles.fab,
        heuresReellesPose: heuresReelles.pose,
      },
    });
  }

  // Obtenir les statistiques comparatives (Objectif vs Réel) d'une affaire
  async getComparativeStats(affaireId: string): Promise<{
    objectifs: {
      ca: number;
      achat: number;
      heuresFab: number;
      heuresPose: number;
    };
    reels: {
      ca: number;
      achat: number;
      heuresFab: number;
      heuresPose: number;
    };
    ecarts: {
      ca: number;
      achat: number;
      heuresFab: number;
      heuresPose: number;
    };
  }> {
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: affaireId },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${affaireId} non trouvée`);
    }

    const objectifs = {
      ca: affaire.objectifCaHt,
      achat: affaire.objectifAchatHt,
      heuresFab: affaire.objectifHeuresFab,
      heuresPose: affaire.objectifHeuresPose,
    };

    const reels = {
      ca: affaire.caReelHt,
      achat: affaire.achatReelHt,
      heuresFab: affaire.heuresReellesFab,
      heuresPose: affaire.heuresReellesPose,
    };

    const ecarts = {
      ca: reels.ca - objectifs.ca,
      achat: reels.achat - objectifs.achat,
      heuresFab: reels.heuresFab - objectifs.heuresFab,
      heuresPose: reels.heuresPose - objectifs.heuresPose,
    };

    return {
      objectifs,
      reels,
      ecarts,
    };
  }

  // Calculer les coûts totaux des phases d'une affaire
  async calculatePhasesTotalCosts(affaireId: string): Promise<{
    coutTotalEstime: number;
    coutTotalReel: number;
    tempsTotalEstime: number;
    tempsTotalReel: number;
    nbPhases: number;
  }> {
    const phases = await this.prisma.phaseChantier.findMany({
      where: { affaireId },
    });

    const coutTotalEstime = phases.reduce((sum, phase) => sum + (phase.coutEstime || 0), 0);
    const coutTotalReel = phases.reduce((sum, phase) => sum + (phase.coutReel || 0), 0);
    const tempsTotalEstime = phases.reduce((sum, phase) => sum + (phase.tempsEstimeH || 0), 0);
    const tempsTotalReel = phases.reduce((sum, phase) => sum + (phase.tempsReelH || 0), 0);

    return {
      coutTotalEstime,
      coutTotalReel,
      tempsTotalEstime,
      tempsTotalReel,
      nbPhases: phases.length,
    };
  }

  // Obtenir la situation financière complète d'une affaire (incluant les phases)
  async getFinancialSituation(affaireId: string): Promise<{
    affaire: Affaire;
    phases: {
      coutTotalEstime: number;
      coutTotalReel: number;
      tempsTotalEstime: number;
      tempsTotalReel: number;
      nbPhases: number;
    };
    devis: {
      totalValides: number;
      nbDevisValides: number;
    };
    achats: {
      totalValides: number;
      nbAchatsValides: number;
    };
    bdc: {
      totalReceptionnes: number;
      nbBdcReceptionnes: number;
    };
    fraisGeneraux: {
      montantReel: number;
      montantObjectif: number;
      pourcentage: number;
    };
    marges: {
      margeObjectif: number;
      margeReelle: number;
      pourcentageMargeObjectif: number;
      pourcentageMargeReelle: number;
    };
  }> {
    const affaire = await this.findOne(affaireId);
    const phases = await this.calculatePhasesTotalCosts(affaireId);

    // Calculer les totaux des devis validés ET réalisés (pour le CA réel)
    const devisValides = await this.prisma.devis.findMany({
      where: { 
        affaireId, 
        statut: { in: ['VALIDE', 'REALISE'] }
      },
    });
    const totalDevisValides = devisValides.reduce((sum, devis) => sum + devis.montantHt, 0);

    // Calculer les totaux des achats validés
    const achatsValides = await this.prisma.achat.findMany({
      where: { affaireId, statut: 'VALIDE' },
    });
    const totalAchatsValides = achatsValides.reduce((sum, achat) => sum + achat.montantHt, 0);

    // Calculer les totaux des BDC réceptionnés ET validés
    const bdcValides = await this.prisma.bdc.findMany({
      where: { 
        affaireId, 
        statut: { in: ['RECEPTIONNE', 'VALIDE'] }
      },
    });
    const totalBdcReceptionnes = bdcValides.reduce((sum, bdc) => sum + bdc.montantHt, 0);

    // Calculer les frais généraux (30% des devis validés)
    const pourcentageFraisGeneraux = 30; // 30% des devis validés
    const fraisGenerauxReels = totalDevisValides * (pourcentageFraisGeneraux / 100);
    const fraisGenerauxObjectifs = affaire.objectifCaHt * (pourcentageFraisGeneraux / 100);

    // Calculer les marges (en incluant les coûts des phases ET les frais généraux)
    const totalAchatsReels = totalAchatsValides + totalBdcReceptionnes + phases.coutTotalReel;
    const totalAchatsObjectifs = affaire.objectifAchatHt + phases.coutTotalEstime;

    // Calculer les marges en déduisant les frais généraux du CA
    const margeObjectif = affaire.objectifCaHt - fraisGenerauxObjectifs - totalAchatsObjectifs;
    const margeReelle = totalDevisValides - fraisGenerauxReels - totalAchatsReels;
    const pourcentageMargeObjectif = affaire.objectifCaHt > 0 ? (margeObjectif / affaire.objectifCaHt) * 100 : 0;
    const pourcentageMargeReelle = totalDevisValides > 0 ? (margeReelle / totalDevisValides) * 100 : 0;

    return {
      affaire,
      phases,
      devis: {
        totalValides: totalDevisValides,
        nbDevisValides: devisValides.length,
      },
      achats: {
        totalValides: totalAchatsValides,
        nbAchatsValides: achatsValides.length,
      },
      bdc: {
        totalReceptionnes: totalBdcReceptionnes,
        nbBdcReceptionnes: bdcValides.length,
      },
      fraisGeneraux: {
        montantReel: fraisGenerauxReels,
        montantObjectif: fraisGenerauxObjectifs,
        pourcentage: pourcentageFraisGeneraux,
      },
      marges: {
        margeObjectif,
        margeReelle,
        pourcentageMargeObjectif,
        pourcentageMargeReelle,
      },
    };
  }

  // Nouvelle méthode : Comparatif achats estimés vs réels par catégorie
  /*
  async getAchatsParCategorie(affaireId: string) {
    // Vérifier que l'affaire existe
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: affaireId },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${affaireId} non trouvée`);
    }

    // Récupérer toutes les catégories d'achat
    const categories = await this.prisma.categorieAchat.findMany({
      orderBy: { intitule: 'asc' },
    });

    // Récupérer les estimations par catégorie pour cette affaire
    const estimations = await this.prisma.estimationAchatCategorie.findMany({
      where: { affaireId },
      include: {
        categorie: true,
      },
    });

    // Récupérer les achats réels par catégorie (statut VALIDE)
    const achatsReels = await this.prisma.achat.groupBy({
      by: ['categorieId'],
      where: {
        affaireId,
        statut: 'VALIDE',
        categorieId: { 
          not: null 
        },
      },
      _sum: {
        montantHt: true,
        montantFg: true,
      },
      _count: {
        _all: true,
      },
    });

    // Récupérer les achats réels non affectés (sans catégorie)
    const achatsNonAffectes = await this.prisma.achat.findMany({
      where: {
        affaireId,
        categorieId: { equals: null },
        statut: 'VALIDE',
      },
      orderBy: { dateFacture: 'desc' },
    });

    // Construire le résultat final
    const comparatifParCategorie = categories.map(categorie => {
      // Trouver l'estimation pour cette catégorie
      const estimation = estimations.find((est: any) => est.categorieId === categorie.id);
      const montantEstime = estimation?.montantEstime || 0;

      // Trouver les achats réels pour cette catégorie
      const achatReel = achatsReels.find(achat => achat.categorieId === categorie.id);
      const montantReel = achatReel?._sum?.montantHt || 0;
      const montantFgReel = achatReel?._sum?.montantFg || 0;
      const nombreAchats = achatReel?._count?._all || 0;

      // Calculer l'écart
      const ecart = montantReel - montantEstime;
      const pourcentageRealise = montantEstime > 0 ? (montantReel / montantEstime) * 100 : 0;

      return {
        categorie: {
          id: categorie.id,
          code: categorie.code,
          intitule: categorie.intitule,
          pourcentageFg: categorie.pourcentageFg,
        },
        montantEstime,
        montantReel,
        montantFgReel,
        nombreAchats,
        ecart,
        pourcentageRealise,
      };
    });

    // Calculer les totaux
    const totalEstime = comparatifParCategorie.reduce((sum, item) => sum + item.montantEstime, 0);
    const totalReel = comparatifParCategorie.reduce((sum, item) => sum + item.montantReel, 0);
    const totalFgReel = comparatifParCategorie.reduce((sum, item) => sum + item.montantFgReel, 0);
    const totalNonAffecte = achatsNonAffectes.reduce((sum, achat) => sum + achat.montantHt, 0);

    return {
      affaire: {
        id: affaire.id,
        numero: affaire.numero,
        libelle: affaire.libelle,
        objectifAchatHt: affaire.objectifAchatHt,
      },
      comparatifParCategorie,
      achatsNonAffectes,
      totaux: {
        totalEstime,
        totalReel,
        totalFgReel,
        totalNonAffecte,
        ecartGlobal: totalReel - totalEstime,
        pourcentageGlobalRealise: totalEstime > 0 ? (totalReel / totalEstime) * 100 : 0,
      },
    };
  }

  // Méthode pour mettre à jour les estimations d'achats par catégorie
  async updateEstimationsAchatCategorie(
    affaireId: string,
    estimations: Array<{ categorieId: string; montantEstime: number }>
  ) {
    // Vérifier que l'affaire existe
    const affaire = await this.prisma.affaire.findUnique({
      where: { id: affaireId },
    });

    if (!affaire) {
      throw new NotFoundException(`Affaire avec ID ${affaireId} non trouvée`);
    }

    // Utiliser une transaction pour mettre à jour toutes les estimations
    await this.prisma.$transaction(async (prisma) => {
      for (const estimation of estimations) {
        await prisma.estimationAchatCategorie.upsert({
          where: {
            affaireId_categorieId: {
              affaireId,
              categorieId: estimation.categorieId,
            },
          },
          update: {
            montantEstime: estimation.montantEstime,
          },
          create: {
            affaireId,
            categorieId: estimation.categorieId,
            montantEstime: estimation.montantEstime,
          },
        });
      }
    });

    // Retourner les données mises à jour
    return this.getAchatsParCategorie(affaireId);
  }
  */

  async duplicate(id: string): Promise<Affaire> {
    // Récupérer l'affaire à dupliquer
    const originalAffaire = await this.prisma.affaire.findUnique({
      where: { id },
    });

    if (!originalAffaire) {
      throw new NotFoundException(`Affaire avec ID ${id} non trouvée`);
    }

    try {
      // Générer un nouveau numéro pour l'affaire dupliquée
      const nouveauNumero = await this.generateNumeroAffaire();

      // Créer une copie de l'affaire avec les données de base
      const affaireDupliquee = await this.prisma.affaire.create({
        data: {
          numero: nouveauNumero,
          libelle: `${originalAffaire.libelle} (Copie)`,
          client: originalAffaire.client,
          adresse: originalAffaire.adresse,
          rue: originalAffaire.rue,
          codePostal: originalAffaire.codePostal,
          ville: originalAffaire.ville,
          pays: originalAffaire.pays,
          latitude: originalAffaire.latitude,
          longitude: originalAffaire.longitude,
          dateCommencement: originalAffaire.dateCommencement,
          dateCloturePrevue: originalAffaire.dateCloturePrevue,
          objectifCaHt: originalAffaire.objectifCaHt,
          objectifAchatHt: originalAffaire.objectifAchatHt,
          objectifHeuresFab: originalAffaire.objectifHeuresFab,
          objectifHeuresSer: originalAffaire.objectifHeuresSer,
          objectifHeuresPose: originalAffaire.objectifHeuresPose,
          objectifFraisGeneraux: originalAffaire.objectifFraisGeneraux,
          statut: 'PLANIFIEE', // Nouvelle affaire commence toujours en statut PLANIFIEE
          // Les champs calculés ne sont pas copiés (caReelHt, heuresReellesFab, etc.)
        },
      });

      return affaireDupliquee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Erreur lors de la génération du numéro d\'affaire');
        }
      }
      throw error;
    }
  }
} 