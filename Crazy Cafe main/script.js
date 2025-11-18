// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  });
});

// Add to cart functionality
document.querySelectorAll('.coffee-card button').forEach(button => {
  button.addEventListener('click', function() {
    const coffeeName = this.parentElement.querySelector('h5').textContent;
    const coffeePrice = this.parentElement.querySelector('p').textContent;
    
    console.log(`Added ${coffeeName} (${coffeePrice}) to cart!`);
    
    // Show alert notification
    alert(`${coffeeName} added to cart!`);
    
    // Optional: Add visual feedback
    this.style.backgroundColor = '#28a745';
    this.innerHTML = '✓';
    
    setTimeout(() => {
      this.style.backgroundColor = '';
      this.innerHTML = '+';
    }, 1000);
  });
});

// Animate elements on scroll (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.about, .collections, .reviews').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.8s ease';
  observer.observe(section);
});

// Subtle tilt interaction for collage frames
const collage = document.querySelector('.about-collage');
if (collage) {
  const setTilt = (xDeg, yDeg) => {
    collage.style.setProperty('--collage-tilt-x', `${xDeg}deg`);
    collage.style.setProperty('--collage-tilt-y', `${yDeg}deg`);
  };

  collage.addEventListener('mousemove', (event) => {
    const rect = collage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) - 0.5;
    const y = ((event.clientY - rect.top) / rect.height) - 0.5;
    const maxTilt = 5;
    setTilt(x * maxTilt, -y * maxTilt);
  });

  collage.addEventListener('mouseleave', () => {
    setTilt(0, 0);
  });
}

// Collections horizontal scroll controls
const collectionTrack = document.getElementById('collectionTrack');
const prevScrollBtn = document.querySelector('.scroll-btn.prev');
const nextScrollBtn = document.querySelector('.scroll-btn.next');
let updateCollectionScrollButtons = null;

if (collectionTrack && prevScrollBtn && nextScrollBtn) {
  const scrollByAmount = collectionTrack.clientWidth * 0.8;

  updateCollectionScrollButtons = () => {
    const maxScrollLeft = collectionTrack.scrollWidth - collectionTrack.clientWidth - 2;
    prevScrollBtn.disabled = collectionTrack.scrollLeft <= 0;
    nextScrollBtn.disabled = collectionTrack.scrollLeft >= maxScrollLeft;
  };

  prevScrollBtn.addEventListener('click', () => {
    collectionTrack.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
  });

  nextScrollBtn.addEventListener('click', () => {
    collectionTrack.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
  });

  collectionTrack.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateCollectionScrollButtons);
  });

  updateCollectionScrollButtons();
}

// Collections filter chips
const filterChips = document.querySelectorAll('.filter-chip');
const collectionCards = document.querySelectorAll('.collection-card');

if (filterChips.length && collectionCards.length) {
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter || 'all';
      collectionCards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !matches);
      });

      if (collectionTrack) {
        collectionTrack.scrollTo({ left: 0, behavior: 'smooth' });
      }

      if (updateCollectionScrollButtons) {
        updateCollectionScrollButtons();
      }
    });
  });
}

// Login password visibility toggle
const passwordToggle = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('loginPassword');

if (passwordToggle && passwordInput) {
  passwordToggle.addEventListener('click', () => {
    const showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    passwordToggle.innerHTML = showing ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
  });
}

// Login form submission (demo behavior)
const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailValue = document.getElementById('loginEmail')?.value || 'guest';
    console.log(`Login attempted for ${emailValue}`);
    alert('Thanks for signing in! (Demo only)');
  });
}

// Console welcome message
console.log('%c Welcome to Crazy Cafe! ☕', 'color: #5c3a2e; font-size: 20px; font-weight: bold;');
console.log('%c Enjoy your coffee experience!', 'color: #c47b3a; font-size: 14px;');


// Legacy "More Coffees" toggle guard (kept for safety if elements are reintroduced)
document.addEventListener("DOMContentLoaded", function() {
  var showMoreBtn = document.getElementById('showMoreCoffeesBtn');
  var moreRow = document.getElementById('more-coffee-row');
  if (!showMoreBtn || !moreRow) return;

  var isVisible = false;
  showMoreBtn.addEventListener('click', function() {
    isVisible = !isVisible;
    moreRow.style.display = isVisible ? "flex" : "none";
    showMoreBtn.textContent = isVisible ? "Show Less" : "More Coffees";
    showMoreBtn.setAttribute('aria-expanded', isVisible);
  });
});