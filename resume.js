function setupSectionScrolling() {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let isTransitioning = false;

    // Функция для показа секции
    function showSection(index, instant = false) {
        if (isTransitioning) return;

        isTransitioning = true;

        sections[currentSection].classList.remove('visible');
        currentSection = index;
        sections[currentSection].classList.add('visible');

        if (!instant) {
            setTimeout(() => {
                isTransitioning = false;
            }, 1500); // Задержка 500 мс
        } else {
            isTransitioning = false;
        }
    }

    // Обработчик прокрутки
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            showSection((currentSection + 1) % sections.length); // Прокрутка вниз
        } else {
            showSection((currentSection - 1 + sections.length) % sections.length); // Прокрутка вверх
        }
    });

    // Обработчики для ссылок в меню
    const links = document.querySelectorAll('.menu a');
    links.forEach((link, index) => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            showSection(index, true); // Мгновенный переход
        });
    });
}

function setupSlider() {
    const sections = document.querySelectorAll('.section');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSection = 0;

    // Функция для показа секции
    function showSection(index) {
        sections[currentSection].classList.remove('visible');
        currentSection = index;
        sections[currentSection].classList.add('visible');
    }

    // Кнопка "Назад"
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            const newIndex = (currentSection - 1 + sections.length) % sections.length;
            showSection(newIndex);
        });
    }

    // Кнопка "Вперёд"
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            const newIndex = (currentSection + 1) % sections.length;
            showSection(newIndex);
        });
    }
}

let currentMode = null; // Текущий режим (desktop или mobile)

function initializeLogic() {
    const isMobile = window.innerWidth <= 940;

    // Если режим не изменился, ничего не делаем
    if (currentMode === (isMobile ? 'mobile' : 'desktop')) return;

    // Удаляем старые обработчики
    if (currentMode === 'desktop') {
        window.removeEventListener('wheel', handleWheel);
        const links = document.querySelectorAll('.menu a');
        links.forEach(link => {
            link.removeEventListener('click', handleLinkClick);
        });
    } else if (currentMode === 'mobile') {
        const prevButton = document.querySelector('.slider-prev');
        const nextButton = document.querySelector('.slider-next');
        if (prevButton) prevButton.removeEventListener('click', handlePrevClick);
        if (nextButton) nextButton.removeEventListener('click', handleNextClick);
    }

    // Устанавливаем новый режим
    currentMode = isMobile ? 'mobile' : 'desktop';

    // Инициализируем новую логику
    if (isMobile) {
        setupSlider(); // Включаем слайдер
    } else {
        setupSectionScrolling(); // Включаем переключение секций
    }
}

// Обработчик изменения размера окна
window.addEventListener('resize', initializeLogic);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeLogic);

// Появление и скрытие меню при нажатии на кнопку, а также скрытие при нажатии вне меню

document.addEventListener('DOMContentLoaded', function () {
    const menuBurger = document.querySelector('.menu__burger');
    const menu = document.querySelector('.menu');
    const menuOverlay = document.querySelector('.menu__overlay');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const wrapper = document.querySelector('.wrapper');

    // Открытие/закрытие меню при клике на бургер
    menuBurger.addEventListener('click', function () {
        menuBurger.classList.toggle('active');
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        prevButton.classList.toggle('delite');
        nextButton.classList.toggle('delite');
        wrapper.classList.toggle('delite');
    });

    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', function () {
        menu.classList.remove('active');
        menuBurger.classList.remove('active');
        menuOverlay.classList.remove('active');
        prevButton.classList.remove('delite');
        nextButton.classList.remove('delite');
        wrapper.classList.remove('delite');
    });

    // Закрытие меню при клике на ссылку
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            menuBurger.classList.remove('active');
            menuOverlay.classList.remove('active');
            prevButton.classList.remove('delite');
            nextButton.classList.remove('delite');
            wrapper.classList.remove('delite');
        });
    });
});
