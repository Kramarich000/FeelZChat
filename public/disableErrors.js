if (import.meta.env.PROD) {
  ["log", "warn", "error", "info", "debug"].forEach((fn) => {
    window.console[fn] = () => {};
  });
  window.onerror = () => true;
  window.addEventListener("unhandledrejection", (e) => e.preventDefault());
}
