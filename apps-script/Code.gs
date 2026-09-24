/**
 * Apps Script backend for the feedback form.
 *
 * SETUP:
 * 1. Create a Google Sheet for feedback (or use an existing one).
 * 2. Extensions → Apps Script. Paste this whole file in as Code.gs.
 * 3. Deploy → New deployment → type "Web app".
 *    - Execute as: Me (the Sheet owner)
 *    - Who has access: Anyone
 * 4. Copy the /exec URL it gives you into js/config.js as `appsScriptUrl`.
 * 5. IMPORTANT: every time you edit this file, you must create a NEW
 *    deployment version (Deploy → Manage deployments → edit → new version),
 *    or the old code keeps running.
 * 6. Optional: set NOTIFY_EMAIL below to get an email on each submission.
 */

var SHEET_NAME = "Feedback"; // change if your sheet tab has a different name
var NOTIFY_EMAIL = ""; // e.g. "her@example.com" — leave blank to disable
var HEADER_ROW = ["timestamp", "comments", "name"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var params = parseParams(e);
    var validation = validate(params);

    if (!validation.ok) {
      return jsonResponse({
        ok: false,
        error: validation.error,
        debug: {
          postDataType: e && e.postData && e.postData.type,
          postDataLength: e && e.postData && e.postData.length,
          postDataContents: e && e.postData && e.postData.contents,
          parsedParams: params,
        },
      });
    }

    var sheet = getSheet();
    sheet.appendRow([
      formatTimestamp(),
      sanitize(params.comments.trim()),
      sanitize((params.name || "").trim()),
    ]);

    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail(
          NOTIFY_EMAIL,
          "New feedback received",
          params.comments
        );
      } catch (mailErr) {
        // Don't fail the submission just because the notification email
        // couldn't be sent.
      }
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: "Server error. Please try again." });
  } finally {
    lock.releaseLock();
  }
}

// The client posts with Content-Type: text/plain (to avoid a CORS preflight
// that Apps Script can't handle), so Apps Script does NOT auto-populate
// e.parameter the way it would for a real application/x-www-form-urlencoded
// request. Parse the raw body ourselves instead.
function parseParams(e) {
  var contents = e && e.postData && e.postData.contents;
  if (!contents) return {};

  var params = {};
  contents.split("&").forEach(function (pair) {
    if (!pair) return;
    var idx = pair.indexOf("=");
    var key = idx === -1 ? pair : pair.slice(0, idx);
    var value = idx === -1 ? "" : pair.slice(idx + 1);
    params[decodeURIComponent(key.replace(/\+/g, " "))] = decodeURIComponent(
      value.replace(/\+/g, " ")
    );
  });
  return params;
}

function validate(params) {
  var comments = (params.comments || "").trim();
  if (!comments || comments.length > 1000) {
    return { ok: false, error: "Invalid comments." };
  }

  var name = (params.name || "").trim();
  if (name.length > 100) {
    return { ok: false, error: "Name is too long." };
  }

  return { ok: true };
}

// Prefix values that could be interpreted as spreadsheet formulas so they
// are always stored as plain text.
function sanitize(value) {
  if (typeof value === "string" && /^[=+\-@]/.test(value)) {
    return "'" + value;
  }
  return value;
}

function formatTimestamp() {
  return Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
