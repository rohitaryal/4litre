import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import Sidebar, { type SidebarItem } from "../../components/Sidebar/Sidebar";
import { FiCodesandbox, FiFolder, FiHome, FiInfo, FiSettings, FiShare2, FiShield } from "react-icons/fi";
import FileUpload from "../../components/FileUpload/FileUpload";
import Navbar from "../../components/Navbar/Navbar";

const Links: SidebarItem[] = [
    {
        key: 3,
        name: "Home",
        to: "/",
        icon: <FiHome size={"2em"} />,
    },
    {
        key: 5,
        name: "My Files",
        to: "/my-files",
        icon: <FiFolder size={"2em"} />
    },
    {
        key: 6,
        name: "Vault",
        to: "/vault",
        icon: <FiShield size="2em" />
    },
    {
        key: 7,
        name: "Shared With Me",
        to: "/",
        icon: <FiShare2 size="2em" />
    },
    {
        key: 8,
        name: "Public Pool",
        to: "/pool",
        icon: <FiCodesandbox size={"2em"} />
    },
    {
        key: 9,
        name: "Settings",
        to: "/settings",
        icon: <FiSettings size={"2em"} />
    },
    {
        key: 10,
        name: "Help",
        to: "/help",
        icon: <FiInfo size={"2em"} />
    }
];

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
            <Sidebar links={Links} />
            <Navbar />
            <FileUpload />
            <br />
        </>
    );
}

export default Home;
