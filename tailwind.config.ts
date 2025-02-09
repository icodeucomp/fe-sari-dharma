import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/layouts/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      minHeight: {
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "800px",
        1000: "1000px",
      },
      maxWidth: {
        container: "1380px",
      },
      zIndex: {
        1: "1",
        5: "5",
        100: "100",
        1000: "1000",
        10000: "10000",
        100000: "100000",
      },
      boxShadow: {
        "custom-border": "0 0 0 2px rgba(185, 28, 28, 0.9)",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "#C75000",
        secondary: "#FB8B24",
        gray: "#6B7280",
        "light-brown": "#FFF6EE",
        light: "#FFFFFF",
        dark: "#1E1F20",
      },
    },
  },
  plugins: [],
};
export default config;
