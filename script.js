const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const languageButtons = document.querySelectorAll("[data-language]");
const form = document.querySelector("[data-visit-form]");
const formNote = document.querySelector("[data-form-note]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

let language = "zh";
languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    language = language === "zh" ? "en" : "zh";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    languageButtons.forEach((item) => {
      item.textContent = language === "zh" ? "EN / 中文" : "中文 / EN";
    });

    document.querySelectorAll("[data-zh][data-en]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.innerHTML =
    language === "zh"
      ? "<span>预约意向已在原型中完成。正式版本将由门店顾问与你联系。</span>"
      : "<span>Request completed in this prototype. A store advisor will contact you in the live version.</span>";
  formNote.style.color = "#151412";
});
