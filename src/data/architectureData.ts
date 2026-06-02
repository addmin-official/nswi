import { TranslationSet, Microservice, TechStackItem, BudgetCostItem, TimelineMilestone } from '../types';

export const UI_TRANSLATIONS: Record<string, TranslationSet> = {
  en: {
    title: "Iraq National Single Window (NSW)",
    subtitle: "Enterprise Technical Architecture & Sovereign Blueprints",
    architectTitle: "Iraq Single Window Architecture Board",
    architectSub: "Solutions Architecture & Sovereign Cloud Blueprint | Version 1.4",
    budgetLabel: "Total Approved Budget",
    timelineLabel: "Timeline Target",
    scaleLabel: "Target Transaction Scale",
    regionsLabel: "Deployment Footprint",
    activeLanguage: "Language",
    searchPlaceholder: "Search microservices, endpoints, or specs...",
    tabOverview: "Executive Summary",
    tabArchitecture: "Sovereign Architecture Diagram",
    tabMicroservices: "Microservices Specification",
    tabDataFlow: "Data Flow Simulator",
    tabApiDesign: "API Design & Payload Specs",
    tabSecurity: "Zero-Trust Security & Sovereign Compliance",
    tabBudgetTimeline: "Investment & Roadmap Plan",
    btnCopyMermaid: "Copy Mermaid Code",
    copiedLabel: "Copied successfully!",
    offlineCapTitle: "Border Security & Offline Mode Operations",
    offlineCapDesc: "Edge-based remote gateways at critical entry borders (Zahko, Safwan, Umm Qasr) synchronize logs using peer-to-peer eventual consistency protocols over secure satellite/cellular fallback lines.",
    sovereignCloudTitle: "Google Cloud Sovereign & Multi-Region",
    sovereignCloudDesc: "Distributed topology leveraging GCP's Sovereign land nodes and Google Distributed Cloud (GDC) Hosted architecture in Iraq. Baghdad acts as Primary Hub, Basra as Hot Disaster Recovery (DR), and Erbil for Kurdish Regional Government integration.",
    asycudaIntegrationTitle: "UNCTAD ASYCUDA World Harmonization",
    asycudaIntegrationDesc: "Bidirectional mapping via the ASYCUDA World SOAP/EDIFACT Integration Layer. Directly transfers clearance codes and manifest updates asynchronously using Apache Kafka queues to guarantee zero loss of trade registrations."
  },
  ar: {
    title: "النافذة الوطنية العراقية الواحدة للتجارة",
    subtitle: "الهندسة التقنية الشاملة والمخططات السيادية للخدمات",
    architectTitle: "مجلس هندسة النافذة الوطنية الواحدة",
    architectSub: "مخطط الخدمات السحابية السيادية وهندسة الحلول | إصدار 1.4",
    budgetLabel: "الميزانية الإجمالية المعتمدة",
    timelineLabel: "الجدول الزمني المستهدف",
    scaleLabel: "حجم المعاملات المستهدف",
    regionsLabel: "مواقع الانتشار والتشغيل",
    activeLanguage: "اللغة",
    searchPlaceholder: "ابحث عن الخدمات المصغرة، نقاط النهاية، أو المواصفات...",
    tabOverview: "الملخص التنفيذي للمشروع",
    tabArchitecture: "مخطط الهندسة السيادية والأنظمة",
    tabMicroservices: "مواصفات الخدمات المصغرة",
    tabDataFlow: "محاكي تدفق البيانات للترخيص",
    tabApiDesign: "تصميم واجهات البرمجة (API)",
    tabSecurity: "الأمن الصفري والامتثال السيادي",
    tabBudgetTimeline: "خطة الاستثمار والمسار الزمني",
    btnCopyMermaid: "نسخ كود ميرميد (Mermaid)",
    copiedLabel: "تم النسخ بنجاح!",
    offlineCapTitle: "أمن المعابر الحدودية والتشغيل دون اتصال",
    offlineCapDesc: "بوابات طرفية ذكية عند المنافذ الحيوية (إبراهيم الخليل، سفوان، أم قصر) تعمل على مزامنة البيانات بشكل تلقائي عبر جلب تدريجي ومتسق عند عودة الاتصال بالقمر الاصطناعي أو الشبكات الخلوية الاحتياطية الاستراتيجية.",
    sovereignCloudTitle: "سحابة جوجل السيادية والتوزيع الإقليمي المعتمد",
    sovereignCloudDesc: "بنية موزعة تعتمد على خوادم Google Distributed Cloud Hosted داخل العراق. بغداد كمجال رئيسي، البصرة كمركز فرادي لاستعادة الكوارث (DR Hot Site)، وأربيل لمزامنة وتكامل إقليم كردستان العراق.",
    asycudaIntegrationTitle: "التوافق الجمركي مع نظام أسيكودا (ASYCUDA)",
    asycudaIntegrationDesc: "تكامل ثنائي الاتجاه بالاعتماد على بروتوكولات SOAP/EDIFACT لربط نظام أسيكودا العالمي التابع للأونكتاد. تتم المعاملات بشكل غير متزامن باستخدام طوابير Apache Kafka لضمان عدم ضياع أي بيان جمركي."
  },
  ku: {
    title: "پەنجەرەی نیشتمانی یەکگرتووی عێراق بۆ بازرگانی",
    subtitle: "تەلارسازی تەکنیکی گشتگیر و نەخشەڕێگا سەروەرییەکان",
    architectTitle: "بۆردی تەلارسازی پەنجەرەی پێشەنگی نیشتمانی",
    architectSub: "نەخشەڕێگای تەکنیکی و سحابی سەروەری | وەشانی ١.٤",
    budgetLabel: "بودجەی پەسەندکراو",
    timelineLabel: "ماوەی جێبەجێکردن",
    scaleLabel: "قەبارەی مامەڵەی ئامانجکراو",
    regionsLabel: "نەخشەی دابەشبوون و کارکردن",
    activeLanguage: "زمان",
    searchPlaceholder: "گەڕان لە خزمەتگوزارییەکان، خاڵەکانی کۆتایی یان تایبەتمەندییەکان...",
    tabOverview: "پوختەی جێبەجێکردن",
    tabArchitecture: "نەخشەی تەلارسازی سەروەری",
    tabMicroservices: "تایبەتمەندی خزمەتگوزارییە بچووکەکان",
    tabDataFlow: "هاوشێوەکەری ڕۆیشتنی زانیارییەکان",
    tabApiDesign: "دیزاینی هاوبەشی دەروازەکان (API)",
    tabSecurity: "ئاسایشی سفری و پابەندبوونی سەروەری",
    tabBudgetTimeline: "بودجە و پلانی گۆڕانکاری کاتی",
    btnCopyMermaid: "کۆپیکردنی کۆدی مێرمەید",
    copiedLabel: "کۆپیکردنەکە سەرکەوتوو بوو!",
    offlineCapTitle: "ئاسایشی سنوورەکان و کارکردنی دەرەوەی هێڵ",
    offlineCapDesc: "دەروازەکانی لێواری بازنەیی لە مەرزە گرنگەکان (ئیبراهیم خەلیل، سەفوان، ئوم قەسر) داتاکان هاوکات دەکەنەوە لەڕێی پرۆتۆکۆلی گەیاندنی پەیتی بە هێڵی ئاسایشی مانگی دەستکرد یان پەیوەندییە یەدەگەکان.",
    sovereignCloudTitle: "سحابی گوگل-ی سەروەری و دابەشبوونی هەرێمی",
    sovereignCloudDesc: "داڕشتنی دابەشکراو لەسەر کۆمپیوتەری ناوخۆیی Google Distributed Cloud لە عێراقدا. بەغداد وەک ناوەندی سەرەکی، بەسرە وەک ناوەندی فریاگوزاری خێرا (Disaster Recovery)، و هەولێر بۆ گونجاندنی تەواو لەگەڵ حکومەتی هەرێمی کوردستان عێراق.",
    asycudaIntegrationTitle: "هاوئاهەنگی لەگەڵ سیستمی جیهانی ئاسیکۆدا (ASYCUDA)",
    asycudaIntegrationDesc: "گرێدانی دوو لایەنە لە ڕێگای ستانداردەکانی SOAP/EDIFACT بۆ سیستمی ئاسیکۆدای گومرگی سەربە ڕێکخراوی ئەنکتاد. بەکارھێنانی نۆرەی Apache Kafka بۆ گەرەنتی نەمانی هیچ زیانێک لە تۆمارە بازرگانییەکاندا."
  }
};

export const METRICS_DATA = {
  budget: "$180 Million USD",
  timeline: "18 Months Phased Plan",
  transactionScale: "10 Million+ Transactions / Month",
  regions: [
    { name: { en: "Baghdad Hub (Primary)", ar: "مركز بغداد (الرئيسي)", ku: "ناوەندی بەغداد (سەرەکی)" }, status: "Primary Cloud" },
    { name: { en: "Basra Hub (DR/Backup)", ar: "مركز البصرة (الاحتياطي)", ku: "ناوەندی بەسرە (یەدەگ)" }, status: "Hot Standby" },
    { name: { en: "Erbil Hub (KRG Node)", ar: "مركز أربيل (إقليم كردستان)", ku: "ناوەندی هەولێر (کوردستان)" }, status: "Regional Sync" }
  ]
};

