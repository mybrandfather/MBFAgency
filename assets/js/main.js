// ============================================================
// MyBrandFather -- shared site JavaScript (assets/js/main.js)
// Loaded on every page. Every function guards on element presence,
// so it's safe to include even on pages that don't have a given element.
// ============================================================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = document.getElementById('mobile-menu-icon');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!mobileMenu || !mobileIcon) return;
    if (toggle) toggle.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'true' : 'false');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileIcon.classList.remove('fa-bars');
        mobileIcon.classList.add('fa-times');
    } else {
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.add('hidden');
        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');
    }
}

// Scroll to top
function scrollToTop() {
    const btn = document.getElementById('scrollToTopBtn');
    if (btn) {
        btn.classList.add('stt-launch');
        setTimeout(() => btn.classList.remove('stt-launch'), 500);
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

// Animated stat counters -- count up once when entering viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterObserver.unobserve(el);
        const target = parseInt(el.dataset.target, 10);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = target; return; }
        const duration = 1600, start = performance.now();
        function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Scroll-reveal for any .reveal element on the current page
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const header = document.querySelector('header');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const sttProgress = document.getElementById('sttProgress');
const STT_CIRC = 157; // 2 * PI * 25
let scrollRafPending = false;

function updateScrollTopBtn() {
    scrollRafPending = false;
    if (!scrollToTopBtn) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    if (sttProgress) sttProgress.style.strokeDashoffset = STT_CIRC * (1 - progress);
    scrollToTopBtn.classList.toggle('stt-visible', window.scrollY > 500);
}

window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('shadow-sm', window.scrollY > 50);
    if (!scrollRafPending) {
        scrollRafPending = true;
        requestAnimationFrame(updateScrollTopBtn);
    }
});

// CTA button ambient focus vignette
(function initCtaVignette() {
    const vignette = document.getElementById('cta-focus-vignette');
    if (!vignette) return;
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-gold, .btn-secondary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => vignette.classList.add('active'));
        btn.addEventListener('mouseleave', () => vignette.classList.remove('active'));
    });
})();

// ============================================================
// MBF LABS CONFIG -- the ONLY place to edit product status, CTA text, and links.
// Do not invent URLs or statuses here -- leave `url: null` and status "In Development"/
// "Coming Soon" until a real, confirmed URL exists. RevenueViking, LogoViking,
// and ZaynClock are confirmed live; WonderTales remains pre-launch.
// ============================================================
const MBF_LABS_CONFIG = {
    revenueviking: { status: 'Visit Product', url: 'https://revenueviking.com', clickable: true },

    logoviking:    { status: 'Visit Product', url: 'https://logoviking.com', clickable: true },

    wondertales:   { status: 'Coming Soon',    url: null, clickable: false },

    zaynclock:     { status: 'Visit Product', url: 'https://zaynclock.com', clickable: true }
};

(function renderLabsCards() {
    document.querySelectorAll('[data-product]').forEach(card => {
        const key = card.getAttribute('data-product');
        const cfg = MBF_LABS_CONFIG[key];
        const cta = card.querySelector('.labs-cta');
        if (!cfg || !cta) return;
        if (cfg.clickable && cfg.url) {
            cta.innerHTML = cfg.status + ' <i class="fas fa-arrow-up-right-from-square text-[10px]"></i>';
            cta.classList.add('bg-[#1A1A1A]', 'text-white', 'group-hover:bg-[#C5A065]');
            const link = document.createElement('a');
            link.href = cfg.url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.className = 'absolute inset-0 z-10';
            const heading = card.querySelector('h2, h3');
            link.setAttribute('aria-label', (heading ? heading.textContent : key) + ' -- opens in a new tab');
            card.style.position = 'relative';
            card.appendChild(link);
        } else {
            cta.textContent = cfg.status;
            cta.classList.add('border', 'border-[#1A1A1A]/20');
        }
    });
})();


// Contact form: client-side validation + fetch submit with loading/success/error states,
// hard-blocked while the Web3Forms access key is still a placeholder.
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const btn = document.getElementById('contact-submit-btn');
    const label = document.getElementById('contact-submit-label');
    const icon = document.getElementById('contact-submit-icon');
    const successEl = document.getElementById('contact-success');
    const errorEl = document.getElementById('contact-error');
    const configWarningEl = document.getElementById('contact-config-warning');
    const accessKeyInput = form.querySelector('input[name="access_key"]');
    const PLACEHOLDER_KEY = 'WEB3FORMS_ACCESS_KEY_HERE';

    function keyIsUnconfigured() {
        return !accessKeyInput || accessKeyInput.value.trim() === PLACEHOLDER_KEY || accessKeyInput.value.trim() === '';
    }

    if (keyIsUnconfigured()) {
        // Developer/admin-facing only -- not shown to visitors.
        console.warn('[MyBrandFather] Contact form is NOT configured: Web3Forms access_key is still the placeholder value. Replace WEB3FORMS_ACCESS_KEY_HERE in /contact/index.html with a real key from https://web3forms.com before launch. Submissions will be blocked until this is fixed.');
    }

    function setFieldError(field, show) {
        const errorP = field.parentElement.querySelector('.field-error');
        if (errorP) errorP.classList.toggle('hidden', !show);
        field.classList.toggle('border-red-400', show);
    }

    function validate() {
        let valid = true;
        const required = form.querySelectorAll('[required]');
        required.forEach(field => {
            let fieldValid = field.value.trim().length > 0;
            if (field.type === 'email' && fieldValid) {
                fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
            }
            setFieldError(field, !fieldValid);
            if (!fieldValid) valid = false;
        });
        return valid;
    }

    form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', () => setFieldError(field, false));
        field.addEventListener('blur', () => {
            if (field.value.trim().length > 0) setFieldError(field, false);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        successEl.classList.add('hidden');
        errorEl.classList.add('hidden');
        if (configWarningEl) configWarningEl.classList.add('hidden');

        if (keyIsUnconfigured()) {
            console.warn('[MyBrandFather] Contact form submission blocked: Web3Forms access_key is not configured.');
            if (configWarningEl) configWarningEl.classList.remove('hidden');
            return;
        }

        if (!validate()) return;

        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-wait');
        label.textContent = 'Sending...';
        icon.className = 'fas fa-circle-notch fa-spin text-xs';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            const data = await res.json().catch(() => ({ success: res.ok }));
            if (res.ok && data.success !== false) {
                successEl.classList.remove('hidden');
                form.reset();
                label.textContent = 'Tell Us What Is Slowing Your Growth';
                icon.className = 'fas fa-check text-xs';
                setTimeout(() => { icon.className = 'fas fa-arrow-right text-xs'; }, 2500);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            errorEl.classList.remove('hidden');
            label.textContent = 'Send Message';
            icon.className = 'fas fa-arrow-right text-xs';
        } finally {
            btn.disabled = false;
            btn.classList.remove('opacity-70', 'cursor-wait');
        }
    });
})();

