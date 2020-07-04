import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Button, Tabs, Typography, Row, Table, Col, DatePicker, Divider, Space } from 'antd';
import { getUrlAPI, getErrorCountListAPI, getgetErrorUrlListAPI, getLineChartAPI } from 'xhr/api/dashboard/error'
import {
    Chart,
    Area,
    Line,
    Tooltip,
    Axis,
    Interval,
    Coordinate,

} from "bizcharts";
const { Title, } = Typography;
const { TabPane } = Tabs;
interface MonitorProps {
    breadStore: BreadInterface
}
interface MonitorState {
    btnList: Array<any>
    urlList: Array<any>
    diagram: Array<any>
    errorUrlList: Array<any>
    histogram: Array<any>
    selectedBtn: string
    selUrl: string
    selDay: number
    day: string
    type: string
}
let date = new Date();
let day = `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + (date.getDate())}`

@inject("breadStore")
@observer
class Monitor extends Component<MonitorProps, MonitorState> {

    state = {
        selectedBtn: '1',
        selDay: 0,
        selUrl: "",
        type: 'day',
        day: day,
        diagram: [],
        urlList: [],
        histogram: [],
        errorUrlList: [],
        btnList: [
            {
                key: 1,
                text: "本日"
            },
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
        let result = await getUrlAPI()
        this.setState({
            urlList: result,
            selUrl: result[0] ? result[0].url : "",
            selectedBtn: "1"
        }, () => {
            this.getErrorCountList()
            this.getErrorUrlList()
            this.getLineChart()
        })
    }
    getErrorCountList = async () => {
        const { type, day, selUrl } = this.state
        let result = await getErrorCountListAPI(type, day, selUrl)

        this.setState({
            diagram: result
        })
    }
    getErrorUrlList = async () => {
        const { type, day, selUrl } = this.state
        let result = await getgetErrorUrlListAPI(type, day, selUrl)
        this.setState({
            errorUrlList: result
        })
    }
    getLineChart = async () => {
        const { selUrl, day, selDay, type } = this.state;
        let result = await getLineChartAPI(type, day, selUrl, selDay)
        this.setState({
            histogram: result
        })
    }
    render() {
        const { btnList, urlList, diagram, histogram, selectedBtn, errorUrlList, selUrl } = this.state;
        function callback(key: any) {
            console.log(key);
        }
        function callback1(key: any) {
            console.log(key);
        }
        const { breadTitle } = this.props.breadStore!
        const operations = <Space >{btnList.map((item: any) => {
            return <Col
                key={item.key}
            >
                <Button
                    type={selectedBtn + '' === item.key + '' ? "primary" : undefined}
                    onClick={() => {
                        if (selectedBtn + '' === item.key + '') {

                        } else {
                            let day1 = 0
                            let type = ''
                            switch (item.key) {
                                case 1:
                                    day1 = 0
                                    type = 'day'
                                    this.setState({
                                        day: day
                                    })
                                    break
                                case 2:
                                    day1 = 7
                                    type = 'week'
                                    break
                                case 3:
                                    day1 = 30
                                    type = 'month'
                                    break
                                case 4:
                                    day1 = date.getFullYear()
                                    type = 'year'
                                    break
                            }
                            this.setState({
                                selectedBtn: item.key,
                                selDay: day1,
                                type: type
                            }, () => {
                                this.getLineChart()
                                this.getErrorCountList()
                                this.getErrorUrlList()
                            })
                        }

                    }}
                >{item.text}</Button>
            </Col>
        })}
        </Space>
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
                render: (url: string) => <a style={{ color: selUrl === url ? "" : "#000000a6" }}>{url}</a>,
                ellipsis: true,
            }

        ];
        const columns1 = [
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                width: 150,
                ellipsis: true,

            },
            {
                title: 'error_name',
                dataIndex: 'error_name',
                key: 'error_name',
                width: 120,
                ellipsis: true,
            },
            {
                title: 'URL',
                dataIndex: 'url',
                key: 'url',
                render: (url: string) => <a>{url}</a>,
                ellipsis: true,
            },
            {
                title: 'filename',
                dataIndex: 'filename',
                key: 'filename',
                width: "40%",
                ellipsis: true,
            },
            {
                title: 'message',
                dataIndex: 'message',
                key: 'message',
                width: 150,
                ellipsis: true,
            },
            {
                title: '地区',
                dataIndex: 'adress',
                key: 'adress',
                width: 120,
                ellipsis: true,
            }

        ];


        const scale = {
            // total: {
            //     nice: true,
            // },
            // time: {
            //     type: 'linear',
            //     tickInterval: 50,
            // },
        };
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

                    <Row style={{ backgroundColor: "#fff" }} >
                        <Col span={24}>
                            <Row gutter={[16, 16]}>
                                <Col sm={24} md={24} lg={6}>
                                    <DatePicker onChange={(date: any, dateString: any) => {
                                        this.setState({
                                            day: dateString,
                                            type: 'day',
                                            selDay: 0,
                                            selectedBtn: ''
                                        }, () => {
                                            this.getErrorCountList()
                                            this.getErrorUrlList()
                                            this.getLineChart()
                                        })
                                    }} /></Col>
                                <Col sm={24} md={24} lg={18}>

                                </Col>
                            </Row>
                            {operations}
                            <Divider style={{ margin: "16px 0" }}></Divider>

                            <Row gutter={[16, 16]}>
                                <Col md={24} lg={8} xl={8}>
                                    <Table
                                        onRow={(record: any) => {
                                            return {
                                                onClick: event => {
                                                    this.setState({
                                                        selUrl: record.url
                                                    }, () => {
                                                        this.getErrorCountList()
                                                        this.getErrorUrlList()
                                                        this.getLineChart()
                                                    })
                                                }, // 点击行
                                            };
                                        }}
                                        columns={columns} dataSource={urlList} />
                                </Col>
                                <Col xs={24} md={24} lg={16} xl={16}>
                                    <Title level={4}>监控视图</Title>
                                    <Tabs defaultActiveKey="1" onChange={callback1}>
                                        <TabPane tab="堆叠图" key="1">
                                            <Chart scale={scale} height={500} data={histogram} autoFit>
                                                <Tooltip shared />
                                                <Area adjust="stack" color="error_type" position="time*total" />
                                                <Line adjust="stack" color="error_type" position="time*total" />
                                            </Chart>
                                        </TabPane>
                                        <TabPane tab="扇形图" key="2">
                                            <Chart height={500} data={diagram} scale={cols} autoFit>
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
                                                            return `${data.item}: ${data.count}`;
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
                                    <Table
                                        style={{ width: "100%", overflowX: "auto" }}
                                        columns={columns1} dataSource={errorUrlList} />
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                </div>
            </div >


        );
    }
}
export default Monitor