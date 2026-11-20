/** Projectoverzicht, projectdetail en het filterraster. */

const nl = {
  meta: {
    title: "Projecten — verbouwingen en renovaties op Walcheren",
    description:
      "Een selectie van verbouwingen, badkamers, uitbouwen en afbouwwerk van Perfecthous in Vlissingen, Middelburg, Veere en omgeving.",
  },
  hero: {
    eyebrow: "Portfolio",
    title: "Werk dat voor zich spreekt.",
    lead: "Geen stockfoto's van andere bouwbedrijven, maar opdrachten die we zelf hebben gedaan. Filter op categorie of bekijk per project wat er speelde en hoe we het hebben aangepakt.",
    imageAlt: "Bedrijfsruimte met een groenwand en zwarte 3D-wandpanelen, werk van Perfecthous",
  },
  note: "Alle foto's op deze pagina zijn eigen opnames van Perfecthous, afkomstig van ons Google Maps-profiel. Bij een kennismaking laten we graag meer foto's van uitgevoerde opdrachten in uw regio zien.",
  cta: {
    title: "Uw project als volgende?",
    text: "Vertel ons wat u wilt veranderen. We komen langs, kijken naar de ruimte en geven een eerlijke inschatting van aanpak, planning en kosten.",
  },
  grid: {
    all: "Alles",
    filterLabel: "Filter op categorie",
    project: "project",
    projects: "projecten",
  },
  detail: {
    facts: { location: "Locatie", year: "Jaar", category: "Categorie" },
    situation: "Wat er speelde",
    client: {
      title: "Opdrachtgever",
      text: "Opdracht in {location}. Het werk is in overleg gefaseerd uitgevoerd{extra}.",
      extraBathroom: " en de ruimte is tussentijds zo veel mogelijk bruikbaar gehouden",
      moreAbout: "Meer over {service}",
      similar: "Vergelijkbaar project",
    },
    beforeAfter: {
      eyebrow: "Voor en na",
      title: "Het verschil in één beweging.",
      lead: "Sleep de lijn om de situatie voor en na de verbouwing te vergelijken.",
      beforeAlt: "Situatie voor de verbouwing — {title}",
      afterAlt: "Situatie na de verbouwing — {title}",
      beforeLabel: "Voor",
      afterLabel: "Na",
      sliderLabel: "Vergelijk voor en na",
      sliderHint: "Sleep of gebruik de pijltjestoetsen om de voor- en nafoto te vergelijken.",
    },
    gallery: { eyebrow: "Galerij", title: "Details van het werk." },
    credits: "Foto's: eigen opnames van Perfecthous, afkomstig van ons Google Maps-profiel.",
    more: { eyebrow: "Verder kijken", title: "Meer projecten.", all: "Alle projecten" },
  },
};

const en: typeof nl = {
  meta: {
    title: "Projects — renovations and remodelling on Walcheren",
    description:
      "A selection of renovations, bathrooms, extensions and finishing work by Perfecthous in Vlissingen, Middelburg, Veere and surroundings.",
  },
  hero: {
    eyebrow: "Portfolio",
    title: "Work that speaks for itself.",
    lead: "No stock photos from other builders, but assignments we carried out ourselves. Filter by category or see per project what was involved and how we tackled it.",
    imageAlt: "Commercial space with a green wall and black 3D wall panels, work by Perfecthous",
  },
  note: "All photos on this page are Perfecthous's own, taken from our Google Maps profile. During an introduction we are happy to show more photos of completed assignments in your area.",
  cta: {
    title: "Your project next?",
    text: "Tell us what you want to change. We visit, look at the space and give an honest estimate of approach, schedule and costs.",
  },
  grid: {
    all: "All",
    filterLabel: "Filter by category",
    project: "project",
    projects: "projects",
  },
  detail: {
    facts: { location: "Location", year: "Year", category: "Category" },
    situation: "What was involved",
    client: {
      title: "Client",
      text: "Assignment in {location}. The work was carried out in phases by agreement{extra}.",
      extraBathroom: " and the room was kept usable as much as possible in between",
      moreAbout: "More about {service}",
      similar: "Similar project",
    },
    beforeAfter: {
      eyebrow: "Before and after",
      title: "The difference in one movement.",
      lead: "Drag the line to compare the situation before and after the renovation.",
      beforeAlt: "Situation before the renovation — {title}",
      afterAlt: "Situation after the renovation — {title}",
      beforeLabel: "Before",
      afterLabel: "After",
      sliderLabel: "Compare before and after",
      sliderHint: "Drag or use the arrow keys to compare the before and after photo.",
    },
    gallery: { eyebrow: "Gallery", title: "Details of the work." },
    credits: "Photos: Perfecthous's own images, taken from our Google Maps profile.",
    more: { eyebrow: "Look further", title: "More projects.", all: "All projects" },
  },
};

