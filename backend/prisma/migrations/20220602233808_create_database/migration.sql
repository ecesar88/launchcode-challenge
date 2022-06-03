-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departureLocation" TEXT NOT NULL,
    "destinationLocation" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "returnDate" DATETIME NOT NULL,
    "numberOfTravellers" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "transportationTypes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "availableOnSite" BOOLEAN NOT NULL,
    "quoteId" TEXT,
    CONSTRAINT "transportationTypes_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
