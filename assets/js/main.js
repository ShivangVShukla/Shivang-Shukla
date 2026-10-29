document.addEventListener("DOMContentLoaded", function () {
  var bootScreen = document.querySelector(".boot-screen");
  if (bootScreen) {
    var bootDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 60 : 1000;
    window.setTimeout(function () {
      bootScreen.classList.add("is-leaving");
      window.setTimeout(function () {
        bootScreen.hidden = true;
      }, 450);
    }, bootDelay);
  }

  var revealElements = document.querySelectorAll("main > section, main > .project-list, main > .page-next");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      for (var revealIndex = 0; revealIndex < entries.length; revealIndex++) {
        if (entries[revealIndex].isIntersecting) {
          entries[revealIndex].target.classList.add("is-visible");
          observer.unobserve(entries[revealIndex].target);
        }
      }
    }, { threshold: 0.12 });

    for (var revealItem = 0; revealItem < revealElements.length; revealItem++) {
      revealElements[revealItem].classList.add("scroll-reveal");
      revealObserver.observe(revealElements[revealItem]);
    }
  }

  var menuButton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-links");
  var themeButton = document.querySelector(".theme-toggle");
  var yearNodes = document.querySelectorAll(".year");
  var clockNode = document.getElementById("clock");
  var filterButtons = document.querySelectorAll(".filter-button");
  var projectCards = document.querySelectorAll(".project-detail");
  var copyButtons = document.querySelectorAll(".copy-button");

  for (var i = 0; i < yearNodes.length; i++) {
    yearNodes[i].textContent = new Date().getFullYear();
  }

  var formRedirect = document.getElementById("form-redirect");
  if (formRedirect) {
    formRedirect.value = new URL("thank-you.html", window.location.href).href;
  }

  function updateClock() {
    if (clockNode) {
      var now = new Date();
      clockNode.textContent = "LOCAL_TIME " + now.toLocaleTimeString("en-GB");
    }
  }

  updateClock();
  if (clockNode) {
    window.setInterval(updateClock, 1000);
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    var navLinks = nav.querySelectorAll("a");
    for (var j = 0; j < navLinks.length; j++) {
      navLinks[j].addEventListener("click", function () {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    }
  }

  if (themeButton) {
    var themeKey = "shivang-portfolio-theme";

    function setTheme(theme, persist) {
      var isLight = theme === "light";
      document.body.classList.toggle("light-mode", isLight);
      themeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      themeButton.setAttribute("title", isLight ? "Switch to dark theme" : "Switch to light theme");
      themeButton.setAttribute("aria-pressed", String(isLight));

      if (persist) {
        localStorage.setItem(themeKey, isLight ? "light" : "dark");
      }
    }

    setTheme(localStorage.getItem(themeKey) === "light" ? "light" : "dark", false);

    themeButton.addEventListener("click", function () {
      var nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
      setTheme(nextTheme, true);
    });

    window.addEventListener("storage", function (event) {
      if (event.key === themeKey) {
        setTheme(event.newValue === "light" ? "light" : "dark", false);
      }
    });
  }

  for (var k = 0; k < filterButtons.length; k++) {
    filterButtons[k].addEventListener("click", function () {
      var selectedFilter = this.getAttribute("data-filter");
      for (var m = 0; m < filterButtons.length; m++) {
        filterButtons[m].classList.remove("active");
      }
      this.classList.add("active");

      for (var n = 0; n < projectCards.length; n++) {
        var categories = projectCards[n].getAttribute("data-category").split(" ");
        projectCards[n].style.display = selectedFilter === "all" || categories.indexOf(selectedFilter) !== -1 ? "" : "none";
      }
    });
  }

  for (var p = 0; p < copyButtons.length; p++) {
    copyButtons[p].addEventListener("click", function () {
      var textToCopy = this.getAttribute("data-copy");
      var button = this;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          button.textContent = "copied!";
          window.setTimeout(function () {
            button.textContent = "copy";
          }, 1500);
        });
      } else {
        var temporaryInput = document.createElement("textarea");
        temporaryInput.value = textToCopy;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        document.execCommand("copy");
        document.body.removeChild(temporaryInput);
        button.textContent = "copied!";
        window.setTimeout(function () {
          button.textContent = "copy";
        }, 1500);
      }
    });
  }

  var hash = window.location.hash;
  if (hash) {
    var target = document.querySelector(hash);
    if (target) {
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
});
