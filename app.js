// WP Page Generator Application Code (Updated with Advanced Features)

// Color Presets mapping
const PRESETS = {
    'modern-indigo': { primary: '#6366f1', secondary: '#a855f7', bg: '#ffffff', text: '#1f2937' },
    'ocean-teal': { primary: '#0d9488', secondary: '#0f766e', bg: '#f0fdfa', text: '#115e59' },
    'coral-pink': { primary: '#f43f5e', secondary: '#fda4af', bg: '#fff1f2', text: '#881337' },
    'sunset-gold': { primary: '#f59e0b', secondary: '#fcd34d', bg: '#fdfbeb', text: '#78350f' },
    'dark-emerald': { primary: '#10b981', secondary: '#047857', bg: '#064e3b', text: '#ecfdf5' },
    'purple-cyber': { primary: '#d946ef', secondary: '#701a75', bg: '#fae8ff', text: '#4a044e' }
};

// Global Page State
let pageState = {
    config: {
        primary: '#6366f1',
        secondary: '#a855f7',
        bg: '#ffffff',
        text: '#1f2937',
        fontFamily: 'Outfit',
        containerWidth: 1150,
        sectionPadding: 70
    },
    sections: [],
    activeSectionId: null
};

// SVG Icon Helpers (Self-contained)
const SVG_ICONS = {
    checkmark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="display:inline-block;vertical-align:middle;"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" style="display:inline-block;color:#fbbf24;"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.102-1.196 4.622c-.21.81.67 1.45 1.378.98L10 15.701l4.169 2.32c.708.47 1.588-.17 1.378-.98l-1.197-4.622 3.6-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18" style="display:inline-block;vertical-align:middle;margin-left:6px;"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" /></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.22a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c.41.847.9 1.636 1.466 2.364l.814-.582a1.5 1.5 0 012.01.124l2.28 2.28a1.5 1.5 0 01.09 2.007l-.64.896a1.5 1.5 0 01-1.678.452l-.985-.328a12.054 12.054 0 01-6.09-6.09l-.328-.985a1.5 1.5 0 01.452-1.678l.896-.64a1.5 1.5 0 012.007.09l2.28 2.28a1.5 1.5 0 01.124 2.01l-.582.814c.728.566 1.517 1.055 2.364 1.466l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.431A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" /></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.555 1.898c.328.203.6.353.79.453l.018.009.005.002zM10 12a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
};

