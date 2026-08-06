import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#030b15", panel: "#071525", electric: "#087cff" }, boxShadow: { glow: "0 0 40px rgba(8,124,255,.18)" } } }, plugins: [] } satisfies Config;
