import './process.scss'
import { useSelector } from "react-redux";
import { connect } from 'react-redux';

function Process(props) {
    console.log(props);
    return (
        <div className="process">
            <h5>
                Secret key: <span>{props.secret.toString('hex').slice(0, 8)}</span>
            </h5>
            <div className="incoming">
                <h4>Incoming Data</h4>
                <p>{props.process.cipher}</p>
            </div>
            <div className="crypt">
                <h4>Decrypted Data</h4>
                <p>{props.process.text}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        secret: state.setkey.key,
        process: state.process
    }
}

export default connect(mapStateToProps)(Process)