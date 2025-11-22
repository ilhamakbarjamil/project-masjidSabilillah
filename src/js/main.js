// Script untuk Toggle Mobile Menu
document.getElementById('mobile-menu-button').onclick = function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
};

// Script untuk Efek Blur Navbar saat Scroll
const navbar = document.getElementById('navbar');
const scrollThreshold = 50; // Jarak scroll (px) sebelum efek blur diterapkan

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        // Tambahkan kelas untuk efek blur, transparansi, dan bayangan
        navbar.classList.add('bg-opacity-80', 'backdrop-blur-md', 'shadow-xl');
        // Hapus kelas opacity penuh jika ada, memastikan efek transparansi
        navbar.classList.remove('bg-opacity-100'); 
    } else {
        // Hapus kelas efek blur, transparansi, dan bayangan
        navbar.classList.remove('bg-opacity-80', 'backdrop-blur-md', 'shadow-xl');
        // Kembalikan ke opacity penuh saat di bagian atas halaman
        navbar.classList.add('bg-opacity-100'); 
    }
});

// Script untuk menutup mobile menu saat link di dalamnya diklik (opsional, untuk UX)
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});


// --- Script untuk Jadwal Sholat API ---
async function getPrayerTimes() {
    const city = "Jombang"; // Ganti dengan kota lokasi masjid Anda
    const country = "Indonesia";
    const method = 5; // Metode perhitungan (8 = Kemenag, Indonesia). Anda mencoba 5.
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // Format DD-MM-YYYY

    // URL API menggunakan timingsByCity
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

    // Atau jika Anda ingin mencoba dengan koordinat (lebih akurat):
    // const latitude = -7.5348; // Lintang Jombang (contoh)
    // const longitude = 112.2359; // Bujur Jombang (contoh)
    // const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}&date=${formattedDate}`;


    const jadwalContainer = document.getElementById('jadwal-sholat-container');
    const loadingMessage = document.getElementById('loading-jadwal');
    const errorMessage = document.getElementById('error-jadwal');
    const jadwalTanggal = document.getElementById('jadwal-tanggal');

    // Tampilkan loading, sembunyikan error
    loadingMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    jadwalContainer.innerHTML = ''; // Bersihkan konten sebelumnya

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.data && data.data.timings) {
            const timings = data.data.timings;
            // Gunakan date.hijri.weekday.en, date.hijri.day, date.hijri.month.en, date.hijri.year
            // untuk tanggal Hijriah, atau date.gregorian.date untuk Gregoria
            const readableDate = data.data.date.readable; // Tanggal Gregoria yang mudah dibaca
            
            jadwalTanggal.textContent = readableDate; // Update tanggal
            loadingMessage.classList.add('hidden'); // Sembunyikan loading

            const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            const displayedPrayers = { // Mapping nama API ke nama tampilan
                "Fajr": "Subuh",
                "Dhuhr": "Dzuhur",
                "Asr": "Ashar",
                "Maghrib": "Maghrib",
                "Isha": "Isya"
            };

            // Buat kartu untuk setiap waktu sholat
            prayerNames.forEach(prayer => {
                if (timings[prayer]) {
                    const card = `
                        <div class="bg-masjid-mid-blue p-6 rounded-lg shadow-xl ${prayer === "Fajr" ? 'border-t-4 border-masjid-light-blue' : ''} hover:shadow-2xl transition-shadow duration-300">
                            <h3 class="text-2xl font-semibold font-heading text-masjid-text-light">${displayedPrayers[prayer] || prayer}</h3>
                            <p class="text-4xl font-bold text-masjid-light-blue mt-2">${timings[prayer]}</p>
                        </div>
                    `;
                    jadwalContainer.innerHTML += card;
                }
            });
        } else {
            throw new Error("Data jadwal sholat tidak ditemukan.");
        }
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        jadwalTanggal.textContent = "Tanggal tidak tersedia"; // Reset tanggal jika error
        jadwalContainer.innerHTML = ''; // Kosongkan container jika error
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', getPrayerTimes);
// Anda bisa menambahkan refresh otomatis setiap beberapa jam jika perlu
// setInterval(getPrayerTimes, 3 * 60 * 60 * 1000); // Refresh setiap 3 jam