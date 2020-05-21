/*
 * @Author: 姜跃龙
 * @Date: 2020-04-28 11:23:38
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-05-20 17:03:42
 * @Description: file content
 */
import React, { Component } from 'react'
import { Select, Pagination, Spin, Icon } from 'antd'
import _ from 'lodash'
import EllipsisTooltip from '../EllipsisTooltip'
import './style.less'
import icon from './img/selectIcon.png'
import icon2 from './img/selectIcon2.png'

const { Option, OptGroup } = Select
class SYSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isIcon: false
    }
  }

  render() {
    let { mode, page, pagination, children, dataSource = [],
      valueKey, optionKey, nameKey, loading, ...options } = this.props
    const { total, ...otherPagination } = pagination
    let { isIcon } = this.state
    const dropdownPagination = (
      <Pagination
        total={total || dataSource.length}
        {...otherPagination}
      />
    )
    return (
      <Select
        className='SYSelect'
        mode={mode}
        suffixIcon={<img src={isIcon ? icon2 : icon} alt='' />}
        onDropdownVisibleChange={open => { this.setState({ isIcon: open }) }}
        dropdownClassName={'SYSelectDropdown'}
        notFoundContent={loading ? <Spin /> : null}
        loading={loading}
        {...options}
      >
        {page
          ? (
            <OptGroup label={dropdownPagination}>
              {dataSource &&
                dataSource.map(
                  v => {
                    const {
                      [valueKey]: value,
                      [nameKey]: name,
                      [optionKey]: option,
                      ...other
                    } = v
                    return (
                      <Option
                        value={String(value)}
                        key={option || value}
                        {...other}
                      >
                        <EllipsisTooltip clickClose title={String(name)}>
                          {String(name)}
                        </EllipsisTooltip>
                      </Option>
                    )
                  }
                )}
            </OptGroup>
          )
          : dataSource &&
          dataSource.map(
            v => {
              const {
                [valueKey]: value,
                [nameKey]: name,
                [optionKey]: option,
                ...other
              } = v
              return (
                <Option
                  value={String(value)}
                  key={option || value}
                  {...other}
                >
                  <EllipsisTooltip clickClose title={String(name)}>
                    {String(name)}
                  </EllipsisTooltip>
                </Option>
              )
            }
          )}
        {children}
      </Select>
    )
  }
}
export default SYSelect
