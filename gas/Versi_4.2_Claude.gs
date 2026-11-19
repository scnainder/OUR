// #################################################################################
// VERSI 4.2 - CLAUDE
// Perubahan dari 4.1: hanya Bagian 8 (Sinkronisasi Kalender) diperbaiki:
// 1) getGuestList sekali saja  2) tulis hanya sel berubah & lewati formula  3) pilih event terdekat
// 4) nama interviewer ikut update  5) log kalender gagal  6) abaikan tamu yang menolak  7) paksa format Plain Text
// Bagian lain identik dengan 4.1.
// =================================================================================
// 🚀 1. AUTO-INSTALLER: FUNGSI UNTUK MEMASANG SEMUA TRIGGER
// =================================================================================
function INSTALL_SEMUA_TRIGGER() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggersLama = ScriptApp.getProjectTriggers();

  for (let i = 0; i < triggersLama.length; i++) {
    ScriptApp.deleteTrigger(triggersLama[i]);
  }

  // Trigger Utama
  ScriptApp.newTrigger("masterFormSubmit").forSpreadsheet(ss).onFormSubmit().create();

  // Trigger Pengingat (Reminder)
  ScriptApp.newTrigger("auto_ReminderBelumPesanWawancara").timeBased().atHour(6).everyDays(1).create();
  ScriptApp.newTrigger("auto_ReminderFormLanjutan").timeBased().atHour(19).everyDays(1).create();
  ScriptApp.newTrigger("auto_ReminderBelumPesanInterview").timeBased().atHour(21).everyDays(1).create();

  // Trigger Antrean Psikotes & Sinkronisasi Kalender
  ScriptApp.newTrigger("prosesAntreanEmailPsikotes").timeBased().everyMinutes(10).create();
  ScriptApp.newTrigger("sinkronisasiJadwalBanyakKalender").timeBased().everyHours(1).create();

  // 🔴 TRIGGER SENSOR CQI (ON CHANGE) - SESUAI SISTEM ASLI ANDA
  ScriptApp.newTrigger("auto_ListenForSync").forSpreadsheet(ss).onChange().create();

  SpreadsheetApp.getActiveSpreadsheet().toast("Semua pemicu berhasil dipasang. Sensor AutoTrigger aktif!", "✅ INSTALL SUKSES", 10);
}

// =================================================================================
// 👑 2. MASTER TRIGGER & KONFIGURASI GLOBAL
// =================================================================================
const TARGET_SHEETS_ALT = ["介護", "Batch6（介護）", "Batch6（LEOC）", "Tridarma高校"];
const TZ = "Asia/Jakarta";

const EMAIL_FOOTER =
  "<br><br>Best regards,<br>" +
  "<b>Enrollment Promotion Department</b><br>" +
  "PT Onodera User Run Indonesia<br><br>" +
  "Whatsapp : 0811 6888 8844<br>" +
  "Universitas Sari Mutiara Indonesia<br>" +
  "Jl. Kapten Muslim No.79, Helvetia Tengah,<br>" +
  "Medan Helvetia, Kota Medan,<br>" +
  "Sumatera Utara 20124";

function masterFormSubmit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  const row = e.range.getRow();

  if (!sheetName.includes("介護") && !sheetName.includes("LEOC")) return;

  try { jalankanLogikaPengecekan(sheet, row, row); } catch (err) { Logger.log("Error Validasi: " + err); }
  try {
    if (sheetName.includes("介護")) sendSheetRowToMeta_(sheet, row, false);
    else if (sheetName.includes("LEOC")) processLeocRow_(sheet, row, { forceResend: false });
  } catch (err) { Logger.log("Error Meta CAPI: " + err); }
  try { jadwalkanEmailPendaftaran(); } catch (err) { Logger.log("Error Jadwal Email: " + err); }
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  if (!sheetName.includes("介護") && !sheetName.includes("LEOC")) return;

  const range = e.range;
  const colStart = range.getColumn();
  const colEnd = range.getLastColumn();

  if ((colStart <= 20 && colEnd >= 20) || (colStart <= 24 && colEnd >= 24) ||
      (colStart <= 27 && colEnd >= 27) || (colStart <= 30 && colEnd >= 30) ||
      (colStart <= 35 && colEnd >= 35) || (colStart <= 36 && colEnd >= 36) ||
      (colStart <= 37 && colEnd >= 37)) {
    jalankanLogikaPengecekan(sheet, range.getRow(), range.getLastRow());
  }
  catatTanggalCQI(e);
}

// =================================================================================
// 🛠️ 3. FUNGSI VALIDASI LOGIKA FORM AWAL (UMUR, PROVINSI, DUPLIKAT)
// =================================================================================
function jalankanLogikaPengecekan(sheet, rowStart, rowEnd) {
  const sheetName = sheet.getName();
  const lastRow = sheet.getLastRow();

  let allEmails = [];
  if (lastRow >= 3) {
    allEmails = sheet.getRange(3, 30, lastRow - 2, 1).getValues().map(val => val[0].toString().trim().toLowerCase());
  }

  const allowedProvinces = ["aceh", "sumatera utara", "sumatera barat", "riau", "kepulauan riau", "jambi"];
  const data = sheet.getRange(rowStart, 1, rowEnd - rowStart + 1, 37).getValues();
  const statusUpdates = [];
  let adaUpdate = false;

  for (let r = 0; r < data.length; r++) {
    let rowData = data[r];
    let rowIndex = rowStart + r;
    if (rowIndex < 3) { statusUpdates.push([rowData[5]]); continue; }

    let ageValue = String(rowData[19] || "");
    let provValue = String(rowData[26] || "").trim().toLowerCase();
    let emailValue = String(rowData[29] || "").trim().toLowerCase();
    let status = "";

    if (sheetName.includes("LEOC")) {
      let valAI = String(rowData[34] || "").trim().toLowerCase();
      let valAJ = String(rowData[35] || "").trim().toLowerCase();
      let valAK = String(rowData[36] || "").trim().toLowerCase();
      if (valAI.includes("tidak bisa") || valAJ.includes("tidak bisa") || valAK.includes("tidak bisa")) {
        status = "Tidak Memenuhi Syarat / 条件不一致";
      }
    }

    if (status === "" && emailValue !== "") {
      let firstIndex = allEmails.indexOf(emailValue);
      if (firstIndex !== -1 && firstIndex < (rowIndex - 3)) status = "Duplikat 重複者";
    }

    if (status === "") {
      let ageMatch = ageValue.match(/\d+/);
      if (ageMatch) {
        let age = parseInt(ageMatch[0], 10);
        if (age > 28 || age <= 16) status = "Tidak termasuk CQI対象外";
      }
    }

    if (status === "") {
      let provValid = false;
      for (let p of allowedProvinces) {
        if (provValue.includes(p)) { provValid = true; break; }
      }
      if (!provValid && provValue !== "") status = "Luar Yuridiksi 管轄外";
    }

    let currentF = String(rowData[5]).trim();
    if (currentF.includes("LULUS") || currentF.includes("合格") || currentF.includes("SEDANG")) {
      status = currentF;
    }

    let finalStatus = status !== "" ? status : rowData[5];
    if (finalStatus !== rowData[5]) adaUpdate = true;
    statusUpdates.push([finalStatus]);
  }

  if (adaUpdate) {
    sheet.getRange(rowStart, 6, statusUpdates.length, 1).setValues(statusUpdates);
  }
}

