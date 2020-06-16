import React from 'react';
import CommonMargin from 'components/common/common-margin'
import { inject, observer } from 'mobx-react'
import { AdminInterface } from "stores/models/user/user";
// import InfiniteScroll from '@types/react-infinite-scroller';
// import time from 'utils/time'
interface Props {
    adminStore?: AdminInterface //  这里比较关键 ？表示可或缺，如果没有就会报错。
}



@inject("adminStore")
@observer
class AccountSetting extends React.Component<Props, {}> {
    state = {
        loading: false,
        topic: [],
        title: []
    };
    async componentDidMount() {

    }
    render() {
        const { loading } = this.state;
        const { admin, title, topic } = this.props.adminStore!

        return (
            <CommonMargin>
                center
            </CommonMargin >

        );
    }
}
export default AccountSetting