// Toggle menu
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


// Hero particles – single init!
tsParticles.load("tsparticles-hero", {
  fullScreen: { enable: false },   // keep it inside the hero container
  fpsLimit: 60,
  particles: {
    number:  { value: 80, density: { enable: true, area: 800 } },
    shape:   { type: "circle" },    // circles instead of triangles
    color:   { value: "#8a2be2" },
    opacity: { value: 0.35 },
    size:    { value: { min: 1, max: 4 } },
    links: {
      enable:   true,
      distance: 140,                // slightly longer link lengths
      color:    "#8a2be2",
      opacity:  0.3,
      width:    1
    },
    move: {
      enable:   true,
      speed:    0.5,
      outModes: { default: "bounce" }
    }
  },
  detectRetina: true
});





// Typewriter effect
const phrases = [
  "I design and develop websites",
  "I study and analyze healthcare data"
];
let currentPhraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 150;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    typingSpeed = 200;
  }

  setTimeout(typeEffect, typingSpeed);
}
typeEffect();




// grab the two cursor elements
const innerDot  = document.querySelector('.custom-cursor');
const outerRing = document.querySelector('.cursor-trail');

// hide any native pointer
document.body.style.cursor = 'none';

// track mouse coords
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// update inner dot instantly
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  innerDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

// animate outer ring with a slight lag
function animateTrail() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  outerRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
  requestAnimationFrame(animateTrail);
}
requestAnimationFrame(animateTrail);

// on nav‐link hover: only grow the outer circle & tint the dot black
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    outerRing.style.width  = '40px';
    outerRing.style.height = '40px';
    innerDot.style.background = 'white'; 
  });
  link.addEventListener('mouseleave', () => {
    outerRing.style.width  = '32px';
    outerRing.style.height = '32px';
    innerDot.style.background = 'white';
  });
});
// invert cursor over any .light-bg area
const lightAreas = document.querySelectorAll('.light-bg');
lightAreas.forEach(area => {
  area.addEventListener('mouseenter', () => {
    document.body.classList.add('light-cursor');
  });
  area.addEventListener('mouseleave', () => {
    document.body.classList.remove('light-cursor');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('.about-section, .hero-section, .skills-section, .projects-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Scroll animations
const animatedElements = document.querySelectorAll('.about-section, .skills-section, .projects-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(element => {
  element.classList.add('fade-in');
  observer.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Account for fixed header
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navMenu = document.querySelector("nav ul");
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const menuToggle = document.querySelector(".menu-toggle");
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formContainer = contactForm.parentElement;
    contactForm.style.display = 'none';

    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <h3>Thank you for your message!</h3>
      <p>I'll get back to you as soon as possible.</p>
    `;
    formContainer.appendChild(successMessage);
  });
}
