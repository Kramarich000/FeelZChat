import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browser = await puppeteer.launch();
const page = await browser.newPage();

const urls = [
  'https://messenger-app-uvg3.onrender.com/chat', 
  'https://messenger-app-uvg3.onrender.com/contacts',
  'https://messenger-app-uvg3.onrender.com',
  'https://messenger-app-uvg3.onrender.com/forgot-password',
  'https://messenger-app-uvg3.onrender.com/privacy',
  'https://messenger-app-uvg3.onrender.com/notifications',
  'https://messenger-app-uvg3.onrender.com/profile',
  'https://messenger-app-uvg3.onrender.com/settings',
  'https://messenger-app-uvg3.onrender.com/register',
  'https://messenger-app-uvg3.onrender.com/login',
  'https://messenger-app-uvg3.onrender.com/help',
  'https://messenger-app-uvg3.onrender.com/home',
  'https://messenger-app-uvg3.onrender.com/404',
  'https://messenger-app-uvg3.onrender.com/400',
  'https://messenger-app-uvg3.onrender.com/500',
  'https://messenger-app-uvg3.onrender.com/401',
  'https://messenger-app-uvg3.onrender.com/403'
];

const translations = {};

// Обходим все URL
for (let url of urls) {
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Извлекаем текстовые узлы со страницы
  const textNodes = await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      const trimmed = node.nodeValue.trim();
      if (trimmed && trimmed.length > 1) texts.push(trimmed);
    }
    return Array.from(new Set(texts));  // Убираем дубликаты
  });

  // Присваиваем переводы для каждого ключа, используя URL как часть ключа
  textNodes.forEach((text, index) => {
    const key = `${url.replace(/[^a-zA-Z0-9]/g, "_")}_${index}`;  // Генерируем уникальный ключ на основе URL и индекса
    translations[key] = text;
  });
}

// Путь к файлу на русском языке
const ruFilePath = path.join(__dirname, 'src', 'locales', 'ru.json');

// Проверяем, существует ли директория для файла, и создаем её, если необходимо
const dir = path.dirname(ruFilePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Сохраняем переводы в файл ru.json
fs.writeFileSync(ruFilePath, JSON.stringify(translations, null, 2), 'utf8');
console.log('Текст извлечён и сохранён в ru.json');

await browser.close();
