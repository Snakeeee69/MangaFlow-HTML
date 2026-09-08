document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const btnGuest = document.getElementById('btn-guest');
  const errorAlert = document.getElementById('login-error');

  // Lógica de inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorAlert.classList.add('d-none');
      errorAlert.textContent = '';

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      // Reglas de negocio para correo
      const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
      const hasValidDomain = allowedDomains.some(domain => email.endsWith(domain));

      if (!email || email.length > 100 || !hasValidDomain) {
        showError('Correo inválido. Debe contener un dominio válido (@duoc.cl, @profesor.duoc.cl o @gmail.com) y máx. 100 caracteres.');
        return;
      }

      // Reglas de negocio para contraseña
      if (!password || password.length < 4 || password.length > 10) {
        showError('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
      }

      //usuario_autenticado
      const sessionData = {
        role: 'user',
        email: email,
        points: 1500,
        isGuest: false
      };

      localStorage.setItem('mangaFlow_session', JSON.stringify(sessionData));
      window.location.href = './index.html';
    });
  }

  // Lógica para modo Invitado
  if (btnGuest) {
    btnGuest.addEventListener('click', () => {
      const guestSession = {
        role: 'guest',
        email: 'Invitado',
        points: 0,
        isGuest: true
      };

      // Limpiar carrito al ingresar como invitado
      localStorage.removeItem('mangaFlow_cart');
      localStorage.setItem('mangaFlow_session', JSON.stringify(guestSession));
      window.location.href = './index.html';
    });
  }

  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');
  }
});