import { Link } from "react-router-dom";
import "./styles.scss";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <img
                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page/2f72033226095db22c28177aa267bfebc65ee671/1mage.svg"
                    width="80" />
            </Link>
        </header>
    )
}

export default Header;