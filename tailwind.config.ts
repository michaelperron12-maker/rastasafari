import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette Rastasafari
        rasta: {
          red: {
            DEFAULT: '#E31C23',
            50: '#FDE8E9',
            100: '#FBCACC',
            200: '#F6989B',
            300: '#F1666A',
            400: '#EC3F44',
            500: '#E31C23',
            600: '#B8161C',
            700: '#8D1115',
            800: '#620C0F',
            900: '#370708',
          },
          gold: {
            DEFAULT: '#FED100',
            50: '#FFFCE5',
            100: '#FFF8BF',
            200: '#FFF080',
            300: '#FFE740',
            400: '#FEDC0D',
            500: '#FED100',
            600: '#CBA700',
            700: '#987D00',
            800: '#665400',
            900: '#332A00',
          },
          green: {
            DEFAULT: '#009B3A',
            50: '#E5F7EC',
            100: '#BFECCE',
            200: '#80D99D',
            300: '#40C66C',
            400: '#0DB94B',
            500: '#009B3A',
            600: '#007C2E',
            700: '#005D23',
            800: '#003E17',
            900: '#001F0C',
          },
          black: {
            DEFAULT: '#000000',
            50: '#F5F5F5',
            100: '#E0E0E0',
            200: '#BDBDBD',
            300: '#9E9E9E',
            400: '#757575',
            500: '#616161',
            600: '#424242',
            700: '#303030',
            800: '#1A1A1A',
            900: '#000000',
          },
        },
        // Couleurs sémantiques
        primary: {
          DEFAULT: '#009B3A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FED100',
          foreground: '#000000',
        },
        accent: {
          DEFAULT: '#E31C23',
          foreground: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0A0A0A',
        },
        foreground: {
          DEFAULT: '#000000',
          muted: '#6B7280',
        },
        // Additional semantic colors used in components
        'off-white': '#F8F9FA',
        'light-gray': '#E9ECEF',
        'medium-gray': '#6C757D',
        'dark-gray': '#343A40',
        'palm-green': '#2D6A4F',
        'ocean-blue': '#0077B6',
        'sunset-orange': '#F77F00',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'rasta-gradient': 'linear-gradient(180deg, #009B3A 0%, #FED100 50%, #E31C23 100%)',
        'rasta-gradient-horizontal': 'linear-gradient(90deg, #009B3A 0%, #FED100 50%, #E31C23 100%)',
        'rasta-stripe': 'linear-gradient(180deg, #009B3A 33.33%, #FED100 33.33%, #FED100 66.66%, #E31C23 66.66%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      borderRadius: {
        'rasta': '0.75rem',
      },
      boxShadow: {
        'rasta': '0 4px 14px 0 rgba(0, 155, 58, 0.25)',
        'rasta-lg': '0 10px 40px 0 rgba(0, 155, 58, 0.3)',
        'gold': '0 4px 14px 0 rgba(254, 209, 0, 0.35)',
      },
    },
  },
  plugins: [],
}

export default config
