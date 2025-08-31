import styles from "./Button.module.css";

type ButtonProps = {
    value: string;
    type?: "submit" | "reset" | "button";
}
const Button = function ({ value, type = "button" }: ButtonProps) {
    return (
        <button type={type} className={styles.button}>
            {value}
        </button>
    )
}

export default Button;