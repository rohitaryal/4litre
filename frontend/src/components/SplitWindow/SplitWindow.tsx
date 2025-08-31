import { useEffect, type ReactNode } from "react";
import styles from "./SplitWindow.module.css"

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