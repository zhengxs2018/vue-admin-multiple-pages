import Vue from 'vue'
import Vuex, { Store, StoreOptions } from 'vuex'

import { ModuleTree, Module } from 'vuex'

import { isEmpty } from 'lodash-es'

import { basename } from 'path-browserify'

import { dynamicLoader } from '@/system/utils/functional'

export function createStore<State>(options: StoreOptions<State>): Store<State> {
  const store = new Store(options)

  // 仅允许调试使用
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.router = router
  }

  return store
}

export function loadModules<R = any>(
  context: __WebpackModuleApi.RequireContext
): ModuleTree<R> {
  if (isEmpty(context)) return {}
  return dynamicLoader<Module<any, R>, ModuleTree<R>>({
    initialValue: {} as ModuleTree<R>,
    context: context,
    resolver(modules, vuexModule, filename) {
      modules[basename(filename, '.ts')] = vuexModule
      return modules
    }
  })
}
