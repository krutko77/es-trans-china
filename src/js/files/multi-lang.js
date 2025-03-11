/* const langButtons = document.querySelectorAll("[data-value]");
const langSelect = document.getElementById("languageSelect");
const currentPathName = window.location.pathname;
let currentLang = localStorage.getItem("language") || "ru";
console.log("currentLang", currentLang);
let currentTexts = {};


const headerTexts = {
	"head-title": {
		ru: "Перевозки из Китая | ЕС Транс",
		en: "Transportation from China | ES Trans",
		cn: "從中國運輸",
	},
	"header-menu-1": {
		ru: "Главная",
		en: "Home",
		cn: "十月",
	},
	"header-menu-2": {
		ru: "Услуги",
		en: "Services",
		cn: "服務",
	},
	"header-menu-2-1": {
		ru: "Перевозки",
		en: "Transportation",
		cn: "運輸",
	},
	"header-menu-2-2": {
		ru: "Таможенное оформление",
		en: "Customs clearance",
		cn: "報關",
	},
	"header-menu-3": {
		ru: "О нас",
		en: "About",
		cn: "關於我們",
	},
	"header-menu-4": {
		ru: "Вакансии",
		en: "Vacancies",
		cn: "空缺職位",
	},
	"header-menu-4-1": {
		ru: "Менеджер по продажам",
		en: "Sales Manager",
		cn: "銷售經理",
	},
	"header-menu-4-2": {
		ru: "Логист",
		en: "Logistician",
		cn: "物流師",
	},
	"header-menu-4-3": {
		ru: "Водитель",
		en: "Driver",
		cn: "司機",
	},
	"header-menu-5": {
		ru: "Контакты",
		en: "Contacts",
		cn: "聯絡方式",
	},
	"header-opening-hours": {
		ru: "с 09.00 до 18.00",
		en: "from 09.00 to 18.00",
		cn: "09:00 至 18:00",
	},
};

const transportationTexts = {
	"services-1": {
		ru: "ООО 'ЕС Транс' выполняет перевозки комплектных и сборных грузов из Китая авто и авиа транспортом. Мы стремимся быть надежным партнером для всех, кто нуждается в перевозке грузов, обеспечивая безопасную, эффективную и своевременную доставку.",
		en: "OOO 'ES Trans' carries out transportation of complete and consolidated cargo from China by road and air transport. We strive to be a reliable partner for all who need cargo transportation, providing safe, efficient and timely delivery.",
		cn: "ES Trans LLC 透過公路和空運從中國運輸整批貨物。我們努力成為每個需要貨物運輸的人士的可靠合作夥伴，確保安全、有效率、及時地運送。",
	},
};

// Проверка пути страницы сайта
function checkPagePathName() {
	switch (currentPathName) {
		case "/home.html":
			currentTexts = headerTexts;
			break;
		case "/services-transportation.html":
			currentTexts = transportationTexts;
			break;
		default:
			currentTexts = headerTexts;
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

// Вызываем changeLang для установки текста
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
	langSelect.addEventListener("change", (event) => {
		currentLang = event.target.value;
		localStorage.setItem("language", currentLang);
		changeLang();
	});
}

console.log("langSelect.value", langSelect.value); */


document.addEventListener("DOMContentLoaded", () => {
	const langButtons = document.querySelectorAll("[data-value]");
	const langSelect = document.getElementById("languageSelect");
	const currentPathName = window.location.pathname;
	let currentLang = localStorage.getItem("language") || "ru";
	console.log("currentLang", currentLang);
	let currentTexts = {};

	const headerTexts = {
		"head-title": {
			ru: "Перевозки из Китая | ЕС Транс",
			en: "Transportation from China | ES Trans",
			cn: "從中國運輸",
		},
		"header-menu-1": {
			ru: "Главная",
			en: "Home",
			cn: "十月",
		},
		"header-menu-2": {
			ru: "Услуги",
			en: "Services",
			cn: "服務",
		},
		"header-menu-2-1": {
			ru: "Перевозки",
			en: "Transportation",
			cn: "運輸",
		},
		"header-menu-2-2": {
			ru: "Таможенное оформление",
			en: "Customs clearance",
			cn: "報關",
		},
		"header-menu-3": {
			ru: "О нас",
			en: "About",
			cn: "關於我們",
		},
		"header-menu-4": {
			ru: "Вакансии",
			en: "Vacancies",
			cn: "空缺職位",
		},
		"header-menu-4-1": {
			ru: "Менеджер по продажам",
			en: "Sales Manager",
			cn: "銷售經理",
		},
		"header-menu-4-2": {
			ru: "Логист",
			en: "Logistician",
			cn: "物流師",
		},
		"header-menu-4-3": {
			ru: "Водитель",
			en: "Driver",
			cn: "司機",
		},
		"header-menu-5": {
			ru: "Контакты",
			en: "Contacts",
			cn: "聯絡方式",
		},
		"header-opening-hours": {
			ru: "с 09.00 до 18.00",
			en: "from 09.00 to 18.00",
			cn: "09:00 至 18:00",
		},
	};

	const transportationTexts = {
		"services-1": {
			ru: "ООО 'ЕС Транс' выполняет перевозки комплектных и сборных грузов из Китая авто и авиа транспортом. Мы стремимся быть надежным партнером для всех, кто нуждается в перевозке грузов, обеспечивая безопасную, эффективную и своевременную доставку.",
			en: "OOO 'ES Trans' carries out transportation of complete and consolidated cargo from China by road and air transport. We strive to be a reliable partner for all who need cargo transportation, providing safe, efficient and timely delivery.",
			cn: "ES Trans LLC 透過公路和空運從中國運輸整批貨物。我們努力成為每個需要貨物運輸的人士的可靠合作夥伴，確保安全、有效率、及時地運送。",
		},
	};

	// Проверка пути страницы сайта
	function checkPagePathName() {
		switch (currentPathName) {
			case "/home.html":
				currentTexts = headerTexts;
				break;
			case "/services-transportation.html":
				currentTexts = transportationTexts;
				break;
			default:
				currentTexts = headerTexts;
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
		console.log("langSelect.value после установки:", langSelect.value);

		// Установка атрибута selected для соответствующего option
		const options = langSelect.querySelectorAll("option");
		options.forEach(option => {
			if (option.value === currentLang) {
				option.setAttribute("selected", "selected");
			} else {
				option.removeAttribute("selected");
			}
		});
	}

	// Вызываем changeLang для установки текста
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
		langSelect.addEventListener("change", (event) => {
			currentLang = event.target.value;
			localStorage.setItem("language", currentLang);
			changeLang();
		});
	}

	console.log("langSelect.value в конце скрипта:", langSelect.value);
});
