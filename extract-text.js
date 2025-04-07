import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://messenger-app-uvg3.onrender.com', { waitUntil: 'networkidle2' });

const textNodes = await page.evaluate(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const texts = [];
  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.nodeValue.trim();
    if (trimmed && trimmed.length > 1) texts.push(trimmed);
  }
  return Array.from(new Set(texts));
});

fs.writeFileSync('texts.json', JSON.stringify(textNodes, null, 2));
console.log('✅ Текст извлечён и сохранён в texts.json');

await browser.close();
