import React from "react";
import { Route, Switch, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import { RouteType } from "router/index";
import NoMatch from "pages/exception/404/index"
import { inject, observer } from 'mobx-react'
import { AdminInterface } from "stores/models/user/user";
export interface propsModel extends RouteComponentProps {
    config: RouteType[],
    adminStore?: AdminInterface // 
}
@inject("themeStore", "adminStore")
@observer
class FrontendAuth extends React.Component<any, propsModel>{
    componentDidMount() {
        const { location, history } = this.props;
        let { isLogin } = this.props.adminStore!
        const { pathname } = location;
        let { auth } = this.props.adminStore!
        // 如果该路由不用进行权限校验，登录状态下登陆页除外
        // 因为登陆后，无法跳转到登陆页
        // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
        if (!isLogin) {
            if (pathname === '/login') {
            } else {
                auth().then((res: boolean) => {
                    if (res) {
                        // history.push(pathname);
                    } else {
                        history.push("/login");
                    }
                })
            }

        }
        if (isLogin) {
            // 如果是登陆状态，想要跳转到登陆，重定向到主页
            if (pathname === '/login') {
                history.push("/");
            }
        }
    }
    render() {
        const { config } = this.props;

        return <Switch>
            {config.map((item: RouteType) => {
                return (
                    <Route
                        path={item.pathname}
                        exact={item.exact}
                        key={item.pathname}
                        component={item.component}
                    />
                );
            })}
            <Redirect exact path="/admin" to={{ pathname: '/admin/dashboard/log' }}></Redirect>
            <Route component={NoMatch}></Route>
        </Switch>



    }
}
export default withRouter(FrontendAuth) 