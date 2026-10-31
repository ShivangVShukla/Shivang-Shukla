document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var pointerReticle = document.createElement("div");
    pointerReticle.className = "pointer-reticle";
    pointerReticle.setAttribute("aria-hidden", "true");
    pointerReticle.innerHTML = '<svg viewBox="0 0 48 48" focusable="false"><circle class="pointer-reticle__outer" cx="24" cy="24" r="20"></circle><circle class="pointer-reticle__ring" cx="24" cy="24" r="12"></circle><path class="pointer-reticle__crosshair" d="M24 1v7m0 32v7M1 24h7m32 0h7"></path><circle class="pointer-reticle__core" cx="24" cy="24" r="2"></circle></svg>';
    document.body.appendChild(pointerReticle);
    document.documentElement.classList.add("has-pointer-reticle");

    document.addEventListener("pointermove", function (event) {
      pointerReticle.style.setProperty("--pointer-x", event.clientX + "px");
      pointerReticle.style.setProperty("--pointer-y", event.clientY + "px");
      pointerReticle.classList.add("is-visible");
    });

    document.addEventListener("pointerover", function (event) {
      if (!(event.target instanceof Element)) {
        return;
      }

      pointerReticle.classList.toggle("is-interactive", Boolean(event.target.closest("a, button, [role='button'], select")));
      pointerReticle.classList.toggle("is-text", Boolean(event.target.closest("input, textarea, [contenteditable='true']")));
    });

    document.addEventListener("pointerdown", function () {
      pointerReticle.classList.add("is-pressed");
    });

    document.addEventListener("pointerup", function () {
      pointerReticle.classList.remove("is-pressed");
    });

    document.addEventListener("pointerleave", function () {
      pointerReticle.classList.remove("is-visible");
    });

    document.addEventListener("pointerenter", function () {
      pointerReticle.classList.add("is-visible");
    });
  }

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

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var formStatus = document.getElementById("form-status");
    var submitButton = contactForm.querySelector("button[type='submit']");
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitButton.disabled = true;
      formStatus.textContent = "Sending your message...";

      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm)
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("The message could not be sent. Please try again.");
          }
          return response.json();
        })
        .then(function (result) {
          if (!result.success) {
            throw new Error(result.message || "The message could not be sent. Please try again.");
          }
          window.location.assign(new URL("thank-you.html", window.location.href).href);
        })
        .catch(function (error) {
          formStatus.textContent = error.message || "The message could not be sent. Please check your connection and try again.";
          submitButton.disabled = false;
        });
    });
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
