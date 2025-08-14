/*
  Warnings:

  - Made the column `author` on table `Berita` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "thumbnail" TEXT DEFAULT '',
    "mediaType" TEXT NOT NULL,
    "date" TEXT NOT NULL DEFAULT 'Belum diisi',
    "author" TEXT NOT NULL,
    "viewers" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "content", "createdAt", "description", "id", "image", "mediaType", "slug", "thumbnail", "title", "viewers") SELECT "author", "content", "createdAt", "description", "id", "image", "mediaType", "slug", "thumbnail", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
