#!/usr/bin/env python3
"""Local preview server with caching disabled.

Plain `python3 -m http.server` sends no cache-control headers, so browsers
can silently keep serving stale HTML/CSS/JS across edits. This wrapper adds
`Cache-Control: no-store` to every response so a normal refresh always
reflects the current files on disk.

It also sends the same security headers as `vercel.json` (kept in sync by
hand) so the CSP etc. can actually be exercised locally instead of only
taking effect once deployed.

Usage: python3 dev-server.py [port]  (default port 4000)
"""

import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": (
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), "
        "interest-cohort=()"
    ),
    "Content-Security-Policy": (
        "default-src 'self'; script-src 'self'; style-src 'self'; "
        "img-src 'self'; connect-src 'self' https://script.google.com "
        "https://script.googleusercontent.com; form-action 'self'; "
        "frame-ancestors 'none'; base-uri 'self'; object-src 'none'"
    ),
    # Strict-Transport-Security omitted locally — it's meaningless (and
    # potentially confusing) over plain http://localhost.
}


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        for key, value in SECURITY_HEADERS.items():
            self.send_header(key, value)
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4000
    HTTPServer(("", port), NoCacheHandler).serve_forever()