export const SOLID_TECH_STACK: TechStackItem[] = [
  {
    layer: { en: "Frontend & Portals", ar: "واجهة المستخدم والبوابات الموحدة", ku: "بەرنامەی پێشەوە و دەروازە یەکگرتووەکان" },
    components: [
      { name: "React 19 / TypeScript / Next.js", description: { en: "Dynamic and localized web portals for traders and governmental agents.", ar: "بوابات ويب ديناميكية وموطنة لمخلصي المعاملات والوكلاء الحكوميين.", ku: "دەروازەی دینامیکی پەیڕەوکراو بۆ بنکەی بەکارهێنەرانی بازرگانی و حکومی." }, role: { en: "Declarative UI layer", ar: "طبقة الواجهات الرسومية التفاعلية", ku: "ڕووکاری بەکارهێنەری پێشکەوتوو" }, isSovereign: false },
      { name: "Tailwind CSS & Motion", description: { en: "Responsive structure supporting both Left-to-Right (English) and Right-to-Left (Arabic/Kurdish) flow directives.", ar: "بناء مستجيب يدعم اتجاهات الكتابة من اليمين إلى اليسار (عربي/كردي) واليسار إلى اليمين (إنجليزي).", ku: "سیستمی شۆخی نەرم بۆ پشتگیری ڕاست بۆ چەپ (کوردی/عەرەبی) و چەپ بۆ ڕاست (ئینگلیزی)." }, role: { en: "Design system", ar: "نظام التصميم الموحد لتطبيقات الويب", ku: "سیستمی ڕێکخستنی شێواز" }, isSovereign: false }
    ]
  },
  {
    layer: { en: "Gateway & API Core", ar: "دروابة واجهات التطبيقات والمحرك الأساسي", ku: "دەروازە و ناوەندی سەرەکی واجهەکان" },
    components: [
      { name: "Apigee Enterprise Gateway", description: { en: "Cloud native gateway with local proxies managing routing, API rate-limiting, WCO request schemas, and OAuth credentials.", ar: "بوابة سحابية لإدارة المسارات، تحديد تدفق واجهات البرمجة، والتحقق من الامتثال لمعايير منظمة الجمارك العالمية WCO.", ku: "دەروازەی سحابی تایبەت بۆ بەڕێوەبردنی هاتوچۆ و ڕێکخستنی قەبارەی داواکارییەکان بە شێوازی WCO." }, role: { en: "Security Proxy & Traffic Router", ar: "وكيل الحماية وتوجيه حركة مرور البيانات الموحدة", ku: "پڕۆکسی ئاسایش و دابەشکەری هاتوچۆ" }, isSovereign: true },
      { name: "gRPC & Protocol Buffers", description: { en: "Inter-microservice communication protocol to achieve microsecond latency and guarantee high serialization speeds.", ar: "بروتوكول اتصالات داخلي بين الخدمات المصغرة لضمان أقل زمن استجابة وسرعة عالية في تشفير البيانات.", ku: "پێوەندی ناوخۆیی خێرا لە نێوان خزمەتگوزارییەکان بە زمانی gRPC." }, role: { en: "Internal Microservices Core RPC", ar: "بروتوكول النداء البرمجي الداخلي السريع", ku: "پەیوەندی خێرای ناوخۆیی" }, isSovereign: false }
    ]
  },
  {
    layer: { en: "Enterprise Messaging Bus", ar: "ناقل رسائل المؤسسات وربط البيانات", ku: "هێڵی گواستنەوەی پەیامەکانی دامەزراوەکان" },
    components: [
      { name: "Apache Kafka on Kubernetes (Confluent)", description: { en: "Highly available event log processing up to 15,000 requests/sec. Orchestrates asymmetric data exchanges between agencies.", ar: "منصة معالجة الأحداث عالية التوافر تدعم ما يصل إلى 15,000 طلب بالثانية لمزامنة المعطيات بين الهيئات.", ku: "سیستمی ڕێکخستنی پەیامەکان و گواستنەوەی خێرا بە چڕی بەرز." }, role: { en: "Event Streaming Backbone", ar: "شريان الاتصالات اللامتزامنة ومعالجة رسائل المعاملات", ku: "بڕبڕەی پشتی هاتوچۆی پەیامەکان" }, isSovereign: true },
      { name: "Enterprise ESB Integrator (WSO2)", description: { en: "Traditional legacy converter mapped directly to SOAP web services of ASYCUDA World and older bank systems.", ar: "مترجم تكاملي متوافق مع الخدمات التقليدية SOAP لربط أنظمة أسيكودا وحسابات البنوك القديمة.", ku: "پێشکەشکاری گۆڕانکاری بۆ گونجاندنی سیستمی نوێ لەگەڵ سیستمی کۆنی نەرمەکاڵاکان." }, role: { en: "Legacy XML mapping engine", ar: "محرك ترجمة لغة XML للمخدمات القديمة", ku: "بزوێنەری وەرگێڕانی سیستمی کۆن" }, isSovereign: false }
    ]
  },
  {
    layer: { en: "Distributed Storage & DB Tier", ar: "قاعدة البيانات والطبقة التخزينية الموزعة", ku: "بنکەی داتاکان و خەزنکردنی دابەشکراو" },
    components: [
      { name: "Google Cloud Spanner", description: { en: "Globally & regional-consistent transactional database (compliance logs, ISO 20022 accounting entries). Baghdad-Basra-Erbil database link.", ar: "قاعدة بيانات موزعة ذات اتساق عالٍ للمعاملات والامتثال المالي والمزامنة الفورية بين بغداد والبصرة وأربيل.", ku: "بنکەی داتای جیهانی بۆ هاوتەریب کردنەوەی داتاکانی بەغداد، بەسرە و هەولێر بەبێ نەهێشتنی جیابوونەوەی داتا." }, role: { en: "Sovereign Master Ledger Database", ar: "قاعدة البيانات السيادية الموحدة للسجلات الجمركية والمالية", ku: "بنکەی سەرەکی تۆماری گواستنەوەکان" }, isSovereign: true },
      { name: "CockroachDB Edge Clusters", description: { en: "Hybrid deployments deployed locally to critical ports with SQL capability, designed to auto-heal and cache border transactions offline.", ar: "بيئات تخزين هجينة تعمل في المعابر بشكل محلي مع دعم استعلامات SQL والقدرة على خزن وتقديم المعاملات حتى في انقطاع الشبكة.", ku: "کۆمەڵە داتابەیسی لێواری بۆ کارکردن و خەزنکردنی زانیاری مەرزەکان بەبێ بێ هێڵ و بێ ئینتەرنێت." }, role: { en: "Offline-First Resilient Database", ar: "قاعدة بيانات طرفية مقاومة للأعطال والعمل دون اتصال", ku: "داتابەیسی لێواری مقاوم لە کاتی نەبوونی ئینتەرنێت" }, isSovereign: false }
    ]
  },
  {
    layer: { en: "Hosted Sovereign Cloud Nodes", ar: "البنية السحابية السيادية المحمية", ku: "تەلارسازی سحابی سەروەری پارێزراو" },
    components: [
      { name: "Google Distributed Cloud (GDC) Hosted", description: { en: "Fully disconnected GCP hardware node stack running in Ministry facility with on-soil Sovereign security key execution.", ar: "عتاد سحابي منفصل تماماً من شركة جوجل يعمل في المرافق السيادية العراقية لضمان عدم تدفق البيانات خارج المحدودية الوطنية للبلاد.", ku: "سیستمی سحابی خۆماڵی لە ناو عێراقدا بۆ پاراستنی تەواوی نهێنی داتاکان بە یەکجاری بەبێ چوونە دەرەوەی سنور." }, role: { en: "Iraq On-Soil Sovereignty Core", ar: "النواة السيادية الآمنة في الأراضي العراقية", ku: "ناوەندی سەرەکی سەروەری خاکی عێراق" }, isSovereign: true },
      { name: "HashiCorp Vault HSM Integration", description: { en: "Hardware Security Modules locally managed within Central Bank of Iraq vault room for transaction signing and digital stamps.", ar: "وحدات تشفير وأمن متكاملة مدارة ذاتياً داخل البنك المركزي العراقي لإصدار واجهة التواقيع الرقمية للأختام الرسمية.", ku: "سیستمی پاراستنی باڵا لە ناو بانکی ناوەندی عێراق بۆ ئاشکرا نەکردنی زانیارییەکان." }, role: { en: "Cryptographic Root of Trust", ar: "الجذر التشفيري لأمن التواقيع والشهادات الرقمية", ku: "جۆری سەرەکی نهێنیکاری" }, isSovereign: true }
    ]
  }
];

