import "./styles.scss";

const Background = () => {
    return (
        <div className="background-wrap">
            <svg
                className="ellipse"
                style={{ height: "50%", width: "50%", position: "absolute", zIndex: -2, top: "10%", left: "60%", opacity: "35%", filter: "blur(450px)" }}>
                <ellipse
                    style={{ cx: "50%", cy: "50%", rx: "50%", ry: "50%", fill: "rgba(44, 61, 82, 1)" }} />
            </svg>

            <svg className="ellipse" style={{ height: "50%", width: "50%", position: "absolute", zIndex: -2, top: "40%", left: "65%", opacity: 0.45, filter: "blur(350px)" }}>
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "rgba(0, 174, 212, 1)", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "rgba(22, 118, 243, 1)", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill="url(#grad1)" />
            </svg>


            <img className="background"
                src="https://raw.githubusercontent.com/fabio1mage/Landing-Page-Icons/2f72033226095db22c28177aa267bfebc65ee671/big1mage.svg"
                width="585" />
        </div>
    )
}

export default Background;