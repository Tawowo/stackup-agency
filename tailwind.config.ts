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
      fontFamily: {
        display: ['var(--font-space)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: "#1E3A5F",
        electric: "#1B5A9E",          // texte sur fond clair et fond porteur de texte blanc : 6,99:1
        "electric-clair": "#7DB3EA",  // texte sur fond sombre : 7,9:1 sur #0B1A2E
        "electric-vif": "#2D7DD2",    // décoratif uniquement : bordures, lueurs, dégradés
        "electric-ink": "#1B5A9E",
        gold: "#F59E0B",
        ink: "#1E293B",
        muted: "#94A3B8",
        success: "#10B981",
        danger: "#EF4444",
        background: "#F8FAFC",
        foreground: "#0F172A",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
