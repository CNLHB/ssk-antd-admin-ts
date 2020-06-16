import React, { Component } from "react";
import { Divider, Card, Avatar, Row, Col } from 'antd';

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
                    <Col xs={24} md={12} xl={6}>
                        <Card style={{ width: "100%" }}
                            headStyle={{ color: "#00000073" }}
                            bordered={false}
                            loading={loading}>
                            <Meta
                                description="总动态"
                            />
                            <span>$1125</span>
                            <Divider></Divider>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Card
                            bordered={false}
                            style={{ width: "100%" }} loading={loading}>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Card
                            bordered={false}
                            style={{ width: "100%" }} loading={loading}>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={6}>
                        <Card
                            bordered={false}
                            style={{ width: "100%" }} loading={loading}>
                            <Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>



            </div>


        );
    }
}
export default Log;
