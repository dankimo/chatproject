import './process.scss'
import { useSelector } from "react-redux";

function Process(props) {
    const state = useSelector((state) => state.ProcessReducer);

    return (
        <div className="process">
            <h5>
                Secret key: <span>{props.secret.slice(0, 8)}</span>
            </h5>
            <div className="incoming">
                <h4>Incoming Data</h4>
                <p>{state.cipher}</p>
            </div>
            <div className="crypt">
                <h4>Decrypted Data</h4>
                <p>{state.text}</p>
            </div>
        </div>
    )
}

export default Process;