// =================================================================================
// 📧 4. EMAIL PENDAFTARAN AWAL
// =================================================================================
function jadwalkanEmailPendaftaran() {
  const funcEmailForm = "auto_kirimEmailPendaftaran";
  const triggers = ScriptApp.getProjectTriggers();
  for (let t of triggers) { if (t.getHandlerFunction() === funcEmailForm) return; }
  ScriptApp.newTrigger(funcEmailForm).timeBased().after(5 * 60 * 1000).create();
}

function auto_kirimEmailPendaftaran() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === "auto_kirimEmailPendaftaran") ScriptApp.deleteTrigger(t); });
  if (MailApp.getRemainingDailyQuota() < 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    const sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    const lastRow = sheet.getLastRow(); if (lastRow < 3) continue;
    const data = sheet.getRange(3, 1, lastRow - 2, 76).getValues();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const statusF = String(row[5] || "").trim();
      const nama = String(row[20] || "").trim();
      const email = String(row[29] || "").trim();
      const stempel = row[75];

      if (nama !== "" && email !== "" && (!stempel || stempel === "")) {
        let subject = "", htmlMessage = "", kirimEmail = false;

        if (statusF === "") {
          subject = "Pendaftaran Diterima - OUR Blooming Academy Medan";
          htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Terima kasih telah mendaftar di <b>OUR Blooming Academy Medan</b>.<br><br>Tahapan seleksi:<br>1. <b>Psikotes</b><br>2. <b>Interview 1</b><br>3. <b>Interview 2</b><br><br><b>TAHAP 1: PSIKOTES</b><br>Link Psikotes akan dikirimkan ke email Anda dari <b>testguide@hr-cqi.com</b> setiap hari kerja pukul <b>10:00 WIB</b>.<br><br><b>⚠️ PERHATIAN:</b> Link ujian hanya berlaku 3 hari.<br><br>Kami tunggu partisipasi Anda.";
          kirimEmail = true;
        } else if (statusF.includes("Duplikat") || statusF.includes("重複者")) {
          subject = "Pemberitahuan Pendaftaran - OUR Blooming Academy Medan";
          htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Sistem kami mendeteksi bahwa Anda sudah pernah mengisi data pendaftaran sebelumnya.<br><br>Mohon untuk <b>tidak mengisi data lain kembali</b> kecuali ada instruksi lebih lanjut dari pihak kami.<br><br>Terima kasih atas kerja samanya.";
          kirimEmail = true;
        } else if (statusF.includes("CQI対象外")) {
          subject = "Informasi Pendaftaran - OUR Blooming Academy Medan";
          htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Terima kasih atas ketertarikan Anda untuk mendaftar di OUR Blooming Academy Medan.<br><br>Kami memohon maaf yang sebesar-besarnya, namun berdasarkan data yang Anda berikan, usia Anda saat ini berada di luar batas kriteria persyaratan yang telah kami tetapkan.<br><br>Oleh karena itu, kami belum bisa memproses pendaftaran Anda lebih lanjut pada kesempatan kali ini. Semoga Anda senantiasa sukses dalam langkah karier selanjutnya.";
          kirimEmail = true;
        } else if (statusF.includes("Luar Yuridiksi") || statusF.includes("管轄外")) {
          subject = "Informasi Pendaftaran (Domisili) - OUR Blooming Academy Medan";
          htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Terima kasih telah mendaftar di OUR Blooming Academy Medan.<br><br>Untuk wilayah Medan, kami memprioritaskan pendaftar dari wilayah Yuridiksi Kedubes Jepang di Medan yaitu: <b>Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau, dan Jambi</b>.<br><br>Untuk di luar provinsi di atas, silakan mendaftar di OUR Jakarta melalui Instagram: <a href='https://www.instagram.com/onoderauserrun.id'>@onoderauserrun.id</a>.<br><br><b>Namun, Anda masih bisa mendaftar di Medan dengan syarat:</b><br>1. Bisa datang ke Medan untuk mengikuti rangkaian program.<br>2. Saat mengurus Visa nanti, Anda harus mengurus di Kedubes Jepang sesuai domisili asli Anda.<br><br>Jika Anda bersedia memenuhi syarat tersebut, silakan balas email ini untuk konfirmasi.";
          kirimEmail = true;
        } else if (statusF.includes("Tidak Memenuhi Syarat") || statusF.includes("条件不一致")) {
          subject = "Informasi Pendaftaran Program LEOC - OUR Blooming Academy Medan";
          htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Terima kasih atas pendaftaran Anda di OUR Blooming Academy Medan untuk program Layanan Makanan (LEOC).<br><br>Berdasarkan jawaban formulir, Anda menyatakan tidak bisa memenuhi beberapa persyaratan operasional wajib. Kami informasikan kembali bahwa:<br><br><b>Tugas & Ketentuan Kerja Utama:</b><br><ul><li><b>Mengolah bahan makanan non-halal</b><br>Menyentuh, mengolah, mencicipi, memakan, hingga menelan bahan baku makanan yang mengandung unsur non-halal, sesuai standar kerja dapur/restoran di Jepang.</li><li><b>Jam kerja dapur yang padat</b><br>Jadwal operasional dapur/layanan makanan bersifat kontinu, sehingga peserta perlu bersedia tidak menjalankan ibadah puasa selama jam kerja berlangsung.</li><li><b>Seragam kerja standar dapur</b><br>Standar keselamatan dan higienitas dapur mewajibkan seragam kerja tanpa penutup kepala/hijab selama bertugas.</li></ul>Ketiga poin di atas adalah bagian tetap dari pekerjaan dan tidak dapat dinegosiasikan atau dikecualikan bagi siapa pun yang mengambil posisi Layanan Makanan.<br><br>Oleh karena itu, dengan sangat menyesal kami tidak dapat memproses pendaftaran Anda lebih lanjut untuk program ini. Terima kasih atas pengertian Anda.";
          kirimEmail = true;
        }

        if (kirimEmail) {
          try {
            GmailApp.sendEmail(email, subject, "Buka email ini menggunakan HTML.", { name: "OUR Blooming Academy", htmlBody: htmlMessage + EMAIL_FOOTER });
          } catch (e) { catatLogGagal(sheet.getName(), nama, email, "Email Pendaftaran Awal", e.message); }
        }
        sheet.getRange(i + 3, 76).setValue(new Date());
        Utilities.sleep(500);
      }
    }
  }
}

