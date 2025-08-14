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
    "mediaType" TEXT NOT NULL,
    "author" TEXT,
    "viewers" INTEGER NOT NULL DEFAULT 0,
    "date" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Berita" ("author", "content", "createdAt", "date", "description", "id", "image", "mediaType", "slug", "title", "viewers") SELECT "author", "content", "createdAt", "date", "description", "id", "image", "mediaType", "slug", "title", "viewers" FROM "Berita";
DROP TABLE "Berita";
ALTER TABLE "new_Berita" RENAME TO "Berita";
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
