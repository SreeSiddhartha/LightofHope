(function () {
  "use strict";

  var password = "Loh@#_2000";
  var storageKey = "lohi-site-unlocked";

  try {
    if (window.localStorage.getItem(storageKey) === "true") {
      return;
    }
  } catch (error) {
    // Continue without persistence when browser storage is unavailable.
  }

  var style = document.createElement("style");
  style.textContent = "body { display: none !important; }";
  document.head.appendChild(style);

  function showGate() {
    var gate = document.createElement("main");
    gate.id = "lohi-password-gate";
    gate.innerHTML =
      '<div class="lohi-password-panel">' +
      "<h1>Light of Hope International</h1>" +
      '<form id="lohi-password-form" novalidate>' +
      '<label for="lohi-password-input">Please enter the password</label>' +
      '<input id="lohi-password-input" name="password" type="password" autocomplete="current-password" required autofocus>' +
      '<button type="submit">Enter</button>' +
      '<p id="lohi-password-error" role="alert" aria-live="polite"></p>' +
      "</form></div>";

    var gateStyle = document.createElement("style");
    gateStyle.textContent =
      "#lohi-password-gate { align-items: center; background: #f7f5ef; color: #26332f; display: flex; font-family: Georgia, serif; justify-content: center; min-height: 100vh; padding: 24px; text-align: center; }" +
      ".lohi-password-panel { background: #fff; border-top: 5px solid #b58b45; box-shadow: 0 12px 35px rgba(38, 51, 47, .12); max-width: 460px; padding: 42px 36px; width: 100%; }" +
      ".lohi-password-panel h1 { font-size: 30px; font-weight: 400; margin: 0 0 28px; }" +
      ".lohi-password-panel label { display: block; font-family: Arial, sans-serif; font-size: 14px; margin-bottom: 10px; }" +
      ".lohi-password-panel input { border: 1px solid #c9c5bb; box-sizing: border-box; font: 16px Arial, sans-serif; padding: 12px; width: 100%; }" +
      ".lohi-password-panel button { background: #386b5a; border: 0; color: #fff; cursor: pointer; font: 700 14px Arial, sans-serif; margin-top: 16px; padding: 12px 28px; }" +
      ".lohi-password-panel button:hover { background: #2d5749; }" +
      "#lohi-password-error { color: #a33a32; font: 13px Arial, sans-serif; min-height: 18px; }" +
      "@media (max-width: 480px) { .lohi-password-panel { padding: 32px 22px; } .lohi-password-panel h1 { font-size: 25px; } }";
    document.head.appendChild(gateStyle);
    document.body.appendChild(gate);

    var form = document.getElementById("lohi-password-form");
    var input = document.getElementById("lohi-password-input");
    var errorMessage = document.getElementById("lohi-password-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (input.value === password) {
        try {
          window.localStorage.setItem(storageKey, "true");
        } catch (error) {
          // The current page remains unlocked when browser storage is unavailable.
        }
        gate.remove();
        style.remove();
        return;
      }

      errorMessage.textContent = "Incorrect password. Please try again.";
      input.value = "";
      input.focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGate);
  } else {
    showGate();
  }
}());