// =================================================================================
// 📢 5. SISTEM ESTAFET REMINDER (7 MALAM, 9 MALAM, 6 PAGI)
// =================================================================================
function auto_ReminderFormLanjutan() { eksekusiReminderEstafet("resume_ReminderFormLanjutan"); }
function resume_ReminderFormLanjutan() { deleteTempTriggers("resume_ReminderFormLanjutan"); eksekusiReminderEstafet("resume_ReminderFormLanjutan"); }
function auto_ReminderBelumPesanInterview() { eksekusiBelumInterviewEstafet("resume_ReminderBelumPesanInterview"); }
function resume_ReminderBelumPesanInterview() { deleteTempTriggers("resume_ReminderBelumPesanInterview"); eksekusiBelumInterviewEstafet("resume_ReminderBelumPesanInterview"); }
function auto_ReminderBelumPesanWawancara() { eksekusiBelumWawancaraEstafet("resume_ReminderBelumPesanWawancara"); }
function resume_ReminderBelumPesanWawancara() { deleteTempTriggers("resume_ReminderBelumPesanWawancara"); eksekusiBelumWawancaraEstafet("resume_ReminderBelumPesanWawancara"); }

function deleteTempTriggers(funcName) { ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === funcName) ScriptApp.deleteTrigger(t); }); }
function isInterviewDatePast(dateString) {
  if (!dateString) return false;
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const today = new Date(Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd"));
    return new Date(parts[2], parts[1] - 1, parts[0]) <= today;
  } return false;
}

function eksekusiReminderEstafet(triggerName) {
  if (MailApp.getRemainingDailyQuota() < 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); const MAX = 60; let sent = 0;
  const formattedDate = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");

  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    const sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    const lastRow = sheet.getLastRow(); if (lastRow < 3) continue;
    const data = sheet.getRange(3, 1, lastRow - 2, 80).getValues();

    for (let i = 0; i < data.length; i++) {
      if (sent >= MAX) { ScriptApp.newTrigger(triggerName).timeBased().after(5 * 60 * 1000).create(); return; }
      const row = data[i]; const rIdx = i + 3;
      const isValid = (String(row[2]).trim().toUpperCase() !== "HOLD" && String(row[2]).trim().toUpperCase() !== "CASE CLOSED");

      if (isValid && (String(row[5]).trim() === "LULUS 合格済み") && String(row[29] || "").trim() !== "" && (String(row[39]).trim() === "") && isInterviewDatePast(String(row[6]).trim())) {
        const sBZ = (row[77] instanceof Date) ? Utilities.formatDate(row[77], TZ, "yyyy-MM-dd") : String(row[77] || "").trim();
        const sCA = (row[78] instanceof Date) ? Utilities.formatDate(row[78], TZ, "yyyy-MM-dd") : String(row[78] || "").trim();
        const sCB = (row[79] instanceof Date) ? Utilities.formatDate(row[79], TZ, "yyyy-MM-dd") : String(row[79] || "").trim();
        let tgt = 0;
        if (sBZ !== formattedDate && sCA !== formattedDate && sCB !== formattedDate) {
          if (sBZ === "") tgt = 78; else if (sCA === "") tgt = 79; else if (sCB === "") tgt = 80;
        }
        if (tgt !== 0) {
          try {
            const htmlMessage = "Yth. <b>" + String(row[20]).trim() + "</b>,<br><br>Terimakasih sudah interview. Tapi pendaftaran <b>BELUM SELESAI</b>.<br><br>Mohon segera isi form LANJUTAN: <a href='https://docs.google.com/forms/d/e/1FAIpQLSfgBBDTrrzoNbxMBmonazGDK5VrQaBdmcbikv18Ea1noSHcxw/viewform'>Klik di sini</a><br><br>Jika ingin cancel: <a href='https://forms.gle/gM4RcjuLSf73FSKL6'>Form Cancel</a>" + EMAIL_FOOTER;
            GmailApp.sendEmail(String(row[29]).trim(), "Pendaftaran BELUM selesai - OUR Blooming Academy", "Buka HTML", { name: "OUR Blooming Academy", htmlBody: htmlMessage });
            sheet.getRange(rIdx, tgt).setValue(formattedDate); sent++; Utilities.sleep(1000);
          } catch (e) { catatLogGagal(sheet.getName(), String(row[20]).trim(), String(row[29]).trim(), "Reminder 7 Malam", e.message); }
        }
      }
    }
  }
}

function eksekusiBelumInterviewEstafet(triggerName) { jalankanEstafet(triggerName, 85, 21, true); }
function eksekusiBelumWawancaraEstafet(triggerName) { jalankanEstafet(triggerName, 81, 6, false); }

