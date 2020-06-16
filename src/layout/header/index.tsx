import React from "react";
import { Layout } from "antd";
import { observer, inject } from 'mobx-react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import { ThemeInterface } from "stores/models/theme/index";
import { AdminInterface } from "stores/models/user/user";
import DropdownList from 'components/header/dropdown-list'
import './index.less'
const { Header } = Layout;

interface LayoutProps {
    collapsed: boolean;
    isMd: boolean,
    toggleCollapsed(collapsed: boolean): void
    showDrawer(): void
    themeStore?: ThemeInterface;
    adminStore?: AdminInterface;
}
@inject("themeStore", "adminStore")
@observer
export default class HeaderWrap extends React.Component<LayoutProps, {}> {
    render() {
        const { collapsed, isMd, toggleCollapsed, showDrawer } = this.props
        const { getFixedHeader } = this.props.themeStore!
        const { admin, logout } = this.props.adminStore!

        return (
            <Header className="site-layout-background headerflex" style={{ padding: 0, ...getFixedHeader }}>
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: "trigger",
                        onClick: () => {
                            if (isMd) {
                                showDrawer()
                            } else {

                                toggleCollapsed(!collapsed)
                            }
                        },
                    }
                )}
                <DropdownList userInfo={admin} logout={() => { logout() }}></DropdownList>

            </Header>

        );
    }
}
