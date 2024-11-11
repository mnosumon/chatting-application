module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "576px",
        md: "768px",
        lg: "922px",
        xl: "1200px",
        "2xl": "1400px",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
