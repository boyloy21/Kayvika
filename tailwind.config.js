/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // Light mode colors
        background: "#ffffff",
        foreground: "#171717",
        // Dark mode colors
        darkBackground: "#0a0a0a",
        darkForeground: "#ededed",
      },
    },
  },
  plugins: [],
};
