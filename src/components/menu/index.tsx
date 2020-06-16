import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuConfig from "config/menu/munuConfig";
import { Menu } from "antd";
import { matchTitle } from 'config/menu/matchTitle'
import { ThemeColorType } from 'stores/models/theme/index'
const { SubMenu } = Menu;
interface MenuProps {
    theme?: ThemeColorType;
    setBreadTitle(titleArr: string[]): void
    //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
export default class NavMenu extends Component<MenuProps, { menuTreeNode: any }> {
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
                    <Link to={'/admin' + item.key}>
                        {item.icon}
                        {item.title}
                    </Link>
                </Menu.Item>
            );
        });
    };
    render() {
        const { theme, setBreadTitle } = this.props;
        function handleClick(e: any) {
            setBreadTitle(matchTitle[e.key])
            console.log("click", matchTitle[e.key]);
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
