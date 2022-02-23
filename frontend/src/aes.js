var crypto = require("crypto"),
    algorithm = 'aes-256-cbc';

export const encrypt = (text, key, iv) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex')
};

export const decrypt = (cipher, username, key, iv) => {
    if (cipher.startsWith("Welcome")) {
      return cipher;
    }
    
    if (cipher.startsWith(username)) {
      return cipher;
    }

    var decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
    var dec = decipher.update(cipher,'hex','utf8')
    dec += decipher.final('utf8');

    return dec;
};