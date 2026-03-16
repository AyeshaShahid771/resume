import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "border-beam": {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "border-beam": "border-beam 2s linear infinite",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "#121212",
        primary: "#ffffff",
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.perspective-1000': {
          'perspective': '1000px',
        },
      })
    },
  ],
};
export default config;
