import React from "react";
import { Layout } from "antd";
import NavMenu from "components/menu/index";
import navLogo from "assets/images/logo-ant.svg";
import "./index.less";
import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
const { Sider } = Layout;

interface SiderProps {
    themeStore?: ThemeInterface;//  这里比较关键 ？表示可或缺，如果没有就会报错。
    collapsed?: boolean;
    toggleCollapsed: Function;
    toggleMd: Function
}
interface SiderState {
    marginLeft: number
    collapsedWidth: number
}
@inject("themeStore")
@observer
export default class SiderWrap extends React.Component<SiderProps, SiderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            marginLeft: 200,
            collapsedWidth: 80
        };
    }


    render() {
        const { collapsed = false, toggleCollapsed, toggleMd } = this.props
        const { theme } = this.props.themeStore!;
        return (
            <Sider
                trigger={null}
                breakpoint="sm"
                collapsedWidth={this.state.collapsedWidth}
                collapsible
                collapsed={collapsed}
                onBreakpoint={(broken) => {
                    if (broken) {
                        this.setState({
                            collapsedWidth: 0
                        }, () => {
                            toggleCollapsed(broken);
                            toggleMd(broken)
                        })
                    } else {
                        this.setState({
                            collapsedWidth: 80
                        }, () => {
                            toggleCollapsed(broken);
                            toggleMd(broken)
                        })
                    }

                    console.log(broken);
                }}
                theme={theme}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);

                    // this.toggle();
                }}
                width={256}
            //   style={{
            //     overflow: "auto",
            //     height: "100vh",
            //     position: "fixed",
            //     left: 0,
            //   }}
            >
                <div className="sider-logo">
                    <img
                        src={navLogo}
                        alt="nav-log"
                        className="mock-block"
                        style={{ height: "100%" }}
                    />
                    <h1 className="logo-h">ssk admin</h1>
                </div>
                <NavMenu></NavMenu>
            </Sider>

        );
    }
}
