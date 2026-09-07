document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('form-login');
  const btnTogglePass = document.getElementById('btn-toggle-pass');
  const passInput = document.getElementById('contrasena');
  const eyeIcon = document.getElementById('eye-icon');
  const btnInvitado = document.getElementById('btn-invitado');
  const errorBox = document.getElementById('error-box');

  // Alternar ocultar/mostrar contraseña
  if (btnTogglePass) {
    btnTogglePass.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      eyeIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
  }

  // Manejo del Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = document.getElementById('correo').value.trim();
      const contrasena = passInput.value.trim();

      if (correo === 'alejandro@mangaflow.cl' && contrasena === '123456') {
        const usuario = {
          nombre: 'Alejandro',
          email: correo,
          puntos: 1250,
          rol: 'admin'
        };
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        window.location.href = 'index.html';
      } else if (correo && contrasena.length >= 4) {
        const usuario = {
          nombre: correo.split('@')[0],
          email: correo,
          puntos: 500,
          rol: 'cliente'
        };
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        window.location.href = 'index.html';
      } else {
        errorBox.textContent = 'Correo o contraseña incorrectos.';
        errorBox.classList.remove('d-none');
      }
    });
  }

  // Manejo de Entrar como Invitado
  if (btnInvitado) {
    btnInvitado.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      window.location.href = 'index.html';
    });
  }
});