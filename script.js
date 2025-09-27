// ============ МИНИ-ОКНО ИНФОРМАЦИИ ============
document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('menu-trigger');
  const miniModal = document.getElementById('mini-modal');
  const closeBtn = miniModal.querySelector('.close-btn');

  if (menuButton && miniModal && closeBtn) {
    menuButton.addEventListener('click', () => {
      miniModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      miniModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
      if (e.target === miniModal) {
        miniModal.classList.remove('active');
      }
    });
  }
});

// ============ ПРОСМОТР ИЗОБРАЖЕНИЯ ============
document.addEventListener('DOMContentLoaded', function () {
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeImage = document.querySelector('.close-image');

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('theme-preview')) {
      const imgSrc = e.target.src;
      modalImage.src = imgSrc;
      imageModal.classList.add('active');
    }
  });

  if (closeImage) {
    closeImage.addEventListener('click', () => {
      imageModal.classList.remove('active');
    });
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('active');
      }
    });
  }
});

// ============ ПОДГРУЗКА ТЕМ ============
fetch('themes.json')
  .then(response => response.json())
  .then(themes => {
    const container = document.getElementById('themes-container');

    themes.forEach(theme => {
      const card = document.createElement('div');
      card.className = 'theme-card';

      card.innerHTML = `
        <h3>${theme.title}</h3>
        <p>${theme.description}</p>
        <img class="theme-preview" src="${theme.previewImage}" alt="${theme.title}">
        <a href="${theme.telegramUrl}" class="btn" target="_blank">Установить в Telegram</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки тем:', err);
    document.getElementById('themes-container').innerHTML = '<p>Не удалось загрузить темы. Проверьте themes.json</p>';
  });

// ============ ПЕРЕКЛЮЧАТЕЛЬ ПЛАТФОРМ ============
document.addEventListener('DOMContentLoaded', function () {
  const platformToggle = document.getElementById('platform-toggle');
  const platformMenu = document.getElementById('platform-menu');
  const platformItems = document.querySelectorAll('.platform-item');

  if (!platformToggle || !platformMenu) return;

  // URL-адреса для каждой платформы
  const androidUrl = 'сылка';
  const iosUrl = 'сылка';

  // Определяем текущую платформу по URL
  const currentUrl = window.location.href;
  const currentPlatform = currentUrl.includes('/ios/') ? 'ios' : 'android';

  // Помечаем активный пункт
  platformItems.forEach(item => {
    if (item.dataset.platform === currentPlatform) {
      item.classList.add('active');
    }
  });

  // Открытие/закрытие меню
  platformToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    platformMenu.classList.toggle('active');
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!platformMenu.contains(e.target) && e.target !== platformToggle) {
      platformMenu.classList.remove('active');
    }
  });

  // Обработка клика по пункту
  platformItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPlatform = item.dataset.platform;
      const targetUrl = targetPlatform === 'ios' ? iosUrl : androidUrl;

      if (!currentUrl.startsWith(targetUrl)) {
        window.location.href = targetUrl;
      }
    });
  });
});