// Importa a biblioteca CryptoJS
import CryptoJS from "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.js";

// Chave secreta para criptografia/descriptografia (Mantenha a mesma usada na criptografia)
const SECRET_KEY = "sua-chave-secreta"; 
export function encryptAES(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  }
  
// Função para descriptografar dados AES
export function decryptAES(encryptedText) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText || "Erro na descriptografia";
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    return "Erro na descriptografia";
  }
}
