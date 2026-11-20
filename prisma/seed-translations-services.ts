/**
 * Engelse en Arabische vertalingen van de diensten. `faqs` staat op dezelfde
 * volgorde als de Nederlandse FAQ's in seed-services.ts.
 */

type Faq = { question: string; answer: string };

export type ServiceTranslation = {
  title: string;
  excerpt: string;
  intro: string;
  bullets: string[];
  faqs: Faq[];
};

export const serviceTranslations: Record<
  string,
  { en: ServiceTranslation; ar: ServiceTranslation }
> = {
  "verbouwing-renovatie": {
    en: {
      title: "Renovation & remodelling",
      excerpt:
        "A home that no longer fits the way you live: new layouts, new openings, stripped back and rebuilt.",
      intro:
        "Renovating is more than knocking down walls. The craft is adapting an existing house so it feels as if it was always meant to be this way — the same daylight, the same proportions, but the space you were missing. We do that inside and out, from one room to a completely stripped home.",
      bullets: [
        "Changing the layout: removing, moving or adding walls",
        "Creating openings with steel lintels or a structural beam",
        "Full strip-out and rebuild, including pipework",
        "Kitchen, bathroom and living room in one schedule",
        "Exterior work: facade, pointing, frames and roof",
        "Renovation of older or rented properties",
      ],
      faqs: [
        {
          question: "Do I need a permit for my renovation?",
          answer:
            "Sometimes. Breaking through a load-bearing wall, a dormer or a front extension usually needs an environmental permit; much indoor work is permit-free. During the survey we check what applies and tell you what must be arranged before we start.",
        },
        {
          question: "Can I stay in my home during the renovation?",
          answer:
            "Often yes. We phase the work room by room and cover everything carefully. For a full renovation, moving out is sometimes more practical — we say so honestly at the survey, not halfway through.",
        },
        {
          question: "What happens if something unexpected turns up?",
          answer:
            "We stop and call you. Rotten beams, asbestos or a pipe that was not on the drawing: we explain what we found, what the solution costs and what it means for the schedule. You decide, and only then do we continue.",
        },
      ],
    },
    ar: {
      title: "التجديد والترميم",
      excerpt:
        "منزل لم يعد يناسب طريقة حياتك: تقسيم جديد وفتحات جديدة وهدم كامل ثم إعادة بناء.",
      intro:
        "التجديد أكثر من هدم الجدران. الحرفة هي تعديل منزل قائم ليشعرك أنه كان هكذا دائمًا — بنفس الإضاءة والنسب، لكن بالمساحة التي كانت ناقصة. نقوم بذلك داخله وخارجه، من غرفة واحدة إلى منزل كامل.",
      bullets: [
        "تغيير التقسيم: إزالة الجدران أو نقلها أو إضافتها",
        "عمل فتحات بعوارض فولاذية أو جسر إنشائي",
        "هدم كامل وإعادة بناء، بما في ذلك الأنابيب",
        "المطبخ والحمام وغرفة المعيشة في جدول واحد",
        "الأعمال الخارجية: الواجهة والفواصل والإطارات والسقف",
        "تجديد المنازل القديمة أو المؤجَّرة",
      ],
      faqs: [
        {
          question: "هل أحتاج تصريحًا لأعمال التجديد؟",
          answer:
            "أحيانًا. فتح جدار حامل أو نافذة سطح أو توسعة أمامية يحتاج عادةً إلى تصريح بيئي، وكثير من الأعمال الداخلية لا يحتاج تصريحًا. نتحقق عند المعاينة ونخبرك بما يجب ترتيبه قبل البدء.",
        },
        {
          question: "هل يمكنني البقاء في المنزل أثناء التجديد؟",
          answer:
            "غالبًا نعم. ننفّذ العمل غرفة بغرفة ونغطي كل شيء بعناية. في التجديد الكامل يكون الانتقال أحيانًا أعمليًا، ونقول ذلك عند المعاينة لا في منتصف الطريق.",
        },
        {
          question: "ماذا يحدث إذا ظهر شيء غير متوقع؟",
          answer:
            "نتوقف ونتصل بك. عوارض تالفة أو أسبست أو أنبوب غير موجود في المخطط: نشرح ما وجدناه وتكلفة الحل وأثره على الجدول. أنت تقرر، وبعدها نكمل.",
        },
      ],
    },
  },

  "aanbouw-uitbouw": {
    en: {
      title: "Extensions & additions",
      excerpt:
        "More space without moving: a rear extension, a flat-roofed addition or a garden room that lets the house breathe.",
      intro:
        "An extension is the most direct way to make a home bigger without leaving the street. From foundation to roof covering and from frame to skirting: we handle the whole process and carefully align the new structure with the existing one.",
      bullets: [
        "Extension of the kitchen, living room or both",
        "Flat roof or mono-pitch roof",
        "Foundation, masonry, frames and roofing",
        "Large sliding doors or a glazed corner for daylight",
        "Connection to existing pipes and heating",
        "Finishing: plaster, tiling, floor and paintwork",
      ],
      faqs: [
        {
          question: "How long does an extension take on average?",
          answer:
            "For a standard extension of about 15 to 25 m² we allow six to ten weeks, depending on the foundation and the weather. The quote includes a schedule per phase, so you know when the kitchen is usable again.",
        },
        {
          question: "Does an extension always need a foundation?",
          answer:
            "For almost every extension, yes. Whether that is a strip foundation, a deeper pile foundation or a concrete slab depends on the soil and the load. We assess that during the survey, with a structural engineer if needed.",
        },
        {
          question: "Do you arrange the permit too?",
          answer:
            "We advise and supply the drawings and data you need. As the owner you submit the application to the municipality; we guide the process and keep the schedule on track.",
        },
      ],
    },
    ar: {
      title: "التوسعة والملاحق",
      excerpt:
        "مساحة أكبر دون انتقال: توسعة خلفية أو ملحق بسقف مسطح أو غرفة حديقة تمنح المنزل مزيدًا من التنفس.",
      intro:
        "التوسعة هي الطريقة الأكثر مباشرة لتكبير المنزل دون مغادرة الحي. من الأساس حتى غطاء السقف ومن الإطار حتى الوزرة: نتولى المسار كاملًا وننسّق الاتصال بالبناء القائم بعناية.",
      bullets: [
        "توسعة المطبخ أو غرفة المعيشة أو كليهما",
        "ملحق بسقف مسطح أو سقف أحادي الميل",
        "الأساس والبناء والإطارات وغطاء السقف",
        "أبواب منزلقة كبيرة أو زاوية زجاجية للإضاءة",
        "الاتصال بالأنابيب والتدفئة القائمة",
        "التشطيب: الجبس والبلاط والأرضية والدهان",
      ],
      faqs: [
        {
          question: "كم تستغرق التوسعة عادةً؟",
          answer:
            "لتوسعة قياسية بين 15 و25 مترًا مربعًا نحسب من ستة إلى عشرة أسابيع، حسب الأساس والطقس. يتضمن عرض السعر جدولًا لكل مرحلة لتعرف متى يعود المطبخ للعمل.",
        },
        {
          question: "هل تحتاج التوسعة إلى أساس دائمًا؟",
          answer:
            "في معظم الحالات نعم. كون الأساس شريطيًا أو أعمق على ركائز أو بلاطة خرسانية يعتمد على التربة والحمل. نقيّم ذلك عند المعاينة، وبمشاركة مهندس إنشائي عند الحاجة.",
        },
        {
          question: "هل ترتّبون التصريح أيضًا؟",
          answer:
            "نساعد بالمشورة ونوفّر المخططات والبيانات اللازمة. أما تقديم الطلب فيقوم به المالك لدى البلدية، ونحن نتابع المسار ونحافظ على الجدول.",
        },
      ],
    },
  },

  vloeren: {
    en: {
      title: "Floors",
      excerpt:
        "A floor determines how a room sounds and feels. From levelling to laminate, vinyl or a wooden floor that stays put.",
      intro:
        "A new floor looks simple until the base turns out not to be flat and the boards start creaking after a year. That is why we always start with the base: the subfloor. Only when that is right do we lay the finish — and you feel that difference years later.",
      bullets: [
        "Levelling and preparing the subfloor",
        "Laying laminate and vinyl, including skirting",
        "Wooden floors: laying, sanding and finishing",
        "Tiled floors in wet rooms and hallways",
        "Combining underfloor heating with the new finish",
        "Removing and disposing of the old floor",
      ],
      faqs: [
        {
          question: "Can a new floor go over the old one?",
          answer:
            "Sometimes, but not always wise. With a height difference of more than a few millimetres, or an older tiled floor with loose parts, we advise levelling first. It costs an extra day and prevents creaking and gaps.",
        },
        {
          question: "Is underfloor heating possible with an existing floor?",
          answer:
            "Yes, with a milled or dry-build system. It does change the floor height, so we calculate beforehand what that means for doors, skirting and the stairs.",
        },
      ],
    },
    ar: {
      title: "الأرضيات",
      excerpt:
        "الأرضية تحدد صوت الغرفة وإحساس المشي عليها. من التسوية إلى اللامينيت أو الفينيل أو أرضية خشبية تبقى ثابتة.",
      intro:
        "الأرضية الجديدة تبدو بسيطة حتى تظهر الأرضية غير مستوية وتبدأ الألواح بالصرير بعد سنة. لذلك نبدأ دائمًا من القاعدة: الأرضية السفلية. وعندما تصحّ نضع التشطيب — وهذا الفرق تحسّه بعد سنوات.",
      bullets: [
        "تسوية الأرضية السفلية وتحضيرها",
        "تركيب اللامينيت والفينيل مع الوزرات",
        "الأرضيات الخشبية: التركيب والصنفرة والتشطيب",
        "أرضيات البلاط في الغرف الرطبة والمدخل",
        "دمج التدفئة الأرضية مع التشطيب الجديد",
        "إزالة الأرضية القديمة والتخلص منها",
      ],
      faqs: [
        {
          question: "هل يمكن تركيب أرضية جديدة فوق القديمة؟",
          answer:
            "أحيانًا، لكنه ليس حكيمًا دائمًا. عند فرق ارتفاع يزيد على بضعة مليمترات أو أرضية بلاط قديمة بأجزاء مفكوكة ننصح بالتسوية أولًا. تكلّف يومًا إضافيًا وتمنع الصرير والفواصل.",
        },
        {
          question: "هل التدفئة الأرضية ممكنة مع أرضية قائمة؟",
          answer:
            "نعم، بنظام حفر أو بناء جاف. لكن ذلك يغيّر ارتفاع الأرضية، لذلك نحسب مسبقًا تأثيره على الأبواب والوزرات والدرج.",
        },
      ],
    },
  },

  tegelwerk: {
    en: {
      title: "Tiling",
      excerpt:
        "Precisely aligned walls and floors, large-format tiles, mosaic and a waterproof build-up where it matters.",
      intro:
        "Tiling cannot be hidden. Half a millimetre of drift in the joints shows across the whole wall. That is why we work with a laser, a flat base and the time to do it properly — including large-format tiles, where any unevenness is immediately visible.",
      bullets: [
        "Bathroom, toilet, kitchen and hallway",
        "Large-format tiles and mosaic",
        "Waterproofing of wet rooms",
        "Grout that resists moisture and cleaning",
        "Tiles on an existing wall or a new build-up",
        "Cut-outs for sanitary ware and sockets",
      ],
      faqs: [
        {
          question: "Can you tile over existing tiles?",
          answer:
            "It is possible if the old layer is firmly attached and the height allows it. In a bathroom we usually advise stripping anyway: then we can rebuild the waterproofing — the part you do not see but do need.",
        },
        {
          question: "What does tiling cost per square metre?",
          answer:
            "That depends heavily on the size, the pattern and the condition of the base. Small formats and herringbone need more cutting than a large tile in straight lines. The quote shows labour and materials separately.",
        },
      ],
    },
    ar: {
      title: "أعمال البلاط",
      excerpt:
        "جدران وأرضيات مصطفة بدقة، وبلاط كبير القياس، وفسيفساء، وطبقة عازلة للماء حيث يلزم.",
      intro:
        "أعمال البلاط لا يمكن إخفاؤها. نصف مليمتر من الانحراف في الفواصل يظهر على الجدار كله. لذلك نعمل بالليزر وعلى قاعدة مستوية ومع الوقت الكافي للإتقان — حتى مع البلاط كبير القياس الذي يُظهر أي نتوء فورًا.",
      bullets: [
        "الحمام والمرحاض والمطبخ والمدخل",
        "بلاط كبير القياس وفسيفساء",
        "العزل المائي للغرف الرطبة",
        "فواصل تقاوم الرطوبة والتنظيف",
        "البلاط على جدار قائم أو بناء جديد",
        "فتحات للتركيبات الصحية والمقابس",
      ],
      faqs: [
        {
          question: "هل يمكن تركيب البلاط فوق بلاط قائم؟",
          answer:
            "ممكن إذا كانت الطبقة القديمة ثابتة والارتفاع يسمح. في الحمام ننصح عادةً بالإزالة: عندها نعيد بناء العزل المائي، وهو الجزء الذي لا تراه لكنك تحتاجه.",
        },
        {
          question: "كم تبلغ تكلفة البلاط للمتر المربع؟",
          answer:
            "يعتمد كثيرًا على القياس والنمط وحالة القاعدة. القياسات الصغيرة ونمط عظم السمكة تحتاج قصًا أكثر من بلاطة كبيرة بخطوط مستقيمة. يوضح عرض السعر العمالة والمواد بشكل منفصل.",
        },
      ],
    },
  },

  stucwerk: {
    en: {
      title: "Plastering",
      excerpt:
        "Walls and ceilings that are smooth without losing character: paint-ready, sprayed, decorative plaster or lime plaster.",
      intro:
        "Good plasterwork stands out by what you do not see: no bumps in raking light, sharp corners, seamless transitions. We plaster walls and ceilings paint-ready or with texture, and advise on what suits the age of the house.",
      bullets: [
        "Paint-ready plaster on walls and ceilings",
        "Spray plaster for an even surface",
        "Decorative plaster and lime plaster with character",
        "Repairing cracks and damage",
        "Plaster around frames, niches and corners",
        "Preparation for paintwork",
      ],
      faqs: [
        {
          question: "How long must plaster dry before painting?",
          answer:
            "Allow one to two weeks, depending on thickness and season. Painting damp plaster causes stains and poor adhesion. We tell you when the wall is ready for paint.",
        },
        {
          question: "Can plaster go over wallpaper?",
          answer:
            "No. Wallpaper has to come off, otherwise the plaster will loosen later. Removing wallpaper and glue residue is part of the preparation and appears as a separate item in the quote.",
        },
      ],
    },
    ar: {
      title: "أعمال الجبس",
      excerpt:
        "جدران وأسقف ناعمة دون أن تفقد طابعها: جاهزة للدهان أو مرشوشة أو جبس زخرفي أو جيري.",
      intro:
        "الجبس الجيد يُعرف بما لا تراه: لا نتوءات في الضوء الجانبي، وزوايا حادة، وانتقالات بلا فواصل. نجبّس الجدران والأسقف جاهزة للدهان أو بملمس، وننصح بما يناسب عمر المنزل.",
      bullets: [
        "جبس جاهز للدهان على الجدران والأسقف",
        "جبس مرشوش لسطح متجانس",
        "جبس زخرفي وجيري بطابع مميز",
        "إصلاح الشقوق والأضرار",
        "الجبس حول الإطارات والتجاويف والزوايا",
        "التحضير لأعمال الدهان",
      ],
      faqs: [
        {
          question: "كم يحتاج الجبس ليجف قبل الدهان؟",
          answer:
            "من أسبوع إلى أسبوعين، حسب السماكة والموسم. الدهان على جبس رطب يسبّب بقعًا وضعف التصاق. نخبرك متى يصبح الجدار جاهزًا للدهان.",
        },
        {
          question: "هل يمكن التجبيب فوق ورق الجدران؟",
          answer:
            "لا. يجب إزالة ورق الجدران، وإلا انفصل الجبس لاحقًا. إزالة الورق وبقايا الغراء جزء من التحضير وتظهر كبند منفصل في عرض السعر.",
        },
      ],
    },
  },

  "badkamer-keuken": {
    en: {
      title: "Bathroom & kitchen",
      excerpt:
        "Completely renewed bathrooms and kitchens, including demolition, pipework, waterproofing, tiling and installation.",
      intro:
        "Renovating a bathroom or kitchen brings almost every discipline together: demolition, services, waterproofing, tiling, sanitary ware and finishing. Because we do all of it in one company, you do not have to coordinate between parties when something does not line up.",
      bullets: [
        "Full bathroom renovation from strip-out to handover",
        "Concealed sanitary ware, walk-in shower and freestanding bath",
        "Fitting a kitchen, including connections and worktop",
        "Moving pipework and applying waterproofing",
        "Tiling, plastering and painting in one assignment",
        "Removing and disposing of the old bathroom or kitchen",
      ],
      faqs: [
        {
          question: "How long does a bathroom renovation take?",
          answer:
            "For a complete renovation we allow two to three weeks, during which the room is unusable. A simpler refresh can take a few days. The schedule shows what happens each week.",
        },
        {
          question: "Can I supply my own sanitary ware and tiles?",
          answer:
            "Yes. We check beforehand that sizes and connections match, so there are no surprises at installation. If you supply, we fit it and our warranty on our work still stands.",
        },
        {
          question: "Is waterproofing really necessary?",
          answer:
            "Yes, in every wet room. Without proper waterproofing, moisture slowly enters the wall and the problem surfaces years later, often at the neighbours. We always apply that layer — it is not an option but part of the job.",
        },
      ],
    },
    ar: {
      title: "الحمام والمطبخ",
      excerpt:
        "حمامات ومطابخ مجددة بالكامل، بما في ذلك الهدم والأنابيب والعزل المائي والبلاط والتركيب.",
      intro:
        "تجديد الحمام أو المطبخ يجمع كل التخصصات تقريبًا: الهدم والخدمات والعزل المائي والبلاط والتركيبات الصحية والتشطيب. ولأننا نقوم بكل ذلك في شركة واحدة، لا تحتاج إلى التنسيق بين أطراف مختلفة عند أي اختلاف.",
      bullets: [
        "تجديد حمام كامل من الهدم حتى التسليم",
        "تركيبات صحية مدمجة ودش مفتوح وحوض مستقل",
        "تركيب المطبخ مع التوصيلات وسطح العمل",
        "نقل الأنابيب وتطبيق العزل المائي",
        "البلاط والجبس والدهان في طلب واحد",
        "فك الحمام أو المطبخ القديم والتخلص منه",
      ],
      faqs: [
        {
          question: "كم يستغرق تجديد الحمام؟",
          answer:
            "للتجديد الكامل نحسب من أسبوعين إلى ثلاثة، تكون الغرفة خلالها غير قابلة للاستخدام. التجديد البسيط قد يستغرق أيامًا قليلة. يوضح الجدول ما يحدث في كل أسبوع.",
        },
        {
          question: "هل يمكنني توفير التركيبات الصحية والبلاط بنفسي؟",
          answer:
            "نعم. نتحقق مسبقًا من تطابق المقاسات والتوصيلات لتجنب المفاجآت عند التركيب. إذا وفّرت المواد، نركّبها ويبقى ضماننا على عملنا.",
        },
        {
          question: "هل العزل المائي ضروري فعلًا؟",
          answer:
            "نعم، في كل غرفة رطبة. بدون عزل جيد تتسرب الرطوبة ببطء إلى الجدار وتظهر المشكلة بعد سنوات، غالبًا عند الجيران. نطبّق هذه الطبقة دائمًا، فهي ليست خيارًا بل جزء من العمل.",
        },
      ],
    },
  },

  timmerwerk: {
    en: {
      title: "Carpentry",
      excerpt:
        "Frames, doors, bespoke cupboards, stairs and finishing trim — the detail that completes a renovation.",
      intro:
        "Carpentry is the difference between a room that is done and a room that is finished. A door that closes exactly, a skirting that meets seamlessly, a cupboard that follows the sloped wall: that is the work you walk past every day.",
      bullets: [
        "Fitting or replacing internal frames and doors",
        "Skirting, trim and frame casing",
        "Built-in cupboards and bespoke work for awkward sizes",
        "Stair renovation and closing stair openings",
        "Dormer and attic carpentry",
        "Repairing rot and finishing exterior woodwork",
      ],
      faqs: [
        {
          question: "Do you also make bespoke cupboards?",
          answer:
            "Yes, from simple built-in cupboards to bespoke work under a sloped roof. We measure, make a sketch if needed and discuss the layout before anything is cut.",
        },
        {
          question: "Can existing frames stay in place?",
          answer:
            "If the wood is sound and the frames do not leak, often yes. We assess that during the survey. When there is doubt about rot or draughts, replacing usually works out cheaper in the long run.",
        },
      ],
    },
    ar: {
      title: "أعمال النجارة",
      excerpt:
        "إطارات وأبواب وخزائن حسب المقاس وسلالم وتشطيبات خشبية — التفصيل الذي يكمل التجديد.",
      intro:
        "النجارة هي الفرق بين غرفة انتهى العمل فيها وغرفة مكتملة. باب يُغلق بدقة، ووزرة تتصل بلا فاصل، وخزانة تتبع الجدار المائل: هذا هو العمل الذي تمرّ به كل يوم.",
      bullets: [
        "تركيب أو استبدال الإطارات والأبواب الداخلية",
        "الوزرات والتشطيبات وتغليف الإطارات",
        "خزائن مدمجة وأعمال حسب المقاس للأبعاد الصعبة",
        "تجديد السلالم وإغلاق فتحات الدرج",
        "نجارة نوافذ السطح والعلّية",
        "إصلاح الخشب التالف وتشطيب الأعمال الخارجية",
      ],
      faqs: [
        {
          question: "هل تصنعون خزائن حسب المقاس؟",
          answer:
            "نعم، من الخزائن المدمجة البسيطة إلى الأعمال الخاصة تحت سقف مائل. نقيس ونرسم عند الحاجة ونناقش التقسيم قبل القص.",
        },
        {
          question: "هل يمكن إبقاء الإطارات القائمة؟",
          answer:
            "إذا كان الخشب سليمًا والإطارات لا تسرّب، فغالبًا نعم. نقيّم ذلك عند المعاينة. وعند الشك في التلف أو التسريب يكون الاستبدال على المدى الطويل أرخص من الإصلاح المتكرر.",
        },
      ],
    },
  },

  loodgieterswerk: {
    en: {
      title: "Plumbing",
      excerpt:
        "Leaks, sanitary ware, taps, drainage and heating systems. Also for emergencies, also at weekends.",
      intro:
        "Plumbing is the kind of work you only notice when it goes wrong. A coupling that is not quite tight is invisible at first — and shows up on the wall months later. We work neatly, test the installation and make sure it is right the first time.",
      bullets: [
        "Tracing and fixing leaks",
        "Fitting or replacing sanitary ware and taps",
        "Blockages and drainage problems",
        "Replacing boilers and connecting radiators",
        "Moving pipework during a renovation",
        "Emergency service for water damage",
      ],
      faqs: [
        {
          question: "Do you come out at weekends for emergencies?",
          answer:
            "For acute leaks or water damage we try to help in the evening and at weekends too. Call the emergency line; on the phone you hear straight away whether and when we can come. Close the main valve in the meantime if you can.",
        },
        {
          question: "What does a plumber cost per hour?",
          answer:
            "For most jobs we work with a fixed price, so you do not have to guess the final bill. Small repairs may be charged at an hourly rate; you hear that beforehand, including call-out costs.",
        },
      ],
    },
    ar: {
      title: "السباكة",
      excerpt: "تسريبات وتركيبات صحية وصنابير وصرف وأنظمة تدفئة. حتى في الحالات الطارئة وعطلة نهاية الأسبوع.",
      intro:
        "السباكة عمل لا تلاحظه إلا عندما يخطئ. وصلة غير محكمة تمامًا لا تُرى في البداية، لكنها تظهر على الجدار بعد أشهر. نعمل بنظافة ونختبر التركيب ونتأكد أنه صحيح من المرة الأولى.",
      bullets: [
        "تحديد التسريبات وإصلاحها",
        "تركيب أو استبدال التركيبات الصحية والصنابير",
        "الانسدادات ومشاكل الصرف",
        "استبدال المرجل وتوصيل المشعّات",
        "نقل الأنابيب أثناء التجديد",
        "خدمة طارئة لتسرب المياه",
      ],
      faqs: [
        {
          question: "هل تأتون في عطلة نهاية الأسبوع للحالات الطارئة؟",
          answer:
            "في التسريبات الحادة أو أضرار المياه نحاول المساعدة مساءً وفي عطلة نهاية الأسبوع أيضًا. اتصل بخط الطوارئ وستعرف مباشرة إن كان بإمكاننا القدوم ومتى. أغلق الصنبور الرئيسي مؤقتًا إن أمكن.",
        },
        {
          question: "كم تكلفة السباك بالساعة؟",
          answer:
            "لمعظم الأعمال نعمل بسعر ثابت حتى لا تضطر لتخمين الفاتورة النهائية. الإصلاحات الصغيرة قد تُحسب بالساعة، وتُبلّغ بذلك مسبقًا بما في ذلك تكلفة الحضور.",
        },
      ],
    },
  },

  "elektrisch-werk": {
    en: {
      title: "Electrical work",
      excerpt:
        "Sockets, switches, lighting and circuits: electrics installed safely and finished neatly.",
      intro:
        "Electrics only get noticed when something is wrong: a circuit that trips, a socket in the wrong place or a switch behind a cupboard. Because the walls are open during a renovation anyway, we install everything properly in one go — before the plaster closes, with enough circuits and a tidy consumer unit.",
      bullets: [
        "Fitting or moving sockets, switches and dimmers",
        "Adding circuits and extending the consumer unit",
        "Connecting lighting, recessed spots and LED strips",
        "Running cables during a renovation, before plastering",
        "Outdoor lighting, shed and storage connections",
        "Fault finding: a tripping earth leakage switch or circuit",
      ],
      faqs: [
        {
          question: "Does the power have to go off during the work?",
          answer:
            "For almost all work, yes, and we handle it ourselves: switch off the circuit, test for voltage, then start. At the end of the day we make sure you have power on the circuits you need — the fridge and boiler keep running wherever possible.",
        },
        {
          question: "Can you add sockets without breaking open the wall?",
          answer:
            "Sometimes. If there is a back box or conduit nearby, we can often continue through the existing pipe. If there is nothing, chasing the wall is the neat solution — preferably before plastering, not after.",
        },
        {
          question: "What does electrical work cost?",
          answer:
            "That depends on the number of points, the distance to the consumer unit and whether the walls are still open. The quote lists what happens and what the materials cost, so you can decide where to start.",
        },
      ],
    },
    ar: {
      title: "الأعمال الكهربائية",
      excerpt:
        "مقابس ومفاتيح وإضاءة ودوائر: كهرباء مركّبة بأمان ومنجزة بنظافة.",
      intro:
        "الكهرباء لا تُلاحظ إلا عندما يحدث خطأ: دائرة تفصل، أو مقبس في مكان خاطئ، أو مفتاح خلف خزانة. ولأن الجدران مفتوحة أثناء التجديد، ننفّذ التركيب بشكل صحيح من مرة واحدة — قبل إغلاق الجبس، بدوائر كافية ولوحة توزيع منظمة.",
      bullets: [
        "تركيب أو نقل المقابس والمفاتيح ووحدات التعتيم",
        "إضافة دوائر وتوسيع لوحة التوزيع",
        "توصيل الإضاءة والسبوتات المدمجة وشرائط LED",
        "تمديد الأسلاك أثناء التجديد قبل الجبس",
        "إضاءة خارجية وتوصيل السقيفة والمخزن",
        "تحديد الأعطال: قاطع التسرب الأرضي أو دائرة تفصل",
      ],
      faqs: [
        {
          question: "هل يجب قطع الكهرباء أثناء العمل؟",
          answer:
            "في معظم الأعمال نعم، ونتولى ذلك بأنفسنا: نفصل الدائرة ونتحقق من انعدام الجهد ثم نبدأ. في نهاية اليوم نحرص على عودة الكهرباء للدوائر التي تحتاجها، وتستمر الثلاجة والمرجل بالعمل حيث أمكن.",
        },
        {
          question: "هل يمكن إضافة مقابس دون تكسير الجدار؟",
          answer:
            "أحيانًا. إذا وُجد صندوق أو أنبوب قريب يمكننا غالبًا المتابعة عبر الأنبوب القائم. وإن لم يوجد شيء، فحفر الجدار هو الحل الأنيق، ويفضل قبل الجبس لا بعده.",
        },
        {
          question: "كم تكلفة الأعمال الكهربائية؟",
          answer:
            "يعتمد على عدد النقاط والمسافة إلى لوحة التوزيع وهل الجدران ما زالت مفتوحة. يوضح عرض السعر ما سيُنفّذ وتكلفة المواد لتقرر من أين تبدأ.",
        },
      ],
    },
  },

  "overige-klussen": {
    en: {
      title: "Other jobs",
      excerpt:
        "The list that has been on the fridge for years: a sticking door, a crack, a hole in the wall, a fence.",
      intro:
        "Not every job is a renovation. Sometimes it is a day's work that has been postponed for two years. We take on small assignments too — and are honest when a job is too small to drive out for.",
      bullets: [
        "Repairs to doors, frames and stairs",
        "Filling holes and cracks in walls",
        "Fences, sheds and outdoor work",
        "Fitting furniture and fixings",
        "Painting inside and out",
        "Small installation and repair jobs",
      ],
      faqs: [
        {
          question: "Is there a minimum job size?",
          answer:
            "We are happy to take on small jobs, but call-out costs and materials have to be proportionate. That is why we often combine small jobs into one visit in the same neighbourhood.",
        },
        {
          question: "Do you also do painting?",
          answer:
            "Yes, inside and out: frames, doors, walls and ceilings. We align the painting with the plastering, so you do not have to coordinate the order with two parties.",
        },
      ],
    },
    ar: {
      title: "أعمال أخرى",
      excerpt:
        "القائمة التي بقيت على باب الثلاجة لسنوات: باب يحتك، أو شق، أو ثقب في الجدار، أو سياج.",
      intro:
        "ليست كل مهمة تجديدًا. أحيانًا يوم عمل واحد تأجّل لسنتين. نتولى المهام الصغيرة أيضًا، ونكون صريحين إن كانت المهمة أصغر من أن تستحق التنقل.",
      bullets: [
        "إصلاحات الأبواب والإطارات والسلالم",
        "معالجة الثقوب والشقوق في الجدران",
        "الأسوار والسقائف والأعمال الخارجية",
        "تركيب الأثاث والتثبيتات",
        "الدهان داخلًا وخارجًا",
        "أعمال تركيب وإصلاح صغيرة",
      ],
      faqs: [
        {
          question: "هل هناك حد أدنى لحجم العمل؟",
          answer:
            "نحب الأعمال الصغيرة، لكن تكلفة الحضور والمواد يجب أن تكون متناسبة. لذلك نجمع غالبًا الأعمال الصغيرة في زيارة واحدة داخل الحي نفسه.",
        },
        {
          question: "هل تقومون بأعمال الدهان أيضًا؟",
          answer:
            "نعم، داخلًا وخارجًا: الإطارات والأبواب والجدران والأسقف. ننسّق الدهان مع الجبس حتى لا تحتاج للتنسيق بين طرفين حول الترتيب.",
        },
      ],
    },
  },
};
