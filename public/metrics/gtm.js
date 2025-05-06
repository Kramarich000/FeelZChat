(function () {
  function scheduleLoad() {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadGTMWithRetry);
    } else {
      setTimeout(loadGTMWithRetry, 3000);
    }
  }

  function loadGTMWithRetry(retries = 5, delay = 2000) {
    let attempts = 0;

    function isAlreadyLoaded() {
      return Array.from(document.scripts).some((s) =>
        s.src.includes("gtm.js?id=GTM-56S238T4"),
      );
    }

    function tryLoad() {
      if (isAlreadyLoaded()) {
        console.log("GTM уже загружен, повторная вставка отменена");
        return;
      }

      if (attempts >= retries) {
        console.error("Не удалось загрузить GTM после нескольких попыток");
        return;
      }

      attempts++;

      try {
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
          });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l !== "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-56S238T4");

        console.log("GTM успешно загружен");
        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
        });
      } catch (error) {
        console.error("Ошибка при загрузке GTM:", error);
        setTimeout(tryLoad, delay * Math.pow(2, attempts));
      }
    }

    tryLoad();
  }

  scheduleLoad();
})();
