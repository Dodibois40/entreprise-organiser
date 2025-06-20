-- AlterTable
ALTER TABLE "bdc" ADD COLUMN     "dateUpload" TIMESTAMP(3),
ADD COLUMN     "fichierPdf" TEXT,
ADD COLUMN     "nomFichier" TEXT,
ADD COLUMN     "tailleFichier" INTEGER;
