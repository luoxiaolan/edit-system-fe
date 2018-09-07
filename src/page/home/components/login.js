/**
 * @file 首页
 */
import React from 'react';
import request from '../../../common/js/request';
import {Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(
                        <Input
                            prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='username'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type='password'
                            placeholder='password'/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' style={{width: '100%'}}>登录</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrapperLoginForm = Form.create()(LoginForm);

export default class Login extends React.Component {
    render() {
        return (
            <WrapperLoginForm/>
        );
    }
}
