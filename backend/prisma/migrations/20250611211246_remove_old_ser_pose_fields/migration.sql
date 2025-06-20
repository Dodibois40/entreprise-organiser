-- Migration pour supprimer les anciens champs ser et pose
-- Les données ont déjà été copiées vers objectifHeuresSer et objectifHeuresPose

-- Supprimer la colonne ser
ALTER TABLE "affaires" DROP COLUMN "ser";

-- Supprimer la colonne pose  
ALTER TABLE "affaires" DROP COLUMN "pose"; 