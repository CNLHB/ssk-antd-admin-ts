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
        key: "/dashboard",
        icon: <DashboardOutlined />,
        children: [
            {
                title: "登录日志",
                key: "/dashboard/log",
                icon: <SettingFilled />,
            },
            {
                title: "分析页",
                key: "/dashboard/analysis",
                icon: <SettingFilled />,
            },
            // {
            //     title: "监控页",
            //     key: "/dashboard/monitor",
            //     icon: <MonitorOutlined />,
            // },
            {
                title: "页面性能",
                key: "/dashboard/performance",
                icon: <SettingFilled />,
            },
            {
                title: "错误看板",
                key: "/dashboard/error",
                icon: <SettingFilled />,
            }
        ],
    },
    {
        title: "动态管理",
        key: "/dynamic",
        icon: <SettingFilled />,
        children: [
            {
                title: "动态趋势图",
                key: "/dynamic/chart",
                icon: <SettingFilled />,
            },
            {
                title: "动态分类",
                key: "/dynamic/category",
                icon: <SettingFilled />,
            },
            {
                title: "动态详情",
                key: "/dynamic/detail",
                icon: <SettingFilled />,
            },
        ],
    },
    {
        title: "话题管理",
        key: "/topic",
        icon: <SettingFilled />,
        children: [
            {
                title: "话题趋势",
                key: "/topic/chart",
            },
            {
                title: "话题列表",
                key: "/topic/list",
            }
        ],
    },
    {
        title: "用户管理",
        key: "/user",
        icon: <SettingFilled />,
        children: [
            {
                title: "用户趋势",
                key: "/user/trend",
            },
            {
                title: "用户列表",
                key: "/user/list",
            },
        ],
    },
    // {
    //     title: "交易管理",
    //     key: "/order",
    //     icon: <SettingFilled />,
    //     children: [
    //         {
    //             title: "订单详情",
    //             key: "/order/detail",
    //             icon: <DashboardOutlined />,
    //         },
    //         {
    //             title: "结束订单",
    //             key: "/order/finish",
    //             icon: <DashboardOutlined />,
    //         },
    //     ],
    // },
    // {
    //     title: "二手市场管理",
    //     key: "/two",
    //     icon: <SettingFilled />,
    //     children: [
    //         {
    //             title: "订单详情",
    //             key: "/two/detail",
    //             icon: <DashboardOutlined />,
    //         },
    //         {
    //             title: "结束订单",
    //             key: "/two/finish",
    //             icon: <DashboardOutlined />,
    //         },
    //     ],
    // },
    {
        title: "广告管理",
        key: "/bikeMap",
        icon: <SettingFilled />,
        children: [
            {
                title: "新增广告",
                key: "/bikeMapdetail",
                icon: <DashboardOutlined />,
            },
            {
                title: "广告列表",
                key: "/bikeMapfinish",
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
                title: "新增权限",
                key: "/permission/detail",
                icon: <DashboardOutlined />,
            },
            {
                title: "权限管理",
                key: "/permission/finish",
                icon: <DashboardOutlined />,
            },
        ],
    }, {
        title: "账号管理",
        key: "/account",
        icon: <SettingFilled />,
        children: [
            {
                title: "个人中心",
                key: "/account/center",
                icon: <SettingFilled />,
            },
            {
                title: "个人设置",
                key: "/account/settings",
                icon: <SettingFilled />,
            }
        ],
    },
];
export default menuList;
