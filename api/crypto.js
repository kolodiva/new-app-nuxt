//import * as CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';

export function matchPass(key, pass, hash) {

    const _key = SHA256(key + '118540800').toString()

    const bytes = AES.decrypt(pass, _key)

    const originalText = SHA256(SHA256(bytes.toString(encUtf8)).toString()).toString()

    return bcrypt.compareSync(originalText, hash);
  }

export function genPass(pass) {

    const originalText = SHA256(pass).toString()
    return bcrypt.hashSync(originalText, 10);
  }

export function genUuid() {return uuidv4()}
