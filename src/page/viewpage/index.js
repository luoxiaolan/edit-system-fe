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
        const data = await request('/api/getArticle', {
            method: 'get',
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
            <div className='viewPage-wrapper'>
                <header>
                    <Button type="primary">
                        <Link to={`/edit/id=${id}`}>
                            <Icon type="edit" theme="outlined" />编辑
                        </Link>
                    </Button>
                    <Button type="primary">
                        <Link to={`/edit/parentId=${id}`}>
                            <Icon type="plus" theme="outlined" />新增文章
                        </Link>
                    </Button>
                </header>
                <div className='content'>
                    <h5>{this.state.data.title}</h5>
                    <article>{this.state.data.detail}</article>
                </div>
            </div>
        );
    }
}
