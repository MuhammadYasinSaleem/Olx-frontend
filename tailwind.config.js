export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1f2937',
        dark: '#111827',
        error: '#dc2626',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.8125rem',
        base: '0.875rem',
        md: '0.9375rem',
        lg: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '1.875rem',
        '5xl': '2.25rem',
        '6xl': '3rem',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        md: '4px',
        lg: '6px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
};