// Section Templates Default & Configuration Data
const TEMPLATE_DEFS = {
    hero: {
        name: 'Hero Header',
        icon: 'fa-window-maximize',
        defaults: {
            layout: 'split',
            title: 'Tingkatkan Penjualan Bisnis Anda Secara Signifikan',
            subtitle: 'Buat landing page berkualitas tinggi, responsif, dan super cepat untuk meningkatkan konversi iklan produk Anda tanpa biaya langganan bulanan.',
            btnPrimaryText: 'Mulai Sekarang',
            btnPrimaryLink: '#pricing',
            btnSecondaryText: 'Pelajari Selengkapnya',
            btnSecondaryLink: '#features',
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80',
            bgOverlay: true
        },
        fields: [
            { id: 'layout', label: 'Layout Style', type: 'select', options: [{ v: 'split', n: 'Split (Text Left, Image Right)' }, { v: 'centered', n: 'Centered Layout' }] },
            { id: 'title', label: 'Headline Title', type: 'text' },
            { id: 'subtitle', label: 'Sub-headline Description', type: 'textarea' },
            { id: 'btnPrimaryText', label: 'Primary Button Text', type: 'text' },
            { id: 'btnPrimaryLink', label: 'Primary Button Link', type: 'text' },
            { id: 'btnSecondaryText', label: 'Secondary Button Text', type: 'text' },
            { id: 'btnSecondaryLink', label: 'Secondary Button Link', type: 'text' },
            { id: 'imageUrl', label: 'Hero Image URL', type: 'text' },
            { id: 'bgOverlay', label: 'Light Gradient Background Accent', type: 'checkbox' }
        ]
    },
    features: {
        name: 'Features Grid',
        icon: 'fa-table-columns',
        defaults: {
            title: 'Kenapa Memilih Layanan Kami?',
            subtitle: 'Kami menawarkan solusi terbaik dengan berbagai fitur unggulan untuk memaksimalkan potensi penjualan Anda.',
            cols: '3',
            items: [
                { title: 'Super Cepat', desc: 'Dioptimalkan untuk memuat halaman dalam waktu kurang dari 1 detik untuk pengalaman pengguna maksimal.', icon: '⚡' },
                { title: 'Mobile Responsive', desc: 'Tampilan yang rapi dan elegan saat diakses dari HP, tablet, maupun komputer desktop.', icon: '📱' },
                { title: 'SEO Friendly', desc: 'Struktur kode HTML yang ramah Google memudahkan produk Anda ditemukan calon pembeli.', icon: '🔍' }
            ]
        },
        fields: [
            { id: 'title', label: 'Section Title', type: 'text' },
            { id: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
            { id: 'cols', label: 'Grid Columns', type: 'select', options: [{ v: '2', n: '2 Columns' }, { v: '3', n: '3 Columns' }, { v: '4', n: '4 Columns' }] },
            {
                id: 'items',
                label: 'Features List',
                type: 'repeater',
                titleField: 'title',
                fields: [
                    { id: 'icon', label: 'Icon/Emoji', type: 'text' },
                    { id: 'title', label: 'Feature Title', type: 'text' },
                    { id: 'desc', label: 'Feature Description', type: 'textarea' }
                ]
            }
        ]
    },
    pricing: {
        name: 'Pricing Table',
        icon: 'fa-tags',
        defaults: {
            title: 'Pilihan Paket Hemat Untuk Anda',
            subtitle: 'Pilih paket investasi terbaik yang sesuai dengan kebutuhan pengembangan bisnis Anda saat ini.',
            items: [
                { name: 'Starter', price: 'Rp 149k', period: 'bulan', desc: 'Cocok untuk pemula yang baru memulai bisnis online.', features: '1 Landing Page\nFree Subdomain\nStandard Support', btnText: 'Pilih Paket', btnLink: '#contact', popular: false },
                { name: 'Business Pro', price: 'Rp 299k', period: 'bulan', desc: 'Rekomendasi terbaik untuk perkembangan bisnis yang cepat.', features: '5 Landing Pages\nCustom Domain\nPriority 24/7 Support\nPremium Copywriting', btnText: 'Beli Sekarang', btnLink: '#contact', popular: true },
                { name: 'Enterprise', price: 'Rp 899k', period: 'tahun', desc: 'Solusi lengkap bagi agensi dan bisnis skala besar.', features: 'Unlimited Pages\nMultiple Domains\nDedicated Account Manager\nCustom Integration API', btnText: 'Hubungi Kami', btnLink: '#contact', popular: false }
            ]
        },
        fields: [
            { id: 'title', label: 'Section Title', type: 'text' },
            { id: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
            {
                id: 'items',
                label: 'Pricing Plans',
                type: 'repeater',
                titleField: 'name',
                fields: [
                    { id: 'name', label: 'Plan Name', type: 'text' },
                    { id: 'price', label: 'Price Display', type: 'text' },
                    { id: 'period', label: 'Billing Period', type: 'text' },
                    { id: 'desc', label: 'Short Description', type: 'text' },
                    { id: 'features', label: 'Features (one per line)', type: 'textarea' },
                    { id: 'btnText', label: 'Button Text', type: 'text' },
                    { id: 'btnLink', label: 'Button URL Link', type: 'text' },
                    { id: 'popular', label: 'Highlight Card (Popular Plan)', type: 'checkbox' }
                ]
            }
        ]
    },
    testimonials: {
        name: 'Testimonials',
        icon: 'fa-quote-left',
        defaults: {
            title: 'Apa Kata Pelanggan Kami?',
            subtitle: 'Ratusan pelaku UMKM dan bisnis online telah membuktikan kehebatan fitur kami untuk konversi iklan mereka.',
            items: [
                { name: 'Ahmad Subarjo', role: 'Owner TokoHerbal.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', quote: 'Luar biasa! Setelah menggunakan template landing page ini, konversi penjualan produk herbal saya meningkat hingga 180%. Sangat direkomendasikan!', rating: '5' },
                { name: 'Diana Lestari', role: 'Founder FashionModern', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', quote: 'Landing page-nya sangat cepat diakses dari HP. CS kami kewalahan menerima chat pesanan WhatsApp semenjak kami beralih ke layout ini.', rating: '5' }
            ]
        },
        fields: [
            { id: 'title', label: 'Section Title', type: 'text' },
            { id: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
            {
                id: 'items',
                label: 'Customer Reviews',
                type: 'repeater',
                titleField: 'name',
                fields: [
                    { id: 'name', label: 'Customer Name', type: 'text' },
                    { id: 'role', label: 'Customer Role/Company', type: 'text' },
                    { id: 'avatar', label: 'Avatar Image URL', type: 'text' },
                    { id: 'quote', label: 'Review Quote', type: 'textarea' },
                    { id: 'rating', label: 'Stars Rating (1-5)', type: 'select', options: [{ v: '1', n: '1 Star' }, { v: '2', n: '2 Stars' }, { v: '3', n: '3 Stars' }, { v: '4', n: '4 Stars' }, { v: '5', n: '5 Stars' }] }
                ]
            }
        ]
    },
    faq: {
        name: 'FAQ Accordion',
        icon: 'fa-circle-question',
        defaults: {
            title: 'Pertanyaan yang Sering Diajukan',
            subtitle: 'Temukan jawaban singkat dan jelas untuk beberapa hal yang sering ditanyakan oleh calon pelanggan kami.',
            items: [
                { q: 'Apakah saya membutuhkan plugin tambahan di WordPress?', a: 'Sama sekali tidak. Kode yang dihasilkan adalah HTML murni yang digabungkan dengan styling CSS internal. Anda hanya perlu menyalin dan menempelkannya ke block Custom HTML di Gutenberg WordPress.' },
                { q: 'Apakah template ini mobile-friendly?', a: 'Ya, semua desain yang kami buat menggunakan pendekatan Mobile-First yang dioptimalkan sepenuhnya agar terlihat sempurna di layar smartphone, tablet, maupun desktop.' }
            ]
        },
        fields: [
            { id: 'title', label: 'Section Title', type: 'text' },
            { id: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
            {
                id: 'items',
                label: 'FAQ Q&A List',
                type: 'repeater',
                titleField: 'q',
                fields: [
                    { id: 'q', label: 'Question', type: 'text' },
                    { id: 'a', label: 'Answer Content', type: 'textarea' }
                ]
            }
        ]
    },
    cta: {
        name: 'Call to Action',
        icon: 'fa-bullhorn',
        defaults: {
            title: 'Siap Melejitkan Omset Bisnis Anda?',
            subtitle: 'Dapatkan akses sekarang juga dan buat landing page impian Anda dalam hitungan menit tanpa batasan apa pun.',
            btnText: 'Hubungi WhatsApp Kami',
            btnLink: 'https://wa.me/628123456789',
            hasGradient: true
        },
        fields: [
            { id: 'title', label: 'CTA Title', type: 'text' },
            { id: 'subtitle', label: 'CTA Description', type: 'textarea' },
            { id: 'btnText', label: 'CTA Button Text', type: 'text' },
            { id: 'btnLink', label: 'CTA Button Link', type: 'text' },
            { id: 'hasGradient', label: 'Use Gradient Glass Background', type: 'checkbox' }
        ]
    },
    contact: {
        name: 'Contact Area',
        icon: 'fa-envelope',
        defaults: {
            title: 'Hubungi Tim Support Kami',
            subtitle: 'Memiliki pertanyaan atau butuh bantuan instalasi? Silakan hubungi kami atau kirim pesan melalui form di bawah.',
            phone: '+62 812-3456-7890',
            email: 'halo@bisnisanda.com',
            address: 'Grand Depok City, Sektor Anggrek Blok C2, Depok, Jawa Barat',
            formEndpoint: '#',
            btnText: 'Kirim Pesan Sekarang'
        },
        fields: [
            { id: 'title', label: 'Section Title', type: 'text' },
            { id: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
            { id: 'phone', label: 'Phone Number Info', type: 'text' },
            { id: 'email', label: 'Email Address Info', type: 'text' },
            { id: 'address', label: 'Physical Address', type: 'text' },
            { id: 'formEndpoint', label: 'Form Submission Endpoint', type: 'text' },
            { id: 'btnText', label: 'Submit Button Text', type: 'text' }
        ]
    },
    footer: {
        name: 'Simple Footer',
        icon: 'fa-border-bottom',
        defaults: {
            copyright: '© 2026 Bisnis Anda. Seluruh Hak Cipta Dilindungi.',
            socialFb: '#',
            socialTw: '#',
            socialIg: '#'
        },
        fields: [
            { id: 'copyright', label: 'Copyright Text', type: 'text' },
            { id: 'socialFb', label: 'Facebook URL Link', type: 'text' },
            { id: 'socialTw', label: 'Twitter/X URL Link', type: 'text' },
            { id: 'socialIg', label: 'Instagram URL Link', type: 'text' }
        ]
    }
};

// FULL-PAGE TEMPLATES PRESETS
const FULL_PAGE_TEMPLATES = {
    saas: {
        config: { primary: '#2563eb', secondary: '#7c3aed', bg: '#ffffff', text: '#1f2937', fontFamily: 'Outfit', containerWidth: 1150, sectionPadding: 70 },
        sections: [
            {
                id: 'hero-saas',
                type: 'hero',
                name: 'Hero Header',
                styles: { customId: 'saas-intro', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 90, paddingBottom: 90 },
                content: {
                    layout: 'split',
                    title: 'Kelola Operasional Bisnis SaaS Anda Lebih Cepat',
                    subtitle: 'Hubungkan seluruh tim Anda di satu platform. Analisis data otomatis, pantau metrik real-time, dan tingkatkan konversi penjualan Anda tanpa ribet.',
                    btnPrimaryText: 'Mulai Uji Coba Gratis',
                    btnPrimaryLink: '#saas-pricing',
                    btnSecondaryText: 'Tonton Demo',
                    btnSecondaryLink: '#saas-features',
                    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
                    bgOverlay: true
                }
            },
            {
                id: 'features-saas',
                type: 'features',
                name: 'Features Grid',
                styles: { customId: 'saas-features', bgType: 'light', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 70, paddingBottom: 70 },
                content: {
                    title: 'Layanan All-In-One Untuk Produktivitas',
                    subtitle: 'Dilengkapi dengan sistem analitik mutakhir untuk menunjang performa produk digital Anda.',
                    cols: '3',
                    items: [
                        { icon: '📈', title: 'Analitik Real-time', desc: 'Grafik transaksi dan data pengunjung diperbarui setiap detik tanpa keterlambatan.' },
                        { icon: '🔒', title: 'Aman & Terenkripsi', desc: 'Sertifikasi keamanan tingkat perbankan untuk menjamin keamanan penuh semua data pengguna.' },
                        { icon: '🚀', title: 'Skalabilitas Tinggi', desc: 'Arsitektur cloud server yang tangguh, siap menampung lonjakan traffic kapan pun.' }
                    ]
                }
            },
            {
                id: 'pricing-saas',
                type: 'pricing',
                name: 'Pricing Table',
                styles: { customId: 'saas-pricing', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 80, paddingBottom: 80 },
                content: {
                    title: 'Paket Harga Investasi Terbaik',
                    subtitle: 'Mulai dengan paket gratis atau pilih lisensi berbayar untuk kapasitas tak terbatas.',
                    items: [
                        { name: 'Starter', price: 'Rp 149k', period: 'bln', desc: 'Cocok untuk proyek personal.', features: '1 Project Dashboard\nStandard Reports\nSupport via Chat', btnText: 'Pilih Starter', btnLink: '#saas-cta', popular: false },
                        { name: 'Pro Premium', price: 'Rp 299k', period: 'bln', desc: 'Terbaik untuk startup berkembang.', features: '5 Project Dashboards\nPremium Realtime Analytics\nPriority Support 24/7\nDeveloper API Integrations', btnText: 'Coba Gratis 14 Hari', btnLink: '#saas-cta', popular: true },
                        { name: 'Agensi', price: 'Rp 899k', period: 'thn', desc: 'Solusi lengkap agensi besar.', features: 'Unlimited Dashboards\nCustom SLA Guarantee\nDedicated Server Infrastructure\nComplete API & Webhooks', btnText: 'Hubungi Sales', btnLink: '#saas-cta', popular: false }
                    ]
                }
            },
            {
                id: 'cta-saas',
                type: 'cta',
                name: 'Call to Action',
                styles: { customId: 'saas-cta', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 60, paddingBottom: 60 },
                content: {
                    title: 'Siap Melejitkan Konversi Bisnis Anda?',
                    subtitle: 'Ribuan pengusaha SaaS telah beralih ke layout kami. Dapatkan akses instan hari ini.',
                    btnText: 'Mulai Uji Coba Gratis Sekarang',
                    btnLink: '#',
                    hasGradient: true
                }
            },
            {
                id: 'faq-saas',
                type: 'faq',
                name: 'FAQ Accordion',
                styles: { customId: 'saas-faq', bgType: 'light', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 70, paddingBottom: 70 },
                content: {
                    title: 'FAQ Layanan Kami',
                    subtitle: 'Menjawab beberapa pertanyaan mendasar mengenai masa garansi dan kompatibilitas sistem.',
                    items: [
                        { q: 'Apakah saya bisa membatalkan langganan kapan saja?', a: 'Tentu saja. Tidak ada kontrak jangka panjang. Anda dapat menonaktifkan akun Anda kapan pun melalui pengaturan panel pembayaran.' },
                        { q: 'Bagaimana kompatibilitas dengan WordPress?', a: 'Sangat kompatibel. Template kami menghasilkan markup HTML statis yang dapat dipasang di blog post maupun halaman WordPress tanpa plugin.' }
                    ]
                }
            },
            {
                id: 'footer-saas',
                type: 'footer',
                name: 'Simple Footer',
                styles: { customId: '', bgType: 'dark', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 40, paddingBottom: 40 },
                content: {
                    copyright: '© 2026 SaaSify Global. Hak Cipta Dilindungi.',
                    socialFb: '#',
                    socialTw: '#',
                    socialIg: '#'
                }
            }
        ]
    },
    sales: {
        config: { primary: '#10b981', secondary: '#f59e0b', bg: '#f9fafb', text: '#111827', fontFamily: 'Space Grotesk', containerWidth: 1100, sectionPadding: 60 },
        sections: [
            {
                id: 'hero-sales',
                type: 'hero',
                name: 'Hero Header',
                styles: { customId: 'product-hero', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 80, paddingBottom: 80 },
                content: {
                    layout: 'centered',
                    title: 'Smart Espresso Maker Pro v2',
                    subtitle: 'Seduh kopi berkualitas tinggi sekelas kafe bintang lima langsung dari kenyamanan dapur rumah Anda sendiri. Dilengkapi kontrol suhu pintar via Bluetooth.',
                    btnPrimaryText: 'Pesan Sekarang (Diskon 50%)',
                    btnPrimaryLink: '#sales-pricing',
                    btnSecondaryText: 'Spesifikasi Mesin',
                    btnSecondaryLink: '#sales-features',
                    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
                    bgOverlay: false
                }
            },
            {
                id: 'features-sales',
                type: 'features',
                name: 'Features Grid',
                styles: { customId: 'sales-features', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 65, paddingBottom: 65 },
                content: {
                    title: 'Keunggulan Utama Smart Brewer',
                    subtitle: 'Detail presisi yang memberikan kenikmatan ekstraksi kopi terbaik untuk rutinitas pagi Anda.',
                    cols: '3',
                    items: [
                        { icon: '☕', title: 'Tekanan Tinggi 19 Bar', desc: 'Menghasilkan ekstraksi aroma kopi yang maksimal dan krema espresso tebal berkilau.' },
                        { icon: '⏱️', title: 'Suhu Presisi PID', desc: 'Sistem pengontrol suhu air elektronik konstan memastikan rasa espresso konsisten tiap cangkir.' },
                        { icon: '🥛', title: 'Milk Frother Steam', desc: 'Busa susu mikro super halus untuk membuat cappuccino, flat white, atau latte art favorit Anda.' }
                    ]
                }
            },
            {
                id: 'testimonials-sales',
                type: 'testimonials',
                name: 'Testimonials',
                styles: { customId: 'sales-testimonials', bgType: 'light', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 70, paddingBottom: 70 },
                content: {
                    title: 'Apa Kata Para Penikmat Kopi?',
                    subtitle: 'Ribuan pelanggan kami kini menikmati kopi segar setiap hari tanpa harus keluar rumah.',
                    items: [
                        { name: 'Dimas Aditya', role: 'Home Barista Enthusiast', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', quote: 'Alat ini mengubah rutinitas pagi saya secara drastis. Ekstraksi espressonya konsisten dan frother-nya sangat bertenaga.', rating: '5' },
                        { name: 'Amelia Putri', role: 'Karyawan Swasta', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', quote: 'Mudah sekali digunakan dan dibersihkan. Desainnya yang modern sangat cocok menghias sudut meja pantry minimalis saya.', rating: '5' }
                    ]
                }
            },
            {
                id: 'cta-sales',
                type: 'cta',
                name: 'Call to Action',
                styles: { customId: 'sales-pricing', bgType: 'primary', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 80, paddingBottom: 80 },
                content: {
                    title: 'Pesan Hari Ini & Dapatkan Bonus Spesial!',
                    subtitle: 'Penawaran diskon 50% hanya berlaku minggu ini. Dapatkan bonus timbangan digital dan 2 bungkus biji kopi arabika premium gratis!',
                    btnText: 'Pesan via WhatsApp (Bayar di Tempat)',
                    btnLink: 'https://wa.me/628123456789?text=Halo%20saya%20mau%20pesan%20Espresso%20Maker%20Pro',
                    hasGradient: false
                }
            },
            {
                id: 'footer-sales',
                type: 'footer',
                name: 'Simple Footer',
                styles: { customId: '', bgType: 'dark', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 40, paddingBottom: 40 },
                content: {
                    copyright: '© 2026 Kopi Smart Indonesia. Seluruh Hak Cipta Dilindungi.',
                    socialFb: '#',
                    socialIg: '#'
                }
            }
        ]
    },
    lead: {
        config: { primary: '#f59e0b', secondary: '#ef4444', bg: '#fffbf5', text: '#374151', fontFamily: 'Outfit', containerWidth: 1000, sectionPadding: 60 },
        sections: [
            {
                id: 'hero-lead',
                type: 'hero',
                name: 'Hero Header',
                styles: { customId: 'lead-intro', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 80, paddingBottom: 80 },
                content: {
                    layout: 'split',
                    title: 'Gratis Ebook: Rahasia Bisnis Online 2026',
                    subtitle: 'Bongkar strategi rahasia menghasilkan omset 10 Juta rupiah pertama dari rumah, hanya dengan modal HP dan kuota internet. Langkah demi langkah untuk pemula.',
                    btnPrimaryText: 'Download Ebook Sekarang',
                    btnPrimaryLink: '#lead-form-sec',
                    btnSecondaryText: 'Lihat Garis Besar Isi',
                    btnSecondaryLink: '#lead-points',
                    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
                    bgOverlay: true
                }
            },
            {
                id: 'features-lead',
                type: 'features',
                name: 'Features Grid',
                styles: { customId: 'lead-points', bgType: 'theme', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 60, paddingBottom: 60 },
                content: {
                    title: 'Apa Saja yang Akan Anda Pelajari?',
                    subtitle: 'Materi terstruktur yang ditulis langsung oleh praktisi digital marketing berpengalaman.',
                    cols: '3',
                    items: [
                        { icon: '🎯', title: 'Riset Produk Terlaris', desc: 'Cara mudah mendeteksi produk yang sedang tren dan memiliki tingkat persaingan rendah.' },
                        { icon: '📣', title: 'Trafik Gratisan', desc: 'Teknik mendatangkan ribuan calon pembeli potensial secara organik tanpa budget iklan berbayar.' },
                        { icon: '💬', title: 'Skrip Chat Penjualan', desc: 'Contoh template obrolan WhatsApp siap pakai untuk mengubah penanya menjadi pembeli aktif.' }
                    ]
                }
            },
            {
                id: 'contact-lead',
                type: 'contact',
                name: 'Contact Area',
                styles: { customId: 'lead-form-sec', bgType: 'light', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 70, paddingBottom: 70 },
                content: {
                    title: 'Formulir Pengiriman Ebook',
                    subtitle: 'Silakan isi nama dan alamat email aktif Anda di bawah. Tautan unduhan file PDF ebook akan dikirimkan otomatis ke kotak masuk email Anda.',
                    phone: '',
                    email: 'dukungan@akademidigital.com',
                    address: 'Akademi Digital Center, Jakarta, Indonesia',
                    formEndpoint: 'https://formspree.io/f/your-id',
                    btnText: 'Kirim Tautan Download Ebook'
                }
            },
            {
                id: 'footer-lead',
                type: 'footer',
                name: 'Simple Footer',
                styles: { customId: '', bgType: 'dark', bgColor: '#ffffff', textColor: '#1f2937', paddingTop: 45, paddingBottom: 45 },
                content: {
                    copyright: '© 2026 Akademi Digital Indonesia. Hak Cipta Dilindungi.',
                    socialFb: '#',
                    socialTw: '#',
                    socialIg: '#'
                }
            }
        ]
    }
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    setupTabNav();
    setupColorPickers();
    setupPresetBtns();
    setupSliders();
    setupAddSectionHandlers();
    setupModeToggle();
    setupDeviceToggles();
    setupCopyBtn();
    setupDownloadBtn();
    setupProjectIO();
    setupTemplateLoaders();

    // Add initial Hero & Features & CTA sections to show something beautiful on load
    loadTemplate('saas');
});

// 1. TAB NAVIGATION
function setupTabNav() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const contentId = tab.getAttribute('data-tab');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(contentId).classList.add('active');
        });
    });
}

// 2. COLOR PICKERS
function setupColorPickers() {
    const pickers = ['primary', 'secondary', 'bg', 'text'];
    pickers.forEach(id => {
        const input = document.getElementById(`color-${id}`);
        input.addEventListener('input', (e) => {
            pageState.config[id] = e.target.value;
            e.target.nextElementSibling.textContent = e.target.value.toUpperCase();
            
            // Remove active style from presets
            document.querySelectorAll('.preset-btn').forEach(p => p.classList.remove('active'));
            
            render();
        });
    });
}

// 3. PRESET BUTTONS
function setupPresetBtns() {
    const btns = document.querySelectorAll('.preset-btn[data-preset]');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.preset-btn[data-preset]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const presetName = btn.getAttribute('data-preset');
            const values = PRESETS[presetName];
            if (values) {
                applyThemeColors(values);
                render();
            }
        });
    });
}

