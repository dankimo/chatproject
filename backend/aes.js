var crypto = require("crypto"),
    algorithm = 'aes-256-cbc';

class aes {
  constructor(key, iv) {
    this.key = key;
    this.iv = iv;
  }
  
  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, this.key, this.iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex')
  }

  decrypt(cipher, username) {
    if (cipher.startsWith("Welcome")) {
      return cipher;
    }
    
    if (cipher.startsWith(username)) {
      return cipher;
    }

    var decipher = crypto.createDecipheriv(algorithm, this.key, this.iv)
    var decrypted = decipher.update(cipher,'hex','utf8')
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
