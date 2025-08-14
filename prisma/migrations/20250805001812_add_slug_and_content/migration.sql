/*
  Warnings:

  - Added the required column `content` to the `Berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Berita` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "date" TEXT,
    "author" TEXT,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "createdAt", "date", "description", "id", "image", "mediaType", "title", "viewers") SELECT "author", "createdAt", "date", "description", "id", "image", "mediaType", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
