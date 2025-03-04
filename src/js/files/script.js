// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Отключение transition до полной загрузки страницы
if (document.querySelector('.offer-button')) {  //
	let elem = document.querySelector('.offer-button');

	window.onload = function () {
		elem.classList.remove('preload');
	};
}

// Кнопка НАЗАД
if (document.querySelector('.back-button')) {  // Проверяем наличие элемента на странице
	document.querySelector('.back-button').onclick = function () { // Клик по кнопке НАЗАД
		window.history.go(-1); return false;// возвращаемся назад
	};
}

// Для меню со вложенностями при переносе на WP
// Находим все элементы li с классом menu-item-has-children
const menuItems = document.querySelectorAll('li.menu-item-has-children');
// Перебираем найденные элементы и добавляем в каждый из них элемент span
menuItems.forEach(item => {
	const spanElement = document.createElement('span');
	spanElement.classList.add('menu__arrow'); // Добавляем классы
	const ulElement = item.querySelector('ul'); // получаем дочерний ul
	// Вставляем span в родительский li перед сестринским ul
	item.insertBefore(spanElement, ulElement);
	// Для сенсорных экранов вешаем слушателя на стрелку для добавления класса родителю
	if (isMobile.any()) {
		spanElement.addEventListener('click', function () {
			spanElement.parentElement.classList.toggle('_active');
		});
	}
});
// Добавляем класс sub-link ссылкам субменю для форматирования font-size
document.addEventListener("DOMContentLoaded", function () {
	const subMenus = document.querySelectorAll("ul.sub-menu > li > a");

	subMenus.forEach(function (link) {
		link.classList.add("sub-link");
	});
});

// Защита формы от ботов, проверка через пустое поле
// Форма для страницы услуг по таможне
if (document.querySelector('.form-button-customs')) {  // Проверяем наличие элемента на странице
	let code = document.querySelector('#code-customs'); // Получаем скрытый input
	document.querySelector('.form-button-customs').onclick = function () { // Клик по кнопке отправки
		code.value = 'NOSPAM'; // Подставляем значение в value инпута	
	};
}
// Форма для страниц вакансий менеджера и логиста
if (document.querySelector('.form-button-offer')) {  // Проверяем наличие элемента на странице
	let code = document.querySelector('#code-offer'); // Получаем скрытый input
	document.querySelector('.form-button-offer').onclick = function () { // Клик по кнопке отправки
		code.value = 'NOSPAM'; // Подставляем значение в value инпута	
	};
}
// Форма для страницы вакансии водителя
if (document.querySelector('.form-button-driver')) {  // Проверяем наличие элемента на странице
	let code = document.querySelector('#code-driver'); // Получаем скрытый input
	document.querySelector('.form-button-driver').onclick = function () { // Клик по кнопке отправки
		code.value = 'NOSPAM'; // Подставляем значение в value инпута	
	};
}

// Переключение на страницу благодарности после отправки формы
document.addEventListener('formSent', function (event) {
	location = 'https://es-trans.ru/thank-you-page';
}, false);