function applyThemeColors(values) {
    pageState.config.primary = values.primary;
    pageState.config.secondary = values.secondary;
    pageState.config.bg = values.bg;
    pageState.config.text = values.text;

    // Sync color inputs UI
    document.getElementById('color-primary').value = values.primary;
    document.getElementById('color-primary').nextElementSibling.textContent = values.primary.toUpperCase();

    document.getElementById('color-secondary').value = values.secondary;
    document.getElementById('color-secondary').nextElementSibling.textContent = values.secondary.toUpperCase();

    document.getElementById('color-bg').value = values.bg;
    document.getElementById('color-bg').nextElementSibling.textContent = values.bg.toUpperCase();

    document.getElementById('color-text').value = values.text;
    document.getElementById('color-text').nextElementSibling.textContent = values.text.toUpperCase();
}

// 4. RANGE SLIDERS & FONTS
function setupSliders() {
    const configItems = [
        { id: 'container-width', key: 'containerWidth', suffix: 'px' },
        { id: 'section-padding', key: 'sectionPadding', suffix: 'px' }
    ];

    configItems.forEach(item => {
        const slider = document.getElementById(item.id);
        slider.addEventListener('input', (e) => {
            pageState.config[item.key] = parseInt(e.target.value);
            slider.nextElementSibling.textContent = e.target.value + item.suffix;
            render();
        });
    });

    const fontSelect = document.getElementById('font-family');
    fontSelect.addEventListener('change', (e) => {
        pageState.config.fontFamily = e.target.value;
        render();
    });
}

// 5. ADD SECTIONS HANDLERS
function setupAddSectionHandlers() {
    const addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            addSection(type);
            
            // Switch to outline view tab
            const sectionsTabBtn = document.querySelector('[data-tab="sections-tab"]');
            if (sectionsTabBtn) sectionsTabBtn.click();
        });
    });
}

function addSection(type) {
    const def = TEMPLATE_DEFS[type];
    if (!def) return;

    // Deep copy defaults
    const content = JSON.parse(JSON.stringify(def.defaults));
    const id = type + '-' + Date.now();

    pageState.sections.push({
        id: id,
        type: type,
        name: def.name,
        styles: {
            customId: '',
            bgType: 'theme',
            bgColor: '#f9fafb',
            textColor: '#1f2937',
            paddingTop: pageState.config.sectionPadding,
            paddingBottom: pageState.config.sectionPadding
        },
        content: content
    });

    pageState.activeSectionId = id;
    updateOutlineUI();
    render();
    editSection(id);
}

// 6. UPDATE SECTION OUTLINE LIST
function updateOutlineUI() {
    const list = document.getElementById('active-sections-list');
    const emptyMsg = document.querySelector('.empty-outline-msg');

    if (pageState.sections.length === 0) {
        list.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';
    list.innerHTML = '';

    pageState.sections.forEach((section, index) => {
        const li = document.createElement('li');
        li.className = `section-item ${section.id === pageState.activeSectionId ? 'active-item' : ''}`;
        li.setAttribute('data-id', section.id);

        const iconClass = TEMPLATE_DEFS[section.type]?.icon || 'fa-cube';

        li.innerHTML = `
            <div class="section-info">
                <i class="fa-solid ${iconClass}"></i>
                <span class="section-name">${section.name} ${section.styles?.customId ? `<span style="font-size:10px; opacity:0.6; font-weight:normal;">(#${section.styles.customId})</span>` : ''}</span>
            </div>
            <div class="section-actions">
                <button class="action-icon-btn move-up" title="Pindahkan Ke Atas" ${index === 0 ? 'disabled style="opacity:0.3;cursor:default;"' : ''}>
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
                <button class="action-icon-btn move-down" title="Pindahkan Ke Bawah" ${index === pageState.sections.length - 1 ? 'disabled style="opacity:0.3;cursor:default;"' : ''}>
                    <i class="fa-solid fa-arrow-down"></i>
                </button>
                <button class="action-icon-btn edit-btn" title="Edit Isi Konten">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="action-icon-btn trash-btn" title="Hapus Section">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        // Selection click
        li.querySelector('.section-info').addEventListener('click', () => {
            pageState.activeSectionId = section.id;
            updateOutlineSelection();
            editSection(section.id);
        });

        // Edit button click
        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            pageState.activeSectionId = section.id;
            updateOutlineSelection();
            editSection(section.id);
        });

        // Move Up click
        li.querySelector('.move-up').addEventListener('click', (e) => {
            e.stopPropagation();
            if (index > 0) {
                const temp = pageState.sections[index];
                pageState.sections[index] = pageState.sections[index - 1];
                pageState.sections[index - 1] = temp;
                updateOutlineUI();
                render();
            }
        });

        // Move Down click
        li.querySelector('.move-down').addEventListener('click', (e) => {
            e.stopPropagation();
            if (index < pageState.sections.length - 1) {
                const temp = pageState.sections[index];
                pageState.sections[index] = pageState.sections[index + 1];
                pageState.sections[index + 1] = temp;
                updateOutlineUI();
                render();
            }
        });

        // Delete Click
        li.querySelector('.trash-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            pageState.sections.splice(index, 1);
            if (pageState.activeSectionId === section.id) {
                pageState.activeSectionId = pageState.sections.length > 0 ? pageState.sections[pageState.sections.length - 1].id : null;
            }
            updateOutlineUI();
            render();
            if (pageState.activeSectionId) {
                editSection(pageState.activeSectionId);
            } else {
                showEmptyEditState();
            }
        });

        list.appendChild(li);
    });
}

