# 🍩 The Simpsons Memory Game

A browser-based memory card game built with React, featuring characters from The Simpsons. Test your memory by clicking each character only once — without repeating!

## 🎮 How to Play

- Click on a card to score a point
- **Don't click the same character twice!** If you do, it's game over
- Cards shuffle after every click to keep you on your toes
- Progress through levels by clicking all cards without repeating
- Try to beat your best score!

## 📈 Levels

| Level | Cards | Grid |
|-------|-------|------|
| 0     | 4     | 2x2  |
| 1     | 6     | 3x2  |
| 2     | 9     | 3x3  |
| 3     | 12    | 4x3  |
| 4     | 15    | 5x3  |
| 5     | 18    | 6x3  |

## 🛠️ Tech Stack

- **React** — UI and state management
- **Vite** — build tool
- **CSS** — custom styling
- **The Simpsons API** — character data and portraits (`thesimpsonsapi.com`)

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Score display
│   ├── Body.jsx         # Game board container
│   ├── MemoryCard.jsx   # Individual card
│   └── GameOver.jsx     # Game over screen
├── assets/              # Images and icons
├── App.jsx              # Main logic & state
└── App.css              # Styles
```

## ✨ Features

- Fetches 64 random Simpsons characters on load
- Progressive difficulty across 6 levels
- Tracks current score and best score
- Fully randomized board on every click