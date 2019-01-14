/**
 * @file 首页
 * @author luoxiaolan@baidu.com
 */
import React from 'react';
import {Icon, Select, Button} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

export default () => {
    return (
        <div className="home-wrapper">
            <Button type="primary" className="add-page">
                <Link to={'/edit/parendId=null'}>
                    <Icon type="plus" theme="outlined" />新建页面
                </Link>
            </Button>
            <article>
                <h5>欢迎来到后台编辑系统</h5>
                <section>
                    这是您的个人首页，您可以选择点击右上角新建文章.
                </section>
            </article>
        </div>
    );
}
