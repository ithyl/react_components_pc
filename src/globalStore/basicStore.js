import { observable, action,  } from 'mobx'
/**
 * 全局变量Store
 */
class Store {
    @observable basicParam = {}
    @action setBasicParam=(v) => {
      this.basicParam = v
    }
}

export default new Store()
