/* =====================================================
   PORTFOLIO MAIN JAVASCRIPT
   Vidushika Madhushani
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  const sections = document.querySelectorAll(
    "section[id], header[id]"
  );

  const typedTextEl = document.getElementById("typed-text");
  const backToTopBtn = document.getElementById("back-to-top");

  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  const yearEl = document.getElementById("year");


  /* ================= NAVBAR SCROLL ================= */

  function onScroll() {

    if (navbar) {

      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    }

    updateActiveLink();
    updateBackToTop();

  }

  window.addEventListener("scroll", onScroll);

  onScroll();


  /* ================= ACTIVE NAV LINK ================= */

  function updateActiveLink() {

    const y = window.scrollY + 140;

    sections.forEach((section) => {

      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (
        y >= top &&
        y < top + height
      ) {

        navLinks.forEach((link) => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );

        });

      }

    });

  }


  /* ================= MOBILE MENU ================= */

  if (
    hamburger &&
    navLinksContainer
  ) {

    hamburger.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        hamburger.classList.toggle("active");

        navLinksContainer.classList.toggle("open");

      }
    );


    navLinksContainer
      .querySelectorAll(".nav-link")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            hamburger.classList.remove("active");

            navLinksContainer.classList.remove("open");

          }
        );

      });


    document.addEventListener(
      "click",
      (event) => {

        if (
          !hamburger.contains(event.target) &&
          !navLinksContainer.contains(event.target)
        ) {

          hamburger.classList.remove("active");

          navLinksContainer.classList.remove("open");

        }

      }
    );

  }


  /* ================= SMOOTH SCROLL ================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(href);

          if (!target) {
            return;
          }

          event.preventDefault();

          const offset = 80;

          const y =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

          window.scrollTo({
            top: y,
            behavior: "smooth"
          });

        }
      );

    });


  /* ================= TYPED TEXT ================= */

  if (typedTextEl) {

    const phrases = [

      "IT Undergraduate at SLIIT",

      "Aspiring Software Developer",

      "Full-Stack Developer",

      "DevOps Enthusiast",

      "Cloud Technology Enthusiast"

    ];

    let phraseIndex = 0;

    let charIndex = 0;

    let deleting = false;


    function typeEffect() {

      const currentPhrase =
        phrases[phraseIndex];


      if (!deleting) {

        charIndex++;

        typedTextEl.textContent =
          currentPhrase.substring(
            0,
            charIndex
          );


        if (
          charIndex ===
          currentPhrase.length
        ) {

          deleting = true;

          setTimeout(
            typeEffect,
            1400
          );

          return;

        }

      } else {

        charIndex--;

        typedTextEl.textContent =
          currentPhrase.substring(
            0,
            charIndex
          );


        if (charIndex === 0) {

          deleting = false;

          phraseIndex =
            (phraseIndex + 1) %
            phrases.length;

        }

      }


      const speed =
        deleting
          ? 40
          : 80;

      setTimeout(
        typeEffect,
        speed
      );

    }


    setTimeout(
      typeEffect,
      700
    );

  }


  /* ================= SCROLL REVEAL ================= */

  const revealElements =
    document.querySelectorAll(
      ".fade-up, .fade-left, .fade-right"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(
      (element) => {

        observer.observe(element);

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* ================= CONTACT FORM ================= */

  function showMessage(
    text,
    type
  ) {

    if (!messageBox) {
      return;
    }

    messageBox.textContent = text;

    messageBox.className =
      `form-message ${type}`;

    messageBox.style.display =
      "block";


    setTimeout(() => {

      messageBox.className =
        "form-message";

      messageBox.style.display =
        "none";

    }, 5000);

  }


  if (form) {

    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const name =
          document
            .getElementById("name")
            ?.value
            .trim();


        const email =
          document
            .getElementById("email")
            ?.value
            .trim();


        const subject =
          document
            .getElementById("subject")
            ?.value
            .trim() ||
          "Portfolio Contact";


        const message =
          document
            .getElementById("message")
            ?.value
            .trim();


        if (
          !name ||
          !email ||
          !message
        ) {

          showMessage(
            "Please fill in all required fields.",
            "error"
          );

          return;

        }


        const emailValid =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);


        if (!emailValid) {

          showMessage(
            "Please enter a valid email address.",
            "error"
          );

          return;

        }


        const body =
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `${message}`;


        const mailto =
          `mailto:withanagevidhu@gmail.com` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;


        showMessage(
          "Opening your email application...",
          "success"
        );


        window.location.href =
          mailto;


        form.reset();

      }
    );

  }


  /* ================= BACK TO TOP ================= */

  function updateBackToTop() {

    if (!backToTopBtn) {
      return;
    }

    if (window.scrollY > 450) {

      backToTopBtn.classList.add(
        "visible"
      );

    } else {

      backToTopBtn.classList.remove(
        "visible"
      );

    }

  }


  if (backToTopBtn) {

    backToTopBtn.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* ================= CURRENT YEAR ================= */

  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }

});
