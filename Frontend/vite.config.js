import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo-list-fullstack/', // Set the base path for the application to ensure correct asset loading when deployed to GitHub Pages
})
