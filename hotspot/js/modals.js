/**
 * modals.js - Dynamic Modal Injection
 * Injects shared modals (Pricing, Profile, Help, Ad) into any page
 * This enables modal functionality on login.html, status.html, logout.html
 */

// ===========================
// MODAL HTML TEMPLATES
// ===========================

const pricingModalHTML = `
    <!-- Pricing Modal (Full List) -->
    <div id="pricing-modal" 
         class="fixed inset-0 z-[99999] flex justify-center items-start bg-black/50 backdrop-blur-sm"
         style="visibility: hidden; opacity: 0; transition: opacity 0.3s ease;">
         
         <!-- Modal Content -->
         <div class="modal-card w-full max-w-md bg-white dark:bg-gray-800 h-full rounded-none shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-300 border border-gray-200 dark:border-gray-700" style="transform: translateY(100%);">
            
            <!-- Header Row -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 z-20">
                <div class="w-8"></div> <!-- Spacer for centering -->
                <h3 class="font-bold text-lg text-gray-900 dark:text-white" data-i18n="pkg_options">Package Options</h3>
                
                <div class="flex items-center gap-3">
                     <!-- View Toggles -->
                    <div class="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5" id="modal-view-toggles">
                         <button onclick="setViewMode('modal', 'list')" id="btn-modal-list" class="p-1 rounded-md bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white transition-colors">
                            <!-- Heroicons: bars-4 (mini) - list view -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                                <path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.166a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Zm0 4.167a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                            </svg>
                         </button>
                         <button onclick="setViewMode('modal', 'grid')" id="btn-modal-grid" class="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <!-- Heroicons: squares-2x2 (mini) - grid view -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                                <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" clip-rule="evenodd" />
                            </svg>
                         </button>
                    </div>

                    <button type="button" onclick="closePricingModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors">
                        <!-- Heroicons: x-mark (outline) - close modal -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div id="all-voucher-list" class="flex-1 overflow-y-auto w-full bg-gray-50 dark:bg-gray-900/50 p-4 flex flex-wrap content-start justify-center gap-3">
                <!-- Injected via app.js -->
            </div>
        </div>
    </div>
`;

