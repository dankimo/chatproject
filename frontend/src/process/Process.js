import './process.scss'
import { useSelector } from "react-redux";

function Process() {
    const state = useSelector((state) => state.ProcessReducer);

    return (
        <div className="process">
            <h5>
                Secret key: <span>asdfghjkl;</span>
            </h5>
            <div className="incoming">
                <h4>Incoming Data</h4>
                <p>{state.cypher}</p>
            </div>
            <div className="crypt">
                <h4>Decrypted Data</h4>
                <p>{state.text}</p>
            </div>
        </div>
    )
}

export default Process;