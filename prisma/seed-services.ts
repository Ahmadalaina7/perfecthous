/**
 * Diensten voor de seed. `bullets` en `faqs` worden in seed.ts naar regels
 * respectievelijk ServiceFaq-rijen omgezet.
 */
export type SeedService = {
  slug: string;
  title: string;
  icon: string;
  excerpt: string;
  intro: string;
  bullets: string;
  image: string;
  faqs: { question: string; answer: string }[];
};

export const services: SeedService[] = [
  {
    slug: "verbouwing-renovatie",
    title: "Verbouwing & renovatie",
    icon: "verbouw",
    excerpt:
      "Een woning die niet meer past bij hoe u leeft: indelingswijzigingen, doorbraken, compleet gestript en opnieuw opgebouwd.",
    intro:
      "Verbouwen is meer dan muren wegbreken. Het is de kunst om een bestaand huis zo aan te passen dat het voelt alsof het altijd zo bedoeld was — met dezelfde lichtinval, dezelfde verhoudingen, maar met de ruimte die u miste. Wij doen dat binnen én buiten, van één kamer tot een compleet gestripte woning.",
    bullets:
      "Indeling wijzigen: wanden verwijderen, verplaatsen of juist bijplaatsen\nDoorgangen maken met stalen lateien of een constructieve balk\nCompleet strippen en opnieuw opbouwen, inclusief leidingwerk\nKeuken, badkamer en woonkamer in één planning\nBuitenwerk: gevel, voegwerk, kozijnen en dak\nRenovatie van verouderde of verhuurde woningen",
    image: "/images/maps-kamer.jpg",
    faqs: [
      {
        question: "Heb ik een vergunning nodig voor mijn verbouwing?",
        answer:
          "Soms wel. Voor het doorbreken van een dragende muur, een dakkapel of een uitbouw aan de voorkant is meestal een omgevingsvergunning nodig; veel werk binnenshuis mag vergunningsvrij. Wij kijken bij de opname naar wat er speelt en vertellen wat er geregeld moet worden voordat we beginnen.",
      },
      {
        question: "Kan ik in mijn woning blijven wonen tijdens de verbouwing?",
        answer:
          "Vaak wel. We faseren het werk per ruimte en dekken alles zorgvuldig af. Bij een complete renovatie is verhuizen soms praktischer — dat bespreken we eerlijk bij de opname, niet halverwege het traject.",
      },
      {
        question: "Wat gebeurt er als er iets onverwachts opduikt?",
        answer:
          "Dan stoppen we en bellen we u. Verrotte balken, asbest of een leiding die niet op de tekening stond: we leggen uit wat we vinden, wat de oplossing kost en wat het betekent voor de planning. U beslist, wij werken pas daarna verder.",
      },
    ],
  },
  {
    slug: "aanbouw-uitbouw",
    title: "Aanbouw & uitbouw",
    icon: "aanbouw",
    excerpt:
      "Meer ruimte zonder te verhuizen: een uitbouw aan de achterzijde, een aanbouw met plat dak of een serre die het huis laat ademen.",
    intro:
      "Een aanbouw of uitbouw is de meest directe manier om een woning groter te maken zonder de straat uit te hoeven. Van fundering tot dakbedekking en van kozijn tot plint: wij verzorgen het complete traject en stemmen de aansluiting op de bestaande constructie zorgvuldig af.",
    bullets:
      "Uitbouw van keuken, woonkamer of beide\nAanbouw met plat dak of lessenaarsdak\nFundering, metselwerk, kozijnen en dakbedekking\nGrote schuifpui of glazen hoek voor daglicht\nAansluiting op bestaande leidingen en verwarming\nAfbouw: stucwerk, tegelwerk, vloer en schilderwerk",
    // Geen eigen opname van een aanbouw op het profiel. Dit is een gegenereerd
    // sfeerbeeld van een uitbouw met metselwerk en een schuifpui, geen klantwerk.
    image: "/images/sfeerbeeld-aanbouw.jpg",
    faqs: [
      {
        question: "Hoe lang duurt een uitbouw gemiddeld?",
        answer:
          "Voor een standaard uitbouw van zo'n 15 tot 25 m² rekenen we op zes tot tien weken, afhankelijk van de fundering en het weer. In de offerte staat een planning per fase, zodat u weet wanneer de keuken weer bruikbaar is.",
      },
      {
        question: "Moet er een fundering worden aangebracht?",
        answer:
          "Bij bijna elke aanbouw wel. Of dat een strokenfundering, een diepere fundering op palen of een betonplaat wordt, hangt af van de bodem en de belasting. We beoordelen dat bij de opname en zo nodig met een constructeur.",
      },
      {
        question: "Regelen jullie ook de vergunning?",
        answer:
          "We denken mee en leveren de tekeningen en gegevens aan die u nodig heeft. De aanvraag zelf dient u als eigenaar in bij de gemeente; wij begeleiden het proces en houden de planning erop aan.",
      },
    ],
  },
  {
    slug: "vloeren",
    title: "Vloeren",
    icon: "vloeren",
    excerpt:
      "Een vloer bepaalt hoe een ruimte klinkt en loopt. Van egaliseren tot laminaat, PVC of een houten vloer die blijft liggen.",
    intro:
      "Een nieuwe vloer lijkt simpel, tot de ondergrond niet vlak blijkt en de planken na een jaar gaan kraken. Wij beginnen daarom altijd bij de basis: de ondervloer. Pas als die klopt, leggen we de afwerking — en dat verschil voelt u jaren later nog.",
    bullets:
      "Egaliseren en ondervloer voorbereiden\nLaminaat en PVC leggen, inclusief plinten\nHouten vloeren: leggen, schuren en afwerken\nTegelvloeren in natte ruimtes en hal\nVloerverwarming combineren met de nieuwe afwerking\nOude vloer verwijderen en afvoeren",
    image: "/images/perfecthous-vloer.jpg",
    faqs: [
      {
        question: "Kan er een nieuwe vloer over de oude heen?",
        answer:
          "Soms wel, maar niet altijd verstandig. Bij een hoogteverschil van meer dan een paar millimeter of een oudere tegelvloer met losse delen adviseren we eerst egaliseren. Dat kost een dag extra en voorkomt kraken en naden.",
      },
      {
        question: "Is vloerverwarming mogelijk bij een bestaande vloer?",
        answer:
          "Ja, met een infrees- of droogbouwsysteem. Dat is wel een ingreep waarbij de vloerhoogte verandert. We rekenen vooraf door wat dat betekent voor deuren, plinten en de trap.",
      },
    ],
  },
  {
    slug: "tegelwerk",
    title: "Tegelwerk",
    icon: "tegelwerk",
    excerpt:
      "Strak uitgelijnde wanden en vloeren, groot formaat tegels, mozaïek en een waterdichte opbouw waar dat nodig is.",
    intro:
      "Tegelwerk valt niet te verbergen. Een halve millimeter verloop in de voeg zie je terug in de hele wand. Daarom werken we met een laser, een vlakke ondergrond en de tijd om het goed te doen — ook bij groot formaat tegels, waar een oneffenheid meteen opvalt.",
    bullets:
      "Badkamer, toilet, keuken en hal\nGroot formaat tegels en mozaïek\nWaterdichting van natte ruimtes\nVoegen dat tegen vocht en reiniging kan\nTegels op bestaande wand of nieuwe opbouw\nUitsparingen voor sanitair en stopcontacten",
    image: "/images/maps-tegelwand.jpg",
    faqs: [
      {
        question: "Kunnen jullie tegels over bestaande tegels leggen?",
        answer:
          "Dat kan, mits de oude laag goed vastzit en de ruimte het hoogteverschil toelaat. In een badkamer adviseren we meestal toch om te strippen: dan kunnen we de waterdichting opnieuw opbouwen, en dat is precies het deel dat je niet ziet maar wel nodig hebt.",
      },
      {
        question: "Wat kost tegelwerk per vierkante meter?",
        answer:
          "Dat hangt sterk af van het formaat, het patroon en de staat van de ondergrond. Klein formaat en visgraat vragen meer snijwerk dan een grote tegel in rechte banen. In de offerte ziet u de arbeid en het materiaal apart.",
      },
    ],
  },
  {
    slug: "stucwerk",
    title: "Stucwerk",
    icon: "stucwerk",
    excerpt:
      "Wanden en plafonds die strak zijn zonder karakter te verliezen: sausklaar, spack, sierpleister of kalkstuc.",
    intro:
      "Goed stucwerk valt op door wat je niet ziet: geen bobbels in strijklicht, scherpe hoeken, naadloze overgangen. Wij stucen wanden en plafonds sausklaar of met structuur, en denken mee over wat past bij de leeftijd van het huis.",
    bullets:
      "Sausklaar stucwerk op wanden en plafonds\nSpackspuiten voor een egaal oppervlak\nSierpleister en kalkstuc met karakter\nScheuren en beschadigingen herstellen\nStucwerk rond kozijnen, nissen en hoeken\nVoorbereiding voor schilderwerk",
    image: "/images/maps-gang.jpg",
    faqs: [
      {
        question: "Hoe lang moet stucwerk drogen voor het geschilderd wordt?",
        answer:
          "Reken op één tot twee weken, afhankelijk van de dikte en het seizoen. Schilderen op vochtig stucwerk geeft vlekken en hecht niet goed. Wij geven aan wanneer de muur klaar is voor de verf.",
      },
      {
        question: "Kan stucwerk over een behanglaag heen?",
        answer:
          "Nee. Behang moet eraf; anders komt het stucwerk later los. Het verwijderen van behang en lijmresten hoort bij de voorbereiding en staat als aparte post in de offerte.",
      },
    ],
  },
  {
    slug: "badkamer-keuken",
    title: "Badkamer & keuken",
    icon: "badkamer",
    excerpt:
      "Compleet vernieuwde badkamers en keukens, inclusief sloop, leidingwerk, waterdichting, tegelwerk en montage.",
    intro:
      "Een badkamer of keuken renoveren is het samenkomen van bijna alle disciplines: sloop, techniek, waterdichting, tegelwerk, sanitair en afwerking. Omdat wij dat in één bedrijf doen, hoeft u niet tussen partijen te schakelen als er iets niet aansluit.",
    bullets:
      "Complete badkamerrenovatie van sloop tot oplevering\nInbouwsanitair, inloopdouche en vrijstaand bad\nKeuken plaatsen, inclusief aansluitingen en werkblad\nLeidingwerk verleggen en waterdichting aanbrengen\nTegelwerk, stucwerk en schilderwerk in één opdracht\nOude badkamer of keuken demonteren en afvoeren",
    image: "/images/maps-keuken.jpg",
    faqs: [
      {
        question: "Hoe lang duurt een badkamerrenovatie?",
        answer:
          "Bij een complete renovatie rekenen we op twee tot drie weken, waarin de ruimte niet bruikbaar is. Bij een eenvoudiger opfrissing kan het in enkele dagen. In de planning staat per week wat er gebeurt.",
      },
      {
        question: "Kan ik mijn eigen sanitair en tegels aanleveren?",
        answer:
          "Ja. We controleren vooraf of de maten en aansluitingen kloppen, zodat er bij plaatsing geen verrassingen zijn. Levert u zelf aan, dan bouwen we dat in en blijft de garantie op ons werk staan.",
      },
      {
        question: "Is waterdichting echt nodig?",
        answer:
          "Ja, in elke natte ruimte. Zonder goede waterdichting trekt vocht langzaam in de wand en komt het probleem pas jaren later naar boven, vaak bij de buren. Wij brengen die laag altijd aan — dat is geen optie maar onderdeel van het werk.",
      },
    ],
  },
  {
    slug: "timmerwerk",
    title: "Timmerwerk",
    icon: "timmerwerk",
    excerpt:
      "Kozijnen, deuren, kasten op maat, trappen en aftimmerwerk — het detail dat een verbouwing afmaakt.",
    intro:
      "Timmerwerk is het verschil tussen een ruimte die klaar is en een ruimte die af is. Een deur die precies sluit, een plint die naadloos aansluit, een kast die de schuine wand volgt: dat is het werk waar je dagelijks langsloopt.",
    bullets:
      "Binnenkozijnen en deuren plaatsen of vervangen\nPlinten, aftimmerwerk en kozijnbetimmering\nInbouwkasten en maatwerk op lastige maten\nTraprenovatie en trapgaten dichtmaken\nDakkapel- en zolderbetimmering\nHoutrot herstellen en buitenwerk aftimmeren",
    image: "/images/maps-trap.jpg",
    faqs: [
      {
        question: "Maken jullie ook kasten op maat?",
        answer:
          "Ja, van eenvoudige inbouwkasten tot maatwerk onder een schuin dak. We meten in, maken indien nodig een schets en bespreken de indeling voordat er gezaagd wordt.",
      },
      {
        question: "Kunnen bestaande kozijnen blijven zitten?",
        answer:
          "Als het hout gezond is en de kozijnen niet lekken, vaak wel. We beoordelen dat bij de opname. Bij twijfel over houtrot of tocht is vervangen op termijn meestal goedkoper dan blijven repareren.",
      },
    ],
  },
  {
    slug: "loodgieterswerk",
    title: "Loodgieterswerk",
    icon: "loodgieter",
    excerpt:
      "Lekkages, sanitair, kranen, afvoer en cv-installaties. Ook bij spoed, ook in het weekend.",
    intro:
      "Loodgieterswerk is precies werk dat je pas merkt als het misgaat. Een koppeling die niet helemaal dicht is, zie je niet meteen — maar merk je maanden later aan de muur. Wij werken netjes, testen de installatie en zorgen dat het in één keer goed zit.",
    bullets:
      "Lekkages opsporen en verhelpen\nSanitair en kranen plaatsen of vervangen\nVerstoppingen en afvoerproblemen\nCv-ketel vervangen en radiatoren aansluiten\nLeidingwerk verleggen bij verbouwing\nSpoedservice bij wateroverlast",
    // Geen eigen opname van sanitair werk op het profiel; gegenereerd sfeerbeeld
    // van nieuw sanitair (inloopdouche, wandcloset, wastafel met messing kraan).
    image: "/images/sfeerbeeld-sanitair.jpg",
    faqs: [
      {
        question: "Komen jullie ook bij spoed in het weekend?",
        answer:
          "Bij acute lekkage of wateroverlast proberen we ook 's avonds en in het weekend te helpen. Bel de spoedlijn; aan de telefoon hoort u direct of en wanneer we kunnen komen. Sluit intussen de hoofdkraan als dat kan.",
      },
      {
        question: "Wat kost een loodgieter per uur?",
        answer:
          "Voor de meeste klussen werken we met een vaste prijs, zodat u niet hoeft te raden naar de eindafrekening. Bij kleine reparaties kan een uurtarief gelden; dat hoort u vooraf, inclusief voorrijkosten.",
      },
    ],
  },
  {
    slug: "elektrisch-werk",
    title: "Elektrisch werk",
    icon: "elektra",
    excerpt:
      "Stopcontacten, schakelaars, verlichting en groepen: elektra die veilig is aangelegd en netjes is weggewerkt.",
    intro:
      "Elektra valt pas op als het niet klopt: een groep die uitslaat, een stopcontact op de verkeerde plek of een schakelaar achter de kast. Omdat wij bij een verbouwing de muren toch open hebben, leggen we de installatie in één keer goed aan — vóór het stucwerk dichtgaat, met voldoende groepen en een nette groepenkast.",
    bullets:
      "Stopcontacten, schakelaars en dimmers plaatsen of verplaatsen\nGroepen bijplaatsen en de groepenkast uitbreiden\nVerlichting, inbouwspots en led-strips aansluiten\nLeidingen trekken bij een verbouwing, vóór het stucwerk\nBuitenverlichting, schuur en berging aansluiten\nStoringen opsporen: een aardlekschakelaar of groep die uitslaat",
    image: "/images/perfecthous-plafond.jpg",
    faqs: [
      {
        question: "Moet de stroom eraf tijdens het werk?",
        answer:
          "Voor vrijwel alle werkzaamheden wel, en dat regelen we zelf: de groep uitschakelen, spanning controleren en pas daarna beginnen. Aan het eind van de dag zorgen we dat u weer stroom heeft op de groepen die u nodig heeft — de koelkast en de cv-ketel blijven waar het kan gewoon werken.",
      },
      {
        question: "Kunnen jullie extra stopcontacten plaatsen zonder de muur open te breken?",
        answer:
          "Soms wel. Zit er al een inbouwdoos of leiding in de buurt, dan kunnen we vaak door de bestaande buis verder. Is er niets, dan is frezen in de muur de nette oplossing — dat gebeurt bij voorkeur vóór het stucwerk, niet erna.",
      },
      {
        question: "Wat kost elektrisch werk?",
        answer:
          "Dat hangt af van het aantal punten, de afstand tot de groepenkast en of de muren nog open zijn. In de offerte staat per post wat er gebeurt en wat het materiaal kost, zodat u zelf kunt bepalen waar u begint.",
      },
    ],
  },
  {
    slug: "overige-klussen",
    title: "Overige klussen",
    icon: "klussen",
    excerpt:
      "Het lijstje dat al jaren op de koelkast hangt: een deur die klemt, een scheur, een gat in de muur, een schutting.",
    intro:
      "Niet elke klus is een verbouwing. Soms is het een dag werk dat al twee jaar uitgesteld wordt. Wij pakken ook kleine opdrachten aan — en zijn eerlijk als een klus te klein is om er goed voor te rijden.",
    bullets:
      "Reparaties aan deuren, kozijnen en trappen\nGaten en scheuren in muren wegwerken\nSchuttingen, bergingen en buitenwerk\nMontage van meubels en bevestigingen\nSchilderwerk binnen en buiten\nKleine installatie- en reparatieklussen",
    image: "/images/maps-deur.jpg",
    faqs: [
      {
        question: "Is er een minimale omvang voor een opdracht?",
        answer:
          "We werken graag ook aan kleine klussen, maar voorrijkosten en materiaalwegen moeten wel in verhouding staan. Daarom bundelen we kleine klussen vaak tot één bezoek in dezelfde buurt.",
      },
      {
        question: "Kunnen jullie ook schilderwerk doen?",
        answer:
          "Ja, binnen en buiten: kozijnen, deuren, muren en plafonds. We stemmen het schilderwerk af op het stucwerk, zodat u niet met twee partijen hoeft te overleggen over de volgorde.",
      },
    ],
  },
];
