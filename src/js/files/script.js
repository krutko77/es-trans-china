// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Отключение transition до полной загрузки страницы
if ( document.querySelector('.offer-button') ) {  //
	let elem = document.querySelector('.offer-button'); 

			window.onload = function() {
			elem.classList.remove('preload');
		};	
}

  // Кнопка НАЗАД
if ( document.querySelector('.back-button') ) {  // Проверяем наличие элемента на странице
	document.querySelector('.back-button').onclick = function(){ // Клик по кнопке НАЗАД
		window.history.go(-1); return false;// возвращаемся назад
	};
}

