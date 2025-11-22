/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}", // Memindai semua file HTML dan JS di proyek Anda
  ],
  theme: {
    extend: {
      colors: {
        // Palet warna biru gelap dan aksen
        'masjid-dark-blue': '#0A192F',      // Biru gelap utama (bg header/footer)
        'masjid-mid-blue': '#1F2937',       // Biru gelap menengah (bg section)
        'masjid-light-blue': '#3B82F6',     // Biru terang untuk aksen dan hover
        'masjid-text-light': '#F9FAFB',     // Warna teks terang untuk bg gelap
        'masjid-text-secondary': '#D1D5DB', // Warna teks sekunder/abu-abu terang
        'masjid-card-bg': '#FFFFFF',        // Latar belakang kartu/konten utama
      },
      fontFamily: {
        // Font yang digunakan: Inter (sans-serif) untuk teks biasa, Poppins (sans-serif) untuk judul
        sans: ['Inter', 'sans-serif'], 
        heading: ['Poppins', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}