import { launch } from 'puppeteer';
import fs from 'fs';

export default async function scrapeText() {
  const browser = await launch({
    headless: true,
    args: ['--ignore-certificate-errors']
  });

  const page = await browser.newPage();

  const urls = [
    'https://messenger-app-movb.onrender.com/',
    'https://messenger-app-movb.onrender.com/login',
    'https://messenger-app-movb.onrender.com/chat',
    'https://messenger-app-movb.onrender.com/contacts',
    'https://messenger-app-movb.onrender.com/forgot-password',
    'https://messenger-app-movb.onrender.com/privacy',
    'https://messenger-app-movb.onrender.com/settings',
    'https://messenger-app-movb.onrender.com/profile',
    'https://messenger-app-movb.onrender.com/notifications',
    'https://messenger-app-movb.onrender.com/help'
  ];

  const allTexts = {};
  const seenTexts = new Set();

  const existingKeys = new Map();

  const generateKey = (text) => {
    const words = text.trim().split(/\s+/).slice(0, 3);
    const baseKey = `key_${words.join('_').toLowerCase()}`;
    const count = existingKeys.get(baseKey) || 0;

    if (count === 0 && !allTexts[baseKey]) {
      existingKeys.set(baseKey, 1);
      return baseKey;
    } else {
      const newKey = `${baseKey}_${count + 1}`;
      existingKeys.set(baseKey, count + 1);
      return newKey;
    }
  };

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector('body');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const texts = await page.evaluate(() => {
        const selectors = [
          'p',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'span',
          'a',
          'button',
          'label',
          'span',
          'option',
          'strong',
          'li',
          'input[placeholder]',
          'textarea[placeholder]'
        ];
        const collected = [];

        selectors.forEach((selector) => {
          const elements = Array.from(document.querySelectorAll(selector));
          elements.forEach((el) => {
            const text =
              el.innerText?.trim() || el.getAttribute('placeholder')?.trim();
            if (text && text.length > 1) {
              collected.push(text);
            }
          });
        });

        return collected;
      });

      texts.forEach((text) => {
        const lines = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 1);

        lines.forEach((line) => {
          if (!seenTexts.has(line)) {
            const key = generateKey(line);
            allTexts[key] = line;
            seenTexts.add(line);
          }
        });
      });
    } catch (err) {
      console.warn(`Ошибка при загрузке ${url}:`, err.message);
    }
  }

  fs.writeFileSync(
    'scrapedTexts.json',
    JSON.stringify(allTexts, null, 2),
    'utf-8'
  );

  console.log('Тексты успешно сохранены в файл scrapedTexts.json');
  await browser.close();
}

scrapeText();
