import React, { Component } from "react";
import { Layout } from "antd";
import { observer, inject } from 'mobx-react'
import { ThemeInterface } from "stores/models/theme/index";
import { ContentRoutes, renderRouter } from "router/index";
import styles from './index.module.less'
const { Content } = Layout;
interface ContentProps {
    themeStore?: ThemeInterface;
}


@inject("themeStore")
@observer
class ContentArea extends Component<ContentProps, {}> {
    render() {
        const { getContentTop } = this.props.themeStore!
        return (
            <Content style={{ ...getContentTop }} className={styles.contentAuto}>
                {renderRouter(ContentRoutes)}
            </Content>
        );
    }
}
export default ContentArea;
