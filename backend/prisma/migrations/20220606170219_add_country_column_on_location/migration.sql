/*
  Warnings:

  - Added the required column `country` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "airportName" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "ICAOCode" TEXT NOT NULL,
    "IATACode" TEXT NOT NULL,
    "coordinatesId" TEXT NOT NULL,
    CONSTRAINT "Location_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Location_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("IATACode", "ICAOCode", "airportName", "cityName", "coordinatesId", "id") SELECT "IATACode", "ICAOCode", "airportName", "cityName", "coordinatesId", "id" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
