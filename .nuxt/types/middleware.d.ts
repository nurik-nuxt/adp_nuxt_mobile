import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/home/ubnt02/Desktop/PhpStormProjects/adp_nuxt_mobile/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}