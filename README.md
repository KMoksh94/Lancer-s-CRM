# Lancer’s CRM 🚀

Lancer’s CRM is a **mini Customer Relationship Management (CRM) system built specifically for individual freelancers** who want a focused, no‑nonsense way to manage clients, projects, and follow‑ups.

This project is designed as a **full‑stack MERN application**, built from a developer’s perspective to practice and demonstrate real‑world backend logic such as authentication flows, email‑based password recovery, cron jobs, and clean API architecture — without introducing multi‑user teams or role‑based complexity.

---

## 🎯 Who is this project for?

* **Individual freelancers** managing multiple clients and projects
* Developers looking to build or study a **practical, real‑world MERN application**
* Anyone who wants a lightweight CRM without team roles or enterprise features

---

## ✨ Key Features

* User authentication and authorization
* Client and project management
* Follow‑ups and reminders
* Client and project management
* Follow-ups and reminders
* Secure authentication system
* Password reset via email
* Background jobs using cron
* Clean separation of frontend and backend

---

## 🧠 Tech Stack

### Frontend

* **React (Vite)** – fast development and optimized builds
* **React Router DOM** – client-side routing
* **Tailwind CSS** – utility‑first styling
* **Axios** – API communication

### Backend

* **Node.js** – runtime environment
* **Express.js** – REST API framework
* **MongoDB** – database
* **Mongoose** – MongoDB ODM

### Authentication & Security

* **JWT (JSON Web Tokens)** – stateless authentication
* **bcrypt** – password hashing
* **dotenv** – environment variable management

---

## 📦 Major Packages & Libraries (and how they are used)

### 🔐 Authentication & Security

* **jsonwebtoken** – Generates and verifies JWTs for protected routes
* **bcryptjs** – Hashes user passwords before storing them in the database

### 📧 Email Handling (Resend)

* **Resend** is used **strictly for password reset emails**

 When a user requests a password reset, a secure token is generated, stored with an expiry, and sent via email using Resend.

### ⏱ Cron Jobs

* **node-cron** – Handles scheduled background tasks

Cron jobs are used for **time‑based backend checks** such as handling expirations or cleanup logic. These jobs run independently of user requests and are included to model real backend automation.

### 🌐 API & Utilities

* **cors** – Enables secure cross‑origin communication between frontend and backend
* **Cloudinary** – Used for storing and managing uploaded media assets(logo for the password reset mail in this case)
* **nodemon** – Development auto‑reload

---

## 🔄 Password Reset Flow

1. User requests password reset
2. Backend generates a secure reset token
3. Token + expiry stored in database
4. Email sent using **Resend**
5. Token validated before allowing password update

This flow mimics real production systems and focuses heavily on security.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/KMoksh94/Lancer-s-CRM.git
````

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
RESEND_API_KEY=your_resend_key
```

### 3️⃣ Frontend setup

```bash
cd frontend/CRM
npm install
npm run dev
```

---

## 🌍 Live Deployment

The application is live and deployed on **Render**:

🔗 **Frontend:** [https://lancer-s-crm-frontend.onrender.com/](https://lancer-s-crm-frontend.onrender.com/)

> ⚠️ **Note:** This project is hosted on Render’s **free tier**. Both frontend and backend servers may spin down after periods of inactivity, so the first request can take a short while to respond.

---

## 👤 Author

**Mokshit Kanojia**
 
 MERN Stack Developer

If you liked this project, feel free to ⭐ the repo!
