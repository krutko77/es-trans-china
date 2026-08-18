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
 * Cookie-consent баннер для es-trans.ru
 *
 * Базис: версия из cookie-banner-i18n-fix/ (на проде с 18.08.2026).
 * Логика согласия, словарь и локализация НЕ МЕНЯЛИСЬ.
 *
 * ЧТО ДОБАВЛЕНО В ЭТОЙ ВЕРСИИ (патч consent-gating-fix, 18.08.2026)
 * ------------------------------------------------------------------
 * Прод-аудит cookie показал два расхождения с разделом 7 Политики:
 *
 *   (A) Яндекс.Карта на contacts.html ставила 11 cookie домена
 *       .yandex.ru (yandexuid, yuidss, i, pi, bh, ymex, yashr, _yasc,
 *       is_gdpr, is_gdpr_b, yabs-sid; до 400 дней) — ДО выбора в баннере
 *       и ВОПРЕКИ явному отказу. Причина: <iframe data-src> подхватывался
 *       общим ленивым загрузчиком сайта, к системе согласия привязан
 *       не был. yandexuid/yuidss — сквозные идентификаторы Яндекса,
 *       техническая необходимость сайта ими не покрывается.
 *
 *   (B) Скрипты Bitrix24 грузились сразу после ЛЮБОГО выбора, включая
 *       отказ, и писали b24_crm_guest_pages (история посещённых страниц),
 *       b24_crm_guest_utm (UTM + gclid) и счётчик просмотров. Политика
 *       при отказе обещает, что «связанные скрипты не загружаются».
 *
 * Решение:
 *   (A) карта заменяется заглушкой с кнопкой «Показать карту». При
 *       согласии грузится сразу; при отказе/без выбора — только по клику
 *       пользователя, РАЗОВО для текущего визита. Клик по кнопке НЕ
 *       переписывает согласие в localStorage: это разовое действие,
 *       а не смена решения.
 *   (B) скрипт формы Bitrix24 грузится не при выборе, а при первом
 *       открытии попапа #popup-form (кнопки data-popup="#popup-form").
 *       Форма остаётся доступной при любом выборе — она нужна для приёма
 *       заявок, а не для аналитики, — но её трекинг не стартует, пока
 *       пользователь сам не открыл форму.
 *
 * Что было в базовой версии (сохранено):
 *   1. Баннер переводит себя сам. Ключи cookie-banner-1…7 в словаре
 *      сайта есть, но je() в app.min.js отрабатывает ОДИН раз при
 *      загрузке, а баннер создаётся позже — на en/cn он оставался
 *      русским. Решение: свой словарь TRANSLATIONS + localStorage['language'].
 *   2. Опечатка в словаре сайта: у cookie-banner-1 китайский перевод
 *      был "关闭" («Закрыть»). Здесь корректный перевод.
 *
 * Подключение (перед </body>) — не меняется:
 *   <link rel="stylesheet" href="/css/cookie-banner.css">
 *   <script src="/js/cookie-banner.js" defer></script>
 *
 * Метрика в <head> должна быть завёрнута в window.__esTransInitMetrika
 * (см. cookie-banner/README.md) — этот файл её не трогает, только решает,
 * когда вызвать.
 *
 * Разметка карты на contacts.html должна быть приведена к виду
 * <div class="contact__map" data-map-src="..."> — см. README патча.
 */
