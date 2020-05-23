import React from "react";
import { Layout } from "antd";
import NavMenu from "components/menu/index";
import navLogo from "assets/images/logo-ant.svg";
import DrawerSider from "layout/drawer-sider/index";
import "./index.less";
import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
import { BreadInterface } from 'models/breadcrumb/index'
const { Sider } = Layout;




interface SiderProps {
    themeStore?: ThemeInterface;
    breadStore?: BreadInterface//  这里比较关键 ？表示可或缺，如果没有就会报错。
    collapsed?: boolean;
    visible: boolean;
    toggleCollapsed: Function;
    onClose(): void
}
interface SiderState {
    collapsedWidth: number,
    marginRight: number
}

@inject("breadStore")
@inject("themeStore")
@observer
export default class SiderWrap extends React.Component<SiderProps, SiderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsedWidth: 80,
            marginRight: 2
        };
    }
    togglePointHandler = (broken: boolean) => {
        const { toggleCollapsed, onClose } = this.props
        const { setIsMd, setCollapsed } = this.props.themeStore!;
        if (broken) {
            this.setState({
                collapsedWidth: 0,
                marginRight: 0
            }, () => {
                // toggleCollapsed(broken);
                setIsMd(broken)
                setCollapsed(broken)
            })
        } else {
            this.setState({
                collapsedWidth: 80,
                marginRight: 2
            }, () => {
                setIsMd(broken)
                toggleCollapsed(broken);
                onClose()
            })
        }

        console.log(broken);
    }

    render() {
        const { collapsed = false, visible, onClose } = this.props
        const { theme, getFixedMenu } = this.props.themeStore!;
        const { setBreadTitle } = this.props.breadStore!;
        return (
            <>
                <Sider
                    trigger={null}
                    breakpoint="md"
                    collapsedWidth={this.state.collapsedWidth}
                    collapsible
                    collapsed={collapsed}
                    onBreakpoint={(broken) => {
                        this.togglePointHandler(broken)
                    }}
                    theme={theme}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed);

                    }}
                    width={256}
                    style={{ ...getFixedMenu, marginRight: this.state.marginRight }}
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
                    <NavMenu theme={theme} setBreadTitle={setBreadTitle}></NavMenu>
                </Sider>
                <DrawerSider
                    setBreadTitle={setBreadTitle}
                    theme={theme}
                    visible={visible}
                    onClose={() => onClose()}>

                </DrawerSider>
            </>


        );
    }
}
