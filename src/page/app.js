/**
 * @file 程序主入口
 * @author luoxiaolan@badu.com
 */

import React from 'react';
import {Route, Link, HashRouter} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {hot} from 'react-hot-loader';

import home from './home';

const SubMenu = Menu.SubMenu;
const {Header, Content, Sider} = Layout;

class App extends React.Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <Layout>
                        <Header className="header"/>
                        <Layout  style={{minHeight: '100vh'}}>
                            <Sider
                                collapsible
                                collapsed={this.state.collapsed}
                                onCollapse={this.onCollapse}>
                                <Menu theme="dark"
                                    defaultOpenKeys={['sub0', 'sub1']}
                                    mode="inline"
                                >
                                    <SubMenu key="sub0" title={<span>主栏目一</span>}>
                                        <Menu.Item key="1"><Link to="/">栏目一</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to="/page1">栏目二</Link></Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub1" title={<span>主栏目一</span>}>
                                        <Menu.Item key="3"><Link to="/">栏目一</Link></Menu.Item>
                                        <Menu.Item key="4"><Link to="/">栏目二</Link></Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content>
                                <div className="right-box">
                                    <Route exact path="/" component={home}/>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </HashRouter>
        );
    }
}

export default hot(module)(App);
