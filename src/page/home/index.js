/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import {Icon, Select, Button, Modal, Form} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';
import Login from './components/login';

const Option = Select.Option;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    showConfirm = () => {
        Modal.confirm({
            title: '你确定要创建一个临时帐号吗？',
            content: '如果你创建一个临时帐号，所有数据都不存储到数据库，关闭窗口后数据会丢失，可以选择立即下载编辑后的数据。',
            onOk() {
                // todo
            }
        });
    }

    handleSubmit = () => {

    }

    render() {
        let id = this.props.match.params.id ? this.props.match.params.id : '';

        return (
            <div className='home-wrapper'>
                <div className='form-wrapper'>
                    <h4>用户登录</h4>
                    <Login/>
                    <div className='other-options'>
                        <a href='javascript:void(0)'>忘记密码</a>
                        Or <a href='javascript:void(0)'>立即注册</a>
                        Or <a href='javascript:void(0)' onClick={this.showConfirm}>游客登录</a>
                    </div>
                </div>
            </div>
        );
    }
}