const profileModalHTML = `
    <!-- Profile Modal (Navbar-Width Overlay) -->
    <div id="profile-modal" 
         class="fixed inset-0 z-[99999] flex justify-center items-start bg-black/50 backdrop-blur-sm"
         style="visibility: hidden; opacity: 0; transition: opacity 0.3s ease;">
         
         <!-- Modal Content (Matches Navbar Width, Solid Background) -->
         <div class="modal-card w-full max-w-md bg-white dark:bg-gray-800 h-full rounded-none shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-300 border border-gray-200 dark:border-gray-700" style="transform: translateY(100%);">
            
            <!-- Header Row -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 z-20">
                <div class="w-8"></div> <!-- Spacer for centering -->
                <h3 class="font-bold text-lg text-gray-900 dark:text-white" data-i18n="profile_title">Profile</h3>
                <button type="button" onclick="closeProfileModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors">
                    <!-- Heroicons: x-mark (outline) - close modal -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto w-full bg-white dark:bg-gray-800 relative z-10">
                <div class="flex flex-col items-center p-6 text-center">
                
                     <!-- Logo (Small, Transparent) -->
                     <img src="img/smart-home.svg" alt="ISP Logo" class="h-16 w-16 object-contain mb-4">

                     <!-- Branding -->
                     <div class="mb-4">
                        <h4 id="profile-name" class="font-bold text-2xl dark:text-white">Smart Hotspot</h4>
                        <p id="profile-tagline" class="text-sm text-gray-500 dark:text-gray-400">Broadband Service</p>
                     </div>

                     <!-- Description -->
                     <p id="profile-description" class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6 px-4">
                        Thank you for using our internet service. Enjoy fast and stable connection.
                     </p>

                     <!-- Contact Info (Styled Boxes) -->
                     <div class="w-full space-y-3 mb-8 px-2">
                         <div class="flex items-center gap-3 bg-gray-50 dark:bg-[#1f2937] p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div class="p-2 bg-white dark:bg-[#374151] rounded-lg text-green-500 shadow-sm shrink-0">
                                 <!-- Heroicons: Phone (solid) - contact icon -->
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                                     <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <span id="profile-phone" class="text-sm font-semibold text-gray-700 dark:text-gray-200">+62 812-3456-7890</span>
                         </div>
                         
                         <div class="flex items-center gap-3 bg-gray-50 dark:bg-[#1f2937] p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div class="p-2 bg-white dark:bg-[#374151] rounded-lg text-blue-500 shadow-sm shrink-0">
                                <!-- Heroicons: Map Pin (solid) - location icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                                    <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <span id="profile-location" class="text-sm font-semibold text-gray-700 dark:text-gray-200">Jakarta, Indonesia</span>
                         </div>
                     </div>

                     <!-- Social Icons -->
                     <div class="w-full">
                         <p id="profile-social-label" class="text-[10px] text-gray-400 mb-4 uppercase tracking-widest font-bold" data-i18n="social_media_label">Social Media</p>
                         <div class="flex justify-center gap-4">
                            <!-- Simple Icons: Whatsapp -->
                            <a id="profile-whatsapp" href="#" class="group relative transition-transform hover:-translate-y-1">
                                <div class="absolute inset-0 bg-green-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
                                <div class="relative p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-green-600 rounded-xl shadow-sm">
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                </div>
                            </a>
                            <!-- Simple Icons: Facebook -->
                            <a id="profile-facebook" href="#" class="group relative transition-transform hover:-translate-y-1">
                                <div class="absolute inset-0 bg-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
                                <div class="relative p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-blue-600 rounded-xl shadow-sm">
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                </div>
                            </a>
                            <!-- Simple Icons: Instagram -->
                            <a id="profile-instagram" href="#" class="group relative transition-transform hover:-translate-y-1">
                                <div class="absolute inset-0 bg-pink-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
                                <div class="relative p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-pink-600 rounded-xl shadow-sm">
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </div>
                            </a>
                         </div>
                     </div>

                </div>
            </div>
        </div>
    </div>
`;

const helpModalHTML = `
    <!-- Help Modal (Clone of Profile Modal to ensure functionality) -->
    <div id="help-modal" 
         class="fixed inset-0 z-[99999] flex justify-center items-start bg-black/50 backdrop-blur-sm"
         style="visibility: hidden; opacity: 0; transition: opacity 0.3s ease;">
         
         <!-- Modal Content -->
         <div class="modal-card w-full max-w-md bg-white dark:bg-gray-800 h-full rounded-none shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-300 border border-gray-200 dark:border-gray-700" style="transform: translateY(100%);">
            
            <!-- Header Row -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 z-20">
                <div class="w-8"></div> <!-- Spacer for centering -->
                <h3 class="font-bold text-lg text-gray-900 dark:text-white" data-i18n="help_title">Help</h3>
                <button type="button" onclick="closeHelpModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors">
                    <!-- Heroicons: x-mark (outline) - close modal -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto w-full bg-gray-50 dark:bg-gray-900/50 p-4 space-y-3">
                
                <!-- Dynamic FAQ List -->
                <div id="faq-list" class="space-y-3">
                    <!-- Injected via app.js (renderFaq) -->
                </div>
                
                <div class="p-4 text-center mt-4">
                     <p class="text-xs text-gray-400" data-i18n="contact_support">Contact us if you have issues:</p>
                     <a href="#" class="text-green-500 font-bold text-sm">0812-3456-7890</a>
                </div>

            </div>
        </div>
    </div>
`;

