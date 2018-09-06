/**
 * @file 左侧导航
 * @author v_yangpei
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';
import './nav.less';
import Tree from '../tree/tree';

const Sider = Layout.Sider;

export default class Nav extends React.Component {
    render() {
        return (
            <Sider className="side-nav">
                <header>
                    <Icon type="user" theme="outlined" />
                    <span>银行家项目</span>
                </header>
                <div className='treeWrapper'>
                    <h5><Link to='/'>页面树结构</Link></h5>
                    <Tree/>
                </div>
            </Sider>
        );
    }
}
