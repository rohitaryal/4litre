import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import styles from "./ToggleTheme.module.css";

type Theme = "light" | "dark";
type ToggleThemeProps = { style?: React.CSSProperties };

export const getSavedTheme = function () {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const preferredTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";

    if (savedTheme == "light" || savedTheme == "dark") {
        return savedTheme;
    }

    return preferredTheme;
}

export const ToggleTheme = function ({ style }: ToggleThemeProps) {
    const [theme, setTheme] = useState<Theme>(getSavedTheme);
    const otherTheme = theme == "dark" ? "light" : "dark";

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <button
            title={"Change theme to " + otherTheme}
            style={style}
            className={styles.themeToggleButton}
            onClick={() => setTheme(otherTheme)}
        >
            {theme == "light" ? <FiSun size={"2em"} /> : <FiMoon size={"2em"} />}
        </button>
    )
}