import React, { Component } from "react";
import { Table, Space, Modal, Input, Row, Col, Tag, Avatar } from 'antd';
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { get, putParm } from 'config/api/axios'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
interface UserListProps {
    breadStore: BreadInterface
}
const { Search } = Input;
// const suffix = (
//     <AudioOutlined
//         style={{
//             fontSize: 16,
//             color: '#1890ff',
//         }}
//     />
// );



const getRandomuserParams = (params: any) => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    };
};
@inject("breadStore")
@observer
class UserList extends Component<UserListProps> {
    state = {
        data: [],
        selectedRowKeys: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
    };

    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination });
    }
    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    };
    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };
    handleSearchChange = (value: any) => {
        const { pagination } = this.state;
        this.fetch({ pagination }, value);
    };
    fetch = async (params: any, value?: string | null) => {
        this.setState({ loading: true });
        value = value === undefined ? "" : value
        console.log(getRandomuserParams(params))
        let data = getRandomuserParams(params)
        let result = await get(`user/v2/list?page=${data.pagination.current}&rows=${data.pagination.pageSize}&search=${value}`)
        console.log(result)
        if (result.items !== null) {
            let items = result.items.map((item: any) => {
                return {
                    key: item.id,
                    id: item.id,
                    name: item.userName,
                    phone: item.phoneNumber,
                    email: item.email,
                    url: item.authorUrl,
                    gender: item.gender === 0 ? "男" : "女",
                    status: item.status,
                    action: [{ id: item.id, text: item.status === false ? "冻结" : "解冻" }, { id: item.id, text: "详情" }]
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
                loading: false,
                data: [],
                pagination: {
                    ...params.pagination,
                    total: 0,
                },
            });
        }


    };

    render() {
        const { data, pagination, loading, selectedRowKeys } = this.state;
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
                title: '昵称',
                dataIndex: 'name',
                render: (name: any) => `${name}`,
                width: 120,
                ellipsis: true,
            },
            {
                title: '头像',
                dataIndex: 'url',
                render: (url: any) => <Avatar src={url}></Avatar>,
                width: 80,
                ellipsis: true,
            },
            {
                title: '手机',
                dataIndex: 'phone',
                render: (phone: any) => `${phone}`,
                width: 120,
            },
            {
                title: '性别',
                dataIndex: 'gender',
                // filters: [
                //     { text: 'Male', value: 'male' },
                //     { text: 'Female', value: 'female' },
                // ],
                width: 60,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
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
                                    正常使用
                        </Tag> :
                                <Tag color="red">
                                    账号已冻结
                        </Tag>}

                    </>
                )
            },
            {
                title: '操作',
                dataIndex: "action",
                key: "action",
                width: 180,
                ellipsis: true,
                render: (action: any) => (
                    <>
                        <Space>
                            {action.map((item: any, index: number) => {
                                return index === 0 ? (item.text === "解冻" ?
                                    (<Button type="primary" key={index} onClick={() => {
                                        showConfirm({
                                            ids: [item.id],
                                            freeze: false
                                        })
                                    }}>
                                        {item.text}
                                    </Button>) : (<Button type="primary" danger key={index} onClick={() => {
                                        showConfirm({
                                            ids: [item.id],
                                            freeze: true
                                        })
                                    }}>
                                        {"冻结"}
                                    </Button>)) : (<Button type="primary" key={index} onClick={() => { }}>
                                        {item.text}
                                    </Button>)


                            })}
                        </Space>


                    </>
                )
            },
        ];
        const showConfirm = (obj: object) => {
            confirm({
                title: '确定要执行操作吗?',
                icon: <ExclamationCircleOutlined />,
                okText: '确定',
                cancelText: '返回',
                onOk: () => {
                    putParm('user/freeze', obj).then(() => {
                        const { pagination } = this.state;
                        this.fetch({ pagination });
                    })
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
                    <div
                        style={{ width: "100%", minHeight: 460, backgroundColor: '#FFFFFF' }}
                    >

                        <Row style={{ padding: 12 }}>
                            <Space>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                >
                                    新建
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
export default UserList;
