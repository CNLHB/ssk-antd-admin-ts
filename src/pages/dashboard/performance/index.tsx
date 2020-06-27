import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Button, Card, DatePicker, Row, Table, Col, Space } from 'antd';
import { get } from 'config/api/axios'
import {

    LineChart,
    WaterfallChart,
} from "bizcharts";

interface MonitorProps {
    breadStore: BreadInterface
}
interface MonitorState {
    btnList: Array<any>
    urlList: Array<any>
    timeArray: Array<any>
    rangeArray: Array<any>
    histogram: Array<any>
    waterfall: Array<any>
    selectedBtn: string
    selUrl: string
    selDay: number
    type: string
    day: string
}
let date = new Date();
let day = `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + (date.getDate())}`

@inject("breadStore")
@observer
class Performance extends Component<MonitorProps, MonitorState> {
    state = {
        selectedBtn: '1',
        type: 'day',
        waterfall: [],
        urlList: [],
        histogram: [],

        selUrl: "",
        selDay: 0,
        day: day,
        timeArray: [{
            key: 'dom_ready_ms',
            value: 'DOM_READY_耗时'
        },
        {
            key: 'first_render_ms',
            value: '首次渲染耗时'
        },
        {
            key: 'first_response_ms',
            value: '首次可交互耗时'
        },
        {
            key: 'first_tcp_ms',
            value: '首包时间耗时'
        },
        {
            key: 'load_complete_ms',
            value: '页面完全加载耗时'
        },
        {
            key: 'ssl_connect_ms',
            value: 'SSL连接耗时'
        }
        ],
        rangeArray: [{
            key: 'dns_lookup_ms',
            value: 'DNS查询耗时'
        },
        {
            key: 'tcp_connect_ms',
            value: 'TCP链接耗时'
        },
        {
            key: 'response_request_ms',
            value: '请求响应耗时'
        },
        {
            key: 'response_transfer_ms',
            value: '内容传输耗时'
        },
        {
            key: 'dom_parse_ms',
            'value': 'DOM解析耗时'
        },
        {
            key: 'load_resource_ms',
            value: '资源加载耗时'
        }
        ],
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

        ]
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
            urlList: result,
            selUrl: result[0].url
        })
        this.getLineChart()
        this.getOverView()
    }
    getLineChart = async () => {
        const { selUrl, day, selDay } = this.state;
        let result = undefined;
        if (selDay === 0) {
            result = await get(`monitor/per/oline/day?day=${day}&url=${selUrl}`)

        } else {
            result = await get(`monitor/per/oline/long?day=${selDay}&url=${selUrl}`)

        }

        let tmp = []
        if (Array.isArray(result) && selDay === 0) {
            let len = result.length
            for (let i = 0; i < 24; i++) {
                let year = (i >= 10 ? i : '0' + i)
                let obj: any = {
                    dns_time: 0,
                    connect_time: 0,
                    ttfb_time: 0,
                    response_time: 0,
                    parse_dom_time: 0,
                    time_to_interactive: 0
                }
                for (let j = 0; j < len; j++) {
                    if (result[j].time.split(" ")[1] === (year + ":00:00")) {
                        obj = result[j]
                    }
                }
                tmp.push({
                    type: 'DNS查询', year: year, value: obj.dns_time,
                })
                tmp.push({
                    type: 'TCP连接时间', year: year, value: obj.connect_time,
                })
                tmp.push({
                    type: '首字节到达时间', year: year, value: obj.ttfb_time,
                })
                tmp.push({
                    type: '响应的读取时间', year: year, value: obj.response_time,
                })
                tmp.push({
                    type: 'DOM解析的时间', year: year, value: obj.parse_dom_time,
                })
                tmp.push({
                    type: '首次可交互时间', year: year, value: obj.time_to_interactive,
                })
            }
            this.setState({
                histogram: tmp,
            })
        } else {
            let len = result.length
            for (let i = 0; i < len; i++) {
                let { dns_time, ttfb_time,
                    connect_time, parse_dom_time,
                    response_time, time_to_interactive, current_day } = result[i]
                tmp.push({
                    type: 'DNS查询', year: current_day, value: dns_time,
                })
                tmp.push({
                    type: 'TCP连接时间', year: current_day, value: connect_time,
                })
                tmp.push({
                    type: '首字节到达时间', year: current_day, value: ttfb_time,
                })
                tmp.push({
                    type: '响应的读取时间', year: current_day, value: response_time,
                })
                tmp.push({
                    type: 'DOM解析的时间', year: current_day, value: parse_dom_time,
                })
                tmp.push({
                    type: '首次可交互时间', year: current_day, value: time_to_interactive,
                })
            }
            this.setState({
                histogram: tmp,
            })
        }
    }


    getOverView = async () => {
        const { selUrl, day, type } = this.state;
        let result = await get(`monitor/per/oline/current?type=${type}&day=${day}&url=${selUrl}`)
        // let tmp: Array<any> = []
        if (Array.isArray(result) && result.length === 1) {
            let { dns_time, ttfb_time,
                connect_time, parse_dom_time,
                response_time, time_to_interactive } = result[0]
            let tmp = [
                { type: 'DNS查询', time: dns_time },
                { type: 'TCP连接时间', time: connect_time },
                { type: '首字节到达时间', time: ttfb_time },
                { type: '响应的读取时间', time: response_time },
                // { type: 'DOM', time: dom_content_loaded_time },
                { type: 'DOM解析的时间', time: parse_dom_time },
                // { type: 'DOM完整的加载时间，', time: load_time },
                { type: '首次可交互时间', time: time_to_interactive },
            ]
            this.setState({
                waterfall: tmp,
            })
        } else {
            this.setState({
                waterfall: [],
            })
        }


    }

    render() {
        const { btnList, urlList, selUrl, waterfall, histogram, selectedBtn } = this.state;
        // 数据源
        // function callback(key: any) {
        //     console.log(key);
        // }

        const { breadTitle } = this.props.breadStore!
        const operations = <Row gutter={[12, 0]}>{btnList.map((item: any) => {
            return <Col key={item.key}>
                <Button
                    type={selectedBtn + '' === item.key + '' ? "primary" : undefined}
                    onClick={() => {
                        if (selectedBtn + '' === item.key + '') {

                        } else {
                            let data = 0
                            let type = ''
                            switch (item.key) {
                                case 1:
                                    type = 'day'
                                    this.setState({
                                        day: day
                                    })
                                    break
                                case 2:
                                    type = 'week'
                                    data = 7
                                    break
                                case 3:
                                    type = 'month'
                                    data = 30
                                    break
                                case 4:
                                    break
                            }
                            this.setState({
                                selectedBtn: item.key,
                                type: type,
                                selDay: data
                            }, () => {
                                this.getLineChart()
                                this.getOverView()
                            })
                        }

                    }}
                >{item.text}</Button>
            </Col>
        })}
        </Row>
        const columns = [
            {
                title: 'url',
                dataIndex: 'url',
                key: 'url',
                render: (url: string) => <a style={{ color: selUrl === url ? "" : "#000000a6" }}>{url}</a>,
                ellipsis: true,
            }

        ];
        //
        const onChange = (date: any, dateString: any) => {
            this.setState({
                day: dateString,
                selDay: 0,
                selectedBtn: ''
            }, () => {
                this.getLineChart()
                this.getOverView()
            })

        }



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
                                <Col xs={24} md={24} lg={8} xl={8}>
                                    <Space direction="vertical" size="middle">
                                        <DatePicker onChange={onChange} />
                                        {operations}
                                        <Table
                                            onRow={(record: any) => {
                                                return {
                                                    onClick: event => {
                                                        this.setState({
                                                            selUrl: record.url
                                                        }, () => {
                                                            this.getLineChart()
                                                            this.getOverView()
                                                        })
                                                    }, // 点击行
                                                };
                                            }}
                                            columns={columns} dataSource={urlList} />
                                    </Space>

                                </Col>
                                <Col md={24} lg={16} xl={16}>
                                    {/* 分组层叠柱状图 */}
                                    <Card size="small" title="页面加载时间详情 " bordered={false}>
                                        <LineChart
                                            data={histogram}
                                            legend={{
                                                visible: true,
                                                position: 'bottom-center',
                                                flipPage: true
                                            }}
                                            description={{
                                                visible: true,
                                                text: '单位:ms',
                                            }}
                                            xField='year'
                                            yField='value'
                                            seriesField="type"
                                        />
                                    </Card>
                                    <Card size="small" title="页面加载瀑布图 " bordered={false}>
                                        <WaterfallChart
                                            data={waterfall}
                                            forceFit
                                            height={500}
                                            padding={[20, 20, 20, 20]}
                                            xField='type'
                                            yField='time'
                                            description={{
                                                visible: true,
                                                text: '单位:ms',
                                            }}
                                            showTotal={{ visible: false, label: "" }}
                                            meta={{
                                                type: {
                                                    alias: '类别',
                                                },
                                                time: {
                                                    alias: '时间',
                                                },
                                            }}
                                        />

                                    </Card>
                                </Col>

                            </Row>

                        </Col>
                    </Row>

                </div>
            </div >


        );
    }
}
export default Performance