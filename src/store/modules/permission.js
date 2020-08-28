import { asyncRoutes, constantRoutes } from '@/router'
// import router from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, state }, roles) {
    return new Promise(resolve => {
      const rolesObj = JSON.parse(roles)
      const accessedRoutes = filterAsyncRoutesMy(asyncRoutes, rolesObj)
      // 添加的路由
      commit('SET_ROUTES', accessedRoutes)
      // 使用router.addRoutes传accessedRoutes过去相当于push
      // 使用options.routes传allRoutes过去相当于替换
      const allRoutes = constantRoutes.concat(accessedRoutes)

      // router.options.routes = allRoutes;
      // router.addRoutes(allRoutes)
      resolve(allRoutes)
    })
  }
}

export function filterAsyncRoutesMy(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermissionMy(roles, tmp)) {
      if (tmp.children) {
        if (tmp.meta) {
          tmp.children = filterAsyncRoutesMy(tmp.children, roles[tmp.meta.rolesName])
        }
      }
      res.push(tmp)
    }
  })

  return res
}
function hasPermissionMy(roles, route) {
  if (route.meta && route.meta.rolesName) {
    return roles[route.meta.rolesName]
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
