const hotspotConfig = {    
    // ===========================
    // UI DEFAULTS
    // ===========================

    // Default Language ('en' or 'id')
    // If user has not selected a language, this one will be used.
    defaultLang: 'en',

    // Default Theme ('light', 'dark', or 'auto')
    // 'auto' will check localStorage first, then system preference
    defaultTheme: 'auto',
    
    // ===========================
    // FEATURE CONFIGURATION
    // ===========================
    
    // Enable or disable QR Code Login feature
    // true  = Show the 'Scan QR Code' button (Sets Login Protocol to HTTPS if internal)
    // false = Hide the 'Scan QR Code' button
    enableQRCode: true,

    // QR Code Scanner Mode
    // 'auto'     = Safe default. Uses 'internal' if HTTPS, 'external' if HTTP.
    // 'internal' = Forces internal scanner (Requires HTTPS).
    // 'external' = Forces redirection to external scanner (Works on HTTP via Walled Garden).
    qrMode: 'auto',

    // External Scanner URL
    // The URL where the external scanner is hosted (e.g., GitHub Pages).
    // MUST be added to Walled Garden in MikroTik!
    qrExternalUrl: 'https://my-qr-as1.pages.dev/scanner/',

    // Slideshow Content (Mixed: Text, Image, Video)
    slides: [
        {
            type: 'text',
            title: { en: 'Unlimited 10M', id: 'Unlimited 10M' },
            subtitle: { en: 'Best Deal', id: 'Paling Laris' },
            desc: { en: 'Rp 100k / Month', id: 'Rp 100rb / Bulan' },
            gradient: 'from-blue-600 to-indigo-700', 
            detail: {
                title: { en: 'Unlimited 10Mbps Package', id: 'Paket Unlimited 10Mbps' },
                description: { en: 'Enjoy unlimited internet with speeds up to 10Mbps. Perfect for streaming and zoom meetings.', id: 'Nikmati internet tanpa batas kuota dengan kecepatan up to 10Mbps. Cocok untuk streaming dan zoom meeting.' },
                price: { en: 'Rp 100.000', id: 'Rp 100.000' },
                validity: { en: '30 Days', id: '30 Hari' }
            }
        },
        {
            type: 'image',
            src: 'img/og-image.png',
            alt: 'Fast Wifi',
            detail: {
                title: { en: 'Super Fast Connection', id: 'Koneksi Super Cepat' },
                description: { en: 'Experience browsing and gaming with low latency using our fiber optic network.', id: 'Rasakan pengalaman browsing dan gaming dengan latensi rendah menggunakan jaringan fiber optik kami.' },
                price: { en: 'Start from Rp 5.000', id: null }, // Example: Missing ID falls back to EN
                validity: { en: 'Promo', id: 'Promo' }
            }
        },
        {
            type: 'video', 
            src: 'img/video_preview_h264.mp4',
            // src: 'https://video-previews.elements.envatousercontent.com/files/4b1814e8-7529-4df0-bf6b-5ba42dec8be0/video_preview_h264.mp4',
            detail: {
                title: { en: 'Smooth Streaming', id: 'Streaming Lancar' },
                description: { en: 'Watch YouTube and Netflix without buffering with dedicated streaming bandwidth.', id: 'Nonton YouTube dan Netflix tanpa buffering dengan prioritas bandwidth khusus untuk streaming.' },
                price: { en: 'Premium', id: 'Premium' },
                validity: { en: 'Life Time', id: 'Selamanya' }
            }
        },
        {
            type: 'image',
            src: 'img/Animation-Glow-GIF-by-Butlerm.gif',
            // src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNms4OTRxem5uMHh0aG42d3phN3V5dXN6c3FmamN0dnl2NGhsa212NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41YvpiA9uMWw5AMU/giphy.gif',
            alt: 'Glow Animation',
            detail: {
                title: { en: 'Special Offer', id: 'Penawaran Spesial' },
                description: { en: 'Get bonus night quota for every weekly package purchase. Limited Time!', id: 'Dapatkan bonus kuota malam setiap pembelian paket mingguan. Promo terbatas!' },
                price: { en: 'Bonus 5GB', id: 'Bonus 5GB' },
                validity: { en: 'Weekly', id: 'Mingguan' }
            }
        }
    ],

    // Pricing Plans (Vouchers)
    // Configure your voucher list here.
    // Icon: SVG string or image URL
    // Multi-language Support: Use { en: 'English', id: 'Indonesian' } for text fields.
    // If one is missing, it will fallback to the other.
    vouchers: [
        { 
            id: 1, 
            title: { en: '3 Hours', id: '3 Jam' }, 
            active: { en: 'Active 3 Hours', id: 'Aktif 3 Jam' }, 
            price: { en: 'Rp 3.000', id: 'Rp 3.000' }, 
            color: 'yellow',
            bestSeller: true, 
            link: '#', 
            // Heroicons: clock (solid)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" /></svg>`
        },
        { 
            id: 2, 
            title: { en: '7 Hours', id: '7 Jam' }, 
            active: { en: 'Active 7 Hours', id: 'Aktif 7 Jam' }, 
            price: { en: 'Rp 5.000', id: 'Rp 5.000' }, 
            color: 'yellow',
            bestSeller: false, 
            link: '#', 
            // Heroicons: clock (solid)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" /></svg>`
        },
        { 
            id: 3, 
            title: { en: 'Daily', id: 'Harian' }, 
            active: { en: 'Active 24 Hours', id: 'Aktif 24 Jam' }, 
            price: { en: 'Rp 7.000', id: 'Rp 7.000' },
            color: 'blue',
            bestSeller: true, 
            link: '#', 
            // Heroicons: sun (solid)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>`
        },
        { 
            id: 4, 
            title: { en: '7 Days', id: '7 Hari' }, 
            active: { en: 'Active 7 Days', id: 'Aktif 7 Hari' }, 
            price: { en: 'Rp 20.000', id: 'Rp 20.000' }, 
            color: 'green',
            bestSeller: false, 
            link: '#', 
            // Heroicons: calendar-days (solid)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /><path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" /></svg>`
        },
        { 
            id: 5, 
            title: { en: 'Monthly', id: 'Bulanan' }, 
            active: { en: 'Active 30 Days', id: 'Aktif 30 Hari' }, 
            price: { en: 'Rp 40.000', id: 'Rp 40.000' }, 
            color: 'purple',
            bestSeller: true, 
            link: '#', 
            // Heroicons: calender-date-range (solid)
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" /><path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" /></svg>`
        },
    ],
    

    // ===========================
    // FAQ / HELP CONFIGURATION
    // ===========================
    faq: [
        {
            question: { en: 'How to access internet?', id: 'Cara akses internet?' },
            answer: { 
                en: `<ol class="list-decimal ml-4 space-y-1 mt-2">
                        <li>Touch TRIAL button (if available) for limited free access.</li>
                        <li>Login by entering the Voucher Code directly.</li>
                    </ol>`,
                id: `<ol class="list-decimal ml-4 space-y-1 mt-2">
                        <li>Sentuh tombol TRIAL (jika ada) untuk akses gratis terbatas.</li>
                        <li>Login dengan memasukkan Kode Voucher secara langsung.</li>
                    </ol>`
            }
        },
        {
            question: { en: 'How to login?', id: 'Cara login?' },
            answer: { 
                en: `<ol class="list-decimal ml-4 space-y-1 mt-2">
                        <li>Select the Voucher tab.</li>
                        <li>Enter voucher code into the input field.</li>
                        <li>Click the CONNECT button.</li>
                    </ol>`,
                id: `<ol class="list-decimal ml-4 space-y-1 mt-2">
                        <li>Pilih tab Voucher.</li>
                        <li>Masukkan kode voucher ke kolom input.</li>
                        <li>Klik tombol CONNECT.</li>
                    </ol>`
            }
        },
        {
            question: { en: 'Login denied?', id: 'Gagal login?' },
            answer: { 
                en: `<ul class="list-disc ml-4 space-y-1 mt-2">
                        <li>Ensure voucher code is typed correctly.</li>
                        <li>Check for uppercase/lowercase letters.</li>
                        <li>Ensure no spaces at the start/end.</li>
                        <li>If failed, contact admin.</li>
                    </ul>`,
                id: `<ul class="list-disc ml-4 space-y-1 mt-2">
                        <li>Pastikan kode voucher diketik dengan benar.</li>
                        <li>Perhatikan huruf besar/kecil.</li>
                        <li>Pastikan tidak ada spasi di awal/akhir.</li>
                        <li>Jika masih gagal, hubungi admin.</li>
                    </ul>`
            }
        },
        {
            question: { en: 'Check Valid Period/Quota?', id: 'Cek Masa Aktif/Kuota?' },
            answer: { 
                en: `<p class="mt-2">Open browser and type address:</p>
                     <p class="font-mono bg-gray-100 dark:bg-black/30 p-2 rounded mt-1 text-center font-bold">
                        <span>$(hostname)/status</span>
                     </p>`,
                id: `<p class="mt-2">Buka browser dan ketik alamat:</p>
                     <p class="font-mono bg-gray-100 dark:bg-black/30 p-2 rounded mt-1 text-center font-bold">
                        <span>$(hostname)/status</span>
                     </p>`
            }
        },
        {
            question: { en: 'Valid Period vs Duration?', id: 'Masa Aktif vs Durasi?' },
            answer: { 
                en: `<p class="mt-2"><b>Duration:</b> Time usable for internet.</p>
                     <p class="mt-2"><b>Valid Period:</b> Time limit voucher can be used since first login. If active period expires, voucher is invalid even if duration remains.</p>`,
                id: `<p class="mt-2"><b>Durasi:</b> Waktu yang bisa dipakai untuk internetan.</p>
                     <p class="mt-2"><b>Masa Aktif:</b> Batas waktu voucher bisa dipakai sejak login pertama. Jika masa aktif habis, voucher hangus meski durasi masih ada.</p>`
            }
        }
    ], 

    // ===========================
    // PROFILE / ABOUT US
    // ===========================
    // Configure the Profile Modal content here.
    // Multi-language Support: Use { en: 'English', id: 'Indonesian' } for text fields.
    profile: {
        // Logo (Dual purpose: Navbar & Favicon)
        logo: 'img/smart-home.svg',

        // Business/Hotspot Name
        name: 'Smart Hotspot', // Full Company Name (Profile)
        brandName: 'Hotspot',  // Short Brand Name (Navbar)
        
        // Tagline
        tagline: { en: 'Broadband Service Provider', id: 'Penyedia Layanan Internet' }, // Long Tagline (Profile)
        shortTagline: { en: 'Broadband Service', id: 'Internet Cepat' }, // Short Tagline (Navbar)
        
        // Description paragraph
        description: { 
            en: 'Thank you for using our internet service. Enjoy fast and stable connection.', 
            id: 'Terima kasih telah menggunakan layanan internet kami. Nikmati koneksi cepat dan stabil.' 
        },
        
        // Contact Information
        phone: '0812-3456-7890',
        location: { en: 'Jakarta, Indonesia', id: 'Jakarta, Indonesia' },
        
        // Social Media Links
        // Set to empty string '' or null to hide specific icons
        socialMedia: {
            whatsapp: 'https://wa.me/628123456789',
            facebook: 'https://facebook.com/yourpage',
            instagram: 'https://instagram.com/yourprofile'
        }
    },

    // ===========================
    // STATUS PAGE CONFIGURATION
    // ===========================
    // Configure which fields to show on the status page.
    // Set to true to show, false to hide.
    statusFields: {
        // Basic Info
        showIP: true,
        showMAC: true,
        
        // Traffic Stats
        showUpload: true,
        showDownload: true,
        showTotal: true,         // Upload + Download combined
        
        // Session Info
        showQuotaLeft: true,     // Remaining quota (if any)
        showUptime: true,        // Connected time
        showTimeLeft: true,      // Session time left (Limit Uptime / Duration)
        showRefresh: true,       // Status refresh interval
        
        // Validity / Expired (RADIUS-based)
        // NOTE: This requires RADIUS server configuration to work.
        // Set to false to hide until RADIUS is configured.
        showExpired: false,
        
        // Expired Source Configuration:
        // 'radius'   - Use RADIUS attribute $(radiusXX) from MikroTik
        // 'api'      - Use external API (like Mikhmon)
        // 'disabled' - Hide completely
        expiredSource: 'disabled',
        
        // RADIUS Attribute ID for Expired (if expiredSource is 'radius')
        // Common: Session-Timeout (27), or custom vendor-specific
        // Example: $(radius27) for Session-Timeout
        radiusAttribute: '27',
        
        // External API URL for Expired (if expiredSource is 'api')
        // The URL should accept ?name=USERNAME and return the expiry date/time
        // Example: https://your-mikhmon.com/status/status.php?name=
        expiredApiUrl: '',
        
        // Session Name for API (if using Mikhmon-style API)
        expiredApiSession: 'hotspot'
    },
};
