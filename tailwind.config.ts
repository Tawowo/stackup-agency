import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1E3A5F",
        electric: "#2D7DD2",
        gold: "#F59E0B",
        background: "#F8FAFC",
        foreground: "#0F172A",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
