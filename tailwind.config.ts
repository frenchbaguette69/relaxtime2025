import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      typography: {
        blue: {
          css: {
            "--tw-prose-body": "#0a1e3b",
            "--tw-prose-headings": "#0a1e3b",
            "--tw-prose-links": "#0a1e3b",
            "--tw-prose-bold": "#0a1e3b",
            "--tw-prose-quotes": "#0a1e3b",
            "--tw-prose-code": "#0a1e3b",
            "--tw-prose-bullets": "#0a1e3b",
            "--tw-prose-counters": "#0a1e3b",
            "--tw-prose-hr": "#0a1e3b",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
