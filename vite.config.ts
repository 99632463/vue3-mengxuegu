import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtendObj from 'vite-plugin-vue-setup-extend-plus'

const vueSetupExtend = (vueSetupExtendObj as any).default

// https://vitejs.dev/config/
export default defineConfig(({ mode }): Object => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: false,
      proxy: {
        [env.VITE_APP_BASE_URL]: {
          target: env.VITE_APP_SERVER_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${env.VITE_APP_BASE_URL}`), ''),
        }
      }
    },
    plugins: [
      vue(),
      vueSetupExtend()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@u': fileURLToPath(new URL('./src/utils', import.meta.url))
      }
    }
  }
})
