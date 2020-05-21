import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import AppRouter from '../src/router/router'
import CacheRoute from 'react-router-cache-route'
/**
 * 路由类
 * 实现history和全局Store
 *
 * CacheRoute :缓存路由 ,跳转页面,不关闭上一个页面
 *    when: forward 前进缓存, back后退缓存, always 总是缓存
 * Route:普通路由,跳转页面会清除上一个页面
 * exact: 是否严格匹配路径, 否则/open ==/open/**
 */
class App extends Component {
    state={}
    render() {
        return (
            <Provider {...this.props.store} >
                <Router history={this.props.history}>
                    <div className='App'>
                        {
                            AppRouter.map((route, key) => {
                                if (route.exact) {
                                    // 严格模式返回
                                    if (route.when) {
                                        return (
                                            <CacheRoute exact
                                                        key={key}
                                                        path={route.path}
                                                        when={route.when}
                                                        render={props => (
                                                            <route.component {...props} routes={route.routes} />
                                                        )}
                                            />
                                        )
                                    } else {
                                        console.log('LLLLLLLLLLLLLLLLLLL',this.props.history)
                                        return (
                                            <Route exact
                                                   history={this.props.history}
                                                // store={this.props.store}
                                                   key={key}
                                                   path={route.path}
                                                   render={props => (
                                                       <route.component {...props} routes={route.routes} history={this.props.history} />
                                                   )}
                                            />
                                        )
                                    }
                                } else {
                                    if (route.when) {
                                        return (
                                            <CacheRoute
                                                key={key}
                                                path={route.path}
                                                when={route.when}
                                                render={props => (
                                                    // 主要是为了传递嵌套路由到子组件
                                                    // 类似于 <User {...props} routes={route.routes} />
                                                    <route.component {...props} routes={route.routes} />
                                                )}
                                            />
                                        )
                                    } else {
                                        return (
                                            <Route
                                                key={key}
                                                path={route.path}
                                                render={props => (
                                                    // 主要是为了传递嵌套路由到子组件
                                                    // 类似于 <User {...props} routes={route.routes} />
                                                    <route.component {...props} routes={route.routes} />
                                                )}
                                            />
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
