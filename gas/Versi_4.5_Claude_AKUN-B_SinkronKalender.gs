// #################################################################################
// VERSI 4.5 - CLAUDE  (SCRIPT AKUN B: sinkron kalender) - PROJECT APPS SCRIPT TERPISAH
// Perubahan dari 4.4 (akun B): hapus ss.toast() & setActiveSheet() yang error di project standalone. Script akun A tetap 4.4.
// Dijalankan oleh AKUN B (yang punya akses ke 5 kalender interviewer).
// Menulis jadwal ke spreadsheet yang sama lewat ID spreadsheet.
//
// SETUP (sekali):
// 1. Login akun B -> script.new -> tempel seluruh file ini.
// 2. Isi SPREADSHEET_ID di bawah (angka/huruf di URL spreadsheet antara /d/ dan /edit).
// 3. Pastikan akun B punya akses EDIT ke spreadsheet, dan 5 kalender interviewer
//    sudah ada di Google Calendar akun B (Other calendars / subscribe).
// 4. Jalankan fungsi cekSinkronKalender -> setujui izin akses -> lihat sheet DIAG_KALENDER.
// 5. Jalankan INSTALL_TRIGGER_KALENDER (sekali) agar sinkron otomatis tiap jam.
// =================================================================================
const SPREADSHEET_ID = "ISI_ID_SPREADSHEET_DI_SINI";
const TARGET_SHEETS_ALT = ["介護", "Batch6（介護）", "Batch6（LEOC）", "Tridarma高校"];
const TZ = "Asia/Jakarta";

function bukaSpreadsheet_() { return SpreadsheetApp.openById(SPREADSHEET_ID); }

function INSTALL_TRIGGER_KALENDER() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("sinkronisasiJadwalBanyakKalender").timeBased().everyHours(1).create();
  Logger.log("Trigger sinkron kalender (tiap 1 jam) terpasang.");
}

function catatLogGagal(sheetName, nama, email, tipeEmail, errorMsg) {
  const ss = bukaSpreadsheet_();
  let logSheet = ss.getSheetByName("LOG_EMAIL_GAGAL");
  if (!logSheet) {
    logSheet = ss.insertSheet("LOG_EMAIL_GAGAL");
    logSheet.appendRow(["Tanggal Waktu", "Sheet Asal", "Nama", "Email", "Jenis Email", "Pesan Error"]);
    logSheet.getRange("A1:F1").setFontWeight("bold").setBackground("#ffcccc");
    logSheet.setFrozenRows(1);
  }
  logSheet.appendRow([Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd HH:mm:ss"), sheetName, nama, email, tipeEmail, errorMsg]);
}

// =================================================================================
// 📅 8. SINKRONISASI JADWAL KALENDER (V4.3: jendela 30 hari lalu s/d 30 hari depan, email dinormalisasi, + diagnosa)
// =================================================================================
const DAFTAR_KALENDER = [
  { id: "katrine.v.s@id.onodera-user-run.com", nama: "Katrine" }, { id: "reyza.a@id.onodera-user-run.com", nama: "Reyza" },
  { id: "sekar.r.p@id.onodera-user-run.com", nama: "Sekar" }, { id: "anya.d@id.onodera-user-run.com", nama: "Anya" },
  { id: "jana.y@id.onodera-user-run.com", nama: "Jana" }
];
const JENDELA_LALU_HARI = 30;
const JENDELA_DEPAN_HARI = 30;

// Samakan format email (gmail: titik & +tag diabaikan)
function normEmail_(e) {
  e = String(e || "").toLowerCase().trim();
  const m = e.split("@"); if (m.length !== 2) return e;
  let l = m[0], d = m[1];
  if (d === "gmail.com" || d === "googlemail.com") { l = l.split("+")[0].replace(/\./g, ""); d = "gmail.com"; }
  return l + "@" + d;
}

function normSel_(v, jenis) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, jenis === "t" ? "HH:mm" : "dd/MM/yyyy");
  return String(v == null ? "" : v).trim();
}

