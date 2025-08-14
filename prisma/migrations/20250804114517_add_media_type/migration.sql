/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Berita` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "date" TEXT,
    "author" TEXT,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "createdAt", "date", "description", "id", "image", "title", "viewers") SELECT "author", "createdAt", "date", "description", "id", "image", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
