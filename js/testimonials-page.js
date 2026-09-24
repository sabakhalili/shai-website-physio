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

  var grid = document.getElementById("testimonials-grid");
  cfg.testimonials.forEach(function (t) {
    grid.appendChild(renderTestimonialCard(t));
  });

  document.getElementById("footer-phone").textContent =
    "Phone: " + cfg.phoneDisplay;
  document.getElementById("footer-email").textContent = "Email: " + cfg.email;
  document.getElementById("footer-hours").textContent = cfg.serviceHours;
})();
