import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
interface LayoutProps {
    collapsed: boolean;
    isMd: boolean,
    toggleCollapsed(collapsed；):void
    showDrawer():void
}

export default class HeaderWrap extends React.Component<LayoutProps, {}> {
    render() {
        const { collapsed, isMd, toggleCollapsed, showDrawer} = this.props
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
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
            </Header>

        );
    }
}
