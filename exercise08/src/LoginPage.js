import React from "react";
import AppPot from "./config";
import Customer from "./Customer";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            errorMsg: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    login(event) {
        event.preventDefault();

        AppPot.LocalAuthenticator.login(this.state.userName, this.state.password)
        .then(function() {
            return AppPot.createDatabase([Customer]);
        })
        .then(() => {
            this.props.router.push("/customers");
        })
        .catch((error) => {
            if (error.code && error.code == "111") {
                this.setState({
                    errorMsg: error.description
                });
            }
            else {
                console.log(error);
			    alert(error.description);
            }
		});

        return false;
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="loginmodal-container">
                    <h1>Login to Your Account</h1><br />
                    <form onSubmit={this.login}>
                        {(() => {
                            if (this.state.errorMsg != "") {
                                return <span className="text-danger">{this.state.errorMsg}</span>
                            }
                        })()}
                        <input type="text" name="userName" placeholder="Username" value={this.state.userName} onChange={this.handleInputChange} required="required" />
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required="required" />
                        <input type="submit" name="login" className="login loginmodal-submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}