const adModalHTML = `
    <!-- Ad Detail Modal -->
    <div id="ad-modal" 
         class="fixed inset-0 z-[99999] flex justify-center items-center bg-black/50 backdrop-blur-sm hidden invisible opacity-0 transition-opacity duration-300 p-4"
         style="transition: opacity 0.3s ease, visibility 0.3s ease;">
         
         <div class="modal-card w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-300 transform scale-95 opacity-0 max-h-[90vh]" style="transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s; transform-origin: center;">
            
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 z-20 sticky top-0">
                <h3 class="font-bold text-lg text-gray-900 dark:text-white" data-i18n="ad_offer_detail">Offer Detail</h3>
                <button type="button" onclick="closeAdModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors">
                    <!-- Heroicons: x-mark (outline) - close modal -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <!-- Media Preview -->
                <div id="ad-detail-preview" class="w-full rounded-xl overflow-hidden shadow-sm">
                    <!-- Injected via JS -->
                </div>

                <!-- Info -->
                <div class="space-y-2">
                    <h2 id="ad-detail-title" class="text-2xl font-bold text-gray-900 dark:text-white leading-tight"></h2>
                    <p id="ad-detail-desc" class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"></p>
                </div>

                <!-- Specs -->
                <div class="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold" data-i18n="ad_price">Price</p>
                        <p id="ad-detail-price" class="font-bold text-lg text-blue-600 dark:text-blue-400"></p>
                    </div>
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold" data-i18n="ad_validity">Validity</p>
                        <p id="ad-detail-validity" class="font-bold text-gray-800 dark:text-white"></p>
                    </div>
                </div>
            </div>

            <!-- Footer Action -->
            <div class="p-6 pt-2 pb-safe bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <button onclick="closeAdModal()" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95" data-i18n="ad_interested">
                    I am Interested
                </button>
            </div>
        </div>
    </div>
`;

// ===========================
// MODAL FUNCTIONS
// ===========================

function openPricingModal() {
    const modal = document.getElementById('pricing-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = 'hidden';
        if(navbar) navbar.style.display = 'none';
        if(header) header.style.display = 'none';
        if(slider) slider.style.display = 'none';

        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        
        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(0)';
    }
}

function closePricingModal() {
    const modal = document.getElementById('pricing-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = '';
        if(navbar) navbar.style.display = '';
        if(header) header.style.display = '';
        if(slider) slider.style.display = '';

        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(100%)';
        
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

function openProfileModal() {
    const modal = document.getElementById('profile-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = 'hidden';
        if(navbar) navbar.style.display = 'none';
        if(header) header.style.display = 'none';
        if(slider) slider.style.display = 'none';

        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        
        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(0)';
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = '';
        if(navbar) navbar.style.display = '';
        if(header) header.style.display = '';
        if(slider) slider.style.display = '';

        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(100%)';
        
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

function openHelpModal() {
    const modal = document.getElementById('help-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = 'hidden';
        if(navbar) navbar.style.display = 'none';
        if(header) header.style.display = 'none';
        if(slider) slider.style.display = 'none';

        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        
        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(0)';
    }
}

function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    const navbar = document.querySelector('nav.fixed.bottom-0');
    const header = document.querySelector('header.fixed.top-0');
    const slider = document.getElementById('slider-section');

    if(modal) {
        document.body.style.overflow = '';
        if(navbar) navbar.style.display = '';
        if(header) header.style.display = '';
        if(slider) slider.style.display = '';

        const card = modal.querySelector('.modal-card');
        if(card) card.style.transform = 'translateY(100%)';
        
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

function openAdModal() {
    const modal = document.getElementById('ad-modal');
    if(modal) {
        modal.classList.remove('hidden', 'invisible');
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        const card = modal.querySelector('.modal-card');
        if(card) {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }
    }
}

function closeAdModal() {
    const modal = document.getElementById('ad-modal');
    if(modal) {
        const card = modal.querySelector('.modal-card');
        if(card) {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0';
        }
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden', 'invisible');
            modal.style.visibility = 'hidden';
        }, 300);
    }
}

// ===========================
// MODAL INJECTION FUNCTION
// ===========================

function injectModals() {
    // Check if modals already exist (avoid duplicates)
    if (document.getElementById('pricing-modal')) {
        console.log('[Modals] Already injected, skipping.');
        return;
    }
    
    // Create container for modals
    const modalContainer = document.createElement('div');
    modalContainer.id = 'injected-modals';
    modalContainer.innerHTML = pricingModalHTML + profileModalHTML + helpModalHTML + adModalHTML;
    
    // Append to body
    document.body.appendChild(modalContainer);
    
    console.log('[Modals] Successfully injected all modals.');
}

// Auto-inject on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    injectModals();
});
