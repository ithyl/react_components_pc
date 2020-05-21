import index from '../Pages/index/index1'

/**
 * 全局路由管理类
 */
let AppRouter = [
  {
    path: '/cwgjj/example', // 首页默认加载的页面
    component: index, // 所使用的组件
    exact: true, // 是否为严格模式
    name: '组件示例  '
  }

]

export default AppRouter
