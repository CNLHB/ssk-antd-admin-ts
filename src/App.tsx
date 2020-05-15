import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.less";
import Loading from "components/loading/index";
import Setting from "components/setting/index";
import ContentArea from "layout/content/index";
import LayoutApp from "layout/index/index";
import { AppRoutes, RouteType } from "router/index";
class App extends Component<{}, { collapsed: boolean; theme: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      theme: "light",
    };
  }
  toggleTheme = (theme: string) => {
    console.log(theme);

    if (this.state.theme === theme) return;
    this.setState({
      theme: theme === "light" ? "light" : "dark",
    });
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  renderRouter = (router: any) => {
    return router.map((item: RouteType) => {
      if (item.children && item.children.length > 0) {
        return (
          <Route
            path={item.pathname}
            exact={item.exact}
            key={item.pathname}
            // component={item.component}
            render={() => {
              return (
                <LayoutApp theme={this.state.theme}>
                            <ContentArea><Switch>{this.renderRouter(item.children)}</Switch></ContentArea>
                  
                </LayoutApp>
              );
            }}
          />
        );
      }
      return (
        <Route
          path={item.pathname}
          exact={item.exact}
          key={item.pathname}
          component={item.component}
        />
      );
    });
  };
  render() {
    return (
      <Router>
        <Switch>
          <Suspense fallback={<Loading />}>
                 <Setting toggleTheme={this.toggleTheme}></Setting>   
            {this.renderRouter(AppRoutes)}
          </Suspense>
        </Switch>
      </Router>
    );
  }
}
//  <div className="app-header">
//   <Setting toggleTheme={this.toggleTheme}></Setting>
//   <Layout theme={this.state.theme}></Layout>
// </div>
export default App;
