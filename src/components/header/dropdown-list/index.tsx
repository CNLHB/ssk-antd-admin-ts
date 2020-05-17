import React from "react";
import { Badge, Avatar, Dropdown} from "antd";
import DraopdownItem from '../dropdown-item/index'
import './index.less'
import {
    GlobalOutlined,
    MessageOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";


const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);



export default class DropdownItem extends React.Component<{}, {}> {
    render() {
        return (
            <div className="headerRight">
                <div className="header-hover" ><QuestionCircleOutlined /></div>
                <Dropdown className="header-hover badge" overlay={content} placement="bottomRight" trigger={['click']}>
                    <Badge offset={[-11, 0]} count={1}>
                        <span> <MessageOutlined /></span>
                    </Badge>
                </Dropdown>
                <Dropdown className="header-hover"
                    overlay={<DraopdownItem />}
                    overlayStyle={{ minWidth: 160 }}
                    placement="bottomRight">
                    <div>
                        <Avatar size={24} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <span className="text-center">Seven</span>
                    </div>
                </Dropdown>
                <Dropdown className="header-hover" overlay={<></>} placement="bottomRight">
                    <div>
                        <GlobalOutlined />
                    </div>
                </Dropdown>

            </div>

        );
    }
}
