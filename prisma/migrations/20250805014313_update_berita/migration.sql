/*
  Warnings:

  - You are about to alter the column `date` on the `Berita` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
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
    "image" TEXT,
    "mediaType" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "content", "createdAt", "date", "description", "id", "image", "mediaType", "slug", "title", "viewers") SELECT "author", "content", "createdAt", coalesce("date", CURRENT_TIMESTAMP) AS "date", "description", "id", "image", "mediaType", "slug", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
