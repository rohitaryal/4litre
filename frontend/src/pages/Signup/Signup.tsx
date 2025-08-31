import { FiMail, FiKey, FiUser, FiMeh } from "react-icons/fi";
import InputBox from "../../components/InputBox/InputBox";
import SplitWindow from "../../components/SplitWindow/SplitWindow";
import styles from "./Signup.module.css";
import Button from "../../components/Button/Button";

const Signup = function () {
    return (
        <SplitWindow title="Signup to 4litre">
            <span className={styles.signupText}>
                Sign Up to <br />
                <span>4litre</span>
            </span>
            <form action="/signup" method="post" className={styles.signupForm}>
                <InputBox
                    width="1"
                    type="text"
                    placeholder="Full Name"
                    icon={FiUser} />
                <br />
                <InputBox
                    type="text"
                    placeholder="Username"
                    icon={FiMeh} />
                <br />
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
                <br />
                <Button value="Sign Up" type="submit"/>
            </form>
        </SplitWindow>
    )
}

export default Signup;