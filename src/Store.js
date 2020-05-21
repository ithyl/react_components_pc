
import { createBrowserHistory } from 'history'
import RootStore from './globalStore/index'
/**
 * 访问histrory变量和根Store

 push(location)   跳转   ===地址栏直接输入
 replace(location) 跳转无后退  ===地址栏直接修改
 go(n)      后退/前进某个history
 goBack()   后退上一个
 goForward() 前进下一个

*/
const history = createBrowserHistory({
  basename: '/cwProPc'
})

history.jump = ({ path, state = {}}) => {
  history.push(path, state)
}

export { RootStore, history }
