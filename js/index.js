(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;

  function waLink() {
    return (
      "https://wa.me/" +
      cfg.whatsappNumber +
      "?text=" +
      encodeURIComponent(cfg.whatsappMessage)
    );
  }
  function mailLink() {
    return "mailto:" + cfg.email;
  }

  [
    "topbar-whatsapp",
    "hero-whatsapp",
    "final-whatsapp",
    "sticky-whatsapp",
  ].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = waLink();
  });
  ["hero-email", "final-email"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = mailLink();
  });

  document.getElementById("topbar-brand").textContent = cfg.businessName;
  document.getElementById("hero-headline").textContent = cfg.tagline;
  document.getElementById("hero-subhead").textContent = cfg.heroSubhead;

  var aboutWrap = document.getElementById("about-text");
  cfg.aboutText.forEach(function (paragraph) {
    var p = document.createElement("p");
    p.textContent = paragraph;
    aboutWrap.appendChild(p);
  });

  var credWrap = document.getElementById("credentials-strip");
  cfg.credentials.forEach(function (text) {
    var li = document.createElement("li");
    li.textContent = text;
    credWrap.appendChild(li);
  });

  (function initTestimonialSlider() {
    var testimonials = cfg.testimonials;
    var slider = document.getElementById("testimonial-slider");
    var quoteEl = document.getElementById("slider-quote");
    var avatarEl = document.getElementById("slider-avatar");
    var nameEl = document.getElementById("slider-name");
    var roleEl = document.getElementById("slider-role");
    var dotsEl = document.getElementById("slider-dots");
    var index = 0;

    var dots = testimonials.map(function (t, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider-dot";
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      dot.addEventListener("click", function () {
        show(i);
      });
      dotsEl.appendChild(dot);
      return dot;
    });

    function show(i) {
      index = (i + testimonials.length) % testimonials.length;
      var t = testimonials[index];

      quoteEl.textContent = t.quote;
      nameEl.textContent = t.name;
      roleEl.textContent = t.title || "";
      roleEl.hidden = !t.title;

      if (t.photo) {
        avatarEl.src = t.photo;
        avatarEl.alt = t.name;
        avatarEl.hidden = false;
      } else {
        avatarEl.hidden = true;
      }

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function prev() {
      show(index - 1);
    }
    function next() {
      show(index + 1);
    }

    ["slider-prev-desktop", "slider-prev-mobile"].forEach(function (id) {
      document.getElementById(id).addEventListener("click", prev);
    });
    ["slider-next-desktop", "slider-next-mobile"].forEach(function (id) {
      document.getElementById(id).addEventListener("click", next);
    });

    slider.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        prev();
      } else if (event.key === "ArrowRight") {
        next();
      }
    });

    show(0);
  })();

  var servicesGrid = document.getElementById("services-grid");
  cfg.services.forEach(function (service) {
    var card = document.createElement("div");
    card.className = "service-card";
    var h3 = document.createElement("h3");
    h3.textContent = service.title;
    var p = document.createElement("p");
    p.textContent = service.description;
    card.appendChild(h3);
    card.appendChild(p);
    servicesGrid.appendChild(card);
  });

  document.getElementById("footer-phone").textContent =
    "Phone: " + cfg.phoneDisplay;
  document.getElementById("footer-email").textContent = "Email: " + cfg.email;
  document.getElementById("footer-hours").textContent = cfg.serviceHours;

  document.title =
    "Home Physiotherapy in " + cfg.city + " | " + cfg.businessName;
})();
