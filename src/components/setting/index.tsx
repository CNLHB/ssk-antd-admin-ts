import React from "react";
import { Button, Drawer, Space, Switch, Row, Col, Divider } from "antd";
import { SettingFilled } from "@ant-design/icons";
import styles from "./index.module.less";
import svgLine from "assets/images/setting-line.svg";
import svgDark from "assets/images/setting-dark.svg";

class Settings extends React.Component<{ toggleTheme: Function }, any> {
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
  onChange = (checked: any, str: string) => {
    console.log(`switch to ${checked}+${str}`);
  };
  render() {
    const { toggleTheme } = this.props;
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
                onClick={() => toggleTheme("light")}
              />
            </div>
            <div>
              <img
                src={svgDark}
                alt="dark"
                onClick={() => toggleTheme("dark")}
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