const ar: typeof nl = {
  meta: {
    title: "المشاريع — تجديد وترميم في فالخِرِن",
    description:
      "مجموعة من أعمال التجديد والحمامات والتوسعة والتشطيب من Perfecthous في فلِسِنغن وميدلبورخ وفيره والمناطق المحيطة.",
  },
  hero: {
    eyebrow: "ملف الأعمال",
    title: "عمل يتحدث عن نفسه.",
    lead: "لا صور جاهزة من شركات بناء أخرى، بل مشاريع نفّذناها بأنفسنا. صنّف حسب الفئة أو اطّلع على ما كان في كل مشروع وكيف تعاملنا معه.",
    imageAlt: "مساحة تجارية بجدار أخضر وألواح سوداء ثلاثية الأبعاد، من أعمال Perfecthous",
  },
  note: "جميع الصور في هذه الصفحة تصوير Perfecthous نفسه، من ملفنا على Google Maps. عند التعارف يسعدنا عرض المزيد من صور الأعمال المنفذة في منطقتك.",
  cta: {
    title: "مشروعك هو التالي؟",
    text: "أخبرنا بما تريد تغييره. نزور المكان وننظر في المساحة ونعطي تقديرًا صادقًا للطريقة والجدول والتكلفة.",
  },
  grid: {
    all: "الكل",
    filterLabel: "تصفية حسب الفئة",
    project: "مشروع",
    projects: "مشاريع",
  },
  detail: {
    facts: { location: "الموقع", year: "السنة", category: "الفئة" },
    situation: "ما كان في المشروع",
    client: {
      title: "العميل",
      text: "مشروع في {location}. نُفّذ العمل على مراحل بالاتفاق{extra}.",
      extraBathroom: " مع إبقاء المساحة صالحة للاستخدام قدر الإمكان في الفترات البينية",
      moreAbout: "المزيد عن {service}",
      similar: "مشروع مماثل",
    },
    beforeAfter: {
      eyebrow: "قبل وبعد",
      title: "الفرق في حركة واحدة.",
      lead: "اسحب الخط لمقارنة الوضع قبل التجديد وبعده.",
      beforeAlt: "الوضع قبل التجديد — {title}",
      afterAlt: "الوضع بعد التجديد — {title}",
      beforeLabel: "قبل",
      afterLabel: "بعد",
      sliderLabel: "قارن قبل وبعد",
      sliderHint: "اسحب أو استخدم مفاتيح الأسهم لمقارنة الصورة قبل وبعد.",
    },
    gallery: { eyebrow: "المعرض", title: "تفاصيل العمل." },
    credits: "الصور: تصوير Perfecthous نفسه، من ملفنا على Google Maps.",
    more: { eyebrow: "أبعد من ذلك", title: "مزيد من المشاريع.", all: "جميع المشاريع" },
  },
};

export const projectsCopy = { nl, en, ar };
export type ProjectsCopy = typeof nl;
