/*
 * @Author: 姜跃龙
 * @Date: 2020-03-20 16:11:20
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2020-03-20 16:11:21
 * @Description: file content
 */

// 获取某个元素的某属性的方法
export const getStyle = (element, attr) => {
  if (element.currentStyle) {
    return element.currentStyle[attr]
  }
  return document.defaultView.getComputedStyle(element, null)[attr]
}
// 获取元素到顶部距离
export const getPositionTop = element => {
  let top = 0
  let parent = element.offsetParent
  top += element.offsetTop
  while (parent && !/html|body/i.test(parent.tagName)) {
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return top
}
// 获取指定元素的指定父代元素（根据类名）
export const getParentElement = (element, parentElementName) => {
  let parent = element.parentElement
  while (parent && !RegExp(parentElementName, 'i').test(parent.className) && !/html|body/i.test(parent.tagName)) {
    parent = parent.parentElement
  }
  if (RegExp(parentElementName, 'i').test(parent.className)) {
    return parent
  }
  return null
}
