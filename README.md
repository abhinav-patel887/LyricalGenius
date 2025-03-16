# Lyrical Genius 🎵

Lyrical Genius is a fun and interactive web application that allows users to generate song lyrics using **Google Gemini LLM** and test their music knowledge by guessing the song title. The application features a **React.js** frontend and a **Node.js/Express.js** backend, with **MongoDB** for data storage.

![Screenshot 2025-03-16 232723](https://github.com/user-attachments/assets/2697bcd0-1c18-4507-8ace-67dce57234e6)

![image](https://github.com/user-attachments/assets/fce83199-a0d1-4fad-885e-238ca137100d)

---

## 🚀 Features

- 🎶 **Generate song lyrics** using Google Gemini LLM API.
- 🔍 **Guess the song title** based on the generated lyrics.
- 📜 **Store a list of song titles that the LLM will use to generate lyrics
- ⚡ **Modern UI** built with React and Tailwind CSS.
- 📡 **Backend with Express & MongoDB** for managing user interactions.
- 🌐 **Deployed using Vercel for frontend & Render for backend.**

---

## 🛠 Tech Stack

### **Frontend:**

- React.js (Vite)
- Tailwind CSS

### **Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Google Gemini LLM API

### **Deployment:**

- Vercel (Frontend )
- MongoDB Atlas (Cloud Database)
- Render (Backend)

---

## ⚙️ Local Setup

Follow these steps to run the project locally:

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/abhinav-patel887/LyricalGenius.git
cd lyrical-genius
```

### **2️⃣ Setup Backend**

```sh
cd backend  # Move to backend folder
npm install  # Install dependencies
```

#### **Create a **``** file in the **``** folder and add:**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

#### **Run the Backend**

```sh
npm start  # Start the Express server
```

### **3️⃣ Setup Frontend**

```sh
cd ../lyric-match  # Move to frontend folder
npm install  # Install dependencies
```

#### **Create a **``** file in the **``** folder and add:**

```
VITE_BACKEND_URL=http://localhost:5000
```

#### **Run the Frontend**

```sh
npm run dev  # Start the React app
```
---

## 💡 Future Enhancements

- 🎵 **More AI models** for better lyric generation.
- 🎭 **Multiplayer mode** to compete with friends.
- 📊 **Leaderboard** for tracking high scores.
- 🌍 **Support for multiple languages.**

---



