/**
 * @file 列表页
 */
import React from 'react';
import request from '../../js/request';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import {withBus} from 'react-bus';
import './tree.less'

export default withBus()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                list: null,
                type: {},
                id: ''
            };
        }


        fetch = async () => {
            const data = await request('/api/folderTree', {
                method: 'get'
            });

            this.setState({
                list: data.data.content,
                id: location.hash.split('/').pop()
            });
        }

        componentDidMount() {
            this.props.bus.on('resetNav', this.fetch);
            this.fetch();
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
                            <Link to={`/viewpage/${item.id}`}
                                className={this.state.id == item.id ? 'selected' : ''}
                                onClick={() => {
                                    this.setState({
                                        id: item.id
                                    });
                                }}>
                                {item.title}
                            </Link>
                            {item.list && this.state.type[item.id] === 'down' && this.renderList(item.list)}
                        </li>
                    ))}
                </ul>
            );
        }

        render() {
            return (
                <div className='tree-wrapper'>
                    <h5><Link to='/' className={this.state.id == '' ? 'selected' : ''}
                        onClick={() => {
                            this.setState({
                                id: ''
                            });
                        }}>页面树结构</Link></h5>
                    {this.renderList(this.state.list)}
                </div>
            );
        }
    }
);
