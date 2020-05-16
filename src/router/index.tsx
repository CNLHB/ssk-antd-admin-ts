import React, { LazyExoticComponent, lazy } from "react";
import { Route, Switch } from "react-router-dom";
export interface RouteType {
    pathname: string;
    component: LazyExoticComponent<any>;
    exact: boolean;
    title?: string;
    icon?: string;
    children?: RouteType[];
}

export const AppRoutes: RouteType[] = [
    {
        pathname: "/",
        exact: false,
        component: lazy(() => import("layout/index/index")),
        children: [
            {
                pathname: "/dashboard/log",
                exact: true,
                component: lazy(() => import("pages/log/index")),
            },
            {
                pathname: "/dashboard/analysis",
                exact: true,
                component: lazy(() => import("pages/user/index")),
            },
        ],
    },
    {
        pathname: "/login",
        component: lazy(() => import("pages/login/index")),
        exact: true,
    },
    {
        pathname: "/404",
        component: lazy(() => import("pages/exception/404/index")),
        exact: true,
    },
];
//
export const ContentRoutes: RouteType[] = [
    {
        pathname: "/dashboard/log",
        exact: true,
        component: lazy(() => import("pages/log/index")),
    },
    {
        pathname: "/dashboard/analysis",
        exact: true,
        component: lazy(() => import("pages/user/index")),
    },
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
    </Switch>
};