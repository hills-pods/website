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
    'nav.home.aria': 'Bubble — home',
    'nav.skip': 'Skip to content',

    'brand.tagline': 'Sleep beneath the stars, wrapped in mountain quiet.',

    'book.now': 'Book Now',
    'book.enquire': 'Enquire to Book',
    'book.ariaExternal': 'Book Now — opens our booking site in a new tab',
    'book.ariaEnquire': 'Enquire to book by email',
    'book.srExternal': 'This link opens an external booking site in a new tab.',

    'hero.eyebrow': 'A luxury bubble hotel in the mountains',
    'hero.subcopy':
      'Transparent suites suspended in an alpine meadow — where the only thing between you and the stars is a breath of warm air.',
    'hero.explore': 'Explore the suites',
    'hero.imageAlt':
      'A transparent bubble suite glowing beneath a star-filled mountain sky at night',

    'home.exp.eyebrow': 'The experience',
    'home.exp.title': 'A night you feel rather than simply book',
    'home.exp.body':
      'Bubble is a handful of transparent suites set in a high alpine meadow. No lobby, no crowds — only the slow theatre of weather and light, and the quiet luxury of being completely, comfortably present in the mountains.',
    'home.suites.eyebrow': 'The suites',
    'home.suites.title': 'Three ways to sleep under the sky',
    'home.suites.all': 'All suites',
    'home.exps.eyebrow': 'The experiences',
    'home.exps.title': 'Days as memorable as the nights',
    'home.stay.eyebrow': 'How to stay',
    'home.stay.title': 'A handful of bubbles. Reserve yours.',
    'home.stay.body':
      'Each suite is released in limited number across the season. Secure your night beneath the stars.',

    'card.discover': 'Discover',
    'card.unavailable': 'Currently unavailable',

    'carousel.suites': 'Suites carousel',
    'carousel.prev': 'Previous suites',
    'carousel.next': 'Next suites',

    'acc.eyebrow': 'Accommodations',
    'acc.title': 'Choose your bubble',
    'acc.intro':
      'A small collection of transparent suites, each framing the mountains differently. Every stay includes the quiet essentials of a Bubble night.',
    'acc.srHeading': 'Our suites',

    'suite.features': 'Features',
    'suite.included': 'Included',
    'suite.gallery': 'More views',
    'suite.unavailableNote': 'Currently unavailable — join the waitlist via enquiry',

    'exp.eyebrow': 'Experiences',
    'exp.title': 'The rituals of a mountain stay',
    'exp.intro':
      'Beyond the bubble itself, a handful of carefully composed experiences turn a night into a story worth retelling.',
    'exp.srHeading': 'Our experiences',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'A glimpse of the stay',
    'gallery.intro': 'Light, weather, and quiet — a few frames from life at Bubble.',
    'gallery.alt.hoverla': 'The Hoverla suite glowing above Carpathian ridgelines at dawn',
    'gallery.cap.hoverla': 'Hoverla at first light',
    'gallery.alt.meadow': 'An alpine meadow at golden hour',
    'gallery.cap.meadow': 'The meadow',
    'gallery.alt.dusk': 'Bubble suites silhouetted against a dusky purple sky',
    'gallery.cap.dusk': 'Dusk over the bubbles',
    'gallery.alt.montblanc': 'The Mont Blanc suite facing a glacial sunset',
    'gallery.alt.stargazing': 'A telescope beneath a star-filled sky',
    'gallery.cap.stargazing': 'Guided stargazing',
    'gallery.alt.interior': 'The warm interior of a bubble suite',
    'gallery.alt.everest': "The Everest suite at the property's highest point",
    'gallery.cap.everest': 'The Everest',

    'loc.eyebrow': 'Plan your visit',
    'loc.title': 'Finding the mountain',
    'loc.description':
      'Tucked into a high alpine meadow above the treeline, a winding hour from the valley town.',
    'loc.gettingThere': 'Getting there',
    'loc.directions':
      'From the valley, follow the mountain road to the trailhead car park; a private transfer carries you the final ascent.',
    'loc.openMaps': 'Open in maps ↗',
    'loc.contact': 'Contact',
    'loc.goodToKnow': 'Good to know',
    'loc.gtk1': 'A private transfer carries you the final ascent — arrange it when you book.',
    'loc.gtk2': 'Suites are released in limited number across the season.',
    'loc.gtk3': 'Have a question before booking? Email or call and we’ll help personally.',

    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.findUs': 'Find us',
    'footer.rights': 'All rights reserved.',

    'nf.eyebrow': 'Error 404',
    'nf.title': 'This page has drifted into the mist',
    'nf.body': 'The page you were looking for can’t be found. Let’s guide you back to the bubbles.',
    'nf.returnHome': 'Return home',

    'seo.defaultTitle': 'Bubble — A Luxury Bubble Hotel in the Mountains',
    'seo.defaultDescription':
      'Transparent bubble suites under alpine skies. A rare, luxurious escape in the mountains.',
    'seo.suites.title': 'The Suites',
    'seo.suites.desc':
      'Explore the transparent bubble suites at Bubble — each a different way to sleep beneath the mountain sky.',
    'seo.experiences.title': 'Experiences',
    'seo.experiences.desc':
      'Stargazing, mountain dining, and alpine wellness — the signature experiences of a stay at Bubble.',
    'seo.gallery.title': 'Gallery',
    'seo.gallery.desc': 'A visual tour of Bubble — the suites, the meadow, and the mountain sky.',
    'seo.location.title': 'Location & Contact',
    'seo.location.desc':
      'Where to find Bubble in the mountains, how to reach us, and how to get in touch.',
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
    'nav.home.aria': 'Bubble — головна',
    'nav.skip': 'Перейти до вмісту',

    'brand.tagline': 'Засинайте під зорями, оповиті гірською тишею.',

    'book.now': 'Забронювати',
    'book.enquire': 'Запитати про бронювання',
    'book.ariaExternal': 'Забронювати — відкриває сайт бронювання в новій вкладці',
    'book.ariaEnquire': 'Запитати про бронювання електронною поштою',
    'book.srExternal': 'Це посилання відкриває зовнішній сайт бронювання в новій вкладці.',

    'hero.eyebrow': 'Розкішний бабл-готель у горах',
    'hero.subcopy':
      'Прозорі номери серед альпійської луки — де лише подих теплого повітря відділяє вас від зір.',
    'hero.explore': 'Переглянути номери',
    'hero.imageAlt': 'Прозорий бабл-номер світиться під зоряним гірським небом уночі',

    'home.exp.eyebrow': 'Враження',
    'home.exp.title': 'Ніч, яку відчуваєш, а не просто бронюєш',
    'home.exp.body':
      'Bubble — це кілька прозорих номерів посеред високогірної альпійської луки. Жодного лобі, жодного натовпу — лише повільний театр погоди та світла й тиха розкіш цілковитої присутності в горах.',
    'home.suites.eyebrow': 'Номери',
    'home.suites.title': 'Три способи заснути під небом',
    'home.suites.all': 'Усі номери',
    'home.exps.eyebrow': 'Враження',
    'home.exps.title': 'Дні, незабутні так само, як ночі',
    'home.stay.eyebrow': 'Як зупинитися',
    'home.stay.title': 'Лише кілька баблів. Забронюйте свій.',
    'home.stay.body':
      'Кожен номер доступний в обмеженій кількості протягом сезону. Забезпечте собі ніч під зорями.',

    'card.discover': 'Детальніше',
    'card.unavailable': 'Наразі недоступно',

    'carousel.suites': 'Карусель номерів',
    'carousel.prev': 'Попередні номери',
    'carousel.next': 'Наступні номери',

    'acc.eyebrow': 'Проживання',
    'acc.title': 'Оберіть свій бабл',
    'acc.intro':
      'Невелика колекція прозорих номерів, кожен з яких по-своєму обрамлює гори. Кожне перебування включає тихі неодмінні складові ночі в Bubble.',
    'acc.srHeading': 'Наші номери',

    'suite.features': 'Зручності',
    'suite.included': 'Включено',
    'suite.gallery': 'Більше виглядів',
    'suite.unavailableNote': 'Наразі недоступно — приєднайтеся до списку очікування через запит',

    'exp.eyebrow': 'Враження',
    'exp.title': 'Ритуали гірського відпочинку',
    'exp.intro':
      'Окрім самого бабла, кілька ретельно продуманих вражень перетворюють ніч на історію, яку хочеться переповідати.',
    'exp.srHeading': 'Наші враження',

    'gallery.eyebrow': 'Галерея',
    'gallery.title': 'Погляд на відпочинок',
    'gallery.intro': 'Світло, погода й тиша — кілька кадрів із життя в Bubble.',
    'gallery.alt.hoverla': 'Номер «Говерла» світиться над карпатськими хребтами на світанку',
    'gallery.cap.hoverla': '«Говерла» на першому світлі',
    'gallery.alt.meadow': 'Альпійська лука в золоту годину',
    'gallery.cap.meadow': 'Лука',
    'gallery.alt.dusk': 'Силуети бабл-номерів на тлі присмеркового фіолетового неба',
    'gallery.cap.dusk': 'Сутінки над баблами',
    'gallery.alt.montblanc': 'Номер «Монблан» обличчям до льодовикового заходу сонця',
    'gallery.alt.stargazing': 'Телескоп під зоряним небом',
    'gallery.cap.stargazing': 'Спостереження за зорями з гідом',
    'gallery.alt.interior': 'Теплий інтер’єр бабл-номера',
    'gallery.alt.everest': 'Номер «Еверест» у найвищій точці садиби',
    'gallery.cap.everest': '«Еверест»',

    'loc.eyebrow': 'Сплануйте візит',
    'loc.title': 'Як нас знайти',
    'loc.description':
      'Захований у високогірній альпійській луці над межею лісу, за звивисту годину від долинного містечка.',
    'loc.gettingThere': 'Як дістатися',
    'loc.directions':
      'З долини їдьте гірською дорогою до парковки біля початку стежки; приватний трансфер довезе вас на фінальному підйомі.',
    'loc.openMaps': 'Відкрити на карті ↗',
    'loc.contact': 'Контакти',
    'loc.goodToKnow': 'Корисно знати',
    'loc.gtk1':
      'Приватний трансфер довезе вас на фінальному підйомі — замовте його під час бронювання.',
    'loc.gtk2': 'Номери доступні в обмеженій кількості протягом сезону.',
    'loc.gtk3':
      'Маєте запитання перед бронюванням? Напишіть або зателефонуйте — ми допоможемо особисто.',

    'footer.explore': 'Розділи',
    'footer.contact': 'Контакти',
    'footer.findUs': 'Знайти нас',
    'footer.rights': 'Усі права захищено.',

    'nf.eyebrow': 'Помилка 404',
    'nf.title': 'Ця сторінка загубилася в тумані',
    'nf.body': 'Сторінку, яку ви шукали, не знайдено. Повернімо вас до баблів.',
    'nf.returnHome': 'На головну',

    'seo.defaultTitle': 'Bubble — розкішний бабл-готель у горах',
    'seo.defaultDescription':
      'Прозорі бабл-номери під альпійським небом. Рідкісна, розкішна втеча в горах.',
    'seo.suites.title': 'Номери',
    'seo.suites.desc':
      'Перегляньте прозорі бабл-номери Bubble — кожен дарує власний спосіб заснути під гірським небом.',
    'seo.experiences.title': 'Враження',
    'seo.experiences.desc':
      'Спостереження за зорями, гірська вечеря та альпійський велнес — фірмові враження перебування в Bubble.',
    'seo.gallery.title': 'Галерея',
    'seo.gallery.desc': 'Візуальна подорож Bubble — номери, лука й гірське небо.',
    'seo.location.title': 'Розташування та контакти',
    'seo.location.desc': 'Де знайти Bubble у горах, як до нас дістатися та як зв’язатися.',
    'seo.notfound.title': 'Сторінку не знайдено',
    'seo.notfound.desc': 'Сторінка, яку ви шукали, розчинилася в гірському тумані.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
