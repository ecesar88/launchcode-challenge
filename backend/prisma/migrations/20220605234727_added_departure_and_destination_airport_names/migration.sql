/*
  Warnings:

  - Added the required column `departureAirportName` to the `quotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationAirportName` to the `quotes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departureAirportName" TEXT NOT NULL,
    "destinationAirportName" TEXT NOT NULL,
    "departureLocation" TEXT NOT NULL,
    "destinationLocation" TEXT NOT NULL,
    "departureDate" TEXT NOT NULL,
    "returnDate" TEXT NOT NULL,
    "numberOfTravellers" INTEGER NOT NULL
);
INSERT INTO "new_quotes" ("createdAt", "departureDate", "departureLocation", "destinationLocation", "id", "numberOfTravellers", "returnDate", "updatedAt") SELECT "createdAt", "departureDate", "departureLocation", "destinationLocation", "id", "numberOfTravellers", "returnDate", "updatedAt" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
