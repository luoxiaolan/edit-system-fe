/**
 * @file 顶部导航
 */

import React from 'react';
import {withRouter} from 'react-router';
import './header.less';
import helpImgSd from './img/help.png';
import helpImgHd from './img/help@2x.png';
import userImgSd from './img/user-header-default.png';
import userImgHd from './img/user@2x.png';
import clientImgSd from './img/client.png';
import clientImgHd from './img/client@2x.png';

// 适配mac高清图片
const helpImg = window.devicePixelRatio >= 2 ? helpImgHd : helpImgSd;
const userImg = window.devicePixelRatio >= 2 ? userImgHd : userImgSd;
// 农业银行logo
const clientImg = window.devicePixelRatio >= 2 ? clientImgHd : clientImgSd;

export default class Header extends React.Component {
    logout = () => {
        if (this.props.userInfo && this.props.userInfo.loginout) {
            // window.location.href = this.props.userInfo.loginout;
            // 跨域刷新
            const img = new Image();
            img.onload = function () {
                window.location.href = '/fdi-fe';

            };
            img.onerror = function () {
                window.location.href = '/fdi-fe';
            };
            img.src = this.props.userInfo.loginout;
        }
    }

    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <img className="icon-client" src={clientImg} />
                    <span>后台编辑系统</span>
                </div>
                <div id="header-menu" className="header-menu">
                    {
                        this.props.userInfo && this.props.userInfo.user
                        && (
                            <div className="menu-item menu-username">
                                <img className="user-header" src={userImg} />
                                <span>{this.props.userInfo.user.name}</span>
                            </div>
                        )
                    }
                    {
                        this.props.userInfo && this.props.userInfo.user
                        && <div className="menu-item menu-login" onClick={this.logout}>退出</div>
                    }
                </div>
            </div>
        );
    }
}
