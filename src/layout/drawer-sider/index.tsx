import React from "react";
import { Drawer } from "antd";
import NavMenu from 'components/menu/index'
import MenuLogo from 'components/menu-logo/index'
interface DrawerProps {
    visible: boolean;
    onClose(): void
}

class DrawerSider extends React.Component<DrawerProps, {}> {


    render() {
        const { visible, onClose } = this.props
        return (
            <Drawer
                placement="left"
                closable={true}
                onClose={() => onClose()}
                visible={visible}
                bodyStyle={{
                    paddingRight: 0
                }}
            >
                <MenuLogo></MenuLogo>
                <NavMenu></NavMenu>
            </Drawer >
        );
    }
}
export default DrawerSider;
