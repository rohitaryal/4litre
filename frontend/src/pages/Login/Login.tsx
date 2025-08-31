import { useEffect } from "react";
import styles from "./Login.module.css"
import InputBox from "../../components/InputBox/InputBox";
import { FiKey, FiMail } from "react-icons/fi";
import SplitWindow from "../../components/SplitWindow/SplitWindow";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Login = function () {
    useEffect(() => {
        document.title = "Login to 4litre"
    }, []);

    return (
        <SplitWindow title="Login to 4litre" >
            <span className={styles.loginText}>
                Log in to <br />
                <span>4litre</span>
            </span>
            <form action="/login" method="post" className={styles.loginForm}>
                <InputBox
                    type="email"
                    placeholder="E-mail or Username"
                    icon={FiMail} />
                <br />
                <InputBox
                    type="password"
                    placeholder="Password"
                    icon={FiKey}
                />
                <br /><br />
                <Button value="Log In" type="submit" />
                <br />
                <Link to="/forgot-password" className={styles.forgotPassword}>
                    Forgot Password?
                </Link>
                <span className={styles.signUpMsg}>
                    Don't have an account?&nbsp;
                    <Link to="/signup" className={styles.link}>
                        Sign Up
                    </Link>
                </span>
            </form>
        </SplitWindow>
    )
}

export default Login;