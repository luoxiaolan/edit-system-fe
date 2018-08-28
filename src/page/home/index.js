/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import './index.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const data = await request('/ajax/home', {
            method: 'get'
        });
    }

    render() {
        return (
            <div>
                home
            </div>
        );
    }
}
