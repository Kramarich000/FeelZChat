import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

const texts = JSON.parse(readFileSync('texts.json', 'utf-8'));

(async () => {
  const translations = {};

  for (let text of texts) {
    try {
      const res = await axios.post('https://translate.argosopentech.com/translate', {
        q: text,
        source: 'ru',
        target: 'en',
        format: 'text'
      }, { timeout: 5000 });

      const translated = res.data.translatedText;
      translations[text] = translated;
      console.log(`"${text}" → "${translated}"`);
    } catch (err) {
      console.error(`Ошибка при переводе "${text}":`, err.message);
    }

    await new Promise(r => setTimeout(r, 1000));
  }

  writeFileSync('translations.json', JSON.stringify(translations, null, 2));
  console.log('Переводы сохранены в translations.json');
})();
