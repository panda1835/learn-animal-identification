import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColorSnake: {
          light: "#16a34a",
          DEFAULT: "#15803d",
        },
        primaryColorBear: {
          light: "#b45309",
          DEFAULT: "#78350f",
        },
        primaryColorHome: {
          light: "#e9d5ff",
          DEFAULT: "#6b21a8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
