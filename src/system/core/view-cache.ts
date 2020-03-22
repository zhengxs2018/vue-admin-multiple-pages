import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

import { get } from 'lodash-es'

import { unwrap } from '@/system/utils/functional'

export type cacheView = {
  name: string
  route: Route
}

export default class ViewCache {
  cachedComponentsNames: string[] = Vue.observable([])

  cachedRoutes: cacheView[] = Vue.observable([])

  constructor(router: VueRouter) {
    this.init(router)
  }

  private init(router: VueRouter): void {
    router.onReady(() => {
      this.onRouteChange(router.currentRoute)
    })

    router.beforeEach((to, from, next) => {
      this.onRouteChange(to, from)
      return next()
    })

    router.afterEach(to => this.remove(to))
  }

  private onRouteChange(to: Route, from?: Route) {
    if (unwrap<boolean>(get(to, 'meta.cache', false), to, from)) {
      this.add(to)
    }
  }

  add(route: Route): void {
    const name = this.getComponentNameForRouting(route)
    if (name === null) return

    this.cachedComponentsNames.push(name)
    this.cachedRoutes.push({ name, route })
  }

  remove(route: Route): void {
    const name = this.getComponentNameForRouting(route)
    if (name === null) return

    const cachedComponentsNames = this.cachedComponentsNames

    const index = cachedComponentsNames.lastIndexOf(name)
    if (index === -1) return

    cachedComponentsNames.splice(index, 1)
    this.cachedRoutes.splice(index, 1)
  }

  private getComponentNameForRouting(route: Route): string | null {
    return get(route, 'matched[0].components.default.name', null)
  }
}
