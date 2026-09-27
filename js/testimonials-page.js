(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;

  document.getElementById("topbar-brand").textContent = cfg.businessName;
  document.title = "Testimonials | " + cfg.businessName;

  var waLink =
    "https://wa.me/" +
    cfg.whatsappNumber +
    "?text=" +
    encodeURIComponent(cfg.whatsappMessage);
  ["topbar-whatsapp", "sticky-whatsapp"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = waLink;
  });

  document.getElementById("footer-phone").textContent =
    "Phone: " + cfg.phoneDisplay;
  document.getElementById("footer-email").textContent = "Email: " + cfg.email;
  document.getElementById("footer-hours").textContent = cfg.serviceHours;

  var grid = document.getElementById("testimonials-grid");
  var stateEl = document.getElementById("testimonials-state");

  function showState(message) {
    grid.hidden = true;
    stateEl.hidden = false;
    stateEl.textContent = message;
  }

  function showGrid() {
    stateEl.hidden = true;
    grid.hidden = false;
  }

  showState("Loading testimonials…");

  fetch(cfg.appsScriptUrl, { method: "GET" })
    .then(function (response) {
      if (!response.ok) throw new Error("Non-OK response");
      return response.json();
    })
    .then(function (data) {
      if (!data || data.ok !== true || !Array.isArray(data.testimonials)) {
        throw new Error("Malformed response");
      }
      if (data.testimonials.length === 0) {
        showState("No testimonials yet — check back soon.");
        return;
      }
      data.testimonials.forEach(function (t) {
        // renderTestimonialCard expects {quote, name, title?, photo?} —
        // Sheet-sourced testimonials have no title/photo, both optional.
        grid.appendChild(
          renderTestimonialCard({ quote: t.comment, name: t.name })
        );
      });
      showGrid();
    })
    .catch(function () {
      showState("Couldn't load testimonials right now. Please try again later.");
    });
})();
