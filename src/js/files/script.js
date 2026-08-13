// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активних модулей
import { flsModules } from "./modules.js";

// Отключение transition до полной загрузки страницы
if (document.querySelector('.offer-button')) {  //
	let elem = document.querySelector('.offer-button');

	window.onload = function () {
		elem.classList.remove('preload');
	};
};

// Кнопка НАЗАД
if (document.querySelector('.back-button')) {  // Проверяем наличие элемента на странице
	document.querySelector('.back-button').onclick = function () { // Клик по кнопке НАЗАД
		window.history.go(-1); return false;// возвращаемся назад
	};
};

// Добавление класса _navigator-active к активному пункту меню
const currentPage = location.href;
const allAs = document.querySelectorAll('.menu__link');
const allAsLength = allAs.length

for (let i = 0; i < allAsLength; i++) {
	if (allAs[i].href === currentPage) {
		allAs[i].className = "menu__link _navigator-active";
	}
};

// Для меню со вложенностями с учетом переноса на WP
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
			spanElement.parentElement.classList.toggle('_submenu-active');
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
};

// Форма для страниц вакансий менеджера и логиста
if (document.querySelector('.form-button-offer')) {  // Проверяем наличие элемента на странице
	let code = document.querySelector('#code-offer'); // Получаем скрытый input
	document.querySelector('.form-button-offer').onclick = function () { // Клик по кнопке отправки
		code.value = 'NOSPAM'; // Подставляем значение в value инпута	
	};
};

// Форма для страницы вакансии водителя
if (document.querySelector('.form-button-driver')) {  // Проверяем наличие элемента на странице
	let code = document.querySelector('#code-driver'); // Получаем скрытый input
	document.querySelector('.form-button-driver').onclick = function () { // Клик по кнопке отправки
		code.value = 'NOSPAM'; // Подставляем значение в value инпута	
	};
};

// Динамического управления aria-hidden. При открытии модального окна удаляет aria-hidden="true" и добавляет его обратно при закрытии. 
document.querySelectorAll('[data-open-popup]').forEach(button => {
	button.addEventListener('click', () => {
		const popupId = button.dataset.openPopup; // Например, data-open-popup="popup-form-customs"
		const popup = document.getElementById(popupId);
		popup.removeAttribute('aria-hidden');
		// Перенос фокуса внутрь попапа
		const firstInput = popup.querySelector('input, button, [tabindex]');
		firstInput?.focus();
	});
});

document.querySelectorAll('[data-close]').forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup');
		popup.setAttribute('aria-hidden', 'true');
	});
});

// Переключение на страницу благодарности после отправки формы
document.addEventListener('formSent', function (event) {
	location = 'https://es-trans.ru/thank-you-page.html';
}, false);

/*
 * Cookie-consent баннер для es-trans.ru — ИТОГОВАЯ версия с гейтингом
 * Яндекс.Метрики И формы заявки Bitrix24.
 *
 * Это финальная сборка cookie-banner.js (../cookie-banner/cookie-banner.js)
 * с добавленным патчем Bitrix24 (см. README.md в этой папке) — готова к
 * вставке как есть в сборку Gulp вместо текущего js/cookie-banner.js.
 *
 * Требования на стороне HTML:
 *   1) Метрику в <head> завернуть в window.__esTransInitMetrika (см.
 *      README.md в ../cookie-banner/) — сам этот файл её не трогает,
 *      только решает, когда вызвать.
 *   2) Инлайн-скрипт формы Bitrix24 в попапе #popup-form заменить на
 *      заглушку с id="b24-form-mount" (см. README.md в этой папке,
 *      Шаг 1) — сам этот файл вставляет loader_16.js программно.
 */
