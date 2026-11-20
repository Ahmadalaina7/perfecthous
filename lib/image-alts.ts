import type { Locale } from "./i18n/config";

/**
 * Beschrijvende alt-teksten per afbeelding, per taal.
 *
 * De foto's van Perfecthous zelf (van het Google Maps-profiel) en de gegenereerde
 * sfeerbeelden hebben een eigen omschrijving nodig: "detailfoto 2" zegt niets
 * tegen iemand die de foto niet kan zien. Ontbreekt een omschrijving, dan blijft
 * de algemene tekst met de dienst- of projecttitel staan — ook in de taal van de
 * pagina, want een schermlezer leest die voor.
 */
const descriptions: Record<Locale, Record<string, string>> = {
  nl: {
    "/images/hero-verbouwing.jpg":
      "Lege, net afgewerkte kamer met een eiken plankenvloer en zwarte stalen deuren naar de tuin, met laag avondlicht op de muur",
    "/images/sfeerbeeld-aanbouw.jpg":
      "Uitbouw van metselwerk met een plat zinken dak en een zwarte schuifpui, gezien vanaf de tuinzijde tijdens de afbouw",
    "/images/sfeerbeeld-sanitair.jpg":
      "Nieuw geplaatst sanitair: inloopdouche met zwart frame, wandcloset en een wastafel met messing kraan op grijs tegelwerk",
    "/images/perfecthous-plafond.jpg":
      "Plafond met led-lichtlijnen in een zeshoekig patroon en een inbouw lichtpaneel, aangesloten door Perfecthous",
    "/images/perfecthous-tvwand.jpg":
      "Wand met een strakke nis voor de televisie en een schouw eronder, in een donkere afwerking",
    "/images/perfecthous-vloer.jpg":
      "Vers gelegde eiken vloer met lange planken en een egale, matte afwerking",
    "/images/perfecthous-salon.jpg":
      "Bedrijfsruimte met een groenwand, zwarte 3D-wandpanelen en led-verlichting, afgewerkt door Perfecthous",
    "/images/perfecthous-salon-detail.jpg":
      "Detail van zwarte 3D-wandpanelen onder een groenwand, met de wasunits op de voorgrond",
    "/images/maps-keuken.jpg":
      "Keuken in aanbouw met een kastenwand in grijs en wit en een tegelachterwand in metselverband",
    "/images/maps-tegelwand.jpg":
      "Tegelachterwand in metselverband boven het werkblad, met de contactdozen in de voegen uitgespaard",
    "/images/maps-kamer.jpg":
      "Leeggehaalde kamer met vers stucwerk, een groot raam en een emmer met gereedschap op de vloer",
    "/images/maps-gang.jpg":
      "Doorgang met een nieuw kozijn en vers stucwerk, gezien vanuit de aangrenzende kamer",
    "/images/maps-deur.jpg":
      "Ondergrond van een kamer nadat de oude vloer is verwijderd, met een luik in het zandbed",
    "/images/maps-terras.jpg":
      "Terras in aanbouw: groot formaat tegels op specie met een metalen randprofiel",
    "/images/maps-tegel.jpg":
      "Detail van een tegel op een vers speciebed naast de bestrating",
    "/images/maps-trap.jpg":
      "Houten trap met een wit betimmerde wand en een houten vloer in de hal",
  },
  en: {
    "/images/hero-verbouwing.jpg":
      "Empty, freshly finished room with an oak plank floor and black steel doors to the garden, low evening light on the wall",
    "/images/sfeerbeeld-aanbouw.jpg":
      "Brick extension with a flat zinc roof and black sliding doors, seen from the garden during finishing",
    "/images/sfeerbeeld-sanitair.jpg":
      "Newly installed sanitary ware: walk-in shower with black frame, wall-hung toilet and a basin with brass tap on grey tiles",
    "/images/perfecthous-plafond.jpg":
      "Ceiling with LED light lines in a hexagonal pattern and a recessed light panel, installed by Perfecthous",
    "/images/perfecthous-tvwand.jpg":
      "Wall with a clean recess for the television and a fireplace below, in a dark finish",
    "/images/perfecthous-vloer.jpg":
      "Freshly laid oak floor with long planks and an even, matt finish",
    "/images/perfecthous-salon.jpg":
      "Commercial space with a green wall, black 3D wall panels and LED lighting, finished by Perfecthous",
    "/images/perfecthous-salon-detail.jpg":
      "Detail of black 3D wall panels below a green wall, with the wash units in the foreground",
    "/images/maps-keuken.jpg":
      "Kitchen under construction with grey and white units and a brick-bond tiled splashback",
    "/images/maps-tegelwand.jpg":
      "Brick-bond tiled splashback above the worktop, with the sockets cut out in the joints",
    "/images/maps-kamer.jpg":
      "Emptied room with fresh plaster, a large window and a bucket of tools on the floor",
    "/images/maps-gang.jpg":
      "Doorway with a new frame and fresh plaster, seen from the adjoining room",
    "/images/maps-deur.jpg":
      "Room base after the old floor was removed, with a hatch in the sand bed",
    "/images/maps-terras.jpg":
      "Patio under construction: large-format tiles on mortar with a metal edge profile",
    "/images/maps-tegel.jpg":
      "Detail of a tile on a fresh mortar bed next to the paving",
    "/images/maps-trap.jpg":
      "Wooden staircase with a white panelled wall and a wooden floor in the hall",
  },
  ar: {
    "/images/hero-verbouwing.jpg":
      "غرفة فارغة حديثة التشطيب بأرضية من ألواح البلوط وأبواب فولاذية سوداء تطل على الحديقة، وضوء مسائي خفيف على الجدار",
    "/images/sfeerbeeld-aanbouw.jpg":
      "توسعة من الطوب بسقف زنك مسطّح وأبواب منزلقة سوداء، تُرى من جهة الحديقة أثناء التشطيب",
    "/images/sfeerbeeld-sanitair.jpg":
      "تركيبات صحية جديدة: دش مفتوح بإطار أسود، ومرحاض معلّق، ومغسلة بصنبور نحاسي على بلاط رمادي",
    "/images/perfecthous-plafond.jpg":
      "سقف بخطوط إضاءة LED بنمط سداسي ولوح إضاءة مدمج، نفّذته Perfecthous",
    "/images/perfecthous-tvwand.jpg":
      "جدار بتجويف أنيق للتلفاز ومدفأة أسفله، بتشطيب داكن",
    "/images/perfecthous-vloer.jpg":
      "أرضية بلوط مركّبة حديثًا بألواح طويلة وتشطيب مطفأ متجانس",
    "/images/perfecthous-salon.jpg":
      "مساحة تجارية بجدار أخضر وألواح جدارية ثلاثية الأبعاد سوداء وإضاءة LED، نفّذتها Perfecthous",
    "/images/perfecthous-salon-detail.jpg":
      "تفصيل لألواح جدارية سوداء ثلاثية الأبعاد تحت جدار أخضر، مع وحدات الغسل في المقدمة",
    "/images/maps-keuken.jpg":
      "مطبخ قيد التنفيذ بوحدات رمادية وبيضاء وخلفية بلاط بنمط الطوب",
    "/images/maps-tegelwand.jpg":
      "خلفية بلاط بنمط الطوب فوق سطح العمل، مع فتحات المقابس في المفاصل",
    "/images/maps-kamer.jpg":
      "غرفة مفرغة بجبس جديد ونافذة كبيرة ودلو أدوات على الأرض",
    "/images/maps-gang.jpg":
      "ممر بإطار جديد وجبس جديد، يُرى من الغرفة المجاورة",
    "/images/maps-deur.jpg":
      "قاعدة الغرفة بعد إزالة الأرضية القديمة، مع فتحة في طبقة الرمل",
    "/images/maps-terras.jpg":
      "تراس قيد التنفيذ: بلاط كبير الحجم على المونة مع مقطع حافة معدني",
    "/images/maps-tegel.jpg":
      "تفصيل لبلاطة على طبقة مونة جديدة بجوار الرصف",
    "/images/maps-trap.jpg":
      "درج خشبي بجدار مغلّف بالأبيض وأرضية خشبية في المدخل",
  },
};

