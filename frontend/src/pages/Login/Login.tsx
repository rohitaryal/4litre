import { useEffect } from "react";
import styles from "./Login.module.css"
import InputBox from "../../components/InputBox/InputBox";
import { FiKey, FiMeh } from "react-icons/fi";
import SplitWindow from "../../components/SplitWindow/SplitWindow";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Login = function () {
    const navigate = useNavigate();
    const { result, error } = useFetch(import.meta.env.VITE_SERVER_URL, { credentials: "include" })

    useEffect(() => {
        if (error) {
            console.log("Failed to make request");
        }

        if (result && result.loggedIn) {
            navigate("/")
        }
    }, [navigate, error, result])

    useEffect(() => {
        document.title = "Login to 4litre"
    }, []);

    return (
        <SplitWindow title="Login to 4litre" >
            <span className={styles.loginText}>
                Log in to <br />
                <span>4litre</span>
            </span>

            <form action={import.meta.env.VITE_SERVER_URL + "/login"} method="post" className={styles.loginForm}>
                <InputBox
                    min={4}
                    max={20}
                    type="text"
                    name="username"
                    placeholder="Username"
                    icon={FiMeh}
                />
                <br />
                <InputBox
                    type="password"
                    name="password"
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
