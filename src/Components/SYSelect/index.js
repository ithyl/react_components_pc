/*
 * @Author: 姜跃龙
 * @Date: 2020-04-28 11:15:48
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-05-05 18:01:24
 * @Description: file content
 */
import React, { Component } from 'react'
import _ from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import Store from './store'
import SelectRender from './selectRender'

@observer
class SYSelect extends Component {
  // 定义默认props
  static defaultProps = {
    onMount: () => { },
    formatAfter: res => res, // 请求之后格式化
    formatBefore: params => params, // 请求之前格式化
    autoLoad: true, // 自动加载
    allowClear: true, // 允许清除
    searchKey: 'search', // 搜索参数
    nameKey: 'name', // option的显示文本
    valueKey: 'value', // option的value
    optionKey: 'id', // option的key
    resultKey: 'results', // 请求返回数据
    totalKey: 'totalcount', // 返回总条数key
    limit: 999, // 多选模式选择个数
    // mode: 'multiple',// 多选模式
    params: {},
    onError: () => { },

    filterOption: false,
    defaultActiveFirstOption: false,
    autoClearSearchValue: false,
    onChange: () => { },
    // onSearch: () => { }
  }

  componentWillMount() {
    // 创建store
    this.store = new Store()
    // 初始化时获取数据源
    const { url, autoLoad, params, onError,
      formatBefore,
      formatAfter,
      resultKey,
      totalKey } = this.props
    // 设置初始分页参数
    const { page, size } = params
    this.store.setPaginationParam({ current: page, pageSize: size })
    if (url && autoLoad) {
      this.store.loadData({
        url,
        params,
        onError,
        formatBefore,
        formatAfter,
        resultKey,
        totalKey
      })
    }
    this.props.onMount(this.store)
  }

  render() {
    let {
      mode,
      pagination,
      dataSource: dataSourceProp,
      searchKey,
      style,
      url,
      params,
      onError,
      limit,
      onChange,
      onSearch,
      formatBefore,
      formatAfter,
      resultKey,
      totalKey,
      ...options } = this.props
    console.log('/////////syselect',this.props.dataSource)
    const DataSource = dataSourceProp || toJS(this.store.dataSource)
    // SYSelect默认配置
    const SelectOpts = {
      style: {
        width: 250,
        ...style
      },
      // 分页
      pagination: {
        onChange: (page, pageSize) => {
          // 更新分页
          this.store.setPaginationParam({
            ...this.store.paginationParam,
            current: page,
            pageSize
          })

          if (url) {
            this.store.loadData({
              url,
              params,
              onError,
              formatBefore,
              formatAfter,
              resultKey,
              totalKey
            })
          }
        },
        simple: true,
        ...pagination,
        ...this.store.paginationParam,
      },
      // 组件变化时触发store更新
      onChange: (value, option) => {
        const { searchKey, searchKeyFirst, searchKeySecond } = this.props
        // 非多选模式且不超过最多可选条数
        if (mode === 'multiple' && value.length > limit) return
        // 保存已选值至store
        this.store.setValue(value)
        // 保存已选数据至store
        const selData = DataSource.filter(v => String(v.value) === String(this.store.value))
        this.store.setSelectedData(selData)
        onChange && onChange(value, option, selData)
        if (value === undefined) {
          let par = params
          if (searchKeyFirst) {
            /** 业务逻辑 start */
            par[searchKeyFirst][searchKey] = ''
            if (searchKeySecond) {
              par[searchKeyFirst][searchKeySecond][0][searchKey] = ''
            }
          } else {
            par[searchKey] = ''
          }
          this.store.loadData({
            url,
            params: par,
            onError,
            formatBefore,
            formatAfter,
            resultKey,
            totalKey
          })
        }
      },
      // 搜索时自动发送请求
      onSearch: _.throttle((searchValue, options) => {
        const { paginationParam } = this.store
        const { searchKeyFirst, searchKeySecond } = this.props
        // 搜索时重置当前页码、数据源
        this.store.setPaginationParam({ ...paginationParam, current: 1 })
        this.store.setDataSource([])
        // 传入onSearch事件时，使用传入的方法
        if (onSearch) {
          onSearch(searchValue, options)
        } else {
          let par = params
          if (searchKeyFirst) {
            /** 业务逻辑 start */
            par[searchKeyFirst][searchKey] = searchValue
            if (searchKeySecond) {
              par[searchKeyFirst][searchKeySecond][0][searchKey] = searchValue
            }
          } else {
            par[searchKey] = searchValue
          }
          this.store.loadData({
            url,
            params: par,
            onError,
            formatBefore,
            formatAfter,
            resultKey,
            totalKey
          })
        }
      }, 500),
      // 数据源
      dataSource: DataSource,
      // 加载中状态
      loading: toJS(this.store.loading),
      // 选择模式
      mode,
    }
    return (
      // select渲染组件
      <SelectRender {...options} {...SelectOpts} />
    )
  }
}
export default SYSelect
