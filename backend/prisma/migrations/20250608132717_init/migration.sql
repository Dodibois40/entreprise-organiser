-- CreateEnum
CREATE TYPE "StatutAffaire" AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'CLOTUREE');

-- CreateEnum
CREATE TYPE "TypeHeure" AS ENUM ('FAB', 'SER', 'POSE');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN_SYS', 'CHARGE_AFFAIRE', 'ACHETEUR', 'CHEF_ATELIER', 'CONSULTATION');

-- CreateEnum
CREATE TYPE "TypeMouvement" AS ENUM ('ENTREE', 'SORTIE', 'AJUSTEMENT', 'INVENTAIRE');

-- CreateTable
CREATE TABLE "affaires" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "intitule" TEXT NOT NULL,
    "pourcentageFg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "categories_achat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bdc" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "montantHt" DOUBLE PRECISION NOT NULL,
    "dateBdc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateReception" TIMESTAMP(3),
    "commentaire" TEXT,
    "affaireId" TEXT NOT NULL,
    "categorieId" TEXT NOT NULL,
    "fournisseur" TEXT NOT NULL,
    "montantFg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bdc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pointages" (
    "id" TEXT NOT NULL,
    "datePointage" TIMESTAMP(3) NOT NULL,
    "nbHeures" DOUBLE PRECISION NOT NULL,
    "commentaire" TEXT,
    "typeHeure" "TypeHeure" NOT NULL,
    "affaireId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pointages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametres_globaux" (
    "id" TEXT NOT NULL,
    "cle" TEXT NOT NULL,
    "valeur" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parametres_globaux_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "unite" TEXT NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "stockActuel" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stockMinimum" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stockMaximum" DOUBLE PRECISION,
    "emplacement" TEXT,
    "fournisseur" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mouvements_stock" (
    "id" TEXT NOT NULL,
    "type" "TypeMouvement" NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "prixUnitaire" DOUBLE PRECISION,
    "motif" TEXT,
    "reference" TEXT,
    "articleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mouvements_stock_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "articles_code_key" ON "articles"("code");

-- AddForeignKey
ALTER TABLE "bdc" ADD CONSTRAINT "bdc_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bdc" ADD CONSTRAINT "bdc_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categories_achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointages" ADD CONSTRAINT "pointages_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointages" ADD CONSTRAINT "pointages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements_stock" ADD CONSTRAINT "mouvements_stock_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements_stock" ADD CONSTRAINT "mouvements_stock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
