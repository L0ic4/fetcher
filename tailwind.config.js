// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "hsl(210, 12%, 16%)",
        foreground: "hsl(214, 13%, 90%)",
        muted: "hsl(210, 12%, 20%)",
        "muted-foreground": "hsl(210, 12%, 70%)",
        popover: "hsl(210, 12%, 13%)",
        "popover-foreground": "hsl(214, 13%, 100%)",
        card: "hsl(210, 12%, 14%)",
        "card-foreground": "hsl(214, 13%, 95%)",
        border: "hsl(210, 2%, 21%)",
        input: "hsl(210, 2%, 24%)",
        primary: "hsl(214, 13%, 90%)",
        "primary-foreground": "hsl(214, 13%, 30%)",
        secondary: "hsl(214, 3%, 25%)",
        "secondary-foreground": "hsl(214, 3%, 85%)",
        accent: "hsl(210, 12%, 31%)",
        "accent-foreground": "hsl(210, 12%, 91%)",
        destructive: "hsl(1, 94%, 54%)",
        "destructive-foreground": "hsl(0, 0%, 100%)",
        ring: "hsl(214, 13%, 90%)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  darkMode: "class", // This enables dark mode based on a class
  plugins: [],
};
