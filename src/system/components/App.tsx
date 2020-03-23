import { RouteRecord } from 'vue-router'
import { Vue, Component, Prop } from 'vue-property-decorator'

import { has, findLast, isString } from 'lodash-es'

import ViewCached from '../core/view-cache'

export type LayoutConfig = {
  name?: string
}

const getLayoutConfigForRouting = (route: RouteRecord): LayoutConfig => {
  const layout = route.meta?.layout || {}
  return isString(layout) ? { name: layout } : layout
}

@Component
export default class UxApp extends Vue {
  /** 页面布局 */
  @Prop() readonly layouts!: Record<string, any>

  /** 视图缓存控制器 */
  @Prop() readonly viewCache!: ViewCached

  getLayoutConfigForRouting(): LayoutConfig {
    const matched = this.$route?.matched || []
    if (matched.length === 0) return {}

    const found = findLast<RouteRecord[]>(matched, getLayoutConfigForRouting)
    if (found) {
      return getLayoutConfigForRouting(found as RouteRecord)
    }

    return {}
  }

  getLayout(name?: string): any {
    const layouts = this.layouts

    return name && has(layouts, name) ? layouts[name] : void 0
  }

  render() {
    const viewCache = this.viewCache
    const routerView = (
      <keep-alive include={viewCache.cachedComponentsNames}>
        <router-view />
      </keep-alive>
    )

    const config = this.getLayoutConfigForRouting()
    const Layout = this.getLayout(config?.name || 'basic')
    if (Layout) {
      return (
        <div id="app">
          <Layout {...config}>{routerView}</Layout>
        </div>
      )
    }

    return <div id="app">{routerView}</div>
  }
}
