import React, { LazyExoticComponent, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "layout/index/index"
import NoMatch from "pages/exception/404/index"
export interface RouteType {
    pathname?: string;
    component: LazyExoticComponent<any> | any;
    exact: boolean;
    title?: string;
    icon?: string;
    children?: RouteType[];
}
//<Route component={NoMatch}></Route> lazy(() => import("layout/index/index"))    onKeyUp={(e: SyntheticEvent<Element, Event>) => { }}
export const AppRoutes: RouteType[] = [
    {
        pathname: "/admin",
        exact: false,
        component: Layout,
    },
    {
        pathname: "/login",
        component: lazy(() => import("pages/login/index")),
        exact: true,
    }
];
//
export const ContentRoutes: RouteType[] = [
    {
        pathname: "/admin/welcome",
        exact: true,
        component: lazy(() => import("pages/welcome/Welcome")),
    },
    {
        pathname: "/admin/dashboard/log",
        exact: true,
        component: lazy(() => import("pages/dashboard/log/index")),
    },
    {
        pathname: "/admin/dashboard/analysis",
        exact: true,
        component: lazy(() => import("pages/dashboard/analysis/index")),
    },
    {
        pathname: "/admin/dashboard/monitor",
        exact: true,
        component: lazy(() => import("pages/dashboard/monitor/index")),
    }
];

export const renderRouter = (router: any) => {
    return <Switch>
        {router.map((item: RouteType) => {
            return (
                <Route
                    path={item.pathname}
                    exact={item.exact}
                    key={item.pathname}
                    component={item.component}
                />
            );
        })}
        <Redirect exact path="/" to={{ pathname: '/admin/welcome' }}></Redirect>
        <Route component={NoMatch}></Route>
    </Switch>
};