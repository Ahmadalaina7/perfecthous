/** Copy voor het offerteformulier en het contactformulier. */

const nl = {
  quote: {
    steps: ["De klus", "Foto's & planning", "Contact", "Versturen"],
    progress: "Voortgang",
    stepStatus: "Stap {current} van {total}: {label}",
    service: {
      label: "Soort klus",
      placeholder: "Kies een dienst (optioneel)",
      other: "Iets anders / weet ik nog niet",
      hint: "Niet zeker? Laat leeg en beschrijf het hieronder.",
    },
    description: {
      label: "Wat wilt u laten doen? *",
      placeholder:
        "Bijvoorbeeld: de badkamer is 6 m² en moet compleet vernieuwd worden — nieuwe tegels, inloopdouche en nieuw sanitair. De leidingen zijn uit 1998.",
      hint: "Hoe concreter, hoe nauwkeuriger onze eerste inschatting.",
    },
    scope: {
      legend: "Waar gaat het om?",
      hint: "Dit helpt ons de juiste vakman mee te sturen bij de opname.",
      options: [
        { value: "renovatie", label: "Renovatie of verbouwing", desc: "Bestaande ruimte aanpassen" },
        { value: "nieuw", label: "Aanbouw of uitbouw", desc: "Erbij bouwen" },
        { value: "reparatie", label: "Reparatie of onderhoud", desc: "Iets verhelpen" },
        { value: "afbouw", label: "Afbouw", desc: "Tegelen, stucen, schilderen" },
      ],
    },
    photos: {
      label: "Foto's van de situatie",
      hint: "Maximaal 6 foto's, elk tot 8 MB (JPG, PNG, WebP of HEIC). Een paar overzichtsfoto's en één detailfoto werken het best.",
    },
    start: {
      label: "Wanneer wilt u beginnen?",
      none: "Geen voorkeur",
      options: [
        "Zo snel mogelijk",
        "Binnen 1 tot 3 maanden",
        "Binnen 3 tot 6 maanden",
        "Later dit jaar",
        "Weet ik nog niet",
      ],
    },
    budget: {
      label: "Indicatie budget",
      none: "Liever niet zeggen",
      options: [
        "Weet ik nog niet",
        "Tot € 5.000",
        "€ 5.000 – € 15.000",
        "€ 15.000 – € 30.000",
        "€ 30.000 – € 60.000",
        "Meer dan € 60.000",
      ],
      hint: "Optioneel. Helpt om realistische opties voor te stellen.",
    },
    person: {
      name: "Naam *",
      namePlaceholder: "Voor- en achternaam",
      city: "Woonplaats",
      cityPlaceholder: "Bijv. Vlissingen",
      phone: "Telefoon *",
      email: "E-mail *",
      emailPlaceholder: "naam@voorbeeld.nl",
    },
    contactPref: {
      legend: "Hoe wilt u dat we contact opnemen?",
      options: [
        { value: "telefoon", label: "Telefoon", desc: "Snelste antwoord" },
        { value: "whatsapp", label: "WhatsApp", desc: "Kort bericht" },
        { value: "email", label: "E-mail", desc: "Alles op papier" },
      ],
    },
    review: {
      title: "Controleer uw aanvraag",
      text: "Bijna klaar. U ontvangt een bevestiging per e-mail met een referentienummer. We nemen binnen één werkdag contact op om een gratis opname te plannen.",
      checks: [
        "Gratis en vrijblijvend",
        "Reactie binnen één werkdag",
        "Uw gegevens worden niet doorverkocht",
        "Foto's alleen gebruikt voor uw aanvraag",
      ],
    },
    privacy: {
      start: "Ik ga akkoord met de",
      link: "privacyverklaring",
      end: ". Mijn gegevens worden alleen gebruikt om deze aanvraag te behandelen. *",
    },
    buttons: {
      back: "Terug",
      next: "Volgende stap",
      submit: "Aanvraag versturen",
      call: "Liever direct bellen: {phone}",
      whatsapp: "Of via WhatsApp",
      whatsappMessage: "Hallo Perfecthous, ik heb een vraag over een offerte.",
    },
    clientErrors: {
      description: "Beschrijf de klus in minimaal 20 tekens.",
      name: "Vul uw naam in.",
      email: "Vul een geldig e-mailadres in.",
      phone: "Vul een telefoonnummer in.",
    },
  },

  contact: {
    subjects: [
      "Algemene vraag",
      "Offerte of opname",
      "Bestaande opdracht",
      "Spoed / lekkage",
      "Sollicitatie of samenwerking",
      "Iets anders",
    ],
    success: {
      title: "Uw bericht is verstuurd.",
      text: "Bedankt voor uw bericht. We reageren binnen één werkdag — bij spoed kunt u beter direct bellen, dan zijn we sneller.",
      again: "Nog een bericht sturen",
    },
    name: "Naam *",
    namePlaceholder: "Voor- en achternaam",
    email: "E-mail *",
    emailPlaceholder: "naam@voorbeeld.nl",
    phone: "Telefoon",
    phonePlaceholder: "06 12 34 56 78",
    phoneHint: "Optioneel, maar handig bij spoed.",
    subject: "Onderwerp",
    message: "Uw bericht *",
    messagePlaceholder: "Waar kunnen we u mee helpen?",
    privacy: {
      start: "Ik ga akkoord met de",
      link: "privacyverklaring",
      end: ". *",
    },
    submit: "Bericht versturen",
  },
};

