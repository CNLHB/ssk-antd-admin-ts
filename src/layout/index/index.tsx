import React from "react";
import { Layout } from "antd";
import ContentArea from "layout/content/index";
import Setting from "layout/setting/index";
import SiderWrap from "layout/sider/index";
import FooterWrap from "layout/footer/index";
import HeaderWrap from "layout/header/index";
import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
import "./index.less";
interface LayoutProps {
    themeStore?: ThemeInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
interface LayoutState {
    collapsed: boolean;
    isMd: boolean;
    visible: boolean;
    marginLeft?: number //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

/*
 * @description: 
 * @test: test font
 * @param {type} 
 * @return: 
 */
@inject("themeStore")
@observer
export default class LayoutApp extends React.Component<LayoutProps, LayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false,
            isMd: false,
            visible: false
        };
    }
    showDrawer = (): void => {
        this.setState({
            visible: true,
            collapsed: true
        });
    };

    onClose = (): void => {
        this.setState({
            visible: false,
        });
    };

    toggleCollapsed = (collapsed: boolean): void => {
        const { setLayoutLeft, affixMenu, affixHeader } = this.props.themeStore!
        const { isMd } = this.state
        if (collapsed && affixMenu) {
            console.log(collapsed, 1);
            setLayoutLeft(80)
        }

        if (!collapsed && affixMenu) {
            console.log(collapsed, 2);
            setLayoutLeft(256)
        }
        if (collapsed && affixHeader && !isMd) {
            console.log(collapsed, 3);

            setLayoutLeft(80)
        }
        if (!collapsed && affixHeader && !isMd) {
            console.log(collapsed, 3);
            setLayoutLeft(256)
        }
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
        const { getLayoutLeft } = this.props.themeStore!
        return (
            <Layout className="wrapper">
                <Setting></Setting>
                <SiderWrap
                    visible={visible}
                    onClose={this.onClose}
                    collapsed={collapsed}
                    toggleCollapsed={this.toggleCollapsed}
                    toggleMd={this.toggleMd}>
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
