'use strict'
 /* автор кода - Евгений Андриканич */

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android()
            || isMobile.BlackBerry()
            || isMobile.iOS()
            || isMobile.Opera()
            || isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    /* собираем все элементы-стрелочки в псевдомассив */
    let menuArrows = document.querySelectorAll('.menu__arrow');
    /* проверяем, существуют ли вообще такие элементы в дом-дереве */
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function (e) {
                /*тогглим класс активности у родителя нажатой стрелочки */
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

/* бургер-меню */

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if(iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        /* блокируем возможность взаимодействия со страницей при открытом мобильном меню */
        document.body.classList.toggle('_lock');
        /* добавляем класс активности к бургеру для анимирования */
        iconMenu.classList.toggle('_active');
        /* добавляем класс активности для меню, чтобы оно выезжало */
        menuBody.classList.toggle('_active');
    });
}

/* прокрутка при клике */

/* создаем массив ссылок, у которых есть дата-атрибут goto*/
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
/* если такие существуют */
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        /* на каждую из них по клику вешаем функцию */
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        /* получаем объект, на котором произошел клик */
        const menuLink = e.target;
        /* проверяем, заполнен ли дата-атрибут и существует ли объект, на который ссылается данный дата-атрибут */
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            /* получаем в константу сам объект */
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            /* получаем положение элемента на странице сверху, суммируем с положением прокрутки и вычитаем высотку хэдера, тк шапка в положении fixed */
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
        
            /* если иконка бургера активна, убираем класс _lock и классы активности */
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            /* обращаемся к объекту окна,  */
            window.scrollTo({
                /* указываем откуда и насколько прокрутить окно */
                top: gotoBlockValue,
                behavior: 'smooth'
            });
            /* выключаем дефолтное поведение, чтобы ссылка плавно переходила к разделу вместо перехода в новую вкладку */
            e.preventDefault();
        }
    }
}
