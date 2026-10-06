import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        surface: "#FFFFFF",
        canvas: "#F7F9FC",
        ink: "#182230",
        muted: "#667085",
        border: "#E4E7EC",
        accent: "#F4B740",
        success: "#12B76A",
        warning: "#F79009",
        danger: "#F04438",
        navy: "#153A5B",
      },
      boxShadow: {
        card: "0 1px 3px rgba(16, 24, 40, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