function jalankanEstafet(triggerName, readCol, modeType, checkFormKosong) {
  if (MailApp.getRemainingDailyQuota() < 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); const MAX = 60; let sent = 0;
  const todayOnlyDate = new Date(Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd"));
  const formattedDate = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");

  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    const sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    const isKaigo = sheet.getName().includes("介護");
    const linkInterview = isKaigo ? "https://interview-lansia.scnainder.workers.dev/" : "https://interview.scnainder.workers.dev/";
    const lastRow = sheet.getLastRow(); if (lastRow < 3) continue;
    const data = sheet.getRange(3, 1, lastRow - 2, readCol).getValues();

    for (let i = 0; i < data.length; i++) {
      if (sent >= MAX) { ScriptApp.newTrigger(triggerName).timeBased().after(5 * 60 * 1000).create(); return; }
      const row = data[i]; const email = String(row[29] || "").trim();
      let is21Days = false;
      if (row[69]) {
        let dateBR = (row[69] instanceof Date) ? row[69] : new Date(row[69]);
        if (!isNaN(dateBR.valueOf())) {
          dateBR = new Date(Utilities.formatDate(dateBR, TZ, "yyyy-MM-dd"));
          if (Math.floor((todayOnlyDate.getTime() - dateBR.getTime()) / 86400000) < 21) is21Days = true;
        }
      }
      const isValidStatus = (String(row[2]).trim().toUpperCase() !== "HOLD" && String(row[2]).trim().toUpperCase() !== "CASE CLOSED");
      const isLulus = (String(row[5]).trim() === "LULUS 合格済み");
      const isJadwalKosong = (String(row[6]).trim() === "");
      const kondisiForm = checkFormKosong ? (String(row[39]).trim() === "") : (String(row[39]).trim() !== "");

      if (isValidStatus && isLulus && isJadwalKosong && kondisiForm && is21Days && email !== "") {
        if (modeType === 21) {
          const sBY = (row[76] instanceof Date) ? Utilities.formatDate(row[76], TZ, "yyyy-MM-dd") : String(row[76] || "").trim();
          const sCD = (row[81] instanceof Date) ? Utilities.formatDate(row[81], TZ, "yyyy-MM-dd") : String(row[81] || "").trim();
          const sCE = (row[82] instanceof Date) ? Utilities.formatDate(row[82], TZ, "yyyy-MM-dd") : String(row[82] || "").trim();
          let tgt = 0, step = 0;
          if (sBY !== formattedDate && sCD !== formattedDate && sCE !== formattedDate) {
            if (sBY === "") { tgt = 77; step = 1; } else if (sCD === "") { tgt = 82; step = 2; } else if (sCE === "") { tgt = 83; step = 3; }
          }
          if (tgt !== 0) {
            try {
              const baseHtml = "Halo <b>" + String(row[20]).trim() + "</b>,<br><br>Anda belum menyelesaikan pendaftaran. Silakan lanjutkan pendaftaran:<br>1. <a href='https://docs.google.com/forms/d/e/1FAIpQLSfgBBDTrrzoNbxMBmonazGDK5VrQaBdmcbikv18Ea1noSHcxw/viewform'>Isi Form Lanjutan</a><br>2. <a href='" + linkInterview + "'>Pesan Jadwal Interview</a><br><br>Jika ingin Cancel => <a href='https://forms.gle/gM4RcjuLSf73FSKL6'>Form Cancel</a>";
              GmailApp.sendEmail(email, step === 3 ? "❗PANGGILAN TERAKHIR: Lanjut Pendaftaran" : "Masih Mau Lanjut Pendaftaran?", "Buka HTML", { name: "OUR Blooming Academy", htmlBody: baseHtml + EMAIL_FOOTER });
              sheet.getRange(i + 3, tgt).setValue(formattedDate); sent++; Utilities.sleep(1000);
            } catch (e) { catatLogGagal(sheet.getName(), String(row[20]).trim(), email, "Reminder 9 Malam", e.message); }
          }
        } else {
          const sCC = (row[80] instanceof Date) ? Utilities.formatDate(row[80], TZ, "yyyy-MM-dd") : String(row[80] || "").trim();
          if (sCC === "") {
            try {
              const baseHtml = "Halo <b>" + String(row[20]).trim() + "</b>,<br><br>Anda belum memesan jadwal wawancara.<br>Pesan disini => <a href='" + linkInterview + "'>Pesan Jadwal Wawancara</a><br><br>Jika ingin Cancel => <a href='https://forms.gle/gM4RcjuLSf73FSKL6'>Form Cancel</a>";
              GmailApp.sendEmail(email, "Belum Pesan Jadwal Wawancara - OUR Blooming Academy", "Buka HTML", { name: "OUR Blooming Academy", htmlBody: baseHtml + EMAIL_FOOTER });
              sheet.getRange(i + 3, 81).setValue(formattedDate); sent++; Utilities.sleep(1000);
            } catch (e) { catatLogGagal(sheet.getName(), String(row[20]).trim(), email, "Reminder 6 Pagi", e.message); }
          }
        }
      }
    }
  }
}

// =================================================================================
// 🧠 6. SENSOR CQI DARI SHEET LAIN (AUTOTRIGGER) & KIRIM HASIL (BU/73)
// =================================================================================
// Fungsi ini dipanggil otomatis ketika ada perubahan (onChange) dari script luar!
function auto_ListenForSync() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AutoTrigger");
  if (!sheet) return;

  const val = sheet.getRange("A1").getValue();
  const lastVal = PropertiesService.getScriptProperties().getProperty("LAST_SYNC");

  if (val && val !== lastVal) {
    PropertiesService.getScriptProperties().setProperty("LAST_SYNC", String(val));

    // 1. Evaluasi Skor Kolom E jadi LULUS/GAGAL di Kolom F
    evaluasiStatusLulusCQI();

    // 2. Langsung Proses Antrean Email Pengumuman Hasil
    prosesAntreanHasilCQI("resume_HasilCQI");
  }
}

