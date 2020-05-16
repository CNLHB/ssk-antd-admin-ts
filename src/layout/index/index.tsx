import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ContentArea from "layout/content/index";
import Setting from "layout/setting/index";
import DrawerSider from "layout/drawer-sider/index";
import SiderWrap from "layout/sider/index";
import FooterWrap from "layout/footer/index";
import HeaderWrap from "layout/header/index";

import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
import "./index.less";
const { Header } = Layout;
interface LayoutProps {
    themeStore?: ThemeInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
interface LayoutState {
    collapsed: boolean;
    isMd: boolean;
    visible: boolean;
    marginLeft?: number //  这里比较关键 ？表示可或缺，如果没有就会报错。
}


@inject("themeStore")
@observer
export default class LayoutApp extends React.Component<LayoutProps, LayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            isMd: false,
            marginLeft: 200,
            visible: false
        };
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    toggleCollapsed = (collapsed: boolean): void => {
        this.setState({
            collapsed: collapsed,
        });
    };
    toggleMd = (isMd: boolean): void => {
        this.setState({
            isMd: isMd,
        });
    };
    render() {
        const { collapsed, isMd, visible } = this.state
        return (
            <Layout className="wrapper">
                <Setting></Setting>
                {isMd ?
                    <DrawerSider
                        visible={visible}
                        onClose={this.onClose}></DrawerSider> :
                    <SiderWrap
                        collapsed={collapsed}
                        toggleCollapsed={this.toggleCollapsed}
                        toggleMd={this.toggleMd}></SiderWrap>}
                <Layout className="site-layout">
                    <HeaderWrap
                        collapsed={collapsed}
                        isMd={isMd}
                        toggleCollapsed={this.toggleCollapsed}
                        showDrawer={this.showDrawer}>
                    </HeaderWrap>
                    <ContentArea></ContentArea>
                    <FooterWrap></FooterWrap>
                </Layout>
            </Layout>
        );
    }
}                         
