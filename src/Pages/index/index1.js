/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
/*import { toJS } from 'mobx'*/
import {  Form, Row, Col, Input, Button, TreeSelect } from 'antd'
import SySelect from '../../Components/SYSelect/index'
import Store from './store'
const { TreeNode } = TreeSelect;
const FormItem = Form.Item
@inject('globalStore')
@observer
class index extends Component {
    state = {
        value: undefined,
    };
    formRef = React.createRef();
    onChange = value => {
        console.log(value);
        this.setState({ value });
    };
    componentDidMount() {
        this.formRef.current.setFieldsValue({
            username: 'Bamboo',
            initSelect: '01'
        });
    }
    onClick=(param)=>{
        alert(this.formRef.current.getFieldValue('initSelect'))
        console.log('............',param)
    }
    render() {
        // const [form] = Form.useForm();
console.log('index,,,,,,,,,,,,,,,,',Store.selectList)
        return (
            <div>
                <Form ref={this.formRef}>
                <Row>
                    <Col span={8}>
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={this.onChange}
                        >
                            <TreeNode value="parent 1" title="parent 12">
                                <TreeNode value="parent 1-0" title="parent 1-0">
                                    <TreeNode value="leaf1" title="my leaf" />
                                    <TreeNode value="leaf2" title="your leaf" />
                                </TreeNode>
                                <TreeNode value="parent 1-1" title="parent 1-1">
                                    <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                                </TreeNode>
                            </TreeNode>
                        </TreeSelect>
                    </Col>
                    <Col span={8} >
                        <FormItem name="username" label='存单编号' rules={[
                            {pattern: new RegExp(/^([0-9]{0,100})$/, 'g'),
                                message: '存单编号应该为数字'},
                        ]}>
                            <Input style={{width: '115%'}}/>

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem name="initSelect" label='选择下拉'>
                        <SySelect
                          name="initSelect"
                            dataSource={Store.selectList}
                            nameKey='mc'
                            valueKey='bm'
                        />
                        </FormItem>
                    </Col>
                </Row>
                    <Row>
                        <Col>
                           <Button onClick={()=>{this.onClick(this)}}>
                               1234
                           </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

        );
    }
}

export default index
