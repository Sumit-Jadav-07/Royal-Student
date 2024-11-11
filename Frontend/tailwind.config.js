/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        metropolis: ["Metropolis", "sans-serif"],
      },
      // backgroundImage: {
      //   'header-image': "url('./assets/img/HeaderImage.png')",
      //   'zomato-logo': "url('./assets/img/ZomatoLogo.png')",
      // }
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none" /* For IE and Edge */,
          "scrollbar-width": "none" /* For Firefox */,
          /* For Chrome, Safari, and other WebKit browsers */
          "::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
  daisyui: {
    themes: [],
  },
};
