import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { ContentRoutes, renderRouter } from "router/index";
const { Content } = Layout;
class ContentArea extends Component<{}, {}> {
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
                    style={{ padding: 24, minHeight: 460 }}
                >
                    {renderRouter(ContentRoutes)}
                </div>
            </Content>
        );
    }
}
export default ContentArea;
