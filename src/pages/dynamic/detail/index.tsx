import React, { Component } from "react";
import { Table, Space, Modal, Input, Row, Col, Tag, Divider, message } from 'antd';
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { Menu, Dropdown, Button } from 'antd';
import './index.less'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';
import { topicActiveList, getDynamicList, freezeTopic } from 'xhr/api/dyncmic/list'
import { getCategoryList } from 'xhr/api/common/index'

const { confirm } = Modal;
interface UserListProps {
    breadStore: BreadInterface
}
const { Search } = Input;



const getRandomuserParams = (params: any) => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    };
};
@inject("breadStore")
@observer
class DynamicList extends Component<UserListProps> {
    state = {
        data: [],
        selectedRowKeys: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        selectedCategory: -2,
        category: [],
        value: ""
    };

    componentDidMount() {
        const { pagination, selectedCategory } = this.state;
        this.fetch({ pagination }, '', selectedCategory);
        this.getCategory()
    }
    getCategory = async () => {
        let data = await getCategoryList()

        this.setState({
            category: data
        })
    }
    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });

    };
    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const { selectedCategory, value } = this.state
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        }, value, selectedCategory);
    };
    handleSearchChange = (value: any) => {
        const { pagination, selectedCategory } = this.state;
        this.setState({
            value: value,
            pagination: {
                current: 1,
                pageSize: 10,
            }
        }, () => {
            this.fetch({ pagination }, value, selectedCategory);
        })
    };
    fetch = async (params: any, value?: string | null, cid?: number | null) => {
        this.setState({ loading: true });
        value = value === undefined ? "" : value
        let cid1 = (cid === -1 || cid === -2) ? "" : cid
        let data = getRandomuserParams(params)
        let result = await getDynamicList(data.pagination.current, data.pagination.pageSize, value, cid1)
        this.setState({
            loading: false,
            data: result.items,
            pagination: {
                ...params.pagination,
                total: result.total,
            },
        });


    };

    render() {
        const { data, pagination, loading, selectedRowKeys, category, selectedCategory } = this.state;
        const { breadTitle } = this.props.breadStore!
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        function handleMenuClick(e: any) {
            // message.info('Click on menu item.');
            console.log('click', e);
        }
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                sorter: true,
                render: (id: any) => `${id}`,
                width: 50,
            },
            {
                title: '分类名',
                dataIndex: 'cName',
                render: (name: any) => `${name}`,
                width: 120,
                ellipsis: true,
            },
            {
                title: '发布人',
                dataIndex: 'uName',
                render: (phone: any) => `${phone}`,
                width: 120,
                ellipsis: true,
            },
            {
                title: '内容',
                dataIndex: 'content',
                ellipsis: true,
            },
            {
                title: '获赞',
                dataIndex: 'like',
                width: 80,
                ellipsis: true,
            },
            {
                title: '发布时间',
                dataIndex: 'createTime',
                width: 120,
                ellipsis: true,
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: 120,
                ellipsis: true,
                render: (status: any) => (
                    <>
                        {
                            status === false ?
                                <Tag color="blue">
                                    正常显示
                        </Tag> :
                                <Tag color="red">
                                    动态已冻结
                        </Tag>}

                    </>
                )
            },
            {
                title: '操作',
                dataIndex: "action",
                key: "action",
                ellipsis: true,
                width: 180,
                render: (action: any) => (
                    <>
                        <Space>
                            {action.map((item: any, index: number) => {
                                return index === 0 ? (item.text === "解冻" ?
                                    (<Button type="primary" key={index} onClick={() => {
                                        showConfirm({
                                            ids: [item.id],
                                            freeze: true
                                        })
                                    }}>
                                        {item.text}
                                    </Button>) : (<Button type="primary" danger key={index} onClick={() => {
                                        showConfirm({
                                            ids: [item.id],
                                            freeze: false
                                        })
                                    }}>
                                        {"冻结"}
                                    </Button>)) : (
                                        <Button type="primary" key={index} onClick={() => { message.info("敬请期待") }}>
                                            {item.text}
                                        </Button>)


                            })}
                        </Space>


                    </>
                )
            },
        ];
        const showConfirm = (obj: object, index?: number) => {
            confirm({
                title: '确定要执行操作吗?',
                icon: <ExclamationCircleOutlined />,
                okText: '确定',
                cancelText: '返回',
                onOk: async () => {
                    if (index) {
                        let result = await topicActiveList(obj)
                        if (result.code === 0) {
                            message.success("操作成功")
                            const { pagination, selectedCategory, value } = this.state;
                            this.fetch({ pagination }, value, selectedCategory);
                        } else {
                            message.error("操作失败")
                        }
                        return
                    }
                    let result = await freezeTopic(obj)
                    if (result.code === 0) {
                        message.success("操作成功")
                        const { pagination, selectedCategory, value } = this.state;
                        this.fetch({ pagination }, value, selectedCategory);
                    } else {
                        message.error("操作失败")
                    }

                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1" onClick={() => {
                    showConfirm({
                        ids: selectedRowKeys,
                        freeze: false
                    })
                }}>
                    批量冻结
             </Menu.Item>
                <Menu.Item key="2" onClick={() => {
                    showConfirm({
                        ids: selectedRowKeys,
                        freeze: true
                    })
                }}>
                    批量解冻
            </Menu.Item>
                <Menu.Item key="3" onClick={() => {
                    showConfirm({
                        ids: selectedRowKeys
                    }, 3)
                }}>
                    一键点赞
            </Menu.Item>
            </Menu>
        );
        return (
            <Row >
                <Col span={24}>
                    <PageBread bread={breadTitle}></PageBread>

                </Col>
                <Col span={24}>
                    <div className="searchBox">
                        <Row justify="center">
                            <Col xs={20} md={20} lg={16} xl={12}>
                                <Search
                                    placeholder="请输入"
                                    enterButton="搜索"
                                    size="large"
                                    onSearch={value => this.handleSearchChange(value)}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Row style={{ padding: 24, width: "100%" }}>
                    <Row style={{ padding: 24, marginBottom: 24, backgroundColor: "#FFF", width: "inherit" }}>
                        <Row align="middle" gutter={[12, 12]}>
                            <Col>所属类目:</Col>
                            <Col >
                                <Button
                                    type={selectedCategory === -2 ? "primary" : undefined}
                                    onClick={() => {
                                        if (selectedCategory !== -2) {
                                            this.setState({
                                                selectedCategory: -2,
                                                pagination: {
                                                    current: 1,
                                                    pageSize: 10,
                                                }
                                            }, () => {
                                                const { pagination, selectedCategory } = this.state;
                                                this.fetch({ pagination }, '', selectedCategory);
                                            })
                                        } else {
                                            this.setState({
                                                selectedCategory: -1,
                                                pagination: {
                                                    current: 1,
                                                    pageSize: 10,
                                                }
                                            }, () => {
                                                const { pagination, selectedCategory } = this.state;
                                                this.fetch({ pagination }, '', selectedCategory);
                                            })
                                        }

                                    }}
                                >
                                    全部
                            </Button></Col>

                            {category.map((item: any) => {
                                return <Col
                                    key={item.id}
                                >
                                    {item.id !== selectedCategory ? <Button
                                        onClick={() => {
                                            this.setState({
                                                selectedCategory: item.id,
                                                pagination: {
                                                    current: 1,
                                                    pageSize: 10,
                                                }
                                            }, () => {
                                                const { pagination, selectedCategory } = this.state;
                                                this.fetch({ pagination }, '', selectedCategory);
                                            })
                                        }}
                                    >
                                        {item.name}
                                    </Button> : <Button
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                selectedCategory: -1,
                                                pagination: {
                                                    current: 1,
                                                    pageSize: 10,
                                                }
                                            }, () => {
                                                const { pagination, selectedCategory } = this.state;
                                                this.fetch({ pagination }, '', selectedCategory);
                                            })
                                        }}
                                    >
                                            {item.name}
                                        </Button>}
                                </Col>

                            })}
                        </Row>
                        <Divider />

                    </Row>
                    <div
                        style={{ width: "100%", minHeight: 460, backgroundColor: '#FFFFFF' }}
                    >

                        <Row style={{ padding: 12 }}>
                            <Space>
                                <Button
                                >
                                    动态管理
                         </Button>
                                {selectedRowKeys.length > 0 ? <Dropdown overlay={menu}>
                                    <Button>
                                        批量操作 <DownOutlined />
                                    </Button>
                                </Dropdown> : null}

                            </Space>

                        </Row>
                        <Row >
                            <Col span={24}>
                                <Table
                                    style={{ width: "100%", overflowX: "auto" }}
                                    columns={columns}
                                    rowKey={(record: any) => record.key}
                                    rowSelection={rowSelection}
                                    dataSource={data}
                                    pagination={pagination}
                                    loading={loading}
                                    onChange={this.handleTableChange}
                                />
                            </Col>

                        </Row>


                    </div>
                </Row>


            </Row >

        );
    }
}
export default DynamicList;
