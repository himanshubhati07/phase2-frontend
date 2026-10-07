/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        surface: '#FFFFFF',
        canvas: '#F7F7FB',
        ink: '#20233A',
        muted: '#6B7280',
        border: '#E5E7EB',
        success: '#16A34A',
        danger: '#DC2626',
        warning: '#D97706',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
      },
    },
  },
  plugins: [],
}
