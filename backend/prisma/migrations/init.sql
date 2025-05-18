-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "StatutAffaire" AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'CLOTUREE');

-- CreateEnum
CREATE TYPE "TypeHeure" AS ENUM ('FAB', 'SER', 'POSE');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN_SYS', 'CHARGE_AFFAIRE', 'ACHETEUR', 'CHEF_ATELIER', 'CONSULTATION');

-- CreateTable
CREATE TABLE "affaires" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "numero" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "adresse" TEXT,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateCloturePrevue" TIMESTAMP(3),
    "objectifCaHt" DOUBLE PRECISION NOT NULL,
    "objectifAchatHt" DOUBLE PRECISION NOT NULL,
    "objectifHeuresFab" DOUBLE PRECISION NOT NULL,
    "ser" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pose" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "statut" "StatutAffaire" NOT NULL DEFAULT 'PLANIFIEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_achat" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "code" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "pourcentageFg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "categories_achat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bdc" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "numero" TEXT NOT NULL,
    "montantHt" DOUBLE PRECISION NOT NULL,
    "dateBdc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateReception" TIMESTAMP(3),
    "commentaire" TEXT,
    "affaireId" UUID NOT NULL,
    "categorieId" UUID NOT NULL,
    "fournisseur" TEXT NOT NULL,
    "montantFg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bdc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pointages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "datePointage" TIMESTAMP(3) NOT NULL,
    "nbHeures" DOUBLE PRECISION NOT NULL,
    "commentaire" TEXT,
    "typeHeure" "TypeHeure" NOT NULL,
    "affaireId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pointages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametres_globaux" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "cle" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parametres_globaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "supprime" BOOLEAN NOT NULL DEFAULT false,
    "supprimeLe" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "affaires_numero_key" ON "affaires"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "categories_achat_code_key" ON "categories_achat"("code");

-- CreateIndex
CREATE UNIQUE INDEX "bdc_numero_key" ON "bdc"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "parametres_globaux_cle_key" ON "parametres_globaux"("cle");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bdc" ADD CONSTRAINT "bdc_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bdc" ADD CONSTRAINT "bdc_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categories_achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointages" ADD CONSTRAINT "pointages_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointages" ADD CONSTRAINT "pointages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Création des vues matérialisées
CREATE MATERIALIZED VIEW "v_resultat_affaire" AS
SELECT 
  a.id,
  a.numero,
  a.libelle,
  a.client,
  a.objectifCaHt,
  COALESCE(SUM(b.montantHt), 0) AS total_achats,
  (
    SELECT COALESCE(SUM(p.nbHeures), 0)
    FROM "pointages" p
    WHERE p.affaireId = a.id
  ) AS total_heures,
  (
    SELECT COALESCE(SUM(p.nbHeures * (
      SELECT CAST(pg.valeur AS FLOAT)
      FROM "parametres_globaux" pg
      WHERE pg.cle = 'TAUX_HORAIRE'
      LIMIT 1
    )), 0)
    FROM "pointages" p
    WHERE p.affaireId = a.id
  ) AS cout_heures,
  COALESCE(SUM(b.montantFg), 0) AS total_fg,
  a.objectifCaHt - (
    COALESCE(SUM(b.montantHt), 0) + 
    (
      SELECT COALESCE(SUM(p.nbHeures * (
        SELECT CAST(pg.valeur AS FLOAT)
        FROM "parametres_globaux" pg
        WHERE pg.cle = 'TAUX_HORAIRE'
        LIMIT 1
      )), 0)
      FROM "pointages" p
      WHERE p.affaireId = a.id
    ) + 
    COALESCE(SUM(b.montantFg), 0)
  ) AS marge_euros,
  CASE 
    WHEN a.objectifCaHt > 0 THEN 
      (
        a.objectifCaHt - (
          COALESCE(SUM(b.montantHt), 0) + 
          (
            SELECT COALESCE(SUM(p.nbHeures * (
              SELECT CAST(pg.valeur AS FLOAT)
              FROM "parametres_globaux" pg
              WHERE pg.cle = 'TAUX_HORAIRE'
              LIMIT 1
            )), 0)
            FROM "pointages" p
            WHERE p.affaireId = a.id
          ) + 
          COALESCE(SUM(b.montantFg), 0)
        )
      ) / a.objectifCaHt * 100
    ELSE 0
  END AS marge_pourcentage,
  a.statut
FROM "affaires" a
LEFT JOIN "bdc" b ON a.id = b.affaireId
GROUP BY a.id;

CREATE MATERIALIZED VIEW "v_resultat_global" AS
SELECT
  COUNT(a.id) AS nombre_affaires,
  COUNT(CASE WHEN a.statut = 'EN_COURS' THEN 1 END) AS affaires_en_cours,
  COUNT(CASE WHEN a.statut = 'TERMINEE' THEN 1 END) AS affaires_terminees,
  COUNT(CASE WHEN a.statut = 'CLOTUREE' THEN 1 END) AS affaires_cloturees,
  SUM(a.objectifCaHt) AS total_ca_objectif,
  (
    SELECT SUM(vra.marge_euros)
    FROM v_resultat_affaire vra
  ) AS total_marge_euros,
  CASE 
    WHEN SUM(a.objectifCaHt) > 0 THEN 
      (
        SELECT SUM(vra.marge_euros)
        FROM v_resultat_affaire vra
      ) / SUM(a.objectifCaHt) * 100
    ELSE 0
  END AS marge_globale_pourcentage,
  (
    SELECT COUNT(*)
    FROM v_resultat_affaire vra
    WHERE vra.marge_pourcentage < (
      SELECT CAST(pg.valeur AS FLOAT)
      FROM "parametres_globaux" pg
      WHERE pg.cle = 'SEUIL_ALERTE_MARGE'
      LIMIT 1
    )
  ) AS nombre_affaires_sous_seuil_marge
FROM "affaires" a;

-- Création d'un index pour améliorer les performances des requêtes
CREATE INDEX idx_bdc_affaire_id ON "bdc" ("affaireId");
CREATE INDEX idx_pointages_affaire_id ON "pointages" ("affaireId");
CREATE INDEX idx_pointages_user_id ON "pointages" ("userId"); 