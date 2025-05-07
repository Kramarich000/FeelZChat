# FeelZChat
A cross-platform messaging application with AI-powered sentiment analysis. Supports GDPR compliance and responsive design.

## Contents
1. About Project
2. Features
3. Working with personal data
4. The technologies used
5. How to launch
6. License

## About Project
- A messenger for enterprise and mainstream use with AI to detect the emotional coloring of text.
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
- ML: Python scripts for tone analysis via FastAPI.
- Google Tag Manager (optional with consent)

## Requirements

- Node.js >= 18.20.7
- Yarn >= 3.0.0

## How to Run

# dev mode
```bash
git clone "https://github.com/Kramarich000/messenger-app"
cd messenger-app
yarn install
yarn dev
```
# prod mode (requires pre-build)
```bash
git clone "https://github.com/Kramarich000/messenger-app"
cd messenger-app
yarn install
yarn build
yarn preview
```
Dependency list: [docs/lib/used-libraries.md](./docs/lib/used-libraries.md)

License: [License](https://github.com/Kramarich000/messenger-app/blob/main/docs/en/LICENSE_EN.md)
