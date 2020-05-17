import React, { Component } from "react";
import { observer, inject } from 'mobx-react'
import PageBread from 'components/page-breadcrumb/index'
import { BreadInterface } from 'models/breadcrumb/index'
interface MonitorProps {
    breadStore: BreadInterface
}

@inject("breadStore")
@observer
class Monitor extends Component<MonitorProps, {}> {
    render() {
        const { breadTitle } = this.props.breadStore!
        return (
            <div>
                <PageBread bread={breadTitle}></PageBread>

                <div
                    className="site-layout-background"
                    style={{ padding: 24, margin: 24, minHeight: 460 }}
                >

                    MonitorProps

                </div>
            </div>


        );
    }
}
export default Monitor