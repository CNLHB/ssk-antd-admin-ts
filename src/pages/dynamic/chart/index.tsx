import React, { Component } from "react";
import { Button, Card, Tabs, Typography, Row, Col, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { get } from 'config/api/axios'
import {
    PieChart,
    TinyAreaChart,
    ColumnChart,
} from "bizcharts";
const { Title, Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;




class DynamicTrend extends Component<{}, {}> {
    state = {
        loading: true,
        selectedBtn: 2,
        showText: "本周",

        showData: [],
        data: {
            yesterday: 0,
            total: 0,
            week: 0,
            upWeek: 0,
            year: 0,
            day: 0,
            monthList: [],
            weekList: [],
            yearList: [],
            categoryTotal: []
        },
        btnList: [
            //     {
            //     key: 1,
            //     text: "今日"
            // },
            {
                key: 2,
                text: "本周"
            },
            {
                key: 3,
                text: "本月"
            },
            {
                key: 4,
                text: "全年"
            }]
    };
    componentDidMount() {
        this.fetch()
    }
    fetch = async () => {
        let result = await get('topic/trend')
        let monthList = result.data.monthList.map((item: any) => {
            return { text: item.current_day, value: item.total }
        })
        let weekList = result.data.weekList.map((item: any, index: number) => {
            return { text: item.current_day, value: item.total }
        })
        let len = result.data.yearList.length > 12 ? result.data.yearList.length : 12
        let yearList = result.data.yearList.splice(len - 12, 12).map((item: any) => {
            return { text: item.months, value: item.total }
        })
        this.setState({
            showData: weekList,
            loading: false,
            data: {
                yesterday: result.data.yesterday,
                total: result.data.total,
                week: result.data.week,
                upWeek: result.data.upWeek,
                year: result.data.year,
                day: result.data.day,
                monthList: monthList,
                weekList: weekList,
                yearList: yearList,
                categoryTotal: result.data.categoryTotal
            }
        })

    }
    onChange = (checked: boolean) => {
        this.setState({ loading: !checked });
    };

    render() {
        function callback(key: any) {
            console.log(key);
        }
        const { loading, data, btnList, selectedBtn, showData, showText } = this.state;
        const { week, upWeek, total, day, categoryTotal, yesterday, monthList, weekList, yearList } = data;
        let weeked = upWeek === 0 ? week * 100 : Math.round((week / upWeek) * 100);
        let dayed = yesterday === 0 ? day * 100 : Math.round((day / yesterday) * 100);
        const operations = <Row gutter={[12, 0]}>{btnList.map((item: any) => {
            return <Col key={item.key}>
                <Button
                    type={selectedBtn === item.key ? "primary" : undefined}
                    onClick={() => {
                        if (selectedBtn === item.key) {

                        } else {
                            let data: any = []
                            switch (item.key) {
                                case 2:
                                    data = weekList
                                    break
                                case 3:
                                    data = monthList
                                    break
                                case 4:
                                    data = yearList
                                    break
                            }
                            this.setState({
                                selectedBtn: item.key,
                                showText: item.text,
                                showData: data
                            }, () => {

                            })
                        }

                    }}
                >{item.text}</Button>
            </Col>
        })}
        </Row>
        // <Button>Extra Action</Button>;
        return (

            <div
                style={{ margin: 24, minHeight: 460 }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} xl={12}>
                        <Card style={{ width: "100%" }}
                            loading={loading}>
                            <Row>
                                <Col span={10}>
                                    <Space direction="vertical" size="small">
                                        <Meta
                                            description="总动态"
                                        />
                                        <Title>{total}</Title>
                                        <Text strong>
                                            <Row>
                                                <Col>
                                                    周同比
                                                    <span style={{ paddingLeft: 5, paddingRight: 5 }}>
                                                        {weeked}% {weeked >= 100 ? <CaretUpOutlined style={{ color: "#52c41a" }} /> : <CaretDownOutlined style={{ color: "red" }} />}
                                                    </span>
                                                </Col>
                                                <Col>
                                                    日同比
                                                     <span style={{ paddingLeft: 5, paddingRight: 5 }}>
                                                        {dayed}% {dayed >= 100 ? <CaretUpOutlined style={{ color: "#52c41a" }} /> : <CaretDownOutlined style={{ color: "red" }} />}
                                                    </span>
                                                </Col>

                                            </Row>


                                        </Text>
                                    </Space>
                                </Col>
                                <Col span={14}>
                                    <PieChart
                                        data={categoryTotal}
                                        radius={1}
                                        angleField='total'
                                        colorField='name'
                                        forceFit
                                        title={{
                                            visible: true,
                                            text: '动态分布',
                                        }}
                                        legend={{
                                            position: "bottom-center",
                                            offsetY: 12

                                        }}
                                        label={{
                                            visible: true,
                                            type: 'outer',
                                            offset: 20,
                                        }}
                                    />
                                </Col>
                            </Row>
                            {/* <Divider></Divider>
                            <Text strong> 日增长量 11</Text> */}
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={12} >
                        <Card
                            style={{ width: "100%", height: "100%" }}
                            loading={loading}>
                            <Row>
                                <Col span={6}>
                                    <Space direction="vertical">
                                        <Meta
                                            description="今日增长"
                                        />
                                        <Title>{day}</Title>

                                    </Space>
                                </Col>
                                <Col span={18}>
                                    <TinyAreaChart
                                        data={weekList}
                                        title={{
                                            visible: true,
                                            text: '本周增长趋势',
                                        }}
                                        forceFit
                                        height={138}
                                        xField="text"
                                        yField="value"
                                    />
                                </Col>
                            </Row>

                            {/* <Divider></Divider>
                            <Text strong> 今日增长量 11</Text> */}
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
                <Row style={{ backgroundColor: "#fff", padding: 16 }} >
                    <Col span={24}>
                        <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={operations}>
                            <TabPane tab="增长趋势" key="1">
                                <ColumnChart
                                    data={showData}
                                    title={{
                                        visible: true,
                                        text: `${showText}增长趋势图`,
                                    }}
                                    forceFit
                                    padding='auto'
                                    xField='text'
                                    yField='value'
                                    meta={{
                                        text: {
                                            alias: '日期',
                                        },
                                        value: {
                                            alias: '增长量',
                                        },
                                    }}
                                />

                            </TabPane>


                            {/* <TabPane tab="Tab 2" key="2">
                                <ColumnChart
                                    data={data4}
                                    title={{
                                        visible: true,
                                        text: '基础柱状图',
                                    }}
                                    forceFit
                                    padding='auto'
                                    xField='text'
                                    yField='value'
                                    meta={{
                                        text: {
                                            alias: '时间',
                                        },
                                        value: {
                                            alias: '增长量',
                                        },
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane> */}
                        </Tabs>
                    </Col>
                </Row>


            </div>


        );
    }
}
export default DynamicTrend;
