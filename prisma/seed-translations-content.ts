/**
 * Vertalingen van de voorbeeldprojecten, reviews en blogartikelen.
 * De artikelen zijn volledig vertaald; alleen de juridische pagina's blijven
 * Nederlandstalig (zie app/[locale]/*verklaring*).
 */

export const projectTranslations: Record<
  string,
  {
    en: { title: string; category: string; summary: string; description: string };
    ar: { title: string; category: string; summary: string; description: string };
  }
> = {
  "interieur-afbouw-vlissingen": {
    en: {
      title: "Ceiling, wall and floor in one project",
      category: "Renovation & remodelling",
      summary:
        "A ceiling with LED lighting, a clean wall with TV and fireplace, and a new oak floor — finished in one assignment.",
      description:
        "The ground floor of this home was tackled in one go. The ceiling was fitted with LED light lines and a recessed light panel, so the lighting sits in the surface itself and the wiring disappears from view. A clean build-up for the television was made against the wall, with a fireplace below. Finally the floor was laid: oak boards in a calm, straight run, with skirting in the same tone as the walls. Because ceiling, wall and floor were done by the same team, the details meet up and there was no waiting between parties.",
    },
    ar: {
      title: "السقف والجدار والأرضية في مشروع واحد",
      category: "التجديد والترميم",
      summary:
        "سقف بإضاءة LED، وجدار أنيق مع تلفاز ومدفأة، وأرضية بلوط جديدة — أُنجزت في طلب واحد.",
      description:
        "جُدّد الطابق الأرضي في هذا المنزل دفعة واحدة. زُوّد السقف بخطوط إضاءة LED ولوح إضاءة مدمج، فتكون الإضاءة داخل السطح نفسه وتختفي الأسلاك عن النظر. وأُنشئ على الجدار هيكل مستوٍ للتلفاز مع مدفأة أسفله. وأخيرًا وُضعت الأرضية: ألواح بلوط بخطوط هادئة ومستقيمة، مع وزرات بلون الجدران نفسه. ولأن السقف والجدار والأرضية نُفّذت بالفريق نفسه، تتلاقى التفاصيل ولم تكن هناك انتظارات بين أطراف مختلفة.",
    },
  },
  "bedrijfsruimte-afbouw-vlissingen": {
    en: {
      title: "Green wall and panelling in a commercial space",
      category: "Renovation & remodelling",
      summary:
        "A commercial space finished in one assignment: a full-height green wall, black 3D wall panels and LED lighting in the ceiling.",
      description:
        "The interior of this commercial space was finished in one go. A green wall was installed against the wall, running up to the ceiling, with black 3D panels below as a feature behind the washing units. The LED lighting in the ceiling and the tiled floor complete the whole. Because wall, ceiling and floor were done in the same assignment, the transitions meet up and there was no waiting between parties.",
    },
    ar: {
      title: "جدار أخضر وألواح في مساحة تجارية",
      category: "التجديد والترميم",
      summary:
        "مساحة تجارية أُنجزت في طلب واحد: جدار أخضر بالارتفاع الكامل، وألواح سوداء ثلاثية الأبعاد، وإضاءة LED في السقف.",
      description:
        "شُطّب داخل هذه المساحة التجارية دفعة واحدة. رُكّب جدار أخضر يمتد حتى السقف، وأسفله ألواح سوداء ثلاثية الأبعاد كعنصر لافت خلف وحدات الغسيل. وتكتمل الصورة بإضاءة LED في السقف وأرضية البلاط. ولأن الجدار والسقف والأرضية نُفّذت في الطلب نفسه، تتلاقى الانتقالات ولم تكن هناك انتظارات بين أطراف.",
    },
  },
  "keuken-geplaatst-vlissingen": {
    en: {
      title: "Kitchen built and finished",
      category: "Bathroom & kitchen",
      summary:
        "A new wall of grey and white units, a tiled splashback in brick bond and the extractor hidden in the upper cabinet.",
      description:
        "The kitchen was rebuilt with a long run of units and a tiled splashback in brick bond. The extractor was integrated into the upper cabinet, so no separate hood hangs in view. Sockets and connections were taken into account before the units went up, so everything sits where the kitchen needs it and no further drilling into the wall is required later. The floor was prepared for its finish in the same assignment.",
    },
    ar: {
      title: "مطبخ مُركّب ومُشطّب",
      category: "الحمام والمطبخ",
      summary:
        "جدار جديد من الوحدات الرمادية والبيضاء، وخلفية بلاط بنمط الطوب، والشفاط مخفي في الخزانة العلوية.",
      description:
        "أُعيد بناء المطبخ بصف طويل من الوحدات وخلفية بلاط بنمط الطوب. أُدمج الشفاط في الخزانة العلوية فلا يظهر غطاء منفصل. وأُخذت المقابس والتوصيلات في الحسبان قبل تعليق الوحدات، فأصبح كل شيء في مكانه الذي يحتاجه المطبخ دون حاجة لثقب الجدار لاحقًا. وحُضّرت الأرضية للتشطيب في الطلب نفسه.",
    },
  },
  "woning-gestript-en-gestuct-vlissingen": {
    en: {
      title: "House stripped and replastered",
      category: "Renovation & remodelling",
      summary:
        "Walls and ceilings replastered, frames refitted and the subfloor prepared for the new finish.",
      description:
        "In this house the walls and ceilings were replastered after the old work was removed. The frames were refitted and cased, the heating connected and the subfloor cleared and prepared for the new finish. The photos show the intermediate stage: plastered work, ready for paint and the floor finish. Because demolition, plastering and floor preparation were one assignment, there was no waiting time between parties.",
    },
    ar: {
      title: "منزل هُدم وأُعيد تجبيبه",
      category: "التجديد والترميم",
      summary:
        "إعادة تجبيب الجدران والأسقف، وإعادة تركيب الإطارات، وتحضير الأرضية السفلية للتشطيب الجديد.",
      description:
        "في هذا المنزل أُعيد تجبيب الجدران والأسقف بعد إزالة العمل القديم. أُعيد تركيب الإطارات وتغليفها، ووُصلت التدفئة، ونُظّفت الأرضية السفلية وحُضّرت للتشطيب الجديد. تُظهر الصور المرحلة الوسيطة: عمل مُجبّس جاهز للدهان وتشطيب الأرضية. ولأن الهدم والجبس وتحضير الأرضية كانت في طلب واحد، لم تكن هناك فترات انتظار بين أطراف.",
    },
  },
  "terras-betegeld-vlissingen": {
    en: {
      title: "Patio re-tiled",
      category: "Tiling",
      summary:
        "Large-format tiles on a fresh sand bed, with a metal profile as edging and a connection to the paving.",
      description:
        "The patio was rebuilt: sand bed, mortar and large-format tiles in a straight run. A metal profile was fitted along the edge so the tiles finish neatly there and rainwater runs the right way. The connection to the paving and the facade was included in the same assignment. The photos were taken during the work; the mortar had not yet hardened at that point.",
    },
    ar: {
      title: "إعادة تبليط الفناء",
      category: "أعمال البلاط",
      summary:
        "بلاط كبير القياس على فرشة رمل جديدة، مع مقطع معدني كحافة واتصال بالرصف.",
      description:
        "أُعيد بناء الفناء: فرشة رمل ومونة وبلاط كبير القياس بخطوط مستقيمة. رُكّب مقطع معدني على الحافة لينتهي البلاط بأناقة هناك ويتجه ماء المطر في الاتجاه الصحيح. وأُدرج الاتصال بالرصف والواجهة في الطلب نفسه. التُقطت الصور أثناء العمل، وكانت المونة وقتها لم تتصلب بعد.",
    },
  },
};

