import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuConfig from "config/menu/munuConfig";

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
          <Link to={"/admin" + item.key}>
            {item.icon}
            {item.title}
          </Link>
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
        <Menu onClick={handleClick} mode="inline" theme={this.props.theme}>
          {this.renderMenu(menuConfig)}
        </Menu>
      </div>
    );
  }
}
