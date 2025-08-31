import { useEffect, type ReactNode } from "react";
import styles from "./SplitWindow.module.css"
import { ToggleTheme } from "../ToogleTheme/ToggleTheme";

type SplitWindow = {
    title: string;
    children: ReactNode;
    backgroundImage?: string;
}

const SplitWindow = function (props: SplitWindow) {
    useEffect(() => {
        document.title = props.title;
    }, []);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContainerLeft}>
                <ToggleTheme style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    stroke: "green",
                }} />
                {props.children}
            </div>
            <div
                className={styles.loginContainerRight}
            >
            </div>
        </div>
    )
}

export default SplitWindow;