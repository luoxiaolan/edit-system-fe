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


    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };

        return (
            <Form>
                <FormItem
                {...formItemLayout}
                label='用户邮箱'>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入邮箱'}]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label='密码'>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    }, {
                        validator: this.validateToNextPassword
                    })(
                        <Input type='password'/>
                    )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label='确认密码'>
                    {getFieldDecorator('confirm', {
                        rules: [{required: true, message: '请再次输入密码'}]
                    }, {
                        validator: this.compareToFirstPassword
                    })(
                        <Input type='password' onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' style={{width: '100%'}}>注册</Button>
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
