import React, { Component } from 'react';

import { List, message } from 'antd';
type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
    strong: (
        <span className="strong">
            强
        </span>
    ),
    medium: (
        <span className="medium">
            中
        </span>
    ),
    weak: (
        <span className="weak">
            弱
        </span>
    ),
};
interface SecurityViewProps {
    admin?: any //  这里比较关键 ？表示可或缺，如果没有就会报错。
}


class SecurityView extends Component<SecurityViewProps> {
    getData = (number: any) => [
        {
            title: "账户密码",
            description: (
                <>
                    {"当前密码强度"}：
                    {passwordStrength.strong}
                </>
            ),
            actions: [
                <a key="Modify" href="#" onClick={() => {
                    message.info('敬请期待');
                }}>
                    修改
        </a>,
            ],
        },
        {
            title: "密保手机",
            description: `已绑定手机：${number}`,
            actions: [
                <a key="Modify" href="#" onClick={() => {
                    message.info('敬请期待');
                }}>
                    修改
        </a>,
            ],
        },
    ];

    render() {
        const { admin } = this.props;

        const data = this.getData(admin.phoneNumber);

        return (
            <>
                <List<Unpacked<typeof data>>
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta title={item.title} description={item.description} />
                        </List.Item>
                    )}
                />
            </>
        );
    }
}

export default SecurityView;
