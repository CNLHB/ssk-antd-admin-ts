import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import NavMenu from "components/menu/index";
import navLogo from "assets/images/logo-ant.svg";
import "./index.less";
const { Header, Sider, Footer } = Layout;
export default class LayoutApp extends React.Component<{ theme: any }, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      theme: "light",
      marginLeft: 200,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      //   marginLeft: this.state.marginLeft === 200 ? 80 : 200,
    });
  };

  render() {
    const { theme } = this.props;

    console.log(this.props.children);
    return (
      <Layout className="wrapper">
        <Sider
          trigger={null}
          breakpoint="md"
          //   collapsedWidth="0"
          collapsible
          collapsed={this.state.collapsed}
          onBreakpoint={(broken) => {
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
          <NavMenu theme={theme}></NavMenu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          {this.props.children}
          {/* <ContentArea ></ContentArea> */}
          <Footer style={{ textAlign: "center" }}>
            ©2020 剑七团队技术部出品
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
