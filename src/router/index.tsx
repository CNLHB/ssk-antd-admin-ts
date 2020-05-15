import React, { Component, LazyExoticComponent, lazy } from "react";

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
        pathname: "/admin/dashboard/log",
        exact: true,
        component: lazy(() => import("pages/log/index")),
      },
      {
        pathname: "/admin/dashboard/analysis",
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
// class RouterView extends Component<any, any> {<Route component={NoMatch}></Route>
//   render() {
//     return (
//       <Router>
//         <Switch>
//           <Route path="/login" component={Login} />
//         </Switch>
//       </Router>
//     );
//   }
// }
// export default RouterView;
// export default function Admin({ history, location,match }: RouteComponentProps) {
// 	return(<>这是主页</>);
// }
