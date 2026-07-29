// UI string dictionary. Ukrainian is the default language; English is the alternate.
// `en` is the canonical key set — every key here must exist in both languages (FR-019).

export const languages = {
  uk: 'Українська',
  en: 'English',
} as const;

export const defaultLang = 'uk';

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'site.langName': 'English',
    'site.switchTo': 'Switch language',

    'nav.home': 'Home',
    'nav.suites': 'Suites',
    'nav.experiences': 'Experiences',
    'nav.gallery': 'Gallery',
    'nav.location': 'Location',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.primary': 'Primary',
    'nav.home.aria': 'World Peaks — home',
    'nav.skip': 'Skip to content',

    'brand.name': 'World Peaks',
    'brand.tagline': 'Sleep beneath the stars, wrapped in mountain quiet.',

    'book.now': 'Book Now',
    'book.enquire': 'Enquire to Book',
    'book.ariaInternal': 'Book Now — open the reservation page',
    'book.ariaExternal': 'Book Now — opens our booking site in a new tab',
    'book.ariaEnquire': 'Enquire to book by email',
    'book.srExternal': 'This link opens an external booking site in a new tab.',

    'book.eyebrow': 'Reservations',
    'book.title': 'Reserve your bubble',
    'book.intro':
      'Pick your dates and your suite below. Confirmation is instant — your night beneath the stars is held the moment you book.',
    'book.widgetTitle': 'Reservation form',
    'book.fallback.eyebrow': 'Alternative ways to book',
    'book.fallback.body':
      'If the form above does not appear, you can still secure your stay through our partner site or by writing to us directly. We answer within the day.',
    'book.fallback.partner': 'Book via our partner ↗',
    'book.fallback.partnerAria': 'Book via our partner booking site — opens in a new tab',
    'book.fallback.emailLabel': 'Email us',

    'hero.eyebrow': 'A luxury bubble hotel in the mountains',
    'hero.subcopy':
      'Panoramic bubble suites set in a Carpathian meadow — where the only thing between you and the stars is a breath of warm air.',
    'hero.explore': 'Explore the suites',
    'hero.imageAlt': 'A panoramic bubble suite glowing beneath a star-filled mountain sky at night',

    'home.exp.eyebrow': 'The experience',
    'home.exp.title': 'A night you feel rather than simply book',
    'home.exp.body':
      'World Peaks is a handful of panoramic suites set in a high Carpathian meadow, each one themed after a different storied mountain. No lobby, no crowds — only the slow theatre of weather and light, and the quiet luxury of being completely, comfortably present in the mountains.',
    'home.suites.eyebrow': 'The suites',
    'home.suites.title': 'Five ways to sleep under the sky',
    'home.suites.all': 'All suites',
    'home.exps.eyebrow': 'The experiences',
    'home.exps.title': 'Days as memorable as the nights',
    'home.reviews.eyebrow': 'Reviews',
    'home.reviews.title': 'Letters from the hills',
    'home.stay.eyebrow': 'How to stay',
    'home.stay.title': 'A handful of bubbles. Reserve yours.',
    'home.stay.body':
      'Each suite is released in limited number across the season. Secure your night beneath the stars.',

    'card.discover': 'Discover',
    'card.unavailable': 'Currently unavailable',

    'carousel.suites': 'Suites carousel',
    'carousel.reviews': 'Guest reviews carousel',
    'carousel.prev': 'Previous',
    'carousel.next': 'Next',

    'acc.eyebrow': 'Accommodations',
    'acc.title': 'Choose your bubble',
    'acc.intro':
      'A small collection of panoramic suites, each with an interior keyed to its namesake mountain — and each framing the sky differently. Every stay includes the quiet essentials of a World Peaks night.',
    'acc.srHeading': 'Our suites',

    'acc.amenities.eyebrow': 'Amenities',
    'acc.amenities.title': 'In every bubble',
    'acc.amenity.kitchen': 'Kitchenette',
    'acc.amenity.parking': 'On-site parking',
    'acc.amenity.transfer': 'Transfer available on request',
    'acc.amenity.barbecue': 'Barbecue area',
    'acc.amenity.breakfast': 'Breakfast included',
    'acc.amenity.fireplace': 'Heating fireplace',
    'acc.amenity.ac': 'Air conditioning',
    'acc.amenity.terrace': 'Private terrace',
    'acc.amenity.bathtub': 'Bathtub with mountain view',
    'acc.amenity.bathtub.scope': 'Everest · Kilimanjaro · Mont Blanc',

    'suite.unavailableNote': 'Currently unavailable — join the waitlist via enquiry',

    'exp.eyebrow': 'Experiences',
    'exp.title': 'The rituals of a mountain stay',
    'exp.intro':
      'Beyond the bubble itself, a handful of carefully composed experiences turn a night into a story worth retelling.',
    'exp.srHeading': 'Our experiences',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'A glimpse of the stay',
    'gallery.intro': 'Light, weather, and quiet — a few frames from life at World Peaks.',
    // Shared suffix used by both the main /gallery and per-suite galleries. Screens
    // prepend the appropriate name (brand or suite) and append the index, so each image
    // gets a unique, localized alt like "World Peaks — frame 5" or "Hoverla — frame 3".
    'gallery.frameSuffix': '— frame',

    'loc.eyebrow': 'Plan your visit',
    'loc.title': 'Finding the mountain',
    'loc.description':
      'Tucked into a high Carpathian meadow above the treeline, a winding hour from the valley town.',
    'loc.gettingThere': 'Getting there',
    'loc.directions':
      'From the valley, follow the mountain road to the trailhead car park; a private transfer carries you the final ascent.',
    'loc.openMaps': 'Open in maps ↗',
    'loc.contact': 'Contact',
    'loc.mapTitle': 'A map of the property location in the Carpathian mountains',

    'legal.eyebrow': 'Legal',
    'legal.title': 'Public Offer Agreement',
    'legal.intro':
      'The terms on which we provide accommodation, how payment and refunds work, and our full company details. The Ukrainian version of this offer is the legally binding one.',
    'legal.requisites.title': 'Merchant details',
    'legal.req.name': 'Legal name',
    'legal.req.taxId': 'Tax ID (ІПН / ЄДРПОУ)',
    'legal.req.addressLegal': 'Legal address',
    'legal.req.addressActual': 'Actual address',
    'legal.req.phone': 'Phone',
    'legal.req.email': 'Email',
    'legal.req.bank': 'Bank details',

    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Terms & Conditions',

    'social.label': 'Find us on social media',
    'social.instagram': 'World Peaks on Instagram — opens in a new tab',
    'social.telegram': 'World Peaks on Telegram — opens in a new tab',

    'nf.eyebrow': 'Error 404',
    'nf.title': 'This page has drifted into the mist',
    'nf.body': 'The page you were looking for can’t be found. Let’s guide you back to the bubbles.',
    'nf.returnHome': 'Return home',

    'seo.defaultTitle': 'World Peaks — A Luxury Bubble Hotel in the Mountains',
    'seo.defaultDescription':
      'Panoramic bubble suites under Carpathian skies. A rare, luxurious escape in the mountains.',
    'seo.suites.title': 'The Suites',
    'seo.suites.desc':
      'Explore the panoramic bubble suites at World Peaks — each themed after a famous mountain, each a different way to sleep beneath the sky.',
    'seo.experiences.title': 'Experiences',
    'seo.experiences.desc':
      'Carpathian eco-trails, the famed Shypit waterfall, and a ridge-top swing — the signature excursions from World Peaks.',
    'seo.gallery.title': 'Gallery',
    'seo.gallery.desc': 'A visual tour of World Peaks — the suites, the meadow, and the mountain sky.',
    'seo.location.title': 'Location & Contact',
    'seo.location.desc':
      'Where to find World Peaks in the mountains, how to reach us, and how to get in touch.',
    'seo.legal.title': 'Terms & Conditions',
    'seo.legal.desc':
      'The public offer agreement for stays at World Peaks — booking, payment, refunds, and our company details.',
    'seo.book.title': 'Book your stay',
    'seo.book.desc':
      'Reserve a panoramic bubble suite at World Peaks — check dates, pick your suite, and confirm in a single step.',
    'seo.notfound.title': 'Page Not Found',
    'seo.notfound.desc': 'The page you were looking for has drifted off into the mountain mist.',
  },

  uk: {
    'site.langName': 'Українська',
    'site.switchTo': 'Змінити мову',

    'nav.home': 'Головна',
    'nav.suites': 'Номери',
    'nav.experiences': 'Враження',
    'nav.gallery': 'Галерея',
    'nav.location': 'Розташування',
    'nav.openMenu': 'Відкрити меню',
    'nav.closeMenu': 'Закрити меню',
    'nav.primary': 'Основне',
    'nav.home.aria': 'Вершини Світу — головна',
    'nav.skip': 'Перейти до вмісту',

    'brand.name': 'Вершини Світу',
    'brand.tagline': 'Засинайте під зорями, оповиті гірською тишею.',

    'book.now': 'Забронювати',
    'book.enquire': 'Запитати про бронювання',
    'book.ariaInternal': 'Забронювати — відкрити сторінку бронювання',
    'book.ariaExternal': 'Забронювати — відкриває сайт бронювання в новій вкладці',
    'book.ariaEnquire': 'Запитати про бронювання електронною поштою',
    'book.srExternal': 'Це посилання відкриває зовнішній сайт бронювання в новій вкладці.',

    'book.eyebrow': 'Бронювання',
    'book.title': 'Забронюйте свій бабл',
    'book.intro':
      'Оберіть дати й номер нижче. Підтвердження надходить миттєво — ваша ніч під зорями закріплюється за вами одразу після бронювання.',
    'book.widgetTitle': 'Форма бронювання',
    'book.fallback.eyebrow': 'Альтернативні способи бронювання',
    'book.fallback.body':
      'Якщо форма вище не з’явилася, ви все одно можете забронювати ніч через наш партнерський сайт або написавши нам напряму. Відповідаємо протягом дня.',
    'book.fallback.partner': 'Забронювати через партнера ↗',
    'book.fallback.partnerAria':
      'Забронювати через партнерський сайт — відкривається в новій вкладці',
    'book.fallback.emailLabel': 'Написати нам',

    'hero.eyebrow': 'Розкішний бабл-готель у горах',
    'hero.subcopy':
      'Панорамні бабл-номери серед карпатської луки — де лише подих теплого повітря відділяє вас від зір.',
    'hero.explore': 'Переглянути номери',
    'hero.imageAlt': 'Панорамний бабл-номер світиться під зоряним гірським небом уночі',

    'home.exp.eyebrow': 'Враження',
    'home.exp.title': 'Ніч, яку відчуваєш, а не просто бронюєш',
    'home.exp.body':
      'Вершини Світу — це кілька панорамних номерів посеред високогірної карпатської луки, кожен з інтер’єром у мотивах легендарної гори. Жодного лобі, жодного натовпу — лише повільний театр погоди та світла й тиха розкіш цілковитої присутності в горах.',
    'home.suites.eyebrow': 'Номери',
    'home.suites.title': 'П’ять способів заснути під небом',
    'home.suites.all': 'Усі номери',
    'home.exps.eyebrow': 'Враження',
    'home.exps.title': 'Дні, незабутні так само, як ночі',
    'home.reviews.eyebrow': 'Відгуки',
    'home.reviews.title': 'Листи зі схилів',
    'home.stay.eyebrow': 'Як зупинитися',
    'home.stay.title': 'Лише кілька баблів. Забронюйте свій.',
    'home.stay.body':
      'Кожен номер доступний в обмеженій кількості протягом сезону. Забезпечте собі ніч під зорями.',

    'card.discover': 'Детальніше',
    'card.unavailable': 'Наразі недоступно',

    'carousel.suites': 'Карусель номерів',
    'carousel.reviews': 'Карусель відгуків',
    'carousel.prev': 'Попередні',
    'carousel.next': 'Наступні',

    'acc.eyebrow': 'Проживання',
    'acc.title': 'Оберіть свій бабл',
    'acc.intro':
      'Невелика колекція панорамних номерів, кожен з інтер’єром, що відсилає до своєї однойменної гори — і кожен по-своєму обрамлює небо. Кожне перебування включає тихі неодмінні складові ночі у «Вершинах Світу».',
    'acc.srHeading': 'Наші номери',

    'acc.amenities.eyebrow': 'Зручності',
    'acc.amenities.title': 'У кожному баблі',
    'acc.amenity.kitchen': 'Міні-кухня',
    'acc.amenity.parking': 'Парковка на території',
    'acc.amenity.transfer': 'Трансфер за запитом',
    'acc.amenity.barbecue': 'Зона барбекю',
    'acc.amenity.breakfast': 'Сніданок включено',
    'acc.amenity.fireplace': 'Опалювальний камін',
    'acc.amenity.ac': 'Кондиціонер',
    'acc.amenity.terrace': 'Приватна тераса',
    'acc.amenity.bathtub': 'Ванна з гірським краєвидом',
    'acc.amenity.bathtub.scope': '«Еверест» · «Кіліманджаро» · «Монблан»',

    'suite.unavailableNote': 'Наразі недоступно — приєднайтеся до списку очікування через запит',

    'exp.eyebrow': 'Враження',
    'exp.title': 'Ритуали гірського відпочинку',
    'exp.intro':
      'Окрім самого бабла, кілька ретельно продуманих вражень перетворюють ніч на історію, яку хочеться переповідати.',
    'exp.srHeading': 'Наші враження',

    'gallery.eyebrow': 'Галерея',
    'gallery.title': 'Погляд на відпочинок',
    'gallery.intro': 'Світло, погода й тиша — кілька кадрів із життя у «Вершинах Світу».',
    'gallery.frameSuffix': '— кадр',

    'loc.eyebrow': 'Сплануйте візит',
    'loc.title': 'Як нас знайти',
    'loc.description':
      'Захований у високогірній карпатській луці над межею лісу, за звивисту годину від долинного містечка.',
    'loc.gettingThere': 'Як дістатися',
    'loc.directions':
      'З долини їдьте гірською дорогою до парковки біля початку стежки; приватний трансфер довезе вас на фінальному підйомі.',
    'loc.openMaps': 'Відкрити на карті ↗',
    'loc.contact': 'Контакти',
    'loc.mapTitle': 'Карта розташування садиби в Карпатах',

    'legal.eyebrow': 'Правова інформація',
    'legal.title': 'Публічна оферта',
    'legal.intro':
      'Умови, на яких ми надаємо послуги проживання, як відбувається оплата й повернення коштів, а також повні реквізити виконавця.',
    'legal.requisites.title': 'Реквізити виконавця',
    'legal.req.name': 'Найменування',
    'legal.req.taxId': 'Податковий номер (ІПН / ЄДРПОУ)',
    'legal.req.addressLegal': 'Юридична адреса',
    'legal.req.addressActual': 'Фактична адреса',
    'legal.req.phone': 'Телефон',
    'legal.req.email': 'Ел. пошта',
    'legal.req.bank': 'Банківські реквізити',

    'footer.explore': 'Розділи',
    'footer.contact': 'Контакти',
    'footer.rights': 'Усі права захищено.',
    'footer.legal': 'Публічна оферта',

    'social.label': 'Знайти нас у соцмережах',
    'social.instagram': 'Вершини Світу в Instagram — відкривається в новій вкладці',
    'social.telegram': 'Вершини Світу у Telegram — відкривається в новій вкладці',

    'nf.eyebrow': 'Помилка 404',
    'nf.title': 'Ця сторінка загубилася в тумані',
    'nf.body': 'Сторінку, яку ви шукали, не знайдено. Повернімо вас до баблів.',
    'nf.returnHome': 'На головну',

    'seo.defaultTitle': 'Вершини Світу — розкішний бабл-готель у горах',
    'seo.defaultDescription':
      'Панорамні бабл-номери під карпатським небом. Рідкісна, розкішна втеча в горах.',
    'seo.suites.title': 'Номери',
    'seo.suites.desc':
      'Перегляньте панорамні бабл-номери «Вершин Світу» — кожен у мотивах однойменної гори, кожен дарує власний спосіб заснути під небом.',
    'seo.experiences.title': 'Враження',
    'seo.experiences.desc':
      'Карпатські еко-стежки, відомий водоспад Шипот і гойдалка на гребені хребта — фірмові вилазки з «Вершин Світу».',
    'seo.gallery.title': 'Галерея',
    'seo.gallery.desc': 'Візуальна подорож «Вершинами Світу» — номери, лука й гірське небо.',
    'seo.location.title': 'Розташування та контакти',
    'seo.location.desc': 'Де знайти «Вершини Світу» у горах, як до нас дістатися та як зв’язатися.',
    'seo.legal.title': 'Публічна оферта',
    'seo.legal.desc':
      'Договір публічної оферти на проживання у «Вершинах Світу» — бронювання, оплата, повернення коштів і реквізити.',
    'seo.book.title': 'Забронювати ніч',
    'seo.book.desc':
      'Забронюйте панорамний бабл-номер у «Вершинах Світу» — оберіть дати, номер і підтвердьте бронювання за один крок.',
    'seo.notfound.title': 'Сторінку не знайдено',
    'seo.notfound.desc': 'Сторінка, яку ви шукали, розчинилася в гірському тумані.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
