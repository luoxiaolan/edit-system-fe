/**
 * @file 首页
 */
import React from 'react';
import EventBus from 'eventing-bus';
import request from '../../common/js/request';
import ReactQuill from 'react-quill';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './index.less';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    async componentDidMount() {
        let id = this.props.match.params.id ? this.props.match.params.id : '';
        const data = await request('/ajax/pageData', {
            method: 'post',
            body: {
                id
            }
        });

        this.setState({
            text: data.data.content
        });
    }

    handleChange = value => {
        this.setState({
            text: value
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

    render() {
        return (
            <div className='edit-wrapper'>
                <ReactQuill
                className='editor'
                onChange={this.handleChange}
                modules= {this.modules}
                value={this.state.text}
                >

                </ReactQuill>
                <div className='footer'>
                    <Button>预览</Button>
                    <Button type="primary">保存</Button>
                    <Link to='/'>取消</Link>
                </div>
            </div>
        );
    }
}