(function () {
	'use strict';

	var STORAGE_KEY = 'es-trans-cookie-consent'; // 'accepted' | 'declined'
	var PRIVACY_URL = '/privacy-policy.html';
	var AGREEMENT_URL = '/agreement.html';
	var DEFAULT_LANG = 'ru';

	// Значения синхронизированы со словарём сайта в app.min.js
	// (ключи cookie-banner-1…7), кроме cn у cookie-banner-1 — см. шапку.
	var TRANSLATIONS = {
		'cookie-banner-1': {
			ru: 'Мы используем файлы cookie для работы сайта и аналитики.',
			en: 'We use cookies to operate our website and for analytics.',
			cn: '我们使用 cookie 来运营网站并进行分析。'
		},
		'cookie-banner-2': {
			ru: 'Продолжая пользоваться сайтом, вы соглашаетесь с',
			en: 'By continuing to use the site, you agree to',
			cn: '继续使用本网站，即表示您同意'
		},
		'cookie-banner-3': {
			ru: 'Политикой конфиденциальности',
			en: 'the Privacy Policy',
			cn: '隐私政策'
		},
		'cookie-banner-4': { ru: 'и', en: 'and', cn: '和' },
		'cookie-banner-5': {
			ru: 'Согласием на обработку данных',
			en: 'Consent to data processing',
			cn: '同意数据处理'
		},
		'cookie-banner-6': { ru: 'Отказаться', en: 'Refuse', cn: '拒绝' },
		'cookie-banner-7': { ru: 'Принимаю', en: 'I accept', cn: '我接受' },

		// Заглушка карты (патч consent-gating-fix). Ключей map-placeholder-*
		// в словаре сайта нет — они существуют только здесь, поэтому
		// data-lang на эти узлы не вешаем (иначе je() затрёт текст пустым
		// значением при переключении языка).
		'map-placeholder-1': {
			ru: 'Здесь карта Яндекса. Она может устанавливать файлы cookie сервиса Яндекс.Карты.',
			en: 'A Yandex map is displayed here. It may set Yandex.Maps cookies.',
			cn: '此处显示 Yandex 地图。它可能会设置 Yandex 地图的 cookie 文件。'
		},
		'map-placeholder-2': {
			ru: 'Показать карту',
			en: 'Show map',
			cn: '显示地图'
		},
		'map-placeholder-3': {
			ru: 'Адрес: 141400, Московская область, г. Химки, Коммунальный проезд, д. 2',
			en: 'Address: 2 Kommunalny proezd, Khimki, Moscow Region, 141400, Russia',
			cn: '地址：俄罗斯莫斯科州希姆基市 Kommunalny proezd 2 号，邮编 141400'
		},
		'map-placeholder-4': {
			ru: 'Открыть в Яндекс.Картах',
			en: 'Open in Yandex.Maps',
			cn: '在 Yandex 地图中打开'
		},

		// Заглушка внутри #b24-form-mount на время загрузки формы.
		// Раньше там лежал текст popup-12 «Форма станет доступна после
		// того, как вы примете или откажетесь от использования cookie…» —
		// он устарел: теперь форма грузится при открытии окна независимо
		// от выбора. Ключа form-loading-1 в словаре сайта нет, поэтому
		// data-lang на этот узел не вешаем (см. комментарий выше).
		'form-loading-1': {
			ru: 'Загружаем форму…',
			en: 'Loading the form…',
			cn: '正在加载表单…'
		}
	};

	// Ссылка «Открыть в Яндекс.Картах» — переход по клику пользователя,
	// поэтому согласия не требует (cookie ставятся уже на стороне Яндекса).
	var MAPS_EXTERNAL_URL = 'https://yandex.ru/maps/?text=' +
		encodeURIComponent('Химки, Коммунальный проезд, 2');

	// Язык определяется ТОЙ ЖЕ цепочкой, что и в app.min.js:
	//   localStorage['language'] → navigator.language → 'ru'
	//
	// Раньше здесь читался только localStorage, и это давало расхождение:
	// у посетителя с английской локалью браузера, который ещё ни разу
	// не трогал переключатель языка, localStorage пуст — сайт уходил
	// на en по navigator.language, а баннер и заглушка карты оставались
	// русскими. Поймано на проде 18.08.2026 при locale=en-US.
	//
	// Список языков (ru/en/cn) и порядок проверки скопированы из
	// app.min.js намеренно — если там появится новый язык, поправить
	// нужно в обоих местах.
	var SUPPORTED_LANGS = ['ru', 'en', 'cn'];

	function getLang() {
		var stored = null;
		try {
			stored = localStorage.getItem('language');
		} catch (e) {
			/* localStorage недоступен — идём дальше по цепочке */
		}
		if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;

		try {
			var nav = (navigator.language || '').slice(0, 2).toLowerCase();
			if (SUPPORTED_LANGS.indexOf(nav) !== -1) return nav;
		} catch (e) {
			/* navigator недоступен — вернём язык по умолчанию */
		}

		return DEFAULT_LANG;
	}

	function t(key) {
		var entry = TRANSLATIONS[key];
		if (!entry) return '';
		return entry[getLang()] || entry[DEFAULT_LANG];
	}

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
	// cdn-ru.bitrix24.ru и сама решает, когда трекать свою аналитику.
	//
	// ПАТЧ (Б): раньше скрипт вставлялся сразу после ЛЮБОГО выбора, включая
	// отказ. Прод-аудит показал, что он при этом пишет b24_crm_guest_pages
	// (история посещённых страниц), b24_crm_guest_utm и счётчик просмотров —
	// то есть ведёт себя как аналитика, которую Политика при отказе
	// запрещает. Теперь загрузка отложена до первого открытия попапа
	// с формой: форма по-прежнему доступна при любом выборе (она нужна для
	// приёма заявок, это законный интерес), но её трекинг не стартует, пока
	// пользователь сам не решил написать в компанию.
	//
	// Важно: скрипт вставляется ВНУТРЬ #b24-form-mount — с
	// data-skip-moving="true" виджет рендерит себя там, где физически
	// лежит его <script>.
	function initBitrixForm() {
		if (window.__esTransBitrixFormInited) return;
		window.__esTransBitrixFormInited = true;

		var mount = document.getElementById('b24-form-mount');
		if (!mount) return;

		// Вместо устаревшего текста popup-12 показываем «Загружаем форму…»
		// на те доли секунды, пока грузится скрипт Битрикса.
		mount.innerHTML = '';
		var loading = document.createElement('p');
		loading.className = 'b24-form-pending-notice';
		loading.textContent = t('form-loading-1');
		mount.appendChild(loading);

		// Битрикс дорисовывает форму рядом с нашим <p>, а не вместо него,
		// поэтому надпись «Загружаем форму…» надо убрать самим, как только
		// в монтпоинте появится разметка формы.
		if (typeof MutationObserver === 'function') {
			var mo = new MutationObserver(function () {
				if (mount.querySelector('.b24-form, form')) {
					if (loading.parentNode) loading.remove();
					mo.disconnect();
				}
			});
			mo.observe(mount, { childList: true, subtree: true });
			// Страховка: если форма не пришла за 15 с (сеть, блокировщик),
			// снимаем наблюдатель — надпись останется как индикатор проблемы.
			setTimeout(function () { mo.disconnect(); }, 15000);
		}

		var s = document.createElement('script');
		s.async = true;
		s.setAttribute('data-b24-form', 'inline/16/nzutcg');
		s.setAttribute('data-skip-moving', 'true');
		s.src = 'https://cdn-ru.bitrix24.ru/b21839048/crm/form/loader_16.js?' + (Date.now() / 180000 | 0);
		mount.appendChild(s);
	}

	// Ждём первого открытия попапа, в котором лежит #b24-form-mount.
	//
	// ВАЖНО про разметку сайта (проверено на проде 18.08.2026): попапов
	// с формами четыре — #popup-form, #popup-form-customs,
	// #popup-form-driver, #popup-form-manager. Битриксовый монтпоинт лежит
	// ТОЛЬКО в #popup-form; остальные три — обычные HTML-формы, которые
	// постятся на files/sendmail/sendmail.php и Битрикса не касаются.
	// При этом кнопки на разных страницах открывают разные попапы:
	//   index, about, services-transportation → #popup-form (Битрикс)
	//   services-customs                      → #popup-form-customs
	//   vacancy-driver                        → #popup-form-driver
	//   vacancy-logistician, -sales-manager   → #popup-form-manager
	//   contracts                             → триггеров нет вовсе
	// Поэтому id попапа НЕ зашиваем, а вычисляем от самого монтпоинта —
	// иначе на страницах, где кнопка ведёт в другой попап, скрипт
	// подгружался бы вхолостую.
	function watchFormPopup() {
		var mount = document.getElementById('b24-form-mount');
		if (!mount) return;

		var popup = mount.closest ? mount.closest('.popup') : null;
		if (!popup) return;

		var selector = popup.id ? '[data-popup="#' + popup.id + '"]' : null;

		// (1) Штатное событие библиотеки попапов из app.min.js. Она
		// диспатчит beforePopupOpen на document перед открытием и кладёт
		// сам инстанс в detail.popup — сравниваем целевой элемент с нашим.
		document.addEventListener('beforePopupOpen', function (e) {
			var target = e.detail && e.detail.popup && e.detail.popup.targetOpen;
			if (target && target.element === popup) initBitrixForm();
		});

		// (2) Клик по кнопке-триггеру — на случай, если событие не долетит
		// (другая версия скрипта, ошибка внутри библиотеки). Слушатель
		// на document в фазе перехвата: срабатывает раньше обработчика
		// попапа, поэтому к моменту появления окна форма уже грузится.
		if (selector) {
			document.addEventListener('click', function (e) {
				if (!e.target.closest) return;
				if (e.target.closest(selector)) initBitrixForm();
			}, true);
		}

		// (3) Последняя подстраховка — наблюдатель за aria-hidden. Попап
		// открывается либо setAttribute('aria-hidden','false') (библиотека
		// попапов), либо removeAttribute('aria-hidden') (обработчик
		// data-open-popup там же в app.min.js), поэтому проверяем «не
		// true», а не «равно false».
		if (typeof MutationObserver === 'function') {
			var mo = new MutationObserver(function () {
				if (popup.getAttribute('aria-hidden') !== 'true') {
					initBitrixForm();
					mo.disconnect();
				}
			});
			mo.observe(popup, { attributes: true, attributeFilter: ['aria-hidden'] });
		}
	}

	// --- Яндекс.Карта (патч А) --------------------------------------------
	//
	// На contacts.html разметка должна быть:
	//   <div class="contact__map" data-map-src="https://yandex.ru/map-widget/v1/?um=...">
	//   </div>
	// (без вложенного <iframe data-src>, иначе общий ленивый загрузчик сайта
	// подхватит его сам и снова обойдёт согласие).
	//
	// Карта грузится в трёх случаях: согласие уже дано, согласие даётся
	// сейчас кнопкой в баннере, либо пользователь нажал «Показать карту»
	// в заглушке. Последний случай — разовый, для текущего визита:
	// localStorage мы не трогаем, потому что «посмотреть карту» ≠ «согласиться
	// на аналитику».
	function loadMap(container) {
		if (!container || container.getAttribute('data-map-loaded') === '1') return;

		var src = container.getAttribute('data-map-src');
		if (!src) return;

		container.setAttribute('data-map-loaded', '1');
		container.innerHTML = '';

		var frame = document.createElement('iframe');
		frame.src = src;
		frame.setAttribute('frameborder', '0');
		frame.setAttribute('allowfullscreen', 'true');
		frame.setAttribute('loading', 'lazy');
		frame.setAttribute('title', 'Карта проезда');
		container.appendChild(frame);
	}

	function buildMapPlaceholder(container) {
		var box = document.createElement('div');
		box.className = 'map-placeholder';

		var note = document.createElement('p');
		note.className = 'map-placeholder__text';
		note.textContent = t('map-placeholder-1');

		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'map-placeholder__btn';
		btn.textContent = t('map-placeholder-2');
		btn.addEventListener('click', function () {
			loadMap(container);
		});

		var addr = document.createElement('p');
		addr.className = 'map-placeholder__address';
		addr.textContent = t('map-placeholder-3');

		var ext = document.createElement('a');
		ext.className = 'map-placeholder__link';
		ext.href = MAPS_EXTERNAL_URL;
		ext.target = '_blank';
		ext.rel = 'noopener noreferrer';
		ext.textContent = t('map-placeholder-4');

		box.appendChild(note);
		box.appendChild(btn);
		box.appendChild(addr);
		box.appendChild(ext);

		return box;
	}

	// Возвращает все контейнеры карт на странице (сейчас он один,
	// но привязываться к единственности незачем).
	function mapContainers() {
		return Array.prototype.slice.call(
			document.querySelectorAll('[data-map-src]')
		);
	}

	function initMaps(consent) {
		mapContainers().forEach(function (container) {
			if (consent === 'accepted') {
				loadMap(container);
				return;
			}
			if (container.getAttribute('data-map-loaded') === '1') return;
			if (container.querySelector('.map-placeholder')) return;
			container.innerHTML = '';
			container.appendChild(buildMapPlaceholder(container));
		});
	}

	// Собираем баннер через DOM-методы, а не innerHTML-строкой: строка с
	// несколькими одинаковыми классами подряд уже ломалась в
	// messenger-consent (вторая ссылка не рендерилась).
	function span(key) {
		var el = document.createElement('span');
		el.setAttribute('data-lang', key);
		el.textContent = t(key);
		return el;
	}

	function link(href, key) {
		var el = document.createElement('a');
		el.className = 'cookie-banner__link';
		el.setAttribute('data-lang', key);
		el.href = href;
		el.textContent = t(key);
		return el;
	}

	function buildBanner() {
		var banner = document.createElement('div');
		banner.className = 'cookie-banner';
		banner.setAttribute('role', 'dialog');
		banner.setAttribute('aria-live', 'polite');
		banner.setAttribute('aria-label', 'Уведомление об использовании файлов cookie');

		var inner = document.createElement('div');
		inner.className = 'cookie-banner__inner';

		var text = document.createElement('p');
		text.className = 'cookie-banner__text';
		text.appendChild(span('cookie-banner-1'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(span('cookie-banner-2'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(link(PRIVACY_URL, 'cookie-banner-3'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(span('cookie-banner-4'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(link(AGREEMENT_URL, 'cookie-banner-5'));
		text.appendChild(document.createTextNode('.'));

		var actions = document.createElement('div');
		actions.className = 'cookie-banner__actions';

		var decline = document.createElement('button');
		decline.type = 'button';
		decline.className = 'cookie-banner__btn cookie-banner__btn--decline';
		decline.setAttribute('data-lang', 'cookie-banner-6');
		decline.textContent = t('cookie-banner-6');

		var accept = document.createElement('button');
		accept.type = 'button';
		accept.className = 'cookie-banner__btn cookie-banner__btn--accept';
		accept.setAttribute('data-lang', 'cookie-banner-7');
		accept.textContent = t('cookie-banner-7');

		actions.appendChild(decline);
		actions.appendChild(accept);

		inner.appendChild(text);
		inner.appendChild(actions);
		banner.appendChild(inner);

		return banner;
	}

	function showBanner() {
		var banner = buildBanner();
		document.body.appendChild(banner);

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
			initMaps('accepted'); // карта подгружается сразу, без перезагрузки страницы
			hide();
		});

		banner.querySelector('.cookie-banner__btn--decline').addEventListener('click', function () {
			setConsent('declined');
			hide();
			// Карта уже показана заглушкой (initMaps вызван в start()),
			// форма Bitrix24 подгрузится при открытии попапа — здесь
			// делать нечего.
		});
	}

	function start() {
		var consent = getConsent();

		// Форма заявки нужна при любом выборе, поэтому слушатель ставим
		// всегда. Сам скрипт Bitrix24 подгрузится только когда пользователь
		// откроет попап.
		watchFormPopup();

		// Карта: при согласии — сразу, иначе — заглушка с кнопкой.
		initMaps(consent);

		if (consent === 'accepted') {
			initMetrikaIfAllowed();
			return;
		}

		if (consent === 'declined') {
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
	var LANGUAGE_STORAGE_KEY = 'language'; // тот же ключ, что использует app.min.js
	var DEFAULT_LOCALE = 'ru';
	var SUPPORTED_LOCALES = ['ru', 'en', 'cn']; // тот же список, что в app.min.js

	// Правила определения мессенджера по href. Порядок важен, только если
	// домены пересекаются (здесь не пересекаются).
	var MESSENGERS = [
		{ id: 'telegram', name: 'Telegram', test: /(^|\/\/)(t\.me|telegram\.me)\//i },
		{ id: 'max', name: 'MAX', test: /(^|\/\/)max\.ru\//i }
	];

	// Словарь переводов для messenger-consent-*, синхронизирован со словарём,
	// который сайт сам сгенерировал в js/app.min.js по нашим data-lang (см.
	// README, раздел про переключатель языка). Основной скрипт сайта (app.min.js)
	// применяет перевод только один раз — при загрузке страницы/смене select — и
	// не видит узлы, которые появляются в DOM позже (нашу модалку, создаваемую в
	// момент клика). Поэтому модалка переводит сама себя при построении, читая
	// тот же localStorage['language'], что использует переключатель на сайте.
	var TRANSLATIONS = {
		'messenger-consent-1': { ru: 'Вы переходите в', en: 'You are moving to', cn: '您即将搬到' },
		'messenger-consent-2': { ru: 'Общаясь с нами в мессенджере,', en: 'By communicating with us in messenger,', cn: '通过即时通讯软件与我们沟通，' },
		'messenger-consent-3': { ru: 'вы соглашаетесь с', en: 'you agree with', cn: '你同意' },
		'messenger-consent-4': { ru: 'Политикой конфиденциальности', en: 'the Privacy Policy', cn: '隐私政策' },
		'messenger-consent-5': { ru: 'и', en: 'and', cn: '和' },
		'messenger-consent-6': { ru: 'Согласием на обработку данных', en: 'Consent to data processing', cn: '同意数据处理' },
		'messenger-consent-7': { ru: 'Отмена', en: 'Cancel', cn: '取消' },
		'messenger-consent-8': { ru: 'Перейти', en: 'Go to', cn: '前往' }
	};

	// Повторяет цепочку определения языка из app.min.js:
	//   localStorage['language'] || navigator.language.slice(0,2) || 'ru',
	// где значение принимается, только если оно есть в SUPPORTED_LOCALES.
	// Без фолбэка на navigator.language модалка оставалась бы русской на
	// странице, которую сайт уже отрисовал по-английски (localStorage пуст).
	function currentLocale() {
		var stored = null;
		try { stored = localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch (e) { }
		if (stored && SUPPORTED_LOCALES.indexOf(stored) !== -1) return stored;
		try {
			var nav = (navigator.language || '').slice(0, 2).toLowerCase();
			if (SUPPORTED_LOCALES.indexOf(nav) !== -1) return nav;
		} catch (e) { }
		return DEFAULT_LOCALE;
	}

	function t(dataLang) {
		var entry = TRANSLATIONS[dataLang];
		if (!entry) return '';
		return entry[currentLocale()] || entry[DEFAULT_LOCALE];
	}

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

	function makeLink(href, dataLang) {
		var a = document.createElement('a');
		a.className = 'messenger-consent__link';
		a.setAttribute('data-lang', dataLang);
		a.href = href;
		a.target = '_blank';
		a.textContent = t(dataLang);
		return a;
	}

	function makeSpan(dataLang) {
		var span = document.createElement('span');
		span.setAttribute('data-lang', dataLang);
		span.textContent = t(dataLang);
		return span;
	}

	function buildModal(messenger, onConfirm) {
		var overlay = document.createElement('div');
		overlay.className = 'messenger-consent-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.setAttribute('aria-label', t('messenger-consent-1') + ' ' + messenger.name);

		var box = document.createElement('div');
		box.className = 'messenger-consent';

		// Собираем разметку через DOM-методы, а не innerHTML со строкой — так
		// надёжнее для динамически создаваемых узлов. data-lang проставлены
		// вручную по той же схеме, что и в cookie-banner.js, текст переводится
		// через собственный словарь TRANSLATIONS (см. выше) при построении —
		// название мессенджера (Telegram/MAX) не переводится, вставляется как
		// есть отдельным текстовым узлом.
		var text = document.createElement('p');
		text.className = 'messenger-consent__text';
		text.appendChild(makeSpan('messenger-consent-1'));
		text.appendChild(document.createTextNode(' ' + messenger.name + '. '));
		text.appendChild(makeSpan('messenger-consent-2'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(makeSpan('messenger-consent-3'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(makeLink(PRIVACY_URL, 'messenger-consent-4'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(makeSpan('messenger-consent-5'));
		text.appendChild(document.createTextNode(' '));
		text.appendChild(makeLink(AGREEMENT_URL, 'messenger-consent-6'));
		text.appendChild(document.createTextNode('.'));

		var actions = document.createElement('div');
		actions.className = 'messenger-consent__actions';

		var cancelBtn = document.createElement('button');
		cancelBtn.type = 'button';
		cancelBtn.className = 'messenger-consent__btn messenger-consent__btn--cancel';
		cancelBtn.setAttribute('data-lang', 'messenger-consent-7');
		cancelBtn.textContent = t('messenger-consent-7');

		var confirmBtn = document.createElement('button');
		confirmBtn.type = 'button';
		confirmBtn.className = 'messenger-consent__btn messenger-consent__btn--confirm';
		confirmBtn.setAttribute('data-lang', 'messenger-consent-8');
		confirmBtn.textContent = t('messenger-consent-8');

		actions.appendChild(cancelBtn);
		actions.appendChild(confirmBtn);
		box.appendChild(text);
		box.appendChild(actions);
		overlay.appendChild(box);

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

		cancelBtn.addEventListener('click', close);
		overlay.addEventListener('click', function (e) {
			if (e.target === overlay) close();
		});
		confirmBtn.addEventListener('click', function () {
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
