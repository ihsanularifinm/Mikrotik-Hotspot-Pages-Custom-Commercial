/**
 * navbars.js - Dynamic Navbar Injection
 * Injects shared navbars (Top Header & Bottom Navbar) into any page
 * This enables consistent navigation on all hotspot pages
 * 
 * Usage:
 * 1. In HTML, set the navbarConfig before loading this script:
 *    <script>
 *      window.navbarConfig = { 
 *        topNavbar: true, 
 *        bottomNavbar: true, 
 *        showQRButton: true  // only for login.html
 *      };
 *    </script>
 *    <script src="js/navbars.js"></script>
 * 
 * 2. Or just load this script - defaults to topNavbar: true, bottomNavbar: false
 */

// ===========================
// DEFAULT CONFIG
// ===========================
const defaultNavbarConfig = {
    topNavbar: true,        // Show top header
    bottomNavbar: false,    // Show bottom navigation
    showQRButton: false     // Show floating QR scanner button (only on login)
};

// Merge with user config if provided
const navConfig = Object.assign({}, defaultNavbarConfig, window.navbarConfig || {});

// ===========================
// TOP NAVBAR (HEADER) HTML
// ===========================
const topNavbarHTML = `
    <!-- HEADER FIXED (Injected by navbars.js) -->
    <header id="injected-header" class="fixed top-0 left-0 right-0 z-[200] bg-white dark:bg-gray-900 shadow-sm px-4 py-3 flex justify-between items-center transition-all duration-300">
        <div class="flex items-center gap-2">
            <!-- Logo via Config -->
            <img id="main-logo" src="img/smart-home.svg" alt="ISP Logo" class="h-8 w-auto"> 
            <div class="leading-tight">
                <h1 id="brand-name" class="font-bold text-sm tracking-wide text-gray-900 dark:text-white">Hotspot</h1>
                <p id="brand-tagline" class="text-[10px] text-gray-500 dark:text-gray-400">Broadband Service</p>
            </div>
        </div>
        
        <div class="flex items-center gap-1">
            <!-- Language Toggle (Exact Custom-Home Style) -->
            <button id="lang-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm w-10 h-10 flex items-center justify-center cursor-pointer">
                <span id="lang-icon-en" class="font-bold text-xs">EN</span>
                <span id="lang-icon-id" class="hidden font-bold text-xs">ID</span>
            </button>

            <!-- Dark Mode Toggle (Exact Custom-Home Style) -->
            <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm w-10 h-10 flex items-center justify-center cursor-pointer">
                <!-- Heroicons: moon (solid) - dark mode toggler -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden w-5 h-5" id="theme-toggle-dark-icon">
                    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
                </svg>
                <!-- Heroicons: sun (solid) - light mode toggler -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden w-5 h-5" id="theme-toggle-light-icon">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>
            </button>
        </div>
    </header>

    <!-- Toast Notification Container -->
    <div id="toast-notification"></div>
`;

// ===========================
// BOTTOM NAVBAR HTML
// ===========================

// Bottom navbar WITH QR button (for login.html)
const bottomNavbarWithQRHTML = `
    <!-- FIXED BOTTOM NAVBAR (Floating on Desktop) - Injected by navbars.js -->
    <nav id="injected-bottom-nav" class="fixed bottom-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pb-safe transition-all duration-300
                md:w-auto md:min-w-[500px] md:bottom-3 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border md:shadow-2xl md:px-8">
        <div class="max-w-md mx-auto px-6 h-16 flex items-center justify-between relative">
            
            <!-- Refresh -->
            <a href="#" onclick="window.location.reload(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: Arrow Path (outline) - refresh page -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="nav_refresh">Refresh</span>
            </a>

            <!-- Voucher (Navbar Trigger) -->
            <a href="#" onclick="openPricingModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: tag (solid) - voucher menu -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="nav_voucher">Voucher</span>
            </a>

            <!-- QR Scanner (Center Floating Button) -->
            <div id="nav-qr-btn-wrapper" class="relative -top-6">
                <button type="button" id="scan-qr-btn" 
                    class="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-4 border-gray-100 dark:border-gray-900">
                    <!-- Heroicons: qr-code (outline) - scan menu -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                    </svg>
                </button>
            </div>

            <!-- Help -->
            <a href="#" onclick="openHelpModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                 <!-- Heroicons: Lifebuoy (solid) - help menu -->
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M19.449 8.448 16.388 11a4.52 4.52 0 0 1 0 2.002l3.061 2.55a8.275 8.275 0 0 0 0-7.103ZM15.552 19.45 13 16.388a4.52 4.52 0 0 1-2.002 0l-2.55 3.061a8.275 8.275 0 0 0 7.103 0ZM4.55 15.552 7.612 13a4.52 4.52 0 0 1 0-2.002L4.551 8.45a8.275 8.275 0 0 0 0 7.103ZM8.448 4.55 11 7.612a4.52 4.52 0 0 1 2.002 0l2.55-3.061a8.275 8.275 0 0 0-7.103 0Zm8.657-.86a9.776 9.776 0 0 1 1.79 1.415 9.776 9.776 0 0 1 1.414 1.788 9.764 9.764 0 0 1 0 10.211 9.777 9.777 0 0 1-1.415 1.79 9.777 9.777 0 0 1-1.788 1.414 9.764 9.764 0 0 1-10.212 0 9.776 9.776 0 0 1-1.788-1.415 9.776 9.776 0 0 1-1.415-1.788 9.764 9.764 0 0 1 0-10.212 9.774 9.774 0 0 1 1.415-1.788A9.774 9.774 0 0 1 6.894 3.69a9.764 9.764 0 0 1 10.211 0ZM14.121 9.88a2.985 2.985 0 0 0-1.11-.704 3.015 3.015 0 0 0-2.022 0 2.985 2.985 0 0 0-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 0 0 0 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 0 0 1.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 0 0 0-2.022 2.985 2.985 0 0 0-.704-1.11Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="help_title">Help</span>
            </a>

            <!-- Profile -->
            <a href="#" onclick="openProfileModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: User Circle (solid) - profile menu -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="profile_title">Profile</span>
            </a>
        </div>
    </nav>
`;