(function () {
	'use strict';

	var STORAGE_KEY = 'es-trans-cookie-consent'; // 'accepted' | 'declined'
	var PRIVACY_URL = '/privacy-policy.html';
	var AGREEMENT_URL = '/agreement.html';

	function getConsent() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return null;
		}
	}

	function setConsent(value) {
		try {
			localStorage.setItem(STORAGE_KEY, value);
		} catch (e) {
			/* localStorage недоступен (приватный режим и т.п.) — баннер просто
			   будет показываться повторно, это не критично */
		}
	}

	function initMetrikaIfAllowed() {
		if (typeof window.__esTransInitMetrika === 'function') {
			window.__esTransInitMetrika();
		}
	}

	// Форма заявки Bitrix24 (data-b24-form) грузится отдельным скриптом с
	// cdn-ru.bitrix24.ru и сама решает, когда трекать свою аналитику — до
	// этого патча она стартовала сразу при загрузке страницы, до любого
	// выбора в cookie-баннере. Теперь скрипт вставляется только после
	// того, как пользователь нажал «Принимаю» или «Отказаться» (после
	// ЛЮБОГО выбора — форма нужна для приёма заявок, не только аналитики).
	// См. README.md в этой же папке — там же патч для HTML-заглушки на
	// месте формы (#b24-form-mount) и подключение loader_16.js.
	function initBitrixFormIfAllowed() {
		if (window.__esTransBitrixFormInited) return;
		window.__esTransBitrixFormInited = true;

		var mount = document.getElementById('b24-form-mount');
		if (!mount) return;

		mount.innerHTML = '';

		// ВАЖНО: скрипт вставляется ВНУТРЬ #b24-form-mount, а не рядом с
		// первым <script> на странице. С data-skip-moving="true" виджет
		// Bitrix24 рендерит себя рядом с самим тегом <script> — если
		// вставить его в <head> (как делает распространённый в интернете
		// сниппет с getElementsByTagName('script')[0]), форма отрисуется
		// в <head> и попап останется пустым. В оригинальном инлайн-варианте
		// это работало, потому что <script> физически лежал внутри
		// .popup__text — здесь тот же эффект достигается вставкой в mount.
		var s = document.createElement('script');
		s.async = true;
		s.setAttribute('data-b24-form', 'inline/16/nzutcg');
		s.setAttribute('data-skip-moving', 'true');
		s.src = 'https://cdn-ru.bitrix24.ru/b21839048/crm/form/loader_16.js?' + (Date.now() / 180000 | 0);
		mount.appendChild(s);
	}

	function buildBanner() {
		var banner = document.createElement('div');
		banner.className = 'cookie-banner';
		banner.setAttribute('role', 'dialog');
		banner.setAttribute('aria-live', 'polite');
		banner.setAttribute('aria-label', 'Уведомление об использовании файлов cookie');

		banner.innerHTML =
			'<div class="cookie-banner__inner">' +
			'<p class="cookie-banner__text">' +
			'<span data-lang="cookie-banner-1">Мы используем файлы cookie для работы сайта и аналитики.</span> ' +
			'<span data-lang="cookie-banner-2">Продолжая пользоваться сайтом, вы соглашаетесь с</span> ' +
			'<a class="cookie-banner__link" data-lang="cookie-banner-3" href="' + PRIVACY_URL + '">Политикой конфиденциальности</a> ' +
			'<span data-lang="cookie-banner-4">и</span> <a class="cookie-banner__link" data-lang="cookie-banner-5" href="' + AGREEMENT_URL + '">Согласием на обработку данных</a>.' +
			'</p>' +
			'<div class="cookie-banner__actions">' +
			'<button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-lang="cookie-banner-6">Отказаться</button>' +
			'<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-lang="cookie-banner-7">Принимаю</button>' +
			'</div>' +
			'</div>';

		return banner;
	}

	function showBanner() {
		var banner = buildBanner();
		document.body.appendChild(banner);

		// небольшая задержка перед анимацией появления
		requestAnimationFrame(function () {
			banner.classList.add('cookie-banner--visible');
		});

		function hide() {
			banner.classList.remove('cookie-banner--visible');
			banner.addEventListener('transitionend', function onEnd() {
				banner.removeEventListener('transitionend', onEnd);
				banner.remove();
			});
			// на случай если transitionend не сработает (нет CSS-transition)
			setTimeout(function () {
				if (banner.parentNode) banner.remove();
			}, 400);
		}

		banner.querySelector('.cookie-banner__btn--accept').addEventListener('click', function () {
			setConsent('accepted');
			initMetrikaIfAllowed();
			initBitrixFormIfAllowed();
			hide();
		});

		banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', function () {
			setConsent('declined');
			initBitrixFormIfAllowed();
			hide();
		});
	}

	function start() {
		var consent = getConsent();

		if (consent === 'accepted') {
			initMetrikaIfAllowed();
			initBitrixFormIfAllowed();
			return;
		}

		if (consent === 'declined') {
			initBitrixFormIfAllowed(); // форма доступна и при отказе — трекинга это не касается
			return;
		}

		showBanner();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
})();

/*
 * Уведомление о переходе в мессенджер (Telegram / MAX) для es-trans.ru.
 *
 * При клике на ссылку, ведущую в Telegram (t.me/...) или MAX (max.ru/...),
 * переход блокируется и показывается модалка с текстом про обработку
 * персональных данных (та же формулировка, что в cookie-баннере) и
 * кнопкой «Перейти». Решение запоминается в localStorage ОТДЕЛЬНО для
 * каждого мессенджера — при повторном клике на ссылку того же мессенджера
 * модалка больше не показывается (согласие один раз, как в вариант 3,
 * согласованном с пользователем).
 *
 * Подключение (перед </body>, независимо от cookie-banner.js):
 *   <link rel="stylesheet" href="/css/messenger-consent.css">
 *   <script src="/js/messenger-consent.js" defer></script>
 *
 * Ничего в HTML менять не нужно — ссылки на мессенджеры перехватываются
 * по href-паттерну через делегирование на document, работает для любого
 * количества ссылок на любых страницах/блоках сайта.
 */
