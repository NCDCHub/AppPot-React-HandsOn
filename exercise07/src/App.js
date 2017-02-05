import React from "react";
import ReactDOM from "react-dom";
import AppPot from "./config";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import LoginPage from "./LoginPage";
import CustomerListPage from "./CustomerListPage";

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

function requireAuth(nextState, replace) {
    if (!AppPot.LocalAuthenticator.isLogined()) {
        replace({
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={CustomerListPage} onEnter={requireAuth} />
            <Route path="/login" component={LoginPage} />
            <Route path="/customers" component={CustomerListPage} onEnter={requireAuth} />
        </Route>
    </Router>
    , document.getElementById("content")
);