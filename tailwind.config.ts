import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01963a",
        secondary: "#FFFFFF",
        text_light: "#FFFFFF",
        text_dark: "#000000",
        muted: "#D9D9D9",
        dark: "#1A1A1A",
        light: "#F2F2F2",
        background: "#F5F5F5",
      },
      spacing: {
				'xs': '4px',
				'sm': '8px',
				'md': '16px',
				'lg': '24px',
				'xl': '32px',
				'2xl': '40px',
				'3xl': '48px',

        "half" : "0.5rem",
        "base" : "1rem",
        "large" : "2rem"
			},
      fontSize: {
        "title" : "36px",
        "subtitle" : "32px",
        "label" : "16px",
        "body" : "14px",
      },
      keyframes: {
        "pulse-dot": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "1" },
        }
      },
      animation: {
        "pulse-dot": "pulse-dot 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
} satisfies Config;
