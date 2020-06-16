import React from "react";
import { Drawer } from "antd";
import NavMenu from 'components/menu/index'
import MenuLogo from 'components/menu-logo/index'
import { ThemeColorType } from 'stores/models/theme/index'
interface DrawerProps {
    visible: boolean;
    theme: ThemeColorType
    onClose(): void
    setBreadTitle(titleArr: string[]): void
}

class DrawerSider extends React.Component<DrawerProps, {}> {


    render() {
        const { visible, onClose, theme, setBreadTitle } = this.props
        return (
            <Drawer
                placement="left"
                closable={true}
                onClose={() => onClose()}
                visible={visible}

                bodyStyle={{
                    paddingRight: 0,
                    paddingLeft: 0,
                    backgroundColor: theme === "light" ? "#FFFFFF" : "#001529"
                }}
            >
                <MenuLogo></MenuLogo>
                <NavMenu theme={theme} setBreadTitle={setBreadTitle}></NavMenu>
            </Drawer >
        );
    }
}
export default DrawerSider;
