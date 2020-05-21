
import globalStore from './basicStore'
/**
 * 根Store
 */
class RootStore {
  constructor () {
    this.globalStore = globalStore
  }
}

export default new RootStore()
