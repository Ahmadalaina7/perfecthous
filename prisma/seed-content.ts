/** Projecten, reviews en blogberichten voor de seed. */

export const projects = [
  {
    // Eigen foto's van het bedrijf zelf, van het Google Maps-profiel
    // (collage van drie opnames, plus de losse profielfoto's).
    slug: "interieur-afbouw-vlissingen",
    title: "Plafond, wand en vloer in één traject",
    category: "Verbouwing & renovatie",
    location: "Vlissingen",
    year: 2026,
    summary:
      "Plafond met led-verlichting, een strakke wand met tv en schouw, en een nieuwe eiken vloer — in één opdracht afgewerkt.",
    description:
      "In deze woning is de begane grond in één keer aangepakt. Het plafond is voorzien van led-lichtlijnen en een inbouw lichtpaneel, zodat de verlichting in het vlak zelf zit en de bedrading uit het zicht verdwijnt. Tegen de wand is een strakke opbouw gemaakt voor de televisie, met daaronder een schouw. Als laatste is de vloer gelegd: eiken planken in een rustige, rechte baan, met de plinten in dezelfde tint als de wanden. Doordat plafond, wand en vloer door dezelfde ploeg zijn gedaan, sluiten de details op elkaar aan en hoefde er niet tussen partijen gewacht te worden.",
    coverImage: "/images/perfecthous-tvwand.jpg",
    gallery: "/images/perfecthous-plafond.jpg\n/images/perfecthous-vloer.jpg",
    beforeImage: null,
    afterImage: null,
    featured: true,
    serviceSlug: "verbouwing-renovatie",
    order: 0,
  },
  {
    // Ook eigen opnames, van het tweede Maps-foto van het bedrijf (portret,
    // 1080 x 1920; hier bijgesneden tot 4:3 en een detail).
    slug: "bedrijfsruimte-afbouw-vlissingen",
    title: "Groenwand en wandpanelen in een bedrijfsruimte",
    category: "Verbouwing & renovatie",
    location: "Vlissingen",
    year: 2026,
    summary:
      "Een bedrijfsruimte in één opdracht afgewerkt: groenwand over de volle hoogte, zwarte 3D-wandpanelen en led-verlichting in het plafond.",
    description:
      "In deze bedrijfsruimte is het interieur in één keer afgewerkt. Tegen de wand is een groenwand geplaatst die doorloopt tot het plafond, met daaronder zwarte 3D-panelen als blikvanger achter de wasunits. De led-verlichting in het plafond en de tegelvloer maken het geheel af. Doordat wand, plafond en vloer in dezelfde opdracht zijn gedaan, sluiten de overgangen op elkaar aan en hoefde er niet tussen partijen gewacht te worden.",
    coverImage: "/images/perfecthous-salon.jpg",
    gallery: "/images/perfecthous-salon-detail.jpg",
    beforeImage: null,
    afterImage: null,
    featured: true,
    serviceSlug: "verbouwing-renovatie",
    order: 1,
  },
  {
    slug: "keuken-geplaatst-vlissingen",
    title: "Keuken opgebouwd en afgewerkt",
    category: "Badkamer & keuken",
    location: "Vlissingen",
    year: 2026,
    summary:
      "Nieuwe kastenwand in grijs en wit, een tegelachterwand in metselverband en de afzuiging weggewerkt in de bovenkast.",
    description:
      "De keuken is opnieuw opgebouwd met een lange kastenwand en een tegelachterwand in metselverband. De afzuiging is opgenomen in de bovenkast, zodat er geen losse kap in het zicht hangt. De aansluitpunten en stopcontacten zijn meegenomen voordat de kasten werden opgehangen; daardoor zit alles op de plek waar het in de keuken nodig is en hoeft er later niet meer in de wand geboord te worden. De vloer is in dezelfde opdracht voorbereid op de afwerking.",
    coverImage: "/images/maps-keuken.jpg",
    gallery: "/images/maps-tegelwand.jpg",
    beforeImage: null,
    afterImage: null,
    featured: true,
    serviceSlug: "badkamer-keuken",
    order: 2,
  },
  {
    slug: "woning-gestript-en-gestuct-vlissingen",
    title: "Woning gestript en opnieuw gestuct",
    category: "Verbouwing & renovatie",
    location: "Vlissingen",
    year: 2026,
    summary:
      "Wanden en plafonds opnieuw gestuct, kozijnen teruggeplaatst en de ondervloer klaargemaakt voor de nieuwe afwerking.",
    description:
      "Bij deze woning zijn de wanden en plafonds opnieuw gestuct nadat het oude werk eruit was. De kozijnen zijn teruggeplaatst en afgetimmerd, de verwarming is aangesloten en de ondervloer is vrijgemaakt en voorbereid op de nieuwe afwerking. De foto's laten de tussenstand zien: gestuct werk, klaar voor schilderwerk en de vloerafwerking. Doordat sloop, stucwerk en vloervoorbereiding in één opdracht zaten, was er geen wachttijd tussen de partijen.",
    coverImage: "/images/maps-kamer.jpg",
    gallery: "/images/maps-gang.jpg\n/images/maps-deur.jpg",
    beforeImage: null,
    afterImage: null,
    featured: false,
    serviceSlug: "verbouwing-renovatie",
    order: 3,
  },
  {
    slug: "terras-betegeld-vlissingen",
    title: "Terras opnieuw betegeld",
    category: "Tegelwerk",
    location: "Vlissingen",
    year: 2026,
    summary:
      "Groot formaat tegels op een vers zandbed, met een metalen profiel als rand en een aansluiting op de bestrating.",
    description:
      "Het terras is opnieuw opgebouwd: zandbed, specie en groot formaat tegels in een rechte baan. Langs de rand is een metalen profiel aangebracht, zodat de tegels daar strak eindigen en het regenwater de goede kant op loopt. De aansluiting op de bestrating en de gevel is in dezelfde opdracht meegenomen. De foto's zijn tijdens het werk genomen; de specie was op dat moment nog niet uitgehard.",
    coverImage: "/images/maps-terras.jpg",
    gallery: "/images/maps-tegel.jpg",
    beforeImage: null,
    afterImage: null,
    featured: false,
    serviceSlug: "tegelwerk",
    order: 4,
  },
] as const;

