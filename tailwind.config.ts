import type { Config } from 'tailwindcss';
export default { darkMode: 'class', content: ['./src/**/*.{ts,tsx}'], theme: { extend: { colors: { base: '#020617', surface: '#0f172a', indigo: { accent: '#6366f1' }, emerald: { accent: '#10b981' } }, boxShadow: { glow: '0 0 40px rgba(99,102,241,.25)' } } }, plugins: [] } satisfies Config;
