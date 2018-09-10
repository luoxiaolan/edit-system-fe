/**
 * @file 首页
 */
import React from 'react';
import request from '../../../common/js/request';
import {Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor (props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('1');
            }
        });
    }

    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入邮箱'}]
                    })(
                        <Input
                            prefix={<Icon type='mail' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='email'/>
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
        );
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
