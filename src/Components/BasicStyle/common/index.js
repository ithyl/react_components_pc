import React, { Component } from 'react'
import styles from './index.less'
import className from 'classnames'
import { Row, Col, Button, Input } from 'antd'
import SelectComponent from 'Components/SYSelect'
import TableComponent from 'Components/SYTable'
/**
 * 布局组件:
 * test属性可以 自动显示红色边框,方便调整布局
 * SyRow :  包装Row布局,默认使用syrow样式
 * SyCenterRow :使用Flex布局,水平方向居中,垂直方向居中
 * SyCenterXRow :使用Flex布局,水平方向居中   垂直默认靠上
 * SyCenterYRow :使用Flex布局,垂直方向居中  水平默认靠左
 * SyCol:   包装Col布局
 * SyBlank: 包装Row布局,默认使用syblank样式
 * 功能组将:
 * SyButton: 包装Button组件, to属性 ,可选ok或cancel 分别代表确定和取消两种样式
 */
export const SyRow = (props) => {
  const { children, test } = props
  return (
    <Row className={className({ [styles.testRed]: test }, styles.syrow)} {...props} >{children}</Row>
  )
}
export const SyCenterRow = (props) => {
  const { children, test } = props
  return (
    <Row type='flex' justify='center' align='middle' className={className({ [styles.testRed]: test }, styles.syrow)} {...props} >{children}</Row>
  )
}
export const SyCenterXRow = (props) => {
  const { children, test } = props
  return (
    <Row type='flex' justify='center' className={className({ [styles.testRed]: test }, styles.syrow)} {...props} >{children}</Row>
  )
}
export const SyCenterYRow = (props) => {
  const { children, test } = props
  return (
    <Row type='flex' align='middle' className={className({ [styles.testRed]: test }, styles.syrow)} {...props} >{children}</Row>
  )
}
export const SyCol = (props) => {
  const { children, test } = props
  return (
    <Col className={className({ [styles.testTeal]: test })} {...props} >{children}</Col>
  )
}
export const SyInput = (props) => {
  const { children, test } = props
  return (
    <Input className={className({ [styles.testTeal]: test })} {...props} >{children}</Input>
  )
}
export const SyBlank = (props) => {
  const { children, test } = props
  return (
    <Row className={className({ [styles.testPink]: test }, styles.syblank)} {...props} />
  )
}

export const SyButton = (props) => {
  const { children, to } = props
  let buttonClass = ''
  switch (to) {
    case 'ok':
      buttonClass = styles['sybutton-ok']
      break
    case 'cancel':
      buttonClass = styles['sybutton-cancel']
      break
    case 'query':
      buttonClass = styles['sybutton-query']
      break
    case 'del':
      buttonClass = styles['sybutton-del']
      break
    case 'confirm':
      buttonClass = styles['sybutton-confirm']
      break
    case 'modal_ok':
      buttonClass = styles['sybutton-ok-modal']
      break
    case 'modal_cancel':
      buttonClass = styles['sybutton-cancel-modal']
      break
  }
  return (
    <Button className={className(buttonClass)} {...props} >{children}</Button>
  )
}

export const SySelect = SelectComponent
export const SyTable = TableComponent