export const reviewTranslations: Record<
  string,
  { en: { body: string; service: string }; ar: { body: string; service: string } }
> = {
  "Sandra van der Berg": {
    en: {
      body: "Our bathroom really needed replacing and we dreaded the disruption. Perfecthous worked day by day and by the end of each day the house was liveable again. The finish is crisp, the joints line up and there is not a single bead of sealant out of place. One point of contact makes such a difference.",
      service: "Bathroom & kitchen",
    },
    ar: {
      body: "كان حمامنا بحاجة حقيقية إلى التجديد وكنا نخشى الفوضى. عملت Perfecthous يومًا بيوم، وفي نهاية كل يوم كان المنزل صالحًا للسكن من جديد. التشطيب أنيق والفواصل مصطفة ولا يوجد أي خط سيليكون في غير مكانه. جهة تواصل واحدة تصنع فرقًا كبيرًا.",
      service: "الحمام والمطبخ",
    },
  },
  "Marc de Ruiter": {
    en: {
      body: "The extension turned out exactly as we pictured it, but what pleased me most was the communication. Difficult points were raised at the survey instead of turning up later as extra work. The schedule was kept and so was the budget.",
      service: "Extensions & additions",
    },
    ar: {
      body: "جاءت التوسعة تمامًا كما تصوّرناها، لكن ما أعجبني أكثر هو التواصل. طُرحت النقاط الصعبة عند المعاينة بدل أن تظهر لاحقًا كأعمال إضافية. التزم الفريق بالجدول وبالميزانية أيضًا.",
      service: "التوسعة والملاحق",
    },
  },
  "Els Verhagen": {
    en: {
      body: "We lived in the house during the living room renovation. Every evening it was tidied, the dust covered and we could just watch television. That sounds obvious, but it is not. The result is a bright room that finally feels right.",
      service: "Renovation & remodelling",
    },
    ar: {
      body: "سكنّا المنزل أثناء تجديد غرفة المعيشة. كان كل مساء يُرتّب العمل ويُغطى الغبار ويمكننا مشاهدة التلفاز عاديًا. يبدو ذلك بديهيًا لكنه ليس كذلك. النتيجة غرفة مشرقة صارت أخيرًا كما ينبغي.",
      service: "التجديد والترميم",
    },
  },
  "Jan-Willem Bakker": {
    en: {
      body: "Large-format tiles in the hallway and on the stairs. That is precision work and it showed: everything lines up neatly, including the corners you normally never see. A clear price beforehand, no surprises afterwards.",
      service: "Tiling",
    },
    ar: {
      body: "بلاط كبير القياس في المدخل وعلى الدرج. هذا عمل دقيق وقد ظهر ذلك: كل شيء مصطف بأناقة، بما في ذلك الزوايا التي لا تُرى عادة. سعر واضح مسبقًا ودون مفاجآت لاحقًا.",
      service: "أعمال البلاط",
    },
  },
  "Petra Meijer": {
    en: {
      body: "A leak under the floor on a Saturday morning. I called and someone was there within two hours. It was fixed straight away and on Monday he came back to close the floor neatly. I did not expect that and it makes the difference.",
      service: "Plumbing",
    },
    ar: {
      body: "تسرب تحت الأرضية صباح السبت. اتصلت ووصل أحدهم خلال ساعتين. أُصلح الأمر فورًا، وعاد الاثنين ليعيد إغلاق الأرضية بأناقة. لم أتوقع ذلك وهو ما يصنع الفرق.",
      service: "السباكة",
    },
  },
  "Daan Koster": {
    en: {
      body: "A bespoke cupboard under a sloped roof, which others said could not be done. It worked and there is not a single gap. He comes to look, thinks along and says so when something is not sensible instead of just doing it.",
      service: "Carpentry",
    },
    ar: {
      body: "خزانة حسب المقاس تحت سقف مائل، قال آخرون إنها غير ممكنة. نجحت ولا يوجد أي فراغ. يأتي لينظر ويشارك بالرأي ويقول بصراحة إن كان شيء غير عملي بدل أن ينفّذه فقط.",
      service: "أعمال النجارة",
    },
  },
};

