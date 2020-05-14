import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuConfig from "config/menu/munuConfig";
import { MenuUnfoldOutlined } from "@ant-design/icons";

import { Menu } from "antd";
const { SubMenu } = Menu;

export default class NavMenu extends Component<any, { menuTreeNode: any }> {
  renderMenu = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu
            title={
              <span>
                <MenuUnfoldOutlined />
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
          <Link to={"/admin" + item.key}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };
  render() {
    function handleClick(e: any) {
      console.log("click", e);
    }
    return (
      <div>
        <Menu onClick={handleClick} mode="inline" theme="dark">
          {this.renderMenu(menuConfig)}
        </Menu>
      </div>
    );
  }
}
