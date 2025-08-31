# 🚕 Full Stack Uber Clone

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow)

⚡ **Project Status:** Work in progress. Some features are implemented, others are under development.

This project is a comprehensive **Uber Clone** mobile app built during the [JavaScript Mastery](https://jsmastery.pro/) course. It uses the latest features of **React Native**, **Expo**, **TypeScript**, and a lightning-fast **edge-ready Postgres database (NeonDB)**.

Designed and taught by Adrian Hajdin of JavaScript Mastery, this build demonstrates how to architect a **scalable**, **responsive**, and **production-grade** application with advanced features like authentication, geolocation, payments, and state management.

![React Native](https://img.shields.io/badge/-React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white)
![Stripe](https://img.shields.io/badge/-Stripe-626CD9?style=flat-square&logo=stripe&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Google Maps](https://img.shields.io/badge/-Google_Maps-4285F4?style=flat-square&logo=google-maps&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Clerk](https://img.shields.io/badge/-Clerk-5A67D8?style=flat-square&logo=clerk&logoColor=white)
![Zustand](https://img.shields.io/badge/-Zustand-000000?style=flat-square)

---

## 🐛 Bugs

- **Splash Screen Not Working**  
  The splash screen may not display correctly on some devices or emulators. This is currently under investigation.

- **Success Modal Not Displayed During Authentication**  
  After successful authentication, the expected success modal does not appear in certain scenarios. Users may be redirected without visual confirmation of success.

---

## ⚙️ Tech Stack

- **React Native (Expo)** – Frontend mobile development
- **TypeScript** – Typed JavaScript for better maintainability
- **NeonDB (PostgreSQL)** – Edge-ready serverless relational database
- **Stripe** – Payment integration
- **Tailwind CSS** – Utility-first styling
- **Zustand** – Lightweight state management
- **Google Maps API** – Location services and routing
- **Google Places API** – Location autocomplete
- **Clerk** – Authentication and user management

---

## 🔋 Features

👉 **Onboarding Flow** – Seamless user registration and setup process  
👉 **Email & Password Authentication with Verification**  
👉 **OAuth Using Google**  
👉 **Authorization for User Roles**  
👉 **Home Screen with Live Location & Google Map**  
👉 **Recent Rides Overview**  
👉 **Google Places Autocomplete**  
👉 **Find Rides by Location**  
👉 **Select Rides from Nearby Cars on Map**  
👉 **Confirm Ride with Time and Price Details**  
👉 **Pay for Ride Using Stripe**  
👉 **Ride Created After Successful Payment**  
👉 **User Profile Management**  
👉 **View Ride History**

---

## 🤸 Quick Start

### ✅ Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 📁 Clone the Repository

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

### 📦 Install Dependencies

npm install

### 🔐 Set Up Environment Variables

Create a .env file in the root of your project and add:

- EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
- EXPO_PUBLIC_PLACES_API_KEY=
- EXPO_PUBLIC_DIRECTIONS_API_KEY=
- DATABASE_URL=
- EXPO_PUBLIC_SERVER_URL=https://uber.dev/
- EXPO_PUBLIC_GEOAPIFY_API_KEY=
- EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=
- STRIPE_SECRET_KEY=

### Start the App

- npx expo start

---

## 📺 Course Link

This project was built using the [JavaScript Mastery Uber Clone Course](https://jsm.dev/uber-kit).  
Watch the full tutorial on YouTube:  
🔗 [Build a Full Stack Uber Clone App (YouTube)](https://www.youtube.com/watch?v=1xHqHNX6B6I)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub and joining the JSMastery community:

- [JS Mastery Discord](https://discord.gg/jsmastery)
- [JS Mastery Pro](https://jsm.dev/uber-jsmpro)
- [More Projects](https://jsm.dev/uber-kit)