function resume_HasilCQI() {
  ScriptApp.getProjectTriggers().forEach(t => { if (t.getHandlerFunction() === "resume_HasilCQI") ScriptApp.deleteTrigger(t); });
  prosesAntreanHasilCQI("resume_HasilCQI");
}

function evaluasiStatusLulusCQI() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (let s of TARGET_SHEETS_ALT) {
    const sheet = ss.getSheetByName(s); if (!sheet) continue;
    const startRow = 3; const lastRow = sheet.getLastRow();
    if (lastRow < startRow) continue;

    const data = sheet.getRange(startRow, 5, lastRow - startRow + 1, 2).getValues();
    let hasChanges = false;

    for (let i = 0; i < data.length; i++) {
      let scoreStr = String(data[i][0]).trim();
      let currentStatus = String(data[i][1]).trim();

      if (scoreStr.includes("/") && currentStatus.includes("SEDANG")) {
        let parts = scoreStr.split("/");
        let p2 = parseFloat(parts[1]) || 0;
        let p3 = parseFloat(parts[2]) || 0;
        let p4 = parseFloat(parts[3]) || 0;

        let newStatus = (p2 <= 4.0 || p3 >= 2 || p4 >= 2) ? "TIDAK LULUS 不合格" : "LULUS 合格済み";
        if (currentStatus !== newStatus) { data[i][1] = newStatus; hasChanges = true; }
      }
    }
    // Update hanya ke Kolom F jika ada perubahan
    if (hasChanges) sheet.getRange(startRow, 6, data.length, 1).setValues(data.map(row => [row[1]]));
  }
}

function prosesAntreanHasilCQI(triggerName) {
  if (MailApp.getRemainingDailyQuota() < 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); const MAX = 40; let sent = 0;

  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    const sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    const isKaigo = sheet.getName().includes("介護");
    const linkInterview = isKaigo ? "https://interview-lansia.scnainder.workers.dev/" : "https://interview.scnainder.workers.dev/";
    const lastRow = sheet.getLastRow(); if (lastRow < 3) continue;
    const data = sheet.getRange(3, 1, lastRow - 2, 75).getValues();

    for (let i = 0; i < data.length; i++) {
      if (sent >= MAX) {
        if (triggerName) ScriptApp.newTrigger(triggerName).timeBased().after(2 * 60 * 1000).create();
        return;
      }
      const row = data[i];
      const statusCQI = String(row[5] || "");
      const email = String(row[29] || "").trim();
      const stempelNotif = row[72]; // BU (73)
      const nama = String(row[20] || "").trim();
      const scoreCQI = String(row[4] || "").trim();

      if ((stempelNotif !== "" && stempelNotif != null) || email === "" || String(row[6]).trim() !== "") continue;

      let subject = "", htmlMessage = "", kirim = false;
      if (statusCQI.includes("TIDAK LULUS") || statusCQI.includes("不合格")) {
         subject = "Pengumuman Hasil Psikotes - TIDAK LULUS";
         htmlMessage = "Yth. Sdr. <b>" + nama + "</b>,<br><br>Terima kasih atas partisipasi dalam mengikuti Psikotes Medan.<br>Berdasarkan hasil penilaian, saudara dinyatakan tidak memenuhi kriteria kelulusan pada tahap Psikotes.<br><br>Dengan mempertimbangkan hasil tersebut, kami mohon maaf bahwa tidak bisa melanjutkan saudara ke tahap proses berikutnya.<br>Keputusan ini tentu tidak mengurangi apresiasi kami atas waktu, usaha, serta antusiasme yang telah saudara tunjukkan.<br><br>Kami berharap saudara senantiasa diberikan kesehatan dan kesuksesan dalam langkah karier ke depan.";
         kirim = true;
      } else if (statusCQI.includes("LULUS") || statusCQI.includes("合格")) {
         subject = "Pengumuman Hasil Psikotes CQI - LULUS - OUR Blooming Academy Medan";
         htmlMessage = "Halo kak <b>" + nama + "</b>,<br><br>Selamat Anda telah dinyatakan lulus Psikotes CQI dengan score <b>\"" + scoreCQI + "\"</b>.<br><br>Untuk tahap selanjutnya : <b>Interview 1.</b><br><br><b>⚠️ PERHATIAN PENTING : DILARANG input Form dan Pesan jadwal interview jika SUDAH PERNAH mengisi dan memesan interview. Cukup 1 kali saja.</b><br><br>Sebelum interview persiapkan berikut ini :<br><br>1. Isi form lanjutan disini => <a href='https://docs.google.com/forms/d/e/1FAIpQLSfgBBDTrrzoNbxMBmonazGDK5VrQaBdmcbikv18Ea1noSHcxw/viewform'>Klik di sini</a><br>2. Pesan jadwal interview disini => <a href='" + linkInterview + "'>Klik di sini</a><br>3. Sebelum interview, HARUS memahami OUR Blooming Academy dengan melihat Instagram atau di sini : <a href='https://our.scnainder.workers.dev'>https://our.scnainder.workers.dev</a><br><br>Mohon diselesaikan 3 hal diatas sebelum mengikuti interview.<br><br>Terimakasih.";
         kirim = true;
      }

      if (kirim) {
        try {
          GmailApp.sendEmail(email, subject, "Buka email menggunakan HTML.", { name: "OUR Blooming Academy", htmlBody: htmlMessage + EMAIL_FOOTER });
          sheet.getRange(i + 3, 73).setValue(new Date()); sent++; Utilities.sleep(1000);
        } catch (e) { catatLogGagal(sheet.getName(), nama, email, "Pengumuman Hasil CQI", e.message); }
      }
    }
  }
}

