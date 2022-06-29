import React, { useEffect } from "react";
import UserSignupComponent from '../components/UserSignupComponent';
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import { register } from "../redux/actions";

/**
 * For register new users
 * @param {props} props
 */

function SignUpView(props) {

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/Welcome");
        }
    }, [user, props.history]);
    

    const onRegister = (username, password, isAdmin) => {
        props.dispatch(register(username, password, isAdmin));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <UserSignupComponent
            user={user}
            onRegister={onRegister}
        />
    );

}

export default connect()(withRouter(SignUpView));