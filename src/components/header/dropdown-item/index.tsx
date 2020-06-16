import React from "react";
import { Menu } from "antd";
import { Link } from 'react-router-dom'

import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import './index.less'


export default class DropdownList extends React.Component<{ logout(): void }, {}> {
    render() {
        return (
            <div id="user-item">
                <Menu>
                    <Menu.Item>
                        <UserOutlined /> <Link to="/admin/account/center">个人中心</Link>
                    </Menu.Item>
                    <Menu.Item >
                        <SettingOutlined /><Link to="/admin/account/settings">个人设置</Link>
                    </Menu.Item >
                    <Menu.Item onClick={() => { this.props.logout() }}>
                        <LogoutOutlined />退出登录
                </Menu.Item>
                </Menu>
            </div>
        );
    }
}