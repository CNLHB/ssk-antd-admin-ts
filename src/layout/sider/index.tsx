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
    toggleMd: Function;
    onClose(): void
}
interface SiderState {
    marginLeft: number
    collapsedWidth: number
}

@inject("breadStore")
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
        const { collapsed = false, visible, toggleCollapsed, toggleMd, onClose } = this.props
        const { theme, getFixedMenu, setLayoutLeft } = this.props.themeStore!;
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
                        if (broken) {
                            this.setState({
                                collapsedWidth: 0
                            }, () => {
                                setLayoutLeft(0)
                                toggleCollapsed(broken);
                                toggleMd(broken)
                            })
                        } else {
                            this.setState({
                                collapsedWidth: 80
                            }, () => {
                                toggleCollapsed(broken);
                                setLayoutLeft(256)
                                toggleMd(broken)
                            })
                        }

                        console.log(broken);
                    }}
                    theme={theme}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed);

                    }}
                    width={256}
                    style={{ ...getFixedMenu }}
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
