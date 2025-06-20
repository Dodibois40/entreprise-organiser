-- CreateTable
CREATE TABLE "fournisseurs" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "codeClient" TEXT,
    "enCompte" BOOLEAN NOT NULL DEFAULT false,
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "contact" TEXT,
    "commentaire" TEXT,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fournisseurs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fournisseurs_nom_key" ON "fournisseurs"("nom");