function updateOutlineSelection() {
    document.querySelectorAll('.section-item').forEach(item => {
        const id = item.getAttribute('data-id');
        if (id === pageState.activeSectionId) {
            item.classList.add('active-item');
        } else {
            item.classList.remove('active-item');
        }
    });
}

// 7. EDIT CONTENT SECTION PANEL (With Section Specific Styles)
function showEmptyEditState() {
    document.querySelector('.edit-no-selection').style.display = 'block';
    document.getElementById('edit-fields-container').style.display = 'none';
}

function editSection(id) {
    const section = pageState.sections.find(s => s.id === id);
    if (!section) {
        showEmptyEditState();
        return;
    }

    // Switch to edit content tab in sidebar
    document.getElementById('edit-tab-btn').click();

    document.querySelector('.edit-no-selection').style.display = 'none';
    const container = document.getElementById('edit-fields-container');
    container.style.display = 'block';
    container.innerHTML = '';

    const def = TEMPLATE_DEFS[section.type];
    
    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'edit-header-row';
    headerRow.innerHTML = `
        <span class="edit-title-name">Edit: ${section.name}</span>
        <button class="edit-back-btn" id="edit-back-to-sections"><i class="fa-solid fa-arrow-left"></i> Kembali</button>
    `;
    headerRow.querySelector('#edit-back-to-sections').addEventListener('click', () => {
        document.querySelector('[data-tab="sections-tab"]').click();
    });
    container.appendChild(headerRow);

    // Initialize custom style object if not present
    if (!section.styles) {
        section.styles = {
            customId: '',
            bgType: 'theme',
            bgColor: '#f9fafb',
            textColor: '#1f2937',
            paddingTop: pageState.config.sectionPadding,
            paddingBottom: pageState.config.sectionPadding
        };
    }

    // 7.1 APPEARANCE / STYLE PANEL FOR THIS SECTION
    const styleHeading = document.createElement('h4');
    styleHeading.style.fontSize = '13px';
    styleHeading.style.textTransform = 'uppercase';
    styleHeading.style.color = 'var(--text-muted)';
    styleHeading.style.marginTop = '10px';
    styleHeading.style.marginBottom = '12px';
    styleHeading.style.borderBottom = '1px solid var(--border-color)';
    styleHeading.style.paddingBottom = '6px';
    styleHeading.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Gaya Tampilan Seksi`;
    container.appendChild(styleHeading);

    // Custom CSS ID field
    const idGroup = document.createElement('div');
    idGroup.className = 'control-group';
    idGroup.innerHTML = `
        <label>Custom HTML ID (untuk link anchor, misal: 'pricing')</label>
        <input type="text" id="sec-style-id" placeholder="Masukkan ID tanpa tanda #" value="${section.styles.customId || ''}">
    `;
    idGroup.querySelector('input').addEventListener('input', (e) => {
        section.styles.customId = e.target.value.replace(/\s+/g, '-').toLowerCase();
        // Update section name indicator in Outline UI
        updateOutlineUI();
        render();
    });
    container.appendChild(idGroup);

    // Background Type picker
    const bgTypeGroup = document.createElement('div');
    bgTypeGroup.className = 'control-group';
    bgTypeGroup.innerHTML = `
        <label>Tipe Latar Belakang (Background)</label>
        <select id="sec-style-bg-type">
            <option value="theme" ${section.styles.bgType === 'theme' ? 'selected' : ''}>Default Halaman (Global)</option>
            <option value="light" ${section.styles.bgType === 'light' ? 'selected' : ''}>Putih Bersih / Light Slate</option>
            <option value="dark" ${section.styles.bgType === 'dark' ? 'selected' : ''}>Gelap / Dark Slate</option>
            <option value="primary" ${section.styles.bgType === 'primary' ? 'selected' : ''}>Warna Utama (Brand Accent)</option>
            <option value="custom" ${section.styles.bgType === 'custom' ? 'selected' : ''}>Kustom Warna Sendiri...</option>
        </select>
    `;
    container.appendChild(bgTypeGroup);

    // Custom Colors Wrapper (Only visible if background type is custom)
    const customColorsWrapper = document.createElement('div');
    customColorsWrapper.className = 'color-picker-group';
    customColorsWrapper.style.display = section.styles.bgType === 'custom' ? 'flex' : 'none';
    customColorsWrapper.style.marginBottom = '16px';
    customColorsWrapper.innerHTML = `
        <label>
            <span>Background Custom</span>
            <div class="color-input-wrapper">
                <input type="color" id="sec-style-bg-custom" value="${section.styles.bgColor || '#ffffff'}">
                <span class="color-hex">${(section.styles.bgColor || '#ffffff').toUpperCase()}</span>
            </div>
        </label>
        <label>
            <span>Text Custom</span>
            <div class="color-input-wrapper">
                <input type="color" id="sec-style-text-custom" value="${section.styles.textColor || '#1f2937'}">
                <span class="color-hex">${(section.styles.textColor || '#1f2937').toUpperCase()}</span>
            </div>
        </label>
    `;

    customColorsWrapper.querySelector('#sec-style-bg-custom').addEventListener('input', (e) => {
        section.styles.bgColor = e.target.value;
        e.target.nextElementSibling.textContent = e.target.value.toUpperCase();
        render();
    });
    customColorsWrapper.querySelector('#sec-style-text-custom').addEventListener('input', (e) => {
        section.styles.textColor = e.target.value;
        e.target.nextElementSibling.textContent = e.target.value.toUpperCase();
        render();
    });

    container.appendChild(customColorsWrapper);

    bgTypeGroup.querySelector('select').addEventListener('change', (e) => {
        section.styles.bgType = e.target.value;
        customColorsWrapper.style.display = e.target.value === 'custom' ? 'flex' : 'none';
        render();
    });

    // Custom Padding top/bottom sliders
    const padTopGroup = document.createElement('div');
    padTopGroup.className = 'control-group';
    padTopGroup.innerHTML = `
        <label>Padding Atas (Top)</label>
        <div class="range-wrapper">
            <input type="range" min="0" max="150" step="10" value="${section.styles.paddingTop !== undefined ? section.styles.paddingTop : 70}">
            <span class="range-val">${section.styles.paddingTop !== undefined ? section.styles.paddingTop : 70}px</span>
        </div>
    `;
    padTopGroup.querySelector('input').addEventListener('input', (e) => {
        section.styles.paddingTop = parseInt(e.target.value);
        padTopGroup.querySelector('.range-val').textContent = e.target.value + 'px';
        render();
    });
    container.appendChild(padTopGroup);

    const padBotGroup = document.createElement('div');
    padBotGroup.className = 'control-group';
    padBotGroup.innerHTML = `
        <label>Padding Bawah (Bottom)</label>
        <div class="range-wrapper">
            <input type="range" min="0" max="150" step="10" value="${section.styles.paddingBottom !== undefined ? section.styles.paddingBottom : 70}">
            <span class="range-val">${section.styles.paddingBottom !== undefined ? section.styles.paddingBottom : 70}px</span>
        </div>
    `;
    padBotGroup.querySelector('input').addEventListener('input', (e) => {
        section.styles.paddingBottom = parseInt(e.target.value);
        padBotGroup.querySelector('.range-val').textContent = e.target.value + 'px';
        render();
    });
    container.appendChild(padBotGroup);


    // 7.2 CONTENT FIELDS
    const contentHeading = document.createElement('h4');
    contentHeading.style.fontSize = '13px';
    contentHeading.style.textTransform = 'uppercase';
    contentHeading.style.color = 'var(--text-muted)';
    contentHeading.style.marginTop = '24px';
    contentHeading.style.marginBottom = '12px';
    contentHeading.style.borderBottom = '1px solid var(--border-color)';
    contentHeading.style.paddingBottom = '6px';
    contentHeading.innerHTML = `<i class="fa-solid fa-file-signature"></i> Isi Konten`;
    container.appendChild(contentHeading);

    // Build form inputs dynamically for content fields
    def.fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.className = 'control-group';

        const label = document.createElement('label');
        label.textContent = field.label;
        formGroup.appendChild(label);

        if (field.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = section.content[field.id] || '';
            input.addEventListener('input', (e) => {
                section.content[field.id] = e.target.value;
                render();
            });
            formGroup.appendChild(input);
        } 
        else if (field.type === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.rows = field.id === 'features' || field.id === 'subtitle' ? 4 : 3;
            textarea.value = section.content[field.id] || '';
            textarea.addEventListener('input', (e) => {
                section.content[field.id] = e.target.value;
                render();
            });
            formGroup.appendChild(textarea);
        } 
        else if (field.type === 'checkbox') {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '10px';
            wrapper.style.marginTop = '6px';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `chk-${field.id}`;
            checkbox.checked = !!section.content[field.id];
            checkbox.style.width = '18px';
            checkbox.style.height = '18px';
            checkbox.addEventListener('change', (e) => {
                section.content[field.id] = e.target.checked;
                render();
            });

            const subLabel = document.createElement('label');
            subLabel.htmlFor = `chk-${field.id}`;
            subLabel.textContent = 'Aktifkan';
            subLabel.style.margin = '0';
            subLabel.style.cursor = 'pointer';

            wrapper.appendChild(checkbox);
            wrapper.appendChild(subLabel);
            formGroup.appendChild(wrapper);
        } 
        else if (field.type === 'select') {
            const select = document.createElement('select');
            field.options.forEach(opt => {
                const o = document.createElement('option');
                o.value = opt.v;
                o.textContent = opt.n;
                if (opt.v === section.content[field.id]) o.selected = true;
                select.appendChild(o);
            });
            select.addEventListener('change', (e) => {
                section.content[field.id] = e.target.value;
                render();
            });
            formGroup.appendChild(select);
        } 
        else if (field.type === 'repeater') {
            const repeaterContainer = document.createElement('div');
            repeaterContainer.className = 'repeater-container';

            const items = section.content[field.id] || [];

            const renderRepeaterItems = () => {
                repeaterContainer.innerHTML = '';
                items.forEach((item, idx) => {
                    const card = document.createElement('div');
                    card.className = 'repeater-card';

                    const cardHeader = document.createElement('div');
                    cardHeader.className = 'repeater-card-header';
                    cardHeader.innerHTML = `
                        <span>Item #${idx + 1}: ${item[field.titleField] || 'Item'}</span>
                        <button class="repeater-card-delete" data-idx="${idx}"><i class="fa-solid fa-trash"></i> Hapus</button>
                    `;
                    cardHeader.querySelector('.repeater-card-delete').addEventListener('click', (e) => {
                        items.splice(idx, 1);
                        renderRepeaterItems();
                        render();
                    });
                    card.appendChild(cardHeader);

                    // Add fields for this item
                    field.fields.forEach(subField => {
                        const subGroup = document.createElement('div');
                        subGroup.className = 'control-group';
                        subGroup.style.marginBottom = '8px';

                        const subLabel = document.createElement('label');
                        subLabel.textContent = subField.label;
                        subLabel.style.fontSize = '12px';
                        subLabel.style.marginBottom = '4px';
                        subGroup.appendChild(subLabel);

                        if (subField.type === 'text') {
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.style.padding = '6px 10px';
                            input.style.fontSize = '12px';
                            input.value = item[subField.id] || '';
                            input.addEventListener('input', (e) => {
                                item[subField.id] = e.target.value;
                                render();
                            });
                            subGroup.appendChild(input);
                        } else if (subField.type === 'textarea') {
                            const textarea = document.createElement('textarea');
                            textarea.rows = 2;
                            textarea.style.padding = '6px 10px';
                            textarea.style.fontSize = '12px';
                            textarea.value = item[subField.id] || '';
                            textarea.addEventListener('input', (e) => {
                                item[subField.id] = e.target.value;
                                render();
                            });
                            subGroup.appendChild(textarea);
                        } else if (subField.type === 'checkbox') {
                            const cwrapper = document.createElement('div');
                            cwrapper.style.display = 'flex';
                            cwrapper.style.alignItems = 'center';
                            cwrapper.style.gap = '8px';
                            cwrapper.style.marginTop = '4px';

                            const chk = document.createElement('input');
                            chk.type = 'checkbox';
                            chk.checked = !!item[subField.id];
                            chk.addEventListener('change', (e) => {
                                item[subField.id] = e.target.checked;
                                render();
                            });

                            const chkLbl = document.createElement('span');
                            chkLbl.textContent = 'Highlight';
                            chkLbl.style.fontSize = '11px';

                            cwrapper.appendChild(chk);
                            cwrapper.appendChild(chkLbl);
                            subGroup.appendChild(cwrapper);
                        } else if (subField.type === 'select') {
                            const sel = document.createElement('select');
                            sel.style.padding = '6px 10px';
                            sel.style.fontSize = '12px';
                            subField.options.forEach(opt => {
                                const o = document.createElement('option');
                                o.value = opt.v;
                                o.textContent = opt.n;
                                if (opt.v === item[subField.id]) o.selected = true;
                                sel.appendChild(o);
                            });
                            sel.addEventListener('change', (e) => {
                                item[subField.id] = e.target.value;
                                render();
                            });
                            subGroup.appendChild(sel);
                        }

                        card.appendChild(subGroup);
                    });

                    repeaterContainer.appendChild(card);
                });

                // Add button for repeater
                const addRepBtn = document.createElement('button');
                addRepBtn.className = 'add-repeater-btn';
                addRepBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Tambah Item Baru`;
                addRepBtn.addEventListener('click', () => {
                    const newItem = {};
                    field.fields.forEach(sf => {
                        newItem[sf.id] = sf.type === 'checkbox' ? false : (sf.type === 'select' ? sf.options[0].v : '');
                    });
                    items.push(newItem);
                    renderRepeaterItems();
                    render();
                });
                repeaterContainer.appendChild(addRepBtn);
            };

            renderRepeaterItems();
            formGroup.appendChild(repeaterContainer);
        }

        container.appendChild(formGroup);
    });
}

