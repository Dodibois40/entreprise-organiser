-- CreateTable
CREATE TABLE "estimations_achats" (
    "id" TEXT NOT NULL,
    "affaireId" TEXT NOT NULL,
    "pourcentageBudgetAchats" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "montantEstimationAchats" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPourcentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "categoriesActives" JSONB NOT NULL DEFAULT '[]',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estimations_achats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "estimations_achats_affaireId_key" ON "estimations_achats"("affaireId");

-- AddForeignKey
ALTER TABLE "estimations_achats" ADD CONSTRAINT "estimations_achats_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
