import { isUndefined, isNull } from 'lodash-es'
import type { Plugin } from 'vue'
import type { Router } from 'vue-router'

export default {
  install(app, args) {
    const router = (app.config.globalProperties.$router ?? args.router) as Router
    if (!router) throw new Error('Vue router is not founed.')
    router.beforeEach((to, from) => {
      const { destination } = from.query
      const { allowRedirect } = to.query
      return (!isUndefined(destination) && !isUndefined(allowRedirect) && destination !== to.fullPath && String(destination)) || true
    })
    router.beforeResolve((to) => {
      const { allowRedirect, destination } = to.query
      if (!isNull(destination) && !String(destination).match(/^\/?(logout|500|403|404|unknown|login)?$/) && isUndefined(allowRedirect)) return
      delete to.query.allowRedirect
      delete to.query.destination

      return {
        ...to,
      }
    })
  },
} as Plugin
