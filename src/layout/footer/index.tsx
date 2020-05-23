import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const FooterWrap: React.FC<{}> = () => {
    return (<Footer style={{ textAlign: "center" }} >
        {/* <div>HFB BF</div> */}
        ©2020 剑七团队技术部出品
    </Footer >);
};
export default FooterWrap