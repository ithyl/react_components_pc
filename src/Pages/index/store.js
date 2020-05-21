import { observable, action, runInAction, computed, toJS } from 'mobx'
 class store {
@observable selectList = [
    {mc: 'test1',bm: '01'},{mc: 'test2',bm: '02'},{mc: 'test3',bm: '03'},{mc: 'test4',bm: '04'}]

}
export default new store()