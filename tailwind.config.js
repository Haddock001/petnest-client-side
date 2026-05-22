/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pet-primary': '#FF69B4',
        'pet-secondary': '#ec4899',
        'pet-accent': '#f59e0b',
        'pet-teal': '#14b8a6',
        'pet-orange': '#f97316',
        'pet-purple': '#a855f7',
        'pet-blue': '#3b82f6',
        'pet-pink': '#ec4899',
        'pet-green': '#10b981',
        'pet-light': '#f0f9ff',
        'pet-dark': '#1e293b',
      }
    },
  },
}

