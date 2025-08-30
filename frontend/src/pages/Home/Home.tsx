import ToggleTheme from "../../components/ToogleTheme/ToggleTheme"
import WelcomeText from "../../components/WelcomeText/WelcomeText"

const Home = function () {
    return (
        <>
            <WelcomeText />
            <ToggleTheme style={{
                position: "absolute",
                top: 0,
                right: 0,
            }} />
        </>
    )
}

export default Home;