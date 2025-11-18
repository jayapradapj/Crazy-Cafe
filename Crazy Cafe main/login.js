
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('mainNavbar');

  // Navbar scroll effect
  const handleNavScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  // Smooth scrolling for on-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetEl = document.querySelector(anchor.getAttribute('href'));
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // Password visibility toggle
  const passwordToggle = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('loginPassword');

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const showing = passwordInput.type === 'text';
      passwordInput.type = showing ? 'password' : 'text';
      passwordToggle.innerHTML = showing ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
  }

  // Login form demo submission
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const emailValue = document.getElementById('loginEmail')?.value?.trim();
      const passwordValue = passwordInput?.value?.trim();

      if (!emailValue || !passwordValue) {
        alert('Please enter both email and password.');
        return;
      }

      console.log(`Login attempted for ${emailValue}`);
      alert('Thanks for signing in! (Demo only)');
      loginForm.reset();
      if (passwordInput && passwordInput.type === 'text') {
        passwordInput.type = 'password';
        passwordToggle.innerHTML = '<i class="bi bi-eye"></i>';
      }
    });
  }
});