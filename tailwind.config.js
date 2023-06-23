/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      Poppins: 'Poppins, sans- serif',
      Roboto: 'Roboto, sans-serif',
      Lexend: 'Lexend, sans-serif'
    },
    colors: {
      greyish: {
        100: '#f8fafc',
        200: '#e2e8f0',
        300: '#334155',
        400: '#1e293b',
        500: '#0f172a',
        600: '#020617',
      },
      limegreen: {
        100: "#a3e635",
        200: "#84cc16",
        300: "#65a30d",
        400: "#22c55e",
        500: '#052e16',
      }
    },
    extend: {

    },
  },
  plugins: [],
};
