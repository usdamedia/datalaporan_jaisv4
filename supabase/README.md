## Supabase Setup Tanpa Login Auth

App ini kini menyokong sync draft ke Supabase tanpa login. Ini bermaksud semua pengguna yang membuka app boleh membaca dan mengubah data yang sama.

### 1. Cipta project baru

Dalam Supabase Dashboard:

1. Buat project baru.
2. Pergi ke `Settings > API`.
3. Salin:
   - `Project URL`
   - `Publishable key`

Untuk projek ini, key frontend yang perlu digunakan ialah `publishable key`, bukan `service_role`.

### 2. Cipta table dan aktifkan realtime

Buka `SQL Editor` dan jalankan fail [setup.sql](./setup.sql).

Table yang digunakan oleh app:

- `public.form_drafts`

Setiap borang disimpan sebagai satu row berdasarkan `dept_key`. Apabila pengguna lain mengubah borang yang sama, app akan menerima perubahan melalui Supabase Realtime.

### 3. Isi env tempatan

Salin `.env.example` menjadi `.env` dan isi nilai ini:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Contoh `publishable key` anda yang diberi:

```env
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_iJM9gsYPixNvNjBbrCCOZg_67wZ1XNL
```

Anda masih perlu isi `VITE_SUPABASE_URL` daripada project Supabase anda.

### 4. Jalankan app

```bash
npm install
npm run dev
```

### 5. Cara semak ia berfungsi

1. Buka app di dua browser atau dua device.
2. Pergi ke page borang yang sama.
3. Ubah data pada device A.
4. Tunggu auto-save sekejap.
5. Device B akan menerima update yang sama jika kedua-duanya berada pada borang yang sama.

### Nota penting

- Tiada login bermaksud tiada identiti user sebenar.
- Sesiapa yang ada akses ke app boleh ubah data.
- `localStorage` masih dikekalkan sebagai cache/fallback jika Supabase belum siap atau sambungan gagal.
- Jika dua user edit field yang sama pada masa yang sama, perubahan terakhir yang disimpan akan menang.