// 8. PREVIEW & CODE MODES
function setupModeToggle() {
    const previewBtn = document.getElementById('mode-preview-btn');
    const codeBtn = document.getElementById('mode-code-btn');
    const previewPanel = document.getElementById('preview-panel');
    const codePanel = document.getElementById('code-panel');
    const deviceToggles = document.getElementById('device-toggles-container');

    previewBtn.addEventListener('click', () => {
        previewBtn.classList.add('active');
        codeBtn.classList.remove('active');
        previewPanel.classList.remove('hidden');
        previewPanel.style.display = 'flex';
        codePanel.classList.add('hidden');
        deviceToggles.style.display = 'flex';
    });

    codeBtn.addEventListener('click', () => {
        codeBtn.classList.add('active');
        previewBtn.classList.remove('active');
        previewPanel.classList.add('hidden');
        previewPanel.style.display = 'none';
        codePanel.classList.remove('hidden');
        deviceToggles.style.display = 'none';
    });
}

// 9. DEVICE VIEW TOGGLES
function setupDeviceToggles() {
    const btns = document.querySelectorAll('.device-btn');
    const wrapper = document.getElementById('iframe-wrapper');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const device = btn.getAttribute('data-device');
            wrapper.className = 'iframe-wrapper ' + device + '-width';
        });
    });
}

// 10. PRE-MADE TEMPLATE LOADERS
function setupTemplateLoaders() {
    ['saas', 'sales', 'lead'].forEach(type => {
        const btn = document.getElementById(`load-tpl-${type}`);
        if (btn) {
            btn.addEventListener('click', () => {
                if (confirm(`Apakah Anda yakin ingin memuat template ${type.toUpperCase()}? Layout desain saat ini akan terhapus.`)) {
                    loadTemplate(type);
                    
                    // Show animation / feedback
                    btn.style.opacity = '0.7';
                    const originalHtml = btn.innerHTML;
                    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;
                    setTimeout(() => {
                        btn.style.opacity = '1';
                        btn.innerHTML = originalHtml;
                    }, 800);
                }
            });
        }
    });
}

function loadTemplate(type) {
    const tpl = FULL_PAGE_TEMPLATES[type];
    if (!tpl) return;

    // Apply config
    pageState.config = JSON.parse(JSON.stringify(tpl.config));
    
    // Apply sections (deep copy to avoid mutation of constant templates)
    pageState.sections = JSON.parse(JSON.stringify(tpl.sections));

    // Update global sliders UI to sync
    document.getElementById('container-width').value = pageState.config.containerWidth;
    document.getElementById('container-width').nextElementSibling.textContent = pageState.config.containerWidth + 'px';
    
    document.getElementById('section-padding').value = pageState.config.sectionPadding;
    document.getElementById('section-padding').nextElementSibling.textContent = pageState.config.sectionPadding + 'px';
    
    document.getElementById('font-family').value = pageState.config.fontFamily;

    // Sync theme colors UI
    applyThemeColors(pageState.config);

    // Reset editing states
    pageState.activeSectionId = pageState.sections.length > 0 ? pageState.sections[0].id : null;

    updateOutlineUI();
    render();
    
    if (pageState.activeSectionId) {
        editSection(pageState.activeSectionId);
    } else {
        showEmptyEditState();
    }
}

// 11. DOWNLOAD AS COMPLETED HTML FILE
function setupDownloadBtn() {
    const btn = document.getElementById('download-html-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const code = document.getElementById('code-output').textContent;
            
            // Create BLOB link for local browser download
            const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'wp-landing-page.html');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
}

// 12. PROJECT JSON IMPORT & EXPORT
function setupProjectIO() {
    const exportBtn = document.getElementById('export-json-btn');
    const importBtn = document.getElementById('import-json-btn');
    const fileInput = document.getElementById('import-file-input');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const dataStr = JSON.stringify(pageState, null, 4);
            const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'wp-layout-backup.json');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }

    if (importBtn && fileInput) {
        importBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (parsed && parsed.config && Array.isArray(parsed.sections)) {
                        pageState = parsed;
                        
                        // Sync slider controls
                        document.getElementById('container-width').value = pageState.config.containerWidth;
                        document.getElementById('container-width').nextElementSibling.textContent = pageState.config.containerWidth + 'px';
                        document.getElementById('section-padding').value = pageState.config.sectionPadding;
                        document.getElementById('section-padding').nextElementSibling.textContent = pageState.config.sectionPadding + 'px';
                        document.getElementById('font-family').value = pageState.config.fontFamily;

                        applyThemeColors(pageState.config);

                        // Reset editing states
                        pageState.activeSectionId = pageState.sections.length > 0 ? pageState.sections[0].id : null;
                        
                        updateOutlineUI();
                        render();
                        if (pageState.activeSectionId) {
                            editSection(pageState.activeSectionId);
                        } else {
                            showEmptyEditState();
                        }
                        
                        alert('Project JSON berhasil dimuat!');
                    } else {
                        alert('Format file JSON tidak valid!');
                    }
                } catch (err) {
                    console.error(err);
                    alert('Gagal membaca file JSON layout: ' + err.message);
                }
                // Clear input value
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    }
}

