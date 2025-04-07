import fs from "fs";
import { glob } from "glob";

const results = new Set();

const regexList = [
  />\s*([^<>{}\n]{2,})\s*</g,                        // 1. Текст между тегами: <div>Привет</div>
  /{t\(["'`](.+?)["'`]\)}/g,                         // 2. Переводы: {t("Привет")}
  /["'`]([А-Яа-яёЁA-Za-z0-9\s,.:;!?%()@\-–—]+)["'`]/g, // 3. Просто строки: "Контакт", 'Текст', `Шапка`
  /{\s*["'`]([^{}]+?)["'`]\s*}/g,                    // 4. JSX строки в фигурных скобках: {"Тест"}
  /t\(\s*`([^`]+)`\s*\)/g,                           // 5. Шаблонные переводы: t(`Добро пожаловать`)
  />\s*{?\s*["'`](.+?)["'`]\s*}?<\/\w+>/g,           // 6. Гибриды типа: <h1>{"Привет"}</h1>
  />\s*{(.+?)\s*}\s*</g,                              // 7. Все между > { ... } < (на всякий)
  /{([^}]+)}/g                                       // 8. JSX выражения (в фигурных скобках)
];

// Функция для проверки, является ли строка валидным текстом для перевода
const isValidText = (text) => {
  // Игнорируем классы Tailwind CSS
  const tailwindClassRegex = /\b(?:absolute|top|left|min-h-full|w-full|flex|justify-center|items-center|bg|text|font|gap|py|px|transition|hover|rounded|max-w|mb|mx|bg-opacity|text-center)\b/;

  // Пропускаем строки, которые являются частью кода или вызовов функций
  return (
    text &&
    text.length > 1 &&
    !/^\d+$/.test(text) &&        // Не захватываем только цифры
    !text.includes("=") &&        // Не захватываем выражения с присваиванием
    !text.startsWith("<") &&      // Не захватываем HTML теги
    !text.includes("{") &&        // Не захватываем JS выражения в скобках
    !text.includes("=>") &&       // Не захватываем стрелочные функции
    !text.startsWith("function") &&  // Не захватываем объявления функций
    !text.includes("import") &&   // Игнорируем импорты
    !text.includes("from") &&     // Игнорируем конструкции from
    !text.includes("component") && // Игнорируем объявления компонентов
    !text.includes("return") &&   // Игнорируем return
    !text.match(/[\(\)\{\}\[\]\.\,\;]/) && // Игнорируем сложные выражения
    !tailwindClassRegex.test(text) // Исключаем классы Tailwind CSS
  );
};

glob("src/**/*.{js,jsx,ts,tsx}").then((files) => {
  console.log("🔍 Найдено файлов:", files.length);
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    for (const regex of regexList) {
      let match;
      while ((match = regex.exec(content))) {
        const text = match[1]?.trim();
        if (isValidText(text)) {
          results.add(text);
        }
      }
    }
  }

  const translations = {};
  [...results].forEach((t) => (translations[t] = ""));

  fs.writeFileSync("translation.ru.json", JSON.stringify(translations, null, 2));
  console.log(`✅ Найдено ${results.size} строк. Сохранено в translation.ru.json`);
});