export const MICROSERVICES_SPEC: Microservice[] = [
  {
    id: "NSW-01-AUTH",
    name: {
      en: "Unified Identity & Access Handler (Keycloak-SSO)",
      ar: "منصة إدارة الهوية الموحدة وتصاريح الولوج الوطني",
      ku: "خزمەتگوزاری ناسنامە و مۆڵەتی گەیشتن"
    },
    category: "security",
    description: {
      en: "Sovereign auth service protecting core portals. Integrates National ID registries, providing multi-factor (MFA) tokenization with custom roles for customs officials, trade agents, and external inspectors.",
      ar: "خدمة سيادية تضمن التحقق من هوية الأفراد والشركت والجهات الحكومية. تتوائم مع البطاقة الوطنية الموحدة لتوفير تشفير متعدد العوامل (MFA) وتصديق الصلاحيات.",
      ku: "خزمەتگوزارییەکی گرنگ بۆ دابین کردنی ئاسایشی چوونەژوورەوەی گشتی کە هاوتەریبە لەگەڵ کارتی نیشتمانی عێراقی بۆ گەرەنتی متمانە."
    },
    responsibilities: {
      en: [
        "Issue secure WCO-compliant identity tokens (OAuth 2.0 / OIDC)",
        "Implement Multi-Factor authentication and hardware USB key support at border terminals",
        "Maintain localized access records with strictly protected audits across standard ministries"
      ],
      ar: [
        "إصدار رموز الهوية الرقمية المتوافقة مع معايير منظمة الجمارك العالمية (OAuth 2.0 / OIDC)",
        "تطبيق التحقق متعدد العوامل ودعم المفاتيح الأمنية المادية (USB Security Keys) في المعابر",
        "الاحتفاظ بمسارات ومراجعات تدقيقية مشفرة وغير قابلة للتعديل عبر كامل مفاصل الأنظمة"
      ],
      ku: [
        "دروستکردنی بڕوانامەی ئاسایشی کارکردن بە پێوەرە نێودەوڵەتییەکان",
        "جێبەجێکردنی سیستمی پاراستنی چەند مەرجی و دابین کردنی ئامێرە ئاسایشییەکان",
        "تۆمارکردنی هەموو کارەکان لەناو داتابەیسێکی گومرگی پارێزراودا بەبێ توانای گۆڕینی داتا"
      ]
    },
    tech: ["Keycloak", "OAuth2", "PKI Infrastructure", "Google Cloud KMS"],
    endPoints: [
      { path: "/api/v1/auth/token", method: "POST", desc: "Exchange credentials/national ID tokens for JWT claims with localized claims context" },
      { path: "/api/v1/auth/verify", method: "POST", desc: "Decrypt and validate biometric signature metadata against Sovereign Root CA" }
    ]
  },
  {
    id: "NSW-02-VAL",
    name: {
      en: "Declaration Validation & Manifest Broker",
      ar: "محرك التحقق من التصاريح والبيانات الجمركية واللوجستية",
      ku: "بزوێنەری لێکۆڵینەوە لە بەیاننامەکان و بارنامەکان"
    },
    category: "core",
    description: {
      en: "Compiles international commerce manifests according to WCO Data Model v3. Performs automatic structural matching against pre-existing standards before dispatching requests to ASYCUDA.",
      ar: "يقوم بتجميع بيانات الشحن والتجارة الدولية بموجب معايير WCO الإصدار 3. ويتحقق من البيانات والمستندات قبل إرسالها إلى نظام أسيكودا العالمي لمنع الأخطاء الجمركية.",
      ku: "کۆکردنەوە و ڕێکخستنی زانیارییە بازرگانییەکان بەپێی پێوەرە نێودەوڵەتییەکان پێش ئەوەی بنێردرێت بۆ سیستمی ئاسیکۆدا بۆ ڕێگریکردن لە هەڵەی جومرگی."
    },
    responsibilities: {
      en: [
        "Ingest Multi-modal Bills of Lading and air manifests asynchronously",
        "Cross-reference customs tariff code structures with the Ministry of Trade Master records",
        "Perform complex mathematical validation on duties, weight constraints and country of origin declarations"
      ],
      ar: [
        "معالجة واستيراد بوالص الشحن الجوي والبري والبحري المتعددة بشكل غير متزامن",
        "مطابقة رموز الرسوم والتعرفة الجمركية الحالية مع السجلات الرئيسية المعتمدة لوزارة التجارة",
        "إجراء عمليات المراجعة الحسابية الرياضية المعقدة لتقدير المستحقات والوزن وبلد المنشأ"
      ],
      ku: [
        "وەرگرتنی زانیارییەکانی بارکردنی دەریایی، ئاسمانی و وشکانی بە شێوەیەکی خۆکارانە",
        "هاوتەریب کردنی کۆدی جومرگی کاڵاکان لەگەڵ سیستمی پەسەندکراوی وەزارەتی بازرگانی",
        "ئەنجامدانی حیساباتی ئاڵۆز لەسەر جۆری باج، کێشی کاڵا و وڵاتی بەرهەمهێنەر"
      ]
    },
    tech: ["Go (Golang)", "Protocol Buffers", "gRPC Engine", "PostgreSQL Grid"],
    endPoints: [
      { path: "/api/v1/manifest/ingest", method: "POST", desc: "Receive cargo documents from shipping agents or air cargo links. Direct JSON-Schema mapping to WCO standards." },
      { path: "/api/v1/manifest/:id/validate", method: "GET", desc: "Fetch immediate dry-run status with localized Iraqi tariff calculations" }
    ]
  },
  {
    id: "NSW-03-ASY",
    name: {
      en: "Customs ASYCUDA Integration Gateway",
      ar: "مترجم وبوابة أتمتة التكامل مع نظام أسيكودا العالمي",
      ku: "دەروازەی پەیوەندی و تێکەڵکردنی سیستمی ئاسیکۆدا"
    },
    category: "integration",
    description: {
      en: "Dedicated translation proxy mediating SOAP webservices endpoints of ASYCUDA World to Restful microservices. Orchestrates declaration injections of Sadad-compliant customs receipts.",
      ar: "بوابة وسيطة لترجمة الخدمات الشبكية SOAP التابعة لنظام أسيكودا العالمي إلى واجهات برمجية حديثة REST والتحقق من سداد الرسوم الحكومية.",
      ku: "بوابة یەکگرتوو بۆ گۆڕینی زمانە کۆنەکانی SOAP لە سیستمی ئاسیکۆدا بۆ زمانی نوێی REST و دڵنیابوونەوە لە پێدانی باج بە بانکەکان."
    },
    responsibilities: {
      en: [
        "Synchronize customs declarations status updates live to standard NSW users dashboard",
        "Process XML and EDIFACT D96A manifests directly to avoid system downtime on old customs terminals",
        "Queue outgoing status receipts in Kafka during active maintenance operations of ASYCUDA World database nodes"
      ],
      ar: [
        "مزامنة تحديثات حالات التصريحات الجمركية مباشرة على لوحة تحكم مستخدمي النافذة الوطنية الواحدة",
        "معالجة البيانات بصيغة XML و EDIFACT D96A لخدمة المعابر والموانئ البحرية بنجاح",
        "جدولة طوابير المعالجات في قنوات Kafka عند عدم استجابة أو توقف خواديم أسيكودا المركزية"
      ],
      ku: [
        "مزامنه کردنی خێرای دۆخی بەیاننامەکان بۆ بەکارھێنەران بەبێ دواکەوتن پێش چاوی هەموو کارمەندەکان",
        "کارپێکردنی فایلە جیاوازەکان بە ستانداردە جیهانییەکانی EDIFACT تا کارەکان ڕانەوەستن",
        "پاراستنی نۆرەی سەرەکی داواکارییەکان لەناو Kafka لە کاتی تووشبوونی سێرڤەر بە گۆڕانکاری"
      ]
    },
    tech: ["Java 17", "Spring Boot", "WSO2 Enterprise Broker", "Apache Kafka"],
    endPoints: [
      { path: "/api/v1/asycuda/declaration/push", method: "POST", desc: "Format, sign, and forward validated Single Administrative Document (SAD) to ASYCUDA SOAP engine" },
      { path: "/api/v1/asycuda/status/:id", method: "GET", desc: "Retrieve active customs evaluation tier, physical inspection flag, or fast green-channel bypass release authorization" }
    ]
  },
  {
    id: "NSW-04-FIN",
    name: {
      en: "Tariff, Duties & FinTech Clearing Hub",
      ar: "محرك تسوية الرسوم والتحصيل المالي المتوافق مع ISO 20022",
      ku: "ناوەندی بژاردنی باج و پاکتاوکردنی دارایی"
    },
    category: "integration",
    description: {
      en: "Financial payment gateway routing and settlement hub. Ties Single Window declarations to the Central Bank of Iraq (CBI) RTGS system and authorized commercial banks using the ISO 20022 format.",
      ar: "بوابة الربط والتحصيل المالي. تربط بيانات التصاريح بنظام التسوية الإجمالية الفورية (RTGS) في البنك المركزي العراقي والمصارف المرخصة باستخدام معايير ISO 20022 التجارية.",
      ku: "دەروازەی گرێدانی دارایی کە پەیوەستە بە سیستمی گواستنەوەی خێرای بانکی ناوەندي عێراق بە بەکارهێنانی ستانداردی جیهانی ISO 20022."
    },
    responsibilities: {
      en: [
        "Calculate multi-agency dynamic trade fees in single integrated invoice sheet",
        "Translate standard settlement instructions into modern ISO 20022 XML payloads (pacs.008, camt.053)",
        "Audit payment references with cryptography to guarantee zero leakage or modification of trade treasury allocations"
      ],
      ar: [
        "احتساب الرسوم المتغيرة للدوائر والوزارات المختلفة ضمن فاتورة رقمية واحدة ومتكاملة لكل بضاعة",
        "ترجمة تعليمات السداد إلى ملفات ISO 20022 XML معتمدة (pacs.008, camt.053)",
        "تدقيق حركات الدفع والتحصيل والتحويل أوتوماتيكياً لضمان سلامة الأموال العامة المحصلة في المنافذ"
      ],
      ku: [
        "حیسابکردنی باجی هەموو فەرمانگە جیاوازەکان لە یەک لاپەڕەی پارەپێداندا بۆ ئاسانکاری زۆرتر",
        "وەرگێڕانی داواکارییە مۆڵەتپێدراوەکان بۆ فایلی ستاندارد بە جۆری ISO 20022XML",
        "چاوەدێریکردنی وردی متمانەی پارەدانەکان بۆ گەرەنتی نەهێشتنی گەندەڵی یان گۆڕینی ئامارەکان"
      ]
    },
    tech: ["Kotlin", "Micronaut", "Cloud Spanner Ledger Stack", "Kubernetes"],
    endPoints: [
      { path: "/api/v1/finance/invoice/create", method: "POST", desc: "Create centralized NSW payment slip with consolidated agency fee mapping breakdown" },
      { path: "/api/v1/finance/settle/callback", method: "POST", desc: "Secure endpoint for RTGS commercial banks notifying clearance validation after real-time transfer settlement" }
    ]
  },
  {
    id: "NSW-05-MIN",
    name: {
      en: "Multi-Agency Permits & Licenses Router (SGD)",
      ar: "موجه الموافقات واللوجيستيات للوزارات والدوائر القطاعية",
      ku: "ڕێڕەوکار و بەڕێوەبەری مۆڵەتەکانی وەزارەتە جیاوازەکان"
    },
    category: "core",
    description: {
      en: "Orchestrates critical license evaluations with specific ministries: Health (quarantines), Quality Control (COSQC compliance checks), Ministry of Trade (import quotas), and Agriculture.",
      ar: "يدير ويوزع ملفات التراخيص والموافقات مع الوزارات الاختصاصية: الصحة (الفحوصات الطبية)، التقييس والسيطرة النوعية COSQC (مطابقة المواصفات)، التجارة (الحصص الإستيرادية)، والزراعة.",
      ku: "بەڕێوەبردن و ناردنی داواکاری مۆڵەتەکان بۆ وەزارەتە تایبەتمەندەکان: تەندروستی (بۆ پشکنینی پزیشکی)، کۆنترۆڵی جۆری (بۆ دڵنیابوونەوەی کوالیتی کاڵاکان)، بازرگانی و کشتوکاڵ."
    },
    responsibilities: {
      en: [
        "Distribute required custom forms automatically and instantly to sector ministries based on commodity HS Code classifications",
        "Enforce strict parallel approval routing schemas to reduce average port clearance times from 14 days down to 4 hours",
        "Consolidate certificate of analysis documentation digitally to eliminate physically forged import permissions"
      ],
      ar: [
        "توزيع الوثائق والطلبات تلقائياً وفورياً على الوزارات المعنية اعتماداً على الرموز المنسقة للبضائع HS Codes",
        "تطبيق مسارات متوازية وموقوتة للموافقات لتقليص زمن الانتظار الإجمالي في المنافذ من 14 يوماً إلى 4 ساعات فقط",
        "أرشفة ومطابقة شهادات الفحص والتحليل مخبرياً لإلغاء وإحباط عمليات التزوير المستندي للرخص"
      ],
      ku: [
        "دابەشکردنی خێرای داواکارییەکان بەسەر وەزارەتەکاندا بەپێی کۆدی نێودەوڵەتی کاڵاکان HS Codes",
        "کەمکردنەوەی کاتی مۆڵەتەکان لە ١٤ ڕۆژەوە بۆ تەنها ٤ کاتژمێر لە ڕێگەی کارکردنی هاوتەریب",
        "کۆکردنەوەی هەموو بڕوانامەکانی تاقیگە بۆ نەهێشتنی بەڵگەنامەی ساختەی سەر کاغەز"
      ]
    },
    tech: ["Node.js / NestJS", "TypeScript", "Camunda BPMN Workflow Engine", "Docker Core"],
    endPoints: [
      { path: "/api/v1/permits/apply", method: "POST", desc: "Submit multi-agency integrated permit applications based on item HS reference classifications" },
      { path: "/api/v1/permits/status/:claimId", method: "GET", desc: "Verify approval tracking steps from Ministry of Health, Agriculture, and COSQC inspect labs" }
    ]
  },
  {
    id: "NSW-06-OFF",
    name: {
      en: "Border Edge Resilience Offline Gateway",
      ar: "بوابة مرونة واستمرارية العمل دون اتصال بالشبكة للمعابر الحدودية",
      ku: "دەروازەی لێواری نوێ بۆ کاتی نەمانی هێڵ لە مەرزەکاندا"
    },
    category: "intelligence",
    description: {
      en: "Localized rugged edge computing capability installed at active physical borders. Ensures continuous truck registration and cargo inspection logging even under total primary cloud internet severance.",
      ar: "أنظمة حوسبة طرفية متكاملة مثبتة ميدانياً في المعابر والمنافذ الجغرافية الصعبة لضمان تسجيل الشاحنات والبيانات حتى في حالة الانقطاع الكامل للإنترنت.",
      ku: "ئامێری ناوخۆیی لێواری بەهێز لە مەرزەکان بۆ بەردەوامبوونی کارەکان لە کاتی نەمانی هێڵ و بێ ئینتەرنێت بمێننەوە."
    },
    responsibilities: {
      en: [
        "Maintain a local secure SQLite/CockroachDB ledger cluster synchronized with Baghdad Core during signal availability",
        "Utilize Eventual Consistency algorithms and cryptographic queuing protocols to sign documents locally during outages",
        "Perform background synchronizations prioritizing manifest logs while throttling non-essential video telemetry transfers"
      ],
      ar: [
        "إدارة بنية تخزينية محلية SQLite/CockroachDB متزامنة بشكل مستمر مع السحابة المركزية في بغداد فور عودة الاتصال",
        "تطبيق خوارزميات التماسك النهائي والتوقيع المحلي المعتمد للمعاملات لمنع توقف الشاحنات",
        "مزامنة البيانات الحساسة كأدلة التراخيص والبيانات الجمركية أولاً قبل رفع بيانات المراقبة والوسائط العادية"
      ],
      ku: [
        "هێشتنەوەی داتابەیسێکی ناوخۆیی خێرا و سەلامەت کە یەکسەر هەموو زانیارییەکان دەنێرێتەوە بەغداد کاتێک هێڵ دێتەوە",
        "بەکارھێنانی کۆدی دیجیتاڵی تایبەت بۆ مۆڵەتدان لە شوێنەکەدا بەبێ پێویستی ئینتەرنێت بە شێوەیەکی کاتی",
        "مزامنه کردنی زانیارییە سەرەکییەکان لە پێشینەدا و هێشتنەوەی زانیاری ناوبژیوانی تر بۆ دواتر"
      ]
    },
    tech: ["Rust", "SQLite", "CockroachDB Edge Hub", "Peer-To-Peer WireGuard Tunnel"],
    endPoints: [
      { path: "/api/v1/edge/queue/status", method: "GET", desc: "Show active unsynced documents currently queued inside the rugged hardware vault storage" },
      { path: "/api/v1/edge/sync/flush", method: "POST", desc: "Initiate immediate secure sync sequence with the main regional database using delta payloads" }
    ]
  }
];

