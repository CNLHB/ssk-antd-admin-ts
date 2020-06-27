import React, { Component } from "react";
import { Table, Space, Modal, Input, Row, Col, Tag, Form, message } from 'antd';
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'stores/models/breadcrumb/index'
import { FormInstance } from 'antd/lib/form';
import { get, post, putParm } from 'config/api/axios'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import time from 'utils/time'
const { confirm } = Modal;
interface UserListProps {
    breadStore: BreadInterface
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};


@inject("breadStore")
@observer
class CategoryList extends Component<UserListProps> {
    formRef = React.createRef<FormInstance>();
    state = {
        data: [],
        selectedRowKeys: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        selectedCategory: -2,
        visible: false,
        category: []
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    onGenderChange = () => {
        this.formRef.current?.setFieldsValue({
            name: "",
            cDesc: ""
        });
    };
    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    getCategory = async () => {
        let data = await get('category/list')

        this.setState({
            category: data
        })
    }
    componentDidMount() {
        const { pagination } = this.state;
        this.getCategory()
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
        let result = await get('category/list')
        let items = result.map((item: any) => {
            return {
                key: item.id,
                id: item.id,
                name: item.name,
                status: item.status,
                createTime: time.gettime(item.createTime),
                action: [{ id: item.id, text: item.status === true ? "冻结" : "解冻" }, { id: item.id, text: "详情" }]
            }
        })
        this.setState({
            loading: false,
            data: items,
            pagination: {
                ...params.pagination,
                total: result.length,
            },
        });
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
                render: (id: any) => `${id}`,
                width: 50,
            },
            {
                title: '分类名',
                dataIndex: 'name',
                render: (name: any) => `${name}`,
                width: '15%',
            },
            // {
            //     title: '发布人',
            //     dataIndex: 'uName',
            //     render: (phone: any) => `${phone}`,
            //     width: 120,
            // },

            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: 120,
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status: any) => (
                    <>
                        {
                            status === true ?
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
                                    </Button>)) : (<Button type="primary" key={index} onClick={() => { message.info("敬请期待") }}>
                                        {item.text}
                                    </Button>)


                            })}
                        </Space>


                    </>
                )
            },
        ];
        const onFinish = async (values: any) => {
            console.log('Success:', values);
            post('category', values)
            this.setState({
                visible: false,
            });
            const { pagination } = this.state;
            this.fetch({ pagination });
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const showConfirm = (obj: object) => {
            confirm({
                title: '确定要执行操作吗?',
                icon: <ExclamationCircleOutlined />,
                okText: '确定',
                cancelText: '返回',
                onOk: () => {
                    putParm('category', obj).then(() => {
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
                <Row style={{ padding: 24, width: "100%" }}>
                    <div
                        style={{ width: "100%", minHeight: 460, backgroundColor: '#FFFFFF' }}
                    >

                        <Row style={{ padding: 12 }}>
                            <Modal
                                title="新建分类"
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
                                        label="分类名称"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your 分类名称!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="分类描述"
                                        name="cDesc"
                                        rules={[{ required: false, message: 'Please input your 分类描述!' }]}
                                    >
                                        <Input />
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
                            <Space>
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
export default CategoryList;
