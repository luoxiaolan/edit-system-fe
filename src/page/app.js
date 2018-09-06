/**
 * @file 程序主入口
 * @author luoxiaolan@badu.com
 */

import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import {hot} from 'react-hot-loader';
import Header from '../common/components/header/header';
import Nav from '../common/components/nav/nav';

import HomePage from './home';
import EditPage from './edit';

const Content = Layout.Content;

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Layout className='layout'>
                    <Header className="header">后台编辑系统</Header>
                    <Layout className='content'>
                        <Nav/>
                        <Content>
                            <Switch>
                                <Route exact path="/" component={HomePage}/>
                                <Route exact path="/:id" component={HomePage}/>
                                <Route path='/edit/:id' component={EditPage}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </HashRouter>
        );
    }
}

export default hot(module)(App);
