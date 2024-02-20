import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "blue-gradient": "linear-gradient(329.54deg, #29b6d1, #00c7c7)",
        landing: "url(/landing.svg)"
      },
      fontFamily: {
        sans: [
          'Nunito',
          ...defaultTheme.fontFamily.sans
        ]
      },
      colors: {
        blue: {
          500: "#15C3D6",
          400: "#17D6EB",
          300: "#96feff",
          100: "#D1EDF2"
        },
        yellow: {
          500: "#FFD666"
        },
        green: {
          500: "#37C77F",
          100: "#EDFFF6"
        },
        red: {
          500: "#FF669D",
          100: "#FFE4EE"
        },
        gold: {
          500: "#8D734B",
        },
        gray: {
          500: "#8FA7B2",
          200: "#D3E2E5",
          100: "#EBF2F5",
          50: "#F5F8FA",
        },
        teal: {
          500: "#4D6F80",
          400: "#5C8599",
        },
        munsell: {
          500: "#0089A5",
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    ringOpacity: false,
    textOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    backdropOpacity: false,
    backgroundOpacity: false,
    placeholderOpacity: false,
  }
};
export default config;
