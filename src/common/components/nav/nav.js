/**
 * @file 左侧导航
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import request from '../../js/request';
import './nav.less';
import Tree from '../tree/tree';

const Sider = Layout.Sider;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        };
    }

    fetch = async () => {
        const data = await request('/api/userInfo', {
            method: 'get'
        });

        this.setState({
            userInfo: data.data.content
        });
    }

    componentDidMount() {
        this.fetch();
    }


    render() {
        return (
            <Sider className="side-nav" width="280px">
                <header>
                    <Icon type="user" theme="outlined" />
                    <span>你好，{this.state.userInfo.name}</span>
                </header>
                <div className='treeWrapper'>
                    <h5><Link to='/'>页面树结构</Link></h5>
                    <Tree/>
                </div>
            </Sider>
        );
    }
}
