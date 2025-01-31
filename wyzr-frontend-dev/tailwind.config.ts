import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'neue-montreal': ['NeueMontreal', 'sans-serif'], // Replace 'YourFontName' with the name you used in @font-face
        'satoshi': ['Satoshi', 'sans-serif'], // Replace 'YourFontName' with the name you used in @font-face
        'satoshi-italic': ['Satoshi-Italic', 'sans-serif'], // Replace 'YourFontName' with the name you used in @font-face
      },
      transitionProperty: {
        'height': 'height',
      },
      colors: {
        primary: {
          100: "#ccdfff",
          200: "#99beff",
          300: "#669eff",
          400: "#337dff",
          500: "#005dff",
          600: "#004acc",
          700: "#003899",
          800: "#002566",
          900: "#001333"
        },
        secondary: {
          100: "#def4ea",
          200: "#bdead5",
          300: "#9ddfbf",
          400: "#7cd5aa",
          500: "#5bca95",
          600: "#49a277",
          700: "#377959",
          800: "#24513c",
          900: "#12281e"
        },
        black: {
          100: "#d0d1d1",
          200: "#a2a3a3",
          300: "#737475",
          400: "#454647",
          500: "#161819",
          600: "#121314",
          700: "#0d0e0f",
          800: "#090a0a",
          900: "#040505"
        },
      },
    },
  },
  plugins: [],
};
export default config;
