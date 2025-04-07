const axios = require('axios');
const fs = require('fs');

const apiKey = 'df4385c2-33de-e423-4134-ca1f7b3ea8b7.';
const texts = JSON.parse(fs.readFileSync('texts.json', 'utf-8'));

(async () => {
  const translations = {};

  for (let text of texts) {
    const res = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: apiKey,
        text,
        target_lang: 'RU'
      }
    });
    const translated = res.data.translations[0].text;
    translations[text] = translated;
    console.log(`"${text}" → "${translated}"`);
    await new Promise(r => setTimeout(r, 1000)); 
  }

  fs.writeFileSync('translations.json', JSON.stringify(translations, null, 2));
  console.log('✅ Переводы сохранены в translations.json');
})();
