const langButtons = document.querySelectorAll("[data-btn]");
const allLangs = ["ru", "en", "de"];
const currentPathName = window.location.pathname;
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ru";
let currentTexts = {};

const homeTexts = {
	"home_page-title": {
		ru: "Домашняя страница",
		en: "Homepage",
		de: "Startseite",
	},
	"home_page-1": {
		ru: "Первый параграф",
		en: "First paragraph",
		de: "Erster Paragraph",
	},
	"home_page-2": {
		ru: "Второй параграф",
		en: "Second paragraph",
		de: "Zweiter Absatz",
	},
	"home_page-3": {
		ru: "Третий параграф",
		en: "Third paragraph",
		de: "Dritter Absatz",
	},
	"home_page-4": {
		ru: "Другая страница",
		en: "Another page",
		de: "Eine andere Seite",
	},
};
const anotherTexts = {
	"another_page-title": {
		ru: "Другая страница",
		en: "Another page",
		de: "Eine andere Seite",
	},
	"another_page-1": {
		ru: "Первый параграф",
		en: "First paragraph on another page",
		de: "Erster Paragraph auf einer anderen Seite",
	},
	"another_page-2": {
		ru: "Второй параграф",
		en: "Second paragraph on another page",
		de: "Zweiter Absatz auf einer anderen Seite",
	},
	"another_page-3": {
		ru: "Третий параграф",
		en: "Third paragraph on another page",
		de: "Dritter Absatz auf einer anderen Seite",
	},
	"another_page-4": {
		ru: "Домашняя страница",
		en: "Homepage",
		de: "Startseite",
	},
};

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		case "/another_page.html":
			currentTexts = anotherTexts;
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
changeLang();

// Вешаем обработчики на каждую кнопку
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn_active")) {
			currentLang = event.target.dataset.btn;
			localStorage.setItem("language", event.target.dataset.btn);
			resetActiveClass(langButtons, "header__btn_active");
			btn.classList.add("header__btn_active");
			changeLang();
		}
	});
});

// Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((element) => {
		element.classList.remove(activeClass);
	});
}

// Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case "ru":
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
		case "en":
			document
				.querySelector('[data-btn="en"]')
				.classList.add("header__btn_active");
			break;
		case "de":
			document
				.querySelector('[data-btn="de"]')
				.classList.add("header__btn_active");
			break;

		default:
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn_active");
			break;
	}
}
checkActiveLangButton();

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

console.log("navigator.language", checkBrowserLang());