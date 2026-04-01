/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2E7D32',
          secondary: '#4CAF50',
          light: '#E8F5E9',
        },
        app: {
          bg: 'rgb(var(--app-bg) / <alpha-value>)',
          card: 'rgb(var(--app-card) / <alpha-value>)',
          muted: 'rgb(var(--app-muted) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: '16px',
        button: '20px',
        badge: '12px',
        banner: '20px',
      },
      boxShadow: {
        soft: '0px 10px 30px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

