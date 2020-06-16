import React from 'react';
import { Tabs, Row, Col, Skeleton, Avatar, Space, Card } from 'antd';
import CommonMargin from 'components/common/common-margin'
import { createFromIconfontCN, HomeOutlined } from '@ant-design/icons';
import styles from './center.module.less'
import { inject, observer } from 'mobx-react'
import { AdminInterface } from "stores/models/user/user";
// import InfiniteScroll from '@types/react-infinite-scroller';
// import time from 'utils/time'
const { Meta } = Card;
const { TabPane } = Tabs;
interface Props {
    adminStore?: AdminInterface //  这里比较关键 ？表示可或缺，如果没有就会报错。
}
const IconFont = createFromIconfontCN({
    scriptUrl: [
        "//at.alicdn.com/t/font_1768339_qoipdvoyez.js"
    ],
});
function callback(key: string) {
    console.log(key);
}


@inject("adminStore")
@observer
class AccountCenter extends React.Component<Props, {}> {
    state = {
        loading: true,
        topic: [],
        title: []
    };
    async componentDidMount() {
        const { getTitle, getTopic } = this.props.adminStore!

        await getTitle()
        await getTopic()
        this.setState({
            loading: false
        })
    }
    render() {
        const { loading } = this.state;
        const { admin, title, topic } = this.props.adminStore!

        return (
            <CommonMargin>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24} lg={7} >
                        <div className={styles.bgColor}>
                            <Row justify="center" className={styles.authorSize}>
                                <Avatar size={104} src={admin.authorUrl} />
                            </Row>
                            <Row justify="center" >
                                <span className={styles.userName}>{admin.userName}</span>
                            </Row>
                            <Row justify="center">
                                <span className={styles.userDesc}>{admin.description ? admin.description : "还没有描述~"}</span>
                            </Row>
                            <Row style={{ "paddingLeft": 24 }}>
                                <Col span={24}>
                                    <Space>
                                        <IconFont type="icon-shenfen" />{admin.occupation ? admin.occupation : "还没有定位职业~"}
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <IconFont type="icon-xingbie" />{admin.gender === 0 ? "男" : "女"}
                                    </Space>
                                </Col>

                                <Col span={24}>
                                    <Space>
                                        <HomeOutlined />{admin.address ? admin.address : "还没有地址~"}
                                    </Space>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={17} >
                        <div className={styles.bgColor}>
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="动态" key="1">
                                    <Row gutter={[16, 16]}>
                                        {topic.map((item: any) => {
                                            let image = item.images === '' ? "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" : item.images?.split(',')[0]
                                            return <Col xs={24} md={12} lg={8} xl={6} key={item.id}>
                                                <Card
                                                    style={{ width: "100%", minHeight: 120 }}
                                                    hoverable={true}
                                                    cover={
                                                        <img
                                                            alt="example"
                                                            style={{ height: 150 }}
                                                            src={image}
                                                        />
                                                    }
                                                >
                                                    <Meta
                                                        avatar={<Avatar src={item.userpic} />}
                                                        title={item.cName}
                                                        description={item.title}
                                                    />
                                                </Card>
                                            </Col>
                                        })}

                                    </Row>

                                </TabPane>
                                <TabPane tab="话题" key="2">

                                    <Row gutter={[16, 16]}>
                                        {
                                            title?.map((item: any) => {
                                                return <Col xs={24} md={12} lg={8} xl={6} key={item.id}>
                                                    <Card
                                                        style={{ width: "100%", minHeight: 120, height: "100%" }}
                                                        hoverable={true}
                                                    // actions={[
                                                    //     <SettingOutlined key="setting" />,
                                                    //     <EditOutlined key="edit" />,
                                                    //     <EllipsisOutlined key="ellipsis" />,
                                                    // ]}
                                                    >
                                                        <Skeleton loading={loading} avatar active>
                                                            <Meta
                                                                avatar={
                                                                    <Avatar src={item.titlePic} />
                                                                }
                                                                title={item.title}
                                                                description={item.description}
                                                            />
                                                        </Skeleton>
                                                    </Card>
                                                </Col>
                                            })
                                        }


                                    </Row>
                                </TabPane>
                                <TabPane tab="项目" key="3">
                                    <Row justify="center" >
                                        <span >敬请期待~</span>
                                    </Row>
                                </TabPane>
                            </Tabs>

                        </div>


                    </Col>

                </Row>
            </CommonMargin >

        );
    }
}
export default AccountCenter