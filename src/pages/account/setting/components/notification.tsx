import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';


type Unpacked<T> = T extends (infer U)[] ? U : T;

class NotificationView extends Component {
    getData = () => {
        const Action = (
            <Switch
                checkedChildren={"打开"}
                unCheckedChildren={"关闭"}
                defaultChecked
            />
        );
        return [
            {
                title: "密码",
                description: "描述",
                actions: [Action],
            },
            {
                title: "xxx",
                description: "11",
                actions: [Action],
            },
            {
                title: "xxx",
                description: "xxx",
                actions: [Action],
            },
        ];
    };

    render() {
        const data = this.getData();
        return (
            <Fragment>
                <List<Unpacked<typeof data>>
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta title={item.title} description={item.description} />
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}

export default NotificationView;
