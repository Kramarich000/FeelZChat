function loadAnalytics() {
  if (!window.gtmLoaded) {
    if (!document.querySelector('script[src="/metrics/gtm.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/metrics/gtm.js";
      script.async = true;
      document.body.appendChild(script);

      window.gtmLoaded = true;

      // console.log('Adding GTM script');
    } else {
      // console.log('GTM script already exists');
    }
  } else {
    // console.log('Analytics already loaded');
  }
}

export { loadAnalytics };
