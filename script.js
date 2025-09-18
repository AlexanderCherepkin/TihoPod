// Открытие/закрытие мобильного меню
document.addEventListener('DOMContentLoaded', function() {
  var menuButton = document.querySelector('.choose-cabin-btn');
  var navOverlay = document.getElementById('navMenu');
  var closeMenuBtn = document.querySelector('.close-menu');

  if(menuButton && navOverlay && closeMenuBtn) {
    // Открытие меню
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      navOverlay.style.display = 'block';
    });
    // Закрытие меню по крестику
    closeMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      navOverlay.style.display = 'none';
    });
    // Закрытие меню по клику вне меню (на затемненный фон)
    navOverlay.addEventListener('click', function(e) {
      if(e.target === navOverlay) {
        navOverlay.style.display = 'none';
      }
    });
  }

  // Переключение вкладок "Описание/Скачать файлы" на странице продукта
  var tabLinks = document.querySelectorAll('.tab-link');
  var tabContents = document.querySelectorAll('.tab-content');
  tabLinks.forEach(function(tabBtn) {
    tabBtn.addEventListener('click', function() {
      // Убрать active у всех табов и контента
      tabLinks.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      // Активировать текущий таб и соответствующий контент
      tabBtn.classList.add('active');
      var targetId = tabBtn.getAttribute('data-tab');
      var targetContent = document.getElementById(targetId);
      if(targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Галерея миниатюр: клик по миниатюре обновляет основное изображение
  var mainImg = document.getElementById('productMainImg');
  var thumbs = document.querySelectorAll('.thumb-gallery .thumb');
  thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      if(mainImg) {
        mainImg.src = thumb.src;
      }
      // Обновить активный класс миниатюры
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Открытие модального окна заявки по кнопке "Отправить заявку"
  var requestModal = document.getElementById('requestModal');
  var successModal = document.getElementById('successModal');
  var openRequestBtns = document.querySelectorAll('.open-request-form');
  var modalCloseBtns = document.querySelectorAll('.modal-close');

  openRequestBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if(requestModal) {
        requestModal.style.display = 'flex';
      }
    });
  });

  // Функция закрытия любого модального окна
  function closeModal(modal) {
    if(modal) modal.style.display = 'none';
  }
  // Клик по крестику закрывает соответствующее модальное окно
  modalCloseBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Найти родительский .modal и закрыть
      var modal = btn.closest('.modal');
      closeModal(modal);
    });
  });
  // Клик по фону (оверлею) закрывает модалку
  [requestModal, successModal].forEach(function(modal) {
    if(modal) {
      modal.addEventListener('click', function(e) {
        if(e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });
  // Закрытие по Esc
  document.addEventListener('keydown', function(e) {
    if(e.key === "Escape") {
      [requestModal, successModal, navOverlay].forEach(function(modal) {
        if(modal && modal.style.display === 'block' || modal.style.display === 'flex') {
          modal.style.display = 'none';
        }
      });
    }
  });

  // Обработка отправки форм
  // (единая логика для формы на странице и модальной формы заявки)
  var contactForms = document.querySelectorAll('.contact-form, .request-form');
  contactForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Закрыть модальное окно заявки, если форма внутри него
      if(requestModal && form.classList.contains('request-form')) {
        closeModal(requestModal);
      }
      // Показать модальное окно успеха
      if(successModal) {
        successModal.style.display = 'flex';
      }
      // Очистить поля формы (опционально)
      form.reset();
    });
  });
});