// Bottom navbar WITHOUT QR button (for status.html, logout.html)
const bottomNavbarSimpleHTML = `
    <!-- FIXED BOTTOM NAVBAR (Floating on Desktop) - Injected by navbars.js -->
    <nav id="injected-bottom-nav" class="fixed bottom-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pb-safe transition-all duration-300
                md:w-auto md:min-w-[500px] md:bottom-3 md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border md:shadow-2xl md:px-8">
        <div class="max-w-md mx-auto px-6 h-16 flex items-center justify-between relative">
            
            <!-- Refresh -->
            <a href="#" onclick="window.location.reload(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: Arrow Path (outline) - refresh page -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="nav_refresh">Refresh</span>
            </a>

            <!-- Voucher (Navbar Trigger) -->
            <a href="#" onclick="openPricingModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: tag (solid) - voucher menu -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="nav_voucher">Voucher</span>
            </a>

            <!-- Help -->
            <a href="#" onclick="openHelpModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: Lifebuoy (solid) - help menu -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M19.449 8.448 16.388 11a4.52 4.52 0 0 1 0 2.002l3.061 2.55a8.275 8.275 0 0 0 0-7.103ZM15.552 19.45 13 16.388a4.52 4.52 0 0 1-2.002 0l-2.55 3.061a8.275 8.275 0 0 0 7.103 0ZM4.55 15.552 7.612 13a4.52 4.52 0 0 1 0-2.002L4.551 8.45a8.275 8.275 0 0 0 0 7.103ZM8.448 4.55 11 7.612a4.52 4.52 0 0 1 2.002 0l2.55-3.061a8.275 8.275 0 0 0-7.103 0Zm8.657-.86a9.776 9.776 0 0 1 1.79 1.415 9.776 9.776 0 0 1 1.414 1.788 9.764 9.764 0 0 1 0 10.211 9.777 9.777 0 0 1-1.415 1.79 9.777 9.777 0 0 1-1.788 1.414 9.764 9.764 0 0 1-10.212 0 9.776 9.776 0 0 1-1.788-1.415 9.776 9.776 0 0 1-1.415-1.788 9.764 9.764 0 0 1 0-10.212 9.774 9.774 0 0 1 1.415-1.788A9.774 9.774 0 0 1 6.894 3.69a9.764 9.764 0 0 1 10.211 0ZM14.121 9.88a2.985 2.985 0 0 0-1.11-.704 3.015 3.015 0 0 0-2.022 0 2.985 2.985 0 0 0-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 0 0 0 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 0 0 1.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 0 0 0-2.022 2.985 2.985 0 0 0-.704-1.11Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="help_title">Help</span>
            </a>

            <!-- Profile -->
            <a href="#" onclick="openProfileModal(); return false;" class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors w-16">
                <!-- Heroicons: User Circle (solid) - profile menu -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>
                <span class="text-[10px] font-medium mt-1" data-i18n="profile_title">Profile</span>
            </a>
            
        </div>
    </nav>
`;

// ===========================
// NAVBAR INJECTION FUNCTION
// ===========================

function injectNavbars() {
    // Check if navbars already exist (avoid duplicates)
    if (document.getElementById('injected-header') || document.getElementById('injected-bottom-nav')) {
        console.log('[Navbars] Already injected, skipping.');
        return;
    }
    
    // Inject Top Navbar
    if (navConfig.topNavbar) {
        const topNavContainer = document.createElement('div');
        topNavContainer.id = 'injected-top-nav-container';
        topNavContainer.innerHTML = topNavbarHTML;
        
        // Insert at the beginning of body (after any MikroTik scripts)
        document.body.insertBefore(topNavContainer, document.body.firstChild);
        console.log('[Navbars] Top navbar injected.');
    }
    
    // Inject Bottom Navbar
    if (navConfig.bottomNavbar) {
        const bottomNavContainer = document.createElement('div');
        bottomNavContainer.id = 'injected-bottom-nav-container';
        
        // Choose which navbar to inject based on config
        if (navConfig.showQRButton) {
            bottomNavContainer.innerHTML = bottomNavbarWithQRHTML;
        } else {
            bottomNavContainer.innerHTML = bottomNavbarSimpleHTML;
        }
        
        // Append to end of body (before scripts)
        document.body.appendChild(bottomNavContainer);
        console.log('[Navbars] Bottom navbar injected (QR button: ' + navConfig.showQRButton + ').');
    }
    
    console.log('[Navbars] Injection complete.');
}

// Auto-inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    injectNavbars();
});
