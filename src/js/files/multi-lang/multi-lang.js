const langSelect = document.getElementById("languageSelect");
const allLangs = ["ru", "en", "cn"];
const currentPathName = window.location.pathname;
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ru";
let currentTexts = {};

// Контент главной страницы
import { homeTexts } from "./home.js";
// Контент страницы Переврозки
import { transportationTexts } from "./services-transportation.js";
// Контент страницы Таможенное оформление
import { customsTexts } from "./services-customs.js";
// Контент страницы Переврозки
import { aboutTexts } from "./about.js";
// Контент страницы Вакансия МОП
import { salesManagerTexts } from "./vacancy-sales-manager.js";

// Контент страницы Контакты
import { contactsTexts } from "./contacts.js";


// Контент страницы 404
import { errorTexts } from "./404.js";
// Контент страницы благодарности
import { thankTexts } from "./thank-you-page.js";
// Контент страницы Соглашение
import { agreementTexts } from "./agreement.js";
// Контент страницы Политика
import { privacyPolicyTexts } from "./privacy-policy.js";
// Контент страницы Договоры
import { contractsTexts } from "./contracts.js";
// Контент страницы Договор с водителем
import { contractDriverTexts } from "./contract-driver.js";


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
		case "/vacancy-sales-manager.html":
			currentTexts = salesManagerTexts;
			break;
		case "/vacancy-logistician.html":
			currentTexts = LogisticianTexts;
			break;
		case "/vacancy-driver.html":
			currentTexts = offerDriverTexts;
			break;
		case "/contacts.html":
			currentTexts = contactsTexts;
			break;
		case "/thank-you-page.html":
			currentTexts = thankTexts;
			break;
		case "/404.html":
			currentTexts = errorTexts;
			break;
		case "/contract-driver.html":
			currentTexts = contractDriverTexts;
			break;
		case "/contracts.html":
			currentTexts = contractsTexts;
			break;
		case "/privacy-policy.html":
			currentTexts = privacyPolicyTexts;
			break;
		case "/agreement.html":
			currentTexts = agreementTexts;
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

// Установка значения select
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

/* console.log("lang", navigator.language.slice(0, 2));
console.log("navigator.language", checkBrowserLang());
 */