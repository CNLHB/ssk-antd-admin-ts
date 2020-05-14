import React from "react";
import { Button } from "antd";
import "./App.css";
import styles from "./Button.module.less"; // 将 css modules 文件导入为 styles
const App: React.FC<{}> = () => (
  <div className="App">
    <Button type="primary">Button</Button>
    <span className={styles.error}>22</span>
  </div>
);

export default App;
