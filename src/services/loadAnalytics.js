function loadAnalytics() {
  if (!document.querySelector('script[src="/metrics/gtm.js"]')) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/metrics/gtm.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

export { loadAnalytics };
