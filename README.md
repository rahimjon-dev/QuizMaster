# 🧠 QuizMaster Mobile App

A modern, full-featured mobile Quiz and Trivia application built with **React Native**, **Expo**, and **AsyncStorage**.

Designed with a game-show inspired **"Who Wants to Be a Millionaire?"** dark theme aesthetics, tactile animations, multi-language localization, and cryptographic JWT authentication.

---

## 🌟 Key Features

* **🔐 JWT User Authentication**:
  * Secure Sign Up and Log In with password validation.
  * Real cryptographic 3-part **JWT session tokens** (`header.payload.signature`) stored in `AsyncStorage`.
  * Persistent sessions across app restarts.
* **👤 Player Profile Dashboard**:
  * User avatar, joined date, and stats tracking:
    * Total Quizzes Played
    * Highest Score
    * Overall Accuracy (%)
    * Total Accumulated Points
  * Interactive **JWT Token Inspector** (inspect or copy your active token).
* **🎯 3 Difficulty Levels**:
  * 🟢 **Easy**: Relaxed questions for casual players.
  * 🟡 **Medium**: Balanced trivia.
  * 🔴 **Hard (Expert)**: Genuinely deep questions (quantum mechanics, systems architecture, history, extreme geography).
* **🔀 Dynamic Shuffling (Fisher-Yates Algorithm)**:
  * Questions and answer choices (A, B, C, D) are dynamically shuffled on every run so no quiz ever repeats the exact same sequence.
  * Customizable question count per session: **15 Questions** or **30 Questions**.
* **🌐 3 Languages (i18n)**:
  * 🇺🇿 **O'zbekcha**
  * 🇺🇸 **English**
  * 🇷🇺 **Русский**
  * Instant on-the-fly translation of both the UI and all 150 quiz questions!
* **📚 150 Questions Dataset**:
  * 5 comprehensive categories (30 questions each):
    1. 🧠 General Knowledge
    2. 💻 Programming
    3. 🌍 Geography
    4. ⚽ Football
    5. 🔬 Science
* **📜 Local History**:
  * Detailed history of completed quizzes scoped to the authenticated user.
  * Clear history with confirmation alert.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [Expo Go](https://expo.dev/go) app installed on your Android / iOS device.

### Installation

```bash
# Clone the repository
git clone git@github.com:rahimjon-dev/QuizMaster.git

# Navigate into project directory
cd QuizMaster

# Install dependencies
npm install
```

### Running the App

```bash
# Run with Expo Tunnel (Recommended to avoid local network firewall issues)
npx expo start --tunnel

# Or standard LAN mode
npx expo start
```

Scan the terminal QR code with the **Expo Go** app on your phone!

---

## 🛠️ Built With

* **React Native** & **Expo SDK 57**
* **React Navigation** (Native Stack Navigator)
* **AsyncStorage** (Client-side persistence)
* **React Hooks** (`useState`, `useEffect`, `useContext`, `useMemo`)
