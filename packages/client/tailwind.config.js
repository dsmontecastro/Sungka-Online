/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {

    extend: {

      animation: {
        "grow": "grow 0.25s linear",
        "beat": "beat 3s linear infinite",
      },

      keyframes: {

        "grow": {
          "000%": { transform: "scale(1.0)" },
          "020%": { transform: "scale(1.1)" },
          "050%": { transform: "scale(1.0)" },
          "080%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1.0)" },
        },

        "beat": {
          "10%": { transform: "scale(1.0)" },
          "12%": { transform: "scale(1.1)" },
          "15%": { transform: "scale(1.0)" },
          "17%": { transform: "scale(0.9)" },
          "20%": { transform: "scale(1.0)" },

          "25%": { transform: "scale(1.1)" },
          "27%": { transform: "scale(1.2)" },
          "28%": { transform: "scale(1.0)" },
          "29%": { transform: "scale(0.8)" },
          "35%": { transform: "scale(1.0)" },
        }

      }

    }

  },

  plugins: [],

}