// 13. GENERATE CODE & RENDER IN PREVIEW
function render() {
    const generatedHtml = compileHtml();
    const generatedCss = compileCss();

    // Combined block for WP Code
    const combinedOutput = `<!-- WordPress Custom Page Layout - Generated with WP PageGen -->
<div class="wppg-page-container">
    <style>
${generatedCss}
    </style>

    <div class="wppg-content-sections">
${generatedHtml}
    </div>
</div>
<!-- End WordPress Custom Page Layout -->`;

    // 1. Output raw code to view
    document.getElementById('code-output').textContent = combinedOutput;

    // 2. Render inside Preview iframe
    const iframe = document.getElementById('preview-iframe');
    if (iframe) {
        const fontImport = pageState.config.fontFamily !== 'System' 
            ? `<link href="https://fonts.googleapis.com/css2?family=${pageState.config.fontFamily.replace(' ', '+')}:wght@300;400;600;700;800&display=swap" rel="stylesheet">`
            : '';

        const iframeDocContent = `<!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${fontImport}
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #ffffff;
                    color: #1f2937;
                }
                .wppg-page-container {
                    font-family: '${pageState.config.fontFamily === 'System' ? 'system-ui, -apple-system, sans-serif' : pageState.config.fontFamily}', sans-serif;
                }
                ${generatedCss}
            </style>
        </head>
        <body>
            <div class="wppg-page-container">
                <div class="wppg-content-sections">
                    ${generatedHtml}
                </div>
            </div>
        </body>
        </html>`;

        iframe.srcdoc = iframeDocContent;
    }
}

// 14. COMPILING HTML FROM LAYOUTS
function compileHtml() {
    if (pageState.sections.length === 0) {
        return `<div style="padding: 100px 20px; text-align: center; font-family: sans-serif; color: #94a3b8;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="margin: 0 auto 16px auto; display:block; opacity: 0.5;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style="margin: 0 0 8px 0; color: #475569; text-transform: none;">Halaman Kosong</h3>
            <p style="margin:0; font-size:14px;">Silakan tambahkan seksi melalui tab "Sections" di sebelah kiri atau muat salah satu template halaman.</p>
        </div>`;
    }

    let html = '';
    pageState.sections.forEach(section => {
        const c = section.content;
        
        // Determine ID to write inside tag
        const elementId = section.styles?.customId ? section.styles.customId : section.id;
        
        // Determine background type class to apply specific global styles if using light/dark/primary
        const bgClass = section.styles?.bgType ? `wppg-bg-${section.styles.bgType}` : 'wppg-bg-theme';

        switch (section.type) {
            case 'hero':
                if (c.layout === 'split') {
                    html += `
        <!-- Hero Split Section -->
        <section class="wppg-hero wppg-hero-split ${bgClass}" id="${elementId}">
            ${c.bgOverlay ? '<div class="wppg-hero-accent-circle"></div>' : ''}
            <div class="wppg-container">
                <div class="wppg-hero-grid">
                    <div class="wppg-hero-content">
                        <h1 class="wppg-hero-title">${c.title}</h1>
                        <p class="wppg-hero-text">${c.subtitle}</p>
                        <div class="wppg-hero-btns">
                            ${c.btnPrimaryText ? `<a href="${c.btnPrimaryLink}" class="wppg-btn wppg-btn-primary">${c.btnPrimaryText}</a>` : ''}
                            ${c.btnSecondaryText ? `<a href="${c.btnSecondaryLink}" class="wppg-btn wppg-btn-secondary">${c.btnSecondaryText}</a>` : ''}
                        </div>
                    </div>
                    <div class="wppg-hero-image-wrap">
                        ${c.imageUrl ? `<img src="${c.imageUrl}" alt="Hero Image" class="wppg-hero-image">` : ''}
                    </div>
                </div>
            </div>
        </section>\n`;
                } else {
                    html += `
        <!-- Hero Centered Section -->
        <section class="wppg-hero wppg-hero-centered ${bgClass}" id="${elementId}">
            ${c.bgOverlay ? '<div class="wppg-hero-accent-circle centered-circle"></div>' : ''}
            <div class="wppg-container">
                <div class="wppg-hero-content-center">
                    <h1 class="wppg-hero-title">${c.title}</h1>
                    <p class="wppg-hero-text">${c.subtitle}</p>
                    <div class="wppg-hero-btns wppg-flex-center">
                        ${c.btnPrimaryText ? `<a href="${c.btnPrimaryLink}" class="wppg-btn wppg-btn-primary">${c.btnPrimaryText}</a>` : ''}
                        ${c.btnSecondaryText ? `<a href="${c.btnSecondaryLink}" class="wppg-btn wppg-btn-secondary">${c.btnSecondaryText}</a>` : ''}
                    </div>
                    ${c.imageUrl ? `
                    <div class="wppg-hero-image-wrap-centered">
                        <img src="${c.imageUrl}" alt="Hero Image Centered" class="wppg-hero-image">
                    </div>` : ''}
                </div>
            </div>
        </section>\n`;
                }
                break;

            case 'features':
                let colClass = `wppg-cols-${c.cols || '3'}`;
                let featuresHtml = '';
                if (c.items && c.items.length > 0) {
                    c.items.forEach(item => {
                        featuresHtml += `
                    <div class="wppg-feature-card">
                        <div class="wppg-feature-icon">${item.icon || '⭐'}</div>
                        <h3 class="wppg-feature-card-title">${item.title}</h3>
                        <p class="wppg-feature-card-desc">${item.desc}</p>
                    </div>`;
                    });
                }
                html += `
        <!-- Features Section -->
        <section class="wppg-features ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-section-header">
                    <h2 class="wppg-section-title">${c.title}</h2>
                    <p class="wppg-section-subtitle">${c.subtitle}</p>
                </div>
                <div class="wppg-grid ${colClass}">
                    ${featuresHtml}
                </div>
            </div>
        </section>\n`;
                break;

            case 'pricing':
                let pricingHtml = '';
                if (c.items && c.items.length > 0) {
                    c.items.forEach(item => {
                        const featuresList = (item.features || '').split('\n').filter(f => f.trim() !== '');
                        let featuresLiHtml = '';
                        featuresList.forEach(f => {
                            featuresLiHtml += `<li>${SVG_ICONS.checkmark} <span>${f}</span></li>`;
                        });

                        pricingHtml += `
                    <div class="wppg-pricing-card ${item.popular ? 'wppg-pricing-popular' : ''}">
                        ${item.popular ? '<div class="wppg-pricing-badge">Populer</div>' : ''}
                        <h3 class="wppg-pricing-plan">${item.name}</h3>
                        <div class="wppg-pricing-amount">${item.price}<span class="wppg-pricing-period">/${item.period}</span></div>
                        <p class="wppg-pricing-desc">${item.desc}</p>
                        <ul class="wppg-pricing-features">
                            ${featuresLiHtml}
                        </ul>
                        <div class="wppg-pricing-action">
                            <a href="${item.btnLink}" class="wppg-btn ${item.popular ? 'wppg-btn-primary' : 'wppg-btn-outline'} wppg-btn-block">${item.btnText}</a>
                        </div>
                    </div>`;
                    });
                }
                html += `
        <!-- Pricing Table Section -->
        <section class="wppg-pricing ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-section-header">
                    <h2 class="wppg-section-title">${c.title}</h2>
                    <p class="wppg-section-subtitle">${c.subtitle}</p>
                </div>
                <div class="wppg-grid wppg-cols-3">
                    ${pricingHtml}
                </div>
            </div>
        </section>\n`;
                break;

            case 'testimonials':
                let testimonialsHtml = '';
                if (c.items && c.items.length > 0) {
                    c.items.forEach(item => {
                        let starsHtml = '';
                        const ratingNum = parseInt(item.rating || '5');
                        for (let i = 0; i < 5; i++) {
                            starsHtml += i < ratingNum ? SVG_ICONS.star : `<span style="color:#d1d5db;">★</span>`;
                        }

                        testimonialsHtml += `
                    <div class="wppg-testimonial-card">
                        <div class="wppg-testimonial-stars">${starsHtml}</div>
                        <p class="wppg-testimonial-quote">"${item.quote}"</p>
                        <div class="wppg-testimonial-user">
                            <img src="${item.avatar || 'https://via.placeholder.com/150'}" alt="${item.name}" class="wppg-testimonial-avatar">
                            <div>
                                <h4 class="wppg-testimonial-name">${item.name}</h4>
                                <p class="wppg-testimonial-role">${item.role}</p>
                            </div>
                        </div>
                    </div>`;
                    });
                }
                html += `
        <!-- Testimonials Section -->
        <section class="wppg-testimonials ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-section-header">
                    <h2 class="wppg-section-title">${c.title}</h2>
                    <p class="wppg-section-subtitle">${c.subtitle}</p>
                </div>
                <div class="wppg-grid wppg-cols-3">
                    ${testimonialsHtml}
                </div>
            </div>
        </section>\n`;
                break;

            case 'faq':
                let faqHtml = '';
                if (c.items && c.items.length > 0) {
                    c.items.forEach(item => {
                        faqHtml += `
                    <details class="wppg-faq-item">
                        <summary class="wppg-faq-question">
                            <span>${item.q}</span>
                            <span class="wppg-faq-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </span>
                        </summary>
                        <div class="wppg-faq-answer">
                            <p>${item.a}</p>
                        </div>
                    </details>`;
                    });
                }
                html += `
        <!-- FAQ Section -->
        <section class="wppg-faq ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-section-header">
                    <h2 class="wppg-section-title">${c.title}</h2>
                    <p class="wppg-section-subtitle">${c.subtitle}</p>
                </div>
                <div class="wppg-faq-list">
                    ${faqHtml}
                </div>
            </div>
        </section>\n`;
                break;

            case 'cta':
                html += `
        <!-- Call to Action Section -->
        <section class="wppg-cta ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-cta-box ${c.hasGradient ? 'wppg-cta-gradient' : ''}">
                    <h2 class="wppg-cta-title">${c.title}</h2>
                    <p class="wppg-cta-desc">${c.subtitle}</p>
                    <div class="wppg-flex-center">
                        <a href="${c.btnText ? c.btnLink : '#'}" class="wppg-btn wppg-btn-cta">${c.btnText} ${SVG_ICONS.arrowRight}</a>
                    </div>
                </div>
            </div>
        </section>\n`;
                break;

            case 'contact':
                html += `
        <!-- Contact Section -->
        <section class="wppg-contact ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-contact-grid">
                    <div class="wppg-contact-info">
                        <h2 class="wppg-contact-title">${c.title}</h2>
                        <p class="wppg-contact-subtitle">${c.subtitle}</p>
                        
                        <div class="wppg-contact-list">
                            ${c.phone ? `
                            <div class="wppg-contact-item">
                                <div class="wppg-contact-icon">${SVG_ICONS.phone}</div>
                                <div>
                                    <h4 class="wppg-contact-info-label">Telepon</h4>
                                    <p class="wppg-contact-info-value">${c.phone}</p>
                                </div>
                            </div>` : ''}
                            
                            ${c.email ? `
                            <div class="wppg-contact-item">
                                <div class="wppg-contact-icon">${SVG_ICONS.mail}</div>
                                <div>
                                    <h4 class="wppg-contact-info-label">Email</h4>
                                    <p class="wppg-contact-info-value">${c.email}</p>
                                </div>
                            </div>` : ''}
                            
                            ${c.address ? `
                            <div class="wppg-contact-item">
                                <div class="wppg-contact-icon">${SVG_ICONS.mapPin}</div>
                                <div>
                                    <h4 class="wppg-contact-info-label">Alamat Kantor</h4>
                                    <p class="wppg-contact-info-value">${c.address}</p>
                                </div>
                            </div>` : ''}
                        </div>
                    </div>

                    <div class="wppg-contact-form-wrap">
                        <form action="${c.formEndpoint}" method="POST" class="wppg-contact-form" onsubmit="event.preventDefault(); alert('Form submitted! (Demo mode)');">
                            <div class="wppg-form-group">
                                <label for="wppg-form-name">Nama Lengkap</label>
                                <input type="text" id="wppg-form-name" name="name" required placeholder="Masukkan nama lengkap Anda">
                            </div>
                            <div class="wppg-form-group">
                                <label for="wppg-form-email">Alamat Email</label>
                                <input type="email" id="wppg-form-email" name="email" required placeholder="name@email.com">
                            </div>
                            <div class="wppg-form-group">
                                <label for="wppg-form-message">Pesan Anda</label>
                                <textarea id="wppg-form-message" name="message" rows="4" required placeholder="Tuliskan detail pertanyaan atau bantuan yang Anda butuhkan..."></textarea>
                            </div>
                            <button type="submit" class="wppg-btn wppg-btn-primary wppg-btn-block">${c.btnText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>\n`;
                break;

            case 'footer':
                let socialFbHtml = c.socialFb ? `<a href="${c.socialFb}" class="wppg-footer-social-link">Facebook</a>` : '';
                let socialTwHtml = c.socialTw ? `<a href="${c.socialTw}" class="wppg-footer-social-link">Twitter</a>` : '';
                let socialIgHtml = c.socialIg ? `<a href="${c.socialIg}" class="wppg-footer-social-link">Instagram</a>` : '';

                html += `
        <!-- Footer Section -->
        <footer class="wppg-footer ${bgClass}" id="${elementId}">
            <div class="wppg-container">
                <div class="wppg-footer-grid">
                    <p class="wppg-footer-copy">${c.copyright}</p>
                    <div class="wppg-footer-socials">
                        ${socialFbHtml}
                        ${socialTwHtml}
                        ${socialIgHtml}
                    </div>
                </div>
            </div>
        </footer>\n`;
                break;
        }
    });

    return html;
}

