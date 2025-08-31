import styles from "./Logout.module.css";
import { FiLogOut } from "react-icons/fi";

type LogoutProps = {
    style?: React.CSSProperties;
}

const Logout = function (props: LogoutProps) {
    return (
        <button style={props.style} className={styles.logoutButton}>
            <FiLogOut />
        </button>
    )
}

export default Logout;
