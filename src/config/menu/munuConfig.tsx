import React from "react";
import {
    SettingFilled,
    DashboardOutlined,
    MonitorOutlined,
} from "@ant-design/icons";

export interface MenuType {
    title: string;
    key: string;
    icon?: any;
    children?: MenuType[];
}

const menuList: MenuType[] = [
    {
        title: "Dashbaord",
        key: "/admin/dashboard",
        icon: <DashboardOutlined />,
        children: [
            {
                title: "登录日志",
                key: "/admin/dashboard/log",
                icon: <SettingFilled />,
            },
            {
                title: "分析页",
                key: "/admin/dashboard/analysis",
                icon: <SettingFilled />,
            },
            {
                title: "监控页",
                key: "/admin/dashboard/monitor",
                icon: <MonitorOutlined />,
            },
            {
                title: "工作台",
                key: "/admin/dashboard/workplace",
                icon: <SettingFilled />,
            },
            {
                title: "通知提醒",
                key: "/ui/notification",
                icon: <SettingFilled />,
            },
            {
                title: "全局Message",
                key: "/ui/messages",
                icon: <SettingFilled />,
            },
            {
                title: "Tab页签",
                key: "/ui/tabs",
            },
            {
                title: "图片画廊",
                key: "/ui/gallery",
            },
            {
                title: "轮播图",
                key: "/ui/carousel",
            },
        ],
    },
    {
        title: "动态管理",
        key: "/form",
        icon: <SettingFilled />,
        children: [
            {
                title: "动态分类",
                key: "/form/login",
                icon: <SettingFilled />,
            },
            {
                title: "注册",
                key: "/form/reg",
                icon: <SettingFilled />,
            },
        ],
    },
    {
        title: "话题管理",
        key: "/charts",
        icon: <SettingFilled />,
        children: [
            {
                title: "柱形图",
                key: "/charts/bar",
            },
            {
                title: "饼图",
                key: "/charts/pie",
            },
            {
                title: "折线图",
                key: "/charts/line",
            },
        ],
    },
    {
        title: "用户管理",
        key: "/table",
        icon: <SettingFilled />,
        children: [
            {
                title: "基础表格",
                key: "/table/basic",
            },
            {
                title: "高级表格",
                key: "/table/high",
            },
        ],
    },
    {
        title: "个人页",
        key: "/rich",
        icon: <SettingFilled />,
        children: [
            {
                title: "柱形图",
                key: "/charts/bar",
                icon: <SettingFilled />,
            },
            {
                title: "饼图",
                key: "/charts/pie",
                icon: <SettingFilled />,
            },
            {
                title: "折线图",
                key: "/charts/line",
                icon: <DashboardOutlined />,
            },
        ],
    },
    {
        title: "城市管理",
        icon: <SettingFilled />,
        key: "/city",
        children: [
            {
                title: "订单详情",
                key: "detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "结束订单",
                key: "finish",
                icon: <DashboardOutlined />,
            },
        ],
    },
    {
        title: "交易管理",
        key: "/order",
        icon: <SettingFilled />,
        children: [
            {
                title: "订单详情",
                key: "detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "结束订单",
                key: "finish",
                icon: <DashboardOutlined />,
            },
        ],
    },
    {
        title: "二手市场管理",
        key: "/user",
        icon: <SettingFilled />,
        children: [
            {
                title: "订单详情",
                key: "detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "结束订单",
                key: "finish",
                icon: <DashboardOutlined />,
            },
        ],
    },
    {
        title: "广告管理",
        key: "/bikeMap",
        icon: <SettingFilled />,
        children: [
            {
                title: "订单详情",
                key: "detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "结束订单",
                key: "finish",
                icon: <DashboardOutlined />,
            },
        ],
    },

    {
        title: "权限设置",
        key: "/permission",
        icon: <SettingFilled />,
        children: [
            {
                title: "订单详情",
                key: "detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "结束订单",
                key: "finish",
                icon: <DashboardOutlined />,
            },
        ],
    },
];
export default menuList;