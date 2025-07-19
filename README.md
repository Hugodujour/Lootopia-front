# 🏴‍☠️ Lootopia - Front-End Web

Front-end de l'application de chasse au trésor **Lootopia**, développée avec React, Vite, Tailwind CSS, Axios, et Leaflet (OpenStreetMap).

**Démo live :** <https://lootopia-front.vercel.app/>

---

## 🚀 Fonctionnalités principales

- Carte interactive avec localisation des trésors
- Détails des trésors
- Déclaration de trésors trouvés
- Interface responsive (mobile & desktop)
- Connexion fluide avec le back-end via API REST

---

## 🛠️ Technologies

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🗚️ Leaflet + React-Leaflet
- 🌐 Axios
- 🧠 TypeScript

---

## 📆 Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-user/lootopia-frontend.git
cd lootopia-frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm run dev
```

Par défaut, l’app est accessible sur `http://localhost:5173`.

---

## 🥪 Tests

Lancer les tests unitaires (Jest/Vitest) :

```bash
npm run test
```

---

## 🔗 API attendue

L'application attend une API REST fonctionnelle sur `/api`.

### Endpoints utilisés :

- `GET /treasures` – Récupération de tous les trésors
- `POST /found` – Déclarer un trésor trouvé

⚠️ Assurez-vous que le back-end est lancé avec CORS autorisé pour le front-end.

---

## 📁 Structure du projet

```
/src
  /components
    /common
    /auth
    /admin
    /treasure
  /context
  /types
  /utils
  App.tsx
  main.tsx
/tests
  TreasureList.test.tsx
  ClueForm.test.tsx
```

---

## 🌍 Dépendances clés

- `react-leaflet` : carte interactive
- `axios` : communication API
- `react-router-dom` : navigation
- `tailwindcss` : stylisation
- `jest` ou `vitest` : tests unitaires

---

## 🤝 Auteurs

- 🎨 Front-End : Hugo GREGOIRE
- 📱 Mobile : Julien FOURNIER
- 🛠️ Back-End : Jihed BEN JEMAA

Projet réalisé dans le cadre du **Mastère ESI 2024** – Projet fil rouge **Lootopia**.

---

## 📸 Aperçu (optionnel)

> Ajoutez ici une capture d’écran ou une démo vidéo de l'application.

---

## 📝 Licence

Ce projet est à but éducatif. Aucune licence spécifique n’est appliquée.