// 7. SENSOR CETAK TANGGAL MULA UJIAN (DIKIRIM LINK) -> BV (74)
function catatTanggalCQI(e) {
  const sheet = e.range.getSheet(); if (!sheet.getName().includes("介護") && !sheet.getName().includes("LEOC")) return;
  const startCol = e.range.getColumn(); const numCols = e.range.getNumColumns();
  if (startCol <= 6 && (startCol + numCols - 1) >= 6) {
    const numRows = e.range.getNumRows(); const startRow = e.range.getRow();
    const formattedDate = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
    const editedValues = e.range.getValues();
    const dataBT = sheet.getRange(startRow, 72, numRows, 1).getValues();
    let adaPerubahan = false;
    for (let r = 0; r < numRows; r++) {
      if (String(editedValues[r][6 - startCol] || "").trim().toUpperCase().startsWith("SEDANG MENGERJAKAN")) {
        if (dataBT[r][0] === "") { dataBT[r][0] = formattedDate; adaPerubahan = true; }
      }
    }
    if (adaPerubahan) sheet.getRange(startRow, 72, numRows, 1).setValues(dataBT);
  }
}

function prosesAntreanEmailPsikotes() {
  if (MailApp.getRemainingDailyQuota() < 5) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet(); const MAX_KIRIM = 40; let jumlahTerkirim = 0;
  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    const sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    const lastRow = sheet.getLastRow(); if (lastRow < 3) continue;
    const data = sheet.getRange(3, 1, lastRow - 2, 75).getValues();

    for (let i = 0; i < data.length; i++) {
      if (jumlahTerkirim >= MAX_KIRIM) return;
      const row = data[i]; const email = String(row[29] || "").trim();

      if ((String(row[5] || "").toUpperCase().startsWith("SEDANG") || row[71] !== "") && email !== "" && (row[73] === "" || !row[73])) {
        try {
          const htmlMessage = "Halo <b>" + String(row[20] || "").trim() + "</b>,<br><br>Tahap selanjutnya adalah <b>PSIKOTEST</b>.<br><br>Email link ujian akan dikirimkan dari: <b>testguide@hr-cqi.com</b><br><br>Mohon segera dikerjakan. Silakan cek kotak masuk atau folder SPAM Anda." + EMAIL_FOOTER;
          GmailApp.sendEmail(email, "Informasi Tahap Psikotest - OUR Blooming Academy", "Buka HTML", { name: "Tim Rekrutmen OUR", htmlBody: htmlMessage });
          sheet.getRange(i + 3, 74).setValue(new Date()); jumlahTerkirim++; Utilities.sleep(1000);
        } catch (err) { catatLogGagal(sheet.getName(), String(row[20]).trim(), email, "Email Link Psikotes", err.message); }
      }
    }
  }
}

// =================================================================================
// 📅 8. SINKRONISASI JADWAL KALENDER (DIPERBAIKI DI V4.2)
// =================================================================================
const DAFTAR_KALENDER = [
  { id: "katrine.v.s@id.onodera-user-run.com", nama: "Katrine" }, { id: "reyza.a@id.onodera-user-run.com", nama: "Reyza" },
  { id: "sekar.r.p@id.onodera-user-run.com", nama: "Sekar" }, { id: "anya.d@id.onodera-user-run.com", nama: "Anya" },
  { id: "jana.y@id.onodera-user-run.com", nama: "Jana" }
];

function sinkronisasiJadwalBanyakKalender() {
  // Cegah dua proses jalan bersamaan (trigger tiap jam vs manual)
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try { jalankanSinkronKalender_(); } finally { lock.releaseLock(); }
}

function normSel_(v, jenis) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, jenis === "t" ? "HH:mm" : "dd/MM/yyyy");
  return String(v == null ? "" : v).trim();
}

