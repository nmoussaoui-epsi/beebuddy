# 🐝 BeeBuddy - Plateforme de mise en relation Freelances & Clients

BeeBuddy est une application permettant aux freelances et aux clients de se connecter facilement. L'application intègre un système de swipes, de match, un chat en temps réel, et bien plus encore.

## 🚀 Installation & Configuration

### ✅ **1. Prérequis**
Avant d’installer le projet, assurez-vous d’avoir les éléments suivants :
- **Node.js** (dernière version) 📥 [Télécharger ici](https://nodejs.org/)
- **MongoDB** 📥 [Télécharger ici](https://www.mongodb.com/try/download/community)
- **Expo Go** (pour tester l’application mobile) 📥 [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)

---

### ✅ **2. Cloner le Projet**
Dans votre terminal, exécutez :
```sh
git clone https://github.com/nmoussaoui-epsi/beebuddy.git
cd beebuddy
```

---

### ✅ 3. Installer les Dépendances
📍 Backend (API Express.js)
```sh
cd api
npm install
```

📍 Frontend (React Native - Expo)
```sh
cd app
npm install
```
---

### ✅ 4. Configuration des Variables d’Environnement
Ajoutez un fichier .env dans chaque dossier (api/, app/) avec les informations suivantes :

📍 Dans api/.env (backend)
```ini
MONGODB_URI=mongodb://localhost:27017/BeeBuddy
JWT_SECRET=mon_super_secret
PORT=5000
```

📍 Dans app/.env (mobile)
```ini
API_URL=http://192.168.X.X:5000
```

🔹 Remplacez 192.168.X.X par votre IP locale (utilisez ipconfig sur Windows ou ifconfig sur Mac/Linux).

---

### ✅ 5. Lancer le Projet
📍 Démarrer le Backend (API Express.js)
```sh
cd api
npm run dev
```

📍 Démarrer le Frontend Mobile (Expo)
```sh
cd app
expo start
```

---

### 📌 Disclaimer
⚠️ Le back-office n'ayant pas encore été développé, son installation et sa configuration ne sont pas encore disponibles. Cette section sera mise à jour une fois le développement commencé.

---


### 📩 Support
Si vous avez besoin d'aide, contactez l'auteur du dépôt via GitHub.
