import React from "react";
import { Button, Drawer, Space, Switch, Row, Col, Divider } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { inject, observer } from 'mobx-react'
import { ThemeInterface, ThemeColorType } from "models/theme/index";
import styles from "./index.module.less";
import svgLine from "assets/images/setting-line.svg";
import svgDark from "assets/images/setting-dark.svg";

interface UserAppProps {
    themeStore?: ThemeInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
@inject("themeStore")
@observer
class Settings extends React.Component<UserAppProps, any> {
    constructor(props: any) {
        super(props);
        this.state = { visible: false };
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
    onChange = (checked: boolean, str: string) => {
        const { setAffixHeader, setAffixMenu } = this.props.themeStore!;
        if (str === "header") {
            setAffixHeader(checked)
        } else {
            setAffixMenu(checked)
        }
    };
    private setThemeHandler = (theme: ThemeColorType): void => {
        const { setTheme } = this.props.themeStore!;
        setTheme(theme);
    };
    render() {

        return (
            <>
                <Button
                    className={styles.setting}
                    type="primary"
                    icon={<SettingFilled style={{ fontSize: 20 }} />}
                    onClick={this.showDrawer}
                />
                <Drawer
                    title="整体风格设置"
                    placement="right"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Space size="middle">
                        <div>
                            <img
                                src={svgLine}
                                alt="light"
                                onClick={() => this.setThemeHandler("light")}
                            />
                        </div>
                        <div>
                            <img
                                src={svgDark}
                                alt="dark"
                                onClick={() => this.setThemeHandler("dark")}
                            />
                        </div>
                    </Space>
                    <Divider />

                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <Row justify="space-between">
                            <Col span={20}>
                                <span>固定 Header</span>
                            </Col>
                            <Col span={4}>
                                <Switch
                                    onChange={(checked) => this.onChange(checked, "header")}
                                    size="small"
                                />
                            </Col>
                        </Row>
                        <Row justify="space-between">
                            <Col span={20}>
                                <span>固定侧边菜单</span>
                            </Col>
                            <Col span={4}>
                                <Switch
                                    onChange={(checked) => this.onChange(checked, "left")}
                                    size="small"
                                />
                            </Col>
                        </Row>
                    </Space>
                </Drawer>
            </>
        );
    }
}
export default Settings;