// Baca semua event SEKALI. Kembalikan {events, stat}
function ambilSemuaEvent_(catatGagal) {
  const props = PropertiesService.getScriptProperties();
  const now = new Date();
  const dari = new Date(now.getTime() - JENDELA_LALU_HARI * 86400000);
  const sampai = new Date(now.getTime() + JENDELA_DEPAN_HARI * 86400000);
  const tglKey = Utilities.formatDate(now, TZ, "yyyy-MM-dd");
  const events = [], stat = [];
  const reEmail = /[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/gi;

  for (const k of DAFTAR_KALENDER) {
    const st = { nama: k.nama, id: k.id, ok: false, err: "", total: 0, tanpaEmail: 0 };
    stat.push(st);
    let cal = null;
    try { cal = CalendarApp.getCalendarById(k.id); if (!cal) st.err = "Kalender tidak ditemukan / belum di-subscribe / akses dicabut"; }
    catch (e) { st.err = e.message; }
    let evs = [];
    if (cal) { try { evs = cal.getEvents(dari, sampai); st.ok = true; } catch (e) { st.err = e.message; } }
    if (!st.ok) {
      if (catatGagal) {
        const pk = "CALWARN_" + k.id;
        if (props.getProperty(pk) !== tglKey) { props.setProperty(pk, tglKey); catatLogGagal("Kalender", k.nama, k.id, "Sinkronisasi Kalender", st.err); }
      }
      continue;
    }
    for (const ev of evs) {
      st.total++;
      let emails = [];
      try {
        emails = ev.getGuestList()
          .filter(t => t.getGuestStatus() !== CalendarApp.GuestStatus.NO)
          .map(t => t.getEmail());
      } catch (e) {}
      // Cadangan: kalau tidak ada tamu, cari email di judul/deskripsi
      if (emails.length === 0) {
        try { emails = ((ev.getTitle() || "") + " " + (ev.getDescription() || "")).match(reEmail) || []; } catch (e) {}
      }
      if (emails.length === 0) { st.tanpaEmail++; }
      const start = ev.getStartTime();
      events.push({
        start: start, judul: ev.getTitle(),
        tgl: Utilities.formatDate(start, TZ, "dd/MM/yyyy"),
        wkt: Utilities.formatDate(start, TZ, "HH:mm"),
        isInt2: /interview\s*2|wawancara\s*2|kedua|2nd/i.test(ev.getTitle()),
        intv: k.nama, emails: emails.map(normEmail_), emailAsli: emails
      });
    }
  }
  // Prioritas: event akan datang terdekat dulu, lalu event lampau terbaru
  const t = now.getTime();
  events.sort((a, b) => {
    const af = a.start.getTime() >= t, bf = b.start.getTime() >= t;
    if (af && bf) return a.start - b.start;
    if (af) return -1; if (bf) return 1;
    return b.start - a.start;
  });
  return { events: events, stat: stat };
}

function sinkronisasiJadwalBanyakKalender() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try { jalankanSinkronKalender_(); } finally { lock.releaseLock(); }
}

function jalankanSinkronKalender_() {
  const ss = bukaSpreadsheet_();
  const hasil = ambilSemuaEvent_(true);

  const final1 = {}, final2 = {};
  for (const ev of hasil.events) {
    for (const em of ev.emails) {
      if (ev.isInt2) { if (!final2[em]) final2[em] = ev; }
      else { if (!final1[em]) final1[em] = ev; }
    }
  }

  for (const nm of TARGET_SHEETS_ALT) {
    const sheet = ss.getSheetByName(nm); if (!sheet) continue;
    const n = sheet.getLastRow() - 2; if (n < 1) continue;

    const emails = sheet.getRange(3, 30, n, 1).getValues();
    const r1 = sheet.getRange(3, 7, n, 3), r2 = sheet.getRange(3, 13, n, 2);
    const v1 = r1.getValues(), f1 = r1.getFormulas();
    const v2 = r2.getValues(), f2 = r2.getFormulas();

    const sudah = {};
    for (let i = 0; i < n; i++) {
      const em = normEmail_(emails[i][0]);
      if (!em || sudah[em]) continue; sudah[em] = true;

      const e1 = final1[em], e2 = final2[em];
      if (e1) {
        const baru = [e1.tgl, e1.wkt, e1.intv], jenis = ["d", "t", "n"];
        for (let c = 0; c < 3; c++) {
          if (f1[i][c] !== "") continue;
          if (normSel_(v1[i][c], jenis[c]) !== baru[c]) tulisSel_(sheet, i + 3, 7 + c, baru[c]);
        }
      }
      if (e2) {
        const baru = [e2.tgl, e2.wkt], jenis = ["d", "t"];
        for (let c = 0; c < 2; c++) {
          if (f2[i][c] !== "") continue;
          if (normSel_(v2[i][c], jenis[c]) !== baru[c]) tulisSel_(sheet, i + 3, 13 + c, baru[c]);
        }
      }
    }
  }
}

