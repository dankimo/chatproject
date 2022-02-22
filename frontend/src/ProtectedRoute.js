import jsCookies from 'js-cookies';
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const jwt = jsCookies.getItem('jwt');

    if (isauth(jwt))
    {
        return children;
    }
    else {
        return <Navigate to="/" />
    }
}

function isauth(token) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/verify', false);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify({token}));

    if (xhr.status === 200 && window) {
        return true;
    }

    return false;
}