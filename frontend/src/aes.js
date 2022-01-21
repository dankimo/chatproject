var crypto = require("crypto"),
    algorithm = 'aes-256-cbc',
    key = crypto.randomBytes(32),
    iv = crypto.randomBytes(16);

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex')
};

export const decrypt = (cipher, username) => {
    if (cipher.startsWith("Welcome")) {
      return cipher;
    }
    
    if (cipher.startsWith(username)) {
      return cipher;
    }

    var decipher = crypto.createDecipheriv(algorithm, key, iv)
    var dec = decipher.update(cipher,'hex','utf8')
    dec += decipher.final('utf8');

    return dec;
};

export { key };