function jalankanSinkronKalender_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const props = PropertiesService.getScriptProperties();
  const hariIni = new Date(); const masaDepan = new Date(); masaDepan.setDate(hariIni.getDate() + 30);
  const tglKey = Utilities.formatDate(hariIni, TZ, "yyyy-MM-dd");

  // [Poin 1,5,6] Baca event & tamu SEKALI saja; log kalender gagal (maks 1x/hari/kalender)
  const events = [];
  for (const k of DAFTAR_KALENDER) {
    let cal = null, err = "";
    try { cal = CalendarApp.getCalendarById(k.id); if (!cal) err = "Kalender tidak ditemukan / belum di-subscribe / akses dicabut"; }
    catch (e) { err = e.message; }
    if (!cal) {
      const pk = "CALWARN_" + k.id;
      if (props.getProperty(pk) !== tglKey) { props.setProperty(pk, tglKey); catatLogGagal("Kalender", k.nama, k.id, "Sinkronisasi Kalender", err); }
      continue;
    }
    let evs = [];
    try { evs = cal.getEvents(hariIni, masaDepan); } catch (e) { catatLogGagal("Kalender", k.nama, k.id, "Sinkronisasi Kalender", e.message); continue; }
    for (const ev of evs) {
      let emails = [];
      try {
        emails = ev.getGuestList()
          .filter(t => t.getGuestStatus() !== CalendarApp.GuestStatus.NO)   // [Poin 6] abaikan yang menolak
          .map(t => t.getEmail().toLowerCase().trim());
      } catch (e) { continue; }
      if (emails.length === 0) continue;
      const start = ev.getStartTime();
      events.push({
        start: start,
        tgl: Utilities.formatDate(start, TZ, "dd/MM/yyyy"),
        wkt: Utilities.formatDate(start, TZ, "HH:mm"),
        isInt2: /interview\s*2|wawancara\s*2|kedua|2nd/i.test(ev.getTitle()),
        intv: k.nama, emails: emails
      });
    }
  }
  // [Poin 3] Urut dari yang paling dekat; event pertama per peserta yang dipakai
  events.sort((a, b) => a.start - b.start);

  // Tentukan jadwal final per email (sekali, berlaku untuk semua sheet)
  const final1 = {}, final2 = {};
  for (const ev of events) {
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
      const em = String(emails[i][0]).toLowerCase().trim();
      if (!em || sudah[em]) continue; sudah[em] = true;   // baris duplikat diabaikan

      const e1 = final1[em], e2 = final2[em];
      // [Poin 2,4] Tulis hanya sel yang berubah, lewati sel berformula; nama interviewer ikut update
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

// [Poin 7] Paksa format Plain Text agar tanggal tidak berubah jadi objek Date
function tulisSel_(sheet, row, col, nilai) {
  const cell = sheet.getRange(row, col);
  cell.setNumberFormat("@");
  cell.setValue(nilai);
}

// =================================================================================
// 🔗 9. META CONVERSIONS API (CAPI)
// =================================================================================
const META_CONFIG = { PIXEL_ID: '4441109292802290', API_VERSION: 'v25.0', EVENT_NAME: 'Lead', ACTION_SOURCE: 'other', COUNTRY_CODE: 'id', DEFAULT_PHONE_PREFIX: '62', COL_SENT_FLAG: 86 };

function formatPhoneMeta(rawPhone) {
  let p = String(rawPhone || '').replace(/\D/g, '');
  if (p.startsWith('00')) p = p.slice(2);
  else if (p.startsWith('0')) p = META_CONFIG.DEFAULT_PHONE_PREFIX + p.slice(1);
  else if (p.startsWith('8')) p = META_CONFIG.DEFAULT_PHONE_PREFIX + p;
  return p;
}

function sendSheetRowToMeta_(sheet, rowNumber) {
  const rowData = sheet.getRange(rowNumber, 1, 1, Math.max(sheet.getLastColumn(), 86)).getDisplayValues()[0];
  const email = String(rowData[29] || '').trim().toLowerCase();
  const phone = formatPhoneMeta(rowData[28]);
  if (!email && !phone) return;

  const userData = {};
  if (email) userData.em = [sha256_(email)];
  if (phone) userData.ph = [sha256_(phone)];

  const event = { event_name: META_CONFIG.EVENT_NAME, event_time: Math.floor(Date.now() / 1000), action_source: META_CONFIG.ACTION_SOURCE, user_data: userData };
  try {
    const token = PropertiesService.getScriptProperties().getProperty('META_ACCESS_TOKEN');
    const res = UrlFetchApp.fetch('https://graph.facebook.com/' + META_CONFIG.API_VERSION + '/' + META_CONFIG.PIXEL_ID + '/events?access_token=' + token, { method: 'post', contentType: 'application/json', payload: JSON.stringify({ data: [event] }), muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) Logger.log('CAPI Kaigo Error: ' + res.getContentText());
  } catch(e) { Logger.log('CAPI Fetch Fail: ' + e.message); }
}

function processLeocRow_(sheet, rowNumber, options) {
  options = options || {};
  const displayRow = sheet.getRange(rowNumber, 1, 1, Math.max(sheet.getLastColumn(), 86)).getDisplayValues()[0];

  if (String(displayRow[34]).trim() !== 'Ya, bisa.' || String(displayRow[35]).trim() !== 'Ya, bisa.' || String(displayRow[36]).trim() !== 'Ya, bisa.') return;
  if (String(displayRow[85]).trim() && !options.forceResend) return;

  const email = String(displayRow[29]).trim().toLowerCase();
  const phone = formatPhoneMeta(displayRow[28]);
  if (!email && !phone) return;

  const userData = { country: [sha256_(META_CONFIG.COUNTRY_CODE)] };
  if (email) userData.em = [sha256_(email)];
  if (phone) userData.ph = [sha256_(phone)];

  const event = { event_name: META_CONFIG.EVENT_NAME, event_time: Math.floor(Date.now() / 1000), action_source: META_CONFIG.ACTION_SOURCE, user_data: userData, custom_data: { content_category: 'LEOC' } };

  try {
    const token = PropertiesService.getScriptProperties().getProperty('META_ACCESS_TOKEN');
    const res = UrlFetchApp.fetch('https://graph.facebook.com/' + META_CONFIG.API_VERSION + '/' + META_CONFIG.PIXEL_ID + '/events?access_token=' + token, { method: 'post', contentType: 'application/json', payload: JSON.stringify({ data: [event] }), muteHttpExceptions: true });

    if (res.getResponseCode() === 200) {
      sheet.getRange(rowNumber, 86).setValue('SENT ' + Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'));
    } else {
      Logger.log('CAPI LEOC Error: ' + res.getContentText());
    }
  } catch(e) { Logger.log('CAPI Fetch Fail: ' + e.message); }
}

function sha256_(value) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value || '').trim().toLowerCase(), Utilities.Charset.UTF_8).map(b => ((b < 0 ? b + 256 : b).toString(16)).padStart(2, '0')).join('');
}

// =================================================================================
// 🚨 10. SISTEM PENCATATAN ERROR & ALAT MANUAL (OUR TOOLS DIKEMBALIKAN)
// =================================================================================
function catatLogGagal(sheetName, nama, email, tipeEmail, errorMsg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName("LOG_EMAIL_GAGAL");
  if (!logSheet) {
    logSheet = ss.insertSheet("LOG_EMAIL_GAGAL");
    logSheet.appendRow(["Tanggal Waktu", "Sheet Asal", "Nama", "Email", "Jenis Email", "Pesan Error"]);
    logSheet.getRange("A1:F1").setFontWeight("bold").setBackground("#ffcccc");
    logSheet.setFrozenRows(1);
  }
  const waktu = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd HH:mm:ss");
  logSheet.appendRow([waktu, sheetName, nama, email, tipeEmail, errorMsg]);
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('⚙️ OUR Tools')
    .addItem('CQI Score Update', 'updateKolomDKosong')
    .addItem('CQI Email Hasil (Lulus/Gagal)', 'kirimEmailHasilCQI')
    .addItem('CQI Reminder Manual', 'sendCQIReminderEmails')
    .addItem('Sync Tanggal Mulai CQI', 'updateCQISendDate')
    .addToUi();
}

function convertTimezone(dateValue, sourceTZ, targetTZ) {
  if (!dateValue || !(dateValue instanceof Date)) return dateValue;
  return new Date(Utilities.formatDate(dateValue, sourceTZ, "yyyy-MM-dd HH:mm:ss"));
}

function kirimEmailHasilCQI() {
  prosesAntreanHasilCQI("resume_HasilCQI");
  SpreadsheetApp.getUi().alert("✅ Pengiriman batch hasil CQI sedang diproses di latar belakang.");
}

