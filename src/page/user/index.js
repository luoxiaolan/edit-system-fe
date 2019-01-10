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
import Register from './components/register';

const Option = Select.Option;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
    }

    componentDidMount() {

    }

    register = () => {
        this.setState({
            isLogin: false
        });
    }

    render() {
        let id = this.props.match.params.id ? this.props.match.params.id : '';

        return (
            <div className='home-wrapper'>
                {this.state.isLogin
                    ? <div className='form-wrapper'>
                        <h4>用户登录</h4>
                        <Login/>
                        <div className='other-options'>
                            <a href='javascript:void(0)'>忘记密码</a>
                            Or <a href='javascript:void(0)' onClick={this.register}>立即注册</a>
                        </div>
                    </div>
                    : <div className='form-wrapper'>
                        <h4>用户注册</h4>
                        <Register/>
                    </div>
                }

            </div>
        );
    }
}
