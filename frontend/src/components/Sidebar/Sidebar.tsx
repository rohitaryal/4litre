import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

export type SidebarItem = {
    key: number;
    name: string;
    icon: ReactNode;
    to: string;
}

export type SidebarProps = {
    links: SidebarItem[]
}

const Sidebar = function ({ links }: SidebarProps) {
    return (
        <div className={styles.sidebar}>
            {
                links.map(item => {
                    return (
                        <Link
                            key={item.key}
                            to={item.to}
                            title={item.name}
                            className={styles.sidebarLink}
                        >
                            <span
                                className={styles.buttonIcon}
                            >
                                {item.icon}
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Sidebar;
