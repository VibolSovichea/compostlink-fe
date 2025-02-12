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
        primary: "#3BDA34",
        secondary: "#FEFFF4",
        muted: "#D9D9D9",
        dark: "#1A1A1A",
        light: "#F2F2F2",
      },
      spacing: {
				'xs': '4px',
				'sm': '8px',
				'md': '16px',
				'lg': '24px',
				'xl': '32px',
				'2xl': '40px',
				'3xl': '48px',

        "small": "0.5rem",
				"quarter": "0.75rem",
        "medium": "1rem",
				"half": "1.5rem",
        "large": "2rem",
				"base": "3rem",
			},
      fontSize: {
        "title" : "36px",
        "subtitle" : "32px",
        "label" : "16px",
        "body" : "14px",
      }
    },
  },
  plugins: [],
} satisfies Config;
