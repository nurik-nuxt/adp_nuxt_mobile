import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "blank" | "default"
declare module "/Users/nursultannurtuganuly/Desktop/PhpStormProjects/adp_nuxt_mobile/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}