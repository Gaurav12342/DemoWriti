import { encrypt, decrypt } from 'object-encrypt-decrypt'

export function encryptData(plainObject) {
    if (!plainObject) {
        return
    }
    let encryptedData = encrypt(plainObject)
    return encryptedData
}

export function decryptData(data) {
    if (!data) {
        return
    }
    let decryptedData = decrypt(data)
    return decryptedData
}

function isJSON(str) {
    try {
        let str1 = JSON.parse(str)
        return str1
    } catch (e) {
        return false;
    }
}
