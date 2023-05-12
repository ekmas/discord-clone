/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/src/media/bg.jpg')"
      },

      padding: {
        'dm-heading': '18px 0px 14px 10px',
        'friends-search': '15px 20px 8px 30px',
        'friends-search-2': '16px 20px 8px 30px',
        'siderbar': '23px 8px 0 16px'
      },

      borderRadius: {
        main: '5px',
        secondary: '3px'
      },

      fontFamily: {
        normal: 'normal',
        medium: 'medium',
        semibold: 'semibold',
        bold: 'bold'
      },

      transitionDelay: {
        0: '0ms'
      },

      keyframes:{
        'spinning-wandering-cubes':{
          'from':{
            transform: 'translateY(-70px)',
            opacity: '0.5',
            scale: '1.05'
          },
          'to':{
            transform: 'translateY(0px)',
            opacity: '1',
            scale: '1'
          }
        },
        'pulse':{
          'from':{
            opacity: '0'
          },
          '50%':{
            opacity: '1'
          },
          'to':{
            opacity: '0'
          }
        },
        'loadingCube1':{
          'from':{
            transform: 'translateX(0px) translateY(0px) rotate(0)'
          },

          '25%': {
            transform: 'translateX(40px) translateY(0px) rotate(45deg)'
          },

          '50%': {
            transform: 'translateX(40px) translateY(40px) rotate(0deg)'
          },

          '75%': {
            transform: 'translateX(0px) translateY(40px) rotate(45deg)'
          },

          'to': {
            transform: 'translateX(0px) translateY(0px) rotate(0deg)'
          }
        },

        'loadingCube2':{
          'from':{
            transform: 'translateX(0px) translateY(0px) rotate(0)'
          },

          '25%': {
            transform: 'translateX(-40px) translateY(0px) rotate(45deg)'
          },

          '50%': {
            transform: 'translateX(-40px) translateY(-40px) rotate(0deg)'
          },

          '75%': {
            transform: 'translateX(0px) translateY(-40px) rotate(45deg)'
          },

          'to': {
            transform: 'translateX(0px) translateY(0px) rotate(0)'
          }
        }
      },

      animation: {
        'spinning': 'spinning-wandering-cubes 0.2s ease',
        'pulsing': 'pulse 0.7s ease infinite',
        'cube1': 'loadingCube1 1.5s ease infinite',
        'cube2': 'loadingCube2 1.5s ease infinite'
      },

      gridTemplateColumns: {
        'dropdowns' : '1fr 1fr 1fr',
        'main': '72px auto',
        'dm' : '240px auto',
        'dm-responsive': '135px auto',
        'message': '41px auto',
        'server': 'auto 240px',
        'server-responsive': 'auto 150px',
        'loadingDiv': '1fr 1fr'
      },

      flex: {
        0: '0 0 auto'
      },

      colors: {
        'main-gray': '#363940',
        'secondary-gray': '#b9bbbe',
        'gray-3': '#a3a6aa',
        'gray-4': '#303136',
        'gray-5': '#3c3f46',
        'gray-6': '#383a3f',
        'gray-7': '#42474d',
        'gray-8': '#8e9196',
        'gray-9': '#454a50',
        'gray-10': '#40454b',
        'gray-11': '#32353c',
        'gray-12': '#4f535c',
        'gray-13': '#96989d',
        'gray-14': '#989aa2',

        'red': '#ed4245',
        'red-2': '#a06266',
        'black': '#212226',
        'black-2': '#18191d',
        'black-3': '#2c2d31',
        'black-4': '#2a2b2f',
        'green': '#3da45d',
        'green-2': '#2d7e46',
        'green-3': '#46C46E',
        'green-4': '#638c74',
        'blue': '#5865f2',

        'link': '#00aff4',
        'button-initial': '#5865f2',
        'button-hover': '#4752c4',

        'border': '#72767d',
        'outline': '#7b84e6',

        'overlay': 'rgba(0, 0, 0, 0.85)',
        'overlay-text': '#dcddde',
        'overlay-btn-bg': '#303136'
      },

      screens: {
        'tall': { 'raw': '(max-height: 620px)' },
        'regform': { 'raw': '(max-width: 400px)' },
        'm1000': { 'raw': '(max-width: 1000px)' },
        'm900': { 'raw': '(max-width: 900px)' },
        'm850': { 'raw': '(max-width: 850px)' },
        'm750': { 'raw': '(max-width: 750px)' },
        'm600': { 'raw': '(max-width: 600px)' },
        'm550': { 'raw': '(max-width: 550px)' },
        'm500': { 'raw': '(max-width: 500px)' },
        'm450': { 'raw': '(max-width: 450px)' },
        'm400': { 'raw': '(max-width: 400px)' },
        'm350': { 'raw': '(max-width: 350px)' },
      }
    },
  },
  plugins: [],
}