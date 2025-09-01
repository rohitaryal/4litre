import Logout from "../Logout/Logout";
import { ToggleTheme } from "../ToogleTheme/ToggleTheme";
import styles from "./Navbar.module.css";

const Navbar = function () {
    return (
        <nav className={styles.navigationBar}>
            <Logout />
            <ToggleTheme />
        </nav>
    )
}

export default Navbar;