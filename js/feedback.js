(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;

  document.getElementById("topbar-brand").textContent = cfg.businessName;

  // Wire up the topbar WhatsApp button.
  var topbarWhatsapp = document.getElementById("topbar-whatsapp");
  if (topbarWhatsapp) {
    topbarWhatsapp.href =
      "https://wa.me/" +
      cfg.whatsappNumber +
      "?text=" +
      encodeURIComponent(cfg.whatsappMessage);
  }

  var form = document.getElementById("feedback-form");
  var submitBtn = document.getElementById("submit-btn");
  var errorStatus = document.getElementById("error-status");
  var successStatus = document.getElementById("success-status");
  var reviewLink = document.getElementById("review-link");

  function setFieldError(fieldId, hasError) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.toggle("has-error", hasError);
  }

  function showStatus(el, visible) {
    el.setAttribute("data-visible", visible ? "true" : "false");
  }

  function hideStatuses() {
    showStatus(errorStatus, false);
    showStatus(successStatus, false);
  }

  function validate(data) {
    var errors = {};

    var comments = data.comments.trim();
    if (!comments || comments.length > 1000) {
      errors["comments-field"] = true;
    }

    if (data.name && data.name.length > 100) {
      errors["name-field"] = true;
    }

    return errors;
  }

  function readFormData() {
    var formData = new FormData(form);
    return {
      comments: String(formData.get("comments") || ""),
      name: String(formData.get("name") || "").trim(),
      website: String(formData.get("website") || ""),
    };
  }

  function setSending(isSending) {
    submitBtn.disabled = isSending;
    submitBtn.textContent = isSending ? "Sending…" : "Submit feedback";
  }

  async function submitToAppsScript(data) {
    var body = new URLSearchParams({
      comments: data.comments.trim(),
      name: data.name,
    });

    try {
      var response = await fetch(cfg.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: body.toString(),
      });

      var result = await response.json();
      return !!result.ok;
    } catch (err) {
      // Response may be unreadable due to how Apps Script handles redirects.
      // Fall back to firing the request without reading the response, and
      // treat it as an optimistic success — the Sheet row is the source of
      // truth either way.
      try {
        await fetch(cfg.appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: body.toString(),
        });
        return true;
      } catch (fallbackErr) {
        return false;
      }
    }
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    hideStatuses();

    var data = readFormData();

    // Honeypot: silently fake success without sending anything.
    if (data.website) {
      form.reset();
      showStatus(successStatus, true);
      return;
    }

    var errors = validate(data);
    ["name-field", "comments-field"].forEach(function (fieldId) {
      setFieldError(fieldId, !!errors[fieldId]);
    });

    if (Object.keys(errors).length > 0) {
      var firstErrorField = document.getElementById(
        Object.keys(errors)[0]
      );
      if (firstErrorField) firstErrorField.scrollIntoView({ block: "center" });
      return;
    }

    setSending(true);
    var ok = await submitToAppsScript(data);
    setSending(false);

    if (ok) {
      form.reset();
      if (cfg.googleReviewUrl && !cfg.googleReviewUrl.includes("REPLACE_ME")) {
        reviewLink.href = cfg.googleReviewUrl;
        reviewLink.hidden = false;
      }
      showStatus(successStatus, true);
    } else {
      showStatus(errorStatus, true);
    }
  });
})();