function tulisSel_(sheet, row, col, nilai) {
  const cell = sheet.getRange(row, col);
  cell.setNumberFormat("@");
  cell.setValue(nilai);
}

// 🔍 DIAGNOSA: jalankan dari menu "OUR Tools" -> "Cek Sinkron Kalender". Hasil di sheet DIAG_KALENDER
function cekSinkronKalender() {
  const ss = bukaSpreadsheet_();
  const hasil = ambilSemuaEvent_(false);
  const petaEmail = {};
  for (const ev of hasil.events) for (const em of ev.emails) { (petaEmail[em] = petaEmail[em] || []).push(ev); }
  const petaLokal = {};
  for (const em of Object.keys(petaEmail)) { const l = em.split("@")[0]; (petaLokal[l] = petaLokal[l] || []).push(em); }

  const out = [];
  out.push(["A. STATUS KALENDER (" + JENDELA_LALU_HARI + " hari lalu s/d " + JENDELA_DEPAN_HARI + " hari depan)", "", "", "", ""]);
  out.push(["Interviewer", "Kalender", "Status", "Jumlah event", "Event tanpa email peserta"]);
  for (const s of hasil.stat) out.push([s.nama, s.id, s.ok ? "OK" : "GAGAL: " + s.err, s.total, s.tanpaEmail]);

  out.push(["", "", "", "", ""]);
  out.push(["B. PESAN LULUS TAPI JADWAL (kolom G) KOSONG", "", "", "", ""]);
  out.push(["Sheet", "Baris", "Nama", "Email (kolom AD)", "Alasan"]);
  const emailSheet = {};
  for (const nm of TARGET_SHEETS_ALT) {
    const sh = ss.getSheetByName(nm); if (!sh) continue;
    const n = sh.getLastRow() - 2; if (n < 1) continue;
    const data = sh.getRange(3, 1, n, 30).getValues();
    for (let i = 0; i < n; i++) {
      const r = data[i];
      const em = normEmail_(r[29]); if (em) emailSheet[em] = true;
      const st = String(r[2]).trim().toUpperCase();
      if (st === "HOLD" || st === "CASE CLOSED") continue;
      if (!String(r[5]).includes("LULUS 合格済み") || String(r[6]).trim() !== "") continue;
      let alasan;
      if (!em) alasan = "Email kolom AD kosong";
      else if (petaEmail[em]) alasan = "Ada event (" + petaEmail[em][0].tgl + " " + petaEmail[em][0].intv + ") tapi belum tertulis: cek sel G berformula / sheet terlindungi";
      else {
        const mirip = petaLokal[em.split("@")[0]];
        alasan = mirip ? "Email beda domain/ejaan. Di kalender: " + mirip.join(", ")
                       : "Tidak ada event dengan email ini di kalender (peserta belum booking, atau email booking berbeda)";
      }
      out.push([nm, i + 3, String(r[20]).trim(), String(r[29]).trim(), alasan]);
    }
  }

  out.push(["", "", "", "", ""]);
  out.push(["C. EVENT YANG TIDAK COCOK DENGAN PESERTA MANAPUN (maks 100)", "", "", "", ""]);
  out.push(["Interviewer", "Tanggal", "Judul", "Email di event", "Catatan"]);
  let c = 0;
  for (const ev of hasil.events) {
    if (c >= 100) break;
    if (ev.emails.some(e => emailSheet[e])) continue;
    out.push([ev.intv, ev.tgl + " " + ev.wkt, ev.judul, ev.emailAsli.join(", "), ev.emails.length ? "Email tidak ada di kolom AD" : "Tidak ada email peserta"]);
    c++;
  }

  let sh = ss.getSheetByName("DIAG_KALENDER");
  if (!sh) sh = ss.insertSheet("DIAG_KALENDER"); else sh.clear();
  sh.getRange(1, 1, out.length, 5).setValues(out);
  sh.getRange(1, 1, out.length, 5).setWrap(false);
  sh.setColumnWidths(1, 5, 220);
  Logger.log("Diagnosa selesai. Lihat sheet DIAG_KALENDER.");
}

// =================================================================================
