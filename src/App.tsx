import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.less";
import Layout from "layout/index/index";
class App extends Component<{}, { bg: string; collapsed: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      bg: "bg-red",
      collapsed: false,
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Router>
        <div className="app-header">
          <Layout></Layout>
        </div>

      </Router>
    );
  }
}

export default App;
