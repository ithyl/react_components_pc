import React, { Component } from 'react'
import App from '../../App'
import styles from './BasicLayout.less'
import {  Layout, ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
export default class BasicLayout extends Component {
    state={
      visible: false
    }
    openRouter=(menu) => {
      let checkItem = menu.item.props['data-info']

      if (checkItem) {
        // message.info(JSON.stringify(checkItem))
        this.props.history.jump({
          path: checkItem.path
        })
      }
    }
    closeRouters = () => {
      this.setState({
        visible: !this.state.visible,
      })
    };
    render() {
      const {  Content  } = Layout
      console.log('-------process.env.ENV_TYPE--------', process.env.ENV_TYPE)
      return (
        <div className={styles.myLayout}>
          <Layout className={styles.main}>
            <Layout>
              <Content className={styles.mainContent}>
                <div className={styles.content}>
                  <ConfigProvider locale={zhCN}>
                    <App {...this.props} />
                  </ConfigProvider>
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      )
    }
}
