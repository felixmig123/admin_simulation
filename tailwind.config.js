/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#11d4b4",
        "background-light": "#f6f8f8",
        "background-dark": "#10221f",
        "surface-dark": "#152a26", // Base dark surface
        "surface-darker": "#111817", // Darker variation often used in cards
        "surface-border": "#283936",
        "text-secondary": "#9db9b4",
        "text-muted": "#9db9b4", 
        "surface-light": "#ffffff",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
