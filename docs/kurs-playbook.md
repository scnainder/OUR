# Panduan data kurs /kurs (JPY → IDR)

Dokumen ini adalah **satu-satunya sumber cara** memperbarui kurs. AI/orang yang menjalankan tugas harian cukup mengikuti ini, tanpa menebak.

## Ringkasan alur

| Data | Sumber | Seberapa sering | Perintah |
|---|---|---|---|
| Wise, Instarem, SBI Remit | API publik Wise Comparisons | tiap jam (GitHub Actions) | `node scripts/update-rates.mjs` |
| Remitly, Brastel, Smiles | Browser (Playwright) membaca situs resmi | tiap 6 jam (Actions) + tugas harian Claude | `node scripts/scan-manual.mjs` |
| Rating App Store / Play Store | iTunes Lookup API + google-play-scraper | harian | `node scripts/update-ratings.mjs` |
| Provider tanpa data | tampil kartu "Cek kurs" + catatan `info` | - | edit `data/providers.json` |

Rumus di halaman: `diterima = (nominal − biaya) × kurs`.
Berkas: `data/providers.json` (daftar provider), `data/manual-rates.json` (hasil pemindai, kedaluwarsa 3 hari), `public/rates.json` dan `public/ratings.json` (dibaca halaman).

## Tugas harian (untuk AI)

1. `node scripts/scan-manual.mjs` (Playwright + Chromium sudah terpasang di sesi cloud; jangan install ulang).
2. Jika semua `OK`: `node scripts/update-rates.mjs`, lalu commit `data/manual-rates.json` dan `public/rates.json`.
3. Jika ada adapter `GAGAL`: **perbaiki adapternya** di `scripts/providers/<alias>.mjs` (situs berubah) memakai bagian "Cara per provider" di bawah, jalankan ulang, lalu commit perbaikannya dan perbarui bagian terkait dokumen ini. Jangan menulis angka tebakan ke `manual-rates.json`.
4. Laporkan singkat: yang berhasil (kurs, biaya) dan yang gagal beserta penyebabnya.

## Aturan keras

- Hanya tulis angka yang benar-benar terbaca di halaman resmi untuk **JPY → IDR, setoran rekening bank**.
- **Jangan pakai angka promo** (tarif pelanggan baru, biaya digratiskan) sebagai tarif standar. Promo boleh ditulis sebagai `note`.
- **Jangan menembus verifikasi bot/captcha** (Cloudflare "Performing security verification") dan **jangan login otomatis**. Provider seperti itu dibiarkan "Cek kurs".
- Kurs yang menyimpang >15% dari kurs tengah (frankfurter.app) otomatis ditolak oleh skrip.
- Hati-hati: banyak situs memakai **spasi non-breaking** (U+00A0). Di regex pakai `\s*`, jangan spasi literal. Konten sering dimuat terlambat: pakai `waitText(page, regex)`, bukan `waitForTimeout`.

## Cara per provider

### Wise, Instarem, SBI Remit, (SMBC) — API
`https://api.wise.com/v4/comparisons/?sourceCurrency=JPY&targetCurrency=IDR&sendAmount=<N>&sourceCountry=JP&targetCountry=ID`.
Hanya 4 provider yang dikembalikan untuk koridor ini. Diambil pada 9 nominal (¥10 rb–¥2 jt), lalu diinterpolasi. Terverifikasi: `diterima = (nominal − fee) × rate` sama persis dengan `receivedAmount` API.

### Remitly — `scripts/providers/remitly.mjs`
- URL: `https://www.remitly.com/jp/en/indonesia`. Kalkulator: input `#calculator-send`.
- Tampilan default = **promo "Welcome rate"** (pelanggan baru, ¥100.000 pertama). Tarif standar baru tampil untuk nominal > ¥100.000: isi **¥300.000**, baca teks `Standard rate 1 JPY = X IDR` dan `Fee | JPY N` (biaya dasar ¥100).
- Kurs "1 JPY = 114.80 IDR" di HTML mentah halaman **bukan** tarif standar; jangan dipakai.

