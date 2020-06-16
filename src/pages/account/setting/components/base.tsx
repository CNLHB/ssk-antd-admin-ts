import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, message } from 'antd';
import React, { Component } from 'react';
import { AdminInterface } from "stores/models/user/user";
import { CurrentUser } from '../data.d';
// import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
import styles from './BaseView.module.less';
// import dataCity from '../geographic/city.json'
// import dataProvince from '../geographic/province.json'
import { put, base } from 'config/api/axios'
// const { Option } = Select;
const props = {
    name: 'file',
    action: base + "upload/cloud",
    headers: {
        authorization: 'authorization-text',
    },
}
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar, updateInfo }: { avatar: string, updateInfo(admin: string): void }) => (
    <>
        <div className={styles.avatar_title}>
            <span>头像</span>
        </div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload
            showUploadList={false}
            {...props}
            onChange={function (info: any) {
                updateInfo(info.file.response)
            }}>
            <div className={styles.button_view}>
                <Button>
                    <UploadOutlined />
                    <span>更换头像</span>
                </Button>
            </div>
        </Upload>
    </>
);
// interface SelectItem {
//     label: string;
//     key: string;
// }

// const validatorGeographic = (
//     _: any,
//     value: {
//         province: SelectItem;
//         city: SelectItem;
//     },
//     callback: (message?: string) => void,
// ) => {
//     const { province, city } = value;
//     if (!province.key) {
//         callback('Please input your province!');
//     }
//     if (!city.key) {
//         callback('Please input your city!');
//     }
//     callback();
// };

// const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
//     const values = value.split('-');
//     if (!values[0]) {
//         callback('Please input your area code!');
//     }
//     if (!values[1]) {
//         callback('Please input your phone number!');
//     }
//     callback();
// };

interface BaseViewProps {
    currentUser?: CurrentUser;
    adminStore?: AdminInterface //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

class BaseView extends Component<BaseViewProps> {
    view: HTMLDivElement | undefined = undefined;
    state = {
        city: []
    }

    getAvatarURL() {
        const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        return url;
    }

    getViewDom = (ref: HTMLDivElement) => {
        this.view = ref;
    };

    handleFinish = async (values: any) => {
        const { admin } = this.props.adminStore!;
        values.authorUrl = admin.authorUrl
        let data = await put("user/info", values)
        if (data.code === 0) {
            message.success("更新基本信息成功")
        }
        if (data.code === 10004) {
            message.error("更新基本信息失败~~~")
            return
        }

    };

    render() {
        const { admin, updateInfo } = this.props.adminStore!;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.left}>
                    <Form
                        layout="vertical"
                        onFinish={this.handleFinish}

                        initialValues={admin}
                        hideRequiredMark
                    >
                        <Form.Item
                            name="email"
                            label={"邮箱"}
                            rules={[
                                {
                                    required: true,
                                    message: "必须填写正确的邮箱"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="userName"
                            label={"昵称"}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入密码"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label={"个人简介"}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入描述",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder={"个人简介"}
                                rows={4}
                            />
                        </Form.Item>
                        {/* <Form.Item
                            name="country"
                            label={"国家/地区"}
                            rules={[
                                {
                                    required: true,
                                    message: "请选择国家"
                                },
                            ]}
                        >
                            <Select style={{ maxWidth: 220 }}>
                                <Option value="China">中国</Option>
                            </Select>
                        </Form.Item> */}
                        {/* <Form.Item
                            name="geographic"
                            label={"所在省市"}
                            rules={[
                                {
                                    required: true,
                                    message: "请选择省市",
                                },
                                {
                                    validator: validatorGeographic,
                                },
                            ]}
                        >
                            <GeographicView province={dataProvince} city={currentCity} />
                        </Form.Item> */}
                        <Form.Item
                            name="phoneNumber"
                            label={"手机号"}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入手机号",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        {/* <Form.Item
                            name="phone"
                            label={""}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入正确的手机号码",
                                },
                                { validator: validatorPhone },
                            ]}
                        >
                            <PhoneView />
                        </Form.Item> */}
                        <Form.Item>
                            <Button htmlType="submit" type="primary">
                                更新基本信息
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView
                        updateInfo={updateInfo}
                        avatar={admin.authorUrl ? admin.authorUrl : this.getAvatarURL()} />
                </div>
            </div>
        );
    }
}

export default BaseView
