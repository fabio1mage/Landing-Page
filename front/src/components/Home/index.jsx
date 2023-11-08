import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.scss";
import Background from "../Background";
import Footer from "../Footer";
import Header from "../Header";
import { useState } from "react";
import Loading from "../../assets/Loading";

const Home = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (name === "" || email === "" || age === "") {
                throw new Error("Você precisa preencher os três campos!");
            }

            if (!validateEmail(email)) {
                throw new Error("Você precisa informar um e-mail válido!");
            }
            
            if (parseInt(age) > 120 || parseInt(age) < 0) {
                throw new Error("Você precisa informar uma idade válida!");
            }
            const storeResult = await store(email, name, age);
            console.log(storeResult);
            notify(email, name, age);

            clearFields();
            toast.success(storeResult.text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        catch (e) {
            toast.error(e.response ? e.response.text : e.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        finally {
            setIsLoading(false);
        }

    }

    // const BASE_URL = "https://1mage.org/api/";
    const BASE_URL = "http://localhost:3000/";

    async function post(url, body) {
        return await fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
    }

    async function store(email, name, age) {
        const response = await post("store", JSON.stringify({ email, name, age }));

        // if (!response.ok) {
        //     const data = await response.json();
        //     const error = new Error(data);
        //     error.response = data;
        //     throw error;
        // }

        return await response.json();
    }

    async function notify(email, name, age) {
        return await post("notify", JSON.stringify({ email, name, age }));
    }

    function clearFields() {
        setName("");
        setEmail("");
        setAge("");
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    return (
        <>
            <section className="home container">
                <Header />
                <article>
                    <div className="titles">
                        <h1>Toda sua vida</h1><h1><span><span>em suas mãos</span></span></h1>
                    </div>
                    <div className="soon">
                        <h2>Em breve nas lojas digitais</h2>
                        <div className="stores">
                            <a className="store" href="#">
                                <img
                                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/playstore.svg"
                                    height="24" />
                                <span>Google play</span>
                            </a>
                            <a className="store" href="#">
                                <img
                                    src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/appstore.svg"
                                    height="24" />
                                <span>App store</span>
                            </a>
                        </div>
                    </div>
                    <div className="notify">
                        <span className="warning">Seja avisado quando o lançamento
                            ocorrer. 👇</span>
                        <form role="form" id="myForm" onSubmit={handleSubmit}>
                            <div className="fields">
                                <input type="text" placeholder="Seu nome"
                                    className="nome" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="number"
                                    placeholder="Idade"
                                    className="idade" value={age} onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            <input type="text"
                                placeholder="Digite o seu endereço de email"
                                className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className="notify-me" type="submit">
                                {
                                    !isLoading ? "Notifique-me" : <Loading />
                                }
                            </button>
                        </form>
                        <span className="dont-worry">*Não se preocupe, não vamos
                            incomodar com spam :)</span>
                    </div>
                </article>
                <Footer />
            </section>

            <Background />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Home;