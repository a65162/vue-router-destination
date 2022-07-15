import { isUndefined, isNull } from 'lodash-es'
import type { App } from 'vue'
import type { Router } from 'vue-router'

interface Config {
  router?: Router
  excludes?: RegExp[] | string[]
}

interface Plugin {
  install(app: App<Element>, args: Config): void
}

export default {
  install(app, args) {
    const $router = args.router ?? (app.config.globalProperties.$router as Router)

    if (!$router) throw new Error('Vue router is not detected')

    $router.beforeEach((to, from) => {
      const { destination } = from.query
      const { allowRedirect } = to.query

      return (!isUndefined(destination) && !isUndefined(allowRedirect) && destination !== to.fullPath && String(destination)) || true
    })
    $router.beforeEach((to) => {
      const { allowRedirect, destination } = to.query

      if (!isNull(destination) && isUndefined(allowRedirect) && !args.excludes?.some((exclude) => String(destination).match(exclude))) return

      delete to.query.allowRedirect
      delete to.query.destination

      return {
        ...to,
      }
    })
  },
} as Plugin
