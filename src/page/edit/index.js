/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import ReactQuill from 'react-quill';
import {Button, Input} from 'antd';
import {Link} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './index.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            title: ''
        };
    }

    id = this.props.match.params.id;

    async componentDidMount() {
        const data = await request('/api/getArticle', {
            method: 'get',
            body: {
                id: this.id
            }
        });

        const content = data.data.content;

        this.setState({
            title: content.title,
            detail: content.detail
        });
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ]
    }

    handleChange = value => {
        this.setState({
            detail: value
        });
    }

    submit = () => {
        request('/api/editArticle', {
            method: 'post',
            body: {
                detail: this.state.detail,
                title: this.state.title,
                id: this.id
            }
        }).then(() => {
            location.href = `/#/viewpage/${this.id}`;
        });
    }

    render() {
        return (
            <div className='edit-wrapper'>
                <Input value={this.state.title} size="large" className="title"
                    onChange={
                        e => {
                            this.setState({
                                title: e.target.value
                            });
                        }
                    }></Input>
                <ReactQuill
                    className='editor'
                    onChange={this.handleChange}
                    modules= {this.modules}
                    value={this.state.detail}
                    >
                </ReactQuill>
                <div className='footer'>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                    <Link to='/'>取消</Link>
                </div>
            </div>
        );
    }
}
