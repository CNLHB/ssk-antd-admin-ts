import React from "react";
import { Layout } from "antd";
import { observer, inject } from 'mobx-react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import { ThemeInterface } from "models/theme/index";
import DropdownList from 'components/header/dropdown-list'
import './index.less'
const { Header } = Layout;

interface LayoutProps {
    collapsed: boolean;
    isMd: boolean,
    toggleCollapsed(collapsed: boolean): void
    showDrawer(): void
    themeStore?: ThemeInterface;
}
@inject("themeStore")
@observer
export default class HeaderWrap extends React.Component<LayoutProps, {}> {
    render() {
        const { collapsed, isMd, toggleCollapsed, showDrawer } = this.props
        const { getFixedHeader } = this.props.themeStore!
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
                <DropdownList></DropdownList>

            </Header>

        );
    }
}
