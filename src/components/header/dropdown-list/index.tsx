import React from "react";
import { Badge, Avatar, Dropdown } from "antd";
import DraopdownItem from '../dropdown-item/index'
import './index.less'
import {
    GlobalOutlined,
    MessageOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";

interface HeaderProps {
    userInfo: any,
    logout(): void
}

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);



export default class DropdownItem extends React.Component<{ userInfo: any, logout(): void }, {}> {
    render() {
        const { userInfo } = this.props
        return (
            <div className="headerRight">
                <div className="header-hover" ><QuestionCircleOutlined /></div>
                <Dropdown className="header-hover badge" overlay={content} placement="bottomRight" trigger={['click']}>
                    <Badge offset={[-11, 0]} count={1}>
                        <span> <MessageOutlined /></span>
                    </Badge>
                </Dropdown>
                <Dropdown className="header-hover"
                    overlay={<DraopdownItem logout={this.props.logout} />}
                    overlayStyle={{ minWidth: 160 }}
                    placement="bottomRight">
                    <div>
                        <Avatar size={24} src={userInfo.authorUrl} />
                        <span className="text-center">{userInfo.userName}</span>
                    </div>
                </Dropdown>
                <Dropdown className="header-hover" overlay={<></>} placement="bottomRight">
                    <div>
                        <GlobalOutlined />
                    </div>
                </Dropdown>

            </div>

        );
    }
}
