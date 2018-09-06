/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import {Icon, Select, Button} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';

const Option = Select.Option;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id ? this.props.match.params.id : '';
        this.fetchData(id);
    }

    async fetchData(id) {
        const data = await request('/ajax/pageData', {
            method: 'post',
            body: {
                id
            }
        });

        this.setState({
            data: data.data.content
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.fetchData(nextProps.match.params.id);
        }
    }

    render() {
        let id = this.props.match.params.id ? this.props.match.params.id : '';

        return (
            <div className='home-wrapper'>
                <header>
                    <Button type="primary">
                        <Link to={`/edit/${id}`}>
                            <Icon type="edit" theme="outlined" />编辑
                        </Link>
                    </Button>
                    <Button type="primary"><Icon type="plus" theme="outlined" />新建页面</Button>
                    <Button type="primary"><Icon type="arrow-down" theme="outlined" />下载页面</Button>
                </header>
                <div className='content'>
                    {this.state.data}
                </div>
            </div>
        );
    }
}
