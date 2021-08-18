import config from '../config'
import routes, { IRoute } from './config'

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */
export const layoutRouteList = getLayoutRouteList() // 获取布局路由
export const systemRouteList = getSystemRouteList() // 获取系统路由
export const businessRouteList = getBusinessRouteList() // 获取业务路由

function getLayoutRouteList(): IRoute[] {
  return flattenRoute(routes, false, false)
}

function getSystemRouteList(): IRoute[] {
  const routeList = routes.filter((route) => route.path === '/system')

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, false)
  }
  return []
}

function getBusinessRouteList(): IRoute[] {
  const routeList = routes.filter((route) => route.path === '/')

  if (routeList.length > 0) {
    return flattenRoute(routeList, true, true)
  }
  return []
}

function findRoutesByPaths(
  pathList: string[],
  routeList: IRoute[],
  basename?: string
): IRoute[] {
  return routeList.filter(
    (child: IRoute) => pathList.indexOf((basename || '') + child.path) !== -1
  )
}

// 获取页面title
export function getPageTitle(routeList: IRoute[]): string {
  const route = routeList.find(
    (child) => child.path === window.location.pathname
  )

  return route ? route.meta.title : ''
}

export function getPagePathList(pathname?: string): string[] {
  return (pathname || window.location.pathname)
    .split('/')
    .filter(Boolean)
    .map((value, index, array) =>
      '/'.concat(array.slice(0, index + 1).join('/'))
    )
}

/**
 * 获取面包屑路由对象（注：只有业务路由会有面包屑）
 */
export function getBreadcrumbs(): IRoute[] {
  return findRoutesByPaths(
    getPagePathList(),
    businessRouteList,
    config.BASENAME
  )
}

/**
 *
 * 将路由拍平为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */
export function flattenRoute(
  routeList: IRoute[],
  deep: boolean,
  auth: boolean
): IRoute[] {
  const result: IRoute[] = []

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i]

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth,
    })

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth))
    }
  }

  return result
}
