/// <reference types="vite/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
declare module 'element-plus/dist/locale/zh-cn.mjs';

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}