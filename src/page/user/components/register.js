/**
 * @file 首页
 */
import React from 'react';
import request from '../../../common/js/request';
import {Form, Input, Icon, Button} from 'antd';

const FormItem = Form.Item;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }

    submit = () => {
        const {validateFields, getFieldsValue} = this.props.form;

        validateFields((err, values) => {
            if (!err) {
                let data = getFieldsValue();

                request('/api/register', {
                    method: 'post',
                    body: data
                }).then(res => {
                    location.href = '/';
                });
            }
        });
    }


    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;

        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入用户名'}]
                    })(
                        <Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='请输入用户名'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入邮箱'}]
                    })(
                        <Input prefix={<Icon type='mail' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='请输入邮箱'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    }, {
                        validator: this.validateToNextPassword
                    })(
                        <Input type='password'
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='请输入密码'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirm', {
                        rules: [{required: true, message: '请再次输入密码'}]
                    }, {
                        validator: this.compareToFirstPassword
                    })(
                        <Input type='password'
                            onBlur={this.handleConfirmBlur}
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder='请再次输入密码'/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' style={{width: '100%'}} onClick={this.submit}>注册</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrapperRegisterForm = Form.create()(RegisterForm);

export default class Register extends React.Component {
    render() {
        return (
            <WrapperRegisterForm/>
        );
    }
}
