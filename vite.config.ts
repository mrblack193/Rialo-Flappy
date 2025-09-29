import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // QUAN TRỌNG: Thay 'rialo' bằng tên repository GitHub của bạn.
  // Ví dụ: nếu URL repo là https://github.com/user/my-game, bạn sẽ đặt là '/my-game/'
  base: '/Rialo-Flappy/'
})