(function () {
	'use strict';

	var STORAGE_PREFIX = 'es-trans-messenger-consent-'; // + 'telegram' | 'max'
	var PRIVACY_URL = '/privacy-policy.html';
	var AGREEMENT_URL = '/agreement.html';

	// Правила определения мессенджера по href. Порядок важен, только если
	// домены пересекаются (здесь не пересекаются).
	var MESSENGERS = [
		{ id: 'telegram', name: 'Telegram', test: /(^|\/\/)(t\.me|telegram\.me)\//i },
		{ id: 'max', name: 'MAX', test: /(^|\/\/)max\.ru\//i }
	];

	function detectMessenger(href) {
		if (!href) return null;
		for (var i = 0; i < MESSENGERS.length; i++) {
			if (MESSENGERS[i].test.test(href)) return MESSENGERS[i];
		}
		return null;
	}

	function getConsent(id) {
		try {
			return localStorage.getItem(STORAGE_PREFIX + id);
		} catch (e) {
			return null;
		}
	}

	function setConsent(id) {
		try {
			localStorage.setItem(STORAGE_PREFIX + id, 'accepted');
		} catch (e) {
			/* localStorage недоступен — модалка будет показываться повторно,
			   это не критично */
		}
	}

	function buildModal(messenger, onConfirm) {
		var overlay = document.createElement('div');
		overlay.className = 'messenger-consent-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.setAttribute('aria-label', 'Переход в ' + messenger.name);

		overlay.innerHTML =
			'<div class="messenger-consent">' +
				'<p class="messenger-consent__text">' +
					'<span data-lang="messenger-consent-1">Вы переходите в</span> ' + messenger.name + '. <span data-lang="messenger-consent-2">Общаясь с нами в мессенджере,</span> ' +
					'<span data-lang="messenger-consent-3">вы соглашаетесь с</span> ' +
					'<a class="messenger-consent__link" data-lang="messenger-consent-4" href="' + PRIVACY_URL + '" target="_blank">Политикой конфиденциальности</a> ' +
					'<span data-lang="messenger-consent-5>и</span> <a class="messenger-consent__link" data-lang="messenger-consent-6" href="' + AGREEMENT_URL + '" target="_blank">Соглаcием на обработку данных</a>.' +
				'</p>' +
				'<div class="messenger-consent__actions">' +
					'<button type="button" class="messenger-consent__btn messenger-consent__btn--cancel" data-lang="messenger-consent-7">Отмена</button>' +
					'<button type="button" class="messenger-consent__btn messenger-consent__btn--confirm" data-lang="messenger-consent-8">Перейти</button>' +
				'</div>' +
			'</div>';

		function close() {
			overlay.classList.remove('messenger-consent-overlay--visible');
			overlay.addEventListener('transitionend', function onEnd() {
				overlay.removeEventListener('transitionend', onEnd);
				overlay.remove();
			});
			setTimeout(function () {
				if (overlay.parentNode) overlay.remove();
			}, 300);
		}

		overlay.querySelector('.messenger-consent__btn--cancel').addEventListener('click', close);
		overlay.addEventListener('click', function (e) {
			if (e.target === overlay) close();
		});
		overlay.querySelector('.messenger-consent__btn--confirm').addEventListener('click', function () {
			close();
			onConfirm();
		});

		document.addEventListener('keydown', function onEsc(e) {
			if (e.key === 'Escape') {
				document.removeEventListener('keydown', onEsc);
				close();
			}
		});

		return overlay;
	}

	function showModal(messenger, href, targetBlank) {
		var overlay = buildModal(messenger, function () {
			setConsent(messenger.id);
			if (targetBlank) {
				window.open(href, '_blank', 'noopener');
			} else {
				window.location.href = href;
			}
		});
		document.body.appendChild(overlay);
		requestAnimationFrame(function () {
			overlay.classList.add('messenger-consent-overlay--visible');
		});
	}

	document.addEventListener('click', function (e) {
		var link = e.target.closest ? e.target.closest('a[href]') : null;
		if (!link) return;

		var messenger = detectMessenger(link.getAttribute('href'));
		if (!messenger) return;

		if (getConsent(messenger.id) === 'accepted') return; // уже согласились раньше — пропускаем как обычную ссылку

		e.preventDefault();
		showModal(messenger, link.href, link.target === '_blank');
	});
})();
