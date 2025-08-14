-- CreateTable
CREATE TABLE "PengajuanSurat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "jenisSurat" TEXT NOT NULL,
    "alasan" TEXT NOT NULL,
    "kodeVerifikasi" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'belum_diterima',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "PengajuanSurat_kodeVerifikasi_key" ON "PengajuanSurat"("kodeVerifikasi");
