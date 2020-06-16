import React, { Component } from "react";
import { Divider, Card, Typography, Row, Col, Space } from 'antd';

const { Title, Text } = Typography;
const { Meta } = Card;
class Log extends Component<{}, {}> {
    state = {
        loading: false,
    };

    onChange = (checked: boolean) => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;
        return (

            <div
                style={{ margin: 24, minHeight: 460 }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} xl={12}>
                        <Card style={{ width: "100%" }}
                            loading={loading}>
                            <Space direction="vertical" size="small">
                                <Meta
                                    description="总用户"
                                />
                                <Title>1125</Title>
                                <Text strong> 周同比<span style={{ paddingLeft: 5, paddingRight: 5 }}>12%</span>日同比<span style={{ paddingLeft: 5, paddingRight: 5 }}>12%</span></Text>
                            </Space>
                            <Divider></Divider>
                            <Text strong> 日增长量 11</Text>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={12}>
                        <Card
                            style={{ width: "100%" }}
                            loading={loading}>
                            <Space direction="vertical">
                                <Meta
                                    description="日增长量"
                                />
                                <Title>11</Title>
                            </Space>
                            <Divider></Divider>
                        </Card>
                    </Col>
                    {/* <Col xs={24} md={12} xl={6}>
                        <Card
                            bordered={false}
                            style={{ width: "100%" }} loading={loading}>
                            <Meta
                                description="今日登陆"
                            />
                        </Card>
                    </Col> */}

                </Row>



            </div>


        );
    }
}
export default Log;
