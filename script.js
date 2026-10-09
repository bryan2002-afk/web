
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // ELEMENTOS DEL MODO OSCURO Y MODO CLARO
  // ==========================================

  const toggle = document.getElementById('darkModeToggle');
  const html = document.documentElement;
  const modeIcon = document.getElementById('modeIcon');
  const modeDescription = document.getElementById('modeDescription');

  // ==========================================
  // SISTEMA DE NOTIFICACIONES TOAST
  // ==========================================

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  let toastTimeout;

  function showToast(message, iconClass = 'fa-circle-info') {

    // Verificar que existan los elementos del Toast
    if (!toast || !toastMessage || !toastIcon) {
      console.warn('No se encontraron los elementos del Toast.');
      return;
    }

    // Actualizar el mensaje y el icono
    toastMessage.textContent = message;
    toastIcon.className = `fa-solid ${iconClass} text-pink-500`;

    // Mostrar la notificación
    toast.classList.remove('hidden');

    // Reiniciar el temporizador si ya había una notificación
    clearTimeout(toastTimeout);

    // Ocultar después de 2.5 segundos
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }

  // ==========================================
  // CONFIGURACIÓN INICIAL DEL TEMA
  // ==========================================

  // Modo oscuro activado por defecto
  html.classList.add('dark');

  if (toggle) {
    toggle.checked = true;
  }

  if (modeIcon) {
    modeIcon.className = 'fa-solid fa-moon';
  }

  if (modeDescription) {
    modeDescription.textContent = 'Modo oscuro activado';
  }

  // ==========================================
  // CAMBIAR ENTRE MODO OSCURO Y CLARO
  // ==========================================

  if (toggle) {

    toggle.addEventListener('change', function () {

      if (this.checked) {

        html.classList.add('dark');

        if (modeIcon) {
          modeIcon.className = 'fa-solid fa-moon';
        }

        if (modeDescription) {
          modeDescription.textContent = 'Modo oscuro activado';
        }

        showToast('Modo oscuro activado', 'fa-moon');

      } else {

        html.classList.remove('dark');

        if (modeIcon) {
          modeIcon.className = 'fa-solid fa-sun';
        }

        if (modeDescription) {
          modeDescription.textContent = 'Modo claro activado';
        }

        showToast('Modo claro activado', 'fa-sun');
      }

    });

  }

  // ==========================================
  // BOTÓN PARA COMPARTIR EL PERFIL
  // ==========================================

  const shareBtn = document.getElementById('shareBtn');

  if (shareBtn) {

    shareBtn.addEventListener('click', async () => {

      // Obtener la dirección actual de la página
      const pageUrl = window.location.href;

      try {

        // Método moderno para copiar al portapapeles
        if (navigator.clipboard && window.isSecureContext) {

          await navigator.clipboard.writeText(pageUrl);

        } else {

          // Método alternativo para navegadores sin Clipboard API
          const input = document.createElement('textarea');

          input.value = pageUrl;
          input.setAttribute('readonly', '');
          input.style.position = 'fixed';
          input.style.left = '-9999px';
          input.style.top = '0';

          document.body.appendChild(input);

          input.focus();
          input.select();
          input.setSelectionRange(0, input.value.length);

          const copied = document.execCommand('copy');

          document.body.removeChild(input);

          if (!copied) {
            throw new Error('No se pudo copiar el enlace.');
          }
        }

        // Confirmar que el enlace se copió
        showToast('¡Enlace del perfil copiado!', 'fa-check-circle');

      } catch (error) {

        console.error('Error al copiar el enlace:', error);

        showToast('No se pudo copiar el enlace', 'fa-circle-exclamation');

      }

    });

  } else {

    console.warn('No se encontró el botón shareBtn.');

  }

});