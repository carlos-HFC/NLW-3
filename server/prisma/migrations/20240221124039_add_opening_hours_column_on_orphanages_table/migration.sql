/*
  Warnings:

  - Added the required column `openingHours` to the `Orphanage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orphanage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "about" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "openOnWeekends" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Orphanage" ("about", "createdAt", "id", "instructions", "latitude", "longitude", "name", "openOnWeekends", "updatedAt") SELECT "about", "createdAt", "id", "instructions", "latitude", "longitude", "name", "openOnWeekends", "updatedAt" FROM "Orphanage";
DROP TABLE "Orphanage";
ALTER TABLE "new_Orphanage" RENAME TO "Orphanage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
