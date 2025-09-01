import { useRef } from "react";
import styles from "./Logout.module.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type LogoutProps = {
    style?: React.CSSProperties;
}

const Logout = function (props: LogoutProps) {
    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = async function () {
        try {
            const resp = await fetch(import.meta.env.VITE_SERVER_URL + "/logout", { credentials: "include" });
            if (resp.ok) {
                navigate("/login");
            } else {
                console.log("Failed to log out");
            }
        } catch (err) {
            console.log("Failed to log out: ", err);
        }
    }

    return (
        <button
            title="Log out"
            onClick={handleClick}
            ref={buttonRef}
            style={props.style}
            className={styles.logoutButton}>
            <FiLogOut size="2em" />
        </button>
    )
}

export default Logout;
