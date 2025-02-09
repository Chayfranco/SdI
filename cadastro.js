// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Importa as funções de criptografia
import { encryptAES, encryptRSA, generateAESKey } from "./crypto.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgXkergZeH7lLWW8eSZLLqZ4t04DpyAhc",
  authDomain: "financas-7bb6b.firebaseapp.com",
  databaseURL: "https://financas-7bb6b-default-rtdb.firebaseio.com",
  projectId: "financas-7bb6b",
  storageBucket: "financas-7bb6b.firebasestorage.app",
  messagingSenderId: "708455299484",
  appId: "1:708455299484:web:1c25f12d52e37184a57059",
  measurementId: "G-9QM9MFJCYN"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Referências aos elementos do formulário
const form = document.querySelector(".form");
const fullNameInput = document.getElementById("editTextFullName");
const emailInput = document.getElementById("editTextEmail");
const passwordInput = document.getElementById("editTextPassword");

// Chave pública RSA (substitua pela sua real)
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----`;

// Função de cadastro do usuário
async function registerUser(event) {
  event.preventDefault(); // Evita envio padrão do formulário

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!fullName || !email || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    // Cria o usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;

    // Gera uma chave AES e IV aleatórios
    const { aesKey, iv } = await generateAESKey();

    // Criptografa os dados
    const encryptedFullName = await encryptAES(fullName, aesKey, iv);
    const encryptedEmail = await encryptAES(email, aesKey, iv);
    const encryptedAESKey = await encryptRSA(aesKey, publicKey);

    // Salva os dados criptografados no Firebase
    await set(ref(database, `users/${userId}`), {
      encryptedFullName: encryptedFullName,
      encryptedEmail: encryptedEmail,
      encryptedAESKey: encryptedAESKey,
      iv: iv
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";

  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert(`Erro no cadastro: ${error.message}`);
  }
}

// Adiciona evento de submit ao formulário
form.addEventListener("submit", registerUser);
