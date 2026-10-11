/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { "on-surface-variant": "#444840", "on-secondary": "#ffffff", "on-surface": "#1c1c19", "secondary-fixed": "#dae8be", "error-container": "#ffdad6", "surface-container-low": "#f6f3ee", "on-tertiary-fixed-variant": "#4c4634", "surface-tint": "#536347", "primary": "#47573b", "on-error": "#ffffff", "outline": "#75786f", "surface-bright": "#fcf9f4", "primary-container": "#5f6f52", "on-error-container": "#93000a", "on-secondary-fixed-variant": "#3f4b2c", "inverse-on-surface": "#f3f0eb", "on-secondary-fixed": "#141f05", "on-primary": "#ffffff", "primary-fixed-dim": "#bbccaa", "surface-container": "#f0ede8", "on-primary-container": "#dff1cd", "primary-fixed": "#d6e8c5", "outline-variant": "#c5c8bd", "surface": "#fcf9f4", "tertiary-fixed": "#ece2c9", "surface-variant": "#e5e2dd", "on-tertiary": "#ffffff", "surface-dim": "#dcdad5", "on-tertiary-container": "#f5ebd2", "on-secondary-container": "#5a6745", "surface-container-highest": "#e5e2dd", "on-background": "#1c1c19", "secondary": "#566342", "on-primary-fixed": "#121f09", "inverse-surface": "#31302d", "error": "#ba1a1a", "secondary-container": "#d7e5bb", "tertiary": "#58523f", "tertiary-container": "#716a56", "background": "#fcf9f4", "secondary-fixed-dim": "#becca3", "surface-container-high": "#ebe8e3", "surface-container-lowest": "#ffffff", "on-tertiary-fixed": "#201b0c", "inverse-primary": "#bbccaa", "on-primary-fixed-variant": "#3c4b31", "tertiary-fixed-dim": "#cfc6ae" },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
      spacing: { "space-lg": "1.5rem", "space-xs": "0.25rem", "margin-mobile": "1.25rem", "gutter-mobile": "1rem", "space-xl": "2.5rem", "space-sm": "0.5rem", "space-md": "1rem", "gutter": "1.5rem", "margin": "3rem" },
      fontFamily: { "label-md": ["Inter", "sans-serif"], "body-lg": ["Inter", "sans-serif"], "headline-lg-mobile": ["Newsreader", "serif"], "display-lg": ["Newsreader", "serif"], "headline-sm": ["Newsreader", "serif"], "body-sm": ["Inter", "sans-serif"], "label-lg": ["Inter", "sans-serif"], "display-lg-mobile": ["Newsreader", "serif"], "label-sm": ["Inter", "sans-serif"], "headline-md": ["Newsreader", "serif"], "body-md": ["Inter", "sans-serif"], "headline-lg": ["Newsreader", "serif"] },
      fontSize: { 
        "label-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0.04em", "fontWeight": "500" }], 
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }], 
        "headline-lg-mobile": ["30px", { "lineHeight": "38px", "letterSpacing": "-0.01em", "fontWeight": "400" }], 
        "display-lg": ["56px", { "lineHeight": "64px", "letterSpacing": "-0.02em", "fontWeight": "400" }], 
        "headline-sm": ["22px", { "lineHeight": "30px", "fontWeight": "500" }], 
        "body-sm": ["13px", { "lineHeight": "20px", "fontWeight": "400" }], 
        "label-lg": ["14px", { "lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "600" }], 
        "display-lg-mobile": ["38px", { "lineHeight": "46px", "letterSpacing": "-0.015em", "fontWeight": "400" }], 
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.06em", "fontWeight": "600" }], 
        "headline-md": ["28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "400" }], 
        "body-md": ["15px", { "lineHeight": "24px", "fontWeight": "400" }], 
        "headline-lg": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.015em", "fontWeight": "400" }] 
      }
    },
  },
  plugins: [],
}
