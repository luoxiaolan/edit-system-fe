/**
 * @file 列表页
 */
import React from 'react';
import request from '../../js/request';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import './tree.less'

export default class FolderTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            type: {}
        };
    }

    async componentDidMount() {
        const data = await request('/ajax/folderTree', {
            method: 'post',
            body: {
                userid: 1
            }
        });

        this.setState({
            list: data.data.content
        });
    }

    toggleTree = id => {
        let type = this.state.type;
        (!type[id] || type[id] === 'right') ? type[id] = 'down' : type[id] = 'right';
        this.setState({
            type
        });
    }

    renderList = list => {
        return (
            <ul>
                {list && list.map((item, index) => (
                    <li key={item.id}>
                        {item.list
                            ? <Icon
                                type={this.state.type[item.id] ? this.state.type[item.id] : 'right'}
                                theme="outlined"
                                onClick={() => this.toggleTree.call(this, item.id)}/>
                            : <i className='dot'><span/></i>}
                        <Link to={`/${item.id}`}>{item.title}</Link>
                        {item.list && this.state.type[item.id] === 'down' && this.renderList(item.list)}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className='tree-wrapper'>
                {this.renderList(this.state.list)}
            </div>
        )
    }
}
