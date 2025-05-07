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

## About Project

- Frontend: React (Vite, TailwindCSS).
- Backend: Ruby on Rails.
- Data storage: PostgreSQL.
- Integration with external APIs for AI analytics (ML model for sentiment analysis).
- Full GDPR compliance (cookie banner, granular consent, privacy policy, data deletion).

## Превью

![App screenshot](./screenshots/main-interface.png)

## Features

- Registration and login with validation (email, password, OTP).
- Sending and receiving text messages.
- Message sentiment analysis using an ML model.
- Cookie banner with granular consent.
- GDPR-compliant privacy policy and terms of service.
- Analytics loaded only with user consent.
- Fully responsive design for mobile and desktop.

## Personal Data Handling

- Collects minimal personal data: name, email, phone number.
- All data used solely for service functionality.
- Cookies used only with user consent.
- User data deletion option implemented.

## Technologies Used

- React / JS / Vite
- TailwindCSS
- Google Tag Manager (optional with consent)

## Requirements

- Node.js >= 18
- Yarn >= 1.22

## How to Run

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
Dependency list: [docs/used-libraries.md](./docs/used-libraries.md)

MIT License

Copyright (c) [2025] [Kramarich]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.