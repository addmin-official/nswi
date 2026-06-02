import { useState, useEffect } from 'react';
import { 
  FileText, ShieldCheck, MapPin, Upload, CreditCard, BarChart3, Bell, Search, PenTool, WifiOff, Wifi, 
  User, CheckCircle2, AlertTriangle, ArrowRight, Eye, RefreshCcw, Landmark, Smartphone, Layers, Send
} from 'lucide-react';
import { Language } from '../types';

interface InteractiveNSWPortalProps {
  lang: Language;
}

// Global mockup type for custom state management across user interfaces
interface Declaration {
  id: string;
  traderName: string;
  declarationNum: string;
  type: 'IMPORT' | 'EXPORT';
  origin: string;
  destination: string;
  hsCode: string;
  goodsDesc: string;
  valueUsd: number;
  dutyIqd: number;
  status: 'PENDING_PAYMENT' | 'PAID' | 'CUSTOMS_REVIEW' | 'INSPECTED' | 'APPROVED' | 'RELEASED';
  ocrVerified: boolean;
  signatureSigned: boolean;
  paymentHash?: string;
  trackingStep?: number; // 0: submitted, 1: paid, 2: inspected, 3: approved, 4: in-transit, 5: released
  isOfflineQueued?: boolean;
}

export default function InteractiveNSWPortal({ lang }: InteractiveNSWPortalProps) {
  // Localization dictionaries matching all user intents
  const dict = {
    en: {
      selectRole: "Switch Target User Interface",
      importerExporter: "Merchant Portal (Trader)",
      customsOfficer: "Customs Desk (Gov)",
      ministryOfficial: "Ministry Dashboard",
      logisticsCompany: "Logistics Map Stream",
      mobileAppSim: "Mobile App Simulator",
      
      // Auth Setup
      authTitle: "Sovereign Single Sign-On (OAuth2 + MFA)",
      authDesc: "Multi-Factor Authentication using Iraq Civil National ID Database integration.",
      merchantName: "Merchant/Trader Name",
      nationalId: "National Civil ID / Passport ID",
      mfaCode: "Dynamic MFA Authenticator Code",
      mfaHelp: "Please enter the 6-digit code sent via SMS to +964 ****** or generated on the Iraqi NSW App.",
      btnLogin: "Secure Login & Initialize Session",
      btnLogout: "Secure Logout",
      authenticatedStatus: "Session Authenticated via Keycloak-SSO & HSM Key Vault",
      tokenScope: "Token Scope",

      // Dec Submission Wizard
      wizardTitle: "Declaration Submission Wizard (WCO Framework)",
      wizardSub: "Submit electronic customs declarations linked to ASYCUDA World.",
      stepBasic: "General Info",
      stepGoods: "Goods & HS Codes",
      stepOcrDocs: "OCR Document Upload",
      stepPaySign: "Payment & Signature",
      decNum: "Declaration Number",
      decType: "Declaration Type",
      importType: "Import to Iraq",
      exportType: "Export from Iraq",
      originCountry: "Country of Origin",
      destPort: "Destination Entry Port",
      goodsDescription: "Detailed Cargo Description",
      hsCatalog: "HS Code Catalog Selection",
      qtyValue: "Quantity & Invoice Value (USD)",
      calculateFees: "Run Valuation Engine",
      calculatedCustomsDuty: "Calculated Customs Duty Fee (IQD)",
      exchangeRateFrozen: "Frozen Central Bank of Iraq Exchange Rate (IQD/USD)",
      
      // OCR
      ocrTitle: "Sovereign Document OCR Recognition (GC Vision AI)",
      ocrDrop: "Drag and drop shipping Invoice, Bill of Lading, or Certificate of Origin here to parse, or select a template preset:",
      ocrTemplate1: "Template Auto-Fill: Agricultural Import (Erbil Terminal)",
      ocrTemplate2: "Template Auto-Fill: Automotive Import (Umm Qasr Port)",
      ocrScanning: "Accessing Google Cloud Vision API...",
      ocrSuccess: "OCR Document parsed successfully! Fields populated with 99.8% confidence.",
      ocrStatus: "OCR Verification Status",

      // Sign & Pay
      paymentTitle: "Central Bank RTGS Payment Gateway Integration",
      pacs008hash: "PACS.008 digital billing block verified with Central Bank",
      payBtn: "Authorize & Clear Customs Duty via RTGS Flow",
      signTitle: "Digital PKI Cryptographic Fingerprint Signature",
      signDesc: "Secure digital stamps managed with Hardware Security Modules (HSM) conforming to CBI standards.",
      signPin: "Enter Secure Cryptographic Passphrase PIN",
      signBtn: "Digitally Sign and Seal Document",
      signedLabel: "Document Digitally Sealed via RSA-2048 key!",

      // Search & Filter
      searchTitle: "Elasticsearch Registry Search & Filter",
      searchPlaceholder: "Instant auto-complete search by Declaration Number, HS Code, or Port...",
      noResults: "No matching record verified in standard ledger.",

      // Customs Desk
      officerDeskTitle: "Customs Officer Approvals & Inspections Board",
      officerSub: "Manage and authorize customs declarations awaiting physical inspections and clearance seals.",
      inspectBtn: "Process Submission & Request Inspection",
      approveBtn: "Issue Final Electronic Customs Release Seal",
      actionRemarks: "Official Officer Action Remarks",
      officerNotes: "Cargo matches standard HS specifications. No smuggling or tariff evasions found.",
      
      // Ministry statistics
      ministryTitle: "Iraq NSW National Analytics Center",
      ministrySub: "Real-time Ministry of Finance monitoring, trade volume tracking, and customs revenue collections.",
      aggregateDuties: "Total Collected Tariffs (IQD)",
      inspectedRatio: "Submissions Inspection Rate",
      avgProcessingTime: "Average Port Customs Processing Time",
      portErbil: "Erbil Gateway Node",
      portUmmQasr: "Umm Qasr South Sea Terminal",
      portBaghdad: "Baghdad Cargo Depot",
      portSafwan: "Safwan Land Boundary Terminal",

      // Tracking and map
      trackingTitle: "Global Logistics & Real-Time Shipment Tracker",
      trackingSub: "GPS-grounded container tracking with Google Maps interactive coordinates.",
      currentLocation: "Last Verified Waypoint Tracker",
      gpsCoords: "GPS Coordinates",
      statusStep1: "Declaration Submitted & Audited",
      statusStep2: "RTGS Bank Invoice Settled",
      statusStep3: "Physical Border Inspection Passed",
      statusStep4: "Electronic Customs Release Approved",
      statusStep5: "Released from Border Control",

      // Mobile simulator
      mobileTitle: "Iraqi Single Window Native Mobile Application",
      mobileSub: "Simulating iOS & Android React Native app interface with offline capability.",
      offlineToggle: "Simulate Border Signal Blackout (Offline Mode)",
      offlineActive: "Offline mode active! Declarations will stack in SQLite Local Queue.",
      offlineSynced: "Local database synchronized with Baghdad central hub! Transmitted all queued items.",
      localQueueCount: "Queued Items in Mobile SQLite database",

      // Notification logs
      notifPanel: "Real-Time Agency Notification Logs",
      notifSub: "Dynamic monitor of SMS, Email and In-App notification logs.",
      notifPlaceholder: "Trigger actions across portals to generate system audit trails here.",
      
      // Common button tags
      btnBack: "Previous Step",
      btnNext: "Next Step",
      btnRefresh: "Refresh Data",
      statusLabel: "Status"
    },
    ar: {
      selectRole: "تغيير واجهة مستخدم المنظومة",
      importerExporter: "بوابة المستوردين والمصدرين (القطاع الخاص)",
      customsOfficer: "مكتب ضباط الجمارك والتدقيق (الحكومي)",
      ministryOfficial: "لوحة تحكم الوزارات والمتابعة (المالية)",
      logisticsCompany: "تتبع الشحنات واللوجستيات",
      mobileAppSim: "محاكي تطبيق الهاتف المحمول",

      // Auth Setup
      authTitle: "تسجيل الدخول الوطني الموحد (OAuth2 + MFA)",
      authDesc: "نظام التحقق متعدد العوامل المرتبط بقواعد بيانات البطاقة الوطنية الموحدة ووزارة الداخلية.",
      merchantName: "اسم التاجر / المخلص الجمركي",
      nationalId: "رقم البطاقة الوطنية الموحدة / جواز السفر",
      mfaCode: "رمز التحقق الثنائي المؤقت (MFA)",
      mfaHelp: "يرجى كتابة رمز التحقق المكون من 6 أرقام المرسل عبر رسالة SMS لهاتفك +964 أو المولد في التطبيق.",
      btnLogin: "تسجيل دخول آمن وتدشين الجلسة",
      btnLogout: "تسجيل خروج آمن",
      authenticatedStatus: "تم التحقق من الجلسة ومطابقتها بنظام التشفير المركزي للبنك المركزي العراقي",
      tokenScope: "صلاحيات الرمز المميز",

      // Dec Submission Wizard
      wizardTitle: "معالج تقديم التصاريح الجمركية الموحد",
      wizardSub: "تقديم ومعالجة البيانات الجمركية المرتبطة إلكترونياً بنظام أسيكودا العالمي.",
      stepBasic: "المعلومات العامة",
      stepGoods: "البضائع والترميز الدولي",
      stepOcrDocs: "تحميل وقراءة المستندات ذكياً (OCR)",
      stepPaySign: "الدفع والتوقيع الرقمي",
      decNum: "رقم البيان الجمركي",
      decType: "نوع المعاملة الجمركية",
      importType: "استيراد إلى العراق",
      exportType: "تصدير من العراق",
      originCountry: "بلد المنشأ / التصدير",
      destPort: "منفذ الدخول الجمركي المستهدف",
      goodsDescription: "وصف شحنة البضائع بالتفصيل",
      hsCatalog: "تحديد الرمز الدولي المنسق (HS Code)",
      qtyValue: "الكمية الكلية والقيمة الفعلية بالدولار (USD)",
      calculateFees: "تشغيل محرك احتساب التعريفة الجمركية",
      calculatedCustomsDuty: "قيمة الرسوم الجمركية والضرائب المحتسبة (IQD)",
      exchangeRateFrozen: "سعر صرف الدينار المجمد المعتمد لدى البنك المركزي العراقي",

      // OCR
      ocrTitle: "المطابقة الإلكترونية من خلال الذكاء الاصطناعي (GC Vision API)",
      ocrDrop: "اسحب وأسقط فاتورة الشحن أو بوليصة التأمين الجمركي، أو اختر أحد النماذج الافتراضية للتحميل فورا:",
      ocrTemplate1: "الملء الآمن: استيراد سلع زراعية (منفذ إبراهيم الخليل)",
      ocrTemplate2: "الملء الآمن: استيراد معدات ثقيلة وخفيفة (ميناء أم قصر الجنوبي)",
      ocrScanning: "جاري تحليل المستندات ومطابقة الحقول بدقة جارية...",
      ocrSuccess: "تم تحليل الفاتورة بنجاح ومطابقة مستنداتها بنسبة ثقة بلغت 99.8%.",
      ocrStatus: "حالة المصادقة القرائية المستندية (MFA/OCR)",

      // Sign & Pay
      paymentTitle: "بوابة الدفع الإلكتروني لنظام التسوية الفورية (CBI RTGS)",
      pacs008hash: "تم تسوية البيان وإعداد المستند المالي pacs.008 الصادر للبنك المركزي العراقي",
      payBtn: "تصديق الدفع وتسوية الرسوم عبر نظام RTGS",
      signTitle: "التوقيع والختم الرقمي لمصلحة الجمارك والتاجر (PKI)",
      signDesc: "توقيع المستندات إلكترونياً بالاعتماد على التشفير القوي وإدارة المفاتيح داخل البنك المركزي.",
      signPin: "أدخل الرقم السري الآمن للتوقيع المشفر",
      signBtn: "التوقيع والتصديق الرقمي الكامل للطلب",
      signedLabel: "تم ختم وتصديق البيان جمركياً بترميز RSA-2048 بنجاح!",

      // Search & Filter
      searchTitle: "محرك البحث والفلترة الذكي (Elasticsearch)",
      searchPlaceholder: "ابحث فوراً بالرقم الجمركي، الرمز المنسق أو المنفذ الحدودي...",
      noResults: "لم يتم العثور على أي تسجيل مطابق في الفهرس الوطني.",

      // Customs Desk
      officerDeskTitle: "شاشة مراجع أول لضباط وأمناء الجمارك بالمنافذ",
      officerSub: "مراجعة وتدقيق ومعاينة الحاويات الفعلية لإنهاء معاملات التخليص والختم النهائي.",
      inspectBtn: "الموافقة المبدئية والطلب للمعاينة والفحص الفعلي",
      approveBtn: "إصدار وتصديق ختم الإفراج الجمركي الإلكتروني والنهائي",
      actionRemarks: "ملاحظات وتوجيهات الضابط المدقق",
      officerNotes: "تم فحص الشحنة ومطابقة الأوزان والأعداد المذكورة مع الفواتير الرسمية المعالجة. تم الإفراج.",

      // Ministry statistics
      ministryTitle: "المركز الوطني للبيانات والتحليلات الجمركية للمالية",
      ministrySub: "مراقبة الحركة التجارية، نسب الموانئ والمنافذ الفعّالة، وحجم الرسوم الجمركية المحصلة فوراً لحساب الدولة.",
      aggregateDuties: "إجمالي الرسوم المحصلة بالدينار العراقي (IQD)",
      inspectedRatio: "معدل معاينة وفحص الحاويات الفعلي",
      avgProcessingTime: "متوسط وقت إنجاز البيان والتخليص بكافة المنافذ",
      portErbil: "بوابة منفذ أربيل الجمركي",
      portUmmQasr: "ميناء أم قصر الجنوبي والبحري",
      portBaghdad: "منفذ الشحن الجوي لمطار بغداد الدولي",
      portSafwan: "منفذ سفوان الجمركي والبري (البصرة)",

      // Tracking and map
      trackingTitle: "بوابة الخدمات اللوجستية وتتبع الشاحنات الجغرافي",
      trackingSub: "تتبع فوري ومستمر لموقع الحاويات على الخريطة الوطنية باستخدام تقنيات تتبع المواقع والـ GPS.",
      currentLocation: "آخر نقطة جمركية موثقة للشحنة",
      gpsCoords: "إحداثيات الموقع (GPS)",
      statusStep1: "تم تسجيل وتدقيق المعاملة بنجاح",
      statusStep2: "تم تسوية ودفع الرسوم ببطاقة البنك المركزي",
      statusStep3: "نجاح الفحص الفعلي ومطابقة البضائع بالمعبر",
      statusStep4: "الموافقة على الإقرار الإلكتروني للضرائب والخدمات",
      statusStep5: "الخروج الفعلي والتسليم للجهات اللوجستية المختصة",

      // Mobile simulator
      mobileTitle: "تطبيق الهاتف المحمول الذكي للنوافذ العراقية الموحدة",
      mobileSub: "محاكاة كاملة للتطبيق الأصيل على نظامي iOS/Android مع ميزة إتمام المعاملات دون إنترنت.",
      offlineToggle: "محاكاة انقطاع الاتصال بالإنترنت في المنافذ الوعرة",
      offlineActive: "وضع عدم الاتصال بالشبكة مفعّل! سيتم حفظ البيانات في الداتابيس المحلية SQLite وتأجيل إرسالها.",
      offlineSynced: "تم تفعيل الاتصال ومزامنة البيانات وتفريغ طوابير المعاملات تلقائياً مع خوادم بغداد بنجاح!",
      localQueueCount: "عدد البيانات الجمركية المنتظرة في المعالجة المحلية للجهاز",

      // Notification logs
      notifPanel: "سجلات الإشعارات والتنبيهات المباشرة التلقائية",
      notifSub: "شاشة استعراض الإشعارات الفورية الصادرة للمستثمرين والأقسام عبر البريد والرسائل النصية والويب.",
      notifPlaceholder: "ابدأ باتخاذ الإجراءات في البوابات والصفحات الأخرى لتشهد توليد سجلات الأنظمة تلقائياً.",

      // Common button tags
      btnBack: "الخطوة السابقة",
      btnNext: "الخطوة التالية",
      btnRefresh: "تحديث البيانات المباشرة",
      statusLabel: "حالة الطلب"
    },
    ku: {
      selectRole: "گۆڕینی ڕووکاری بەکارهێنەری پەنجەرەی گشتی",
      importerExporter: "دەروازەی بازرگان و هاوردەکار/ناردنکاران (کەرتی تایبەت)",
      customsOfficer: "پانێڵی ئەفسەران و هۆبەی گومرگی عێراق (حکومی)",
      ministryOfficial: "داشبۆردی شیکاری و چاودێری وەزارەتی دارایی",
      logisticsCompany: "تەلارسازی و تتبع لۆجیستی بارەکان",
      mobileAppSim: "هاوشێوەکەری مۆبایلی نیشتمانی عێراق",

      // Auth Setup
      authTitle: "چوونەژوورەوەی یەکگرتووی نیشتمانی (OAuth2 + MFA)",
      authDesc: "هاوتاکردن و ناسینەوەی ناسنامەی کەسی لەگەڵ کارتی نیشتمانی عێراقی و داتابەیسی باری شارستانی.",
      merchantName: "ناوی بازرگان / کۆمپانیا مۆڵەتپێدراوەکە",
      nationalId: "ژمارەی کارتی نیشتمانی عێراقی / پاسپۆرت",
      mfaCode: "کۆدی دوو قۆناغی کاتی (MFA Authenticator)",
      mfaHelp: "تکایە کۆدی ٦ ژمارەیی بنوسە کە لەرێگەی کورتەنامەی SMS بۆ کۆدی موبایلی +964 نێردراوە یان لەسەر ئەپڵیکەیشن دروستکراوە.",
      btnLogin: "چوونەژوورەوەی پارێزراو بۆ نێو سیستم",
      btnLogout: "دەرچوون لە سیستم بە پارێزراوی",
      authenticatedStatus: "متمانەی دەستکاریکردن دراوە بەپێی کلیلە پارێزراوەکانی بانکی ناوەندی عێراق",
      tokenScope: "دەسەڵاتی بڕوانامە",

      // Dec Submission Wizard
      wizardTitle: "بزوێنەر و فۆرمی مۆڵەتنامەی گومرگی هۆشمەند",
      wizardSub: "سیستمی خۆکار بۆ تۆمارکردن و گرێدانی تەواوی زانیاری بار لەرێگەی ئاسیکۆدای جیهانی.",
      stepBasic: "زانیارییە گشتییەکان",
      stepGoods: "کاڵاکان و کۆدی جیهانی HS",
      stepOcrDocs: "بارکردن و خوێندنەوەی هۆشمەندی بەڵگەکان (OCR)",
      stepPaySign: "پارەدان و مۆری کۆپیکردن",
      decNum: "ژمارەی لێدوانی گومرگی",
      decType: "جۆری مامەڵەی هاوردە/ناردن",
      importType: "هاوردەکردن بۆ عێراق (Import)",
      exportType: "ناردنە دەرەوە لە عێراق (Export)",
      originCountry: "وڵاتی بنەڕەتی بەرهەم هێنان",
      destPort: "مەرز یان دەروازەی جێ ئامانج بۆ هاتنە ژوورەوە",
      goodsDescription: "شیکردنەوەی تەواوی بار و جۆری کاڵاکان",
      hsCatalog: "دیاریکردنی جۆری کۆدی کاڵا بەپێی سیستمی HS Code",
      qtyValue: "قەبارەی گشتی و نرخی خەمڵێندراو بە دۆلاری ئەمریکی ($)",
      calculateFees: "ئەنجامدانی خەمڵاندنی تێچووی گومرگی",
      calculatedCustomsDuty: "بڕی تێچووی رسوماتی گومرگی خەمڵێندراو بە دینار (IQD)",
      exchangeRateFrozen: "نرخی دیناری عێراقی بەستراو بەرامبەر دۆلار لە بانکی ناوەندی",

      // OCR
      ocrTitle: "خوێندنەوەی دیجیتاڵی بەڵگەنامەکان لەڕێگەی ژیری دەستکرد (GC Vision)",
      ocrDrop: "مەنفەستی بار، پسوڵەی کڕین یان مۆڵەتەکە لێرە دابنێ بۆ ئەوەی ڕاستەوخۆ بخوێندرێتەوە، یان یەکێک لە حیسابە نموونەییەکان هەڵبژێرە:",
      ocrTemplate1: "پڕکردنەوەی خۆکار: هاوردەی کاڵای کشتوکاڵی (مەرزی ئیبراهیم خەلیل)",
      ocrTemplate2: "پڕکردنەوەی خۆکار: هاوردەی ئامێری قورس و ئۆتۆمبێل (مەرزی ئوم قەسر)",
      ocrScanning: "پەیوەندیکردن بە سێرڤەری Google Cloud Vision...",
      ocrSuccess: "بەڵگەنامە تاقیکراوەکە بە تەواوی و بە ڕێژەی ٩٩.٨٪ بەسەرکەوتوویی خوێندرایەوە و زانیارییەکان ڕێکخران.",
      ocrStatus: "باری دڵنیابوونەوەی نیشانەکانی OCR",

      // Sign & Pay
      paymentTitle: "دروازەی پارەدانی سەرەکی بانکی ناوەندی عێراق (CBI RTGS)",
      pacs008hash: "مامەڵەکە بە تەواوی بەستراوەتەوە بە فایلی بانکی واژوکراوی pacs.008 بۆ بانکی ناوەندی عێراق",
      payBtn: "واژۆکردن و ناردنی حەواڵە لەرێگەی سیستمی فەرمی RTGS",
      signTitle: "واژۆی ئەلیکترۆنی و پاراستنی مەرزەکان لەرێگەی کلیلەکانی PKI",
      signDesc: "دانانی مۆری فەرمی ئەلیکترۆنی کە لەلایەن فەرمانگەی تەکنەلۆجیای کلیلە گشتییەکانەوە متمانەی پێدراوە.",
      signPin: "پین کۆدی پارێزراوی ئامێری واژۆکەرەکە بنوسە",
      signBtn: "واژۆکردن و مۆرکردنی فەرمی لێدوانەکە",
      signedLabel: "بەڵگەنامەکە بە سەرکەوتوویی بە کلیلی پارێزراوی RSA-2048 مۆرکرا!",

      // Search & Filter
      searchTitle: "سیستمی بەهێزی گەڕان و خشتەی گشتی بەهێزکراو بە Elasticsearch",
      searchPlaceholder: "گەڕانی خێرا بە ژمارەی گومرگی، کۆدی کاڵای گشتی یان مەرزی سنوری...",
      noResults: "هیچ گواستنەوە یان لێدوانێکی جێگیر نەدۆزرایەوە لەم کاتەدا لە فەهرەستدا.",

      // Customs Desk
      officerDeskTitle: "شاشەی وردبینی و مۆرکردنی ئەفسەرانی چاودێری گومرگی عێراق",
      officerSub: "وردبینی کردنی مەنفەستەکان و دەرکردنی مۆڵەتی کۆتایی بۆ بازرگانان بۆ هێنانە ژوورەوەی کاڵاکان.",
      inspectBtn: "ڕەوانەکردن بۆ هۆبەی پشکنینی فیزیایی بار",
      approveBtn: "پێدانی ئۆکەی کۆتایی و مۆرەکردنی دیجیتاڵی ئازادکردن",
      actionRemarks: "تێبینی فەرمی ئەفسەری وردبین",
      officerNotes: "کاڵای هاوردەکراو بە تەواوی لەگەڵ پسوڵەی باری فەرمی گونجاوە و وردبینی کرا بە غەیری کێشە.",

      // Ministry statistics
      ministryTitle: "ناوەندی گشتی زانیاری و شیکارەکانی دەروازەی نیشتمانی",
      ministrySub: "چاودێری کردنی تەواوی ئابوری عێراق، رسوماتی وەرگیراو و بارودۆخی دەروازە سنورییەکان لە لایەن وەزارەتی داراییەوە لە کاتی ڕاستەقینەدا.",
      aggregateDuties: "کۆی گشتی رسوماتی وەرگیراوی دارایی دەوڵەت (IQD)",
      inspectedRatio: "ڕێژەی کاڵاکانی نێردراو بۆ پشکنینی ڕاستەقینە",
      avgProcessingTime: "تێکڕای کاتی وردبینی رەسمی بارەکان لە دەروازەکاندا",
      portErbil: "دەروازەی ئیبراهیم خەلیل (هەولێر)",
      portUmmQasr: "دەروازەی دەریایی ئوم قەسر (بەسرە)",
      portBaghdad: "کۆگای باری فڕۆکەخانەی بەغداد (بەغداد)",
      portSafwan: "دەروازەی سنوری وشکانی سەفوان (باشور)",

      // Tracking and map
      trackingTitle: "سیستمی ناوخۆیی نیودەوڵەتی تتبع و چاودێری لۆجیستی بارەکان",
      trackingSub: "بینینی خشتە و شوێنی شاحنەکان لەڕێگەی GPS-GPS یەکگرتوو بە هاوئاهەنگی خشتەکانی چاودێری.",
      currentLocation: "دواین شوێنی جێگیربوونی تۆمارکراو لە مەرزەکان",
      gpsCoords: "پۆوتانە فیزیکییەکان (GPS)",
      statusStep1: "یاسای داواکاری تۆمارکراو پێداچوونەوە کرا",
      statusStep2: "پسوڵەی فەرمی یەکگرتوو پارە درا بە سەرکەوتوویی",
      statusStep3: "پشکنینی فیزیکی لە دەروازەی سنوری بە سەرکەوتوویی تێپەڕ بوو",
      statusStep4: "وازۆکردنی ئەلیکترۆنی و مۆڵەتی فەرمی عێراق پەسەند کرا",
      statusStep5: "کاڵاکان بە تەواوی ئازاد کران و بارگیران کۆتایی پێهات",

      // Mobile simulator
      mobileTitle: "ئەپڵیکەیشنی فەرمی نیشتمانی یەکگرتووی عێراق بۆ مۆبایل",
      mobileSub: "هاوشێوەکەری ئەپڵیکەیشنی موبایل بە توانای هێشتنەوەی زانیاری بێ ئینتەرنێت.",
      offlineToggle: "هاوشێوەکردنی نەبوونی هێڵی ئینتەرنێت لەسەر سنوورەکان",
      offlineActive: "باری دەرەوەی هێڵ چالاکە! زانراوەکان خەزن دەکرێن لەناو بنکەی ناوخۆیی SQLite.",
      offlineSynced: "هێڵی ئینتەرنێت گەڕایەوە! تەواوی مامەڵە خەزنکراوەکان ڕەوانەی بارەگای سەرەکی لە بەغدا کران بەسەرکەوتوویی.",
      localQueueCount: "ژمارەی لێدوانە تۆمارکراوەکان لەناو موبایلدا پاش نەبوونی ئینتەرنێت",

      // Notification logs
      notifPanel: "ناوەندی فەرمی تۆماری گشتی ئاگادارییەکان",
      notifSub: "بینینی ڕاستەوخۆی هەر کورتەنامەیەکی SMS یان ئیمەیڵ کە ئاڕاستەی هاووڵاتیان یان بازرگانەکان دەکرێت.",
      notifPlaceholder: "هەر کارێک بکەیت لە ناو پۆرتاڵەکان لێرە ئاگاداری ڕاستەوخۆی سیستمەکە دەکێشرێتەوە.",

      // Common button tags
      btnBack: "پێشووتر",
      btnNext: "هەنگاوی داهاتوو",
      btnRefresh: "نوێکردنەوەی داتاکان",
      statusLabel: "بارودۆخ"
    }
  };

  const t = dict[lang];
  const isRtl = lang === 'ar' || lang === 'ku';

  // State Management for Multi-Platform Simulator
  const [activeRole, setActiveRole] = useState<'trader' | 'officer' | 'ministry' | 'logistics' | 'mobile'>('trader');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authForm, setAuthForm] = useState({ traderName: "Al-Eshraq Al-Iraq LLC", nationalId: "N72839401", mfa: "583921" });
  
  // Declarations store (React state act as the cloud database core)
  const [declarations, setDeclarations] = useState<Declaration[]>([
    {
      id: "DEC-2026-8801",
      traderName: "Al-Eshraq Al-Iraq LLC",
      declarationNum: "IRQ-CUSTOMS-2026-8801",
      type: "IMPORT",
      origin: "DE",
      destination: "Umm Qasr South Sea Terminal",
      hsCode: "8703.23 (Passenger Cars < 3000cc)",
      goodsDesc: "12x Hybrid Passenger Sedan Cars, Model 2025",
      valueUsd: 284000,
      dutyIqd: 39760000, // 14% tariff duty roughly
      status: "APPROVED",
      ocrVerified: true,
      signatureSigned: true,
      paymentHash: "0x89abf2849102dd0db9038fcb28df6",
      trackingStep: 4,
    },
    {
      id: "DEC-2026-9204",
      traderName: "Sumer Trading Group",
      declarationNum: "IRQ-CUSTOMS-2026-9204",
      type: "IMPORT",
      origin: "TR",
      destination: "Erbil Gateway Node",
      hsCode: "1001.99 (Premium Hard Wheat Grain)",
      goodsDesc: "250 Metric Tons of Wheat Grain for Seed and Milling",
      valueUsd: 110000,
      dutyIqd: 1650000, // 1.5% agricultural reduced tax
      status: "CUSTOMS_REVIEW",
      ocrVerified: true,
      signatureSigned: true,
      paymentHash: "0x334bf0091823ababc90abef385bc88",
      trackingStep: 1,
    },
    {
      id: "DEC-2026-4402",
      traderName: "Rafidain Industrial Parts Corp",
      declarationNum: "IRQ-CUSTOMS-2026-4402",
      type: "IMPORT",
      origin: "CN",
      destination: "Umm Qasr South Sea Terminal",
      hsCode: "8471.30 (Portable Digital Processing Units)",
      goodsDesc: "450x Rugged Workstations with Custom Telemetry Chips",
      valueUsd: 185000,
      dutyIqd: 14800000,
      status: "PENDING_PAYMENT",
      ocrVerified: false,
      signatureSigned: false,
      trackingStep: 0,
    }
  ]);

  // Wizard active sub-step for submitting declarations
  const [wizardStep, setWizardStep] = useState<number>(0);
  
  // Submit Wizard Form Holder
  const [newDec, setNewDec] = useState({
    origin: "TR",
    destination: "Erbil Gateway Node",
    type: "IMPORT" as 'IMPORT' | 'EXPORT',
    description: "Agricultural Fresh Potato Cargo for Surchi Cold Storage",
    hsCode: "0701.90 (Potatoes, Fresh or Chilled, Food Sector)",
    quantityValueUsd: 45000,
    calculatedDuty: 450000, // 1% tax standard
    ocrFile: "" as string,
    isOcrScanning: false,
    isOcrDone: false,
    passphrasePin: "",
    isSigned: false,
    isPaid: false
  });

  // Selected Declaration for the Live Tracker or Officer Desk
  const [selectedDecId, setSelectedDecId] = useState<string>("DEC-2026-9204");
  
  // Elasticsearch Filter text
  const [elasticSearch, setElasticSearch] = useState<string>("");

  // Notification center alerts buffer
  const [notifications, setNotifications] = useState<string[]>([
    "System Initialized: Multi-region Iraqi Single Window nodes online.",
    "SMS Notification sent to Rafidain Corp: Payment Invoice generated for IRQ-CUSTOMS-2026-4402.",
    "Biometric Certificate signed for Al-Eshraq LLC via Erbil Core PKI Router."
  ]);

  // Mobile App offline state simulator
  const [mobileOffline, setMobileOffline] = useState<boolean>(false);
  const [mobileOfflineQueue, setMobileOfflineQueue] = useState<Declaration[]>([]);

  // Sound or Toast trigger utility
  const logNotification = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setNotifications(prev => [`[${timestamp}] ${msg}`, ...prev]);
  };

  // Run Custom OCR template populator
  const applyOcrTemplate = (type: 1 | 2) => {
    setNewDec(prev => ({
      ...prev,
      isOcrScanning: true
    }));
    logNotification("OCR Engine: Invoked Google Cloud Vision API for bill of lading document.");
    
    setTimeout(() => {
      if (type === 1) {
        setNewDec(prev => ({
          ...prev,
          origin: "TR",
          destination: "Erbil Gateway Node",
          description: "Premium Turkish Olive Oil Cargo & Canned Goods",
          hsCode: "1509.10 (Extra Virgin Olive Oil & Fractions, Certified)",
          quantityValueUsd: 78000,
          calculatedDuty: 3900000, // 5% tariff duty rate
          isOcrScanning: false,
          isOcrDone: true
        }));
        logNotification("OCR Engine parsed: Olive Oil Cargo, Originated: Turkey, Value: $78,000 USD, HS Code matched.");
      } else {
        setNewDec(prev => ({
          ...prev,
          origin: "DE",
          destination: "Umm Qasr South Sea Terminal",
          description: "4x Industrial Siemens Power Generator Transformers",
          hsCode: "8504.22 (Liquid Dielectric Transformers, Power Grid)",
          quantityValueUsd: 310000,
          calculatedDuty: 6200000, // 2.0% heavy machinery sovereign rate
          isOcrScanning: false,
          isOcrDone: true
        }));
        logNotification("OCR Engine parsed: Siemens Transformers, Originated: Germany, Value: $310,000 USD.");
      }
    }, 1200);
  };

  // Complete submission inside Wizard
  const handleWizardSubmit = () => {
    if (!newDec.isSigned) {
      alert("Please digitally sign and seal your statement using your cryptographic private keys first.");
      return;
    }

    const docId = `DEC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const docNum = `IRQ-CUSTOMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const freshDec: Declaration = {
      id: docId,
      traderName: authForm.traderName || "Anonymous Trader",
      declarationNum: docNum,
      type: newDec.type,
      origin: newDec.origin,
      destination: newDec.destination,
      hsCode: newDec.hsCode,
      goodsDesc: newDec.description,
      valueUsd: Number(newDec.quantityValueUsd),
      dutyIqd: Number(newDec.calculatedDuty),
      status: "PENDING_PAYMENT",
      ocrVerified: newDec.isOcrDone,
      signatureSigned: newDec.isSigned,
      trackingStep: 0
    };

    if (mobileOffline) {
      // Stack into SQLite mobile queue
      setMobileOfflineQueue(prev => [...prev, freshDec]);
      logNotification(`SQLite Cache: Declaration stored in local device queue due to border signal outage.`);
    } else {
      // Register directly in live state
      setDeclarations(prev => [freshDec, ...prev]);
      setSelectedDecId(docId);
      logNotification(`Customs Registry: Declaration ${docNum} registered successfully in the central Cloud Spanner node.`);
      logNotification(`SMS alert dispatched to trader (+96477011928): Declaration ${docNum} approved for taxation stage.`);
    }

    // Reset Wizard
    setNewDec({
      origin: "TR",
      destination: "Erbil Gateway Node",
      type: "IMPORT",
      description: "Agricultural Fresh Potato Cargo for Surchi Cold Storage",
      hsCode: "0701.90 (Potatoes, Fresh or Chilled, Food Sector)",
      quantityValueUsd: 45000,
      calculatedDuty: 450000,
      ocrFile: "",
      isOcrScanning: false,
      isOcrDone: false,
      passphrasePin: "",
      isSigned: false,
      isPaid: false
    });
    setWizardStep(0);
    alert(mobileOffline ? "Offline Storage: Saved in local DB queue." : "Submission Success: Dispatched to Single Window!");
  };

  // Trigger Local Sync when mobile gets internet again
  useEffect(() => {
    if (!mobileOffline && mobileOfflineQueue.length > 0) {
      logNotification("Network Sync: Internet signal retrieved. Synchronizing edge nodes with Baghdad...");
      setTimeout(() => {
        setDeclarations(prev => [...mobileOfflineQueue, ...prev]);
        logNotification(`Federated Sync complete. Transmitted ${mobileOfflineQueue.length} queued customs declarations.`);
        setMobileOfflineQueue([]);
        alert("Mobile App successfully synchronized with Iraq single window master ledger!");
      }, 1500);
    }
  }, [mobileOffline]);

  // Trigger payments simulation
  const executePayment = (id: string) => {
    setDeclarations(prev => prev.map(dec => {
      if (dec.id === id) {
        logNotification(`CBI RTGS: Settled fee of ${dec.dutyIqd.toLocaleString()} IQD for cargo: ${dec.goodsDesc}`);
        logNotification(`Audit Seal: Generated pacs.008 payment voucher. Vault transaction block signed.`);
        return {
          ...dec,
          status: 'PAID',
          paymentHash: `0x${Math.floor(1000000000000 + Math.random() * 9000000000000).toString(16)}`,
          trackingStep: 1
        };
      }
      return dec;
    }));
  };

  // Officer inspections
  const executeOfficerInspection = (id: string, notes: string) => {
    setDeclarations(prev => prev.map(dec => {
      if (dec.id === id) {
        logNotification(`Customs Inspector Desk: Completed container check at ${dec.destination}. Notes: ${notes}`);
        return {
          ...dec,
          status: 'CUSTOMS_REVIEW',
          trackingStep: 2
        };
      }
      return dec;
    }));
  };

  // Final Release seal
  const executeOfficerRelease = (id: string) => {
    setDeclarations(prev => prev.map(dec => {
      if (dec.id === id) {
        logNotification(`Customs Authority Release: Issued Final RSA-2048 seal of clearance for ${dec.declarationNum}.`);
        logNotification(`ASYCUDA World link: Automatically pushed clearance status code to UNCTAD server queue.`);
        return {
          ...dec,
          status: 'RELEASED',
          trackingStep: 5
        };
      }
      return dec;
    }));
  };

  // Filter declarations based on Elasticsearch simulation
  const filteredDeclarations = declarations.filter(dec => {
    const term = elasticSearch.toLowerCase();
    return (
      dec.declarationNum.toLowerCase().includes(term) ||
      dec.goodsDesc.toLowerCase().includes(term) ||
      dec.destination.toLowerCase().includes(term) ||
      dec.hsCode.toLowerCase().includes(term) ||
      dec.traderName.toLowerCase().includes(term)
    );
  });

  const selectedDec = declarations.find(d => d.id === selectedDecId) || declarations[0];

  return (
    <div className="space-y-6" id="interactive-nsw-portal-simulation-root">
      
      {/* Platform Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              {lang === 'en' ? "Tactile Simulation" : lang === 'ar' ? "المحاكاة التفاعلية الحية" : "تاقیکردنەوەی کارامەی دەستی"}
            </span>
            <h2 className="text-xl font-sans font-extrabold text-white mt-2 tracking-tight">
              {lang === 'en' && "Iraq Single Window Portal Sandbox"}
              {lang === 'ar' && "مختبر بوابات النافذة الوطنية العراقية الموحدة"}
              {lang === 'ku' && "ناوچەی تاقیکردنەوەی دەروازەی نیشتمانی عێراق"}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {lang === 'en' && "Test live high-fidelity interfaces across private and government sectors. Check compliance, map telemetry, and run payment gateways."}
              {lang === 'ar' && "اختبر الواجهات التفاعلية مباشرة عبر القطاعين العام والخاص. راقب عمليات التدقيق والمطابقة، بوابات التخليص، وقنوات الدفع."}
              {lang === 'ku' && "تاقیکردنەوەی لایەنی پەیوەندیدار بە بازرگانان و ئەندامانی پشکنینی گومرگ بە توانای دڵنیابوونەوەی سیستم لێرەدا."}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
            <span className="text-[10px] uppercase font-mono px-2 text-slate-500">{lang === 'en' ? "Status" : lang === 'ar' ? "الحالة" : "دۆخ"}</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {lang === 'en' ? "LIVE DEMO" : lang === 'ar' ? "تطبيق حي" : "مۆدێلی زیندان"}
            </span>
          </div>
        </div>

        {/* Dynamic Platform interface tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 border-t border-slate-800 pt-5">
          {[
            { id: 'trader', label: t.importerExporter, icon: <FileText className="w-4 h-4" /> },
            { id: 'officer', label: t.customsOfficer, icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'ministry', label: t.ministryOfficial, icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'logistics', label: t.logisticsCompany, icon: <MapPin className="w-4 h-4" /> },
            { id: 'mobile', label: t.mobileAppSim, icon: <Smartphone className="w-4 h-4" /> },
          ].map(role => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id as any)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeRole === role.id 
                  ? 'bg-emerald-600 text-slate-950 font-bold border-emerald-400 font-sans shadow-lg shadow-emerald-500/10 scale-[1.02]' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="mb-1">{role.icon}</div>
              <span className="text-[10px] sm:text-xs font-sans font-bold leading-tight truncate w-full px-1">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sandbox Viewport panel (left) & Live Audit system logs (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* VIEWPORT GRID COLUMN (Left - 8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* ========================================================== */}
          {/* TRADER PORTAL SUB-VIEWPORT */}
          {/* ========================================================== */}
          {activeRole === 'trader' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              {/* Header Info */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-900/30 flex items-center justify-center border border-emerald-500/30">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-sans font-extrabold text-white">
                    {lang === 'en' ? "Merchant Trade Submission Hub" : lang === 'ar' ? "بوابة المستوردين والمخلصين الجمركيين" : "دەروازەی چونی فەرمی بازرگانان و بەڕێوەبەران"}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {lang === 'en' ? "Submit trade declarations, inspect duty estimates, scan bills of lading with OCR, and sign using GDC Sovereign PKI." 
                     : lang === 'ar' ? "قم بتقديم البيانات الموحدة، واحتساب الرسوم مسبقاً، واختبار المسح الذكي لشهادات الاستيراد والتوقيع." 
                     : "تۆمارکردنی بار، خوێندنەوەی پسوڵەی کڕین، بینینی رسومات و واژۆی ئەلیکترۆنی متمانەپێکراو."}
                  </p>
                </div>
              </div>

              {/* Submission Wizard Form Steps Flow layout */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">{t.wizardTitle}</span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {lang === 'en' ? `Step ${wizardStep + 1} of 4` : lang === 'ar' ? `خطوة ${wizardStep + 1} من 4` : `هەنگاوی ${wizardStep + 1} لە کۆی ٤`}
                  </span>
                </div>

                {/* Bullet Indicators */}
                <div className="grid grid-cols-4 gap-2">
                  {[t.stepBasic, t.stepGoods, t.stepOcrDocs, t.stepPaySign].map((st, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded transition-all ${
                        wizardStep >= i ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                {/* STEP 1: General Info */}
                {wizardStep === 0 && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      {t.stepBasic}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.merchantName}</label>
                        <input 
                          type="text" 
                          value={authForm.traderName} 
                          onChange={(e) => setAuthForm({...authForm, traderName: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.decType}</label>
                        <select 
                          value={newDec.type} 
                          onChange={(e) => setNewDec({...newDec, type: e.target.value as any})}
                          className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                        >
                          <option value="IMPORT">{t.importType}</option>
                          <option value="EXPORT">{t.exportType}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.originCountry}</label>
                        <select 
                          value={newDec.origin}
                          onChange={(e) => setNewDec({...newDec, origin: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                        >
                          <option value="DE">Germany (DE) - EU</option>
                          <option value="TR">Turkey (TR) - Middle East</option>
                          <option value="CN">China (CN) - Asia</option>
                          <option value="JO">Jordan (JO) - Arab</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.destPort}</label>
                        <select 
                          value={newDec.destination}
                          onChange={(e) => setNewDec({...newDec, destination: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                        >
                          <option value="Erbil Gateway Node">{t.portErbil}</option>
                          <option value="Umm Qasr South Sea Terminal">{t.portUmmQasr}</option>
                          <option value="Baghdad Cargo Depot">{t.portBaghdad}</option>
                          <option value="Safwan Land Boundary Terminal">{t.portSafwan}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Goods & HS Codes */}
                {wizardStep === 1 && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      {t.stepGoods}
                    </h4>

                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.goodsDescription}</label>
                      <textarea 
                        rows={2}
                        value={newDec.description}
                        onChange={(e) => setNewDec({...newDec, description: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.hsCatalog}</label>
                        <input 
                          type="text" 
                          value={newDec.hsCode}
                          onChange={(e) => setNewDec({...newDec, hsCode: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">{t.qtyValue}</label>
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            value={newDec.quantityValueUsd}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setNewDec({
                                ...newDec, 
                                quantityValueUsd: val,
                                calculatedDuty: Math.floor(val * 1450 * 0.12) // roughly 12% in IQD with frozen CBI rate
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none"
                          />
                          <span className="bg-slate-800 px-3 py-2 text-xs text-slate-300 rounded flex items-center font-bold">USD</span>
                        </div>
                      </div>
                    </div>

                    {/* Valuation Panel */}
                    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">{t.exchangeRateFrozen}</span>
                        <span className="font-mono text-white font-bold">1,450 IQD = $1 USD</span>
                      </div>
                      <div className="flex justify-between text-xs border-t border-slate-800/60 pt-2 font-sans font-bold">
                        <span className="text-emerald-400">{t.calculatedCustomsDuty}</span>
                        <span className="font-mono text-emerald-400">{newDec.calculatedDuty.toLocaleString()} IQD</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: OCR Document Upload */}
                {wizardStep === 2 && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        {t.ocrTitle}
                      </h4>
                      <span className="text-[9px] bg-purple-950/80 border border-purple-500/30 text-purple-400 px-2 py-0.5 rounded font-mono font-bold uppercase">google vision ai</span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      {t.ocrDrop}
                    </p>

                    {/* Template Fast Options */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => applyOcrTemplate(1)}
                        className="flex-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 py-2 px-3 rounded hover:bg-slate-800 text-left cursor-pointer truncate"
                      >
                        🌾 {t.ocrTemplate1}
                      </button>
                      <button 
                        onClick={() => applyOcrTemplate(2)}
                        className="flex-1 bg-slate-900 border border-slate-800 text-[10px] text-slate-300 py-2 px-3 rounded hover:bg-slate-800 text-left cursor-pointer truncate"
                      >
                        ⚙️ {t.ocrTemplate2}
                      </button>
                    </div>

                    {/* Visual drag dropzone representation */}
                    <div className="border border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden bg-slate-900/20">
                      {newDec.isOcrScanning ? (
                        <div className="space-y-3 z-10 py-4">
                          <RefreshCcw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                          <p className="text-xs text-slate-300 font-mono italic animate-pulse">{t.ocrScanning}</p>
                        </div>
                      ) : newDec.isOcrDone ? (
                        <div className="space-y-3 z-10 py-2">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <p className="text-xs text-white font-bold">{t.ocrSuccess}</p>
                          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 block w-max mx-auto">
                            Verifications Block ID: GCV-992-IRQ
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 z-10">
                          <Upload className="w-8 h-8 text-slate-600 mx-auto" />
                          <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                            {lang === 'en' ? "Drag document files or click to upload" : lang === 'ar' ? "قم بإسقاط الملفات أو الفواتير هنا" : "فایلەکە بخزێنە ناو ئەم بازنەیە بۆ خوێندنەوە"}
                          </span>
                          <span className="text-[10px] text-slate-500 block">PDF, PNG, JPG (Max 15MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 4: Payment & Digital Signatures */}
                {wizardStep === 3 && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    
                    {/* Digital signing widget */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5Right">
                          <PenTool className="w-4 h-4 text-emerald-400" />
                          {t.signTitle}
                        </h4>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/20">PKI RSA-2048</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{t.signDesc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-8">
                          <input 
                            type="password" 
                            placeholder={t.signPin}
                            value={newDec.passphrasePin}
                            onChange={(e) => setNewDec({...newDec, passphrasePin: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-800 text-xs text-white p-2.5 rounded focus:border-emerald-500/50 outline-none" 
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <button 
                            onClick={() => {
                              if (!newDec.passphrasePin) {
                                alert("Please enter secure PIN code first!");
                                return;
                              }
                              setNewDec({...newDec, isSigned: true});
                              logNotification(`PKI Stamp: Signed and sealed manifest hash using trader biometric key N99283-SSO.`);
                            }}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-sans text-xs font-bold py-2.5 px-3 rounded transition-all cursor-pointer"
                          >
                            {t.signBtn}
                          </button>
                        </div>
                      </div>

                      {newDec.isSigned && (
                        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded p-2 text-xs text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>{t.signedLabel}</span>
                        </div>
                      )}
                    </div>

                    {/* Summary cost */}
                    <div className="border-t border-slate-800 pt-4 space-y-2">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">{lang === 'en' ? "ESTIMATED TOTAL SETTLEMENT" : lang === 'ar' ? "إجمالي المبلغ المطلوب للتسوية" : "کۆی گشتی تێچوی قەرەبووکردنەوە"}</span>
                      <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800">
                        <div>
                          <p className="text-xs text-slate-400 font-sans tracking-tight">{newDec.description}</p>
                          <span className="text-[9px] text-slate-500 block font-mono">HS: {newDec.hsCode}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-white font-mono">{newDec.calculatedDuty.toLocaleString()} IQD</p>
                          <span className="text-[10px] text-slate-500 block font-mono">${newDec.quantityValueUsd.toLocaleString()} USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Back and Next Controls buttons */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                  <button
                    disabled={wizardStep === 0}
                    onClick={() => setWizardStep(prev => prev - 1)}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold py-2 px-4 rounded transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {t.btnBack}
                  </button>

                  {wizardStep < 3 ? (
                    <button
                      onClick={() => setWizardStep(prev => prev + 1)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold py-2 px-5 rounded transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{t.btnNext}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleWizardSubmit}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-sans font-extrabold py-2 px-6 rounded transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      {lang === 'en' ? "Dispatch to National Single Window" : lang === 'ar' ? "إرسال إلى ديوان النافذة الوطنية" : "ناردنی کۆتایی بۆ بەغدا"}
                    </button>
                  )}
                </div>

              </div>

              {/* Existing Submissions List search filter engine (Elasticsearch visual) */}
              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-sans font-extrabold text-white uppercase tracking-wider">{t.searchTitle}</h4>
                    <p className="text-[10px] text-slate-500">{lang === 'en' ? "Federated customs records linked to Sovereign cloud partition." : lang === 'ar' ? "سجلات جمركية موثقة بقسم التخزين السحابي السيادي." : "تۆماری گشتی خێرا بە سیستمی هاوکات."}</p>
                  </div>
                  
                  {/* Elasticsearch selector inputs */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder={t.searchPlaceholder}
                      value={elasticSearch}
                      onChange={(e) => setElasticSearch(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-white p-2 pl-8 pr-3 rounded w-full sm:w-60 text-[11px] placeholder:text-slate-600 outline-none focus:border-emerald-500/40 font-sans"
                    />
                  </div>
                </div>

                {/* Grid Lists */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {filteredDeclarations.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs italic">{t.noResults}</div>
                  ) : filteredDeclarations.map(dec => (
                    <div 
                      key={dec.id}
                      onClick={() => {
                        setSelectedDecId(dec.id);
                        logNotification(`Selection: Focused inspection viewport of registry item: ${dec.declarationNum}`);
                      }}
                      className={`p-3 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                        selectedDecId === dec.id 
                          ? 'bg-slate-950 border-emerald-500/40 shadow-md' 
                          : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-[11px]">{dec.declarationNum}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            dec.status === 'RELEASED' || dec.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10' :
                            dec.status === 'PENDING_PAYMENT' ? 'bg-amber-950 text-amber-500 border border-amber-500/10' : 'bg-blue-950 text-blue-400 border border-blue-500/10'
                          }`}>
                            {dec.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-tight mt-0.5">{dec.goodsDesc}</p>
                        <div className="flex items-center gap-3 text-[9px] text-slate-500 font-mono">
                          <span>{lang === 'en' ? "Origin" : lang === 'ar' ? "المصدر" : "سەرچاوە"}: {dec.origin}</span>
                          <span>•</span>
                          <span>{dec.destination}</span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono font-bold block text-slate-300">{dec.dutyIqd.toLocaleString()} IQD</span>
                        <span className="text-[9px] text-slate-600 block font-mono">${dec.valueUsd.toLocaleString()} USD</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* CUSTOMS OFFICER SUB-VIEWPORT */}
          {/* ========================================================== */}
          {activeRole === 'officer' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/30 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-sans font-extrabold text-white">
                    {t.officerDeskTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.officerSub}
                  </p>
                </div>
              </div>

              {/* Selection Focus details */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider">{lang === 'en' ? "Under Auditing View" : lang === 'ar' ? "قيد التدقيق حالياً" : "لەژێر دڵنیابوونەوەدایە"}</span>
                    <h4 className="text-sm font-mono font-bold text-white mt-1">{selectedDec.declarationNum}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedDec.traderName}</p>
                  </div>

                  <span className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded font-bold border ${
                    selectedDec.status === 'RELEASED' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' :
                    selectedDec.status === 'PENDING_PAYMENT' ? 'bg-amber-950/80 border-amber-500/30 text-amber-500' :
                    'bg-blue-950/80 border-blue-500/30 text-blue-400'
                  }`}>
                    {selectedDec.status}
                  </span>
                </div>

                {/* Cargo breakdown specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase mb-1">{lang === 'en' ? "Detailed Goods Cargo" : lang === 'ar' ? "السلع والمحتويات التفصيلية" : "مەنفەستی کاڵامەکان"}</span>
                    <p className="text-slate-200 bg-slate-900 p-2.5 rounded border border-slate-900 min-h-12 leading-relaxed">{selectedDec.goodsDesc}</p>
                  </div>
                  
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold uppercase mb-1">{lang === 'en' ? "Verification Telemetry" : lang === 'ar' ? "بيانات التحقق والمطابقة" : "پسوڵەی دڵنیایی"}</span>
                    <div className="space-y-1.5 bg-slate-900 p-2.5 rounded border border-slate-900">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">{t.ocrStatus}</span>
                        <span className={`font-mono font-bold ${selectedDec.ocrVerified ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {selectedDec.ocrVerified ? "VERIFIED (100%)" : "MISSING_OCR_DOCS"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] border-t border-slate-800/60 pt-1.5">
                        <span className="text-slate-400">{lang === 'en' ? "Digital Cryptographic Signature" : lang === 'ar' ? "التوقيع الرقمي للتاجر" : "واژۆی دیجیتاڵ"}</span>
                        <span className={`font-mono font-bold ${selectedDec.signatureSigned ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {selectedDec.signatureSigned ? "SIGNED_OK" : "UNSIGNED_STAMP"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Values and calculated costs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-900 p-3 rounded text-center border border-slate-900">
                    <span className="text-[9px] uppercase text-slate-500 font-mono block mb-1">{lang === 'en' ? "FOB Dollar Value" : lang === 'ar' ? "القيمة بالدولار" : "نرخی دۆلار"}</span>
                    <span className="text-xs font-mono font-bold text-white">${selectedDec.valueUsd.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded text-center border border-slate-900">
                    <span className="text-[9px] uppercase text-slate-500 font-mono block mb-1">{lang === 'en' ? "Duty Tariff (IQD)" : lang === 'ar' ? "التعريفة الكلية بالدينار" : "رسوماتی گومرگ دینار"}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{selectedDec.dutyIqd.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-slate-900 p-3 rounded text-center border border-slate-900">
                    <span className="text-[9px] uppercase text-slate-500 font-mono block mb-1">{lang === 'en' ? "Customs Node Terminal" : lang === 'ar' ? "المنفذ الحدودي" : "دەروازەی مۆرەکە"}</span>
                    <span className="text-[10px] font-bold text-slate-300 truncate block leading-tight pt-0.5">{selectedDec.destination}</span>
                  </div>
                </div>

                {/* Operational actions blocks */}
                <div className="border-t border-slate-900 pt-4 space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">{t.actionRemarks}</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Inspections match specifications. Cleared for release."
                      defaultValue={t.officerNotes}
                      className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 p-2.5 rounded focus:border-emerald-500/40 outline-none" 
                    />
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap gap-3">
                    {selectedDec.status === 'PENDING_PAYMENT' ? (
                      <div className="flex-1 bg-amber-950/20 text-center py-3 px-4 rounded border border-amber-500/20 text-xs text-amber-500 flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{lang === 'en' ? "Waiting for RTGS wire payment settlement in Bank" : lang === 'ar' ? "بانتظار تسوية الرسوم البنكية الجمركية أولاً" : "چاوەڕوانی پارە متمانەپێکراوەکەیە لە دەسەڵاتی بانکی"}</span>
                      </div>
                    ) : (
                      <>
                        <button
                          disabled={selectedDec.status === 'RELEASED'}
                          onClick={() => executeOfficerInspection(selectedDec.id, "Tires, safety ratings verified successfully at Erbil boundary.")}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-3 rounded transition-all cursor-pointer disabled:opacity-40"
                        >
                          🔍 {t.inspectBtn}
                        </button>

                        <button
                          disabled={selectedDec.status === 'RELEASED'}
                          onClick={() => {
                            executeOfficerRelease(selectedDec.id);
                            alert(`Final Sovereign Release Seal issued for declaration: ${selectedDec.declarationNum}`);
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-sans font-extrabold py-2.5 px-3 rounded transition-all cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-40 disabled:pointer-events-none"
                        >
                          🖋️ {t.approveBtn}
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* MINISTRY MONITORING DASHBOARD (with Custom Recharts-like SVG charts) */}
          {/* ========================================================== */}
          {activeRole === 'ministry' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-992/10 flex items-center justify-center border border-emerald-500/25">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-sans font-extrabold text-white">
                      {t.ministryTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {t.ministrySub}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => logNotification("Data Refreshed: Synchronized regional statistics across GDC nodes.")}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 cursor-pointer text-xs"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Three Executive stat widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">{t.aggregateDuties}</span>
                  <p className="text-base font-mono font-extrabold text-white">
                    {(declarations.reduce((acc, current) => acc + current.dutyIqd, 0) + 214700000).toLocaleString()} IQD
                  </p>
                  <div className="text-[9px] text-emerald-400 font-mono">+8.4% {lang === 'en' ? "Increase from past quarter" : lang === 'ar' ? "زيادة ملحوظة عن الربع الماضي" : "زیادبوونی دارایی ئەم چارەکە"}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">{t.inspectedRatio}</span>
                  <p className="text-base font-mono font-extrabold text-white">14.2%</p>
                  <div className="text-[9px] text-slate-400 font-sans">{lang === 'en' ? "WCO standard recommendation: 10%-15%" : lang === 'ar' ? "النسبة المستهدفة الموصى بها جمركیاً" : "ڕێژەی پێشنیارکراوی سەلامەتی نێودەوڵەتی"}</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">{t.avgProcessingTime}</span>
                  <p className="text-base font-mono font-extrabold text-white">3.8 Hours</p>
                  <div className="text-[9px] text-emerald-400 font-mono">-14 Hours {lang === 'en' ? "Reduction from manual systems" : lang === 'ar' ? "تقليص هائل عن النظم الورقية" : "کاتی گواستنەوەی کەمکراو"}</div>
                </div>
              </div>

              {/* High-Contrast Beautiful SVG Custom Line Graph & Pie Graph representation */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                
                {/* Visual Line Graph (Trade throughput values) */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">{lang === 'en' ? "Customs Volume Stream (Millions USD)" : lang === 'ar' ? "تدفق الحركة التجارية الإجمالية (مليون دولار)" : "ئاڕاستەی قەبارەی بازرگانی (ملیۆن دۆلار)"}</h4>
                    <span className="text-[9px] font-mono text-slate-500">Jan - Jun 2026</span>
                  </div>

                  {/* SVG Canvas Line graph */}
                  <div className="relative pt-4">
                    <svg viewBox="0 0 500 180" className="w-full h-44 overflow-visible">
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="60" x2="500" y2="60" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="105" x2="500" y2="105" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#1e293b" strokeWidth="1" />

                      {/* Line graph shadow */}
                      <path 
                        d="M0 150 Q75 120, 150 90 T300 45 T450 25 L500 25 L500 150 Z" 
                        fill="url(#emerald-gradient)" 
                        opacity="0.1" 
                      />

                      {/* Actual Line path */}
                      <path 
                        d="M0 130 C75 110, 150 80, 225 60 C300 45, 375 55, 450 15 L500 15" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                      />

                      {/* Animated circles */}
                      <circle cx="225" cy="60" r="5" fill="#10b981" stroke="#020617" strokeWidth="2" />
                      <circle cx="450" cy="15" r="5" fill="#10b981" stroke="#020617" strokeWidth="2 animate-pulse" />

                      {/* X labels */}
                      <text x="5" y="170" fill="#64748b" className="text-[9px] font-mono">Jan</text>
                      <text x="100" y="170" fill="#64748b" className="text-[9px] font-mono">Feb</text>
                      <text x="200" y="170" fill="#64748b" className="text-[9px] font-mono">Mar</text>
                      <text x="300" y="170" fill="#64748b" className="text-[9px] font-mono">Apr</text>
                      <text x="400" y="170" fill="#64748b" className="text-[9px] font-mono">May</text>
                      <text x="475" y="170" fill="#ec4899" className="text-[9px] font-mono">Jun (Est)</text>

                      {/* Definitions */}
                      <defs>
                        <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Regional Share distribution doughnut chart representation */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 md:col-span-4 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">{lang === 'en' ? "Gateway Port Share" : lang === 'ar' ? "توزيع الإيرادات جغرافياً" : "دابەشبوونی فەرمی مەرزەکان"}</h4>
                  
                  <div className="space-y-3 font-sans">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-slate-200">{t.portUmmQasr}</span>
                        <span className="font-mono font-bold text-white">58%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded">
                        <div className="bg-emerald-500 h-2 rounded" style={{ width: '58%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-slate-200">{t.portErbil}</span>
                        <span className="font-mono font-bold text-white">24%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded">
                        <div className="bg-blue-400 h-2 rounded" style={{ width: '24%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-slate-200">{t.portBaghdad}</span>
                        <span className="font-mono font-bold text-white">12%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded">
                        <div className="bg-amber-500 h-2 rounded" style={{ width: '12%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-slate-200">{t.portSafwan}</span>
                        <span className="font-mono font-bold text-white">6%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded">
                        <div className="bg-fuchsia-500 h-2 rounded" style={{ width: '6%' }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* LOGISTICS & SHIPMENT REAL-TIME TRACKER MAP */}
          {/* ========================================================== */}
          {activeRole === 'logistics' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-992/10 flex items-center justify-center border border-emerald-500/25">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-sans font-extrabold text-white">
                    {t.trackingTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {t.trackingSub}
                  </p>
                </div>
              </div>

              {/* Grid map split with tracking timeline details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Simulated Google Maps SVG widget */}
                <div className="md:col-span-7 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500 uppercase">{lang === 'en' ? "Sovereign GPS Map Proxy" : lang === 'ar' ? "توزيع الإحداثيات السيادي" : "نەخشەی فەرمی چاودێری"}</span>
                    <span className="text-emerald-400">Google Maps Enterprise Platform</span>
                  </div>

                  {/* SVG map representation of Iraq major trade points */}
                  <div className="relative bg-[#020617] border border-slate-900 rounded-lg h-60 w-full overflow-hidden flex items-center justify-center">
                    
                    {/* Simplified geometric outline of Iraqi borders */}
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-slate-900 fill-slate-950 stroke-slate-800 stroke-[0.8] opacity-70">
                      <path d="M 20,40 Q 30,15 50,15 Q 70,10 82,30 T 90,65 T 60,90 T 30,85 T 10,65 Z" fill="#090d16" />
                      {/* Baghdad (center) */}
                      <circle cx="55" cy="52" r="1.5" fill="#f43f5e" />
                      {/* Basra / Umm Qasr (south) */}
                      <circle cx="80" cy="78" r="1.5" fill="#10b981" />
                      {/* Erbil (north) */}
                      <circle cx="62" cy="22" r="1.5" fill="#3b82f6" />
                      {/* Rutba (west) */}
                      <circle cx="22" cy="55" r="1.5" fill="#eab308" />
                    </svg>

                    {/* Coordinates Overlay dots */}
                    <div className="absolute top-[20%] left-[55%] flex flex-col items-center">
                      <span className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-blue-400 px-1 py-0.2 rounded font-bold shadow whitespace-nowrap">Erbil Node</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping absolute top-[4px]"></span>
                    </div>

                    <div className="absolute top-[48%] left-[45%] flex flex-col items-center">
                      <span className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-rose-400 px-1 py-0.2 rounded font-bold shadow whitespace-nowrap">Baghdad Hub</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute top-[4px]"></span>
                    </div>

                    <div className="absolute bottom-[20%] left-[70%] flex flex-col items-center">
                      <span className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-emerald-400 px-1 py-0.2 rounded font-bold shadow whitespace-nowrap">Umm Qasr Port</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse absolute top-[4px]"></span>
                    </div>

                    {/* Cargo Simulated Dynamic Route marker */}
                    <div className="absolute bottom-[35%] left-[58%] flex flex-col items-center">
                      <span className="text-[8px] font-mono bg-pink-950 border border-pink-500/30 text-pink-400 px-1 py-0.2 rounded font-bold shadow whitespace-nowrap animate-bounce font-mono">
                        🚛 CARGO-SEDAN
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping absolute top-[6px]"></span>
                    </div>
                  </div>
                </div>

                {/* Tracking status progression stepper */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[9px] uppercase font-mono text-slate-500 font-bold block mb-1">{t.currentLocation}</span>
                    <p className="text-xs font-bold text-white font-sans">{selectedDec.destination}</p>
                    <span className="text-[10px] font-mono text-emerald-400 block mt-1">{t.gpsCoords}: 30.0401° N, 47.9238° E</span>
                  </div>

                  {/* Stepper items vertically */}
                  <div className="space-y-4 pt-2">
                    {[
                      { step: 0, desc: t.statusStep1 },
                      { step: 1, desc: t.statusStep2 },
                      { step: 2, desc: t.statusStep3 },
                      { step: 3, desc: t.statusStep4 },
                      { step: 5, desc: t.statusStep5 },
                    ].map((stepMap, idx) => {
                      const isComplete = selectedDec.trackingStep !== undefined && selectedDec.trackingStep >= stepMap.step;
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 text-[9px] font-mono font-bold ${
                            isComplete 
                              ? 'bg-emerald-600 text-slate-950 border-emerald-400' 
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className={`text-xs font-sans ${isComplete ? 'text-white font-bold' : 'text-slate-500'}`}>
                              {stepMap.desc}
                            </p>
                            <span className="text-[9px] text-slate-600 block font-mono">
                              {isComplete ? "VERIFIED PROTOCOL BLOCK" : "PENDING STAGE AUDIT"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* NATIVE MOBILE APP DEVICE SIMULATOR */}
          {/* ========================================================== */}
          {activeRole === 'mobile' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-992/10 flex items-center justify-center border border-emerald-500/25">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-sans font-extrabold text-white">
                      {t.mobileTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {t.mobileSub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Offline control switch */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                    {mobileOffline ? <WifiOff className="w-4 h-4 text-rose-500" /> : <Wifi className="w-4 h-4 text-emerald-400" />}
                    {t.offlineToggle}
                  </span>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {lang === 'en' ? "Simulate poor connection behavior inside high-altitude border checks." : lang === 'ar' ? "اختبار انقطاع الاتصال عند الحدود الجبلية أو المعابر الصعبة." : "تاقیکردنەوەی باری ناوخۆیی بێ ئینتەرنێت لەسەر سنورە قورسەکان."}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setMobileOffline(prev => !prev);
                    logNotification(`Offline Simulator: Toggled network signal to status: ${!mobileOffline ? "OFFLINE" : "ONLINE"}`);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-sans font-bold transition-all cursor-pointer ${
                    mobileOffline 
                      ? 'bg-rose-600 text-white font-sans' 
                      : 'bg-emerald-600 text-slate-950 font-sans'
                  }`}
                >
                  {mobileOffline ? "OFFLINE ARTIFACTS" : "ONLINE CONNECTED"}
                </button>
              </div>

              {/* Virtual Smartphone viewport mockup */}
              <div className="flex justify-center pt-2">
                <div className="w-full max-w-sm rounded-[40px] border-4 border-slate-800 bg-slate-950 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]">
                  
                  {/* Speaker Ear Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                    <div className="w-12 h-1 bg-slate-950 rounded-full"></div>
                  </div>

                  {/* Inner Mobile content */}
                  <div className="space-y-4 pt-4 flex-1 flex flex-col justify-start">
                    
                    {/* Top status bar info */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-b border-slate-900 pb-2">
                      <span>CBI-Secure VPN Network</span>
                      <div className="flex items-center gap-1">
                        {mobileOffline ? (
                          <span className="text-rose-500 flex items-center gap-1">
                            <WifiOff className="w-3 h-3" />
                            OFFLINE
                          </span>
                        ) : (
                          <span className="text-emerald-500 flex items-center gap-1">
                            <Wifi className="w-3 h-3" />
                            4G SECURE
                          </span>
                        )}
                        <span>10:45 AM</span>
                      </div>
                    </div>

                    {/* Notification Warning banner in Offline Mode */}
                    {mobileOffline && (
                      <div className="bg-rose-950/40 border border-rose-500/20 text-rose-400 p-2.5 rounded-lg text-center space-y-1">
                        <AlertTriangle className="w-4 h-4 text-center mx-auto" />
                        <p className="text-[10px] font-sans font-bold leading-tight">{t.offlineActive}</p>
                      </div>
                    )}

                    {/* Main Interface: Form Quick Input */}
                    <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-900">
                      <h4 className="text-[11px] font-sans font-extrabold text-white text-center tracking-tight border-b border-slate-800 pb-2 flex items-center justify-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                        {lang === 'en' ? "Simulate Mobile Declaration" : lang === 'ar' ? "فحص لوحة البيان المتنقلة" : "لێدوانی فەرمی مۆبایل"}
                      </h4>

                      <div className="space-y-2 text-[10px] font-sans">
                        <div>
                          <label className="text-slate-500 font-bold block mb-0.5">{lang === 'en' ? "Destination Port Location" : lang === 'ar' ? "موقع الخروج الملاحي" : "مەرزی بار"}</label>
                          <select 
                            value={newDec.destination}
                            onChange={(e) => setNewDec({...newDec, destination: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 text-[10px] text-white p-2 rounded outline-none"
                          >
                            <option value="Erbil Gateway Node">Erbil Terminal</option>
                            <option value="Umm Qasr South Sea Terminal">Umm Qasr Sea</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-slate-500 font-bold block mb-0.5">{lang === 'en' ? "Cargo Brief" : lang === 'ar' ? "ملخص البضائع" : "پوختەی بار"}</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-950 border border-slate-800 text-[10px] text-white p-2 rounded outline-none"
                            placeholder="e.g. 5x Electric Cables boxes"
                            value={newDec.description}
                            onChange={(e) => setNewDec({...newDec, description: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-500 font-bold block mb-0.5">{lang === 'en' ? "Value USD" : lang === 'ar' ? "القيمة بالدولار" : "نرخی دۆلار"}</label>
                            <input 
                              type="number" 
                              className="w-full bg-slate-950 border border-slate-800 text-[10px] text-white p-2 rounded outline-none"
                              value={newDec.quantityValueUsd}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setNewDec({
                                  ...newDec,
                                  quantityValueUsd: val,
                                  calculatedDuty: Math.floor(val * 1450 * 0.12)
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-slate-500 font-bold block mb-0.5">Duty (IQD)</label>
                            <span className="w-full bg-slate-950/80 border border-slate-900 text-[10px] text-emerald-400 p-2 rounded block font-mono font-bold">
                              {newDec.calculatedDuty.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Digital Biometric stamp toggle */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-slate-400 text-[9px]">{lang === 'en' ? "Sign with Mobile Secure Keypad?" : lang === 'ar' ? "التوقيع برقم البصمة الآمن؟" : "واژۆ لەرێگەی پین مۆبایل؟"}</span>
                          <button
                            onClick={() => {
                              setNewDec({ ...newDec, isSigned: true });
                              logNotification("Mobile PKI Secure Enclave: Authenticated cryptographic fingerprint successfully.");
                            }}
                            className={`px-2 py-1 text-[9px] font-bold rounded cursor-pointer ${
                              newDec.isSigned ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {newDec.isSigned ? "SIGNED" : "USE BIOMETRICS"}
                          </button>
                        </div>

                        <button
                          onClick={handleWizardSubmit}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-sans font-bold text-xs py-2 px-3 rounded mt-3 cursor-pointer"
                        >
                          {mobileOffline 
                            ? "Save in Mobile SQLite Local Queue" 
                            : "Transmit securely to Baghdad Server"}
                        </button>
                      </div>
                    </div>

                    {/* Queue length tag indicators */}
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-900 text-[10px] space-y-1 text-center">
                      <span className="text-slate-500 font-bold uppercase">{t.localQueueCount}</span>
                      <p className="text-sm font-mono font-extrabold text-white">{mobileOfflineQueue.length}</p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* AGENCY LIVE AUDIT LOGS COLUMN (Right - 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Unified Notification center panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-xs font-sans font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Bell className="w-4 h-4 text-emerald-400" />
                {t.notifPanel}
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">
                {t.notifSub}
              </p>
            </div>

            {/* List entries */}
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {notifications.map((not, idx) => (
                <div key={idx} className="p-3 rounded bg-slate-950 border border-slate-900 text-[10px] space-y-1 select-none font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold uppercase tracking-wide font-mono">
                      {not.includes("SMS") ? "SMS NOTIFIER" : not.includes("OCR") ? "OCR VISION ENGINE" : "SINGLE-WINDOW GENERAL CORE"}
                    </span>
                    <span className="text-[9px] text-[#475569] font-mono">Verified Node</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans mt-1">{not}</p>
                </div>
              ))}
            </div>

            {/* Trigger actions template buttons */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold block">{lang === 'en' ? "Simulate External Alarms" : lang === 'ar' ? "إطلاق الإنذارات الخارجية يدوياً" : "هاوشێوەکردنی ئاگادارکردنەوە فەرمییەکان"}</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    logNotification("CRITICAL ALERT: Biometric validation mismatch reported on Erbil Edge router node #2.");
                    alert("Simulated Sovereign Security Event Logged!");
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-[10px] text-rose-400 p-2 rounded-lg border border-slate-900 text-left transition-all cursor-pointer truncate"
                >
                  ⚠️ Security Mismatch
                </button>
                <button
                  onClick={() => {
                    logNotification("CBI Network Sync: Completed hourly RTGS collection bank synchronization loop.");
                    alert("Simulated Bank Payment Sync Logged!");
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-[10px] text-emerald-400 p-2 rounded-lg border border-slate-900 text-left transition-all cursor-pointer truncate"
                >
                  🏦 RTGS CBI Loop
                </button>
              </div>
            </div>

          </div>

          {/* Quick Informational Sandbox manual */}
          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5">
              <Landmark className="w-5 h-5 text-emerald-400" />
              {lang === 'en' ? "Sovereign Portal Guide" : lang === 'ar' ? "دليل تشغيل المنظومة الموحد" : "ڕێبەری گشتی پەنجەرەکە"}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'en' && "All actions are simulated locally within React state context securely proxying standard ASYCUDA World specifications. Any action taken in the Importer step immediately feeds the Customs Inspection desk, GPS tracking logs maps, and visual Ministry charts."}
              {lang === 'ar' && "يتم محاكاة كافة هذه العمليات والبيانات بموجب وثائق ومعايير نظام أسيكودا المعتمد دولياً. أي بيان تقدمه كتاجر سيقوم فوراً بتغذية قائمة مراجعة الضابط، تحليلات الوزارات المباشرة، وتفاصيل التتبع الجغرافي للشاحنة."}
              {lang === 'ku' && "تەواوی سەرچاوەکان لێرەدا هاوتەریب کراونەتەوە بەپێی سیستمی جیهانی ئاسیکۆدا. هەر کردارێک بکەیت لێرەدا ڕاستەوخۆ دەگوێزرێتەوە بۆ فۆڕمی ئەفسەر، داشبۆردی وەزارەت و چاودێری گشتی لۆجیستی بارەکان."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
