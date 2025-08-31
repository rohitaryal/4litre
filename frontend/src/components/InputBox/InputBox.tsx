import styles from "./InputBox.module.css";
import type { IconType } from "react-icons";

type InputBoxProps = {
    placeholder: string;
    icon: IconType;
    height?: string;
    width?: string;
    name?: string;
    min?: number;
    max?: number;
    type?: React.HTMLInputTypeAttribute;
}

const InputBox = function (props: InputBoxProps) {
    const { icon: Icon } = props;
    return (
        <span className={styles.inputBoxContainer}>
            <Icon className={styles.icon} size={"1.5em"} />
            <input
                name={props.name}
                min={props.max}
                max={props.min}
                type={props.type}
                placeholder={props.placeholder}
                height={props.height || "2em"}
                width={props.width || "5em"} />
        </span>
    )
}

export default InputBox;