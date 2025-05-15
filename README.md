# 📝 Admin Blog - styven-manaja.digital

Bienvenue dans l'interface d'administration du blog de mon site personnel [styven-manaja.digital](https://www.styven-manaja.digital).  
Cette interface me permet de gérer mes articles comme un vrai chef de chantier numérique 🛠️

## ⚙️ Stack technique

- ⚛️ **React** (avec Vite) — frontend rapide et modulable
- 🍪 **Authentification JWT (cookies)** — sécurisée et connectée au backend
- 🖤 **Dark mode** — parce que coder en full light c’est so 2010
- 🌍 **API REST** — connectée à un backend Express/Node.js

## 🧰 Installation

```bash
git clone https://github.com/styven-manaja/blog-admin-frontend.git
cd blog-admin-frontend
npm install
```

## 🔧 Configuration

Crée un fichier `.env` à la racine du projet pour indiquer l’URL du backend :

```env
VITE_API_URL=https://ton-backend.vercel.app
```

## 🚀 Lancer en local

```bash
npm run dev
```

Le projet sera accessible sur `http://localhost:5173`

> Assure-toi que ton backend est bien en ligne pour que l’auth et les requêtes fonctionnent.

## 📁 Structure du projet

```
blog-admin-frontend/
├── public/
├── src/
│   ├── components/     # Boutons, inputs, etc.
│   ├── pages/          # Pages comme Login, Dashboard, CreatePost, etc.
│   ├── App.jsx
│   └── main.jsx
├── .env
├── vite.config.js
└── package.json
```

## ✅ Fonctionnalités

- Connexion sécurisée via JWT (cookie HttpOnly)
- Liste des articles
- Création, édition et suppression d’articles
- Upload d’image (si implémenté)
- Interface full dark mode 🌚

## 🧪 Scripts utiles

| Commande        | Action                            |
|-----------------|-----------------------------------|
| `npm run dev`   | Lance le projet en mode dev       |
| `npm run build` | Build le projet pour la production |
| `npm run preview` | Prévisualise le build local     |

## 👤 Auteur

Code et caféine par [Styven Manaja](https://www.styven-manaja.digital)

> “Je plante mes lignes comme des graines, un jour ça poussera, j’en suis certain.” 🌱
