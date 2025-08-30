import styles from "./WelcomeText.module.css";

const WelcomeText = () => {
    return <div className={styles.welcomeText}>
        <h2>
            Welcome to <span className={styles.welcomeText4litre}>4litre</span>
        </h2>
    </div>
}

export default WelcomeText;
