import { RouteRecord } from 'vue-router'
import { Vue, Component, Prop } from 'vue-property-decorator'

import { has, property, findLast } from 'lodash-es'

import ViewCached from '../core/view-cache'

const getLayoutNameForRoute = property<RouteRecord, string>('meta.layout.name')

@Component
export default class App extends Vue {
  /** 页面布局 */
  @Prop() readonly layouts!: Record<string, any>

  /** 视图缓存控制器 */
  @Prop() readonly viewCache!: ViewCached

  getLayoutNameForRouting(): string | void {
    const matched = this.$route?.matched || []
    if (matched.length === 0) return

    const found = findLast<RouteRecord[]>(matched, getLayoutNameForRoute)
    if (found) {
      return getLayoutNameForRoute(found as RouteRecord)
    }
  }

  getLayout(): any | void {
    const layouts = this.layouts
    const name = this.getLayoutNameForRouting()

    return name && has(layouts, name) ? layouts[name] : void 0
  }

  render() {
    const viewCache = this.viewCache
    const routerView = (
      <keep-alive include={viewCache.cachedComponentsNames}>
        <router-view />
      </keep-alive>
    )

    const Layout = this.getLayout()
    if (Layout) {
      return (
        <div id="app">
          <Layout>{routerView}</Layout>
        </div>
      )
    }

    return <div id="app">{routerView}</div>
  }
}
