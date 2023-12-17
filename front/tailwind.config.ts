import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      borderWidth: {
        1: "1px"
      },
      width: {
        88: "22rem"
      },
      inset: {
        "7": "5.25rem"
        // "28": "7rem"
      },
      minWidth: {
        "90": "90px"
      }
    }
  }
};
export default config;
