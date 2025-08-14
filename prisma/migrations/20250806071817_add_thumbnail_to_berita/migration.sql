/*
  Warnings:

  - You are about to drop the column `date` on the `Berita` table. All the data in the column will be lost.
  - Made the column `content` on table `Berita` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Berita` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Berita` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mediaType` on table `Berita` required. This step will fail if there are existing NULL values in that column.

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
    "thumbnail" TEXT,
    "mediaType" TEXT NOT NULL,
    "author" TEXT,
    "slug" TEXT NOT NULL,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "content", "createdAt", "description", "id", "image", "mediaType", "slug", "thumbnail", "title", "viewers") SELECT "author", "content", "createdAt", "description", "id", "image", "mediaType", "slug", "thumbnail", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
