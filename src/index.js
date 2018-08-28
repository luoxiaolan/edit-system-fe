/**
 * @file 入口
 * @description 主入口模块
 */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './page/app';
import './index.less';

render(
    <App/>,
    document.getElementById('app')
);