const en: typeof nl = {
  quote: {
    steps: ["The job", "Photos & timing", "Contact", "Send"],
    progress: "Progress",
    stepStatus: "Step {current} of {total}: {label}",
    service: {
      label: "Type of job",
      placeholder: "Choose a service (optional)",
      other: "Something else / not sure yet",
      hint: "Not sure? Leave it empty and describe it below.",
    },
    description: {
      label: "What would you like done? *",
      placeholder:
        "For example: the bathroom is 6 m² and needs complete renewal — new tiles, walk-in shower and new sanitary ware. The pipes date from 1998.",
      hint: "The more concrete, the more accurate our first estimate.",
    },
    scope: {
      legend: "What is it about?",
      hint: "This helps us bring the right craftsman to the survey.",
      options: [
        { value: "renovatie", label: "Renovation or remodelling", desc: "Adapting an existing space" },
        { value: "nieuw", label: "Extension or addition", desc: "Building extra space" },
        { value: "reparatie", label: "Repair or maintenance", desc: "Fixing something" },
        { value: "afbouw", label: "Finishing", desc: "Tiling, plastering, painting" },
      ],
    },
    photos: {
      label: "Photos of the situation",
      hint: "Up to 6 photos, each up to 8 MB (JPG, PNG, WebP or HEIC). A few overview photos and one detail photo work best.",
    },
    start: {
      label: "When would you like to start?",
      none: "No preference",
      options: ["As soon as possible", "Within 1 to 3 months", "Within 3 to 6 months", "Later this year", "Not sure yet"],
    },
    budget: {
      label: "Indicative budget",
      none: "Prefer not to say",
      options: [
        "Not sure yet",
        "Up to € 5,000",
        "€ 5,000 – € 15,000",
        "€ 15,000 – € 30,000",
        "€ 30,000 – € 60,000",
        "More than € 60,000",
      ],
      hint: "Optional. Helps us suggest realistic options.",
    },
    person: {
      name: "Name *",
      namePlaceholder: "First and last name",
      city: "Town or city",
      cityPlaceholder: "e.g. Vlissingen",
      phone: "Phone *",
      email: "Email *",
      emailPlaceholder: "name@example.com",
    },
    contactPref: {
      legend: "How would you like us to contact you?",
      options: [
        { value: "telefoon", label: "Phone", desc: "Fastest answer" },
        { value: "whatsapp", label: "WhatsApp", desc: "Short message" },
        { value: "email", label: "Email", desc: "Everything on paper" },
      ],
    },
    review: {
      title: "Check your request",
      text: "Almost done. You will receive a confirmation by email with a reference number. We will contact you within one working day to schedule a free survey.",
      checks: [
        "Free and without obligation",
        "Reply within one working day",
        "Your details are never sold",
        "Photos only used for your request",
      ],
    },
    privacy: {
      start: "I agree to the",
      link: "privacy statement",
      end: ". My details are only used to handle this request. *",
    },
    buttons: {
      back: "Back",
      next: "Next step",
      submit: "Send request",
      call: "Prefer to call: {phone}",
      whatsapp: "Or via WhatsApp",
      whatsappMessage: "Hello Perfecthous, I have a question about a quote.",
    },
    clientErrors: {
      description: "Describe the job in at least 20 characters.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a phone number.",
    },
  },

  contact: {
    subjects: [
      "General question",
      "Quote or survey",
      "Existing assignment",
      "Emergency / leak",
      "Application or partnership",
      "Something else",
    ],
    success: {
      title: "Your message has been sent.",
      text: "Thank you for your message. We reply within one working day — in an emergency it is better to call, that is faster.",
      again: "Send another message",
    },
    name: "Name *",
    namePlaceholder: "First and last name",
    email: "Email *",
    emailPlaceholder: "name@example.com",
    phone: "Phone",
    phonePlaceholder: "06 12 34 56 78",
    phoneHint: "Optional, but useful in an emergency.",
    subject: "Subject",
    message: "Your message *",
    messagePlaceholder: "How can we help you?",
    privacy: {
      start: "I agree to the",
      link: "privacy statement",
      end: ". *",
    },
    submit: "Send message",
  },
};

