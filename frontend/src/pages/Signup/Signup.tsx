import { FiMail, FiKey, FiUser, FiMeh } from "react-icons/fi";
import InputBox from "../../components/InputBox/InputBox";
import SplitWindow from "../../components/SplitWindow/SplitWindow";
import styles from "./Signup.module.css";
import Button from "../../components/Button/Button";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = function () {
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


    return (
        <SplitWindow title="Signup to 4litre">
            <span className={styles.signupText}>
                Sign Up to <br />
                <span>4litre</span>
            </span>
            <form action={import.meta.env.VITE_SERVER_URL + "/signup"} method="post" className={styles.signupForm}>
                <InputBox
                    type="text"
                    name="fullname"
                    min={6}
                    max={300}
                    placeholder="Full Name"
                    icon={FiUser} />
                <br />
                <InputBox
                    type="text"
                    name="username"
                    min={6}
                    max={20}
                    placeholder="Username"
                    icon={FiMeh} />
                <br />
                <InputBox
                    type="email"
                    name="email"
                    min={5}
                    max={254}
                    placeholder="E-mail or Username"
                    icon={FiMail} />
                <br />
                <InputBox
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon={FiKey}
                />
                <br />
                <Button value="Sign Up" type="submit" />
            </form>
        </SplitWindow>
    )
}

export default Signup;
