import React from "react";
import ReactDOM from "react-dom";
import AppPot from "./config";
import Customer from "./Customer";


class App extends React.Component {
    render() {
        return (
            <div>
                Hello World!
            </div>
        );
    }
}

AppPot.LocalAuthenticator.login("XXXXXXXXXX", "XXXXXXXXXX")
.then(() => {
    return AppPot.createDatabase([Customer]);
})
.then(() => {
    ReactDOM.render(
        <App />
        , document.getElementById("content")
    );
})
.catch((error) => {
    console.log(error);
    alert(error.description);
});