function sendCQIReminderEmails() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const today = new Date(); const todayString = Utilities.formatDate(today, TZ, "yyyy-MM-dd");
  let validDates = [];
  for (let d = 1; d <= 3; d++) {
    let pastDate = new Date(today); pastDate.setDate(today.getDate() - d);
    validDates.push(Utilities.formatDate(pastDate, TZ, "yyyy-MM-dd"));
  }

  let emailsSent = 0;
  for (let s = 0; s < TARGET_SHEETS_ALT.length; s++) {
    let sheet = ss.getSheetByName(TARGET_SHEETS_ALT[s]); if (!sheet) continue;
    let lastRow = sheet.getLastRow(); if (lastRow < 3) continue;

    let data = sheet.getRange(3, 1, lastRow - 2, 75).getValues();
    for (let i = 0; i < data.length; i++) {
      let email = data[i][29], bqValue = data[i][69], bsValue = data[i][71], bvValue = data[i][74];
      if (!email || email === "" || (bqValue !== "" && bqValue != null) || (bvValue !== "" && bvValue != null)) continue;

      let bsDateString = (bsValue instanceof Date) ? Utilities.formatDate(bsValue, TZ, "yyyy-MM-dd") :
                         (typeof bsValue === "string" && bsValue.length >= 10) ? bsValue.substring(0, 10) : "";

      if (validDates.includes(bsDateString)) {
        try {
          GmailApp.sendEmail(email, "OUR Blooming Academy Medan - Anda Belum Mengerjakan Psikotest", "Buka HTML", { name: "OUR Blooming Academy", htmlBody: `Halo <b>${data[i][20]}</b>,<br><br>Kemarin sudah kami kirimkan soal PSIKOTEST dari email testguide@hr-cqi.com<br>Mohon di cek inbox/SPAM.<br>Mohon SEGERA kerjakan Psikotestnya, karena jika tidak, Anda tidak bisa mengikuti seleksi kami.<br>` + EMAIL_FOOTER });
          sheet.getRange(i + 3, 75).setValue(todayString); emailsSent++; Utilities.sleep(1000);
        } catch (e) { catatLogGagal(sheet.getName(), data[i][20], email, "Reminder CQI (Manual)", e.message); }
      }
    }
  }
  SpreadsheetApp.getUi().alert("✅ " + emailsSent + " Email Reminder CQI berhasil dikirim.");
}

// Fungsi Tarik Manual jika Sync Macet
function updateKolomDKosong() {
  const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Batch6（介護）");
  const sourceSpreadsheet = SpreadsheetApp.openById("1EByHOzOVajPOEbh4X-0NzVnQvbX93rxfb-ibFEehElw");
  const sourceSheet = sourceSpreadsheet.getSheetByName("シート1");
  const sourceData = sourceSheet.getDataRange().getValues();
  const dataMap = {};
  const SOURCE_TZ = "Asia/Tokyo"; const TARGET_TZ = "Asia/Jakarta";

  for (let i = 1; i < sourceData.length; i++) {
    const email = String(sourceData[i][2] || "").toLowerCase().trim();
    if (email !== "") {
      dataMap[email] = {
        dValue: String(sourceData[i][30]||"0") + "/" + String(sourceData[i][42]||"0") + "/" + String(sourceData[i][47]||"0") + "/" + String(sourceData[i][48]||"0"),
        bqValue: convertTimezone(sourceData[i][17], SOURCE_TZ, TARGET_TZ),
        brValue: convertTimezone(sourceData[i][18], SOURCE_TZ, TARGET_TZ)
      };
    }
  }

  const startRow = 3; const numRows = targetSheet.getLastRow() - startRow + 1;
  if (numRows <= 0) return;

  const emailValues = targetSheet.getRange(startRow, 30, numRows, 1).getValues();
  const dRange = targetSheet.getRange(startRow, 5, numRows, 1); const dValues = dRange.getValues();
  const bqRange = targetSheet.getRange(startRow, 70, numRows, 1); const bqValues = bqRange.getValues();
  const brRange = targetSheet.getRange(startRow, 71, numRows, 1); const brValues = brRange.getValues();

  for (let j = 0; j < emailValues.length; j++) {
    const targetEmail = String(emailValues[j][0] || "").toLowerCase().trim();
    if (targetEmail !== "" && dataMap[targetEmail] !== undefined) {
      if (String(dValues[j][0]).trim() === "") dValues[j][0] = dataMap[targetEmail].dValue;
      if (String(bqValues[j][0]).trim() === "") bqValues[j][0] = dataMap[targetEmail].bqValue;
      if (String(brValues[j][0]).trim() === "") brValues[j][0] = dataMap[targetEmail].brValue;
    }
  }
  dRange.setValues(dValues); bqRange.setValues(bqValues); brRange.setValues(brValues);

  // Jangan lupa Hitung Status setelah data ditarik manual!
  evaluasiStatusLulusCQI();
  SpreadsheetApp.getUi().alert("✅ Update CQI Score selesai!");
}

function updateCQISendDate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Batch6（介護）");
  const sourceSs = SpreadsheetApp.openById("17LEkxhxIuof-v74jaaAZtUoGkbr9hj7m3rd8crgkgi0");
  const sourceSheet = sourceSs.getSheetByName("シート1");
  const sourceData = sourceSheet.getDataRange().getValues();
  const emailDateMap = {};

  for (let i = 1; i < sourceData.length; i++) {
    const email = String(sourceData[i][0] || "").toLowerCase().trim();
    if (email) emailDateMap[email] = sourceData[i][2];
  }

  const lastRow = sheet.getLastRow(); if (lastRow < 3) return;
  const targetEmails = sheet.getRange(3, 30, lastRow - 2, 1).getValues();
  const targetDates = sheet.getRange(3, 72, lastRow - 2, 1).getValues();
  let changed = false;

  for (let j = 0; j < targetEmails.length; j++) {
    const targetEmail = String(targetEmails[j][0] || "").toLowerCase().trim();
    if (targetEmail && emailDateMap.hasOwnProperty(targetEmail)) {
      if (String(targetDates[j][0]).trim() === "") {
        targetDates[j][0] = emailDateMap[targetEmail];
        changed = true;
      }
    }
  }
  if (changed) sheet.getRange(3, 72, targetDates.length, 1).setValues(targetDates);
  SpreadsheetApp.getUi().alert("✅ Update Tanggal Send CQI selesai!");
}
