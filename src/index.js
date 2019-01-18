/**
 * @file 入口
 * @description 主入口模块
 */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider, withBus} from 'react-bus';
import App from './page/app';
import './index.less';

const ConnectedComponent = withBus()(App);

render(
    <Provider>
        <ConnectedComponent/>
    </Provider>,
    document.getElementById('app')
);
