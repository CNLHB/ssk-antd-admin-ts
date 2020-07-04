import React, { LazyExoticComponent, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "layout/index/index"
import NoMatch from "pages/exception/404/index"
export interface RouteType {
    pathname?: string;
    component: LazyExoticComponent<any> | any;
    exact: boolean;
    auth?: boolean
    title?: string;
    icon?: string;
    children?: RouteType[];
}
export const AppRoutes: RouteType[] = [

    {
        pathname: "/login",
        component: lazy(() => import("pages/login/index")),
        auth: false,
        exact: true,
    },
    {
        pathname: "/",
        exact: false,
        auth: true,
        component: Layout,
    }, {
        pathname: "/404",
        exact: true,
        component: NoMatch,
    },
];
//
export const ContentRoutes: RouteType[] = [
    {
        pathname: "/",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/welcome/Welcome")),
    },
    {
        pathname: "/admin/dashboard/log",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dashboard/log/index")),
    },
    {
        pathname: "/admin/dashboard/analysis",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dashboard/analysis/index")),
    },
    {
        pathname: "/admin/dashboard/monitor",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dashboard/monitor/index")),
    },
    {
        pathname: "/admin/account/center",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/account/center/center"))
    },
    {
        pathname: "/admin/account/settings",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/account/setting/index"))
    },
    {
        pathname: "/admin/dynamic/category",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dynamic/category/index"))
    },
    {
        pathname: "/admin/dynamic/detail",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dynamic/detail/index"))
    },
    {
        pathname: "/admin/dynamic/chart",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dynamic/chart/index"))
    },
    {
        pathname: "/admin/user/list",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/user/list/index"))
    },
    {
        pathname: "/admin/user/trend",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/user/trend/index"))
    },
    {
        pathname: "/admin/topic/list",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/topic/list/index"))
    },
    {
        pathname: "/admin/topic/chart",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/topic/chart/index"))
    },
    {
        pathname: "/admin/dashboard/performance",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dashboard/performance/index"))
    },
    {
        pathname: "/admin/dashboard/error",
        exact: true,
        auth: true,
        component: lazy(() => import("pages/dashboard/error/index"))
    },
];

export const renderRouter = (router: RouteType[]) => {
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
        <Redirect exact path="/admin" to={{ pathname: '/admin/dashboard/log' }}></Redirect>
        <Route component={NoMatch}></Route>
    </Switch>
};