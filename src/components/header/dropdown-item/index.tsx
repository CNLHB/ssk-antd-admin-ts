import React from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import './index.less'


export default class DropdownList extends React.Component<{}, {}> {
    render() {
        return (
            <div id="user-item">
                <Menu>
                    <Menu.Item>
                        <UserOutlined />个人中心
                </Menu.Item>
                    <Menu.Item >
                        <SettingOutlined />个人设置
                </Menu.Item >
                    <Menu.Item >
                        <LogoutOutlined />退出登录
                </Menu.Item>
                </Menu>
            </div>
        );
    }
}