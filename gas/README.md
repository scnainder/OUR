# Google Apps Script – Riwayat Versi

Aturan: setiap update = file baru `Versi_X.Y_<Pembuat>.gs`. Versi lama TIDAK diubah/dihapus (untuk rollback).
Baris pertama tiap file: `VERSI X.Y - <PEMBUAT>`.

| Versi | Pembuat | File | Catatan |
|-------|---------|------|---------|
| 4.1 | Gemini | `Versi_4.1_Gemini.gs` | Baseline awal (disimpan apa adanya) |
| 4.2 | Claude | `Versi_4.2_Claude.gs` | Perbaikan sinkronisasi kalender (7 poin) |
| 4.3 | Claude | `Versi_4.3_Claude.gs` | Sinkron kalender: jendela 30 hari lalu, normalisasi email, menu diagnosa |
| 4.4 | Claude | `Versi_4.4_Claude.gs` | Script AKUN A (email/validasi): sinkron kalender dihapus |
| 4.4 | Claude | `Versi_4.4_Claude_AKUN-B_SinkronKalender.gs` | Script terpisah AKUN B: sinkron kalender (isi SPREADSHEET_ID, lihat petunjuk di header file) |
| 4.5 | Claude | `Versi_4.5_Claude_AKUN-B_SinkronKalender.gs` | Script AKUN B: perbaiki error toast di project standalone (script akun A tetap 4.4) |
