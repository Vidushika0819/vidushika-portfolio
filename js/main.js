document.addEventListener("DOMContentLoaded", () => {
  // ===== Elements =====
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");
  const typedTextEl = document.getElementById("typed-text");
  const backToTopBtn = document.getElementById("back-to-top");

  // ===== 1) Navbar scroll style =====
  function onScroll() {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    updateActiveLink();
    updateBackToTop();
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  // ===== 2) Active nav link =====
  function updateActiveLink() {
    const y = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (y >= top && y < top + height) {
        navLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  // ===== 3) Mobile menu =====
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navLinksContainer.classList.toggle("open");
    });

    navLinksContainer.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("open");
      }
    });
  }

  // ===== 4) Smooth scroll =====
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // ===== 5) Typed text effect (safe) =====
  if (typedTextEl) {
    const phrases = [
      "IT Undergraduate",
      "Aspiring Software Developer",
      "DevOps Enthusiast",
      "Full‑Stack & Web Applications",
    ];

    let p = 0;
    let i = 0;
    let deleting = false;

    function tick() {
      const text = phrases[p];

      if (!deleting) {
        i++;
        typedTextEl.textContent = text.slice(0, i);
        if (i === text.length) {
          deleting = true;
          setTimeout(tick, 1200);
          return;
        }
      } else {
        i--;
        typedTextEl.textContent = text.slice(0, i);
        if (i === 0) {
          deleting = false;
          p = (p + 1) % phrases.length;
        }
      }

      const delay = deleting ? 35 : 70;
      setTimeout(tick, delay);
    }

    setTimeout(tick, 600);
  }

  // ===== 6) Scroll reveal =====
  const revealEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // ===== 7) Contact form -> mailto =====
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  function showMessage(text, type) {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.className = `form-message ${type}`;
    setTimeout(() => {
      messageBox.className = "form-message";
      messageBox.style.display = "none";
    }, 5000);
    messageBox.style.display = "block";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim() || "Portfolio Contact";
      const msg = document.getElementById("message")?.value.trim();

      if (!name || !email || !msg) {
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      const body =
        `Name: ${name}%0D%0A` +
        `Email: ${email}%0D%0A%0D%0A` +
        `${encodeURIComponent(msg)}`;

      const mailto = `mailto:withanagevidhu@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailto;

      showMessage("Opening your email app…", "success");
      form.reset();
    });
  }

  // ===== 8) Back to top + year =====
  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 450) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});