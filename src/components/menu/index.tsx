import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuConfig from "config/menu/munuConfig";
import { inject, observer } from 'mobx-react'
import { ThemeInterface } from "models/theme/index";
import { Menu } from "antd";
const { SubMenu } = Menu;
interface UserAppProps {
    themeStore?: ThemeInterface; //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
@inject("themeStore")
@observer
export default class NavMenu extends Component<UserAppProps, { menuTreeNode: any }> {
    renderMenu = (data: any) => {
        return data.map((item: any) => {
            if (item.children) {
                return (
                    <SubMenu
                        title={
                            <span>
                                {item.icon}
                                <span>{item.title}</span>
                            </span>
                        }
                        key={item.key}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <Link to={item.key}>
                        {item.icon}
                        {item.title}
                    </Link>
                </Menu.Item>
            );
        });
    };
    render() {
        const { theme } = this.props.themeStore!;
        function handleClick(e: any) {
            console.log("click", e);
        }
        return (
            <div>
                <Menu onClick={handleClick} mode="inline" theme={theme}>
                    {this.renderMenu(menuConfig)}
                </Menu>
            </div>
        );
    }
}
