/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import {Button, Input, Modal} from 'antd';
import {Link} from 'react-router-dom';
import {withBus} from 'react-bus';
import 'react-quill/dist/quill.snow.css';
import './index.less';

Quill.register('modules/imageResize', ImageResize);

export default withBus()(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            title: ''
        };
    }

    id = this.props.match.params.id;
    arrId = this.id.split('=');

    async componentDidMount() {
        if (this.arrId[0] === 'id') {
            const data = await request('/api/getArticle', {
                method: 'get',
                body: {
                    id: this.arrId[1]
                }
            });

            const content = data.data.content;

            this.setState({
                title: content.title,
                detail: content.detail
            });
        }
    }

    modules = {
        imageResize: {},
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
        const type = this.arrId[0];

        if (!this.state.title) {
            Modal.info({
                title: '请输入文章名称'
            });
            return;
        }

        const successCallback = (ret, callback) => {
            if (ret) {
                return;
            }
            this.props.bus.emit('resetNav');
            callback();
        };

        if (type === 'id') {
            request('/api/editArticle', {
                method: 'post',
                body: {
                    detail: this.state.detail,
                    title: this.state.title,
                    id: this.arrId[1]
                }
            }).then(res => {
                successCallback(res.data.ret, () => {
                    location.href = `/#/viewpage/${this.arrId[1]}`;
                });
            });
        } else {
            request('/api/createArticle', {
                method: 'post',
                body: {
                    parentId: this.arrId[1],
                    detail: this.state.detail,
                    title: this.state.title
                }
            }).then(res => {
                successCallback(res.data.ret, () => {
                    location.href = `/#/viewpage/${res.data.content.id}`;
                });
            });
        }
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
                    <Button onClick={
                            () => {
                                history.back();
                            }
                        }>取消</Button>
                </div>
            </div>
        );
    }
});
