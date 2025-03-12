const langSelect = document.getElementById("languageSelect");
const allLangs = ["ru", "en", "de"];
const currentPathName = window.location.pathname;
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ru";
let currentTexts = {};

// Контент главной страницы
import { homeTexts } from "./homePage.js";
// Контент страницы Переврозки
import { transportationTexts } from "./transportationPage.js";

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/home.html":
			currentTexts = homeTexts;
			break;
		case "/services-transportation.html":
			currentTexts = transportationTexts;
			break;
		case "/services-customs.html":
			currentTexts = customsTexts;
			break;
		case "/about.html":
			currentTexts = aboutTexts;
			break;
		case "/offer-sales-manager.html":
			currentTexts = offerManagerTexts;
			break;
		case "/offer-logistician.html":
			currentTexts = offerLogisticianTexts;
			break;
		case "/offer-driver.html":
			currentTexts = offerDriverTexts;
			break;
		case "/contacts.html":
			currentTexts = contactsTexts;
			break;
		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName();

// Изменение языка у текстов
function changeLang() {
	for (const key in currentTexts) {
		let element = document.querySelector(`[data-lang=${key}]`);
		if (element) {
			element.textContent = currentTexts[key][currentLang];
		}
	}
}

// Установка значения select и атрибута selected
if (langSelect) {
	langSelect.value = currentLang; // Устанавливаем текущее значение
}

// Вызываем changeLang для установки текста
changeLang();

// Обработчик для select
if (langSelect) {
	langSelect.addEventListener("change", (event) => {
		currentLang = event.target.value;
		localStorage.setItem("language", currentLang);
		changeLang();
	});
}

// Проверка языка браузера
function checkBrowserLang() {
	const navLang = navigator.language.slice(0, 2).toLowerCase();
	const result = allLangs.some((element) => {
		return element === navLang;
	});
	if (result) {
		return navLang;
	}
}

console.log("lang", navigator.language.slice(0, 2));
console.log("navigator.language", checkBrowserLang());
