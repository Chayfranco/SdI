// Importar funções específicas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referências aos elementos do formulário
const form = document.querySelector(".form");
const emailInput = document.getElementById("editTextUsername");
const passwordInput = document.getElementById("editTextPassword");
const loginButton = document.getElementById("buttonLogin");

// Função de validação do formulário
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    return true;
}

// Função de login do usuário no Firebase
async function loginUser(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    if (!validateForm()) return; // Valida os dados antes de prosseguir

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        // Realiza o login com o Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);
        
        // Se o login for bem-sucedido, redireciona para a página principal
        alert("Login bem-sucedido!");
        window.location.href = "/inicio.html"; // Substitua "main.html" pela página de destino após login bem-sucedido

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Exibe uma mensagem de erro se o login falhar
        alert(`Erro: ${errorCode}, ${errorMessage}`);
    }
}

// Evento de submit do formulário
form.addEventListener("submit", loginUser);
