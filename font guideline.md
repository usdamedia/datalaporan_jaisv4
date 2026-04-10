# 📝 Font Guideline

Dokumen ini berfungsi sebagai rujukan utama untuk penyeragaman tipografi dalam aplikasi. Sebarang perubahan pada antara muka pengguna (UI) mestilah merujuk kepada panduan ini untuk memastikan konsistensi.

---

## 1. Saiz Font (Font Size)

Aplikasi menyokong pelarasan saiz font secara dinamik untuk keselesaan pengguna.

### A. Tajuk (Title)
| Tahap Paparan | Saiz Font (pt) | Nota |
| :--- | :--- | :--- |
| **Normal (Default)** | **14 pt** | Menyamai paparan standard dalam Microsoft Word. |
| **Besar (A+)** | **16 pt** | Klik pertama pada butang A+. |
| **Sangat Besar (A++)** | **20 pt** | Klik kedua pada butang A+. |

### B. Subtajuk & Isi (Subtitle & Content)
| Tahap Paparan | Saiz Font (pt) | Nota |
| :--- | :--- | :--- |
| **Normal (Default)** | **10 pt** | Saiz standard untuk teks biasa dan subtajuk. |
| **Kecil (a-)** | **8 pt** | Saiz minimum apabila butang a- diklik. |

---

## 2. Jarak & Inden (Spacing & Indent)

*   **Font Indent:** Mestilah **Normal**.
    *   Tidak terlalu rapat (condensed) dan tidak terlalu jarak (expanded).
    *   Pastikan `letter-spacing` adalah `normal` atau `0`.
    *   `line-height` haruslah selesa (cadangan: 1.5 hingga 1.6 untuk isi).

---

## 3. Kapitalisasi (Capitalization)

*   **Format:** Gunakan **Capitalize Each Word** (Huruf Besar Bagi Setiap Perkataan).
    *   Setiap huruf pertama bagi setiap perkataan menggunakan huruf besar.
    *   Kekalkan konsistensi ini bagi semua tajuk, subtajuk, dan kandungan teks.

---

## 4. Arahan Pelaksanaan

1.  **Rujukan Mandatori:** Sebelum mula mengekod atau mengubah UI, buka fail ini.
2.  **Keseragaman:** Jangan gunakan saiz font ad-hoc (seperti 11pt atau 13pt) kecuali dinyatakan dalam pengecualian khas.
3.  **Responsif:** Pastikan perubahan saiz (A+ / a-) memberi kesan kepada seluruh komponen yang berkaitan secara serentak.

---

## 5. Peraturan Spacing, Margin & Padding (Mandatori)

1.  **8px Grid Rule:** Semua spacing UI wajib dalam gandaan 8px (`8, 16, 24, 32, 40, 48, 64...`).
    *   Elakkan nilai ad-hoc seperti `10px`, `12px`, `20px`, `28px` kecuali ada justifikasi khas yang diluluskan.
2.  **Side Buffer:** Pastikan ruang kiri-kanan selesa untuk bacaan:
    *   Mudah alih: sekurang-kurangnya `16px`.
    *   Tablet/desktop: meningkat mengikut breakpoint (`32px`, `48px`, `64px`).
3.  **Max Content Width:** Kandungan teks utama perlu dalam bekas berpusat dengan `max-width` sekitar `800px–1000px` (cadangan semasa: `1000px`) untuk kurangkan eye strain.
4.  **External > Internal:** Margin luar perlu sama atau lebih besar berbanding padding dalam untuk hierarchy visual yang jelas.

---

## 6. Peraturan Alignment (Mandatori)

1.  **Left Align by Default:** Teks kandungan, label, jadual, dan blok maklumat perlu `left-aligned`.
2.  **Center Align Terhad:** Hanya untuk heading pendek, badge, atau nilai statistik yang memang perlu penegasan visual.
3.  **Elak Justify/Right Align:** Jangan guna justified text untuk kandungan biasa kerana menjejaskan ritma bacaan.

---
*Terakhir dikemaskini: 9 April 2026*
