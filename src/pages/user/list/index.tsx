import React, { Component } from "react";
import { Table, Space, Modal, Form, Input, Radio, Row, Col, Tag, Avatar, message } from 'antd';
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { get, post, putParm } from 'config/api/axios'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { getRandomName, getMoble } from 'utils/createInfo'
const { confirm } = Modal;
interface UserListProps {
    breadStore: BreadInterface
}
const { Search } = Input;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};
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
    formRef = React.createRef<FormInstance>();
    state = {
        data: [],
        selectedRowKeys: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        visible: false,
        loading: false,
    };

    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination });
        this.formRef.current?.setFieldsValue({
            userName: getRandomName(5),
            phoneNumber: getMoble() + '',
            gender: '0'

        });
    }
    onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    };
    handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };
    showModal = () => {
        this.formRef.current?.setFieldsValue({
            userName: getRandomName(5),
            phoneNumber: getMoble() + '',
            gender: '0'

        });
        this.setState({
            visible: true,
        });

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
    onGenderChange = () => {
        this.formRef.current?.setFieldsValue({
            userName: "",
            phoneNumber: ""
        });
    };
    fetch = async (params: any, value?: string | null) => {
        this.setState({ loading: true });
        value = value === undefined ? "" : value
        let data = getRandomuserParams(params)
        let result = await get(`user/v2/list?page=${data.pagination.current}&rows=${data.pagination.pageSize}&search=${value}`)
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
        }
        const onFinish = async (values: any) => {
            post('user/register/v2', values)
            this.setState({
                visible: false,
            });
            const { pagination } = this.state;
            this.fetch({ pagination });
        };
        const onFinishFailed = (errorInfo: any) => {
        };

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                sorter: true,
                render: (id: any) => `${id}`,
                width: 70,
                ellipsis: true,
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
                                    </Button>)) : (<Button type="primary" key={index} onClick={() => { message.info("敬请期待") }}>
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
                        message.success("操作成功")
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
                                <Modal
                                    title="新建用户(自动生成机器人账号)"
                                    visible={this.state.visible}
                                    footer={null}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                >
                                    <Form
                                        {...layout}
                                        name="basic"
                                        onFinish={onFinish}
                                        ref={this.formRef}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="用户昵称"
                                            name="userName"
                                            rules={[{ required: true, message: 'Please input your 用户昵称!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="手机号码"
                                            name="phoneNumber"
                                            rules={[{ required: true, message: 'Please input your 手机号码!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="gender" label="用户性别">
                                            <Radio.Group>
                                                <Radio value="0">男</Radio>
                                                <Radio value="1">女</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>
                                            <Space>
                                                <Button htmlType="button" onClick={this.onGenderChange}>
                                                    重置
                                        </Button>
                                                <Button type="primary" htmlType="submit">
                                                    提交
                                          </Button>
                                            </Space>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                <Button
                                    type="primary"
                                    onClick={this.showModal}
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
