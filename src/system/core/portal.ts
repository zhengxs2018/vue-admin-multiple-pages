import { Component } from 'vue'
import { Route } from 'vue-router'

import { findLast, isEmpty, get, has, property } from 'lodash-es'

import projectConfig from '@/project.config'

import { dynamicLoader } from '../utils/functional'

const isDebug = process.env.NODE_ENV === 'development'

const defaultLayout = get(projectConfig, 'themeConfig.layout.default')

// 获取全局布局组件
const globalLayouts = dynamicLoader({
  initialValue: {},
  context: get(projectConfig, 'themeConfig.layout.context'),
  resolver(layouts, Layout) {
    // @ts-ignore
    layouts[Layout.name] = Layout
    return layouts
  }
})

function getLayoutNameFormRoute(route: Route): string {
  const getter = property('meta.layout')
  const found = findLast(route.matched, getter)
  return found ? getter(found) : defaultLayout
}

export function getLayoutByName(
  name: string,
  throwError = isDebug
): Component | void {
  if (has(globalLayouts, name)) {
    return get(globalLayouts, name, null)
  }

  if (throwError) {
    throw new Error(`Layout "${name}" not found`)
  }
}

export function getLayoutByRoute(route: Route): Component | void {
  const name = getLayoutNameFormRoute(route)
  if (isEmpty(name)) return
  return getLayoutByName(name)
}
