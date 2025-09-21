/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-border': '#333333',
        'accent-blue': '#00d4ff',
        'accent-red': '#ff4757',
        'accent-green': '#2ed573',
        'accent-yellow': '#ffa502',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff' },
          '100%': { boxShadow: '0 0 20px #00d4ff, 0 0 30px #00d4ff' },
        }
      }
    },
  },
  plugins: [],
}
