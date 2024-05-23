import CryptoJS from "crypto-js"

export const commonSendResponse = async (data, count) => {
    if (data || count) {
        return data && count ? { data, count } : data
    } else {
        return false
    }
}

export const encryptPassword = async (passowrd) => {
    return CryptoJS.AES.encrypt(passowrd, process.env.PASSWORD).toString();
}

export const decryptPassword = async (passowrd) => {
    return CryptoJS.AES.decrypt(passowrd, process.env.PASSWORD).toString(CryptoJS.enc.Utf8);
}