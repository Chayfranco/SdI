// Importa as funções necessárias do SDK Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

// Referências aos elementos do formulário
const form = document.querySelector(".form");
const fullNameInput = document.getElementById("editTextFullName");
const emailInput = document.getElementById("editTextEmail");
const passwordInput = document.getElementById("editTextPassword");
const confirmPasswordInput = document.getElementById("editTextConfirmPassword");
const signupButton = document.getElementById("buttonSignup");

// Função de validação do formulário
function validateForm() {
  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return false;
  }

  if (password.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return false;
  }

  return true;
}

// Função de cadastro de usuário no Firebase
async function registerUser(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  if (!validateForm()) return; // Valida os dados antes de prosseguir

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    // Cria o usuário com o Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Salva os dados do usuário no Firebase Realtime Database
    const userId = user.uid;
    const fullName = fullNameInput.value.trim();

    await set(ref(database, 'users/' + userId), {
      fullName: fullName,
      email: email,
      userId: userId
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para a página de login

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Erro: ${errorCode}, ${errorMessage}`);
  }
}

// Evento de submit do formulário
form.addEventListener("submit", registerUser);
