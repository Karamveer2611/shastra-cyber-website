/* ============================================================
   SHASTRA CYBER SYSTEMS — Global JavaScript
   - Mobile nav toggle
   - Sticky navbar on scroll
   - Enquire modal (open/close)
   - Form submission via Formspree
   - Scroll reveal animations
   - Active nav link highlight
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ── MOBILE HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
  });
  // Close mobile nav when a link is clicked
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    });
  });

  /* ── MODAL ── */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');

  // Open modal on ANY .open-modal or [data-modal] element
  document.querySelectorAll('.open-modal, [data-modal="enquire"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  function openModal() {
    modalOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Expose globally so inline onclick can also work
  window.openEnquireModal = openModal;
  window.closeEnquireModal = closeModal;

  /* ── FORM SUBMISSION (Formspree) ── */
  const enquireForm = document.getElementById('enquireForm');
  const formSuccess = document.getElementById('formSuccess');

  enquireForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = enquireForm.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(enquireForm);

    try {
      // ⚠️ Replace YOUR_FORMSPREE_ID with your actual Formspree endpoint
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        enquireForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
        enquireForm.reset();
      } else {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    }
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── PRODUCT/SOLUTIONS TABS ── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = panel.dataset.panel === target ? 'grid' : 'none';
      });
    });
  });

});
