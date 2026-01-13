/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#3b82f6",
          success: "#06b6d4",
          text: "#111827",
          bg: "#f9fafb",
          surface: "#ffffff",
          muted: "#64748b",
          border: "#e5e7eb"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 28s) linear infinite"
      }
    }
  },
  plugins: []
};