export const API_SPEC_BLUEPRINTS = {
  principles: [
    { name: { en: "REST API Design", ar: "تصميم واجهات برمجة REST الموحدة", ku: "دیزاینی هاوبەشی واجهەی REST" }, desc: { en: "Strict compliance with Richardson Maturity Level 3 using JSON payloads and unified HTTP response codes.", ar: "التوافق التام مع المستوى الثالث لمعيار ريتشاردسون لنضج واجهات البرمجة باستخدام لغة JSON ورموز خطأ HTTP الموحدة لكل الأنظمة.", ku: "پابەندبوونی تەواو بە ستانداردی ئاسایشی پەیامەکان و هەڵبژاردنی وەڵامە دروستەکان." } },
    { name: { en: "WCO Data Model Align", ar: "الالتزام بنموذج بيانات منظمة الجمارك العالمية", ku: "گونجاندن لەگەڵ مۆدێلی زانیاری WCO" }, desc: { en: "Strict mapping utilizing Customs HS codes and standards from United Nations CEFACT data elements.", ar: "اعتماد الرموز المنسقة ومعايير التبادل المستندي والبيانات الجغرافية الصادرة عن الأمم المتحدة ولحفظ بيانات الشحن.", ku: "پەیڕەوکردنی کۆدی کاڵاکانی نێودەوڵەتی و ستانداردی گشتی نەتەوە یەکگرتووەکان بۆ فەرماندەیی." } },
    { name: { en: "ISO 20022 Financials", ar: "التحويلات المالية بمعايير ISO 20022", ku: "تۆمارکردنی دارایی بە پێوەری ISO 20022" }, desc: { en: "All bank clearances utilize standardized MX Messages formatting mapping directly to modern CBI core ledger links.", ar: "جميع حركات التسوية المالية للبنوك المحلية تعتمد على رسائل التبادل المالي لتقليص الأخطاء وتسهيل تتبع الإيرادات.", ku: "هەموو جوڵە داراییەکانی بانکەکان بە زمانی ستانداردی مێژوویی MX دەکرێن بۆ توندکردنی چاودێری دارایی." } },
    { name: { en: "Asynchronous Resiliency", ar: "مرونة المعالجة اللامتزامنة", ku: "کارکردنی خۆڕاگر و بەردەوام بەبێ ڕەقبوون" }, desc: { en: "Long actions (manifest matching, anti-fraud checks) run inside Kafka workers, updating users via standard WebSocket callbacks.", ar: "العمليات الضخمة (طرق الفحص الجمركي، الفحص الفني للأغذية) معالجة في خلفية النظام مع إرسال إشعارات فورية عبر الويب سوت.", ku: "کارە گەورەکان پێویستە لە ژێرەوە بڕۆن تا کاربەران ڕێگری لە کاروبارەکانیان نەکرێت بەبێ کات کوشتن." } }
  ],
  codeSamples: [
    {
      title: "WCO Trade Manifest Submission (JSON Schema Client Request)",
      lang: "json",
      code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Iraq_NSW_WCO_Manifest_Declaration",
  "type": "object",
  "required": ["declaration_header", "consignee_info", "goods_shipment"],
  "properties": {
    "declaration_header": {
      "type": "object",
      "required": ["nsw_transaction_id", "customs_office_code", "declaration_date", "document_type"],
      "properties": {
        "nsw_transaction_id": { "type": "string", "pattern": "^IQ-NSW-[0-9]{12}$" },
        "customs_office_code": { "type": "string", "example": "IQ-BG-001" },
        "declaration_date": { "type": "string", "format": "date-time" },
        "document_type": { "type": "string", "enum": ["SAD", "IM4", "EX1"] }
      }
    },
    "consignee_info": {
      "type": "object",
      "required": ["national_tax_id", "company_name", "iraqi_import_license_num"],
      "properties": {
        "national_tax_id": { "type": "string", "pattern": "^\x5cd{10}$" },
        "company_name": { "type": "string" },
        "iraqi_import_license_num": { "type": "string" }
      }
    },
    "goods_shipment": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["item_seq_num", "hs_code", "commercial_value_usd", "weight_kg"],
        "properties": {
          "item_seq_num": { "type": "integer" },
          "hs_code": { "type": "string", "minLength": 6, "maxLength": 10 },
          "commercial_value_usd": { "type": "number", "minimum": 0.01 },
          "weight_kg": { "type": "number", "minimum": 0.001 }
        }
      }
    }
  }
}`
    },
    {
      title: "WCO Manifest Instance Event (Kafka Event Payload)",
      lang: "json",
      code: `{
  "eventId": "evt_998311029831",
  "eventType": "iraq.nsw.declaration.submitted",
  "timestamp": "2026-06-02T01:37:39Z",
  "version": "1.0",
  "sovereigntySignature": "sha256:d83d8a101ae01cb8911293fe",
  "data": {
    "declaration_header": {
      "nsw_transaction_id": "IQ-NSW-202606029981",
      "customs_office_code": "IQ-UQP-001",
      "declaration_date": "2026-06-02T01:35:00Z",
      "document_type": "SAD"
    },
    "consignee_info": {
      "national_tax_id": "5501827361",
      "company_name": "Al-Rafidain Logistics Trading Co",
      "iraqi_import_license_num": "LIC-IQ-2026-88319"
    },
    "goods_shipment": [
      {
        "item_seq_num": 1,
        "hs_code": "84713000",
        "commercial_value_usd": 185200.00,
        "weight_kg": 1450.00
      }
    ]
  }
}`
    },
    {
      title: "ISO 20022 Duties Clearing Request (Central Bank pacs.008 XML)",
      lang: "xml",
      code: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>IQNSW-CBI-20260602-00098</MsgId>
      <CreDtTm>2026-06-02T01:37:39Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf>
        <SttlmMtd>RTGS</SttlmMtd>
        <ClrSys>
          <Prtry>CBI_RTGS</Prtry>
        </ClrSys>
      </SttlmInf>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <EndToEndId>IQ-NSW-202606029981</EndToEndId>
        <UETR>c9e83112-ef84-4112-fa81-1928aeecc831</UETR>
      </PmtId>
      <IntrBkSttlmAmt Ccy="IQD">240760000</IntrBkSttlmAmt>
      <Dbtr>
        <Nm>Al-Rafidain Logistics Trading Co</Nm>
      </Dbtr>
      <DbtrAgt>
        <FinInstnId>
          <BICFI>RAFIIQBAXXX</BICFI>
          <Nm>Rafidain Bank - Baghdad Head Office</Nm>
        </FinInstnId>
      </DbtrAgt>
      <CdtrAgt>
        <FinInstnId>
          <BICFI>BIRAQBAXXXX</BICFI>
          <Nm>Central Bank of Iraq - Treasury Collection Account</Nm>
        </FinInstnId>
      </CdtrAgt>
      <Cdtr>
        <Nm>Ministry of Finance - Customs Customs Customs</Nm>
      </Cdtr>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`
    },
    {
      title: "ASYCUDA World Legacy SOAP Envelope Map",
      lang: "xml",
      code: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:asy="http://unctad.org/asycuda/singlewindow">
   <soapenv:Header>
      <asy:SecurityHeader>
         <asy:SovereignSignature>sha256:889d81dce021f4</asy:SovereignSignature>
         <asy:IraqiCustomsAuthorizationToken>AUTH_TOK_29918237</asy:IraqiCustomsAuthorizationToken>
      </asy:SecurityHeader>
   </soapenv:Header>
   <soapenv:Body>
      <asy:InjectSingleAdministrativeDocumentRequest>
         <asy:ReferenceNum>IQ-NSW-202606029981</asy:ReferenceNum>
         <asy:OfficeCode>IQ-UQP-001</asy:OfficeCode>
         <asy:SadDetailsXMLBlob>
            <![CDATA[
               <SAD>
                  <Identification><Registration><OfficeCode>IQ-UQP-001</OfficeCode><Year>2026</Year></Registration></Identification>
                  <Consignee><TIN>5501827361</TIN></Consignee>
                  <Tariff><CommodityCode>847130</CommodityCode></Tariff>
               </SAD>
            ]]>
         </asy:SadDetailsXMLBlob>
      </asy:InjectSingleAdministrativeDocumentRequest>
   </soapenv:Body>
</soapenv:Envelope>`
    }
  ]
};

export const SECURITY_ARCHITECTURE = {
  principles: [
    {
      title: { en: "Sovereign HSM Key Control", ar: "التحكم السيادي بمفاتيح التشفير السحابية", ku: "کۆنترۆڵی سەروەری لەسەر کلیلەکانی نهێنیکاری" },
      desc: { en: "All data generated within the Single Window is encrypted with keys owned and custodied strictly inside Iraqi territorial soil using Dedicated Cloud Key Management Service (KMS) combined with physical Hardware Security Modules (HSMs) residing inside the Central Bank vault. This secures data sovereignty and guarantees no external entities can decrypt or access state data.", ar: "تشفير جميع المعطيات الجارية داخل النافذة بمفاتيح وطنية تدار بالكامل داخل الأراضي العراقية بتصميم بنية المفاتيح السحابية (KMS) مدعومة بوحدات التشفير المادية (HSM) للبنك المركزي العراقي لحماية السيادة الرقمية للدولة ومنع فك التشفير الخارجي.", ku: "هەموو زانیارییەکانی ناو سیستمی نوێ بە کلیلێک دادەخرێت کە کێلی گرنگی نیشتمانییە لە ناو خاکی عێراقدا و بەڕێوەدەچێت لەلایەن بانکی ناوەندی بە شێوەیەکی فیزیکی بۆ ڕێگری لە هەر چاوەدێری و گەیشتنێکی دەرەکی." }
    },
    {
      title: { en: "Strict Zero-Trust Perimeter", ar: "التحقق والأمن المطلق بمستوى الشبكات الداخلي (Zero-Trust)", ku: "جێبەجێکردنی حەتمی متمانەی سفری (Zero-Trust)" },
      desc: { en: "No server or integration endpoint is trusted inside or outside the network. All service-to-service communication is secured via Mutual TLS (mTLS) with cryptographically validated cryptographic x509 certificates generated periodically by an internal Private Certificate Authority.", ar: "لا توجد ثقة افتراضية لأي خادم أو جهة داخل أو خارج الشبكة. يتم تأمين كافة قنوات الخدمة الرابطة بتقنية متبادلة (mTLS) وشهادات برمجية x509 دورية من الهيئة الوطنية للتصديق الرقمي في العراق.", ku: "هیچ سێرڤەرێک یان خاڵێک بە متمانەی ئاسایی دروست نابێت لەناو یان دەرەوەی ڕایەڵەکە. متمانەی متبادلی تەواو (mTLS) و بڕوانامەی خولی مەرجدار بەکاردێت بۆ ناسینەوەی هەر جوڵەیەک." }
    },
    {
      title: { en: "Full Cryptographic Ledger (Spanner Tamper-Proof)", ar: "سجل العمليات المعمى وغير القابل للتلاعب", ku: "تۆماری پەیڕەوکراوی نەگۆڕ و گەرەنتی پارێزراو" },
      desc: { en: "Every customs status shift, financial clearance, and ministerial permit is hashed into a sequential cryptographically chained log table within. Google Cloud Spanner leverages continuous block-level audit logging to detect and trigger real-time defensive lockdowns if database administrator compromises are attempted.", ar: "كل تحول في حالة التخليص الجمركي، الموافقة الحكومية، أو دفع الأموال يتم تسجيله بسلسلة مشفرة متتالية ومستمرة في نظام السجلات السحابي. يضمن النظام كشف وتنبيه محاولات الاختراق أو التعديل حتى من مدراء قواعد البيانات أنفسهم.", ku: "هەموو گۆڕانکارییەک لە جۆری باج، بڕیار، یان ڕێککەوتنی گومرك بە مۆرێکی تایبەت تۆمار دەکرێت کە تەنانەت ئەندامانی سیستەمەکە یان بەڕێوەبەری بنکەی داتاکانیش ناتوانن دەستکاری بکەن بەبێ کێشە دروستکردن." }
    }
  ]
};

export const DATA_FLOW_SIMULATOR_STEPS = [
  {
    step: 1,
    title: { en: "Trader Customs Entry filing", ar: "تسجيل المعاملة من قبل المستورد/المخلص", ku: "تۆمارکردنی بەیاننامە لەلایەن بازرگانەوە" },
    actor: { en: "Trader Portal System", ar: "بوابة المستورد الموحدة", ku: "دەروازەی یەکگرتووی بازرگان" },
    desc: {
      en: "The trader logs in using unified electronic signatures, imports compliance manifests formatted with international customs WCO HS classification codes directly in the browser.",
      ar: "يقوم المستورد بتسجيل الدخول بهويته الرقمية وإدخال معلومات المانيفست بالرموز الجمركية العالمية المنسقة، ويرفع المستندات في بوابته بكل سلاسة.",
      ku: "بازرگانەکە بە ناسنامە ئەلیکترۆنییەکەیەوە دەچێتە ناو سیستەمەکەوە و فایلی بارامەکە بە کۆد جیهانی و تەلەفۆنی دادەنێت."
    },
    status: "Initiated"
  },
  {
    step: 2,
    title: { en: "Validation & Ministry Approvals Routing", ar: "التحقق وتوجيه الطلب للوزارات المعنية", ku: "پشکنین و ناردنی مەلەف بۆ وەزارەتەکان" },
    actor: { en: "NSW-05-MIN core service", ar: "خدمة الموجه وجدول الأعمال الوزاري المعزز", ku: "خزمەتگوزاری ناوەندی وەزارەتی" },
    desc: {
      en: "NSW routes the declarations context to relevant ministries in parallel (Health Ministry, Customs Labs, or Quality Control COSQC) utilizing digital rules engine matching to verify safety.",
      ar: "تقوم الخدمة المركزية في النافذة الوطنية بتوجيه الرخص فوراً وبالتوازي إلى وزارات الصحة، الزراعة، والتقييس والسيطرة النوعية لمنع تعطل البضائع دون مبرر.",
      ku: "پەنجەرەی نیشتمانی فایلەکان دەنێرێت بە شێوەیەکی هاوتەریب بۆ وەزارەتەکان (وەزارەتی تەندروستی، کشتوکاڵ یان کۆنترۆلی جۆری) بەپێی جۆری کاڵاکان بۆ خێراکردنی کارەکان."
    },
    status: "Processing Permitting"
  },
  {
    step: 3,
    title: { en: "ISO 20022 Financial Duties Settlement", ar: "تسوية ودفع الرسوم المالية الموحدة", ku: "پاکتاوکردنی باجی گومرگی و بژاردنی پارە" },
    actor: { en: "NSW-04-FIN Integration & CBI RTGS", ar: "منصة السداد وبوابات البنك المركزي", ku: "ناوەندی دارایی و سیستمی حەسیبی بانکی عێراقی" },
    desc: {
      en: "Consolidated system estimates overall customs tariff and issues singular invoice. Merchant settles payments directly, CBI RTGS system receives ISO20022 pacs.008 block message, and flags system to authorize release.",
      ar: "يحتسب النظام الفاتورة الموحدة للرسوم بالكامل. يسدد المستورد القيمة من المصرف ليرسل البنك المركزي العراقي إقرار سداد فوري بالصيغة الدولية ISO 20022.",
      ku: "سیستەمەکە گشت پێداویستی باج کۆدەکاتەوە و فاکتۆرێکی گشتی دەردەکات. پاش پێدانی پارەکە لە لایەن بازرگان، بانکی ناوەندی بە فایلێکی جیهانی پشتڕاستی دەکاتەوە."
    },
    status: "Paid"
  },
  {
    step: 4,
    title: { en: "Customs ASYCUDA SAD Automated Injection", ar: "حقن البيانات الآلي في نظام أسيكودا العالمي", ku: "تۆمارکردنی بێ کێشەی داتا لەناو ئاسیکۆدا" },
    actor: { en: "NSW-03-ASY integration gateway", ar: "بوابة نظام أسيكودا الجمركي المتقاطع", ku: "دەروازەی تێکەڵکردنی ئاسیکۆدا" },
    desc: {
      en: "Once licenses and finance validations are resolved in the Single Window ledger, the automated SOAP proxy signs and submits full Single Administrative Document (SAD) details deep inside ASYCUDA core database.",
      ar: "يدمج النظام التصاميم تلقائياً وبأمان في نموذج الإعلان الموحد SAD بنظام أسيكودا عبر وسيط SOAP الخفي والمحمي دون أي تدخل يدوي بشري لمنع تداخل الرشاوى.",
      ku: "پاش چارەسەربوونی مۆڵەت و پارەدان لە پەنجەرەی پێشەنگ، داتای بەیاننامە بە شێوەیەکی ئۆتۆماتیکی دەنێردرێتە ناو بنکەی سەرەکی داتاکانی ئاسیکۆدا بەبێ دەستکاریکردنی مرۆڤ."
    },
    status: "Registered inside ASYCUDA"
  },
  {
    step: 5,
    title: { en: "Border Gate Clearance Release Verification", ar: "التدقيق النهائي والإذن الفوري بالإفراج في المنفذ", ku: "پشکنینی گشتی کۆتایی و مۆڵەت پێدان لە دەروازەی مەرزەکە" },
    actor: { en: "NSW-06-OFF Edge rugged workstation", ar: "محطة المعبر الحدودي والأنظمة الطرفية", ku: "خزمەتگوزاری مەرز و دەروازە" },
    desc: {
      en: "Customs authorities scan barcode or digital stamp sign-off at Iraqi port borders. Local edge clusters check state validity locally from the fault-tolerant edge cluster memory and authorize truck gate passage.",
      ar: "يقوم ضابط الجمرك بمسح الرمز الشريطي الرقمي في منفذ الخروج. تتحقق النظم المحلية بالمعبر من صحة وموثوقية المعاملة مع تخويل بوابة الخروج بالسماح الفوري للمرور.",
      ku: "ئەفسەری مەرز پازڵ یان پارەکاغەزی کۆمپیوتەری دیجیتاڵ دەخوێنێتەوە، و سیستمی لێوار دوای پشتڕاستکردنەوە ڕێگە بە شاحنەکە دەدات گومرگەکە جێبهێڵێت."
    },
    status: "Released"
  }
];

export const INVESTMENT_PLAN: BudgetCostItem[] = [
  {
    category: { en: "Sovereign GDC Hosted Cloud Deployment & Multi-Region Infra", ar: "البنية السحابية السيادية لـ Google Distributed Cloud وتوزيع المناطق", ku: "تەلارسازی سحابی سەروەری گۆگڵ و دڵنیابوونی نوێی هەولێر و بەسرە" },
    allocation: 48.5,
    percentage: 27,
    description: {
      en: "Deployment of physical hardened container hardware hosts across Baghdad, Basra primary data rooms, and Erbil network nodes. Fiber lease and multi-satellite redundant backhaul channels.",
      ar: "توفير البنية التحتية الصلبة لمجموعات خواديم جوجل الموزعة محلياً في بغداد والبصرة وأربيل، وتأمين خطوط الفايبر والاتصالات الفضائية الاحتياطية.",
      ku: "دابین کردنی سێرڤەرە فیزیکییە بەهێزەکانی کۆمپانیای گوگل لە ناو مۆڵگەکانی بەغداد، بەسرە و هەولێر لەگەڵ هێڵە یەدەگەکانی مانگی دەستکرد."
    }
  },
  {
    category: { en: "ASYCUDA World Legacy Integration Engine & XML Transformers", ar: "محرك ربط وترجمة أنظمة أسيكودا العالمية والمصارف المحلية القديمة", ku: "تێکەڵکاری سیستمی جیهانی ئاسیکۆدا و گۆڕینی فایلی XML بانکەکان" },
    allocation: 32.0,
    percentage: 18,
    description: {
      en: "Consulting fees with UNCTAD core developers to wire API interfaces to legacy DB schemes, build reliable high performing microservice mapping bridges, and develop XML/SOAP protocol decoders.",
      ar: "تكاليف المهندسين والمستشارين للأمم المتحدة (الأونكتاد) لبناء جسور ترجمة البيانات الحية واستخراجها بنجاح من أنظمة أسيكودا الحالية وترقيتها.",
      ku: "تێچووی پسپۆڕانی ڕێکخراوی نەتەوە یەکگرتووەکان بۆ دروستکردنی پردی گواستنەوەی نێوان ئاسیکۆدا و ڕووکاری بەکارهێنانی مۆدێرنی دەروازەکان."
    }
  },
  {
    category: { en: "National Security Zero-Trust Cryptography & Central HSM Vaults", ar: "أنظمة الأمن السيبراني للشبكات وتكامل معاقل التشفير والتحقق بالبنوك", ku: "سیستمی باڵای ئاسایشی متمانەی سفری و نەهێشتنی هاککردن" },
    allocation: 25.0,
    percentage: 14,
    description: {
      en: "Purchase of high grade certified HSM modules and custom local Private Certificate Authority architecture to govern internal ministerial transactions signatures securely.",
      ar: "شراء وتجهيز وحدات التشفير المادية العالية الحماية (HSM) وتطوير مرافق الاعتماد الرقمي المحلي للمعاملات والخدمات الموزعة.",
      ku: "کڕینی ئامێرە مادییە بەهێزەکانی پاراستن بۆ گەرەنتی کردنی مۆری دیجیتاڵ بەبێ چاو تێبڕینی دەرەکی یان دزینی زانیاری."
    }
  },
  {
    category: { en: "Custom Microservices, workflow pipelines, BPMS & Multi-Lingual design", ar: "تطوير الخدمات المصغرة المخصصة، محرك المسارات، وتصميم الواجهات المتعددة L10N", ku: "دروستکردنی سیستمی پەیامەکان، کۆنترۆڵی کار و زمانە جیاوازەکان بەیەکەوە" },
    allocation: 39.5,
    percentage: 22,
    description: {
      en: "Engineering and programming, localization QA, custom Kurdish, Arabic and English forms templates engine, data storage schemes implementation and automated pipeline testing.",
      ar: "عمليات التطوير وتأمين معايير الجودة للغات الثلاث (عربي، كردي، إنجليزي) وبناء قواعد البيانات واستجابة الأنظمة وتطبيقات البوابة.",
      ku: "تێچووی زۆری پەرەپێدانی پرۆگرامەکان، ڕێکخستنی جۆری زمانەکان و دڵنیابوونەوە لە کوالیتی کارە مۆدێرنەکانی بەرنامەکە بە زمانەکان."
    }
  },
  {
    category: { en: "Regional Training, On-site Dry-Runs & 24/7 National Help Desk", ar: "برامج التدريب الجمركي في المحافظات، محاكاة التشغيل الحي، والدعم الفني 24/7", ku: "خولەکانی ڕاهێنان لە پارێزگاکان، تاقیکردنەوەی خێرا و پشتگیری تەواو ٢٤ کاتژمێر" },
    allocation: 20.0,
    percentage: 11,
    description: {
      en: "In-person computer training classrooms setup for 4,500 border terminal customs officers and external trade brokers. Field trials at Ibrahim Khalil and Basra docks.",
      ar: "تأسيس مراكز ونقاط التدريب العملي لـ 4,500 ضابط ومخلص كمركي، وتجربة العمل الميداني الحي في معبر إبراهيم الخليل وموانئ البصرة.",
      ku: "ئامادەکردنی هۆڵەکانی ڕاهێنان بۆ زۆرتر لە ٤،٥٠٠ کارمەند لە مەرزەکان و بنکەکانی گومرگ وەک تاقیکردنەوە لە ئیبراهیم خەلیل و دەروازەکانی بەسرە."
    }
  },
  {
    category: { en: "Contingency, Global Audit Logs & Legal compliance adjustments", ar: "صندوق الاحتياط للطوارئ، مراجعات بيئات الإلتزام القانوني واللوجستي", ku: "کۆمەڵەی پاشەکەوت و نەخشەی تاقیکردنەوەکانی یاسایی و حکومی" },
    allocation: 15.0,
    percentage: 8,
    description: {
      en: "Emergency operational pool to support local law updates or customs structural updates, independent cybersecurity validation certifications.",
      ar: "صندوق للطوارئ المالية والتغييرات الهيكلية في القوانين والأنظمة، وإصدار شهادات أمان سيبرانية مستقلة وموثقة للمنظومة.",
      ku: "بودجەی یەدەگی پێویست بۆ هەڵگرتنی هەر بارودۆخێکی نەخوازراو لە کاتی توندکردنی پێوەرەکانی تەندروستی یان گۆڕانکاری یاسایی."
    }
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    quarter: "Q1-Q2",
    months: "Months 1 - 6",
    title: { en: "Foundation, Sovereign Infrastructure & Registry Link", ar: "التأسيس والسيادة والربط مع سجل الهوية والبيانات", ku: "بناغە، تەلارسازی ئاسایشی گشتی و پەیوەندی ناسنامەکان" },
    tasks: {
      en: [
        "Provision Google Distributed Cloud (GDC) Host servers in Baghdad primary data hall",
        "Deploy identity server (NSW-01-AUTH) linking Iraq national unified card registers and CBI HSM servers",
        "Publish official WCO schemas and JSON validation draft protocols for early custom developer links"
      ],
      ar: [
        "تأمين وتجهيز الحواسيب السحابية لشركة جوجل الموزعة (GDC) في القاعة المركزية ببغداد",
        "تفعيل خدمة الهوية الوطنية الموحدة (NSW-01-AUTH) والربط مع البطاقة الوطنية الموحدة ومخدمات تشفير البنك المركزي",
        "نشر واجهات الرموز والتعرفة المنسقة لمطوري التجارة الخارجية لتجربة الربط الاستراتيجي المبكر"
      ],
      ku: [
        "دامەزراندنی نوێی کۆمپانیای گوگل سحاب لە بەغدادی سەرەکی",
        "بەستنی خزمەتگوزاری گرنگی بڕوانامە لەگەڵ کارتی نیشتمانی عێراقی بۆ پاراستنی مۆڵەتەکان",
        "بڵاوکردنەوەی شێوازی فایلی WCO بۆ بەستنی سیستمی کۆمپانیاکان لە سەرەتادا"
      ]
    }
  },
  {
    quarter: "Q3-Q4",
    months: "Months 7 - 12",
    title: { en: "ASYCUDA Gateways, Multi-Ministry Pipeline Deployment", ar: "تطوير بوابات أسيكودا ونشر روابط الموافقات للوزارات", ku: "سازکردنی دەروازەی ئاسیکۆدا و گرێدانی وەزارەتەکان" },
    tasks: {
      en: [
        "Deliver spring gateway links for ASYCUDA World (NSW-03-ASY), translating EDIFACT format streams",
        "Install parallel ministry assessment engine (NSW-05-MIN) mapped at Ministry of Health and COSQC",
        "Launch CBT (Computer Based Training) testing platforms and complete initial localized Kurds-Arabic forms"
      ],
      ar: [
        "إنشاء واجهات التكامل مع خدمات أسيكودا (NSW-03-ASY) لترجمة وفك ملفات ومستندات EDIFACT للاتحاد الجمركي",
        "تثبيت وتفعيل محرك الموافقات الموازي للوزارت الشريكة (NSW-05-MIN) في دوائر الصحة والسيطرة النوعية",
        "إطلاق مخابر التدريب الميداني والانتهاء بالكامل من محتويات النماذج الإلكترونية المعربة والمكرّدة"
      ],
      ku: [
        "بنیاتنانی تەواوی پردی ئاسیکۆدا بۆ تێکەڵکردنی زانیارییە کۆن و تازەکان وە جێبەجێکردنی هاتوچۆکان",
        "دانانی مەکینەی پشکنینی پۆستەکان لە فەرمانگەی کشتوکاڵ، تەندروستی بۆ جێبەجێکردنی هاوتەریبی کارەکان",
        "ڕاگەیاندنی یەکەم وەشانی پڕۆگرامی فێرکاری کارمەندان بە هەردوو زمانی شیرینی کوردی و عەرەبی"
      ]
    }
  },
  {
    quarter: "Q5-Q6",
    months: "Months 13 - 18",
    title: { en: "RTGS Clearing Integration, Basra-Erbil Sync & Dry Runs", ar: "ربط التحصيلات المالية متبادلة الأثر، تفعيل البصرة وأربيل والتكامل", ku: "پەیوەستکردنی پارەدان بە بانک، هاوسەنگ کردنی کوردستان و تاقیکردنەوە" },
    tasks: {
      en: [
        "Launch unified ISO 20022 finance ledger connections (NSW-04-FIN) linking directly to Central Bank RTGS",
        "Setup Basra Hot standby disaster recovery (DR) cloud database clusters, Erbil KRG regional sync engine",
        "Complete deep security zero-trust threat audits, carry out dry-runs at Umm Qasr port and Ibrahim Khalil border"
      ],
      ar: [
        "تفعيل خدمات السداد المالي الشامل ISO 20022 (NSW-04-FIN) بالتنسيق المباشر مع نظام المقاصة للمركزي",
        "تشغيل مركز البصرة لاستعادة الكوارث وتدشين التزامن الفوري مع مركز أربيل بإقليم كردستان",
        "الانتهاء من دراسة أمان واستقلالية الأنظمة وإجراء التدقيق الأمني، والقيام بمحاكاة التشغيل في ميناء أم قصر ومنفذ إبراهيم الخليل"
      ],
      ku: [
        "دەستپێکردنی خزمەتگوزاری دارایی ISO 20022 بۆ وەرگرتنی خێرای مۆڵەتی واژووی بانکی",
        "کارپێکردنی کۆمەڵەی فریاگوزاری بەسرە و جوڵاندنی مەکیەنەی بەیەکە بەستنی کوردستان لە هەولێر بۆ متمانە",
        "ئەنجامدانی کۆتایی تاقیکردنەوە پراکتیکییەکان لە مەرزی ئیبراهیم خەلیل و بەندەری ئوم قەسر تا بەردەوامی کاروبارەکان دڵنیا بێت"
      ]
    }
  }
];

export const SCALABILITY_STRATEGY = {
  scale: "10 Million+ Transactions / Month",
  points: [
    {
      title: { en: "Master Multi-Region Active Spanner Replication", ar: "النسخ المتعدد الفعال والموزع لقاعدة البيانات Spanner", ku: "هاوتاکردنەوەی جۆراوجۆری چالاک بەبێ دواکەوتنی داتابەیسی Spanner" },
      desc: { en: "Avoid traditional master-slave failover stalls. Cloud Spanner is implemented with synchronous multi-region witness nodes in Erbil and read-write servers active in Baghdad and Basra. Shards data automatically based on trade transaction ID.", ar: "تجاوز مشاكل التوقف عند حدوث أي طارئ. نستخدم قاعدة البيانات السحابية Spanner ذات التوزيع الجغرافي النشط والمتطابق بين بغداد والبصرة وأربيل لضمان استجابة 100٪ بدون انقطاع للبيان الجمركي.", ku: "دوورکەوتنەوە لە جۆرە کۆنەکانی لەدەستدانی سەرچاوە. بەکارهێنانی خزمەتگوزاری Spanner بۆ پشتگیریکردنی خێرای هەولێر، بەغداد و بەسرە بە شێوەیەکی هاوکات." }
    },
    {
      title: { en: "Event-Driven Non-Blocking Commerce Processing", ar: "طرق المعالجة غير المقيدة القائمة على التدفق الذكي للرسائل", ku: "دابەشکردنی هەرس فایلی بازرگانی بە شێوازی بێ هێندە ڕاگرتن" },
      desc: { en: "Traders receive sub-second submission callbacks. Complex operations (biometric signing validation, multi-agency rules execution, legacy ASYCUDA database queries) communicate behind the scene in Kafka decoupled topics, stopping system bottlenecks during surge hours.", ar: "تلقي المخلص المعاملات وإشارات الاستجابة بأقل من ثانية، بينما يتم تشغيل العمليات المعقدة والتحليل المخبري وتحديثات أسيكودا في خلفية نظام Kafka دون خنق أو إرباك بوابة المستورد الأساسية.", ku: "وەرگرتنی پێشنیاری ڕاستەوخۆ لە ناو چرکەیەکدا لە کاتێکدا پشکنینە گرانەکان (وەک تاقیگە و گۆڕینی فایل) لە ناو بزوێنەری Kafka بەبێ کێشە دروست کردن بەڕێوەدەچێت." }
    },
    {
      title: { en: "Edge Database Sharding and Fallback Synchronization", ar: "تجزئة ومزامنة قواعد البيانات الجغرافية بالمعابر البرية", ku: "دابەشکردنی داتای بازنەیی مەرزەکان و هاوسەنگی کاتی" },
      desc: { en: "Each border customs office has local CockroachDB database servers processing its entries. Even if all connection routes to Basra/Baghdad are severed, border authorities compute clearances without interruption. Payloads sync up silently once connection lines normalize.", ar: "يمتلك كل منفذ حدودي مصفوفة خواديم محلية CockroachDB متصلة بالمعبر، مما يتيح استمرار إنجاز المعاملات وتخليص المركبات دون شلل في الموانئ، ثم تُدمج البيانات بشكل سلس بمجرد عودة شبكات الاتصال.", ku: "کۆمپانیا و ئەفسەران دەتوانن سەرجەم کارەکانیان ئەنجام بدەن لە مەندەر و مەرزەکان بەبێ بێزاری لەرێی سێرڤەری لێواری CockroachDB تەنانەت کاتێک هێڵەکانی بەغدداش وێران بوو بن." }
    }
  ]
};

export const RAW_MERMAID_DIAGRAM = `graph TD
    classDef default fill:#111827,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef main fill:#065f46,stroke:#059669,stroke-width:2px,color:#ffffff;
    classDef ext fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff;
    classDef edge fill:#78350f,stroke:#d97706,stroke-width:2px,color:#ffffff;

    subgraph IQ_SOVEREIGN_CLOUD ["IQ National Single Window - GCP Sovereign Cloud Deployment Node"]
        APIGW["Apigee Enterprise Gateway <br/> (Sovereignty Routing, MFA Auth Filters)"]:::main
        
        %% Core Microservices Area
        subgraph CORE_SERVICES ["High Resilience Microservices (Orchestrated in GKE)"]
            AuthSvc["NSW-01-AUTH Identity Handler <br/> (Unified Card OIDC, MFA Tokens)"]:::main
            ValSvc["NSW-02-VAL Manifest Broker <br/> (WCO Scheme Validator, HS Engines)"]:::main
            FinSvc["NSW-04-FIN Duties Billing <br/> (Consolidated Invoices, ISO 20022 Ledger)"]:::main
            PermitSvc["NSW-05-MIN Approval Router <br/> (Camunda parallel multi-agency BPMN)"]:::main
        end

        %% Message streaming / Database Core
        KAFKA["Apache Kafka Event Stream <br/> (High Throughput Non-Blocking Transaction Log)"]:::main
        SPANNER[("Google Cloud Spanner Database <br/> (Baghdad-Basra-Erbil Sync, Cryptographic Audit Ledger)")]:::main
    end

    %% External Systems Interactivity
    subgraph GOV_AGENCIES ["Government & External Sector Registries"]
        ASY_WORLD["Customs ASYCUDA World Registry <br/> (XML Soap Services, SAD Declarations)"]:::ext
        CBI["Central Bank of Iraq (CBI) <br/> (RTGS Clearing / ISO 20022 pacs.008 Transfers)"]:::ext
        MoT["Ministry of Trade <br/> (Import/Quota License Authority)"]:::ext
        MoH["Ministry of Health <br/> (Sanitary/Quarantine Clearances)"]:::ext
        COSQC["Customs Quality Control - COSQC <br/> (Standardization Laboratory Approvals)"]:::ext
        RAFIDAIN_BANK["Rafidain / Rasheed & Trade Banks <br/> (Duties Payment Collection)"]:::ext
    end

    %% Edge / Boundary Node
    subgraph BORDER_PORTS ["Border Crossing Points (Rugged Border Edge Infrastructure)"]
        ZAKHO_EDGE["Ibrahim Khalil port - Erbil Edge Engine <br/> (CockroachDB Edge, Rugged Offline Cache Service)"]:::edge
        UMM_QASR_EDGE["Umm Qasr Sea Port Basra Edge Engine <br/> (CockroachDB Edge, High Avail Offline Clearance)"]:::edge
        SAFWAN_EDGE["Safwan Border Gate Edge Engine <br/> (CockroachDB Edge Local Store)"]:::edge
    end

    %% Connections Routing Flow
    Trader((Customs Merchants & Shipping Agents)) -->|HTTPS Post Trade Payload| APIGW
    APIGW --> AuthSvc
    APIGW --> ValSvc
    
    ValSvc -->|Publish validation event| KAFKA
    KAFKA --> PermitSvc
    KAFKA --> FinSvc
    
    %% Storage links
    AuthSvc --> SPANNER
    ValSvc --> SPANNER
    FinSvc --> SPANNER
    PermitSvc --> SPANNER

    %% Ministerial & Core Integrals
    PermitSvc <-->|Parallel approvals JSON API| MoH
    PermitSvc <-->|API verification| MoT
    PermitSvc <-->|Compliance check API| COSQC
    FinSvc <-->|ISO 20022 Transfer Blocks| CBI
    RAFIDAIN_BANK <-->|Local cleared transaction receipts| FinSvc

    %% ASYCUDA Link Node via dedicated Spring gateway adapter
    ValSvc <-->|XML/EDIFACT translation bridge| ASY_WORLD

    %% Offline Edge Sync Links
    SPANNER <-->|Secure multi-region database replications| BORDER_PORTS
    BORDER_PORTS -.->|Delta offline batch synchronization during drops| KAFKA

    class APIGW,AuthSvc,ValSvc,FinSvc,PermitSvc,KAFKA,SPANNER main;
    class ASY_WORLD,CBI,MoT,MoH,COSQC,RAFIDAIN_BANK ext;
    class ZAKHO_EDGE,UMM_QASR_EDGE,SAFWAN_EDGE edge;`;
