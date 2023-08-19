/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      Poppins: 'Poppins, sans-serif',
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
      },
      Gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },

      Sky: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
        950: '#082f49',
      },
      Red: {
        50: "#ef4444",
        100: "#dc2626",
        200: "#b91c1c",
      },
      blue:{
        50: '#3b82f6',
        100: '#2563eb',
        200: '#1d4ed8',
        300: '#6366f1',
        400: '#4f46e5',
        500: '#4338ca',
        600: '#3730a3',
        700: '#4c1d95',
      }

    },
    extend: {

    },
  },
  plugins: [],
};
