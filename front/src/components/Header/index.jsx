import { Link } from "react-router-dom";
import "./styles.scss";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <img
                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/main/dark_logo.png"
                    width="80" />
            </Link>
        </header>
    )
}

export default Header;