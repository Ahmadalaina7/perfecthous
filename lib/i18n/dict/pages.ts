/**
 * Contact, offerte (incl. formulier), bedankt, kennisbank en de juridische
 * pagina's. De juridische teksten zelf blijven Nederlands; per taal staat er
 * een korte uitleg boven.
 */

const nl = {
  contact: {
    meta: {
      title: "Contact — Perfecthous Vlissingen",
      description:
        "Neem contact op met Perfecthous in Vlissingen: Schuitvaartgracht 85, 4382 GJ. Bel, mail of stuur een WhatsApp-bericht. Ma–vr 07:30–17:30.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Even overleggen?",
      lead: "Bel, mail of stuur een bericht. Voor een offerte is het formulier het snelst; bij spoed — lekkage of wateroverlast — kunt u beter direct bellen.",
    },
    form: {
      title: "Stuur een bericht",
      intro: "We reageren binnen één werkdag. Voor een prijsopgave kunt u beter het",
      introLink: "offerteformulier",
      introEnd: "gebruiken.",
    },
    direct: "Direct contact",
    whatsappMessage: "Hallo Perfecthous, ik heb een vraag.",
    address: { title: "Bezoekadres", note: "Op afspraak — geen showroom", route: "Route plannen" },
    hours: {
      title: "Openingstijden",
      rows: [
        { days: "Maandag t/m vrijdag", hours: "07:30 – 17:30" },
        { days: "Zaterdag", hours: "Op afspraak" },
        { days: "Zondag", hours: "Gesloten" },
      ],
      emergency: "Spoed bij lekkage of storing: 7 dagen per week bereikbaar.",
    },
    map: {
      label: "Locatie op de kaart",
      load: "Kaart laden",
      cookieNote:
        "De kaart wordt geladen van Google. Daarbij kan Google cookies plaatsen.",
      note: "De kaart wordt geladen van Google Maps. Daarbij kan Google cookies plaatsen; zie de", link: "cookieverklaring" },
  },

  quote: {
    meta: {
      title: "Gratis offerte aanvragen",
      description:
        "Vraag vrijblijvend een offerte aan voor uw verbouwing, badkamer, tegelwerk of klus in Vlissingen. Gratis opname, reactie binnen één werkdag en heldere prijsafspraken.",
    },
    hero: {
      eyebrow: "Gratis offerte",
      title: "Vertel ons over uw plannen.",
      lead: "Vier korte stappen, ongeveer twee minuten. Daarna nemen we binnen één werkdag contact op om een opname in te plannen — gratis en zonder verplichting.",
    },
    formTitle: "Uw aanvraag",
    formNote: "Velden met een * zijn verplicht. U kunt tussentijds terug om iets aan te passen.",
    imageAlt: "Keuken in aanbouw met nieuwe kastenwand en tegelachterwand",
    contact: { title: "Liever direct contact", whatsappMessage: "Hallo Perfecthous, ik wil een offerte aanvragen." },
    hoursShort: { week: "Ma–vr 07:30–17:30", sat: "Za op afspraak" },
    after: {
      title: "Wat gebeurt er daarna?",
      steps: [
        "We bellen of mailen binnen één werkdag.",
        "We plannen een gratis opname in.",
        "U ontvangt een offerte met duidelijke posten.",
      ],
      privacy: "Uw gegevens worden alleen gebruikt voor deze aanvraag.",
      privacyLink: "Privacy",
    },
  },

  thanks: {
    meta: {
      title: "Bedankt voor uw aanvraag",
      description:
        "We hebben uw offerteaanvraag ontvangen en nemen binnen één werkdag contact met u op.",
    },
    title: "Bedankt — uw aanvraag is binnen.",
    lead: "We nemen binnen één werkdag contact met u op om een gratis opname te plannen. Heeft u foto's of extra informatie? U kunt gewoon reageren op de bevestigingsmail.",
    reference: "Uw referentie",
    referenceNote: "Noem dit nummer als u ons belt of mailt.",
    more: "Iets vergeten of toch eerder contact?",
    whatsappMessage: "Hallo Perfecthous, ik heb net een offerteaanvraag gedaan.",
    work: "Ondertussen kunt u ons werk bekijken:",
    projects: "projecten",
    services: "diensten",
    back: "Terug naar de homepage",
  },

  blog: {
    meta: {
      title: "Kennisbank — tips over verbouwen en kosten",
      description:
        "Praktische artikelen over verbouwen, badkamers, vergunningen en kosten. Geschreven door Perfecthous, aannemer in Vlissingen.",
    },
    hero: {
      eyebrow: "Kennisbank",
      title: "Iets meer weten voordat u begint.",
      lead: "Over kosten, vergunningen en wat er in de praktijk komt kijken bij verbouwen. Geen marketingpraat, maar wat we tegen klanten ook aan de keukentafel zeggen.",
    },
    empty: "Er staan nog geen artikelen online. Kom binnenkort terug.",
    read: "Lees artikel",
    cta: {
      title: "Vraag het liever direct.",
      text: "Een artikel geeft richting, een gesprek geeft antwoord. Bel of vraag een gratis opname aan.",
    },
    post: {
      readTime: "min leestijd",
      toc: "In dit artikel",
      question: "Vragen over uw eigen situatie? Bel",
      orAsk: "of vraag een opname aan.",
      quote: "Gratis offerte",
      related: "Verder lezen",
      dutchOnly:
        "Dit artikel is in het Nederlands geschreven, omdat het over Nederlandse regels en prijzen gaat.",
    },
  },

  legal: {
    eyebrow: "Juridisch",
    notice:
      "Dit is een juridisch document. De Nederlandse tekst is de bindende versie; daarom staat die hier ongewijzigd.",
    titles: {
      privacy: "Privacyverklaring",
      terms: "Algemene voorwaarden",
      cookies: "Cookieverklaring",
    },
    lead: {
      privacy:
        "We verzamelen zo weinig gegevens als nodig om uw aanvraag te behandelen. Hieronder staat precies welke gegevens dat zijn en wat er mee gebeurt.",
      terms:
        "De afspraken die gelden voor iedere opdracht. Bij een offerte verwijzen we naar deze voorwaarden; ze worden op verzoek ook los toegestuurd.",
      cookies:
        "Deze site werkt zonder tracking. Er worden geen analytische of marketingcookies geplaatst voordat u daarvoor toestemming geeft.",
    },
    meta: {
      privacy:
        "Hoe Perfecthous persoonsgegevens verwerkt bij offerteaanvragen en contactberichten: welke gegevens, waarom, hoe lang en welke rechten u heeft.",
      terms:
        "De algemene voorwaarden van Perfecthous: afspraken over offertes, uitvoering, betaling, meerwerk, garantie en aansprakelijkheid.",
      cookies:
        "Welke cookies en lokale opslag de site van Perfecthous gebruikt, waarvoor en hoe u uw keuze op elk moment kunt wijzigen.",
    },
  },

  validation: {
    nameMin: "Vul uw naam in.",
    nameMax: "Dit is wel erg lang voor een naam.",
    emailEmpty: "Vul uw e-mailadres in.",
    emailInvalid: "Dit lijkt geen geldig e-mailadres.",
    phoneMin: "Vul een telefoonnummer in.",
    phoneMax: "Dit telefoonnummer is te lang.",
    phoneInvalid: "Vul een geldig telefoonnummer in.",
    descriptionMin: "Beschrijf de klus in minimaal 20 tekens, zodat we een goede inschatting kunnen maken.",
    descriptionMax: "Uw beschrijving is te lang; vat het samen in maximaal 4000 tekens.",
    messageMin: "Schrijf minimaal 10 tekens, dan kunnen we u gericht antwoorden.",
    messageMax: "Uw bericht is te lang.",
    privacy: "U moet akkoord gaan met de privacyverklaring.",
    spam: "Spam gedetecteerd.",
    rateLimitQuote: "U heeft in korte tijd meerdere aanvragen verstuurd. Probeer het later opnieuw of bel ons.",
    rateLimitContact: "U heeft in korte tijd meerdere berichten verstuurd. Probeer het later opnieuw of bel ons.",
    captcha: "De beveiligingscontrole is niet gelukt. Herlaad de pagina en probeer opnieuw.",
    save: "Er ging iets mis bij het opslaan. Probeer het opnieuw of bel ons.",
    send: "Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons.",
  },
};

