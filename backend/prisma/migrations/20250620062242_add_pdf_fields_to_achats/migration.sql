-- AlterTable
ALTER TABLE "achats" ADD COLUMN     "dateUpload" TIMESTAMP(3),
ADD COLUMN     "fichierPdf" TEXT,
ADD COLUMN     "firebaseDownloadUrl" TEXT,
ADD COLUMN     "firebaseStoragePath" TEXT,
ADD COLUMN     "nomFichier" TEXT,
ADD COLUMN     "tailleFichier" INTEGER;
