import React from 'react'
import navLogo from "assets/images/logo-ant.svg";
const MenuLogo: React.FC<{}> = () => {
    return (
        <div className="sider-logo">
            <img
                src={navLogo}
                alt="nav-log"
                className="mock-block"
                style={{ height: "100%" }}
            />
            <h1 className="logo-h">ssk admin</h1>
        </div>
    )
}
export default MenuLogo