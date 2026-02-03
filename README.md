# 📍 HiddenMap

> **Explore and share the hidden gems in your city.**

HiddenMap is a community-driven social media platform designed for urban adventurers. It allows users to discover, rate, and share local favorites—from tucked-away cafes to scenic parks—using an interactive, map-based interface.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

---

## ✨ Key Features

### 🗺️ Discovery & Exploration

- **Interactive Maps:** Explore your city via a Leaflet-powered map with custom markers and cluster grouping.
- **Gem Submissions:** Share your favorite spots with photos, descriptions, and precise geolocation.
- **Smart Filtering:** Search and filter by categories like Cafes, Parks, Art, or Historical sites.

### 🤝 Social & Gamification

- **User Profiles:** Build your presence, track your discoveries, and follow other explorers.
- **Ratings & Reviews:** Leave 5-star reviews, detailed comments, and photo carousels of your experiences.
- **Leaderboard:** Compete with the community and earn points for your contributions to the map.

### 🛡️ Security & Administration

- **JWT Authentication:** Secure, stateless authentication with protected routes and persistent sessions.
- **Admin Dashboard:** Comprehensive moderation tools to approve/reject submissions and monitor growth trends.

---

## 🏗️ Project Structure

This is a full-stack monorepo containing the backend API, the web dashboard, and the cross-platform mobile application.

```text
├── api/             # NestJS REST API
├── web/             # Angular web application
├── mobile/          # Flutter mobile application (iOS, Android, Web, Desktop)
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm
- Flutter SDK & Dart SDK

### Installation & Setup

#### 1. Backend API (NestJS)

```bash
cd api
npm install
npm run start:dev
```

#### 2. Web Client (Angular)

```bash
cd web
npm install
npm start
```

#### 3. Mobile App (Flutter)

```bash
cd mobile
flutter pub get
# Run on a connected device or emulator
flutter run
```

---

## 🛠️ Tech Stack

- **Backend:** NestJS, TypeScript, JWT (Authentication)
- **Frontend Web:** Angular, Leaflet.js (Maps), RxJS
- **Mobile:** Flutter, Dart
- **Security:** JSON Web Tokens (JWT) & Auth Guards

---

## 👥 The Team

Developed with ❤️ by:

- Nour Jouini
- Refka Mahjoub
- Mouhib Bahri
- Roua Ayadi
- Yassine Sallemi
- Mohamed Taher Ben Hassine
