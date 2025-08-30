import styles from "./InputBox.module.css";
import type { IconType } from "react-icons";

type InputBoxProps = {
    placeholder: string;
    icon: IconType;
    height?: string;
    width?: string;
    type?: React.HTMLInputTypeAttribute;
}

const InputBox = function (props: InputBoxProps) {
    const { icon: Icon } = props;
    return (
        <span className={styles.inputBoxContainer}>
            <Icon className={styles.icon} size={"1.5em"}/>
            <input
                type={props.type || "text"}
                placeholder={props.placeholder}
                height={props.height || "2em"}
                width={props.width || "5em"} />
        </span>
    )
}

export default InputBox;