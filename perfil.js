// Importa as funções necessárias do SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

// Elementos HTML onde os dados do usuário serão exibidos
const nomeUsuario = document.querySelector(".card-text:nth-of-type(1)");
const emailUsuario = document.querySelector(".card-text:nth-of-type(2)");

// Verifica o estado de autenticação do usuário
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = user.uid;
    const userRef = ref(database, `users/${userId}`);
    
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        nomeUsuario.textContent = `Nome: ${userData.fullName}`;
        emailUsuario.textContent = `Email: ${userData.email}`;
      } else {
        nomeUsuario.textContent = "Nome: Não encontrado";
        emailUsuario.textContent = "Email: Não encontrado";
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  } else {
    window.location.href = "login.html"; // Redireciona para login se não estiver autenticado
  }
});

// Evento de logout
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Erro ao sair:", error);
  });
});