const ar: typeof nl = {
  quote: {
    steps: ["المهمة", "الصور والموعد", "التواصل", "الإرسال"],
    progress: "التقدّم",
    stepStatus: "الخطوة {current} من {total}: {label}",
    service: {
      label: "نوع المهمة",
      placeholder: "اختر خدمة (اختياري)",
      other: "شيء آخر / لست متأكدًا",
      hint: "لست متأكدًا؟ اتركه فارغًا واشرح أدناه.",
    },
    description: {
      label: "ما الذي تريد إنجازه؟ *",
      placeholder:
        "مثال: الحمام مساحته 6 م² ويحتاج تجديدًا كاملًا — بلاط جديد ودش مفتوح وتركيبات جديدة. الأنابيب من عام 1998.",
      hint: "كلما كان الوصف أدق، كان تقديرنا الأولي أدق.",
    },
    scope: {
      legend: "ما نوع العمل؟",
      hint: "يساعدنا هذا على إرسال الحرفي المناسب إلى المعاينة.",
      options: [
        { value: "renovatie", label: "تجديد أو ترميم", desc: "تعديل مساحة قائمة" },
        { value: "nieuw", label: "توسعة أو ملحق", desc: "بناء مساحة إضافية" },
        { value: "reparatie", label: "إصلاح أو صيانة", desc: "معالجة خلل" },
        { value: "afbouw", label: "تشطيب", desc: "بلاط وجبس ودهان" },
      ],
    },
    photos: {
      label: "صور الوضع الحالي",
      hint: "حتى 6 صور، كل واحدة حتى 8 ميغابايت (JPG أو PNG أو WebP أو HEIC). بضع صور عامة وصورة تفصيلية واحدة هي الأفضل.",
    },
    start: {
      label: "متى تريد البدء؟",
      none: "لا تفضيل",
      options: ["في أقرب وقت", "خلال 1 إلى 3 أشهر", "خلال 3 إلى 6 أشهر", "لاحقًا هذا العام", "لست متأكدًا بعد"],
    },
    budget: {
      label: "الميزانية التقديرية",
      none: "أفضل عدم الذكر",
      options: [
        "لست متأكدًا بعد",
        "حتى 5.000 €",
        "5.000 – 15.000 €",
        "15.000 – 30.000 €",
        "30.000 – 60.000 €",
        "أكثر من 60.000 €",
      ],
      hint: "اختياري. يساعد على اقتراح خيارات واقعية.",
    },
    person: {
      name: "الاسم *",
      namePlaceholder: "الاسم الأول والعائلة",
      city: "المدينة",
      cityPlaceholder: "مثل فلِسِنغن",
      phone: "الهاتف *",
      email: "البريد الإلكتروني *",
      emailPlaceholder: "name@example.com",
    },
    contactPref: {
      legend: "كيف تفضّل أن نتواصل معك؟",
      options: [
        { value: "telefoon", label: "هاتف", desc: "أسرع إجابة" },
        { value: "whatsapp", label: "واتساب", desc: "رسالة قصيرة" },
        { value: "email", label: "بريد إلكتروني", desc: "كل شيء مكتوب" },
      ],
    },
    review: {
      title: "راجع طلبك",
      text: "اقتربت من النهاية. ستستلم تأكيدًا بالبريد الإلكتروني مع رقم مرجعي. سنتواصل معك خلال يوم عمل واحد لتحديد معاينة مجانية.",
      checks: [
        "مجاني ودون التزام",
        "رد خلال يوم عمل واحد",
        "بياناتك لا تُباع",
        "الصور تُستخدم لطلبك فقط",
      ],
    },
    privacy: {
      start: "أوافق على",
      link: "بيان الخصوصية",
      end: ". تُستخدم بياناتي لمعالجة هذا الطلب فقط. *",
    },
    buttons: {
      back: "رجوع",
      next: "الخطوة التالية",
      submit: "إرسال الطلب",
      call: "تفضّل الاتصال: {phone}",
      whatsapp: "أو عبر واتساب",
      whatsappMessage: "مرحبًا Perfecthous، لدي سؤال عن عرض سعر.",
    },
    clientErrors: {
      description: "صِف المهمة في 20 حرفًا على الأقل.",
      name: "أدخل اسمك.",
      email: "أدخل بريدًا إلكترونيًا صحيحًا.",
      phone: "أدخل رقم هاتف.",
    },
  },

  contact: {
    subjects: [
      "سؤال عام",
      "عرض سعر أو معاينة",
      "مشروع قائم",
      "طارئ / تسرب",
      "تقديم أو تعاون",
      "شيء آخر",
    ],
    success: {
      title: "تم إرسال رسالتك.",
      text: "شكرًا لرسالتك. نرد خلال يوم عمل واحد — وفي الحالات الطارئة الأفضل الاتصال مباشرة، فهو أسرع.",
      again: "إرسال رسالة أخرى",
    },
    name: "الاسم *",
    namePlaceholder: "الاسم الأول والعائلة",
    email: "البريد الإلكتروني *",
    emailPlaceholder: "name@example.com",
    phone: "الهاتف",
    phonePlaceholder: "06 12 34 56 78",
    phoneHint: "اختياري، لكنه مفيد في الحالات الطارئة.",
    subject: "الموضوع",
    message: "رسالتك *",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    privacy: {
      start: "أوافق على",
      link: "بيان الخصوصية",
      end: ". *",
    },
    submit: "إرسال الرسالة",
  },
};

export const formsCopy = { nl, en, ar };
export type FormsCopy = typeof nl;
