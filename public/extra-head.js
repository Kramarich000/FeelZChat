setTimeout(function () {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
}, 2000); // задержка 2 секунды

; (function () {
    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "FeelZChat",
                "url": "https://messenger-app-movb.onrender.com/"
            },
            {
                "@type": "WebPage",
                "name": "FeelZChat — Мессенджер с AI-анализом эмоций и NLP",
                "url": "https://messenger-app-movb.onrender.com/",
                "description": "FeelZChat — современный мессенджер с AI-анализом эмоций на базе NLP."
            }
        ]
    });
    document.head.appendChild(ld);
})();