const en: typeof nl = {
  contact: {
    meta: {
      title: "Contact — Perfecthous Vlissingen",
      description:
        "Get in touch with Perfecthous in Vlissingen: Schuitvaartgracht 85, 4382 GJ. Call, email or send a WhatsApp message. Mon–Fri 07:30–17:30.",
    },
    hero: {
      eyebrow: "Contact",
      title: "Shall we talk?",
      lead: "Call, email or send a message. For a quote the form is fastest; in an emergency — a leak or flooding — it is better to call directly.",
    },
    form: {
      title: "Send a message",
      intro: "We reply within one working day. For a price indication it is better to use the",
      introLink: "quote form",
      introEnd: ".",
    },
    direct: "Direct contact",
    whatsappMessage: "Hello Perfecthous, I have a question.",
    address: { title: "Visiting address", note: "By appointment — not a showroom", route: "Plan your route" },
    hours: {
      title: "Opening hours",
      rows: [
        { days: "Monday to Friday", hours: "07:30 – 17:30" },
        { days: "Saturday", hours: "By appointment" },
        { days: "Sunday", hours: "Closed" },
      ],
      emergency: "Emergency leak or breakdown: reachable 7 days a week.",
    },
    map: {
      label: "Location on the map",
      load: "Load map",
      cookieNote:
        "The map is loaded from Google, which may place cookies.",
      note: "The map is loaded from Google Maps, which may place cookies; see the", link: "cookie statement" },
  },

  quote: {
    meta: {
      title: "Request a free quote",
      description:
        "Request a no-obligation quote for your renovation, bathroom, tiling or job in Vlissingen. Free survey, reply within one working day and clear price agreements.",
    },
    hero: {
      eyebrow: "Free quote",
      title: "Tell us about your plans.",
      lead: "Four short steps, about two minutes. Then we contact you within one working day to schedule a survey — free and without obligation.",
    },
    formTitle: "Your request",
    formNote: "Fields marked * are required. You can go back at any time to change something.",
    imageAlt: "Kitchen under construction with a new run of units and tiled splashback",
    contact: { title: "Prefer direct contact", whatsappMessage: "Hello Perfecthous, I would like to request a quote." },
    hoursShort: { week: "Mon–Fri 07:30–17:30", sat: "Sat by appointment" },
    after: {
      title: "What happens next?",
      steps: [
        "We call or email within one working day.",
        "We schedule a free survey.",
        "You receive a quote with clear line items.",
      ],
      privacy: "Your details are only used for this request.",
      privacyLink: "Privacy",
    },
  },

  thanks: {
    meta: {
      title: "Thank you for your request",
      description: "We have received your quote request and will contact you within one working day.",
    },
    title: "Thank you — your request has arrived.",
    lead: "We will contact you within one working day to schedule a free survey. Do you have photos or extra information? Simply reply to the confirmation email.",
    reference: "Your reference",
    referenceNote: "Mention this number when you call or email us.",
    more: "Forgot something or want to talk sooner?",
    whatsappMessage: "Hello Perfecthous, I have just submitted a quote request.",
    work: "In the meantime you can look at our work:",
    projects: "projects",
    services: "services",
    back: "Back to the homepage",
  },

  blog: {
    meta: {
      title: "Knowledge base — tips on renovating and costs",
      description:
        "Practical articles on renovating, bathrooms, permits and costs. Written by Perfecthous, builder in Vlissingen.",
    },
    hero: {
      eyebrow: "Knowledge base",
      title: "Know a little more before you start.",
      lead: "About costs, permits and what renovating involves in practice. No marketing talk, but what we also tell clients at the kitchen table.",
    },
    empty: "There are no articles online yet. Please come back soon.",
    read: "Read article",
    cta: {
      title: "Rather ask directly.",
      text: "An article gives direction, a conversation gives answers. Call or request a free survey.",
    },
    post: {
      readTime: "min read",
      toc: "In this article",
      question: "Questions about your own situation? Call",
      orAsk: "or request a survey.",
      quote: "Free quote",
      related: "Read more",
      dutchOnly:
        "This article is written in Dutch, because it covers Dutch regulations and prices.",
    },
  },

  legal: {
    eyebrow: "Legal",
    notice:
      "This is a legal document. The Dutch text is the binding version, so it is reproduced here unchanged.",
    titles: {
      privacy: "Privacy statement",
      terms: "Terms and conditions",
      cookies: "Cookie statement",
    },
    lead: {
      privacy:
        "We collect as little data as necessary to handle your request. Below you can read exactly which data that is and what happens to it.",
      terms:
        "The agreements that apply to every assignment. In a quote we refer to these terms; they are also sent separately on request.",
      cookies:
        "This site works without tracking. No analytical or marketing cookies are placed before you give permission.",
    },
    meta: {
      privacy:
        "How Perfecthous processes personal data for quote requests and contact messages: which data, why, for how long and what rights you have.",
      terms:
        "The terms and conditions of Perfecthous: agreements on quotes, execution, payment, additional work, warranty and liability.",
      cookies:
        "Which cookies and local storage the Perfecthous site uses, what for, and how you can change your choice at any time.",
    },
  },

  validation: {
    nameMin: "Please enter your name.",
    nameMax: "That is rather long for a name.",
    emailEmpty: "Please enter your email address.",
    emailInvalid: "This does not look like a valid email address.",
    phoneMin: "Please enter a phone number.",
    phoneMax: "This phone number is too long.",
    phoneInvalid: "Please enter a valid phone number.",
    descriptionMin: "Describe the job in at least 20 characters so we can make a good estimate.",
    descriptionMax: "Your description is too long; summarise it in 4000 characters at most.",
    messageMin: "Write at least 10 characters so we can answer you properly.",
    messageMax: "Your message is too long.",
    privacy: "You must agree to the privacy statement.",
    spam: "Spam detected.",
    rateLimitQuote: "You have sent several requests in a short time. Please try again later or call us.",
    rateLimitContact: "You have sent several messages in a short time. Please try again later or call us.",
    captcha: "The security check failed. Reload the page and try again.",
    save: "Something went wrong while saving. Please try again or call us.",
    send: "Something went wrong while sending. Please try again or call us.",
  },
};

