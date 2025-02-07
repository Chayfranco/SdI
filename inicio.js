import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

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

const logoutBtn = document.getElementById('logout');

// Adiciona o evento de clique no botão de logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    const confirmation = window.confirm("Tem certeza de que deseja sair?");
    
    if (confirmation) {
      signOut(auth).then(() => {
        // Redireciona para a página de login após o logout
        window.location.href = "login.html"; // Redireciona para a página de login

        // Limpa o histórico de navegação para impedir o retorno à página anterior
        history.pushState(null, null, location.href);
        history.back();
        history.forward();
      }).catch((error) => {
        alert(`Erro ao sair: ${error.message}`);
      });
    }
  });
}

// Função para mostrar o conteúdo com base no estado de login
function updateNavLinks(user) {
  const navbarLinks = document.getElementById('navbarLinks');
  navbarLinks.innerHTML = ''; // Limpa os links existentes

  if (user) {
    navbarLinks.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="perfil.html" id="perfil">Perfil</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="logout">Sair</a>
      </li>
    `;
  } else {
    navbarLinks.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="login.html" id="login">Entrar</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="cadastro.html" id="Cadastro">Cadastre-se</a>
      </li>
    `;
  }
}

// Verifica o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
  updateNavLinks(user);
});
