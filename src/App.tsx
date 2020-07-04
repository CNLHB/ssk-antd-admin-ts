import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.less";
import Loading from "components/loading/index";
import { AppRoutes } from "router/index";
import stores from "stores/index/index";
import { Provider } from "mobx-react";
import FrontendAuth from "router/frontendAuth";
class App extends Component<{}, {}> {

    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <Suspense fallback={<Loading />}>
                        <FrontendAuth config={AppRoutes}></FrontendAuth>
                    </Suspense>
                </Router>
            </Provider>
        );
    }
}

export default App;
