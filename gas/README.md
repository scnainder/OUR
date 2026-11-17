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
| 4.6 | Claude | `Versi_4.6_Claude_AKUN-B_SinkronKalender.gs` | Script AKUN B: setNumberFormat try/catch (error kolom bertipe). Akun A tetap 4.4 |
| 4.7 | Claude | `Versi_4.7_Claude_AKUN-B_SinkronKalender.gs` | Script AKUN B: tulis sel 3 strategi, gagal satu sel tidak menghentikan proses. Akun A tetap 4.4 |
| 4.8 | Claude | `Versi_4.8_Claude.gs` | Script AKUN A: perbaikan alur CQI (poller 10 menit, tidak bergantung AutoTrigger!A1, menu Cek CQI). WAJIB jalankan INSTALL_SEMUA_TRIGGER |
| 4.9 | Claude | `Versi_4.9_Claude.gs` | Script AKUN A: Meta CAPI kirim fn, ln, st, country, external_id (di-hash). Dasar: 4.8 |
| 4.10 | Claude | `Versi_4.10_Claude.gs` | Script AKUN A: Meta CAPI + jenis kelamin (ge) & tanggal lahir (db) via judul kolom; 介護 kirim content_category=Perawat. Dasar: 4.9 |
| 4.11 | Claude | `Versi_4.11_Claude.gs` | Script AKUN A: koreksi kolom jenis kelamin = W (bukan G); tanggal lahir = X. Dasar: 4.10 |
