document.addEventListener('DOMContentLoaded', () => {
	// =====================
	// THEME TOGGLE (Dark Mode)
	// =====================
	const themeToggleButton = document.getElementById('theme-toggle');
	const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
	const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

	const applyTheme = () => {
		let isDark = false;
		
		// 1. Check LocalStorage
		if ('color-theme' in localStorage) {
			isDark = localStorage.getItem('color-theme') === 'dark';
		} else {
			// 2. Check Config
			if (typeof hotspotConfig !== 'undefined') {
				if (hotspotConfig.defaultTheme === 'dark') {
					isDark = true;
				} else if (hotspotConfig.defaultTheme === 'light') {
					isDark = false;
				} else {
					// auto or undefined -> check system
					isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				}
			} else {
				// Fallback to system
				isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
		}

		if (isDark) {
			document.documentElement.classList.add('dark');
			if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
			if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
		} else {
			document.documentElement.classList.remove('dark');
			if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
			if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
		}
	};

	if (themeToggleButton) {
		themeToggleButton.addEventListener('click', () => {
			const isDark = document.documentElement.classList.toggle('dark');
			localStorage.setItem('color-theme', isDark ? 'dark' : 'light');

			if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
			if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
		});
	}

	applyTheme();

	// =====================
	// LANGUAGE TOGGLE (i18n)
	// =====================
	window.translations = {
		en: {
			// Page titles
			'page_login': 'Internet Hotspot - Log in',
			'page_status': 'Internet Hotspot - Status',
			'page_logout': 'Internet Hotspot - Log out',
			'page_error': 'Internet Hotspot - Error',
			'page_redirect': 'Internet Hotspot - Redirect',
			'page_advert': 'Internet Hotspot - Advertisement',

			// Login page
			'login_prompt': 'Please log in to use the internet hotspot service.',
			'login_trial': 'Free trial available,',
			'login_trial_btn': 'Free Trial',
			'login_trial_link': 'click here',
			'login_trial_desc': 'Try our high speed internet for free.',
			'tab_single': 'User = Password',
			'tab_dual': 'User & Password',
			'user_eq_pass_placeholder': 'User = Password',
			'username_placeholder': 'Username',
			'password_placeholder': 'Password',
			'login_btn': 'Connect',
			'powered_by': 'Powered by MikroTik RouterOS',
			'or_divider': 'or',
			'scan_qr_btn': 'Scan QR Code',
			'scan_qr_title': 'Scan QR Code',
			'scanning': 'Point camera at QR code...',
			'scan_success': 'QR Code detected!',
			'scan_error': 'Invalid QR Code format',
			'camera_error': 'Camera access failed (HTTPS required)',
			'camera_permission': 'Please allow camera access',
			'btn_start_camera': 'Start Camera',
			'btn_stop_camera': 'Stop Camera',
			'btn_upload_qr': 'Scan Image File',
			'cancel_scanner': 'Cancel / Close Scanner',
			'scan_status_inactive': 'Camera is inactive',
			'scan_status_stopped': 'Camera stopped',
			'scan_status_starting': 'Detecting camera...',
			'redirecting_external': 'Redirecting to External Scanner...',
			'checking_connection': 'Checking Walled Garden access...',
			'wg_error': 'External connection failed. Is Walled Garden configured?',
			'scan_status_ready_external': 'External Scanner Available',
			'btn_continue_external': 'Open Scanner',
			'scan_status_use_external': 'Please use the external scanner.',
			'wg_error_title': 'External connection failed.',
			'wg_error_desc': 'Is Walled Garden configured?',
			'wg_error_help': 'Please contact Admin for assistance.',
			'btn_open_scanner': 'Open Scanner',
			'status_connection_success': 'Connection Successful',
			'scan_status_connection_failed': 'Connection Failed',
			'scan_file_scanning': 'Scanning file...',
			'scan_no_qr': 'No QR code found',
			'scan_camera_active': 'Camera Active',
			'pkg_options': 'Package Options',
			'view_all': 'View All',
			'best_seller': 'Best Seller',
			'buy_pkg': 'Buy',
			'title_voucher': 'Login Voucher',
			'title_member': 'Login Member',

			// Modals
			'ad_offer_detail': 'Offer Detail',
			'ad_price': 'Price',
			'ad_validity': 'Validity',
			'ad_interested': 'I am Interested',
			'profile_title': 'Profile',
			'profile_desc': 'Thank you for using our internet service. Enjoy fast and stable connection.',
			'social_media': 'Social Media',
			'contact_info': 'Contact Info',

			// Status page
			'trial_status': 'Trial User Status',
			'connection_status': 'Connection Status',
			'ip_address': 'IP Address',
			'mac_address': 'MAC Address',
			'upload': 'Upload',
			'download': 'Download',
			'total_traffic': 'Total',
			'bytes_up_down': 'Bytes up / down',
			'connected_left': 'Connected / left',
			'connected': 'Connected',
			'time_left': 'Time left',
			'quota_left': 'Quota left',
			'status_refresh': 'Status refresh',
			'expired': 'Expired',
			'ad_required': 'Ad required',
			'logout_btn': 'Log out',
			'continue_btn': 'Continue',

			// Logout page
			'logout_title': 'You have just logged out!',
			'username_label': 'Username',
			'session_time': 'Session Time',
			'relogin_btn': 'Log in again',
			'login_new_btn': 'Log in',
			'logout_login_btn': 'Log in',
			'logout_clear_btn': 'Log out & Clear',

			// Error page
			'error_title': 'Hotspot Error',
			'try_again': 'Try Again',

			// Alogin page (success)
			'login_success': 'Login Successful',
			'redirect_msg': 'You will be redirected shortly. If nothing happens, click',
			'here': 'here',

			// Radvert page
			'advertisement': 'Advertisement',
			'open_ad_manual': 'If nothing happens, open',
			'manually': 'manually',

			// Error messages from errors.txt
			'err_internal': 'internal error',
			'err_config': 'configuration error',
			'err_not_logged_in': 'you are not logged in',
			'err_ippool_empty': 'cannot assign ip address - no more free addresses from pool',
			'err_shutting_down': 'hotspot service is shutting down',
			'err_session_limit': 'no more sessions are allowed for user',
			'err_license_limit': 'session limit reached',
			'err_wrong_mac': 'invalid username: this MAC address is not yours',
			'err_chap_missing': 'web browser did not send challenge response (try again, enable JavaScript)',
			'err_invalid_username': 'invalid username or password',
			'err_invalid_mac': 'is not allowed to log in from this MAC address',
			'err_uptime_limit': 'has reached uptime limit',
			'err_traffic_limit': 'has reached traffic limit',
			'err_radius_timeout': 'RADIUS server is not responding',
			'err_auth_progress': 'already authorizing, retry later',

			// Help Modal
			'help_title': 'Help',
			'faq_internet': 'How to access internet?',
			'faq_internet_step1': 'Touch FREE TRIAL button (if available) for limited free access.',
			'faq_internet_step2': 'Connect by entering the Voucher Code.',
			'faq_login': 'How to Connect?',
			'faq_login_step1': 'Select the Voucher tab.',
			'faq_login_step2': 'Enter voucher code into the input field.',
			'faq_login_step3': 'Click the CONNECT button.',
			'faq_login_failed': 'Connection denied?',
			'faq_login_failed_step1': 'Ensure voucher code is typed correctly.',
			'faq_login_failed_step2': 'Check for uppercase/lowercase letters.',
			'faq_login_failed_step3': 'Ensure no spaces at the start/end.',
			'faq_login_failed_step4': 'If failed, contact admin.',
			'faq_check_quota': 'Check Valid Period/Quota?',
			'faq_check_quota_desc': 'Open browser and type address:',
			'faq_active_vs_duration': 'Valid Period vs Duration?',
			'faq_duration_desc': 'Duration: Time usable for internet.',
			'faq_active_desc': 'Valid Period: Time limit voucher can be used since first login. If active period expires, voucher is invalid even if duration remains.',
			'contact_support': 'Contact us if you have issues:',

			// Navbar
			'nav_home': 'Home',
			'nav_refresh': 'Refresh',
			'nav_voucher': 'Voucher',
			'social_media_label': 'Social Media'
		},
		id: {
			// Page titles
			'page_login': 'Internet Hotspot - Masuk',
			'page_status': 'Internet Hotspot - Status',
			'page_logout': 'Internet Hotspot - Keluar',
			'page_error': 'Internet Hotspot - Kesalahan',
			'page_redirect': 'Internet Hotspot - Pengalihan',
			'page_advert': 'Internet Hotspot - Iklan',

			// Login page
			'login_prompt': 'Silakan masuk untuk menggunakan layanan internet hotspot.',
			'login_trial': 'Uji coba gratis tersedia,',
			'login_trial_btn': 'Gratis Uji Coba',
			'login_trial_link': 'klik di sini',
			'login_trial_desc': 'Coba akses internet cepat kami secara gratis.',
			'tab_single': 'User = Password',
			'tab_dual': 'User & Password',
			'user_eq_pass_placeholder': 'Nama pengguna = Kata sandi',
			'username_placeholder': 'Nama pengguna',
			'password_placeholder': 'Kata sandi',
			'login_btn': 'Sambungkan',
			'powered_by': 'Didukung oleh MikroTik RouterOS',
			'or_divider': 'atau',
			'scan_qr_btn': 'Pindai Kode QR',
			'scan_qr_title': 'Pindai Kode QR',
			'scanning': 'Arahkan kamera ke kode QR...',
			'scan_success': 'Kode QR terdeteksi!',
			'scan_error': 'Format kode QR tidak valid',
			'camera_error': 'Akses kamera gagal (HTTPS diperlukan)',
			'camera_permission': 'Izinkan akses kamera',
			'btn_start_camera': 'Mulai Kamera',
			'btn_stop_camera': 'Hentikan Kamera',
			'btn_upload_qr': 'Pindai Berkas Gambar',
			'cancel_scanner': 'Batal / Tutup Scanner',
			'scan_status_inactive': 'Kamera tidak aktif',
			'scan_status_stopped': 'Kamera dihentikan',
			'scan_status_starting': 'Mendeteksi kamera...',
			'redirecting_external': 'Mengalihkan ke Scanner Eksternal...',
			'checking_connection': 'Memeriksa akses Walled Garden...',
			'wg_error': 'Koneksi eksternal gagal. Apakah Walled Garden sudah diatur?',
			'scan_status_ready_external': 'Pemindai Eksternal Tersedia',
			'btn_continue_external': 'Buka Pemindai',
			'scan_status_use_external': 'Silakan gunakan pemindai eksternal.',
			'wg_error_title': 'Koneksi eksternal gagal.',
			'wg_error_desc': 'Apakah Walled Garden sudah dikonfigurasi?',
			'wg_error_help': 'Silakan hubungi Admin untuk bantuan.',
			'btn_open_scanner': 'Buka Scanner',
			'status_connection_success': 'Koneksi Berhasil',
			'scan_status_connection_failed': 'Koneksi Gagal',
			'scan_file_scanning': 'Memindai file...',
			'scan_no_qr': 'Tidak ada kode QR ditemukan',
			'scan_camera_active': 'Kamera Aktif',
			'pkg_options': 'Pilihan Paket',
			'view_all': 'Lihat Semua',
			'best_seller': 'Terlaris',
			'buy_pkg': 'Beli',

			// Modals
			'ad_offer_detail': 'Detail Penawaran',
			'ad_price': 'Harga',
			'ad_validity': 'Masa Berlaku',
			'ad_interested': 'Saya Tertarik',
			'profile_title': 'Profil',
			'profile_desc': 'Terima kasih telah menggunakan layanan internet kami. Nikmati koneksi cepat dan stabil.',
			'social_media': 'Media Sosial',
			'contact_info': 'Info Kontak',

			// Status page
			'trial_status': 'Status Pengguna Uji Coba',
			'connection_status': 'Status Koneksi',
			'ip_address': 'Alamat IP',
			'mac_address': 'Alamat MAC',
			'upload': 'Unggah',
			'download': 'Unduh',
			'total_traffic': 'Total',
			'bytes_up_down': 'Bytes naik / turun',
			'connected_left': 'Terhubung / sisa',
			'connected': 'Terhubung',
			'time_left': 'Sisa waktu',
			'quota_left': 'Sisa kuota',
			'status_refresh': 'Status muat ulang',
			'expired': 'Kadaluarsa',
			'ad_required': 'Iklan diperlukan',
			'logout_btn': 'Keluar',
			'continue_btn': 'Lanjutkan',

			// Logout page
			'logout_title': 'Anda baru saja keluar!',
			'username_label': 'Nama pengguna',
			'session_time': 'Waktu Sesi',
			'relogin_btn': 'Masuk lagi',
			'login_new_btn': 'Masuk',
			'logout_login_btn': 'Masuk',
			'logout_clear_btn': 'Keluar & Hapus Sesi',

			// Error page
			'error_title': 'Kesalahan Hotspot',
			'try_again': 'Coba Lagi',

			// Alogin page (success)
			'login_success': 'Berhasil Masuk',
			'redirect_msg': 'Anda akan segera dialihkan. Jika tidak terjadi apa-apa, klik',
			'here': 'di sini',

			// Radvert page
			'advertisement': 'Iklan',
			'open_ad_manual': 'Jika tidak terjadi apa-apa, buka',
			'manually': 'secara manual',

			// Error messages from errors.txt
			'err_internal': 'kesalahan internal',
			'err_config': 'kesalahan konfigurasi',
			'err_not_logged_in': 'Anda belum masuk',
			'err_ippool_empty': 'tidak dapat menetapkan alamat IP - tidak ada lagi alamat tersedia',
			'err_shutting_down': 'layanan hotspot sedang dimatikan',
			'err_session_limit': 'tidak ada lagi sesi yang diizinkan untuk pengguna',
			'err_license_limit': 'batas sesi tercapai',
			'err_wrong_mac': 'nama pengguna tidak valid: alamat MAC ini bukan milik Anda',
			'err_chap_missing': 'browser tidak mengirim respons (coba lagi, aktifkan JavaScript)',
			'err_invalid_username': 'nama pengguna atau kata sandi salah',
			'err_invalid_mac': 'tidak diizinkan masuk dari alamat MAC ini',
			'err_uptime_limit': 'telah mencapai batas waktu aktif',
			'err_traffic_limit': 'telah mencapai batas lalu lintas',
			'err_radius_timeout': 'server RADIUS tidak merespons',
			'err_auth_progress': 'sedang mengotorisasi, coba lagi nanti',

			// Help Modal
			'help_title': 'Bantuan',
			'faq_internet': 'Cara akses internet?',
			'faq_internet_step1': 'Sentuh tombol FREE TRIAL (jika ada) untuk akses gratis terbatas.',
			'faq_internet_step2': 'Login dengan memasukkan Kode Voucher yg Anda miliki.',
			'faq_login': 'Cara Login?',
			'faq_login_step1': 'Pilih tab Voucher.',
			'faq_login_step2': 'Masukkan kode voucher ke kolom input.',
			'faq_login_step3': 'Klik tombol CONNECT.',
			'faq_login_failed': 'Login ditolak?',
			'faq_login_failed_step1': 'Pastikan kode voucher diketik dengan benar.',
			'faq_login_failed_step2': 'Perhatikan huruf besar/kecil.',
			'faq_login_failed_step3': 'Pastikan tidak ada spasi di awal/akhir.',
			'faq_login_failed_step4': 'Jika gagal, hubungi admin.',
			'faq_check_quota': 'Cek Masa Aktif/Kuota?',
			'faq_check_quota_desc': 'Buka browser dan ketik alamat:',
			'faq_active_vs_duration': 'Masa Aktif vs Durasi?',
			'faq_duration_desc': 'Durasi: Waktu yang bisa digunakan untuk internet.',
			'faq_active_desc': 'Masa Aktif: Batas waktu voucher bisa digunakan sejak login pertama. Jika masa aktif habis, voucher hangus meski durasi masih ada.',
			'contact_support': 'Hubungi kami jika ada masalah:',

			// Navbar
			'nav_home': 'Beranda',
			'nav_refresh': 'Muat Ulang',
			'nav_voucher': 'Voucher',
			'social_media_label': 'Media Sosial'
		}
	};

	// Error message mappings (English -> key)
	const errorMappings = [
		{ pattern: /internal error/i, key: 'err_internal' },
		{ pattern: /configuration error/i, key: 'err_config' },
		{ pattern: /you are not logged in/i, key: 'err_not_logged_in' },
		{ pattern: /cannot assign ip address/i, key: 'err_ippool_empty' },
		{ pattern: /hotspot service is shutting down/i, key: 'err_shutting_down' },
		{ pattern: /no more sessions are allowed/i, key: 'err_session_limit' },
		{ pattern: /session limit reached/i, key: 'err_license_limit' },
		{ pattern: /this MAC address is not yours/i, key: 'err_wrong_mac' },
		{ pattern: /did not send challenge response/i, key: 'err_chap_missing' },
		{ pattern: /invalid username or password/i, key: 'err_invalid_username' },
		{ pattern: /not allowed to log in from this MAC/i, key: 'err_invalid_mac' },
		{ pattern: /has reached uptime limit/i, key: 'err_uptime_limit' },
		{ pattern: /has reached traffic limit/i, key: 'err_traffic_limit' },
		{ pattern: /RADIUS server is not responding/i, key: 'err_radius_timeout' },
		{ pattern: /already authorizing/i, key: 'err_auth_progress' }
	];

	const langToggleButton = document.getElementById('lang-toggle');
	const langIconEn = document.getElementById('lang-icon-en');
	const langIconId = document.getElementById('lang-icon-id');

	window.getCurrentLang = () => {
		const storedLang = localStorage.getItem('language');
		if (storedLang) return storedLang;
		
		if (typeof hotspotConfig !== 'undefined' && hotspotConfig.defaultLang) {
			return hotspotConfig.defaultLang;
		}
		return 'en';
	};

	const applyTranslations = (lang) => {
		const t = window.translations[lang];
		if (!t) return;

		// Update page title
		const titleKey = document.querySelector('[data-i18n-title]');
		if (titleKey) {
			const key = titleKey.getAttribute('data-i18n-title');
			if (t[key]) document.title = t[key];
		}

		// Update all elements with data-i18n attribute
		document.querySelectorAll('[data-i18n]').forEach(el => {
			const key = el.getAttribute('data-i18n');
			if (t[key]) {
				if (el.tagName === 'INPUT' && el.type === 'submit') {
					el.value = t[key];
				} else if (el.tagName === 'INPUT' && el.placeholder) {
					el.placeholder = t[key];
				} else {
					el.textContent = t[key];
				}
			}
		});

		// Update placeholders with data-i18n-placeholder
		document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
			const key = el.getAttribute('data-i18n-placeholder');
			if (t[key]) el.placeholder = t[key];
		});

		// Update input values with data-i18n-value
		document.querySelectorAll('[data-i18n-value]').forEach(el => {
			const key = el.getAttribute('data-i18n-value');
			if (t[key]) el.value = t[key];
		});

		// Translate error messages
		document.querySelectorAll('[data-i18n-error]').forEach(el => {
			const originalText = el.getAttribute('data-original-error') || el.textContent;
			
			// Store original on first run
			if (!el.getAttribute('data-original-error')) {
				el.setAttribute('data-original-error', originalText);
			}

			if (lang === 'en') {
				el.textContent = originalText;
			} else {
				let translated = originalText;
				for (const mapping of errorMappings) {
					if (mapping.pattern.test(originalText)) {
						translated = t[mapping.key] || originalText;
						break;
					}
				}
				el.textContent = translated;
			}
		});
	};
	window.applyTranslations = applyTranslations;

	const updateLangIcons = (lang) => {
		if (langIconEn && langIconId) {
			if (lang === 'en') {
				langIconEn.classList.remove('hidden');
				langIconId.classList.add('hidden');
			} else {
				langIconEn.classList.add('hidden');
				langIconId.classList.remove('hidden');
			}
		}
	};

	const applyLanguage = () => {
		const lang = getCurrentLang();
		applyTranslations(lang);
		updateLangIcons(lang);
        if (typeof window.renderFaq === 'function') window.renderFaq(); // Re-render FAQ
        if (typeof window.renderPromoSlider === 'function') window.renderPromoSlider(lang); // Re-render Slider with explicit lang
        if (typeof window.renderProfileModal === 'function') window.renderProfileModal(); // Re-render Profile Modal
        if (typeof window.renderVouchers === 'function') window.renderVouchers(); // Re-render Vouchers
	};

	if (langToggleButton) {
		langToggleButton.addEventListener('click', () => {
			const currentLang = getCurrentLang();
			const newLang = currentLang === 'en' ? 'id' : 'en';
			localStorage.setItem('language', newLang);
			applyLanguage();
		});
	}

	const configureProtocol = () => {
		if (typeof hotspotConfig === 'undefined') return;

		// Automatic Protocol Logic:
		// Enable QR Code = true  -> Protocol https (Required for internal camera)
		// Enable QR Code = false -> Protocol http (Default assumption)
		// However, if we are using the External Scanner (HTTP fallback), we should NOT force HTTPS.
		
		let protocol = 'http'; // Default baseline

		// Check current protocol
		const currentProtocol = window.location.protocol.slice(0, -1); // "http" or "https"

		if (hotspotConfig.enableQRCode) {
			// If QR is enabled...
			if (currentProtocol === 'https') {
				// Already secure, keep it.
				protocol = 'https';
			} else {
				// We are HTTP. 
				// If mode is 'internal', we ideally need HTTPS.
				// If mode is 'auto' or 'external', we can stay HTTP (External scanner handles it).
				if (hotspotConfig.qrMode === 'internal') {
					protocol = 'https'; // Force upgrade for internal
				} else {
					protocol = 'http'; // Stay HTTP for external fallback
				}
			}
		} else {
			// QR Disabled, match current or default
			protocol = currentProtocol;
			
			// Hide the floating QR button in navbar
			const navQrWrapper = document.getElementById('nav-qr-btn-wrapper');
			if (navQrWrapper) navQrWrapper.style.display = 'none';
		}

		// Allow manual override if strictly specified in config
		if (hotspotConfig.loginProtocol) {
			protocol = hotspotConfig.loginProtocol;
		}

		console.log('Login Protocol configured to:', protocol);

		// 1. Update Forms (login, sendin)
		document.querySelectorAll('form').forEach(form => {
			const action = form.getAttribute('action');
			if (action && action.startsWith('http')) {
				form.action = action.replace(/^https?:/, protocol + ':');
			}
		});

		// 2. Update Free Trial Link & other login links
		document.querySelectorAll('a[href*="/login"]').forEach(link => {
			const href = link.getAttribute('href');
			if (href && href.startsWith('http')) {
				link.href = href.replace(/^https?:/, protocol + ':');
			}
		});
	};

	const configureLogo = () => {
		if (typeof hotspotConfig === 'undefined' || !hotspotConfig.logo) return;

		const logoPath = hotspotConfig.logo;

		// 1. Update Main Logo (if element exists)
		const mainLogo = document.getElementById('main-logo');
		if (mainLogo) {
			mainLogo.src = logoPath;
		}

		// 2. Update Favicon (Tab Icon)
		let link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.getElementsByTagName('head')[0].appendChild(link);
		}
		link.href = logoPath;
	};

	// ===========================
	// EXTERNAL SCANNER RETURN LOGIC
	// ===========================
	const checkUrlParams = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const user = urlParams.get('username') || urlParams.get('user');
		const pass = urlParams.get('password') || urlParams.get('pass');
		const autoSubmit = urlParams.get('autosubmit');

		if (user) {
			console.log('Credentials found in URL:', user);
			
			// Determine Mode
			let mode = 'dual'; // Default
			if (user === pass || !pass) {
				mode = 'single';
			}

			// Fill Forms
			const userInput = document.getElementById('username-input');
			const passInput = document.getElementById('password-input-dual'); // Fixed ID
			const userEqInput = document.getElementById('user-eq-pass-input');

			if (mode === 'dual') {
				// Switch to dual tab if available
				// Assuming there's a tab switching mechanism, we might just fill inputs
				// Ideally triggers the tab click
				const dualTab = document.querySelector('[data-tab="dual"]');
				if (dualTab) dualTab.click();

				if (userInput) userInput.value = user;
				if (passInput) passInput.value = pass;
			} else {
				// Switch to single tab
				const singleTab = document.querySelector('[data-tab="single"]');
				if (singleTab) singleTab.click();

				if (userEqInput) userEqInput.value = user;
			}

			// Auto Submit
			if (autoSubmit === 'true') {
				// Small delay to ensure UI updates
				setTimeout(() => {
					// Universal submit finder
					const submitBtn = document.querySelector('input[type="submit"]');
					if (submitBtn) {
						submitBtn.click();
					} else if (typeof doLogin === 'function') {
						doLogin();
					} else {
						document.forms[0].submit();
					}
				}, 500);
			}
			
			// Clean URL (Optional, but nice)
			// window.history.replaceState({}, document.title, window.location.pathname);
		}
	};

	configureLogo();
	configureProtocol();
	applyLanguage();

    // =========================================================
    // CONFIG TEXT HELPER (Multi-language Support)
    // =========================================================
    // Retrieves text from config objects { en: '...', id: '...' }
    // Fallback logic: 
    // 1. Current Language → 2. English → 3. Indonesian → 4. Empty string
    // 1. Current Language → 2. English → 3. Indonesian → 4. Empty string
    function getConfigText(data, lang) {
        if (!data) return '';
        if (typeof data === 'string') return data; // Backward compatibility

        if (!lang) lang = window.getCurrentLang ? window.getCurrentLang() : 'en';
        
        // 1. Try current language
        if (data[lang]) return data[lang];

        // 2. Try English
        if (data['en']) return data['en'];

        // 3. Try Indonesian
        if (data['id']) return data['id'];

        return '';
    }

    // Expose globally for debugging
    window.getConfigText = getConfigText;

    // Voucher Data (Green Theme)
    // View State (Synced Global)
    let currentViewMode = 'grid'; // Default for both

    window.setViewMode = function(ignoredContext, mode) {
        currentViewMode = mode;
        renderVouchers();
    };

    function updateViewButtons(mode) {
        const activeClasses = ['bg-white', 'dark:bg-gray-700', 'shadow-sm', 'text-gray-900', 'dark:text-white'];
        const inactiveClasses = ['text-gray-400', 'hover:text-gray-900', 'dark:hover:text-white', 'bg-transparent', 'shadow-none'];

        // Update BOTH contexts (Main and Modal)
        ['main', 'modal'].forEach(context => {
            const listBtn = document.getElementById(`btn-${context}-list`);
            const gridBtn = document.getElementById(`btn-${context}-grid`);

            if (listBtn && gridBtn) {
                if (mode === 'list') {
                    listBtn.classList.add(...activeClasses);
                    listBtn.classList.remove('bg-transparent', 'shadow-none', 'text-gray-400');
                    
                    gridBtn.classList.remove(...activeClasses);
                    gridBtn.classList.add(...inactiveClasses);
                } else {
                    gridBtn.classList.add(...activeClasses);
                    gridBtn.classList.remove('bg-transparent', 'shadow-none', 'text-gray-400');

                    listBtn.classList.remove(...activeClasses);
                    listBtn.classList.add(...inactiveClasses);
                }
            }
        });
    }

    // Helper: Generate Card HTML based on Mode
    function generateVoucherCard(v, mode) {
        // Use getConfigText for multi-language support
        const title = getConfigText(v.title);
        const active = getConfigText(v.active);
        const price = getConfigText(v.price);
        const buyLabel = window.translations && window.translations[window.getCurrentLang ? window.getCurrentLang() : 'en'] ? window.translations[window.getCurrentLang()].buy_pkg || 'Buy' : 'Buy';

        // Dynamic Color Mapping (Background, Text, and Border)
        const colorMap = {
            blue:   { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500' },
            yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-500' },
            purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500' },
            green:  { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-500' },
            red:    { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', border: 'border-red-500' },
            cyan:   { bg: 'bg-cyan-50 dark:bg-cyan-900/20', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500' }
        };

        const theme = colorMap[v.color] || colorMap['blue']; // Default to blue

        // Best Seller Badge HTML (Gradient Fire Icon - Solid Style)
        // Position: Top-Right (Inside border) to prevent clipping
        const badgeIconOnly = v.bestSeller ? `
            <div class="absolute top-1 right-1 z-20 pointer-events-none">
                 <div class="drop-shadow-md filter">
                    <!-- Heroicons: Fire (mini) - best seller badge -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                        <defs>
                            <linearGradient id="fireGradient-${v.id}" x1="0%" y1="100%" x2="0%" y2="0%">
                                <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" /> <!-- Blue Base -->
                                <stop offset="30%" style="stop-color:#f97316;stop-opacity:1" /> <!-- Orange Middle -->
                                <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" /> <!-- Red Top -->
                            </linearGradient>
                        </defs>
                        <path fill="url(#fireGradient-${v.id})" fill-rule="evenodd" d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z" clip-rule="evenodd" />
                    </svg>
                 </div>
            </div>
        ` : '';

        if (mode === 'grid') {
            // GRID LAYOUT
            return `
                <div onclick="window.location.href='${v.link}'" 
                     class="w-[calc(50%-0.5rem)] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl p-3 shadow-md border-t-4 ${theme.border} border-l border-r border-b border-gray-100 dark:border-gray-700 flex flex-col relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                    ${badgeIconOnly}
                    <h4 class="font-bold text-sm text-center w-full mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">${title}</h4>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
                        <div class="flex flex-row items-center justify-center sm:justify-start gap-2 w-full sm:w-auto text-left">
                            <div class="${theme.bg} ${theme.text} w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                                ${v.icon}
                            </div>
                            <div class="flex flex-col items-start">
                                <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mb-0.5">${active}</p>
                                <span class="font-bold text-xs text-gray-900 dark:text-white">${price}</span>
                            </div>
                        </div>
                        <span class="w-full sm:w-auto text-center bg-gray-100 dark:bg-gray-700/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-[10px] font-bold py-1.5 px-3 rounded-lg text-gray-600 dark:text-gray-300 transition-colors shrink-0 cursor-pointer" data-i18n="buy_pkg">${buyLabel}</span>
                    </div>
                </div>
            `;
        } else {
            // LIST LAYOUT
            return `
                 <div onclick="window.location.href='${v.link}'" 
                     class="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl p-3 shadow-sm border-t-4 ${theme.border} border-l border-r border-b border-gray-100 dark:border-gray-700 flex items-center justify-between relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                    ${badgeIconOnly}
                    <div class="flex items-center gap-3 z-10">
                        <div class="${theme.bg} ${theme.text} w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                            ${v.icon}
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">${title}</h4>
                            <p class="text-[10px] text-gray-500 dark:text-gray-400">${active}</p>
                        </div>
                    </div>

                    <div class="z-10 flex flex-col items-end gap-1">
                        <span class="font-bold text-sm text-gray-900 dark:text-white">${price}</span>
                        <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-[10px] font-bold rounded-full text-gray-600 dark:text-gray-300 transition-colors" data-i18n="buy_pkg">${buyLabel}</span>
                    </div>
                </div>
            `;
        }
    }

    function renderVouchers() {
        // Fetch vouchers from Config
        const vouchers = hotspotConfig.vouchers || [];

        // 1. Render Best Sellers (Main Page)
        const bestSellerContainer = document.getElementById('best-seller-list');
        if (bestSellerContainer) {
            // Filter by bestSeller flag (limit to 3 physically if needed, or allow all flagged)
            // For now, we allow all flagged items to appear, or we could slice them too.
            // User request implies implicit control via flag.
            const bestSellers = vouchers.filter(v => v.bestSeller === true);
            bestSellerContainer.innerHTML = bestSellers.map(v => generateVoucherCard(v, currentViewMode)).join('');
        }

        // 2. Render All Vouchers (Modal)
        const allVoucherContainer = document.getElementById('all-voucher-list');
        if (allVoucherContainer) {
            allVoucherContainer.innerHTML = vouchers.map(v => generateVoucherCard(v, currentViewMode)).join('');
        }
        
        // Update all buttons to reflect state
        updateViewButtons(currentViewMode);
    }

    // Call on load
    renderVouchers();
    window.renderVouchers = renderVouchers; // Expose for language switch re-render
    renderPromoSlider();
    renderProfileModal();

    // =========================================================
    // PROFILE MODAL CONTENT (from config.js)
    // =========================================================
    function renderProfileModal() {
        const profile = hotspotConfig.profile;
        if (!profile) return;

        // Get elements
        const nameEl = document.getElementById('profile-name');
        const taglineEl = document.getElementById('profile-tagline');
        const descEl = document.getElementById('profile-description');
        const phoneEl = document.getElementById('profile-phone');
        const locationEl = document.getElementById('profile-location');
        const socialLabelEl = document.getElementById('profile-social-label');
        const waLinkEl = document.getElementById('profile-whatsapp');
        const fbLinkEl = document.getElementById('profile-facebook');
        const igLinkEl = document.getElementById('profile-instagram');

        // Populate content using getConfigText
        if (nameEl) nameEl.textContent = getConfigText(profile.name);
        if (taglineEl) taglineEl.textContent = getConfigText(profile.tagline);
        if (descEl) descEl.textContent = getConfigText(profile.description);
        if (phoneEl) phoneEl.textContent = profile.phone || '';
        if (locationEl) locationEl.textContent = getConfigText(profile.location);

        // Social Media links (hide if not set)
        const social = profile.socialMedia || {};
        if (waLinkEl) {
            if (social.whatsapp) {
                waLinkEl.href = social.whatsapp;
                waLinkEl.style.display = '';
            } else {
                waLinkEl.style.display = 'none';
            }
        }
        if (fbLinkEl) {
            if (social.facebook) {
                fbLinkEl.href = social.facebook;
                fbLinkEl.style.display = '';
            } else {
                fbLinkEl.style.display = 'none';
            }
        }
        if (igLinkEl) {
            if (social.instagram) {
                igLinkEl.href = social.instagram;
                igLinkEl.style.display = '';
            } else {
                igLinkEl.style.display = 'none';
            }
        }
    }

    // Expose for re-render after language switch
    window.renderProfileModal = renderProfileModal;

    // 2. FAQ / HELP RENDER LOGIC
    function renderFaq() {
        const container = document.getElementById('faq-list');
        const faqs = hotspotConfig.faq || [];
        
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        faqs.forEach((item, index) => {
            const question = getConfigText(item.question);
            const answer = getConfigText(item.answer);
            
            // Allow string replacement for dynamic hostname if needed
            const finalAnswer = answer.replace('$(hostname)', window.location.hostname || 'wifi.lan');

            const html = `
                <details class="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <summary class="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none">
                        <span>${question}</span>
                        <span class="transition-transform group-open:rotate-180">
                            <!-- Heroicons: chevron-down (mini) -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-gray-400">
                                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </span>
                    </summary>
                    <div class="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700">
                        ${finalAnswer}
                    </div>
                </details>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });
    }

    // Expose and Call
    window.renderFaq = renderFaq;

    // 3. PROMO SLIDER LOGIC
    function renderPromoSlider(lang) {
        const slider = document.getElementById('promo-slider');
        const slides = hotspotConfig.slides || [];
        if (!slider) return;

        const slideElements = slides.map((slide, index) => {
            let content = '';
            
            // Get Text
            const title = getConfigText(slide.title, lang);
            const subtitle = getConfigText(slide.subtitle, lang);
            const desc = getConfigText(slide.desc, lang);
            const detailTitle = slide.detail ? getConfigText(slide.detail.title, lang) : title;
            const detailDesc = slide.detail ? getConfigText(slide.detail.description, lang) : '';

            // Reusable Hover Overlay (Title + Subtitle)
            const labelDetail = getConfigText({en: 'Detail', id: 'Detail'}, lang);
            const labelClick = getConfigText({en: 'Click for Details', id: 'Klik untuk Detail'}, lang);

            const hoverOverlay = `
                <div class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <p class="text-xs text-white/80 uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${labelDetail}</p>
                    <h4 class="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${detailTitle}</h4>
                </div>
            `;

            // Handle Mixed Content
            if (slide.type === 'text') {
                 // Text Slide (No hover overlay needed as text is already visible, but we can add a subtle effect)
                 content = `
                    <div class="w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white p-5 text-center px-8 relative z-10">
                        <div>
                            <p class="text-xs opacity-90 uppercase tracking-widest mb-2">${subtitle}</p>
                            <h4 class="text-3xl font-bold">${title}</h4>
                            <p class="text-sm mt-2 opacity-90">${desc}</p>
                        </div>
                    </div>
                    <!-- Optional: Add click hint on hover -->
                    <!-- Optional: Add click hint on hover -->
                    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-end justify-center pb-4">
                        <span class="text-[10px] text-white/80 uppercase tracking-widest">${labelClick}</span>
                    </div>
                 `;
            } else if (slide.type === 'image') {
                 content = `
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                    <img src="${slide.src}" alt="${slide.alt}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                    
                    <!-- Hover Reveal -->
                    <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                        <h3 class="text-white font-bold text-lg drop-shadow-md">${detailTitle}</h3>
                        <p class="text-white/80 text-xs line-clamp-2">${detailDesc}</p>
                    </div>

                    ${hoverOverlay}
                 `;
            } else if (slide.type === 'video') {
                 content = `
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                    <video src="${slide.src}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" autoplay muted playsinline></video>
                    
                    <!-- Hover Reveal -->
                    <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                        <h3 class="text-white font-bold text-lg drop-shadow-md">${detailTitle}</h3>
                        <p class="text-white/80 text-xs line-clamp-2">${detailDesc}</p>
                    </div>

                    ${hoverOverlay}
                 `;
            }

            return `
                <div onclick="window.handleSlideClick(event, ${index})" 
                     class="snap-center shrink-0 w-[90%] h-44 rounded-2xl shadow-lg relative overflow-hidden cursor-pointer group select-none"
                     data-index="${index}">
                    ${content}
                </div>
            `;
        });

        // === INFINITE CAROUSEL: Add clones for peek effect ===
        const totalSlides = slides.length;
        
        if (totalSlides > 1) {
            // Clone last slide → prepend (for left peek on first slide)
            // Clone first slide → append (for seamless loop forward)
            const lastClone = slideElements[totalSlides - 1]
                .replace(/onclick="[^"]*"/, 'onclick="window.handleSlideClick(event, ' + (totalSlides - 1) + ')"')
                .replace(/data-index="\d+"/, 'data-index="clone-last"');
            const firstClone = slideElements[0]
                .replace(/onclick="[^"]*"/, 'onclick="window.handleSlideClick(event, 0)"')
                .replace(/data-index="\d+"/, 'data-index="clone-first"');
            
            slider.innerHTML = lastClone + slideElements.join('') + firstClone;
        } else {
            slider.innerHTML = slideElements.join('');
        }

        // DOM children: [clone-last, slide0, slide1, ..., slideN-1, clone-first]
        // DOM index:    [0,          1,      2,     ...,  N,        N+1       ]
        const hasClones = totalSlides > 1;
        const cloneOffset = hasClones ? 1 : 0; // Real slide 0 is at DOM index 1

        // --- INIT NAVIGATION & DOTS ---
        const dotsContainer = document.getElementById('slider-dots');
        const prevBtn = document.getElementById('btn-prev');
        const nextBtn = document.getElementById('btn-next');

        // 1. Render Dots (for real slides only)
        if (dotsContainer) {
            dotsContainer.innerHTML = slides.map((_, i) => `
                <button type="button" class="w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}" 
                        data-slide="${i}" aria-label="Slide ${i + 1}">
                </button>
            `).join('');
        }

        // 2. Scroll to real first slide on init (DOM index 1)
        const initScrollPosition = () => {
            if (hasClones && slider.children[1]) {
                const gap = 16;
                const child = slider.children[1]; // Real first slide
                const containerWidth = slider.clientWidth;
                const cardWidth = child.offsetWidth;
                // Center it
                slider.scrollLeft = child.offsetLeft - (containerWidth - cardWidth) / 2;
            }
        };
        
        // Initialize after a small delay to ensure layout is ready
        setTimeout(initScrollPosition, 50);

        // 3. Navigation Functions
        const scrollToSlide = (realIndex) => {
            // Convert real index to DOM index
            const domIndex = realIndex + cloneOffset;
            const child = slider.children[domIndex];
            if (child) {
                const containerWidth = slider.clientWidth;
                const cardWidth = child.offsetWidth;
                const scrollAmount = child.offsetLeft - (containerWidth - cardWidth) / 2;
                slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const getDomIndexFromScroll = () => {
            const scrollLeft = slider.scrollLeft;
            const child = slider.children[0];
            if (!child) return 0;
            
            const gap = 16;
            const cardWidth = child.offsetWidth;
            const containerWidth = slider.clientWidth;
            const adjustedScroll = scrollLeft + (containerWidth - cardWidth) / 2;
            return Math.round(adjustedScroll / (cardWidth + gap));
        };

        const getRealIndexFromDomIndex = (domIndex) => {
            if (!hasClones) return domIndex;
            // DOM 0 = clone-last (shows last slide) → real index = totalSlides - 1
            // DOM 1 = real 0
            // DOM N = real N-1
            // DOM N+1 = clone-first (shows first slide) → real index = 0
            if (domIndex <= 0) return totalSlides - 1;
            if (domIndex > totalSlides) return 0;
            return domIndex - 1;
        };

        const updateActiveDot = () => {
            const domIndex = getDomIndexFromScroll();
            const realIndex = getRealIndexFromDomIndex(domIndex);
            
            if (dotsContainer) {
                Array.from(dotsContainer.children).forEach((btn, i) => {
                    if (i === realIndex) {
                        btn.classList.add('bg-white', 'w-6');
                        btn.classList.remove('bg-white/50');
                    } else {
                        btn.classList.remove('bg-white', 'w-6');
                        btn.classList.add('bg-white/50');
                    }
                });
            }

            // Always show both buttons
            if (prevBtn) { prevBtn.style.display = 'flex'; prevBtn.style.opacity = '1'; }
            if (nextBtn) { nextBtn.style.display = 'flex'; nextBtn.style.opacity = '1'; }

            return realIndex;
        };

        // 4. Handle infinite loop: jump from clone to real slide when scroll ends
        let scrollEndTimeout;
        const handleScrollEnd = () => {
            if (!hasClones) return;
            
            const domIndex = getDomIndexFromScroll();
            const child = slider.children[0];
            if (!child) return;
            
            const containerWidth = slider.clientWidth;
            const cardWidth = child.offsetWidth;
            
            // If viewing clone-last (DOM 0), jump to real last slide (DOM N)
            if (domIndex <= 0) {
                const realLastChild = slider.children[totalSlides]; // DOM index for last real slide
                slider.scrollTo({ 
                    left: realLastChild.offsetLeft - (containerWidth - cardWidth) / 2, 
                    behavior: 'instant' 
                });
            }
            // If viewing clone-first (DOM N+1), jump to real first slide (DOM 1)
            else if (domIndex > totalSlides) {
                const realFirstChild = slider.children[1]; // DOM index for first real slide
                slider.scrollTo({ 
                    left: realFirstChild.offsetLeft - (containerWidth - cardWidth) / 2, 
                    behavior: 'instant' 
                });
            }
        };



        // Smart Click Handler (Scroll vs Open)
        window.handleSlideClick = function(event, index) {
            const currentIndex = updateActiveDot();
            
            if (index === currentIndex) {
                // If centered, open modal
                openAdModal(index);
            } else {
                // If side, scroll to it
                scrollToSlide(index);
            }
        };

        // 4. Event Listeners
        if (dotsContainer) {
            Array.from(dotsContainer.children).forEach((btn, i) => {
                btn.onclick = (e) => {
                    e.stopPropagation(); 
                    scrollToSlide(i);
                };
            });
        }

        slider.addEventListener('scroll', () => {
            updateActiveDot();
            // Detect scroll end and handle infinite loop jump
            clearTimeout(scrollEndTimeout);
            scrollEndTimeout = setTimeout(handleScrollEnd, 150);
        }, { passive: true });




        // 5. Button Navigation (infinite loop with modulo)
        if (prevBtn && nextBtn) {
            prevBtn.onclick = (e) => {
                e.stopPropagation();
                const currentIndex = updateActiveDot();
                // Decrement with wrap: (index - 1 + total) % total
                const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                scrollToSlide(prevIndex);
            };

            nextBtn.onclick = (e) => {
                e.stopPropagation();
                const currentIndex = updateActiveDot();
                // Increment with wrap: (index + 1) % total
                const nextIndex = (currentIndex + 1) % totalSlides;
                scrollToSlide(nextIndex);
            };
        }

        // 6. Video-Aware Auto Play Logic
        let autoPlayTimer;
        let isScrolling;

        const processAutoPlay = () => {
            // Clear any existing timers/listeners
            clearTimeout(autoPlayTimer);
            
            // Get Current Active Slide (DOM Element)
            const domIndex = getDomIndexFromScroll();
            const child = slider.children[domIndex];
            
            if (!child) return;
            
            // Check for Video
            const video = child.querySelector('video');
            
            if (video) {
                // Case: Video Slide
                console.log('[Slider] Video detected, playing...');
                video.currentTime = 0;
                video.play().catch(e => console.log('[Slider] Autoplay blocked:', e));
                
                // When video ends, go to next
                video.onended = () => {
                    console.log('[Slider] Video ended, next slide');
                    goToNextSlide();
                };
            } else {
                // Case: Image/Text Slide
                console.log('[Slider] Static slide, waiting 6s...');
                autoPlayTimer = setTimeout(() => {
                    goToNextSlide();
                }, 6000);
            }
        };

        const goToNextSlide = () => {
             const currentIndex = updateActiveDot(); // Get current real index
             const nextIndex = (currentIndex + 1) % totalSlides;
             scrollToSlide(nextIndex);
        };

        const stopAutoPlay = () => {
            clearTimeout(autoPlayTimer);
            // Also pause any active video?
             const domIndex = getDomIndexFromScroll();
            const child = slider.children[domIndex];
            if(child) {
                const video = child.querySelector('video');
                if(video) video.pause();
            }
        };

        // Scroll Listener to Trigger AutoPlay logic when scroll settles
        slider.addEventListener('scroll', () => {
             // 1. UI Update (Dots) - Instant
             window.requestAnimationFrame(updateActiveDot);
             
             // 2. AutoPlay Logic - Debounced (Wait for scroll to stop)
             clearTimeout(isScrolling);
             // Stop previous timer while scrolling
             clearTimeout(autoPlayTimer);
             
             isScrolling = setTimeout(() => {
                 // Scroll stopped / settled
                 processAutoPlay();
             }, 800); // 800ms debounce to ensure snap finished
        });

        // Initial Start
        processAutoPlay();

        const section = document.getElementById('slider-section');
        if (section) {
            // Pause on hover
            section.addEventListener('mouseenter', () => clearTimeout(autoPlayTimer));
            // Resume on leave (trigger logic)
            section.addEventListener('mouseleave', () => processAutoPlay());
            
            section.addEventListener('touchstart', () => clearTimeout(autoPlayTimer), { passive: true });
            section.addEventListener('touchend', () => setTimeout(processAutoPlay, 1000), { passive: true }); 
        } 
            
            // Mouse Wheel Scroll (Desktop)
            slider.addEventListener('wheel', (e) => {
                e.preventDefault();
                const currentIndex = updateActiveDot();
                if (e.deltaY > 0 || e.deltaX > 0) {
                    // Scroll Down/Right = Next Slide
                    if (currentIndex < slides.length - 1) scrollToSlide(currentIndex + 1);
                    else scrollToSlide(0);
                } else {
                    // Scroll Up/Left = Previous Slide
                    if (currentIndex > 0) scrollToSlide(currentIndex - 1);
                    else scrollToSlide(slides.length - 1);
                }
            }, { passive: false });
    }

    // Expose for language switch re-render
    window.renderPromoSlider = renderPromoSlider;

    // AD MODAL LOGIC (UPDATED ANIMATION)
    window.openAdModal = function(index) {
        // PREVENT MODAL OPENING IF NO INDEX (Click from unknown source)
        if (typeof index === 'undefined' || index === null) return;
        
        const slides = hotspotConfig.slides || [];
        const slide = slides[index];
        if (!slide || !slide.detail) {
             console.error("Slide Data Missing for Index:", index);
             return;
        }

        const modal = document.getElementById('ad-modal');
        const navbar = document.querySelector('nav.fixed.bottom-0');

        if (modal) {
            // Populate Data - USING CONFIG HELPER
            document.getElementById('ad-detail-title').innerText = getConfigText(slide.detail.title);
            document.getElementById('ad-detail-desc').innerText = getConfigText(slide.detail.description);
            document.getElementById('ad-detail-price').innerText = getConfigText(slide.detail.price);
            document.getElementById('ad-detail-validity').innerText = getConfigText(slide.detail.validity);

            // Handle Preview Block
            const previewContainer = document.getElementById('ad-detail-preview');
            let previewContent = '';
             if (slide.type === 'image') {
                previewContent = `<img src="${slide.src}" class="w-full h-full object-cover">`;
            } else if (slide.type === 'video') {
                previewContent = `<video src="${slide.src}" class="w-full h-full object-cover" autoplay muted loop playsinline></video>`;
            } else {
                 previewContent = `
                    <div class="w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white p-6 text-center">
                        <div>
                            <p class="text-xs opacity-75 uppercase tracking-widest mb-1">${getConfigText(slide.subtitle)}</p>
                            <h3 class="text-2xl font-bold">${getConfigText(slide.title)}</h3>
                        </div>
                    </div>
                 `;
            }
            previewContainer.innerHTML = previewContent;

            // Show Modal (Pop Scale Effect)
            document.body.style.overflow = 'hidden';
            if(navbar) navbar.style.display = 'none';
            
            modal.style.visibility = 'visible';
            modal.classList.remove('hidden');
            
            // Trigger reflow for transition
            void modal.offsetWidth;
            
            modal.style.opacity = '1';
            
            // Animate Card
            const card = modal.querySelector('.modal-card');
            if (card) {
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            }
        }
    };

    window.closeAdModal = function() {
        const modal = document.getElementById('ad-modal');
        const navbar = document.querySelector('nav.fixed.bottom-0');
        
        if (modal) {
             const card = modal.querySelector('.modal-card');
             if (card) {
                card.classList.remove('scale-100', 'opacity-100');
                card.classList.add('scale-95', 'opacity-0');
             }

             modal.style.opacity = '0';
             
             setTimeout(() => {
                modal.style.visibility = 'hidden';
                modal.classList.add('hidden');
                document.body.style.overflow = '';
                if(navbar) navbar.style.display = '';
             }, 300);
        }
    };

    // Make functions global - Modal functions are now in js/modals.js
    // The following modal functions have been moved to modals.js:
    // - openPricingModal, closePricingModal
    // - openProfileModal, closeProfileModal
    // - openHelpModal, closeHelpModal
    // - openAdModal, closeAdModal

    // =========================================================
    // GLOBAL MODAL DISMISSAL LOGIC
    // =========================================================
    // Ensures all modals close when clicking the backdrop, 
    // unified for Profile, Help, Pricing, Ad, etc.
    // QR Scanner handles its own logic in qr-scanner.js
    function setupModalDismissal() {
        // List of Modals and their Close Functions
        const modals = [
            { id: 'profile-modal', closeFn: () => window.closeProfileModal && window.closeProfileModal() },
            { id: 'help-modal', closeFn: () => window.closeHelpModal && window.closeHelpModal() },
            { id: 'pricing-modal', closeFn: () => window.closePricingModal && window.closePricingModal() },
            { id: 'ad-modal', closeFn: () => window.closeAdModal && window.closeAdModal() }
        ];

        modals.forEach(def => {
            const modal = document.getElementById(def.id);
            if (modal) {
                // Remove existing listeners to avoid duplicates (clone node trick optional, but simple add is fine here)
                // Add click listener to backdrop
                modal.onclick = (e) => {
                    // If the click target IS the modal container (backdrop)
                    // and not one of its children, then close.
                    if (e.target === modal) {
                        console.log(`[Modal] Closing ${def.id} via backdrop click`);
                        if (typeof def.closeFn === 'function') def.closeFn();
                    }
                };
            }
        });
    }

    // =========================================================
    // DYNAMIC BRANDING LOGIC
    // =========================================================
    function renderBranding() {
        if (typeof hotspotConfig === 'undefined') return;

        // 1. Logo (Dual: Navbar + Favicon)
        if (hotspotConfig.profile && hotspotConfig.profile.logo) {
            const logoSrc = hotspotConfig.profile.logo;
            
            // A. Navbar Logo
            const logoEl = document.getElementById('main-logo');
            if (logoEl) logoEl.src = logoSrc;

            // B. Favicon (Tab Icon)
            let favIcon = document.querySelector('link[rel="shortcut icon"]') || document.querySelector('link[rel="icon"]');
            if (!favIcon) {
                favIcon = document.createElement('link');
                favIcon.rel = 'shortcut icon';
                document.head.appendChild(favIcon);
            }
            favIcon.href = logoSrc;
        }

        // 2. Brand Name
        const brandNameEl = document.getElementById('brand-name');
        if (brandNameEl && hotspotConfig.profile && hotspotConfig.profile.brandName) {
            brandNameEl.textContent = getConfigText(hotspotConfig.profile.brandName); 
        }

        // 3. Tagline
        const taglineEl = document.getElementById('brand-tagline');
        if (taglineEl && hotspotConfig.profile && hotspotConfig.profile.shortTagline) {
            taglineEl.textContent = getConfigText(hotspotConfig.profile.shortTagline); 
        }
    }

    // Initialize on Load
    setupModalDismissal();
    renderPromoSlider();
    renderBranding();
    if (typeof window.renderFaq === 'function') window.renderFaq();

});

