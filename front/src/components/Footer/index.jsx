import { Link } from "react-router-dom";
import "./styles.scss";

const Footer = () => {
    return (
        <footer>
            <div className="social-medias">
                <a href="https://www.instagram.com/oneapp_brasil/" target="_blank" rel="noreferrer"><img
                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/instagram.svg" /></a>
                <a href="https://www.linkedin.com/company/1mage/" target="_blank" rel="noreferrer"><img
                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/linkedin.svg" /></a>
                <a href="https://www.facebook.com/oneappbrasil" target="_blank" rel="noreferrer"><img
                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/facebook.svg" /></a>
            </div>
            {
                !window.location.href.endsWith("/privacy_policies") && <Link to="/privacy_policies">Política de Privacidade</Link>
            }
        </footer>
    )
}

export default Footer;