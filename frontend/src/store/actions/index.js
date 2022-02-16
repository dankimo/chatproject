export const process = (encrypt, text, cipher) => {
    return {
        type: 'PROCESS',
        payload: {
            encrypt,
            text,
            cipher
        }
    }
}

export const setkey = (key, iv) => {
    return {
        type: 'SET_KEY',
        payload: {
            key,
            iv
        }
    }
}