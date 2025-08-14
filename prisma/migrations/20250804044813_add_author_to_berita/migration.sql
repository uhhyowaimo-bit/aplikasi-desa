/*
  Warnings:

  - Added the required column `author` to the `Berita` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Berita" ("createdAt", "date", "description", "id", "image", "title", "updatedAt", "viewers") SELECT "createdAt", "date", "description", "id", "image", "title", "updatedAt", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
