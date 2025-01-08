import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            colors: {
                "primary-bg": "#0f172a",
                "accent-bg": "#1e293b",
                "txt-grey": "#94a3b8",
                "txt-violet": "#818cf8",
                "sidebar-width": "300px",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
