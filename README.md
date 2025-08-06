# Arambh -Start from here

A full-stack Learning Management System (LMS) web application built using the MERN stack. This platform allows educators to publish online courses and students to enroll, watch video lectures, and manage their learning experience seamlessly.

## 🔗 Live Demo

[Live Application Link](https://lms-frontend-xi-nine.vercel.app/) 

---

## ✨ Features

### 👩‍🏫 For Instructors:
- Instructor authentication via **Clerk**
- Create and manage courses (title, description, image)
- Upload video lectures and manage course content
- Track enrolled students and earnings

### 🎓 For Students:
- Student registration/login via **Clerk**
- Browse and purchase courses using **Stripe** payment integration
- Watch enrolled courses with video playback support
- Track learning progress

### 🔒 Authentication & Security:
- Authentication via **Clerk** (OAuth/email magic link supported)
- Secure API endpoints using JWT session validation
- Payment handling with **Stripe Checkout**

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Clerk (Auth)
- Stripe.js (Payments)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Stripe (Payment Processing)
- Clerk Webhooks (Session/Auth Management)


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ashminita/LMS.git
cd LMS
```
### 2. Set up environment variables
Create a .env file in both the client/ and server/ folders.

Example (server/.env):
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Example (client/.env):
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```
### 3. Install dependencies
```bash
cd server
npm install
```
```bash
cd client
npm install
```
### 4. Run the application
#### In /server
```bash
npm start
```
#### In /client
```bash
npm run dev
```



