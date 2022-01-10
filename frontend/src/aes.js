const aes256 = require('aes256');

const secret = 'asdfghjkl;';

export const encrypt = (text) => {
    let encrypted = aes256.encrypt(secret, text);
    return encrypted;
}

export const decrypt = (cipher, username) => {
    if (cipher.startsWith('Welcome')) {
        return cipher;
    }

    if (cipher.startsWith(username)) {
        return cipher;
    }

    let decrypted = aes256.decrypt(secret, cipher);
    return decrypted;
}
