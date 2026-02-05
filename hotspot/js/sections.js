/**
 * sections.js - Dynamic Section Injection
 * Injects shared sections (Slideshow, Voucher List, Footer) into any page
 * This enables consistent content sections on all hotspot pages
 * 
 * Usage:
 * In HTML, set sectionsConfig before loading this script:
 *   <script>
 *     window.sectionsConfig = { 
 *       showSlideshow: true, 
 *       showVoucherList: true, 
 *       showFooter: true,
 *       slideshowPosition: 'before-content' // or 'after-content'
 *     };
 *   </script>
 *   <script src="js/sections.js"></script>
 * 
 * Then add placeholder divs in your HTML where sections should appear:
 *   <div id="slideshow-placeholder"></div>
 *   <div id="voucher-list-placeholder"></div>
 *   <div id="footer-placeholder"></div>
 */

// ===========================
// DEFAULT CONFIG
// ===========================
const defaultSectionsConfig = {
    showSlideshow: false,       // Show promo slideshow
    showVoucherList: false,     // Show voucher list (best sellers)
    showFooter: false           // Show footer
};

// Merge with user config if provided
const sectionsConfig = Object.assign({}, defaultSectionsConfig, window.sectionsConfig || {});

// ===========================
// SLIDESHOW SECTION HTML
// ===========================
const slideshowHTML = `
    <!-- PROMO SLIDER (Injected by sections.js) -->
    <section id="slider-section" class="mt-4 overflow-visible">
        
        <!-- Slider + Nav Buttons Wrapper (buttons center relative to this) -->
        <div class="relative">
            <!-- Slides Container -->
            <div id="promo-slider" class="flex gap-4 overflow-x-auto pb-2 pt-2 px-[5%] snap-x snap-mandatory hide-scrollbar scroll-smooth" style="scroll-padding-inline: 5%;">
                <!-- Injected via app.js -->
            </div>

            <!-- Nav Buttons (centered relative to slider wrapper) -->
            <button id="btn-prev" class="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer">
                <!-- Heroicons: chevron-left (outline) -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </button>
            <button id="btn-next" class="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl border border-white/20 cursor-pointer">
                <!-- Heroicons: chevron-right (outline) -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
        </div>

        <!-- Dots (outside wrapper, so buttons don't include this in their centering) -->
        <div id="slider-dots" class="flex justify-center gap-2 mt-3">
            <!-- Dynamic Dots -->
        </div>
    </section>
`;

// ===========================
// VOUCHER LIST SECTION HTML
// ===========================
const voucherListHTML = `
    <!-- VOUCHER LIST / BEST SELLERS (Injected by sections.js) -->
    <section id="pricing-section" class="mb-4">
         <div class="flex items-center justify-between mb-3 px-1">
            <div class="flex items-center gap-3">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white" data-i18n="pkg_options">Package Options</h3>
                <!-- View Toggles -->
                <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5" id="main-view-toggles">
                     <button onclick="setViewMode('main', 'list')" id="btn-main-list" class="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <!-- Heroicons: bars-4 (mini) -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                            <path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                        </svg>
                     </button>
                     <button onclick="setViewMode('main', 'grid')" id="btn-main-grid" class="p-1 rounded-md bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white transition-colors">
                        <!-- Heroicons: squares-2x2 (mini) -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                            <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" clip-rule="evenodd" />
                        </svg>
                     </button>
                </div>
            </div>
            <a href="#" onclick="openPricingModal(); return false;" class="text-xs text-blue-500 font-medium" data-i18n="view_all">View All</a>
         </div>

         <div id="best-seller-list" class="flex flex-wrap justify-center gap-3">
             <!-- Injected via app.js -->
         </div>
    </section>
`;

// ===========================
// FOOTER SECTION HTML
// ===========================
const footerHTML = `
    <!-- Footer (Injected by sections.js) -->
    <footer id="injected-footer" class="text-center text-xs text-gray-400 mt-8">
        <p>&copy; 2026 Commercial Hotspot System</p>
    </footer>
`;

// ===========================
// SECTION INJECTION FUNCTION
// ===========================

function injectSections() {
    console.log('[Sections] Starting injection...');
    
    // Inject Slideshow
    if (sectionsConfig.showSlideshow) {
        const placeholder = document.getElementById('slideshow-placeholder');
        if (placeholder) {
            placeholder.outerHTML = slideshowHTML;
            console.log('[Sections] Slideshow injected.');
        } else {
            console.warn('[Sections] Slideshow placeholder not found.');
        }
    }
    
    // Inject Voucher List
    if (sectionsConfig.showVoucherList) {
        const placeholder = document.getElementById('voucher-list-placeholder');
        if (placeholder) {
            placeholder.outerHTML = voucherListHTML;
            console.log('[Sections] Voucher list injected.');
        } else {
            console.warn('[Sections] Voucher list placeholder not found.');
        }
    }
    
    // Inject Footer
    if (sectionsConfig.showFooter) {
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.outerHTML = footerHTML;
            console.log('[Sections] Footer injected.');
        } else {
            console.warn('[Sections] Footer placeholder not found.');
        }
    }
    
    console.log('[Sections] Injection complete.');
}

// Auto-inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    injectSections();
});