const ar: typeof nl = {
  contact: {
    meta: {
      title: "اتصل بنا — Perfecthous فلِسِنغن",
      description:
        "تواصل مع Perfecthous في فلِسِنغن: سخايتفارتخراخت 85، 4382 GJ. اتصل أو أرسل بريدًا أو رسالة واتساب. الاثنين–الجمعة 07:30–17:30.",
    },
    hero: {
      eyebrow: "اتصل بنا",
      title: "نتحدث قليلًا؟",
      lead: "اتصل أو أرسل بريدًا أو رسالة. لعرض السعر النموذج هو الأسرع؛ وفي الحالات الطارئة — تسرب أو فيضان — الأفضل الاتصال مباشرة.",
    },
    form: {
      title: "أرسل رسالة",
      intro: "نرد خلال يوم عمل واحد. لتقدير السعر من الأفضل استخدام",
      introLink: "نموذج عرض السعر",
      introEnd: ".",
    },
    direct: "تواصل مباشر",
    whatsappMessage: "مرحبًا Perfecthous، لدي سؤال.",
    address: { title: "عنوان الزيارة", note: "بموعد مسبق — ليس صالة عرض", route: "خطّط مسارك" },
    hours: {
      title: "ساعات العمل",
      rows: [
        { days: "الاثنين إلى الجمعة", hours: "07:30 – 17:30" },
        { days: "السبت", hours: "بموعد مسبق" },
        { days: "الأحد", hours: "مغلق" },
      ],
      emergency: "للحالات الطارئة من تسرب أو عطل: متاحون 7 أيام في الأسبوع.",
    },
    map: {
      label: "الموقع على الخريطة",
      load: "تحميل الخريطة",
      cookieNote: "تُحمّل الخريطة من Google Maps وقد تضع ملفات تعريف ارتباط.",
      note: "تُحمّل الخريطة من Google Maps وقد تضع ملفات تعريف ارتباط؛ راجع", link: "بيان ملفات تعريف الارتباط" },
  },

  quote: {
    meta: {
      title: "اطلب عرض سعر مجاني",
      description:
        "اطلب عرض سعر دون التزام لأعمال التجديد أو الحمام أو البلاط أو أي مهمة في فلِسِنغن. معاينة مجانية ورد خلال يوم عمل واحد واتفاقات سعرية واضحة.",
    },
    hero: {
      eyebrow: "عرض سعر مجاني",
      title: "أخبرنا عن خططك.",
      lead: "أربع خطوات قصيرة، دقيقتان تقريبًا. بعدها نتواصل معك خلال يوم عمل واحد لتحديد معاينة — مجانًا ودون التزام.",
    },
    formTitle: "طلبك",
    formNote: "الحقول المعلّمة بـ * إلزامية. يمكنك العودة في أي وقت لتعديل شيء.",
    imageAlt: "مطبخ قيد التنفيذ بجدار وحدات جديد وخلفية بلاط",
    contact: { title: "تفضّل التواصل المباشر", whatsappMessage: "مرحبًا Perfecthous، أريد طلب عرض سعر." },
    hoursShort: { week: "الاثنين–الجمعة 07:30–17:30", sat: "السبت بموعد" },
    after: {
      title: "ماذا يحدث بعد ذلك؟",
      steps: [
        "نتصل أو نراسل خلال يوم عمل واحد.",
        "نحدد موعد معاينة مجانية.",
        "تستلم عرض سعر ببنود واضحة.",
      ],
      privacy: "تُستخدم بياناتك لهذا الطلب فقط.",
      privacyLink: "الخصوصية",
    },
  },

  thanks: {
    meta: {
      title: "شكرًا لطلبك",
      description: "استلمنا طلب عرض السعر وسنتواصل معك خلال يوم عمل واحد.",
    },
    title: "شكرًا — وصل طلبك.",
    lead: "سنتواصل معك خلال يوم عمل واحد لتحديد موعد معاينة مجانية. هل لديك صور أو معلومات إضافية؟ يمكنك الرد على رسالة التأكيد.",
    reference: "رقمك المرجعي",
    referenceNote: "اذكر هذا الرقم عند الاتصال أو المراسلة.",
    more: "نسيت شيئًا أو تريد التواصل أبكر؟",
    whatsappMessage: "مرحبًا Perfecthous، أرسلت للتو طلب عرض سعر.",
    work: "في هذه الأثناء يمكنك الاطلاع على أعمالنا:",
    projects: "المشاريع",
    services: "الخدمات",
    back: "إلى الصفحة الرئيسية",
  },

  blog: {
    meta: {
      title: "قاعدة المعرفة — نصائح عن التجديد والتكاليف",
      description:
        "مقالات عملية عن التجديد والحمامات والتصاريح والتكاليف. بقلم Perfecthous، مقاول في فلِسِنغن.",
    },
    hero: {
      eyebrow: "قاعدة المعرفة",
      title: "اعرف أكثر قليلًا قبل أن تبدأ.",
      lead: "عن التكاليف والتصاريح وما يعنيه التجديد عمليًا. بلا كلام تسويقي، بل ما نقوله للعملاء على طاولة المطبخ أيضًا.",
    },
    empty: "لا توجد مقالات منشورة بعد. عد قريبًا.",
    read: "اقرأ المقال",
    cta: {
      title: "تفضّل السؤال مباشرة.",
      text: "المقال يعطي اتجاهًا، والحديث يعطي إجابة. اتصل أو اطلب معاينة مجانية.",
    },
    post: {
      readTime: "دقيقة قراءة",
      toc: "في هذا المقال",
      question: "أسئلة عن حالتك؟ اتصل",
      orAsk: "أو اطلب معاينة.",
      quote: "عرض سعر مجاني",
      related: "اقرأ أيضًا",
      dutchOnly:
        "كُتب هذا المقال بالهولندية لأنه يتناول القواعد والأسعار الهولندية.",
    },
  },

  legal: {
    eyebrow: "قانوني",
    notice:
      "هذا مستند قانوني. النص الهولندي هو النسخة الملزمة، لذلك يُعرض هنا دون تغيير.",
    titles: {
      privacy: "بيان الخصوصية",
      terms: "الشروط والأحكام",
      cookies: "بيان ملفات تعريف الارتباط",
    },
    lead: {
      privacy:
        "نجمع أقل قدر ممكن من البيانات اللازمة لمعالجة طلبك. أدناه تفاصيل ما نجمعه وما يحدث له.",
      terms:
        "الاتفاقات السارية على كل مهمة. في عرض السعر نشير إلى هذه الشروط، وتُرسل أيضًا منفصلة عند الطلب.",
      cookies:
        "يعمل هذا الموقع دون تتبع. ولا تُوضع ملفات تعريف ارتباط تحليلية أو تسويقية قبل موافقتك.",
    },
    meta: {
      privacy:
        "كيف تعالج Perfecthous البيانات الشخصية عند طلبات عروض السعر ورسائل التواصل: أي بيانات، ولماذا، وكم مدة، وما حقوقك.",
      terms:
        "الشروط والأحكام العامة لـ Perfecthous: اتفاقات عروض السعر والتنفيذ والدفع والأعمال الإضافية والضمان والمسؤولية.",
      cookies:
        "ملفات تعريف الارتباط والتخزين المحلي التي يستخدمها موقع Perfecthous، والغرض منها، وكيفية تغيير اختيارك في أي وقت.",
    },
  },

  validation: {
    nameMin: "أدخل اسمك.",
    nameMax: "هذا طويل جدًا لاسم.",
    emailEmpty: "أدخل بريدك الإلكتروني.",
    emailInvalid: "لا يبدو هذا بريدًا إلكترونيًا صحيحًا.",
    phoneMin: "أدخل رقم هاتف.",
    phoneMax: "رقم الهاتف طويل جدًا.",
    phoneInvalid: "أدخل رقم هاتف صحيحًا.",
    descriptionMin: "صِف المهمة في 20 حرفًا على الأقل لنتمكن من التقدير.",
    descriptionMax: "وصفك طويل جدًا؛ لخّصه في 4000 حرف كحد أقصى.",
    messageMin: "اكتب 10 أحرف على الأقل لنتمكن من الرد بدقة.",
    messageMax: "رسالتك طويلة جدًا.",
    privacy: "يجب الموافقة على بيان الخصوصية.",
    spam: "تم رصد بريد مزعج.",
    rateLimitQuote: "أرسلت عدة طلبات في وقت قصير. حاول لاحقًا أو اتصل بنا.",
    rateLimitContact: "أرسلت عدة رسائل في وقت قصير. حاول لاحقًا أو اتصل بنا.",
    captcha: "فشل التحقق الأمني. أعد تحميل الصفحة وحاول مجددًا.",
    save: "حدث خطأ أثناء الحفظ. حاول مجددًا أو اتصل بنا.",
    send: "حدث خطأ أثناء الإرسال. حاول مجددًا أو اتصل بنا.",
  },
};

export const pagesCopy = { nl, en, ar };
export type PagesCopy = typeof nl;