### Brastel Remit — `scripts/providers/brastel.mjs`
- Kurs: `https://www.brastelremit.jp/eng/rates`, baris `Indonesia 1 JPY = xxx IDR` (setoran bank). Ada stempel "Last update".
- Biaya: `https://www.brastelremit.jp/eng/fees`, pilih **Indonesia** di `<select>`; tabel `From ¥a to ¥b → ¥fee` (bertingkat) dan `Max. remittance amount per transaction`.
- Belum termasuk biaya transfer bank di Jepang ke rekening Brastel.

### Smiles — `scripts/providers/smiles.mjs`
- Kurs: `https://www.smileswallet.com/japan/exchange-rates/`, baris `Indonesia | xxx IDR`.
- Biaya: `https://www.smileswallet.com/japan/remittance-fee/`, pilih **Indonesia** di `#country_chooser`. Muncul 3 tabel `Send with <logo>`: **tabel pertama = Smiles** (¥450/880/1.480/1.980), kedua = Ria, ketiga = lainnya. Logo berupa gambar, jadi urutan dipakai sebagai penanda (jika halaman berubah, cek visual dengan screenshot).
- Halaman utama `smileswallet.com` menampilkan simulator generik (PHP/VND), jangan dipakai.

### PayForex — belum ada kurs
- Biaya publik: `https://www.payforex.net/fee/remit`, blok Indonesia, rekening bank IDR: ≤¥20.000 ¥480; ≤¥60.000 ¥780; ≤¥300.000 ¥1.180; ≤¥599.999 ¥1.480; ¥600.000–¥1.000.000 gratis. Minimum kirim ¥7.000.
- **Kurs hanya terlihat setelah login** → tidak diotomatisasi. Kartu "Cek kurs" + catatan.

### Kyodai Remittance (kini bagian dari Ria) — belum ada kurs
- Situs `kyodairemittance.com` dialihkan ke `riamoneytransfer.com` yang dilindungi verifikasi bot Cloudflare. Tidak diakali. Referensi pihak ketiga lama: biaya ¥1.480 untuk ¥100.000 (blog Wise, kemungkinan usang).
- Alternatif jika pemilik mau: isi `data/manual-rates.json` manual dari aplikasi (format di bawah).

### Western Union — belum dipakai
- `https://www.westernunion.com/jp/en/send-money-to-indonesia.html`: kalkulator `#sender-amount-JPY`. Hasilnya adalah **promo transfer pertama** (biaya digratiskan; "You Save N JPY on fee" = biaya normal, dan kurs di atas kurs tengah). Kurs standar tidak terlihat tanpa login → tidak dipakai.

### GME Remit, Paysend — belum dipakai
- GME: kalkulator di situsnya berbasis Korea dan error untuk Jepang. Paysend: halaman Jepang→Indonesia menampilkan default China.

## Format `data/manual-rates.json`
```json
{ "rates": { "<alias>": { "rate": 114.3, "fee": 100, "feePct": 0,
  "tiers": [[10000, 460], [50000, 880]], "max": 800000, "note": "teks opsional", "updatedAt": "YYYY-MM-DD" } } }
```
`tiers` = `[[batas_atas_JPY, biaya_JPY], ...]` (menggantikan `fee`/`feePct`). `max` = batas kirim per transaksi.

## Menambah provider baru
1. Tambah entri di `data/providers.json` (`alias`, `name`, `affiliateUrl`, `iosId`, `playId`, `rateSource`).
2. Jika bisa dibaca: buat `scripts/providers/<alias>.mjs` (ekspor `alias` dan `scan(page)` yang mengembalikan `{rate, fee | tiers, max?, note?}`), daftarkan di `scripts/scan-manual.mjs`, lalu tambahkan bagian di dokumen ini.
3. Cek: `node scripts/scan-manual.mjs <alias>` lalu `node scripts/update-rates.mjs`.
