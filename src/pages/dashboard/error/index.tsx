import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Button, Tabs, Typography, Row, Table, Col, DatePicker, Divider, Space } from 'antd';
import time from 'utils/time'
import { get } from 'config/api/axios'
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
        let result = await get("monitor/error/url")
        result = result.map((item: any) => {
            return {
                ...item,
                key: item.url
            }
        })
        this.setState({
            urlList: result,
            selUrl: result[0].url,
            selectedBtn: "1"
        }, () => {
            this.getErrorCountList()
            this.getErrorUrlList()
            this.getLineChart()
        })
    }
    getErrorCountList = async () => {
        const { type, day, selUrl } = this.state
        let result = await get(`monitor/error/count/list?type=${type}&day=${day}&url=${selUrl}`)
        let total = 0;
        total = result.reduce((initNum: number, item: any) => {
            return initNum + item.total
        }, total)
        let tmp = result.map((item: any) => {
            return { item: item.error_type, count: item.total, percent: Number((item.total / total).toFixed(2)) }
        })
        this.setState({
            diagram: tmp
        })
    }
    getErrorUrlList = async () => {
        const { type, day, selUrl } = this.state
        let result = await get(`monitor/error/url/list?type=${type}&day=${day}&url=${selUrl}`)
        result = result.map((item: any) => {
            return {
                key: item.id,
                time: time.getAlltime(item.create_time),
                error_name: item.error_type,
                url: item.url,
                filename: item.filename,
                message: item.message ? item.message : (item.tag_name ? item.tag_name + "加载错误" : "无描述信息"),
                adress: item.user_adress ? item.user_adress : "位置不详"
            }
        })
        this.setState({
            errorUrlList: result
        })
    }
    getLineChart = async () => {
        const { selUrl, day, selDay, type } = this.state;
        let result = undefined;
        if (selDay === 0) {
            result = await get(`monitor/error/online/day?type=${type}&day=${day}&url=${selUrl}`)

        } else {
            result = await get(`monitor/error/online/long?type=${type}&day=${selDay}&url=${selUrl}`)

        }

        let tmp: any = []
        if (Array.isArray(result) && selDay === 0) {
            let len = result.length
            for (let i = 0; i < 24; i++) {
                let year = (i >= 10 ? i + "" : '0' + i)
                let objJs: any = {
                    total: 0,
                    time: year,
                    error_type: 'jsError',
                }
                let objRes: any = {
                    total: 0,
                    time: year,
                    error_type: 'resourceError',
                }
                let objPro: any = {
                    total: 0,
                    time: year,
                    error_type: 'promiseError',
                }
                for (let j = 0; j < len; j++) {
                    if (result[j].time === year) {
                        switch (result[j].error_type) {
                            case "jsError":
                                objJs = result[j]
                                break
                            case "promiseError":
                                objPro = result[j]
                                break
                            case "resourceError":
                                objRes = result[j]
                                break
                        }

                    }
                }
                tmp.push(objPro)
                tmp.push(objRes)
                tmp.push(objJs)
            }
            this.setState({
                histogram: tmp,
            })
        } else {
            // let len = type === "year" ? 12 : selDay
            // for (let i = 0; i < len; i++) {
            //     let time = result[i].time
            //     let objJs: any = {
            //         total: 0,
            //         time: time,
            //         error_type: 'jsError',
            //     }
            //     let objRes: any = {
            //         total: 0,
            //         time: time,
            //         error_type: 'resourceError',
            //     }
            //     let objPro: any = {
            //         total: 0,
            //         time: time,
            //         error_type: 'promiseError',
            //     }
            //     let len1 = result.length
            //     let year = ''
            //     for (let j = 0; j < len1; j++) {
            //         if (result[j].time === year) {
            //             switch (result[j].error_type) {
            //                 case "jsError":
            //                     console.log(result[j])
            //                     objJs = result[j]
            //                     break
            //                 case "promiseError":
            //                     objPro = result[j]
            //                     console.log(result[j])
            //                     break
            //                 case "resourceError":
            //                     objRes = result[j]
            //                     console.log(result[j])
            //                     break
            //             }

            //         }
            //     }
            //     tmp.push(objPro)
            //     tmp.push(objRes)
            //     tmp.push(objJs)
            // }
            result = result.map((item: any) => {
                let len = item.time.split("-").length
                let re = item.time.split("-")
                return {
                    total: item.total,
                    time: re[len - 1 > 0 ? len - 1 : len],
                    error_type: item.error_type
                }
            })
            this.setState({
                histogram: result
            })
        }
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