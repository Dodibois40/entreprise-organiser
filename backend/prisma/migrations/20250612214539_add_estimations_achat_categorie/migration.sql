-- CreateTable
CREATE TABLE "estimations_achat_categorie" (
    "id" TEXT NOT NULL,
    "affaireId" TEXT NOT NULL,
    "categorieId" TEXT NOT NULL,
    "montantEstime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estimations_achat_categorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estimations_achat_categorie_affaireId_categorieId_key" ON "estimations_achat_categorie"("affaireId", "categorieId");

-- AddForeignKey
ALTER TABLE "estimations_achat_categorie" ADD CONSTRAINT "estimations_achat_categorie_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimations_achat_categorie" ADD CONSTRAINT "estimations_achat_categorie_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categories_achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
