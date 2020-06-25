import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Button, Card, Tabs, Typography, Row, Table, Tag, Col, Space } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { get } from 'config/api/axios'
import {
    Chart,
    Area,
    Line,
    Tooltip,
    Geom,
    Axis,
    Interval,
    Coordinate,
    View,
    Guide,
    PieChart,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
const { Title, Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;
interface MonitorProps {
    breadStore: BreadInterface
}
interface MonitorState {
    btnList: Array<any>
    urlList: Array<any>
    selectedBtn: string
}
@inject("breadStore")
@observer
class Monitor extends Component<MonitorProps, MonitorState> {

    state = {
        selectedBtn: '',
        urlList: [],
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
    }
    componentDidMount() {
        this.getUrlList()
    }
    getUrlList = async () => {
        let result = await get("monitor/url")
        result = result.map((item: any) => {
            return {
                ...item,
                key: item.url
            }
        })
        this.setState({
            urlList: result
        })
        console.log(result)
    }
    render() {
        const { btnList, urlList } = this.state;

        function callback(key: any) {
            console.log(key);
        }
        function callback1(key: any) {
            console.log(key);
        }
        const { breadTitle } = this.props.breadStore!
        const operations = <Row gutter={[12, 0]}>{btnList.map((item: any) => {
            return <Col key={item.key}>
                <Button
                    type={"selectedBtn" === item.key ? "primary" : undefined}
                    onClick={() => {
                        if ("selectedBtn" === item.key) {

                        } else {
                            let data: any = []
                            switch (item.key) {
                                case 2:
                                    break
                                case 3:
                                    break
                                case 4:
                                    break
                            }
                            this.setState({
                                selectedBtn: item.key
                            }, () => {

                            })
                        }

                    }}
                >{item.text}</Button>
            </Col>
        })}
        </Row>
        const columns = [
            {
                title: 'total',
                dataIndex: 'total',
                key: 'total',
                width: 80

            },
            {
                title: 'url',
                dataIndex: 'url',
                key: 'url',
                render: (url: string) => <a>{url}</a>,
                ellipsis: true,
            }

        ];
        const columns1 = [
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',

            },
            {
                title: 'error_name',
                dataIndex: 'error_name',
                key: 'error_name',
            },
            {
                title: 'URL',
                dataIndex: 'url',
                key: 'url',
                render: (url: string) => <a>{url}</a>,
            },
            {
                title: 'HTTP_CODE',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '地区',
                dataIndex: 'adress',
                key: 'adress',
            }

        ];
        const data = [
            {
                key: '1',
                total: 60,
                url: "http://127.0.0.1:3000/template1",
            },
            {
                key: '2',
                total: 50,
                url: "http://127.0.0.1:3000/template2",
            },
            {
                key: '3',
                total: 110,
                url: "http://127.0.0.1:3000/template3",
            },
        ];
        const data1 = [
            {
                key: '1',
                time: "2020-06-24 03:18:00",
                error_name: "代理异常_Response Timeout",
                url: "http://127.0.0.1:3000/template1",
                code: 400,
                adress: '河南 安阳'
            },
            {
                key: '2',
                time: "2020-06-24 03:18:00",
                error_name: "代理异常_Response Timeout",
                url: "http://127.0.0.1:3000/template1",
                code: 400,
                adress: '河南 安阳'
            },
            {
                key: '3',
                time: "2020-06-24 03:18:00",
                error_name: "代理异常_Response Timeout",
                url: "http://127.0.0.1:3000/template1",
                code: 400,
                adress: '河南 安阳'
            },
        ];
        const data3 = [
            { country: 'Asia', year: '1750', value: 502 },
            { country: 'Asia', year: '1800', value: 635 },
            { country: 'Asia', year: '1850', value: 809 },
            { country: 'Asia', year: '1900', value: 5268 },
            { country: 'Asia', year: '1950', value: 4400 },
            { country: 'Asia', year: '1999', value: 3634 },
            { country: 'Asia', year: '2050', value: 947 },
            { country: 'Africa', year: '1750', value: 106 },
            { country: 'Africa', year: '1800', value: 107 },
            { country: 'Africa', year: '1850', value: 111 },
            { country: 'Africa', year: '1900', value: 1766 },
            { country: 'Africa', year: '1950', value: 221 },
            { country: 'Africa', year: '1999', value: 767 },
            { country: 'Africa', year: '2050', value: 133 },
            { country: 'Europe', year: '1750', value: 163 },
            { country: 'Europe', year: '1800', value: 203 },
            { country: 'Europe', year: '1850', value: 276 },
            { country: 'Europe', year: '1900', value: 628 },
            { country: 'Europe', year: '1950', value: 547 },
            { country: 'Europe', year: '1999', value: 729 },
            { country: 'Europe', year: '2050', value: 408 },
            { country: 'Oceania', year: '1750', value: 200 },
            { country: 'Oceania', year: '1800', value: 200 },
            { country: 'Oceania', year: '1850', value: 200 },
            { country: 'Oceania', year: '1900', value: 460 },
            { country: 'Oceania', year: '1950', value: 230 },
            { country: 'Oceania', year: '1999', value: 300 },
            { country: 'Oceania', year: '2050', value: 300 },
        ];

        const scale = {
            value: {
                nice: true,
            },
            year: {
                type: 'linear',
                tickInterval: 50,
            },
        };
        const data5 = [
            { item: '代理异常_Response', count: 40, percent: 0.4 },
            { item: '加载异常', count: 21, percent: 0.21 },
            { item: 'js异常', count: 17, percent: 0.17 },
            { item: '事例代理异常', count: 13, percent: 0.13 }
        ];

        const cols = {
            percent: {
                formatter: (val: any) => {
                    val = val * 100 + '%';
                    return val;
                },
            },
        };
        return (
            <div>
                <PageBread bread={breadTitle}></PageBread>

                <div
                    className="site-layout-background"
                    style={{ padding: 24, margin: 24, minHeight: 460 }}
                >

                    <Row style={{ backgroundColor: "#fff", padding: 16 }} >
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={operations}>
                                <TabPane tab="增长趋势" key="1">
                                    <Row gutter={[16, 16]}>
                                        <Col span={8}>
                                            <Table columns={columns} dataSource={urlList} />
                                        </Col>
                                        <Col span={16}>
                                            <Title level={4}>监控视图</Title>
                                            <Tabs defaultActiveKey="1" onChange={callback1}>
                                                <TabPane tab="堆叠图" key="1">
                                                    <Chart scale={scale} height={500} data={data3} autoFit>
                                                        <Tooltip shared />
                                                        <Area adjust="stack" color="country" position="year*value" />
                                                        <Line adjust="stack" color="country" position="year*value" />
                                                    </Chart>
                                                </TabPane>
                                                <TabPane tab="扇形图" key="2">
                                                    <Chart height={400} data={data5} scale={cols} autoFit>
                                                        <Coordinate type="theta" radius={0.75} />
                                                        <Tooltip showTitle={false} />
                                                        <Axis visible={false} />
                                                        <Interval
                                                            position="percent"
                                                            adjust="stack"
                                                            color="item"
                                                            style={{
                                                                lineWidth: 1,
                                                                stroke: '#fff',
                                                            }}
                                                            label={['count', {
                                                                content: (data) => {
                                                                    return `${data.item}: ${data.percent * 100}%`;
                                                                },
                                                            }]}
                                                        />
                                                    </Chart>

                                                </TabPane>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Table columns={columns1} dataSource={data1} />
                                        </Col>
                                    </Row>
                                </TabPane>

                            </Tabs>
                        </Col>
                    </Row>

                </div>
            </div>


        );
    }
}
export default Monitor