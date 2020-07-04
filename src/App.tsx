import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.less";
import Loading from "components/loading/index";
import { AppRoutes, renderRouter } from "router/index"
import stores from "stores/index/index";
import { Provider } from "mobx-react";
class App extends Component<{}, {}> {

    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <Suspense fallback={<Loading />}>
                        {renderRouter(AppRoutes)}
                    </Suspense>
                </Router>
            </Provider>
        );
    }
}

export default App;