const fallback = {
  nl: {
    service: (title: string) => `${title} — sfeerbeeld bij deze dienst`,
    project: (title: string) => `${title} — sfeerbeeld bij het project`,
    detail: (title: string, index: number) => `${title} — detailfoto ${index + 1}`,
  },
  en: {
    service: (title: string) => `${title} — atmosphere image for this service`,
    project: (title: string) => `${title} — atmosphere image for this project`,
    detail: (title: string, index: number) => `${title} — detail photo ${index + 1}`,
  },
  ar: {
    service: (title: string) => `${title} — صورة تعبيرية لهذه الخدمة`,
    project: (title: string) => `${title} — صورة تعبيرية للمشروع`,
    detail: (title: string, index: number) => `${title} — صورة تفصيلية ${index + 1}`,
  },
} as const;

/** Alt-tekst voor de foto bij een dienst; eigen opnames krijgen hun eigen omschrijving. */
export function serviceImageAlt(src: string, serviceTitle: string, locale: Locale): string {
  return descriptions[locale][src] ?? fallback[locale].service(serviceTitle);
}

/** Alt-tekst voor een foto binnen een project. */
export function projectImageAlt(
  src: string,
  projectTitle: string,
  locale: Locale,
  index?: number,
): string {
  const own = descriptions[locale][src];
  if (own) return own;
  return index === undefined
    ? fallback[locale].project(projectTitle)
    : fallback[locale].detail(projectTitle, index);
}
