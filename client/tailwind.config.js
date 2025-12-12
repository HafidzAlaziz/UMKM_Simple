/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F172A', // Slate 900
                    foreground: '#F8FAFC',
                },
                secondary: {
                    DEFAULT: '#D4AF37', // Gold
                    foreground: '#0F172A',
                },
                accent: {
                    DEFAULT: '#F1F5F9', // Slate 100
                    foreground: '#0F172A',
                },
                background: '#FFFFFF',
                foreground: '#020617',
                muted: '#94A3B8',
                border: '#E2E8F0',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    "2xl": "1400px",
                },
            },
        },
    },
    plugins: [],
}
