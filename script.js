const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-cta");
const sections = document.querySelectorAll("main section[id]");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isExpanded);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");
const emailInput = document.querySelector("#email");
const requiredInputs = contactForm.querySelectorAll("[required]");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "";
  feedback.classList.remove("error");

  let firstInvalidInput = null;
  requiredInputs.forEach((input) => {
    const isEmail = input === emailInput;
    const isValid = input.value.trim() !== "" && (!isEmail || emailPattern.test(input.value.trim()));
    input.setAttribute("aria-invalid", String(!isValid));
    if (!isValid && firstInvalidInput === null) firstInvalidInput = input;
  });

  if (firstInvalidInput) {
    feedback.textContent = firstInvalidInput === emailInput && emailInput.value.trim()
      ? "Please enter a valid email address."
      : "Please complete all required fields.";
    feedback.classList.add("error");
    firstInvalidInput.focus();
    return;
  }

  feedback.textContent = "Thanks for your note! This demo form is validated, but isn’t connected to an email service yet.";
  contactForm.reset();
  requiredInputs.forEach((input) => input.removeAttribute("aria-invalid"));
});

requiredInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (feedback.classList.contains("error")) {
      feedback.textContent = "";
      feedback.classList.remove("error");
    }
  });
});
