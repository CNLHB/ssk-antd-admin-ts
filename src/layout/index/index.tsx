import React from "react";
import { Layout } from "antd";
import ContentArea from "layout/content/index";
import Setting from "layout/setting/index";
import SiderWrap from "layout/sider/index";
import FooterWrap from "layout/footer/index";
import HeaderWrap from "layout/header/index";
import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
import { AdminInterface } from "models/user/user";

import "./index.less";
interface LayoutProps {
    themeStore?: ThemeInterface;
    adminStore?: AdminInterface //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
interface LayoutState {
    visible: boolean;
    marginLeft?: number //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

/*
 * @description: 
 * @test: test font
 * @param {type} 
 * @return: 
 */
@inject("themeStore", "adminStore")
@observer
export default class LayoutApp extends React.Component<LayoutProps, LayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false
        };

    }
    componentDidMount() {
        let { auth } = this.props.adminStore!
        auth()
    }
    showDrawer = (): void => {
        const { setCollapsed } = this.props.themeStore!
        setCollapsed(true)
        this.setState({
            visible: true
        });
    };

    onClose = (): void => {
        this.setState({
            visible: false,
        });
    };

    toggleCollapsed = (collapsed: boolean): void => {
        const { setLayoutLeft, setCollapsed, affixMenu, isMd, affixHeader } = this.props.themeStore!

        if (collapsed && affixMenu) {
            console.log(collapsed, 1);
            setLayoutLeft(82)
        }

        if (!collapsed && affixMenu) {
            console.log(collapsed, 2);
            setLayoutLeft(258)
        }
        if (collapsed && affixHeader && !isMd) {
            console.log(collapsed, 3);

            setLayoutLeft(82)
        }
        if (!collapsed && affixHeader && !isMd) {
            console.log(collapsed, 4);
            setLayoutLeft(258)
        }
        setCollapsed(collapsed)

    };
    render() {
        const { visible } = this.state
        const { collapsed, getLayoutLeft, isMd } = this.props.themeStore!
        return (
            <Layout className="wrapper">
                <Setting></Setting>
                <SiderWrap
                    visible={visible}
                    onClose={this.onClose}
                    collapsed={collapsed}
                    toggleCollapsed={this.toggleCollapsed}
                >

                </SiderWrap>

                <Layout className="site-layout" style={{ ...getLayoutLeft }}>
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
