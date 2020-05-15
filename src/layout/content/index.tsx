import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;
class ContentArea extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to={"/admin"}>User</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 560 }}
        >
          {this.props.children}
        </div>
      </Content>
    );
  }
}
export default ContentArea;
