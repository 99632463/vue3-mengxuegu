import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'
import Page from '@/components/Global/Page.vue'

export const useElIcon = (app: App): void => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`e-${key}`, component)
  }
  app.component('SvgIcon', SvgIcon)
  app.component('MPage', Page)
}