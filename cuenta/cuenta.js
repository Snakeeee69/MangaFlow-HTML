document.addEventListener('DOMContentLoaded', () => {
  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Si no hay sesión activa, crea una cuenta demo por defecto para permitir la navegación
  if (!currentUser) {
    currentUser = {
      nombre: 'Usuario Demo',
      correo: 'usuario@duoc.cl',
      rol: 'Cliente',
      puntos: 1250,
      rut: '12345678-9'
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  const accountName = document.getElementById('account-name');
  const accountEmail = document.getElementById('account-email');
  const accountRole = document.getElementById('account-role');
  const accountPoints = document.getElementById('account-points');
  const inputNombre = document.getElementById('input-nombre');
  const inputEmail = document.getElementById('input-email');
  const inputRut = document.getElementById('input-rut');
  const logoutBtn = document.getElementById('logout-btn');
  const profileForm = document.getElementById('profile-form');

  if (accountName) accountName.textContent = currentUser.nombre || 'Usuario Demo';
  if (accountEmail) accountEmail.textContent = currentUser.correo || 'usuario@duoc.cl';
  if (accountRole) accountRole.textContent = currentUser.rol || 'Cliente';
  if (accountPoints) accountPoints.textContent = `${currentUser.puntos || 1250} pts`;

  if (inputNombre) inputNombre.value = currentUser.nombre || 'Usuario Demo';
  if (inputEmail) inputEmail.value = currentUser.correo || 'usuario@duoc.cl';
  if (inputRut) inputRut.value = currentUser.rut || '12345678-9';

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentUser.nombre = inputNombre.value;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (accountName) accountName.textContent = currentUser.nombre;
      alert('Información del perfil actualizada correctamente.');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = '../login.html';
    });
  }
});