export const postTranslations: Record<
  string,
  {
    en: { title: string; excerpt: string; category: string; content: string };
    ar: { title: string; excerpt: string; category: string; content: string };
  }
> = {
  "wat-kost-een-badkamerrenovatie": {
    en: {
      title: "What does a bathroom renovation cost in 2026?",
      excerpt:
        "A realistic breakdown of the costs: what you pay for demolition, services, tiling and sanitary ware, and where the biggest differences are.",
      category: "Costs & planning",
      content: `## Why prices vary so much

If you request three quotes for the same bathroom, you sometimes get three completely different amounts. That is rarely down to the profit margin — it almost always comes down to what is *not* in the quote. Is waterproofing included? Is the old sanitary ware removed? Is the pipework included, or only the tiling?

A fair price comparison therefore starts with the same scope.

## How a complete renovation is built up

A complete bathroom renovation consists of four layers of work:

1. **Demolition and removal** — old tiles, sanitary ware and sometimes a wall come out.
2. **Services** — moving pipework, adjusting drains, electrics.
3. **Waterproofing and tiling** — including levelling the substrate.
4. **Installation and finishing** — sanitary ware, sealing, accessories.

The first and third layers are the creeping costs. Demolition in an old building with a thick tiled floor costs more than in a house from 2005. And a substrate that is not level needs levelling — an extra day that nobody foresees.

## What to look for in a quote

Always ask about these four points:

- Is waterproofing included, or is it a separate item?
- Is the waste removed, and at what rate?
- What happens if there is something unexpected behind the wall?
- Is there a week-by-week schedule, or only an end date?

A quote that answers these questions is worth more than one that only states a total.

## An indication

For a complete renovation of a bathroom of about 6 m² in a standard home, you will in most cases be between fifteen and twenty-five thousand euros, depending on the materials and the state of the services. A refresh — new tiles, new sanitary ware, services left in place — can come out considerably lower.

That range is deliberately wide. Naming an exact amount without having seen the room is a promise you cannot keep.`,
    },
    ar: {
      title: "كم تكلفة تجديد الحمام في 2026؟",
      excerpt:
        "تفصيل واقعي للتكاليف: ما تدفعه مقابل الهدم والخدمات والبلاط والتركيبات الصحية، وأين تكمن أكبر الفروق.",
      category: "التكاليف والتخطيط",
      content: `## لماذا تتفاوت الأسعار إلى هذا الحد؟

من يطلب ثلاثة عروض سعر للحمام نفسه يحصل أحيانًا على ثلاثة مبالغ مختلفة تمامًا. وهذا نادرًا ما يعود إلى هامش الربح — بل يرجع دائمًا تقريبًا إلى ما *لا* يرد في العرض. هل العزل المائي محسوب؟ هل تُزال التركيبات القديمة؟ هل العمل يشمل الأنابيب أم البلاط فقط؟

لذلك تبدأ المقارنة العادلة للأسعار من نطاق عمل واحد.

## كيف يُبنى التجديد الكامل

يتكوّن تجديد الحمام الكامل من أربع طبقات عمل:

1. **الهدم والإزالة** — البلاط القديم والتركيبات وأحيانًا جدار كامل.
2. **الخدمات الفنية** — نقل الأنابيب وتعديل المصارف والكهرباء.
3. **العزل المائي والبلاط** — بما في ذلك تسوية الأرضية.
4. **التركيب والتشطيب** — التركيبات الصحية والسيليكون والإكسسوارات.

الطبقة الأولى والثالثة هما التكلفتان الخفيتان. فالهدم في مبنى قديم بأرضية بلاط سميكة يكلّف أكثر من منزل من عام 2005. والأرضية غير المستوية تحتاج تسوية — يوم إضافي لا يتوقعه أحد.

## ما يجب أن تراجعه في عرض السعر

اسأل دائمًا عن هذه النقاط الأربع:

- هل العزل المائي مشمول أم بند منفصل؟
- هل تُنقل المخلفات، وبأي سعر؟
- ماذا يحدث إذا ظهر شيء غير متوقع خلف الجدار؟
- هل توجد خطة أسبوعية أم تاريخ انتهاء فقط؟

عرض السعر الذي يجيب عن هذه الأسئلة أغلى قيمةً من عرض يذكر مبلغًا إجماليًا فقط.

## تقدير عام

لتجديد كامل لحمام بمساحة نحو 6 م² في منزل عادي، ستكون في معظم الحالات بين خمسة عشر وخمسة وعشرين ألف يورو، بحسب المواد وحالة الخدمات الفنية. أما التجديد السطحي — بلاط جديد وتركيبات جديدة مع إبقاء الأنابيب — فقد يكون أقل بكثير.

هذا النطاق واسع بشكل مقصود. فذكر مبلغ دقيق دون رؤية المساحة وعدٌ لا يمكن الوفاء به.`,
    },
  },
  "vergunning-voor-een-uitbouw": {
    en: {
      title: "Do I need a permit for an extension?",
      excerpt:
        "The rules for extensions have changed. What is permit-free, when do you need an environmental permit and what does the municipality ask for?",
      category: "Permits",
      content: `## The main rule

Since the Environment and Planning Act (Omgevingswet) the system has become simpler, but not simple. Broadly: an extension at the **back** of a home is often permit-free, provided it is not too large and does not reach too far into the back garden. At the **front** a permit is almost always required.

The exact dimensions differ per municipality and per zoning plan. Vlissingen, Middelburg and Veere each have their own rules — and within a municipality it can differ per neighbourhood.

## What you usually need

- A site plan showing the extension
- Elevation drawings of the front and back
- A floor plan with the new layout
- Sometimes a structural calculation, for example with a large span

We supply the drawings and data you need. As the owner, you submit the application to the municipality yourself.

## Have it checked in advance

Before the quote, the best step is to consult the online planning counter (omgevingsloket) or call the municipality with the dimensions of your plan. Then you know within a few days where you stand, instead of finding out halfway through the build.

In doubt? We are happy to look at it during the survey — that costs nothing and prevents an expensive surprise.`,
    },
    ar: {
      title: "هل أحتاج تصريحًا للتوسعة؟",
      excerpt:
        "تغيّرت قواعد التوسعة. ما الذي لا يحتاج تصريحًا، ومتى تحتاج تصريحًا بيئيًا، وماذا تطلب البلدية؟",
      category: "التصاريح",
      content: `## القاعدة الأساسية

منذ قانون البيئة والتخطيط (Omgevingswet) أصبح النظام أبسط، لكنه ليس بسيطًا. بوجه عام: التوسعة في **الجزء الخلفي** من المنزل كثيرًا ما لا تحتاج تصريحًا، بشرط ألا تكون كبيرة جدًا ولا تمتد بعيدًا في الحديقة الخلفية. أما في **الواجهة الأمامية** فالتصريح مطلوب دائمًا تقريبًا.

تختلف الأبعاد الدقيقة بحسب البلدية وخطة التخطيط العمراني. فلِسِنغن وميدلبورخ وفيري لكل منها قواعدها — وقد تختلف داخل البلدية نفسها من حي إلى حي.

## ما تحتاجه عادة

- مخطط موقع يوضح التوسعة
- رسومات واجهات أمامية وخلفية
- مخطط طابق بالتوزيع الجديد
- أحيانًا حساب إنشائي، مثلًا عند بحر كبير

نحن نوفّر الرسومات والبيانات التي تحتاجها. أما الطلب نفسه فتقدمه أنت بصفتك المالك إلى البلدية.

## اطلب الفحص مسبقًا

أفضل خطوة قبل عرض السعر هي مراجعة البوابة الرقمية للتخطيط (omgevingsloket) أو الاتصال بالبلدية بأبعاد مخططك. بذلك تعرف خلال أيام قليلة ما موقفك، بدل أن تكتشف ذلك في منتصف البناء.

هل لديك شك؟ يسعدنا الاطلاع عليه أثناء المعاينة — لا يكلّف شيئًا ويمنع مفاجأة مكلفة.`,
    },
  },
  "verbouwen-terwijl-u-er-woont": {
    en: {
      title: "Renovating while living there: keeping it liveable",
      excerpt:
        "A renovation in an occupied house needs planning. Five practical agreements that make the difference between surviving and simply carrying on.",
      category: "Tips",
      content: `## 1. Phase by room, not by trade

The temptation is great to do all the walls at once. But if you work room by room, you always keep a kitchen, bathroom and bedroom that remain usable. That does mean the same trade comes by twice — in return you are not without a bathroom for three weeks.

## 2. Agree who clears up what

At the end of every working day the floor should be clear and the dust covered. Agree that explicitly, in the quote or in the work plan. With us it is standard in the agreements.

## 3. Protect what stays

Cardboard on the floor, plastic over furniture, dust doors at the stair opening. It costs an hour and saves days of cleaning.

## 4. Keep one decision-maker

A renovation involves hundreds of small decisions. If two people answer differently, the work stops. Agree who is the point of contact.

## 5. Plan the dust peaks

Demolition and sanding produce the most dust. Ask when those days are and plan around them — a weekend away, or the children at family for a few days.

A renovation in an occupied home is never comfortable, but with these five agreements it is manageable.`,
    },
    ar: {
      title: "التجديد وأنت تسكن: كيف يبقى المنزل صالحًا للسكن",
      excerpt:
        "التجديد في منزل مسكون يحتاج تخطيطًا. خمس اتفاقيات عملية تصنع الفرق بين الصمود والمتابعة العادية.",
      category: "نصائح",
      content: `## 1. قسّم العمل حسب الغرف لا حسب التخصص

الإغراء كبير لتنفيذ جميع الجدران دفعة واحدة. لكن العمل غرفةً غرفة يبقي دائمًا مطبخًا وحمامًا وغرفة نوم صالحة للاستخدام. هذا يعني أن التخصص نفسه يمرّ مرتين — وفي المقابل لا تبقى ثلاثة أسابيع دون حمام.

## 2. اتفقوا على من ينظّف ماذا

في نهاية كل يوم عمل يجب أن تكون الأرضية خالية والغبار مغطى. اتفق على ذلك صراحةً في عرض السعر أو في خطة العمل. وعندنا هو بند قياسي في الاتفاقيات.

## 3. احمِ ما يبقى

كرتون على الأرضية، وبلاستيك على الأثاث، وأبواب عازلة للغبار عند فتحة السلّم. يكلّف ساعة ويوفّر أيامًا من التنظيف.

## 4. اجعل صاحب القرار واحدًا

في التجديد مئات القرارات الصغيرة. وإذا أجاب شخصان إجابتين مختلفتين يتوقف العمل. اتفقوا على من هو نقطة التواصل.

## 5. خطّط لذُرى الغبار

الهدم والصنفرة ينتجان أكبر قدر من الغبار. اسأل متى تكون تلك الأيام وخطّط حولها — مثلًا عطلة نهاية أسبوع خارج المنزل أو بقاء الأطفال أيامًا عند الأقارب.

التجديد في منزل مسكون ليس مريحًا أبدًا، لكن بهذه الاتفاقيات الخمس يبقى الأمر محتملًا.`,
    },
  },
};