export const reviews = [
  {
    author: "Sandra van der Berg",
    city: "Vlissingen",
    rating: 5,
    service: "Badkamer & keuken",
    body: "Onze badkamer was echt aan vervanging toe en we zagen op tegen de overlast. Perfecthous heeft het per dag aangepakt en aan het eind van elke dag was het weer leefbaar. De afwerking is strak, de voegen lopen door en er is geen kitrand te bekennen die niet klopt. Eén aanspreekpunt scheelt zo veel.",
  },
  {
    author: "Marc de Ruiter",
    city: "Oost-Souburg",
    rating: 5,
    service: "Aanbouw & uitbouw",
    body: "De uitbouw is precies geworden wat we voor ogen hadden, maar wat mij het meest beviel is de communicatie. Bij de opname werden meteen de lastige punten benoemd, in plaats van dat ze later als meerwerk opdoken. De planning is gehouden en de begroting ook.",
  },
  {
    author: "Els Verhagen",
    city: "Middelburg",
    rating: 5,
    service: "Verbouwing & renovatie",
    body: "We woonden in huis tijdens de verbouwing van de woonkamer. Elke avond was het opgeruimd, stof afgedekt en kon je gewoon televisie kijken. Dat klinkt vanzelfsprekend, maar het is het niet. Het resultaat is een lichte kamer die nu eindelijk klopt.",
  },
  {
    author: "Jan-Willem Bakker",
    city: "Koudekerke",
    rating: 5,
    service: "Tegelwerk",
    body: "Groot formaat tegels in de hal en op de trap. Dat is precisiewerk en dat was te zien: alles loopt netjes door, ook bij de hoeken die je normaal niet ziet. Vooraf een duidelijke prijs, achteraf geen verrassingen.",
  },
  {
    author: "Petra Meijer",
    city: "Veere",
    rating: 5,
    service: "Loodgieterswerk",
    body: "Op zaterdagochtend lekkage onder de vloer. Gebeld en binnen twee uur stond er iemand. Het is meteen opgelost en maandag kwam hij terug om de vloer weer netjes dicht te maken. Dat had ik niet verwacht en maakt het verschil.",
  },
  {
    author: "Daan Koster",
    city: "Vlissingen",
    rating: 5,
    service: "Timmerwerk",
    body: "Een kast op maat onder een schuin dak, waar anderen van zeiden dat het niet kon. Het is gelukt en je ziet geen enkele kier. Komt rustig kijken, denkt mee en zegt het als iets niet handig is in plaats van het gewoon te doen.",
  },
] as const;

