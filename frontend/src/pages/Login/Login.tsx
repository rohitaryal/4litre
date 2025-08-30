import { useEffect } from "react";
import styles from "./Login.module.css"
import InputBox from "../../components/InputBox/InputBox";
import { FiKey, FiMail } from "react-icons/fi";

const Login = function () {
    useEffect(() => {
        document.title = "Login to 4litre"
    }, []);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContainerLeft}>
                <span className={styles.loginText}>
                    Log in to <br />
                    <span>4litre</span>
                </span>
                <form action="/login" method="post">
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
                    <button type="submit">
                        Log In
                    </button>
                    <br />
                    <span className={styles.forgotPassword}>
                        Forgot Password?
                    </span>
                    <span className={styles.signUpMsg}>
                        Don't have an account?&nbsp;
                        <span>Sign Up</span>
                    </span>
                </form>
            </div>
            <div
                className={styles.loginContainerRight}
            >

            </div>
        </div>
    )
}

export default Login;