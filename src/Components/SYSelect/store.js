/*
 * @Author: 姜跃龙
 * @Date: 2019-09-10 15:06:59
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-05-05 17:52:44
 * @Description: file content
 */
import { observable, action, runInAction, computed, toJS } from 'mobx'
import { post } from '../../utils/request'

class Store {
  // 分页参数
  @observable paginationParam = { current: 1, pageSize: 10 }
  // 数据源
  @observable dataSource = []
  // 选中值
  @observable value = ''
  // 选中值对应数据源中的对应数据
  @observable selectedData = []
  // 加载状态
  @observable loading = false
  // 参数
  @observable params = {}
  // 定义请求id防止加载错数据
  // @observable lastFetchId = 0

  @action setSelectedData = data => {
    this.selectedData = data
  }
  @action setValue = data => {
    this.value = data
  }
  @action setLoading = data => {
    this.loading = data
  }
  @action setDataSource = data => {
    this.dataSource = data
  }
  @action setPaginationParam = ({ current = 1, pageSize = 10, ...others }) => {
    this.paginationParam = { current, pageSize, ...others }
  }
  @action setParams = data => {
    this.params = data
  }
  // 加载远程数据
  @action.bound loadData = async ({
    url = '',
    params = {},
    onError = res => { },
    formatBefore = res => { },
    formatAfter = res => { },
    resultKey = 'results',
    totalKey = 'totalcount',
  }) => {
    this.setLoading(true)
    this.setDataSource([])
    try {
      // 获取更新后组件的分页参数
      let { current = 1, pageSize = 10 } = this.paginationParam
      // 给请求参数添加分页参数
      params = { size: pageSize, ...params, page: current }
      // 格式化参数
      formatBefore(params)
      // 发起请求
      let res = await post(url, params)
      // 格式化数据源
      res = formatAfter(res)
      runInAction(() => {
        let {
          [resultKey]: dataSource = [],
          [totalKey]: total = 0,
        } = res
        total = total || 0
        // 更新组件total
        let paginationParam = {
          ...this.paginationParam,
          total,
        }
        this.setDataSource(dataSource)
        this.setPaginationParam(paginationParam)
        this.setParams(params)
      })
    } catch (error) {
      console.error(error)
      onError(error)
    }
    this.setLoading(false)
  }
}

export default Store

