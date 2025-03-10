/* const langButtons = document.querySelectorAll("[data-value]");
const allLangs = [1, 2, 3]; */
/* const currentPathName = window.location.pathname; */
/* let currentLang = localStorage.getItem("language") || checkBrowserLang() || 1; */
/* let currentLang = 1; */
/* let currentTexts = {}; */

const langButtons = document.querySelectorAll("[data-value]");
const langSelect = document.querySelector("#languageSelect");
let currentLang = 1;

// Соответствие значений дата-атрибутов кнопок списка select data-value выбранным языкам
// 1-RU
// 2-EN
// 3-ZH

const homeTexts = {
	"header-menu-1": {
		1: "Главная",
		2: "Home",
		3: "十月",
	},
	"header-menu-2": {
		1: "Услуги",
		2: "Services",
		3: "服務",
	},
	"header-menu-2-1": {
		1: "Перевозки",
		2: "Transportation",
		3: "運輸",
	},
	"header-menu-2-2": {
		1: "Таможенное оформление",
		2: "Customs clearance",
		3: "報關",
	},
	"header-menu-3": {
		1: "О нас",
		2: "About",
		3: "關於我們",
	},
	"header-menu-4": {
		1: "Вакансии",
		2: "Vacancies",
		3: "空缺職位",
	},
	"header-menu-4-1": {
		1: "Менеджер по продажам",
		2: "Sales Manager",
		3: "銷售經理",
	},
	"header-menu-4-2": {
		1: "Логист",
		2: "Logistician",
		3: "物流師",
	},
	"header-menu-4-3": {
		1: "Водитель",
		2: "Driver",
		3: "司機",
	},
	"header-menu-5": {
		1: "Контакты",
		2: "Contacts",
		3: "聯絡方式",
	},
	"header-opening-hours": {
		1: "с 09.00 до 18.00",
		2: "from 09.00 to 18.00",
		3: "09:00 至 18:00",
	},
};

const transportationTexts = {
	"services-1": {
		1: "ООО 'ЕС Транс' выполняет перевозки комплектных и сборных грузов из Китая авто и авиа транспортом. Мы стремимся быть надежным партнером для всех, кто нуждается в перевозке грузов, обеспечивая безопасную, эффективную и своевременную доставку.",
		2: "OOO 'ES Trans' carries out transportation of complete and consolidated cargo from China by road and air transport. We strive to be a reliable partner for all who need cargo transportation, providing safe, efficient and timely delivery.",
		3: "ES Trans LLC 透過公路和空運從中國運輸整批貨物。我們努力成為每個需要貨物運輸的人士的可靠合作夥伴，確保安全、有效率、及時地運送。",
	},	
};

/* // Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/index.html":
			currentTexts = homeTexts;
			break;
		case "/transportation.html":
			currentTexts = transportationTexts;
			break;

		default:
			currentTexts = homeTexts;
			break;
	}
}
checkPagePathName(); */

// Изменение языка у текстов
/* function changeLang() {
	for (const key in homeTexts) {
		let element = document.querySelector(`[data-lang=${key}]`);
		if (element) {
			element.textContent = homeTexts[key][currentLang];
		}
	}
}
changeLang(); */

// Вешаем обработчики на каждую кнопку
/* langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		if (!event.target.classList.contains("header__btn--active")) {
			currentLang = event.target.dataset.value;
			localStorage.setItem("language", event.target.dataset.btn);
			/* resetActiveClass(langButtons, "header__btn--active");
			btn.classList.add("header__btn--active");
			changeLang();
		}
	});
});
 */

/* // Сброс активного класса у переданного массива элементов
function resetActiveClass(arr, activeClass) {
	arr.forEach((element) => {
		element.classList.remove(activeClass);
	});
} */

/* // Проверка активной кнопки
function checkActiveLangButton() {
	switch (currentLang) {
		case 1:
			document
				.querySelector('[data-value="1"]')
				.classList.add("header__btn--active");
			break;
		case 2:
			document
				.querySelector('[data-value="2"]')
				.classList.add("header__btn--active");
			break;
		case 3:
			document
				.querySelector('[data-value="3"]')
				.classList.add("header__btn--active");
			break;

		default:
			document
				.querySelector('[data-btn="ru"]')
				.classList.add("header__btn--active");
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

console.log("navigator.language", checkBrowserLang()); */



// Функция обновления текста
function changeLang() {
	for (const key in homeTexts) {
		let element = document.querySelector(`[data-lang=${key}]`);
		if (element) {
			element.textContent = homeTexts[key][currentLang];
		}
	}
}

// Устанавливаем язык при загрузке
changeLang();

// Обработчик для кнопок
langButtons.forEach((btn) => {
	btn.addEventListener("click", (event) => {
		currentLang = event.target.dataset.value;
		localStorage.setItem("language", currentLang);
		changeLang();
	});
});

// Обработчик для select
if (langSelect) {
	langSelect.value = currentLang;
	langSelect.addEventListener("change", (event) => {
		currentLang = event.target.value;
		localStorage.setItem("language", currentLang);
		changeLang();
	});
}