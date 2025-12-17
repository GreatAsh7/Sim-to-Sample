// Simple smooth scroll for in-page navigation
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    event.preventDefault();
    const headerOffset = 70;
    const rect = targetEl.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Close mobile nav after navigation
    const nav = document.querySelector(".nav");
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Prototype gallery lightbox & carousel
const galleryImages = document.querySelectorAll(".prototype-card img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxImg && lightboxClose && galleryImages.length > 0) {
  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Sim-to-Sample prototype view";
    lightbox.classList.add("open");
    document.body.classList.add("noscroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.classList.remove("noscroll");
    lightboxImg.src = "";
  };

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

// Carousel controls (scroll-based)
const track = document.querySelector(".prototype-track");
const slides = document.querySelectorAll(".prototype-card");
const prevArrow = document.querySelector(".carousel-arrow.prev");
const nextArrow = document.querySelector(".carousel-arrow.next");

if (track && slides.length > 0 && prevArrow && nextArrow) {
  let currentIndex = 0;
  const totalSlides = slides.length;

  const scrollToIndex = () => {
    const targetSlide = slides[currentIndex];
    if (!targetSlide) return;
    const offsetLeft = targetSlide.offsetLeft;
    track.scrollTo({
      left: offsetLeft,
      behavior: "smooth",
    });
  };

  const goToNext = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    scrollToIndex();
  };

  const goToPrev = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    scrollToIndex();
  };

  prevArrow.addEventListener("click", goToPrev);
  nextArrow.addEventListener("click", goToNext);

  // Initial position
  scrollToIndex();
}

