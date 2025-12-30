// select elements
const navLinks = document.querySelectorAll(".nav-links a");
const sectionsList = document.querySelectorAll("section");
let themeToggleBtn = document.getElementById("theme-toggle-button");
let htmlTag = document.querySelector("html");
let portfolioFilterBtns = document.querySelectorAll(
  "#portfolio-filters .portfolio-filter"
);
let portfolioItems = document.querySelectorAll(
  "#portfolio-grid .portfolio-item"
);
let settingsToggle = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let closeSettings = document.getElementById("close-settings");
let fontOptions = Array.from(document.querySelectorAll(".font-option"));
let colorOptions = document.querySelectorAll("#theme-colors-grid button");
let resetSettingsBtn = document.getElementById("reset-settings");
let toogleMobileMenuBtn = document.querySelector(".mobile-menu-btn");
let mobileMenu = document.querySelector(".nav-links");
const carousel = document.getElementById("testimonials-carousel");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const cards = document.querySelectorAll(".testimonial-card");
const indicators = document.querySelectorAll(".carousel-indicator");
// calc NavHeight
const navHeight = document.querySelector("nav").offsetHeight;

// windo scroll event
window.addEventListener("scroll", scrollHandler);
// scroll handle function
function scrollHandler() {
  let currentSection = "";
  sectionsList.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY + navHeight;
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });
  // remove active class for all navLiks
  navLinks.forEach((link) => link.classList.remove("active"));
  //get target active link
  const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
  if (activeLink) {
    // add active class
    activeLink.classList.add("active");
  }
}
// when click on navlink
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // remove event scroll from window
    window.removeEventListener("scroll", scrollHandler);
    // remove active clas from links
    navLinks.forEach((l) => l.classList.remove("active"));
    setTimeout(() => {
      // add active class for cliked link
      this.classList.add("active");
      // add agin event scroll
      window.addEventListener("scroll", scrollHandler);
    }, 1500);
  });
});
// Swithc The Theme
if (localStorage.getItem("theme")) {
  htmlTag.classList.replace(
    htmlTag.classList[0],
    localStorage.getItem("theme")
  );
}
// toggleTheme Btn click event
themeToggleBtn.addEventListener("click", function () {
  if (htmlTag.classList.contains("dark")) {
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
    localStorage.setItem("theme", "light");
  } else if (htmlTag.classList.contains("light")) {
    htmlTag.classList.remove("light");
    htmlTag.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});
// Nav And tabs
portfolioFilterBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    updatePortfolioFilters(e.target);
    // console.log(e.target.getAttribute("data-filter"));
    displayPortfolioItems(e.target.getAttribute("data-filter"));
  });
});
// initial call
displayPortfolioItems("all");
// displayPortfolioItems function
function displayPortfolioItems(filter) {
  for (let i = 0; i < portfolioItems.length; i++) {
    portfolioItems[i].style.setProperty("transform", "scale(0.5)");
    portfolioItems[i].style.setProperty("opacity", "0");
    portfolioItems[i].classList.remove("relative");
    portfolioItems[i].classList.add("absolute", "invisible");

    if (
      filter == portfolioItems[i].getAttribute("data-category") ||
      filter == "all"
    ) {
      console.log(portfolioItems[i].getAttribute("data-category"));
      portfolioItems[i].classList.add("relative");
      portfolioItems[i].classList.remove("absolute", "invisible");
      portfolioItems[i].style.setProperty("opacity", "1");
      portfolioItems[i].style.setProperty("transform", "scale(1)");
      portfolioItems[i].style.transition =
        "opacity 0.3s ease, transform 0.3s ease";
    }
  }
}
// update filters function
function updatePortfolioFilters(targetFilter) {
  portfolioFilterBtns.forEach((button) => {
    button.setAttribute(
      "class",
      "portfolio-filter px-8 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700"
    );
  });
  targetFilter.setAttribute(
    "class",
    "portfolio-filter active px-8 py-3 rounded-xl bg-linear-to-r from-primary to-secondary text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
  );
}
// slider section
let currentIndex = 0;
// calc card width function
function getCardWidth() {
  const card = cards[0];
  const width = card.offsetWidth; //card width without margins
  // get margins
  const style = window.getComputedStyle(card);
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  // return total card width include margins
  return width + marginLeft + marginRight;
}
// get num of cards that are visible
function getVisibleCardsCount() {
  const carouselWidth = carousel.parentElement.offsetWidth;
  const cardWidth = getCardWidth();
  return Math.round(carouselWidth / cardWidth) || 1;
}
// Initialize
updateCarousel();
function updateCarousel() {
  const visibleCount = getVisibleCardsCount();
  const maxIndex = Math.max(0, cards.length - visibleCount);
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  if (currentIndex < 0) currentIndex = 0;
  const cardWidth = getCardWidth();
  const translateX = currentIndex * cardWidth * 1;
  carousel.style.transform = `translateX(${translateX}px)`;
  updateIndicators();
}
// step function
function stepCarousel(step) {
  const visibleCount = getVisibleCardsCount();
  const maxIndex = cards.length - visibleCount;
  currentIndex += step;
  if (currentIndex > maxIndex) currentIndex = 0;
  if (currentIndex < 0) currentIndex = maxIndex;
  updateCarousel();
}
// Events
nextBtn.addEventListener("click", () => stepCarousel(1));
prevBtn.addEventListener("click", () => stepCarousel(-1));
window.addEventListener("resize", updateCarousel);

