import React from "react";
import {Router, Link} from "react-router";
import AppPot from "./config";

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();

        AppPot.LocalAuthenticator.logout()
		.then(() => {
            this.props.router.push("/login");
		})
        .catch((error) => {
            console.error(error);
        });

        return false;
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">AppPotハンズオンアプリ</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="customers">顧客管理</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#" onClick={this.logout}>ログアウト</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}