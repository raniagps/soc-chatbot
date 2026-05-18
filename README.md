# 🛡️ Orange SOC AI Platform

<div align="center">

![Orange SOC AI](https://img.shields.io/badge/Orange%20SOC%20AI-Platform-FF6600?style=for-the-badge&logo=shield&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-00C851?style=for-the-badge)
![PFE](https://img.shields.io/badge/PFE-2026-FF6600?style=for-the-badge)
![Powered by Claude](https://img.shields.io/badge/Powered%20by-Anthropic%20Claude-7C3AED?style=for-the-badge)

**Plateforme d'Intelligence Artificielle pour les Centres Opérationnels de Sécurité**

*L'IA au service de la cybersécurité opérationnelle — Orange Maroc*

[🚀 Demo Live](https://soc-chatbot-um5j.vercel.app) · [📖 Documentation](#documentation) · [🔧 Installation](#installation)

</div>

---

## 📌 Présentation

**Orange SOC AI Platform** est une plateforme SOCaaS (Security Operations Center as a Service) intelligente développée dans le cadre du Projet de Fin d'Études 2026 chez **Orange Maroc**.

Elle intègre un assistant IA conversationnel spécialisé en cybersécurité, capable d'analyser des incidents, détecter des menaces et générer des rapports de conformité en temps réel.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🤖 **Assistant IA SOC** | Chatbot spécialisé cybersécurité basé sur Claude AI |
| 🔍 **Analyse d'incidents** | Détection et analyse d'attaques (Brute Force, MITRE ATT&CK) |
| 📊 **Rapports CIS** | Génération automatique de rapports de conformité |
| 🎯 **Threat Intelligence** | Identification d'attaquants et corrélation d'IOCs |
| 📡 **Live Monitoring** | Tableau de bord temps réel avec métriques SOC |
| 🛠️ **Intégration Wazuh/Suricata** | Compatibilité avec les outils SOC standards |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Orange SOC AI Platform              │
├─────────────────────┬───────────────────────────────┤
│   Frontend (React)  │      Backend (Node.js)         │
│   Vercel CDN        │      Railway Cloud             │
│   localhost:3000    │      Port dynamique            │
├─────────────────────┼───────────────────────────────┤
│   • Dashboard SOC   │   • API REST Express           │
│   • Chat Interface  │   • Proxy Anthropic Claude     │
│   • Scénarios       │   • Gestion CORS               │
│     prédéfinis      │   • Variables d'env sécurisées │
└─────────────────────┴───────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Anthropic Claude  │
                    │  claude-sonnet-4   │
                    │  (LLM Backbone)    │
                    └────────────────────┘
```

---

## 🚀 Stack Technique

**Frontend**
- React 18
- CSS3 (thème Orange SOC custom)
- Fetch API

**Backend**
- Node.js + Express
- CORS configurable
- dotenv

**IA**
- Anthropic Claude (claude-sonnet)
- Prompt engineering SOC spécialisé

**Déploiement**
- Frontend : Vercel
- Backend : Railway
- CI/CD : GitHub Actions (auto-deploy)

---

## 📦 Installation

### Prérequis
- Node.js >= 18
- npm >= 9
- Clé API Anthropic

### Clone & Install

```bash
git clone https://github.com/raniagps/soc-chatbot.git
cd soc-chatbot
npm install
```

### Configuration

Crée un fichier `.env` à la racine :

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
PORT=5000
```

### Lancement local

```bash
# Terminal 1 — Backend
node server.js

# Terminal 2 — Frontend
npm start
```

L'application est accessible sur `http://localhost:3000`

---

## 🎯 Cas d'Usage SOC

### 1. Analyse d'attaque Brute Force SSH
> *"Analyser l'attaque Brute Force SSH détectée sur le serveur 192.168.1.10"*

L'IA analyse les patterns d'attaque, corrèle avec MITRE ATT&CK T1110, et recommande des contre-mesures.

### 2. Rapport de conformité CIS
> *"Générer un rapport de conformité CIS Benchmark complet"*

Génération automatique d'un rapport structuré avec score de conformité et recommandations prioritaires.

### 3. Identification d'attaquant
> *"Identifier l'attaquant depuis Kali Linux 10.0.0.5"*

Corrélation d'IOCs, géolocalisation, historique des menaces et profil de l'attaquant.

---

## 📊 Métriques Tableau de Bord

| Métrique | Valeur |
|---|---|
| Événements analysés | 284 909 |
| Alertes Email | 9 272 |
| Agents Actifs | 4 |
| Score CIS | 45% |

---

## 🔐 Sécurité

- Les clés API sont stockées dans des variables d'environnement (jamais dans le code)
- CORS configuré pour les origines autorisées uniquement
- Communication HTTPS en production
- Aucune donnée utilisateur persistée

---

## 🌐 Déploiement Production

| Composant | Plateforme | URL |
|---|---|---|
| Frontend | Vercel | `soc-chatbot-um5j.vercel.app` |
| Backend | Railway | `soc-chatbot-production.up.railway.app` |

---

## 👩‍💻 Auteur

**Rania** — Étudiante ingénieure en Cybersécurité
Projet de Fin d'Études — Orange Maroc · 2026

---

## 📄 Licence

Projet académique — Orange Maroc PFE 2026. Tous droits réservés.

---

<div align="center">

**Orange SOC AI Platform** · Propulsé par Anthropic Claude · PFE 2026

*Développé avec ❤️ pour Orange Maroc*

</div>