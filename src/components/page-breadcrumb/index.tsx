import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb } from "antd";
import './index.less'



class PageBread extends Component<{ bread: string[] }, {}> {
    render() {
        const { bread = [] } = this.props
        // style={{ marginLeft: 2, }}
        return (
            <div className="site-page-header breadcrumb" >
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={"/"}> 首页</Link>
                    </Breadcrumb.Item>
                    {bread.map((item) => {
                        return <Breadcrumb.Item key={item}>
                            {item}
                        </Breadcrumb.Item>
                    })}
                </Breadcrumb>
            </div >
        );
    }
}
//log
export default PageBread;