// Indicators Click
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});
// update indictors function
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.className =
        "carousel-indicator w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer bg-accent scale-125";
    } else {
      indicator.className =
        "carousel-indicator w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer bg-slate-400 dark:bg-slate-600";
    }
  });
}
// Custome Site Settings
// call initial settings function
initialSettings();
// localstorage font option
if (localStorage.getItem("fontOption")) {
  // clear options
  clearFontOptions();
  // fontOptions
  fontOptions.forEach((option) => {
    if (
      option.getAttribute("data-font") == localStorage.getItem("fontOption")
    ) {
      // call active font option
      activeFontOption(option);
    }
  });
  // get new font
  let newFont = localStorage.getItem("fontOption");
  // set font Option
  setFontOption(newFont);
}
// color options localstorage
if (localStorage.getItem("selectedTheme")) {
  let selectedTheme = JSON.parse(localStorage.getItem("selectedTheme"));
  // set colors Theme
  setColorsTheme(selectedTheme);

  // clear option
  clearColorOptions();
  // set selected option
  colorOptions.forEach((option) => {
    if (
      option.getAttribute("data-primary") == selectedTheme.primary &&
      option.getAttribute("data-secondary") == selectedTheme.secondary &&
      option.getAttribute("data-accent") == selectedTheme.accent
    ) {
      // selected active colorOption
      activeColorOption(option);
    }
  });
}
// open settings sidebar
settingsToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  // open sidebar
  settingsSidebar.classList.remove("translate-x-full");
  //move the settings toogle
  settingsToggle.style.right = "20rem";
});
// close settings sidebar when click on closeSettings btn
closeSettings.addEventListener("click", closeSettingsSideBar);
// close settings sidebar function
function closeSettingsSideBar() {
  // close sidebar
  settingsSidebar.classList.add("translate-x-full");
  //move the settings toogle
  settingsToggle.style.right = "0rem";
}
// close settings slider when click outside it
document.addEventListener("click", function (e) {
  if (!e.target.closest("#settings-sidebar")) {
    closeSettingsSideBar();
  }
});
// console.log(fontOptions);
fontOptions.forEach((fontOption) => {
  fontOption.addEventListener("click", function () {
    // clear option
    clearFontOptions();
    // selected option
    activeFontOption(fontOption);
    // get new font
    let newFont = fontOption.getAttribute("data-font");
    // set font option
    setFontOption(newFont);
    // set localstorage
    localStorage.setItem("fontOption", newFont);
  });
});
// active fontOption function
function activeFontOption(fontOption) {
  fontOption.setAttribute(
    "class",
    "font-option w-full p-4 rounded-xl border hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-right group relative overflow-hidden active border-primary bg-slate-50 dark:bg-slate-800"
  );
}
// fun ction that set font option
function setFontOption(newFont) {
  let oldFont = document.body.classList[0];
  document.body.classList.replace(oldFont, `font-${newFont}`);
}
// function to clear font options
function clearFontOptions() {
  fontOptions.forEach((option) => {
    option.setAttribute(
      "class",
      "font-option w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-right group relative overflow-hidden"
    );
  });
}
// loop on color opitions
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener("click", function () {
    // clear color options
    clearColorOptions();
    // selected active colorOption
    activeColorOption(colorOption);
    let selectedTheme = {
      primary: colorOption.getAttribute("data-primary"),
      secondary: colorOption.getAttribute("data-secondary"),
      accent: colorOption.getAttribute("data-accent"),
    };
    // set colors Theme
    setColorsTheme(selectedTheme);
    // set localstorage
    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
  });
});
// clear color options function
function clearColorOptions() {
  colorOptions.forEach((colorOption) => {
    colorOption.setAttribute(
      "class",
      "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"
    );
  });
}
// set colorOption Function
function setColorsTheme(selectedTheme) {
  document.documentElement.style.setProperty(
    "--color-primary",
    selectedTheme.primary
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    selectedTheme.secondary
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    selectedTheme.accent
  );
}
//active colorOption function
function activeColorOption(colorOption) {
  colorOption.setAttribute(
    "class",
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900"
  );
}
// reset settings
resetSettingsBtn.addEventListener("click", function () {
  localStorage.removeItem("selectedTheme");
  localStorage.removeItem("fontOption");
  initialSettings();
});
// initial settinngs function
function initialSettings() {
  if (localStorage.getItem("fontOption") == null) {
    // clear font options
    clearFontOptions();
    // active selected option
    activeFontOption(fontOptions[1]);
    // set default font
    setFontOption("tajawal");
    // set localstorage
    localStorage.setItem("fontOption", "tajawal");
  }
  if (localStorage.getItem("selectedTheme") == null) {
    // clear colors options
    clearColorOptions();
    // selected active colorOptione
    activeColorOption(colorOptions[0]);
    // set default colorsTheme
    let defaultTheme = {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#a855f7",
    };
    setColorsTheme(defaultTheme);
  }
}
// scroll to top
let scrollToTop = document.getElementById("scroll-to-top");
window.addEventListener("scroll", function () {
  if (this.scrollY >= 400) {
    // show
    scrollToTop.classList.remove("opacity-0", "invisible");
    scrollToTop.classList.add("opacity-1", "visible");
  } else {
    // hide
    scrollToTop.classList.add("opacity-0", "invisible");
    scrollToTop.classList.remove("opacity-1", "visible");
  }
});
// trigger event scroll to top
scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// toggle mobile menu
toogleMobileMenuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
});
// close mobile menu when click on nanlink
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });
});
// ====================================

const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((select) => {
  const optionsMenu = select.nextElementSibling;
  const options = optionsMenu.querySelectorAll(".custom-option");
  const selectedText = select.querySelector(".selected-text");
  select.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllSelects(select);
    optionsMenu.classList.toggle("hidden");
  });
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      selectedText.innerText = value;
      selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
      selectedText.classList.add("text-slate-800", "dark:text-white");
      optionsMenu.classList.add("hidden");
    });
  });
});
function closeAllSelects(exceptThisOne = null) {
  document.querySelectorAll(".custom-options").forEach((menu) => {
    if (menu !== (exceptThisOne ? exceptThisOne.nextElementSibling : null)) {
      menu.classList.add("hidden");
      const parentSelect = menu.previousElementSibling;
      parentSelect.querySelector("i").classList.remove("rotate-180");
    }
  });
}
document.addEventListener("click", () => closeAllSelects());