// Magnetic text effect (hero/section headings) + magnetic buttons
let magneticChars = [];

function splitTextToChars(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const frag = document.createDocumentFragment();
        const parentColor = window.getComputedStyle(node.parentElement).color;
        const words = text.split(/(\s+)/);
        words.forEach(word => {
            if (word.trim() === '') {
                frag.appendChild(document.createTextNode(word));
            } else {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word-wrapper';
                word.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.textContent = char;
                    charSpan.style.color = parentColor;
                    charSpan.dataset.originalColor = parentColor;
                    wordSpan.appendChild(charSpan);
                });
                frag.appendChild(wordSpan);
            }
        });
        node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        Array.from(node.childNodes).forEach(splitTextToChars);
    }
}

function initMagneticHeadings() {
    document.querySelectorAll('.magnetic-text').forEach(target => {
        if (!target.dataset.split) {
            Array.from(target.childNodes).forEach(splitTextToChars);
            target.dataset.split = 'true';
        }
    });
    magneticChars = Array.from(document.querySelectorAll('.magnetic-text .char'));
}

let mouseX = 0, mouseY = 0, rafPending = false;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; updateMagneticChars(); });
});

function updateMagneticChars() {
    const e = { clientX: mouseX, clientY: mouseY };
    magneticChars.forEach(char => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const distX = e.clientX - charX;
        const distY = e.clientY - charY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const maxDist = 130;
        if (dist < maxDist && dist > 0) {
            const pull = (maxDist - dist) / maxDist;
            const moveX = (distX / dist) * pull * 12;
            const moveY = (distY / dist) * pull * 12;
            char.style.transform = `translate(${moveX}px, ${moveY}px)`;
            char.style.color = '#C5A065';
            char.style.textShadow = `0 0 ${pull * 15}px rgba(197, 160, 101, ${pull * 0.9})`;
        } else {
            char.style.transform = 'translate(0px, 0px)';
            char.style.color = char.dataset.originalColor || '';
            char.style.textShadow = 'none';
        }
    });
}

document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
    });
});

// Work page category filters (no-op on pages without .work-filter-btn elements)
(function initWorkFilters() {
    const buttons = document.querySelectorAll('.work-filter-btn');
    if (!buttons.length) return;
    const items = document.querySelectorAll('.work-item');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            items.forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter;
                item.style.display = show ? '' : 'none';
            });
        });
    });
})();

// Compact portfolio directory filters. Cards can belong to more than one service.
(function initPortfolioDirectoryFilters() {
    const buttons = document.querySelectorAll('[data-showcase-filter]');
    const cards = document.querySelectorAll('[data-showcase-category]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.showcaseFilter;
            buttons.forEach(item => {
                const selected = item === button;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            cards.forEach(card => {
                const categories = (card.dataset.showcaseCategory || '').split(/\s+/);
                card.hidden = filter !== 'all' && !categories.includes(filter);
            });
        });
    });

    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === 0)));
})();

window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
    initMagneticHeadings();
});


// Lightweight conversion instrumentation.
// Works with Google Analytics when gtag/dataLayer is present and is harmless otherwise.
(function initConversionTracking() {
    window.dataLayer = window.dataLayer || [];
    function track(name, params) {
        const payload = Object.assign({ event: name, page_path: location.pathname }, params || {});
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, payload);
        } else {
            window.dataLayer.push(payload);
        }
    }
    window.mbfTrack = track;

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a,button');
        if (!link) return;
        const eventName = link.getAttribute('data-track');
        if (eventName) track(eventName, { label: (link.textContent || '').trim().slice(0,120), href: link.getAttribute('href') || '' });
        if (link.matches('a[href^="mailto:"]')) track('email_link_click', { href: link.getAttribute('href') });
    });

    document.querySelectorAll('form[data-track-form]').forEach((form) => {
        let started = false;
        form.addEventListener('input', () => {
            if (started) return;
            started = true;
            track('contact_form_start', { form: form.getAttribute('data-track-form') || 'form' });
        }, { passive: true });
        form.addEventListener('submit', () => {
            const service = form.querySelector('[name="service"]');
            track('contact_form_submit_attempt', {
                form: form.getAttribute('data-track-form') || 'form',
                service_selected: service ? service.value : ''
            });
        });
    });
})();
