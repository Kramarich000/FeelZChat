#README: Messenger App
[![Build Status](https://img.shields.io/github/actions/workflow/status/Kramarich000/messenger-app/ci.yml)](https://github.com/Kramarich000/messenger-app/actions) [![Coverage](https://img.shields.io/codecov/c/gh/Kramarich000/messenger-app)](https://codecov.io/gh/Kramarich000/messenger-app)
Last commit:
[![GitHub last commit](https://img.shields.io/github/last-commit/Kramarich000/messenger-app)](https://github.com/Kramarich000/messenger-app)

Issues:
[![Issues](https://img.shields.io/github/issues/Kramarich000/messenger-app)](https://github.com/Kramarich000/messenger-app/issues)

## Содержание
1. О проекте
2. Возможности
3. Работа с персональными данными
4. Используемые технологии
5. Как запустить
6. License

## О проекте

- Мессенжер для корпоративного и массового использования с ИИ для определения эмоциональной окраски текста.
- Клиентская часть: React (Vite, TailwindCSS).
- Серверная часть: Ruby on Rails.
- Хранение данных: PostgreSQL.
- Интеграция с внешними API для ИИ-аналитики (ML-модель для анализа тональности).
- Полное соответствие GDPR (cookie-баннер, granular consent, политика конфиденциальности, удаление данных).

## Превью

![Скриншот приложения](./screenshots/main-interface.png)

## Возможности

- Регистрация и вход с валидацией (email, пароль, OTP)
- Отправка и получение текстовых сообщений 
- Определение эмоциональной окраски сообщений (на базе ML-модели)
- Cookie-баннер с granular consent.
- Политика конфиденциальности и пользовательское соглашени (GDPR-совместимые).
- Загрузка аналитики только при согласии пользователя
- Полностью адаптивная верстка для мобильных и десктопов.

## Работа с персональными данными

- Проект собирает минимальные персональные данные: имя, электронную почту, номер телефона
- Все данные используются только для функционирования сервиса
- Cookie-файлы используются только по согласию пользователя
- Реализована возможность удаления данных пользователя

## Используемые технологии

- React / JS / Vite
- TailwindCSS
- ML: Python-скрипты для анализа тональности через REST API.
- Google Tag Manager (опционально, по согласию)

## Требования

- Node.js >= 18
- Yarn >= 1.22

## Как запустить

# dev mode
```bash
git clone "https://github.com/Kramarich000/messenger-app"
cd messenger-app
yarn install
yarn dev
```
# prod mode
```bash
git clone "https://github.com/Kramarich000/messenger-app"
cd messenger-app
yarn install
yarn preview
```
Список зависимостей: [docs/used-libraries.md](./docs/used-libraries.md)

[MIT License](https://opensource.org/licenses/MIT)