// 15. COMPILING RESPONSIVE CSS STYLING
function compileCss() {
    const cfg = pageState.config;
    
    // Start with core page styles
    let css = `/* Scoped Styles for WordPress Custom Page Container */
.wppg-page-container {
    --wppg-primary: ${cfg.primary};
    --wppg-primary-rgb: ${hexToRgb(cfg.primary)};
    --wppg-secondary: ${cfg.secondary};
    --wppg-bg: ${cfg.bg};
    --wppg-text: ${cfg.text};
    --wppg-max-width: ${cfg.containerWidth}px;
    --wppg-padding: ${cfg.sectionPadding}px;
    
    font-family: '${cfg.fontFamily === 'System' ? 'system-ui, -apple-system, sans-serif' : cfg.fontFamily}', sans-serif;
    color: var(--wppg-text);
    background-color: var(--wppg-bg);
    line-height: 1.6;
    overflow-x: hidden;
}

/* Base resets inside the page container */
.wppg-page-container * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.wppg-container {
    width: 100%;
    max-width: var(--wppg-max-width);
    margin: 0 auto;
    padding: 0 20px;
}

.wppg-grid {
    display: grid;
    gap: 30px;
}

.wppg-cols-2 { grid-template-columns: repeat(2, 1fr); }
.wppg-cols-3 { grid-template-columns: repeat(3, 1fr); }
.wppg-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Background Preset utilities */
.wppg-page-container .wppg-bg-theme {
    background-color: var(--wppg-bg);
    color: var(--wppg-text);
}
.wppg-page-container .wppg-bg-light {
    background-color: #f8fafc;
    color: #0f172a;
}
.wppg-page-container .wppg-bg-dark {
    background-color: #0f172a;
    color: #f8fafc;
}
.wppg-page-container .wppg-bg-primary {
    background-color: var(--wppg-primary);
    color: #ffffff;
}
.wppg-page-container .wppg-bg-primary .wppg-section-subtitle,
.wppg-page-container .wppg-bg-primary .wppg-feature-card-desc,
.wppg-page-container .wppg-page-container .wppg-bg-primary .wppg-contact-subtitle {
    opacity: 0.85;
}

/* Buttons */
.wppg-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.wppg-btn-primary {
    background-color: var(--wppg-primary);
    color: #ffffff !important;
    border: 2px solid var(--wppg-primary);
}

.wppg-btn-primary:hover {
    background-color: transparent;
    color: var(--wppg-primary) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(var(--wppg-primary-rgb), 0.25);
}

.wppg-btn-secondary {
    background-color: transparent;
    color: var(--wppg-text) !important;
    border: 2px solid rgba(var(--wppg-primary-rgb), 0.2);
    margin-left: 12px;
}

.wppg-btn-secondary:hover {
    background-color: rgba(var(--wppg-primary-rgb), 0.05);
    border-color: var(--wppg-primary);
    transform: translateY(-2px);
}

/* Primary background button override */
.wppg-bg-primary .wppg-btn-secondary {
    color: #ffffff !important;
    border-color: rgba(255, 255, 255, 0.4);
}
.wppg-bg-primary .wppg-btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #ffffff;
}

.wppg-btn-outline {
    background-color: transparent;
    color: var(--wppg-primary) !important;
    border: 2px solid var(--wppg-primary);
}

.wppg-btn-outline:hover {
    background-color: var(--wppg-primary);
    color: #ffffff !important;
}

.wppg-btn-block {
    display: flex;
    width: 100%;
}

.wppg-flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

/* Sections Header Utility */
.wppg-section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 50px auto;
}

.wppg-section-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
}

.wppg-section-subtitle {
    font-size: 16px;
    opacity: 0.8;
}

/* 1. Hero Layouts */
.wppg-hero {
    position: relative;
    padding: var(--wppg-padding) 0;
    overflow: hidden;
}

.wppg-hero-accent-circle {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 450px;
    height: 450px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(var(--wppg-primary-rgb), 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
}

.wppg-hero-accent-circle.centered-circle {
    left: 50%;
    transform: translateX(-50%);
    top: -50px;
}

.wppg-hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    align-items: center;
    position: relative;
    z-index: 2;
}

.wppg-hero-content {
    text-align: left;
}

.wppg-hero-title {
    font-size: 46px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -1px;
}

.wppg-hero-text {
    font-size: 17px;
    opacity: 0.85;
    margin-bottom: 32px;
}

.wppg-hero-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.wppg-hero-image-wrap {
    display: flex;
    justify-content: center;
    position: relative;
}

.wppg-hero-image {
    max-width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.wppg-hero-content-center {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
}

.wppg-hero-image-wrap-centered {
    margin-top: 50px;
    display: flex;
    justify-content: center;
}

/* 2. Features Grid */
.wppg-features {
    padding: var(--wppg-padding) 0;
}

.wppg-feature-card {
    background-color: rgba(255,255,255, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    padding: 30px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.wppg-bg-light .wppg-feature-card {
    background-color: #ffffff;
    border-color: rgba(0, 0, 0, 0.04);
}
.wppg-bg-dark .wppg-feature-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.07);
}
.wppg-bg-primary .wppg-feature-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
}

.wppg-feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.06);
    border-color: rgba(var(--wppg-primary-rgb), 0.2);
}

.wppg-feature-icon {
    font-size: 32px;
    margin-bottom: 16px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--wppg-primary-rgb), 0.08);
    border-radius: 12px;
}

.wppg-bg-primary .wppg-feature-icon {
    background-color: rgba(255, 255, 255, 0.15);
}

.wppg-feature-card-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
}

.wppg-feature-card-desc {
    font-size: 14px;
    opacity: 0.8;
}

/* 3. Pricing Table Styles */
.wppg-pricing {
    padding: var(--wppg-padding) 0;
}

.wppg-pricing-card {
    background-color: rgba(255,255,255, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;
}

.wppg-bg-light .wppg-pricing-card {
    background-color: #ffffff;
}
.wppg-bg-dark .wppg-pricing-card {
    background-color: rgba(255,255,255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
}
.wppg-bg-primary .wppg-pricing-card {
    background-color: rgba(255,255,255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.wppg-pricing-card:hover {
    transform: translateY(-5px);
}

.wppg-pricing-popular {
    border: 2px solid var(--wppg-primary);
    box-shadow: 0 15px 30px rgba(var(--wppg-primary-rgb), 0.15);
    background-color: rgba(255,255,255,0.05);
}

.wppg-bg-light .wppg-pricing-popular {
    border-color: var(--wppg-primary);
    background-color: #ffffff;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
}
.wppg-bg-primary .wppg-pricing-popular {
    border-color: #ffffff;
    background-color: rgba(255,255,255, 0.15);
    box-shadow: 0 15px 30px rgba(0,0,0, 0.1);
}

.wppg-pricing-badge {
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--wppg-primary);
    color: #ffffff;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}

.wppg-bg-primary .wppg-pricing-badge {
    background-color: #ffffff;
    color: var(--wppg-primary);
}

.wppg-pricing-plan {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}

.wppg-pricing-amount {
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -1px;
}

.wppg-pricing-period {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.7;
}

.wppg-pricing-desc {
    font-size: 13px;
    opacity: 0.8;
    margin-bottom: 24px;
}

.wppg-pricing-features {
    list-style: none;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.wppg-pricing-features li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}

.wppg-pricing-features li svg {
    color: var(--wppg-primary);
    flex-shrink: 0;
}
.wppg-bg-primary .wppg-pricing-features li svg {
    color: #ffffff;
}

.wppg-pricing-action {
    margin-top: auto;
}

/* Primary background button color changes */
.wppg-bg-primary .wppg-pricing-popular .wppg-btn-primary {
    background-color: #ffffff;
    color: var(--wppg-primary) !important;
    border-color: #ffffff;
}
.wppg-bg-primary .wppg-pricing-popular .wppg-btn-primary:hover {
    background-color: transparent;
    color: #ffffff !important;
}
.wppg-bg-primary .wppg-pricing-card:not(.wppg-pricing-popular) .wppg-btn-outline {
    color: #ffffff !important;
    border-color: rgba(255,255,255,0.6);
}
.wppg-bg-primary .wppg-pricing-card:not(.wppg-pricing-popular) .wppg-btn-outline:hover {
    background-color: #ffffff;
    color: var(--wppg-primary) !important;
}

/* 4. Testimonials */
.wppg-testimonials {
    padding: var(--wppg-padding) 0;
}

.wppg-testimonial-card {
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.wppg-bg-light .wppg-testimonial-card {
    background-color: #ffffff;
}
.wppg-bg-dark .wppg-testimonial-card {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
}
.wppg-bg-primary .wppg-testimonial-card {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.wppg-testimonial-stars {
    margin-bottom: 16px;
    display: flex;
    gap: 4px;
}

.wppg-testimonial-quote {
    font-style: italic;
    font-size: 15px;
    line-height: 1.7;
    opacity: 0.9;
    margin-bottom: 24px;
}

.wppg-testimonial-user {
    display: flex;
    align-items: center;
    gap: 14px;
}

.wppg-testimonial-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(var(--wppg-primary-rgb), 0.2);
}
.wppg-bg-primary .wppg-testimonial-avatar {
    border-color: rgba(255, 255, 255, 0.4);
}

.wppg-testimonial-name {
    font-size: 15px;
    font-weight: 700;
}

.wppg-testimonial-role {
    font-size: 12px;
    opacity: 0.7;
}

/* 5. FAQ Accordions */
.wppg-faq {
    padding: var(--wppg-padding) 0;
}

.wppg-faq-list {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.wppg-faq-item {
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    overflow: hidden;
}

.wppg-bg-light .wppg-faq-item {
    background-color: #ffffff;
}
.wppg-bg-dark .wppg-faq-item {
    background-color: rgba(255,255,255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
}
.wppg-bg-primary .wppg-faq-item {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.wppg-faq-question {
    padding: 20px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}

.wppg-faq-question::-webkit-details-marker {
    display: none;
}

.wppg-faq-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.25s ease;
    opacity: 0.7;
}

.wppg-faq-item[open] .wppg-faq-arrow {
    transform: rotate(180deg);
}

.wppg-faq-answer {
    padding: 0 24px 20px 24px;
    font-size: 14px;
    line-height: 1.6;
    opacity: 0.85;
}

/* 6. CTA Card Layout */
.wppg-cta {
    padding: var(--wppg-padding) 0;
}

.wppg-cta-box {
    background-color: rgba(var(--wppg-primary-rgb), 0.05);
    border: 1px solid rgba(var(--wppg-primary-rgb), 0.15);
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.wppg-bg-dark .wppg-cta-box {
    background-color: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.08);
}
.wppg-bg-primary .wppg-cta-box {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.wppg-cta-gradient {
    background: linear-gradient(135deg, rgba(var(--wppg-primary-rgb), 0.9) 0%, var(--wppg-secondary) 100%);
    color: #ffffff;
    border: none;
}

.wppg-cta-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.5px;
}

.wppg-cta-desc {
    max-width: 600px;
    margin: 0 auto 30px auto;
    font-size: 16px;
    opacity: 0.9;
}

.wppg-btn-cta {
    background-color: #ffffff;
    color: var(--wppg-primary) !important;
    border: 2px solid #ffffff;
    font-weight: 700;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.wppg-btn-cta:hover {
    background-color: transparent;
    color: #ffffff !important;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

.wppg-cta-box:not(.wppg-cta-gradient) .wppg-btn-cta {
    background-color: var(--wppg-primary);
    color: #ffffff !important;
    border-color: var(--wppg-primary);
}
.wppg-bg-primary .wppg-cta-box:not(.wppg-cta-gradient) .wppg-btn-cta {
    background-color: #ffffff;
    color: var(--wppg-primary) !important;
    border-color: #ffffff;
}

.wppg-cta-box:not(.wppg-cta-gradient) .wppg-btn-cta:hover {
    background-color: transparent;
    color: var(--wppg-primary) !important;
}
.wppg-bg-primary .wppg-cta-box:not(.wppg-cta-gradient) .wppg-btn-cta:hover {
    color: #ffffff !important;
}

/* 7. Contact Section Split */
.wppg-contact {
    padding: var(--wppg-padding) 0;
}

.wppg-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 50px;
}

.wppg-contact-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 14px;
}

.wppg-contact-subtitle {
    font-size: 15px;
    opacity: 0.8;
    margin-bottom: 40px;
}

.wppg-contact-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.wppg-contact-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
}

.wppg-contact-icon {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    background-color: rgba(var(--wppg-primary-rgb), 0.1);
    color: var(--wppg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.wppg-bg-primary .wppg-contact-icon {
    background-color: rgba(255, 255, 255, 0.15);
    color: #ffffff;
}

.wppg-contact-icon svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
}

.wppg-contact-info-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.6;
    margin-bottom: 2px;
}

.wppg-contact-info-value {
    font-size: 15px;
    font-weight: 600;
}

.wppg-contact-form-wrap {
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    padding: 35px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
}
.wppg-bg-light .wppg-contact-form-wrap {
    background-color: #ffffff;
}
.wppg-bg-dark .wppg-contact-form-wrap {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
}
.wppg-bg-primary .wppg-contact-form-wrap {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
}

.wppg-contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.wppg-form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wppg-form-group label {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;
}

.wppg-form-group input,
.wppg-form-group textarea {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-family: inherit;
    font-size: 14px;
    background-color: #ffffff;
    color: #1f2937;
    transition: border-color 0.2s ease;
}

.wppg-bg-dark .wppg-form-group input,
.wppg-bg-dark .wppg-form-group textarea {
    background-color: #1f2937;
    border-color: rgba(255,255,255,0.1);
    color: #ffffff;
}

.wppg-form-group input:focus,
.wppg-form-group textarea:focus {
    outline: none;
    border-color: var(--wppg-primary);
}
.wppg-bg-primary .wppg-form-group input:focus,
.wppg-bg-primary .wppg-form-group textarea:focus {
    border-color: #ffffff;
}

/* 8. Footer Minimal */
.wppg-footer {
    padding: 30px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}
.wppg-bg-dark.wppg-footer {
    border-color: rgba(255, 255, 255, 0.08);
}

.wppg-footer-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.wppg-footer-copy {
    font-size: 13px;
    opacity: 0.7;
}

.wppg-footer-socials {
    display: flex;
    gap: 16px;
}

.wppg-footer-social-link {
    font-size: 13px;
    text-decoration: none;
    color: inherit;
    opacity: 0.7;
    font-weight: 600;
    transition: opacity 0.2s ease;
}

.wppg-footer-social-link:hover {
    opacity: 1;
}

/* RESPONSIVE LAYOUTS */
@media (max-width: 991px) {
    .wppg-hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .wppg-hero-content {
        text-align: center;
    }
    .wppg-hero-btns {
        justify-content: center;
    }
    .wppg-cols-3 {
        grid-template-columns: repeat(2, 1fr);
    }
    .wppg-contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}

@media (max-width: 767px) {
    .wppg-hero-title {
        font-size: 34px;
    }
    .wppg-hero-text {
        font-size: 15px;
    }
    .wppg-cols-2, .wppg-cols-3, .wppg-cols-4 {
        grid-template-columns: 1fr;
    }
    .wppg-section-title {
        font-size: 26px;
    }
    .wppg-pricing-card {
        max-width: 400px;
        margin: 0 auto;
        width: 100%;
    }
    .wppg-testimonial-card {
        max-width: 400px;
        margin: 0 auto;
        width: 100%;
    }
    .wppg-cta-box {
        padding: 40px 20px;
    }
    .wppg-cta-title {
        font-size: 26px;
    }
    .wppg-footer-grid {
        flex-direction: column;
        text-align: center;
    }
}`;

    // Add section-specific custom styling overrides (ID, padding, colors)
    pageState.sections.forEach(section => {
        const id = section.styles?.customId ? section.styles.customId : section.id;
        const styles = section.styles;

        if (styles) {
            css += `\n\n/* Custom styles for #${id} */\n#${id} {\n`;
            
            if (styles.paddingTop !== undefined) {
                css += `    padding-top: ${styles.paddingTop}px !important;\n`;
            }
            if (styles.paddingBottom !== undefined) {
                css += `    padding-bottom: ${styles.paddingBottom}px !important;\n`;
            }

            if (styles.bgType === 'custom') {
                if (styles.bgColor) {
                    css += `    background-color: ${styles.bgColor} !important;\n`;
                }
                if (styles.textColor) {
                    css += `    color: ${styles.textColor} !important;\n`;
                }
            }
            css += `}`;
            
            // Handle child text overrides for custom colors
            if (styles.bgType === 'custom') {
                css += `\n#${id} .wppg-section-title, #${id} .wppg-feature-card-title, #${id} .wppg-pricing-plan, #${id} .wppg-testimonial-name, #${id} .wppg-contact-title, #${id} .wppg-faq-question { color: inherit !important; }`;
                css += `\n#${id} .wppg-section-subtitle, #${id} .wppg-feature-card-desc, #${id} .wppg-pricing-desc, #${id} .wppg-testimonial-quote, #${id} .wppg-contact-subtitle, #${id} .wppg-faq-answer { color: inherit !important; opacity: 0.85; }`;
            }
        }
    });

    return css;
}

// 16. HELPER: Convert HEX to RGB
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    let r, g, b;
    if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
    } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    return `${r}, ${g}, ${b}`;
}

// 17. COPY TO CLIPBOARD HANDLER
function setupCopyBtn() {
    const btn = document.getElementById('copy-code-btn');
    btn.addEventListener('click', () => {
        const text = document.getElementById('code-output').textContent;
        navigator.clipboard.writeText(text).then(() => {
            btn.classList.add('copy-success');
            const origHtml = btn.innerHTML;
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Code Copied!`;
            
            setTimeout(() => {
                btn.classList.remove('copy-success');
                btn.innerHTML = origHtml;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Gagal menyalin kode. Silakan salin secara manual dari tab Generated Code.');
        });
    });
}
