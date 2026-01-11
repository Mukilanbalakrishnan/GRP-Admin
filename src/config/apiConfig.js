export const API_BASE_URL = (() => {
  if (!window.ENV || !window.ENV.API_BASE_URL) {
    throw new Error(
      "API_BASE_URL missing. Make sure env.js is loaded in index.html BEFORE main.js"
    );
  }

  return window.ENV.API_BASE_URL.replace(/\/$/, "");
})();
