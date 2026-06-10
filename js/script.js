/* ============================================
   PORTFOLIO MAIN JAVASCRIPT
   Vidushika Madhushani
   ============================================ */

/* ============================================
   1. NAVBAR - Scroll Effect & Active Link
   ============================================ */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link highlight
  updateActiveNavLink();

  // Back to top button
  updateBackToTop();

  // Skill bars animation
  animateSkillBars();
});

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ============================================
   2. HAMBURGER MENU (Mobile)
   ============================================ */
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("open");
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("open");
  });
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (
    !hamburger.contains(e.target) &&
    !navLinksContainer.contains(e.target)
  ) {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("open");
  }
});

/* ============================================
   3. TYPED TEXT EFFECT (Hero)
   ============================================ */
const typedTextEl = document.getElementById("typed-text");
const phrases = [
  "IT Undergraduate at SLIIT",
  "Front-End Web Developer",
  "UI/UX Enthusiast",
  "Creative Problem Solver",
  "Future Full-Stack Developer",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause at end of phrase
    isDeleting = true;
    typingSpeed = 1500;
  } else if (isDeleting && charIndex === 0) {
    // Move to next phrase
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 1000);
});

/* ============================================
   4. SCROLL REVEAL ANIMATIONS
   ============================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -60px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
  scrollObserver.observe(el);
});

/* ============================================
   5. SKILL BAR ANIMATION
   ============================================ */
let skillBarsAnimated = false;

function animateSkillBars() {
  if (skillBarsAnimated) return;

  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const sectionTop = skillsSection.offsetTop;
  const sectionHeight = skillsSection.offsetHeight;
  const scrollY = window.scrollY + window.innerHeight;

  if (scrollY >= sectionTop + 100 && window.scrollY < sectionTop + sectionHeight) {
    const progressBars = document.querySelectorAll(".skill-progress");
    progressBars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      setTimeout(() => {
        bar.style.width = targetWidth + "%";
      }, 200);
    });
    skillBarsAnimated = true;
  }
}

/* ============================================
   6. PROJECT FILTER
   ============================================ */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category") || "";

      if (filter === "all" || categories.includes(filter)) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* ============================================
   7. CONTACT FORM
   ============================================ */
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    // Simulate sending (replace with real backend/EmailJS later)
    const submitBtn = contactForm.querySelector(".submit-btn");
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showFormMessage(
        `✅ Thank you, ${name}! Your message has been sent. I'll get back to you soon.`,
        "success"
      );
      contactForm.reset();
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
    }, 2000);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(msg, type) {
  formMessage.textContent = msg;
  formMessage.className = `form-message ${type}`;
  setTimeout(() => {
    formMessage.className = "form-message";
  }, 5000);
}

/* ============================================
   8. BACK TO TOP BUTTON
   ============================================ */
const backToTopBtn = document.getElementById("back-to-top");

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================
   9. SMOOTH SCROLL FOR NAV LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

/* ============================================
   10. CURRENT YEAR IN FOOTER
   ============================================ */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ============================================
   11. STAGGERED CARD ANIMATIONS
   ============================================ */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(
    ".skill-card, .project-card, .cert-card, .experience-card, .timeline-item"
  )
  .forEach((card) => {
    card.classList.add("fade-up");
    cardObserver.observe(card);
  });

/* ============================================
   12. PAGE LOAD ANIMATION
   ============================================ */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});