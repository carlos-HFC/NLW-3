/*
  Warnings:

  - Added the required column `whatsapp` to the `Orphanage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

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
    "aproved" BOOLEAN NOT NULL DEFAULT false,
    "whatsapp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Orphanage" ("about", "createdAt", "id", "instructions", "latitude", "longitude", "name", "openOnWeekends", "openingHours", "updatedAt") SELECT "about", "createdAt", "id", "instructions", "latitude", "longitude", "name", "openOnWeekends", "openingHours", "updatedAt" FROM "Orphanage";
DROP TABLE "Orphanage";
ALTER TABLE "new_Orphanage" RENAME TO "Orphanage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
