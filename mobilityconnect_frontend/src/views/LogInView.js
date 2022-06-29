import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/UserLoginComponent";

import { login } from "../redux/actions";

/**
 * For user login
 * @param {props} props
 */
function LoginView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/Welcome");
        }
    }, [user, props.history]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <LoginComponent
            user={user}
            onCancel={onCancel}
            onLogin={onLogin}
        />
    );
}

export default connect()(withRouter(LoginView));