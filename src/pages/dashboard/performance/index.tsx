import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Button, Card, DatePicker, Row, Table, Col, Space } from 'antd';
import { getUrlAPI, getOverViewAPI, getLineChartAPI } from 'xhr/api/dashboard/performance'

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

        let result = await getUrlAPI()

        this.setState({
            urlList: result,
            selUrl: result[0] ? result[0].url : ""
        })
        this.getLineChart()
        this.getOverView()
    }
    getLineChart = async () => {
        const { selUrl, day, selDay } = this.state;
        let result = await getLineChartAPI(selUrl, day, selDay);

        this.setState({
            histogram: result,
        })
    }


    getOverView = async () => {
        const { selUrl, day, type } = this.state;
        let result = await getOverViewAPI(selUrl, day, type)
        this.setState({
            waterfall: result
        })

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
                                <Col xs={24} md={24} lg={16} xl={16}>
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