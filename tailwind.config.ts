// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: "#5E60CE",
        todo: "#4EA8DE",
        tasks: "#4EA8DE",
        completed: "#6163B4",
        createTask: "#1E6F9F",
        rocket: "#4EA8DE",
        rocketFire: "#5E60CE",
      },
    },
  },
  plugins: [],
}
export default config
