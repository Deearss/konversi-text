Konversi Text – Next.js App (TypeScript, App Router, Tailwind)

Fitur:

- UI responsive tema light hitam-putih ala Vercel
- Font Quicksand dari Google Fonts
- Mode konversi: CAPITALIZE ("alamak" → "ALAMAK")
- Loading state dengan react-spinners agar mencegah spam submit
- API route Next.js di `/api/convert`
- .env.local untuk ganti API antara internal (Next.js) vs eksternal

Menjalankan (PowerShell):

```
npm install
npm run dev
```

Buka http://localhost:3000

Env toggle:

- Gunakan API internal: biarkan `NEXT_PUBLIC_API_BASE=` kosong (default).
- Gunakan API eksternal: isi dengan base URL, contoh `NEXT_PUBLIC_API_BASE=https://api.example.com` maka frontend akan memanggil `https://api.example.com/convert`.

Build & start:

```
npm run build
npm start
```
