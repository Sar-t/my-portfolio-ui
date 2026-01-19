# 🎨 Portfolio Frontend
Frontend application for my-portfolio.
Built using React (Vite) and Tailwind CSS, and powered by a live backend API.

This application showcases my profile, skills, projects, education, and certifications with real-time backend integration.

---

## ✨ Features
 - Personal profile & hero section
 - Skills section with top skills aggregation
 - Projects listing with search & filters
 - Education section with CRUD support
 - Certificates section with add & edit functionality
 - Server liveness / health indicator
 - Fully responsive UI
 - Clean component-based architecture

---

## 🛠 Tech Stack
 - React (Vite)
 - Tailwind CSS
 - JavaScript (ES6+)
 - Fetch API
 - Vercel (Deployment)

---

## 📂 Project Structure
```bash
src/
├── components/          # UI components
│   ├── Profile.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Education.jsx
│   ├── Certificates.jsx
│   └── ServerStatus.jsx
│
├── services/            # API service layer
│   └── api.js
│
├── assets/              # Static assets
│
├── App.jsx              # Root component
├── main.jsx             # Application entry
└── index.css            # Global styles
```

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sar-t/my-portfolio-ui.git
cd my-portfolio-ui
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Run development server
```bash
npm run dev
```
Application runs at:
```bash
http://localhost:5173
```
Local development uses a Vite proxy to communicate with the backend.

---

## 🌐 Production Setup
The frontend is deployed on Vercel and communicates directly with the live backend API.
### Live Site
```bash
https://my-portfolio-ui-two.vercel.app/
```
### Backend API
```bash
https://my-portfolio-api-312u.onrender.com/me-api
```
The application automatically switches API base URLs between development and production environments.

---

## 🔗 Backend Repository
👉 Backend API repository:
https://github.com/Sar-t/my-portfolio-api

## 🧠 Key Highlights
 - Clean separation between UI and API logic
 - Backend-driven data with real MongoDB aggregation
 - Production-safe API integration
 - Easily extendable components
 - Designed with scalability in mind

---

## 👤 Author
### Sarthak Tomar




