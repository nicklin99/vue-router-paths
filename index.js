/* eslint-disable */
/**
 * meta 对象
 * @param {string} index 当前数组索引
 * @param {bool} display true 显示 false 不显示 默认不显示
 * @param {string} fullPath 路由路径
 * @param {string} key 组建循环key，唯一，不需要关心
 * @param {string} level 层级
 * 
 * 1. 获取当前路径
 * 
 * ```js
 * this.$route.meta.paths
 * ```
 * 
 * 2. 获取当前路路径当前组件的router-view层级
 * 
 * ```js
 * // this 当前组件
 * this.$vnode.data.routerViewDepth
 * ```
 * 
 * 3. 获取当前组件的子菜单， 当前组件必须是由router-view渲染
 * 
 * ```js
 * this.$route.meta.paths[this.$vnode.data.routerViewDepth].children
 * ```
 * 
 * 4. 判断当前组件是否 router-view 渲染
 * ```js
 * this.$vnode.data.routerView // true 是
 * ```
 * 
 * @param {*} router 
 */

export default function watchRouterPaths(router) {
  const routes = router.options.routes
  // save for key `routes`
  mapTree(routes)
  router.routes = routes
  router.afterEach((to, from) => {
    const paths = []
    let parent = routes

    to.matched.forEach(item => {
      const children = parent[item.meta.index].children || []
      const path = {
        title: item.meta.title,
        children: children.map(_item => {
          return {
            children: _item.children,
            meta:_item.meta
          }
        }),
        path: item.path || '/',
      }
      paths.push(path)
      parent = path.children
    })
    // save for key: `meta.paths` $router.currRoute = vm.$route, for value: paths
    to.meta.paths = paths
  })
}

export function mapTree(routes, parent) {
  return routes.map((item, i) => {
    if (!item.meta) {
      item.meta= {}
    }
    if (item.path.indexOf('/') === 0) {
      item.meta.fullPath = item.path
    } else {
      item.meta.fullPath = (parent ? parent.meta.fullPath + (parent.meta.fullPath.lastIndexOf('/') !== parent.meta.fullPath.length - 1 ? '/' : '') : '') + item.path
    }

    if (!parent) {
      item.meta.level = 0
    } else {
      let level = parent.meta.level || 0
      level++
      item.meta.level = level
    }
    item.meta.display = !!item.meta.display
    item.meta.index = i
    item.meta.key = `${item.meta.level}_${i}`
    if (item.children) {
      mapTree(item.children, item)
    }
  })
}

// @deprecated 获取属性当前路径，改为使用 $route.matched  to.matched
function getPaths(matcheds, children) {
  const depth = matcheds.length
  let level = 0
  const paths = []
  while (level < depth) {
    const matched = matcheds[level]
    for (let index = 0; index < children.length; index++) {
      const item = children[index]

      if (matched.regex.test(item.path)) {
        paths.push({
          title: item.title,
          path: matched.path,
          level,
          display: item.display,
          children: item.children
        })
        children = item.children
        break
      }
    }
    level++
  }

  return paths
}