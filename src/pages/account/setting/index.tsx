import React, { Component } from 'react';
import { Menu } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.module.less';
import { inject, observer } from 'mobx-react'
import { AdminInterface } from "stores/models/user/user";
import CommonMargin from 'components/common/common-margin'

const { Item } = Menu;

interface SettingsProps {
    adminStore?: AdminInterface //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
interface SettingsState {
    mode: 'inline' | 'horizontal';
    menuMap: {
        [key: string]: React.ReactNode;
    };
    selectKey: SettingsStateKeys;
}
@inject("adminStore")
@observer
class Settings extends Component<SettingsProps, SettingsState> {
    main: HTMLDivElement | undefined = undefined;
    constructor(props: SettingsProps) {
        super(props);
        const menuMap = {
            base: (
                <div>基本设置</div>
            ),
            security: (
                <div>安全设置</div>

            ),
            // binding: (
            //     <div>账号绑定</div>

            // ),
            // notification: (
            //     <div>新消息通知</div>

            // ),
        };
        this.state = {
            mode: 'inline',
            menuMap,
            selectKey: 'base',
        };
    }

    componentDidMount() {

        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    getMenu = () => {
        const { menuMap } = this.state;
        return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
    };

    getRightTitle = () => {
        const { selectKey, menuMap } = this.state;
        return menuMap[selectKey];
    };

    selectKey = (key: SettingsStateKeys) => {
        this.setState({
            selectKey: key,
        });
    };

    resize = () => {
        if (!this.main) {
            return;
        }
        requestAnimationFrame(() => {
            if (!this.main) {
                return;
            }
            let mode: 'inline' | 'horizontal' = 'inline';
            const { offsetWidth } = this.main;
            if (this.main.offsetWidth < 641 && offsetWidth > 400) {
                mode = 'horizontal';
            }
            if (window.innerWidth < 768 && offsetWidth > 400) {
                mode = 'horizontal';
            }
            this.setState({
                mode,
            });
        });
    };

    renderChildren = () => {
        const { adminStore } = this.props;
        const { selectKey } = this.state;
        switch (selectKey) {
            case 'base':
                return <BaseView adminStore={adminStore} />;
            case 'security':
                return <SecurityView />;
            case 'binding':
                return <BindingView />;
            case 'notification':
                return <NotificationView />;
            default:
                break;
        }

        return null;
    };

    render() {

        const { mode, selectKey } = this.state;
        return (
            <CommonMargin>
                <div
                    className={styles.main}
                    ref={(ref) => {
                        if (ref) {
                            this.main = ref;
                        }
                    }}
                >
                    <div className={styles.leftMenu}>
                        <Menu
                            mode={mode}
                            selectedKeys={[selectKey]}
                            onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
                        >
                            {this.getMenu()}
                        </Menu>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.title}>{this.getRightTitle()}</div>
                        {this.renderChildren()}
                    </div>
                </div>
            </CommonMargin>

        );
    }
}

export default Settings