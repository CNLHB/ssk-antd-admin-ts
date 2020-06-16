import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React, { Component, Fragment } from 'react';

class BindingView extends Component {
    getData = () => [
        {
            title: "title",
            description: "描述",
            actions: [
                <a key="Bind">
                    <span>bing</span>
                </a>,
            ],
            avatar: <TaobaoOutlined className="taobao" />,
        },
        {
            title: "title1",
            description: "描述1",
            actions: [
                <a key="Bind">
                    <span>bing</span>
                </a>,
            ],
            avatar: <AlipayOutlined className="alipay" />,
        },
        {
            title: "title2",
            description: "描述2",
            actions: [
                <a key="Bind">
                    <span>2</span>
                </a>,
            ],
            avatar: <DingdingOutlined className="dingding" />,
        },
    ];

    render() {
        return (
            <Fragment>
                <List
                    itemLayout="horizontal"
                    dataSource={this.getData()}
                    renderItem={(item) => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta
                                avatar={item.avatar}
                                title={item.title}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}

export default BindingView;
