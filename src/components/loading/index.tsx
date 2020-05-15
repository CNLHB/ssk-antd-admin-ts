import React from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
const Loading: React.FC<{}> = () => {
  return (
    <div className={styles.example}>
      <Spin tip="Loading..."></Spin>
    </div>
  );
};
export default Loading;
