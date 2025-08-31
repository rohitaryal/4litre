import { useNavigate } from "react-router-dom";
import { ToggleTheme } from "../../components/ToogleTheme/ToggleTheme"
import WelcomeText from "../../components/WelcomeText/WelcomeText"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";

const Home = function () {
    const { result, error } = useFetch("http://localhost:3000", { credentials: "include" });
    const navigate = useNavigate();

    useEffect(() => {
        if ((result && !result.loggedIn) || error) {
            navigate("/login");
        }
    }, [result, navigate]);

    return (
        <>
            <WelcomeText />
            <ToggleTheme style={{
                position: "absolute",
                top: 0,
                right: 0,
            }} />
            <br />
        </>
    );
}

export default Home;