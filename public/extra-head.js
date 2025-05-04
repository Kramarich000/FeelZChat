setTimeout(() => {
    fetch('https://analytics.feelzchat.rf.gd/gtag/js?id=G-XXXXXXX', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Ошибка загрузки скрипта');
            }
            return res.text();
        })
        .then(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
        })
        .catch(error => {
            console.error('Не удалось загрузить Google Analytics:', error);
        });
}, 2000);

setTimeout(() => {
    fetch('https://analytics.messenger-app-movb.onrender.com//gtag/js?id=G-XXXXXXX', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Ошибка загрузки скрипта');
            }
            return res.text();
        })
        .then(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
        })
        .catch(error => {
            console.error('Не удалось загрузить Google Analytics:', error);
        });
}, 2000);

(function () {
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
