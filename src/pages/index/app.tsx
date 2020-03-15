import { getLayoutByRoute } from '@/system/core/portal'

export default {
  name: 'App',
  render(this: Vue) {
    const children = []
    const RouterView = <router-view />
    const Layout = getLayoutByRoute(this.$route)

    if (Layout) {
      children.push(
        // @ts-ignore
        <Layout>{RouterView}</Layout>
      )
    } else {
      children.push(RouterView)
    }

    return <div id="app">{children}</div>
  }
}
