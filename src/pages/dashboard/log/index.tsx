import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import { Tabs, Table } from 'antd';
import { get } from 'config/api/axios'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import time from 'utils/time'
interface LogProps {
    breadStore: BreadInterface
}
const { TabPane } = Tabs;

@inject("breadStore")
@observer
class Log extends Component<LogProps, {}> {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    }
    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination })
    }

    handleTableChange = (pagination: any) => {
        this.fetch({
            pagination
        });
    };
    getRandomuserParams = (params: any) => {
        return {
            results: params.pagination.pageSize,
            page: params.pagination.current,
            ...params,
        };
    };
    fetch = async (params: any) => {
        this.setState({ loading: true });
        let data = this.getRandomuserParams(params)
        let result = await get(`login/log?page=${data.pagination.current}&rows=${data.pagination.pageSize}`)
        if (result.items !== null) {
            let items = result.items.map((item: any, index: number) => {
                return {
                    id: item.id,
                    index: index + 1,
                    account: item.account,
                    name: item.name,
                    adress: item.adress ? item.adress : "未知地点",
                    time: time.getAlltime(item.createTime)
                }
            })
            this.setState({
                loading: false,
                data: items,
                pagination: {
                    ...params.pagination,
                    total: result.total,
                },
            });
        } else {
            this.setState({
                loading: false
            });
        }
    };
    render() {
        const { breadTitle } = this.props.breadStore!
        const { data, pagination, loading } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                render: (index: any) => ` ${index}`,
                width: 60,
                ellipsis: true,
            },
            {
                title: '账号',
                dataIndex: 'account',
                width: 120,
                ellipsis: true,

            },
            {
                title: '用户名',
                dataIndex: 'name',
                width: 120,
                ellipsis: true,

            },
            {
                title: '登录地点',
                dataIndex: 'adress',
                width: 120,
                ellipsis: true,
            },
            {
                title: '登录时间',
                dataIndex: 'time',
                width: 150,
                ellipsis: true,
            }
        ];

        return (
            <div>
                <PageBread bread={breadTitle}></PageBread>

                <div
                    className="site-layout-background"
                    style={{ padding: 24, margin: 24, minHeight: 460 }}
                >

                    <Tabs
                    // tabBarExtraContent={operations}
                    >
                        <TabPane tab="登录日志" key="1">
                            <Table
                                style={{ width: "100%", overflowX: "auto" }}
                                columns={columns}
                                rowKey={(record: any) => record.id}
                                dataSource={data}
                                pagination={pagination}
                                loading={loading}
                                onChange={this.handleTableChange}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>


        );
    }
}
export default Log;