export const posts = [
  {
    slug: "wat-kost-een-badkamerrenovatie",
    title: "Wat kost een badkamerrenovatie in 2026?",
    excerpt:
      "Een realistische opbouw van de kosten: wat u betaalt voor sloop, techniek, tegelwerk en sanitair, en waar de grootste verschillen zitten.",
    category: "Kosten & planning",
    content: `## Waarom de prijs zo ver uiteenloopt

Wie drie offertes opvraagt voor dezelfde badkamer, krijgt soms drie totaal verschillende bedragen. Dat komt zelden door de winstmarge — het zit bijna altijd in wat er *niet* in de offerte staat. Wordt de waterdichting meegerekend? Wordt het oude sanitair afgevoerd? Zit het leidingwerk erbij of alleen het tegelwerk?

Een eerlijke prijsvergelijking begint dus bij dezelfde scope.

## De opbouw van een complete renovatie

Een complete badkamerrenovatie bestaat uit vier lagen werk:

1. **Sloop en afvoer** — oude tegels, sanitair en soms een wand eruit.
2. **Techniek** — leidingwerk verleggen, afvoeren aanpassen, elektra.
3. **Waterdichting en tegelwerk** — inclusief het vlak maken van de ondergrond.
4. **Montage en afwerking** — sanitair, kitwerk, accessoires.

De eerste en derde laag zijn de sluipende kostenposten. Sloopwerk in een oud pand met een dikke tegelvloer kost meer dan in een woning uit 2005. En een ondergrond die niet vlak is, vraagt om egaliseren — een dag extra die niemand vooraf ziet.

## Waar u op moet letten in een offerte

Vraag altijd naar deze vier punten:

- Is de waterdichting inbegrepen, of staat die als aparte post?
- Wordt het afval afgevoerd en tegen welk tarief?
- Wat gebeurt er als er achter de wand iets onverwachts zit?
- Staat er een planning per week in, of alleen een einddatum?

Een offerte die deze vragen beantwoordt, is meer waard dan een die alleen een totaalbedrag noemt.

## Een indicatie

Voor een complete renovatie van een badkamer van ongeveer 6 m² in een standaardwoning zit u in de meeste gevallen tussen de vijftien- en vijfentwintigduizend euro, afhankelijk van de materialen en de staat van de techniek. Een opfrissing — nieuwe tegels, nieuw sanitair, techniek blijven zitten — kan een stuk lager uitvallen.

Die bandbreedte is bewust breed. Een exact bedrag noemen zonder de ruimte te hebben gezien, is een belofte die je niet kunt houden.`,
  },
  {
    slug: "vergunning-voor-een-uitbouw",
    title: "Heb ik een vergunning nodig voor een uitbouw?",
    excerpt:
      "De regels voor aan- en uitbouwen zijn veranderd. Wat mag vergunningsvrij, wanneer heeft u een omgevingsvergunning nodig en wat vraagt de gemeente?",
    category: "Vergunningen",
    content: `## De hoofdregel

Sinds de Omgevingswet is het stelsel simpeler geworden, maar niet simpel. In grote lijnen geldt: een uitbouw aan de **achterkant** van een woning mag vaak vergunningsvrij, mits hij niet te groot is en niet te ver het achtererf in steekt. Aan de **voorkant** is bijna altijd een vergunning nodig.

De exacte maten verschillen per gemeente en per bestemmingsplan. Vlissingen, Middelburg en Veere hebben elk hun eigen regels — en binnen een gemeente kan het per wijk verschillen.

## Wat u meestal nodig heeft

- Een situatietekening met de uitbouw erop
- Geveltekeningen van voor- en achterkant
- Een plattegrond met de nieuwe indeling
- Soms een constructieberekening, bijvoorbeeld bij een grote overspanning

Wij leveren de tekeningen en gegevens aan die u nodig heeft. De aanvraag zelf dient u als eigenaar in bij de gemeente.

## Laat het vooraf checken

De beste stap is om vóór de offerte het omgevingsloket te raadplegen of de gemeente te bellen met de maten van uw plan. Dan weet u binnen een paar dagen waar u aan toe bent, in plaats van er halverwege de bouw achter te komen.

Twijfelt u? Wij kijken bij de opname graag mee — dat kost niets en voorkomt een dure verrassing.`,
  },
  {
    slug: "verbouwen-terwijl-u-er-woont",
    title: "Verbouwen terwijl u er woont: zo blijft het leefbaar",
    excerpt:
      "Een verbouwing in een bewoond huis vraagt planning. Vijf praktische afspraken die het verschil maken tussen overleven en gewoon doorgaan.",
    category: "Tips",
    content: `## 1. Faseer per ruimte, niet per discipline

De verleiding is groot om alle muren tegelijk te doen. Maar als je per ruimte werkt, houd je altijd een keuken, badkamer en slaapkamer over die bruikbaar zijn. Dat betekent wel dat dezelfde discipline twee keer langskomt — daar staat tegenover dat u niet drie weken zonder badkamer zit.

## 2. Spreek af wie wat opruimt

Aan het eind van elke werkdag hoort de vloer vrij te zijn en het stof afgedekt. Spreek dat expliciet af, in de offerte of in het werkplan. Bij ons staat het standaard in de afspraken.

## 3. Bescherm wat blijft

Karton op de vloer, folie over meubels, stofdeuren bij de trapopening. Het kost een uur en scheelt dagen schoonmaken.

## 4. Houd één beslisser aan

Bij een verbouwing vallen er honderden kleine beslissingen. Als twee mensen verschillend antwoorden, staat het werk stil. Spreek af wie het aanspreekpunt is.

## 5. Plan de stofpieken

Slopen en schuren geven het meeste stof. Vraag wanneer die dagen zijn en plan daar omheen — bijvoorbeeld een weekend weg of de kinderen een paar dagen bij familie.

Een verbouwing in een bewoond huis is nooit comfortabel, maar met deze vijf afspraken is het wel vol te houden.`,
  },
] as const;
