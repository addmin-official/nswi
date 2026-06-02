import { useState } from 'react';
import { 
  Database, 
  Table2, 
  KeyRound, 
  ShieldAlert, 
  Copy, 
  Check, 
  Server, 
  LineChart, 
  TrendingUp, 
  History, 
  GitFork, 
  Globe2, 
  FileCheck2,
  FileCode,
  DatabaseZap,
  RefreshCw,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface DatabaseSchemaViewerProps {
  lang: Language;
}

// 1. DATA MODELS & SCHEMAS FOR THE EXPLORER
interface SchemaField {
  name: string;
  type: string;
  key: 'PK' | 'FK' | 'NONE';
  ref?: string;
  arabicName: string;
  kurdishName: string;
  pii: boolean;
  descEn: string;
  descAr: string;
  descKu: string;
}

interface TableModel {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  type: 'SQL (Spanner/PG)' | 'NoSQL (MongoDB/Firestore)';
  columns: SchemaField[];
  ddl: string;
}

const DATABASE_TABLES: TableModel[] = [
  {
    id: 'tbl_ministries',
    name: 'nsw_ministries',
    descriptionEn: 'Stores registered Federal Ministries & Port Authorities as tenant partitions, supporting isolated multi-tenancy.',
    descriptionAr: 'يخزن الوزارات الاتحادية وسلطات الموانئ المسجلة كأقسام مستأجرين، مما يدعم تعدد المستأجرين المعزول.',
    descriptionKu: 'وەزارەتە فیدراڵییەکان و دەسەڵاتەکانی بەندەر تۆمار دەکات، کە پشتگیری لە جیاکاری فرە-تەنانەت دەکات.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_ministries (
    ministry_id VARCHAR(36) PRIMARY KEY,
    ministry_code VARCHAR(10) UNIQUE NOT NULL, -- e.g., 'MOH', 'MOF', 'COSQC'
    name_en VARCHAR(150) NOT NULL,
    name_ar VARCHAR(150) NOT NULL,
    name_ku VARCHAR(150) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED
    api_key_vault_ref VARCHAR(255) NOT NULL, -- Vault reference to encrypted api-keys
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    columns: [
      { name: 'ministry_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف الوزارة', kurdishName: 'ناسنامەی وەزارەت', pii: false, descEn: 'Unique UUID key.', descAr: 'رمز معرّف فريد.', descKu: 'ناسنامەی بێهاوتای UUID.' },
      { name: 'ministry_code', type: 'VARCHAR(10)', key: 'NONE', arabicName: 'رمز الوزارة', kurdishName: 'کۆدی وەزارەت', pii: false, descEn: 'Short unique code (MOH, MOA, CBI).', descAr: 'رمز فريد قصير للوزارة.', descKu: 'کۆدی کورتی بێهاوتای وەزارەت.' },
      { name: 'name_en', type: 'VARCHAR(150)', key: 'NONE', arabicName: 'الاسم بالإنكليزية', kurdishName: 'ناو بە ئینگلیزی', pii: false, descEn: 'English translation.', descAr: 'الاسم باللغة الإنكليزية.', descKu: 'ناو بە زمانی ئینگلیزی.' },
      { name: 'name_ar', type: 'VARCHAR(150)', key: 'NONE', arabicName: 'الاسم بالعربية', kurdishName: 'ناو بە عەرەبی', pii: false, descEn: 'Required Arabic translation.', descAr: 'الاسم باللغة العربية (إلزامي).', descKu: 'ناو بە زمانی عەرەبی (پێویست).' },
      { name: 'name_ku', type: 'VARCHAR(150)', key: 'NONE', arabicName: 'الاسم بالكردية', kurdishName: 'ناو بە کوردی', pii: false, descEn: 'Required Kurdish translation.', descAr: 'الاسم باللغة الكردية (إلزامي).', descKu: 'ناو بە زمانی کوردی (پێویست).' },
      { name: 'api_key_vault_ref', type: 'VARCHAR(255)', key: 'NONE', arabicName: 'مرجع مفتاح API المشفر', kurdishName: 'کۆدی کلیلی API', pii: true, descEn: 'Reference pointer to encrypted Vault key.', descAr: 'مؤشر مشفر لبيانات المفاتيح السرية في الخزنة.', descKu: 'ئاماژەکەر بۆ کلیلی نهێنی لە سندوقی پارێزراودا.' }
    ]
  },
  {
    id: 'tbl_users',
    name: 'nsw_users',
    descriptionEn: 'Manages user accounts, including custom ministry clearance officers and clearing agents, with structural PII encryption.',
    descriptionAr: 'يدير حسابات المستخدمين، بما في ذلك ضباط التدقيق بالوزارات والمخلصين الجمركيين، مع تشفير البيانات الشخصية المهمة (PII).',
    descriptionKu: 'هەژماری بەکارهێنەران بەڕێوەدەبات، بە فەرمانبەرانی وەزارەت و بریکارەکانی گومرگەوە، لەگەڵ تشفێری زانیاری کەسی.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_users (
    user_id VARCHAR(36) PRIMARY KEY,
    ministry_id VARCHAR(36) REFERENCES nsw_ministries(ministry_id),
    username VARCHAR(100) UNIQUE NOT NULL,
    email_encrypted BYTEA NOT NULL, -- PII Encryption Layer (AES-GCM-256)
    full_name_encrypted BYTEA NOT NULL, -- PII Encryption Layer (AES-GCM-256)
    role VARCHAR(30) NOT NULL, -- ADMIN, AUDITOR, CLEARING_AGENT, INSPECTOR_OFFICER
    signature_cert_ref VARCHAR(255), -- Secure Hash reference to electronic signature
    status VARCHAR(20) DEFAULT 'ACTIVE'
);`,
    columns: [
      { name: 'user_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف المستخدم', kurdishName: 'ناسنامەی بەکارهێنەر', pii: false, descEn: 'Unique primary UUID.', descAr: 'رمز معرّف المستخدم الفريد.', descKu: 'ناسنامەی بێهاوتای بەکارهێنەر.' },
      { name: 'ministry_id', type: 'VARCHAR(36)', key: 'FK', ref: 'nsw_ministries', arabicName: 'معرّف الوزارة', kurdishName: 'ناسنامەی وەزارەت', pii: false, descEn: 'Tenant reference points.', descAr: 'مفتاح خارجي للربط مع الوزارة.', descKu: 'ناسنامەی وەزارەتی سەر بەم بەکارهێنەرە.' },
      { name: 'email_encrypted', type: 'BYTEA', key: 'NONE', arabicName: 'البريد الإلكتروني المشفر', kurdishName: 'ئیمەیڵی تەنککراو', pii: true, descEn: 'Encrypted email string (AES-256).', descAr: 'البريد الإلكتروني مشفر لحماية الخصوصية (AES-256).', descKu: 'ئیمەیڵی بەکارهێنەر تەنکراوە بۆ پاراستنی کەسی.' },
      { name: 'full_name_encrypted', type: 'BYTEA', key: 'NONE', arabicName: 'الاسم الثلاثي المشفر', kurdishName: 'ناوی سێ کانی تەنککراو', pii: true, descEn: 'Encrypted full name (AES-256).', descAr: 'الاسم الكامل للمستخدم مشفر بالكامل لنظام الأمن والسيادة.', descKu: 'ناوی تەواوی بەکارهێنەر کە بە تەواوی پارێزراوە.' },
      { name: 'role', type: 'VARCHAR(30)', key: 'NONE', arabicName: 'الصلاحية والوظيفة', kurdishName: 'ڕۆڵی بەکارهێنەر', pii: false, descEn: 'Permission string.', descAr: 'صلاحيات المستخدم الوظيفية بالنافذة.', descKu: 'دەسەڵاتی کارکردنی فەرمانبەر لە ناو سیستمەکەدا.' }
    ]
  },
  {
    id: 'tbl_declarations',
    name: 'nsw_declarations',
    descriptionEn: 'The core transactional table storing Import/Export Single Administrative Documents (SAD) with currency mappings.',
    descriptionAr: 'الجدول الرئيسي للمعاملات، حيث تُخزن البيانات الجمركية الموحدة (SAD) للاستيراد والتصدير مع تفاصيل العملات.',
    descriptionKu: 'خشتەی سەرەکی مامەڵەکانە، بەڵگە جومرگییە گشتگیرەکان (SAD) بۆ هاوردە و ناردن لەگەڵ نرخەکانی دراو لێرە پاشەکەوت دەکرێن.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_declarations (
    declaration_id VARCHAR(36) PRIMARY KEY,
    ref_number VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'IQ-BG-2026-67912'
    office_code VARCHAR(10) NOT NULL, -- Customs border post (ZAH, UM_QASR, SAF)
    declaration_type VARCHAR(10) CHECK (declaration_type IN ('IMPORT', 'EXPORT')),
    declarant_id VARCHAR(36) REFERENCES nsw_users(user_id),
    importer_tax_id VARCHAR(30) NOT NULL, -- Iraqi Tax Authority link
    total_invoice_amount DECIMAL(18, 4) NOT NULL,
    invoice_currency VARCHAR(3) NOT NULL, -- IQD, USD, EUR
    exchange_rate_to_iqd DECIMAL(12, 6) NOT NULL, -- Frozen CBI exchange rate
    status VARCHAR(30) DEFAULT 'SUBMITTED', -- DRAFT, SUBMITTED, PENDING_INSPECTION, CLEARED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    columns: [
      { name: 'declaration_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف البيان', kurdishName: 'ناسنامەی ڕاگەیەندراو', pii: false, descEn: 'Primary UUID index.', descAr: 'معرّف لوحة البيان.', descKu: 'ناسنامەی سەرەکی ڕاگەیەندراو.' },
      { name: 'ref_number', type: 'VARCHAR(50)', key: 'NONE', arabicName: 'رقم المرجع الموحد', kurdishName: 'ژمارەی سەرەکی نیشتمانی', pii: false, descEn: 'Global unique tracker (IQ-BG-YYYY-XXXXX)', descAr: 'الرقم المرجعي الوطني الموحد بالتسلسل الجمركي عالي الأمان.', descKu: 'کۆدی بازرگانی نیشتمانی فەرمی.' },
      { name: 'office_code', type: 'VARCHAR(10)', key: 'NONE', arabicName: 'رمز معبر النفوذ الجمركي', kurdishName: 'کۆدی خاڵی سنوری', pii: false, descEn: 'Border post acronym (ZAH, UM_QASR, SAF).', descAr: 'رمز المنفذ الحدودي (زاخو، أم قصر، سفوان).', descKu: 'کۆدی مەرز یان بەندەر.' },
      { name: 'total_invoice_amount', type: 'DECIMAL(18, 4)', key: 'NONE', arabicName: 'القيمة الإجمالية للفاتورة', kurdishName: 'کۆی گشتی پارەی کاڵاکان', pii: false, descEn: 'Value of transaction.', descAr: 'المبلغ الإجمالي المصرح به في الفاتورة التجارية.', descKu: 'کۆی پارەی فاکتۆری بازرگانی.' },
      { name: 'invoice_currency', type: 'VARCHAR(3)', key: 'NONE', arabicName: 'رمز العملة المصرحة', kurdishName: 'جۆری دراو', pii: false, descEn: 'Iraqi Dinar (IQD), USD, or EUR.', descAr: 'عملة الفواتير المصرحة (دينار عراقي أو دولار أو يورو).', descKu: 'دراوەکە (IQD یان USD یان EUR).' },
      { name: 'exchange_rate_to_iqd', type: 'DECIMAL(12, 6)', key: 'NONE', arabicName: 'سعر صرف الدينار', kurdishName: 'نرخی گۆڕینەوە بە دینار', pii: false, descEn: 'Official conversion rate from Central Bank.', descAr: 'سعر الصرف الرسمي المعتمد من البنك المركزي العراقي لحظة التسجيل.', descKu: 'نرخی فەرمی بانکی ناوەندی لە کاتی تۆمارکردندا.' }
    ]
  },
  {
    id: 'tbl_customs',
    name: 'nsw_customs_documents',
    descriptionEn: 'SAD sub-elements integrating with ASYCUDA World SQL tables mapping customs values and classification codes.',
    descriptionAr: 'مستندات جمركية تفصيلية متكاملة مع جداول نظام أسيكودا المعتمد عالمياً، توضح القيمة الجمركية وتصنيف التعرفة البنكية.',
    descriptionKu: 'بەڵگە گومرگییەکان کە هاوتەریبە لەگەڵ سیستمی جیهانی ئاسیکۆدا، جۆری کاڵاکان و ڕێژەی مۆڵەتی گومرگی ڕوون دەکاتەوە.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_customs_documents (
    customs_doc_id VARCHAR(36) PRIMARY KEY,
    declaration_id VARCHAR(36) REFERENCES nsw_declarations(declaration_id),
    asycuda_sad_ref VARCHAR(50) NOT NULL, -- Real ASYCUDA document key
    customs_valuation DECIMAL(18, 4) NOT NULL,
    duty_payable DECIMAL(18, 4) NOT NULL,
    harmonized_tariff_code VARCHAR(12) NOT NULL, -- HS Code reference
    container_count INT DEFAULT 1,
    cargo_manifest_blob_id VARCHAR(100), -- Reference pointer to NoSQL Document Storage
    cryptographic_signature TEXT NOT NULL -- Integrity seal
);`,
    columns: [
      { name: 'customs_doc_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف المستند الجمركي', kurdishName: 'ناسنامەی فایلی گومرگی', pii: false, descEn: 'Customs internal doc ID.', descAr: 'معرّف فريد للمستند الجمركي.', descKu: 'ناسنامەی فایلی گومرگ.' },
      { name: 'declaration_id', type: 'VARCHAR(36)', key: 'FK', ref: 'nsw_declarations', arabicName: 'معرّف البيان', kurdishName: 'ناسنامەی ڕاگەیەندراو', pii: false, descEn: 'Relational link to master SAD.', descAr: 'رابط مباشر مع لوحة البيان الموحد.', descKu: 'بەستەری سەرەکی بە ڕاگەیەندراو.' },
      { name: 'asycuda_sad_ref', type: 'VARCHAR(50)', key: 'NONE', arabicName: 'مرجع أسيكودا الجمركي المعتمد', kurdishName: 'کۆدی گومرگی ئاسیکۆدا', pii: false, descEn: 'Key matching the UNCTAD database.', descAr: 'الرقم المرجعي للبيان المسجل بنظام أسيكودا التابع للأمم المتحدة.', descKu: 'ژمارەی فەرمی لە سیستمی ئاسیکۆدادا.' },
      { name: 'harmonized_tariff_code', type: 'VARCHAR(12)', key: 'NONE', arabicName: 'الترميز الجمركي المتناسق (HS)', kurdishName: 'کۆدی کاڵای نێودەوڵەتی (HS GROUP)', pii: false, descEn: 'Standard International HS Code.', descAr: 'ترميز النظام المنسق للسلع وتحديد الرسوم الجمركية والضرائب.', descKu: 'کۆدی جیهانی تایبەت بە پۆلێنکردنی جۆری کاڵاکان.' }
    ]
  },
  {
    id: 'tbl_health',
    name: 'nsw_health_certificates',
    descriptionEn: 'Ministry of Health sanitation, quarantine, and vaccine sample checklists, integrating with SQL tables for border clearance clearance.',
    descriptionAr: 'الفحوصات الصحية لوزارة الصحة، والحجر الصحي، وتفاصيل الأغذية المستوردة، والتي يربط جدولها مباشرة بالموافقة الجمركية.',
    descriptionKu: 'پشکنینە تەندروستییەکانی وەزارەتی تەندروستی عێراق، کە ڕاستەوخۆ دەبەسترێتەوە بە مۆڵەتی بەندەرەوە.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_health_certificates (
    certificate_id VARCHAR(36) PRIMARY KEY,
    declaration_id VARCHAR(36) REFERENCES nsw_declarations(declaration_id),
    issuing_lab_id VARCHAR(36) NOT NULL,
    test_result_status VARCHAR(20) CHECK (test_result_status IN ('PENDING', 'PASSED', 'FAILED')),
    microbiological_test_ref VARCHAR(100), -- Reference to Lab equipment details
    authorized_by_encrypted BYTEA NOT NULL, -- PII Encryption Layer
    expiry_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    columns: [
      { name: 'certificate_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف الشهادة الصحية', kurdishName: 'ناسنامەی بەڵگەی تەندروستی', pii: false, descEn: 'Primary UUID index.', descAr: 'الرقم التسلسلي لشهادة الصحة وصلاحية الأغذية والأدوية.', descKu: 'ناسنامەی بەڵگەی فەرمی پزیشکی.' },
      { name: 'declaration_id', type: 'VARCHAR(36)', key: 'FK', ref: 'nsw_declarations', arabicName: 'معرّف البيان', kurdishName: 'ناسنامەی ڕاگەیەندراو', pii: false, descEn: 'Relational link to master SAD.', descAr: 'مفتاح خارجي للربط بالبيان الجمركي الفعال.', descKu: 'بەستراوە بە مۆڵەتە سەرەکییەکەوە.' },
      { name: 'test_result_status', type: 'VARCHAR(20)', key: 'NONE', arabicName: 'حالة نتيجة الفحص المخبري', kurdishName: 'ئەنجامی پشکنینی پزیشکی', pii: false, descEn: 'PASSED, FAILED, or PENDING.', descAr: 'حالة الفحص المخبري (مقبول، مرفوض، قيد المراجعة).', descKu: 'ئەنجامی پشکنین (پەسەند، ڕەتکراوە، چاوەڕوانکراو).' }
    ]
  },
  {
    id: 'tbl_COSQC',
    name: 'nsw_quality_inspections',
    descriptionEn: 'COSQC (Central Organization for Standardization and Quality Control) inspection logs representing Iraqi industrial standards testing.',
    descriptionAr: 'سجلات التفتيش والسيطرة النوعية (COSQC) للتحقق من سلامة الأجهزة والمواد ومطابقتها للمواصفات القياسية العراقية.',
    descriptionKu: 'پشکنینی كۆنترۆڵی جۆری عێراقی (COSQC) بۆ گەرەنتی کردنی سەلامەتی ئامێر و کەلوپەلەکان بەپێی ستاندردەکان.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_quality_inspections (
    inspection_id VARCHAR(36) PRIMARY KEY,
    declaration_id VARCHAR(36) REFERENCES nsw_declarations(declaration_id),
    inspector_id VARCHAR(36) REFERENCES nsw_users(user_id),
    checked_standards TEXT NOT NULL, -- List of Iraqi IQS Codes tested
    is_compliant BOOLEAN DEFAULT TRUE,
    rejection_reason_ar TEXT,
    rejection_reason_ku TEXT,
    secured_digital_qr_ref VARCHAR(255), -- Certified verification point
    inspected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
    columns: [
      { name: 'inspection_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف التفتيش النوعي', kurdishName: 'ناسنامەی پشکنینی کۆنترۆڵ', pii: false, descEn: 'Inspection UUID.', descAr: 'رقم الفحص الفني والتقييس العراقي.', descKu: 'ناسنامەی فەرمی پشکنەر.' },
      { name: 'checked_standards', type: 'TEXT', key: 'NONE', arabicName: 'المعايير والرموز القياسية المفحوصة', kurdishName: 'یاساکانی ستانداردی عێراقی', pii: false, descEn: 'Iraqi Quality Standard codes tested.', descAr: 'أكواد المقارنة مع المواصفات القياسية العراقية التي جرى فحص الشحنة بموجبها.', descKu: 'ستاندردە جۆراوجۆرە پشکنراوەکانی عێراق.' }
    ]
  },
  {
    id: 'tbl_payments',
    name: 'nsw_payment_records',
    descriptionEn: 'Auditable payments routed through the Central Bank of Iraq RTGS under ISO 20022 clearing.',
    descriptionAr: 'قيود الدفع والرسوم المستحصلة بالتوافق مع البنك المركزي العراقي ونظام التسويات في الوقت الفعلي (RTGS/ISO 20022).',
    descriptionKu: 'تۆمارەکانی پارەدان کە لە ڕێگەی بانکی ناوەندی عێراقەوە ڕوون دەکرێتەوە بەپێی سیستمی نێودەوڵەتی ISO 20022.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_payment_records (
    payment_id VARCHAR(36) PRIMARY KEY,
    declaration_id VARCHAR(36) REFERENCES nsw_declarations(declaration_id),
    receipt_reference VARCHAR(50) UNIQUE NOT NULL,
    paying_bank_swift VARCHAR(11) NOT NULL, -- SWIFT/BIC of routing bank
    pacs_message_ref VARCHAR(100) NOT NULL, -- ISO 20022 XML pacs.008 message hash
    amount_iqd DECIMAL(18, 4) NOT NULL,
    exchange_markup DECIMAL(10, 4) DEFAULT 0.0,
    cleared_at_cbi TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CLEARED' -- INITIATED, CBI_CLEARED, UNIFIED_RECONCILED
);`,
    columns: [
      { name: 'payment_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف الدفع', kurdishName: 'ناسنامەی پارەدان', pii: false, descEn: 'Payment UUID index.', descAr: 'معرف عملية السداد المالي.', descKu: 'ناسنامەی بێهاوتای پارەدان.' },
      { name: 'pacs_message_ref', type: 'VARCHAR(100)', key: 'NONE', arabicName: 'هاش رسالة الدفع ISO 20022', kurdishName: 'کۆدی پارەداری نێودەوڵەتی', pii: false, descEn: 'ISO 20022 pacs.008 document reference.', descAr: 'البصمة الرقمية للرسالة البرقية المغادرة للبنك المركزي العراقي.', descKu: 'کۆدی پشتڕاستکردنەوەی پەیامی pacs.008 فەرمی.' },
      { name: 'amount_iqd', type: 'DECIMAL(18, 4)', key: 'NONE', arabicName: 'القيمة بالدينار العراقي', kurdishName: 'کۆی گشتی بە دیناری عێراقی', pii: false, descEn: 'Iraqi Dinar nominal clearing.', descAr: 'المبلغ المستقطع بالدينار العراقي رسمياً.', descKu: 'برەی پارەکە بە دیناری فەرمی عێراقی.' }
    ]
  },
  {
    id: 'tbl_logistics',
    name: 'nsw_logistics_tracking',
    descriptionEn: 'Real-time GPS boundary crossings and gateway events, combining relational keys with telemetry details.',
    descriptionAr: 'تتبع حركة ومواقع الشاحنات والعبور البري والبحري عند البوابات والمنافذ، مع تخزين معلومات الإحداثيات والوقت الجغرافي.',
    descriptionKu: 'داتای فەرمی چاودێریکردنی کاڵاکان و ئۆتۆمبێلەکان لە کاتی بەزاندنی مەرزەکان بە لای ئۆنلاین.',
    type: 'SQL (Spanner/PG)',
    ddl: `CREATE TABLE nsw_logistics_tracking (
    tracking_id VARCHAR(36) PRIMARY KEY,
    declaration_id VARCHAR(36) REFERENCES nsw_declarations(declaration_id),
    current_border_gate VARCHAR(50) NOT NULL, -- e.g., 'Safwan Core Alpha', 'Ibrahim Khalil Gate'
    carrier_company_encrypted BYTEA NOT NULL, -- PII Encryption Layer
    gps_latitude DECIMAL(10, 8),
    gps_longitude DECIMAL(11, 8),
    gate_in_timestamp TIMESTAMP WITH TIME ZONE,
    gate_out_timestamp TIMESTAMP WITH TIME ZONE,
    scanner_inspection_pass BOOLEAN DEFAULT TRUE
);`,
    columns: [
      { name: 'tracking_id', type: 'VARCHAR(36)', key: 'PK', arabicName: 'معرّف التتبع', kurdishName: 'ناسنامەی چاودێری', pii: false, descEn: 'Logistics tracking UUID.', descAr: 'الرقم التسلسلي لبطاقة التتبع اللوجستي الجمركي.', descKu: 'کۆدی چاودێری دەروازە.' },
      { name: 'current_border_gate', type: 'VARCHAR(50)', key: 'NONE', arabicName: 'اسم معبر تسيير الشاحنة', kurdishName: 'ناوی دەروازەی سنووری', pii: false, descEn: 'Border post gate descriptive location.', descAr: 'اسم البوابة أو الممر المحدد (مثال: سفوان - المنطقة أ).', descKu: 'ناوی دەرگا فەرمییەکە لە مەرزدا.' }
    ]
  },
  {
    id: 'tbl_nosql_audit',
    name: 'nsw_immutable_audits (Audit Core Ledger)',
    descriptionEn: 'Tamper-proof, blockchain-adjacent ledger stored in SQL or MongoDB reflecting active row updates, encrypted with CBI SHA-256 state stamps.',
    descriptionAr: 'دفتر حسابات مشفر ومقاوم للتلاعب لتسجيل أي تعديل في البيانات الجمركية مع الحفاظ على القيمة الرمزية السابقة واللاحقة بالتوقيع المركزي العراقي.',
    descriptionKu: 'تۆماری فەرمی گۆڕانکاری داتا بۆ ڕێگری لە گەندەڵی بە بەکارهێنانی مۆری حیساباتی فەرمی سەربە مۆهرکردنی سیستەم.',
    type: 'NoSQL (MongoDB/Firestore)',
    ddl: `// Stored as individual Immutable Audit Documents in MongoDB
{
  "_id": "ObjectId('647f12e9b062140a3f81e1dd')",
  "timestamp": "2026-06-02T01:57:42Z",
  "actor_user_id": "usr_9921c-43f1-b992",
  "actor_ministry_code": "MOF-CUSTOMS",
  "client_ip_address": "10.12.180.45",
  "operation_type": "UPDATE_DECLARATION_STATUS",
  "database_table": "nsw_declarations",
  "record_primary_key": "dec_8811e-990a-c213",
  "previous_state_hash": "a4b64f128c9b20e0e...",
  "updated_fields": {
    "status": { "old": "PENDING_INSPECTION", "new": "CLEARED" },
    "exchange_rate_to_iqd": { "old": 1310.00, "new": 1310.00 }
  },
  "cbi_hsm_signature": "MEQCIFz8v6eW3f1O0qPebp9Wz5V..." // Crypto Signature from Central Bank Key Vault
}`,
    columns: [
      { name: '_id', type: 'ObjectId', key: 'PK', arabicName: 'معرّف اللوج الفريد', kurdishName: 'ناسنامەی لۆگی پشتڕاستکەرەوە', pii: false, descEn: 'MongoDB document primary index.', descAr: 'المعرف الفريد للمستند غير القابل للتطويع.', descKu: 'ناسنامەی بێهاوتای لۆگی NoSQL.' },
      { name: 'actor_user_id', type: 'VARCHAR(36)', key: 'FK', ref: 'nsw_users', arabicName: 'معرّف المستخدم الفاعل', kurdishName: 'ناسنامەی بەکارهێنەری کارا', pii: false, descEn: 'User that initialized the change.', descAr: 'المستخدم الذي قام بتحديث وتغيير هذه القيمة.', descKu: 'ئەو فەرمانبەرەی گۆڕانکارییەکەی قبوڵ کردووە.' },
      { name: 'cbi_hsm_signature', type: 'TEXT', key: 'NONE', arabicName: 'التوقيع الرقمي للبنك المركزي العراقي', kurdishName: 'مۆری دیجیتاڵ بانکی ناوەندی', pii: true, descEn: 'Irreversible HSM crypto stamp sign key.', descAr: 'التوقيع السيادي المشفر من أجهزة HSM لضمان استحالة التعديل.', descKu: 'توقیعی پارێزراوی جومگەیی بۆ ڕێگریکردن لە هەر جۆرە دەستکارییەکی نایاسایی.' }
    ]
  }
];

// 2. DATABASE ARCHITECTURE JUSTIFICATIONS & RECOMMENDATIONS
interface DbTechDetails {
  icon: any;
  tech: string;
  roleEn: string;
  roleAr: string;
  roleKu: string;
  justificationEn: string;
  justificationAr: string;
  justificationKu: string;
  wcoComplianceEn: string;
  wcoComplianceAr: string;
  wcoComplianceKu: string;
}

const DATABASE_RECOMMENDATIONS: DbTechDetails[] = [
  {
    icon: DatabaseZap,
    tech: 'Google Cloud Spanner / PostgreSQL',
    roleEn: 'Relational Core & Financial Clearing Ledger',
    roleAr: 'النظام التقني المالي والتبادل الجمركي الأساسي المترابط',
    roleKu: 'ناوەندی تەلارسازی حیساباتی سەرەکی و بەیەکەوەبەستنی دارایی',
    justificationEn: 'Guarantees globally consistent transactional replication across Baghdad and Basra hubs, avoiding regional forks. PostgreSQL interface allows rapid developers transition. Native 99.999% availability handles 100M+ declarations flawlessly.',
    justificationAr: 'يضمن الاتساق الشامل للمعاملات المالية وتدقيق المعابر الجمركية بين مركزي بغداد والبصرة دون تضارب. واجهة متوافقة مع PostgreSQL لتسريع دمج المطورين العراقيين مع جاهزية تشغيل مستمر 99.999%.',
    justificationKu: 'هاوسەنگی زانیاری بازرگانی بە توندی لە نێوان چاودێری مەرزی بەغداد و بەسرە دەپارێزێت بە ڕێژەی کارکردنی ٩٩.٩٩٩٪ بەبێ وەستان.',
    wcoComplianceEn: 'Strict fulfillment of WCO Data Model v3 and ISO 20022 transactional standards for real-time clearance auditing.',
    wcoComplianceAr: 'اتساق كامل لمعايير منظومة الجمارك العالمية (WCO v3) ومعايير الدفع ISO 20022.',
    wcoComplianceKu: 'جێبەجێکردنی تەواوی ڕێکارە مۆدێرنەکانی ڕێکخراوی بازرگانی جیهانی (WCO v3) و جۆری دراو.'
  },
  {
    icon: Server,
    tech: 'MongoDB / Cloud Firestore',
    roleEn: 'Semi-Structured Metadata & Attachment Store',
    roleAr: 'مستودع الملحقات والمستندات الذاتية غير المنظمة',
    roleKu: 'کۆگای فایلی هاوپێچ و بەڵگە جۆراوجۆرە گۆڕاوەکان',
    justificationEn: 'Handles Ministry-specific lab certificate schemas, complex container freight bills, inspection photos, and legacy ASYCUDA World SOAP headers dynamically which would violate strict SQL relational normalization rules.',
    justificationAr: 'يخزن مرئيات الفحص المخبري، تتبع شهادات الصحة، ملفات الحجر الحيواني، والمخططات القديمة لأسيكودا بصورة مرنة وديناميكية دون المساس بالهيكل الرياضي لقواعد البيانات المترابطة.',
    justificationKu: 'بانگەشەکردنی فایلی پزیشکی وەزارەتەکان، نامەی گومرگی فەرمی و فۆتۆی پشکنینەکان بەبێ خاوشکردنی سستەمی پێکهاتەکان.',
    wcoComplianceEn: 'Conforms to WCO XML declarations dynamic extensibility frameworks.',
    wcoComplianceAr: 'يتيح التطور التقني لمدخلات استيراد البضائع وفق معايير WCO للبيانات القابلة للتوسع.',
    wcoComplianceKu: 'ڕێکخستنی توانای کشانی جۆراوجۆری فایلی بەڵگەکان بۆ گونجاندنی نوێکارییەکانی داهاتوو.'
  },
  {
    icon: LineChart,
    tech: 'Google Cloud BigQuery',
    roleEn: 'Real-Time Customs Intelligent Analytics Warehouse',
    roleAr: 'مستودع التحليلات والذكاء الجمركي واستخبارات المخاطر والتهريب',
    roleKu: 'ناوەندی گەورەی شیکارکاری و چاودێری گەندەڵی و مەترسی کاڵاکان',
    justificationEn: 'Processes millions of archival lines within seconds. Enables ML models directly in-database to calculate dynamic risk scores, identify tariff code classification fraud, alert on tax leakages, and output national economic trade reports.',
    justificationAr: 'يحلل ملايين السجلات الجمركية التاريخية في أجزاء من الثانية. يتيح تشغيل نماذج الذكاء الاصطناعي مباشرة (ML-on-BigQuery) للتنبؤ بالتلاعب بالتعرفة الجمركية ومصادرة الشحنات المخالفة.',
    justificationKu: 'شیکارکردنی ملیۆنان تۆمار لە چرکەیەکدا. یارمەتی پێشبینی و زیرەکی دەستکرد دەدات بۆ دۆزینەوەی گرانبەهایی نادروست و قاچاخچێتی.',
    wcoComplianceEn: 'Supports WCO Recommended Trade Statistics collection standards with zero data lag.',
    wcoComplianceAr: 'الامتثال الكامل لمعايير حصر إحصاءات حجم السلع والتبادل الاستراتيجي بدون تأخر البيانات.',
    wcoComplianceKu: 'پشتگیری تەواو لە کۆکردنەوەی ئاماری بازرگانی نیشتمانی خێرا و سەلامەت.'
  }
];

// 3. SAMPLE SQL CODE FOR TERMINAL COMPILER
interface sqlSample {
  titleEn: string;
  titleAr: string;
  titleKu: string;
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
}

const SQL_BLUEPRINTS: sqlSample[] = [
  {
    titleEn: '1. Initialize Sovereign Trade Declaration (DDL Integration)',
    titleAr: '١. تسجيل بيان جمركي سيادي جديد (استيراد)',
    titleKu: '١. تۆمارکردنی مۆڵەتێکی نوێی بازرگانی فەرمی',
    code: `-- Primary Trade Register with integrated CBI Currency conversion freezing
INSERT INTO nsw_declarations (
    declaration_id, 
    ref_number, 
    office_code, 
    declaration_type, 
    declarant_id, 
    importer_tax_id, 
    total_invoice_amount, 
    invoice_currency, 
    exchange_rate_to_iqd, 
    status
) VALUES (
    'dec_df881-220b-419b-a2c1-bb1192cc0', 
    'IQ-SAF-2026-99124', 
    'SAF_POST', -- Safwan Border Port
    'IMPORT', 
    'usr_812c-391a-b62a', -- Registered Declarant Agent
    'TAX-IQ-991822019', -- Ministry of Finance verified Importer
    145000.00, 
    'USD', 
    1310.000000, -- frozen official Central Bank conversion rate
    'SUBMITTED'
);`,
    descriptionEn: 'Saves a secure Single Administrative Document (SAD) into the active cluster, freezing the official CBI currency conversion rate.',
    descriptionAr: 'حفظ مستند البيان الجمركي الموحد في النظام وتجميد سعر الصرف الرسمي المعتمد من البنك المركزي العراقي لمنع التلاعب في قيم الرسوم.',
    descriptionKu: 'تۆمارکردنی مۆڵەتەکە لەگەڵ بەستنی فەرمی نرخی دراوی بانکی ناوەندی بۆ پاراستن لە گۆڕانکاری نایاسایی.'
  },
  {
    titleEn: '2. Query Comprehensive Cross-Ministry Gate Status (Real-Time Analytics)',
    titleAr: '٢. استعلام موحد متعدد الدوائر لحالة البيان (صحة، فحص نوعي، دفع)',
    titleKu: '٢. بەدواداچوونی گشتگیر لە نێوان وەزارەتەکان بۆ فۆرمێک',
    code: `-- Secure cross-tenant unified join across Ministries
SELECT 
    d.ref_number AS "SAD_Reference",
    d.office_code AS "Border_Post",
    d.total_invoice_amount AS "Invoice_USD",
    (d.total_invoice_amount * d.exchange_rate_to_iqd) AS "Value_IQD_Equivalent",
    c.asycuda_sad_ref AS "ASYCUDA_ID",
    h.test_result_status AS "Ministry_of_Health_Status",
    q.is_compliant AS "COSQC_Standards_Passed",
    p.status AS "MOF_CBI_Payment_Status"
FROM nsw_declarations d
LEFT JOIN nsw_customs_documents c ON d.declaration_id = c.declaration_id
LEFT JOIN nsw_health_certificates h ON d.declaration_id = h.declaration_id
LEFT JOIN nsw_quality_inspections q ON d.declaration_id = q.declaration_id
LEFT JOIN nsw_payment_records p ON d.declaration_id = p.declaration_id
WHERE d.ref_number = 'IQ-SAF-2026-99124';`,
    descriptionEn: 'Performs a fast atomic relational query checking audit checkpoints across Ministry of Health, COSQC, Customs ASYCUDA, and Finance Payments.',
    descriptionAr: 'استعلام علاقاتي متقاطع وسريع للتحقق من موافقات وزارة الصحة، السيطرة النوعية، الرسوم الجمركية في أسيكودا، والتدقيق المالي الفعلي من البنك المركزي.',
    descriptionKu: 'بینینی ڕاستەوخۆی بارودۆخی مۆڵەتی تەندروستی گشتگیر لەگەڵ کۆنترۆڵی جۆری و قبوڵکردنی پارە لە بانکی ناوەندی.'
  },
  {
    titleEn: '3. Immutable Cryptographic Ledger Verification Stamp',
    titleAr: '٣. توقيع فحص الدفتر المشفر المقاوم للاختراق والتبديل',
    code: `-- Triggers an automated cryptographic forensic sign using SHA-256 integrity hash
WITH record_state AS (
  SELECT 
    d.declaration_id,
    d.status,
    d.total_invoice_amount,
    COALESCE(p.receipt_reference, 'UNPAID') as pay_ref,
    h.test_result_status
  FROM nsw_declarations d
  LEFT JOIN nsw_payment_records p ON d.declaration_id = p.declaration_id
  LEFT JOIN nsw_health_certificates h ON d.declaration_id = h.declaration_id
  WHERE d.declaration_id = 'dec_df881-220b-419b-a2c1-bb1192cc0'
)
-- Simulates the immutable audit log entry block with cryptographic continuity check
INSERT INTO nsw_immutable_audits_mock (
  log_id,
  actor_id,
  table_target,
  state_signature_sha256
) 
SELECT 
  'log_hash_8812cfa2341b',
  'usr_cbi_hsm_node_baghdad',
  'nsw_declarations',
  -- Secure integrity seal combining previous payload attributes
  ENCODE(SHA256(CAST(record_state.* AS TEXT)::BYTEA), 'hex')
FROM record_state;`,
    titleKu: '٣. مۆری دیجیتاڵ مێژوویی و پاراستنی داتا',
    descriptionEn: 'Calculates SHA-256 hash state stamp over multi-ministry clearing fields to detect unauthorized DB tampering, creating blockchain-like audit trail.',
    descriptionAr: 'يقوم باحتساب البصمة الرقمية (SHA-256) للحفاظ على نزاهة وأمن البيانات ومنع أي تلاعب غير مصرح به بقواعد البيانات الرياضية.',
    descriptionKu: 'بەرنامەیەکی تایبەت بە پاشەکەوت کردنی مۆری دیجیتاڵ بەپێی کلیلەکان.'
  }
];

export default function DatabaseSchemaViewer({ lang }: DatabaseSchemaViewerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'explorer' | 'erd' | 'tech' | 'sharding' | 'queries' | 'migration'>('explorer');
  const [selectedTableId, setSelectedTableId] = useState<string>('tbl_declarations');
  const [activeSqlQueryIndex, setActiveSqlQueryIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const isRtl = lang === 'ar' || lang === 'ku';

  const selectedTable = DATABASE_TABLES.find(t => t.id === selectedTableId) || DATABASE_TABLES[0];
  const activeQuery = SQL_BLUEPRINTS[activeSqlQueryIndex];

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  // RAW MERMAID CODE REPRESENTING THE ERD RELATIONSHIPS
  const mermaidCode = `erDiagram
    nsw_ministries ||--o{ nsw_users : "defines"
    nsw_users ||--o{ nsw_declarations : "declares"
    nsw_declarations ||--|| nsw_customs_documents : "contains"
    nsw_declarations ||--o{ nsw_health_certificates : "verifies"
    nsw_declarations ||--o{ nsw_quality_inspections : "inspects"
    nsw_declarations ||--o{ nsw_payment_records : "clears_payment"
    nsw_declarations ||--o{ nsw_logistics_tracking : "tracks_location"
    nsw_users ||--o{ nsw_immutable_audits : "initializes_change"`;

  return (
    <div className="space-y-6" id="database-schema-portal">
      {/* Tab controls */}
      <div className="flex flex-wrap bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1">
        {[
          { id: 'explorer', labelEn: 'Table Schemas Explorer', labelAr: 'قائمة الجداول المفصلة', labelKu: 'پشکنەری خشتەکان' },
          { id: 'erd', labelEn: 'Interactive ERD', labelAr: 'مخطط العلاقات التفاعلي', labelKu: 'مۆدێلی پەیوەندییەکان' },
          { id: 'tech', labelEn: 'Database Strategy Justification', labelAr: 'تبرير تكنولوجيا قواعد البيانات', labelKu: 'هاوسەنگی تەکنەلۆجیا' },
          { id: 'sharding', labelEn: 'Scale & Partitioning (100M+)', labelAr: 'التوسع والتجزئة السحابية', labelKu: 'وەستان لەسەر ١٠٠ ملیۆن' },
          { id: 'queries', labelEn: 'Sovereign SQL DDL & Queries', labelAr: 'الاستعلامات ورموز التشغيل', labelKu: 'کۆدی سەرەکی SQL' },
          { id: 'migration', labelEn: 'Legacy Paper ETL Strategy', labelAr: 'الهجرة وخطط البيانات التاريخية', labelKu: 'پلانەکانی گواستنەوەی داتا' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer text-center ${
              activeSubTab === tab.id 
                ? 'bg-emerald-600 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {lang === 'en' ? tab.labelEn : lang === 'ar' ? tab.labelAr : tab.labelKu}
          </button>
        ))}
      </div>

      {copiedText && (
        <div className="bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 animate-pulse justify-center">
          <Check className="w-4 h-4 shrink-0" />
          <span>{copiedText}</span>
        </div>
      )}

      {/* RENDER ACTIVE SUBTAB CONTENT */}
      {activeSubTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Table Selector menu */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Table2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Relational & Document Tables' : lang === 'ar' ? 'جداول قاعدة البيانات المشتركة' : 'خشتەکانی داتابەیسی یەکگرتوو'}</span>
            </h3>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {lang === 'en' && 'Explore Iraq National Single Window transactional schema specifications. Select any table boundary below to view structural columns, UTF-8 compatibility, and PII encryption flags.'}
              {lang === 'ar' && 'استكشف مواصفات الجداول ومخطط البيانات المعتمد بالنافذة الوطنية. حدد أي جدول من القائمة أدناه لعرض الحقول والتشفير ونظام التوافق.'}
              {lang === 'ku' && 'سەیری تایبەتمەندی خشتەکانی داتابەیسی پەنجەرەی نیشتمانی بکە. هەر خشتەیەک دەتەوێ هەڵیبژێرە بۆ بینینی پێکهاتەکەی.'}
            </p>

            <div className="space-y-1.5 pt-2">
              {DATABASE_TABLES.map((table) => {
                const isSelected = table.id === selectedTableId;
                return (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTableId(table.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/25 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800'
                    }`}
                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Database className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="font-mono">{table.name}</span>
                    </div>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                      table.type.includes('NoSQL') 
                        ? 'bg-amber-950/40 text-amber-400 border-amber-900/40' 
                        : 'bg-sky-950/40 text-sky-400 border-sky-900/40'
                    }`}>
                      {table.type.includes('NoSQL') ? 'NoSQL' : 'SQL'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details column viewer */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-slate-950 border-b border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/10 uppercase">
                    {selectedTable.type}
                  </span>
                  <h2 className="text-sm font-mono font-bold text-white text-emerald-400">
                    {selectedTable.name}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  {lang === 'en' ? selectedTable.descriptionEn : lang === 'ar' ? selectedTable.descriptionAr : selectedTable.descriptionKu}
                </p>
              </div>

              <button
                onClick={() => handleCopy(selectedTable.ddl, selectedTable.name + ' DDL code')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-[10px] px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1 cursor-pointer self-start md:self-auto shrink-0 transition-all"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copy Schema / DDL</span>
              </button>
            </div>

            {/* Scrollable Column Grid */}
            <div className="p-4 flex-1 space-y-4">
              <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-1.5 flex justify-between items-center bg-slate-950/30 px-2 py-1.5 rounded">
                <span>{lang === 'en' ? 'Structure Fields & Keys Mapping' : lang === 'ar' ? 'تخطيط حقول الجداول والهيكل الرئيسي' : 'نەخشەی کێڵگەکان و مۆرەکان'}</span>
                <span className="text-[10px] text-emerald-500 font-normal">UTF-8 CHARACTER COMPLIANT</span>
              </div>

              <div className="space-y-3">
                {selectedTable.columns.map((col, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-900 rounded-lg p-3 hover:border-slate-800 transition-all grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                    <div className="md:col-span-4 flex items-center gap-2">
                      {col.key === 'PK' && <KeyRound className="w-4 h-4 text-yellow-400 shrink-0" title="Primary Key" />}
                      {col.key === 'FK' && <GitFork className="w-4 h-4 text-purple-400 shrink-0" title={`Foreign Key referencing ${col.ref}`} />}
                      {col.key === 'NONE' && <div className="w-4 h-4 shrink-0" />}
                      <span className="font-mono text-xs font-bold text-slate-200">{col.name}</span>
                    </div>

                    <div className="md:col-span-2">
                      <span className="font-mono text-[11px] text-emerald-400">{col.type}</span>
                    </div>

                    <div className="md:col-span-4 text-xs font-sans text-slate-400">
                      <span>{lang === 'en' ? col.descEn : lang === 'ar' ? col.descAr : col.descKu}</span>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-end gap-1">
                      {col.pii ? (
                        <span className="bg-rose-950/60 text-rose-400 text-[9px] font-mono px-1.5 py-0.5 rounded border border-rose-900/40 flex items-center gap-1" title="Encrypted PII Field">
                          <Lock className="w-2.5 h-2.5" />
                          <span>PII SECURE</span>
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[10px] font-mono select-none">-</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* DDL Schema Preview */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1.5">SQL CREATE DDL / SCHEMA STRUCTURE DETAILED:</span>
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 overflow-x-auto relative shadow-inner">
                  <pre className="text-xs font-mono text-slate-300 leading-relaxed max-h-[220px] overflow-y-auto">
                    {selectedTable.ddl}
                  </pre>
                  <div className="absolute top-2 right-2 flex bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-500 border border-slate-800 uppercase pointer-events-none">
                    Syntax: SQL / DDL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'erd' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                <GitFork className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'en' ? 'Iraq Trade NSW Entity Relationship Diagram (ERD)' : lang === 'ar' ? 'مخطط العلاقات لقاعدة بيانات النافذة الوطنية الموحدة' : 'نەخشەی داتابەیسی یەکگرتووی سیستم'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                {lang === 'en' ? 'This sovereign ERD maps relational linkages starting from Federal Ministry partitions, clearing agents, core SAD Trade Declarations down to Customs, Health quarantine, Finance Payment RTGS logs and security audit nodes.' : lang === 'ar' ? 'يوضح هذا المخطط العلاقات البينية المتكاملة بين الوزارات، لوحة مستندات الجمارك الموحدة (SAD) وصولاً للفحوصات الصحية ومدفوعات البنك المركزي.' : 'ئەم نەخشەیە تەواوی پەیوەندییەکانی نێوان وەزارەتەکان، مۆڵەتەکان، تەندروستی، ڕێجەر و مۆری فەرمی ڕوون دەکاتەوە.'}
              </p>
            </div>

            <button
              onClick={() => handleCopy(mermaidCode, 'Mermaid ERD code')}
              className="bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono text-xs px-3.5 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5 cursor-pointer self-start md:self-auto shrink-0 transition-all font-sans"
            >
              <Copy className="w-4 h-4 text-emerald-400" />
              <span>Copy Mermaid Code</span>
            </button>
          </div>

          {/* Interactive visual layout of ERD instead they click around */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Visual connected cards map */}
            <div className="md:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[460px] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

              {/* Ministries Node (A) */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                
                {/* Column 1: Core Tenants & Identifiers */}
                <div className="space-y-4">
                  <div className="text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1 uppercase text-center block">Partitions & Multi-Tenancy</div>
                  
                  <div className="bg-slate-900 border border-emerald-500/20 rounded-lg p-3 text-center space-y-1 shadow-md">
                    <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/10 px-1 py-0.5 rounded text-center block">nsw_ministries</span>
                    <p className="text-[10px] font-bold text-white text-center">Ministries Directory</p>
                    <span className="text-[9px] font-mono text-slate-400 block border-t border-slate-800 pt-1 mt-1">Tenant isolations</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center space-y-1 shadow-md">
                    <span className="text-[9px] font-mono bg-sky-950 text-sky-400 border border-sky-500/10 px-1 py-0.5 rounded text-center block">nsw_users</span>
                    <p className="text-[10px] font-bold text-white text-center">Users & Clearance Officers</p>
                    <span className="text-[9px] font-mono text-rose-400 block border-t border-slate-800 pt-1 mt-1">PII AES-256 Encrypted</span>
                  </div>
                </div>

                {/* Column 2: Central Transaction SAD */}
                <div className="flex flex-col justify-center space-y-4 relative">
                  {/* Visual connecting lines using DIVs */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800/80 -z-0 hidden md:block"></div>
                  
                  <div className="text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1 uppercase text-center block">Master Entry</div>
                  
                  <div className="bg-emerald-900/10 border border-emerald-400 rounded-lg p-4 text-center space-y-2 shadow-2xl z-10 relative">
                    <span className="bg-emerald-600 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded text-center block mx-auto w-max">nsw_declarations</span>
                    <p className="text-xs font-bold text-white text-center">Master Trade Declarations (SAD)</p>
                    <span className="text-[9px] text-emerald-400 font-sans block border-t border-emerald-500/25 pt-1 mt-1">
                      PK: declaration_id<br/>
                      IQD / USD Converter
                    </span>
                  </div>
                </div>

                {/* Column 3: Multi-Agency Approvals */}
                <div className="space-y-4">
                  <div className="text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1 uppercase text-center block">Verified Clearing Mappings</div>
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1 shadow-md flex items-center justify-between text-[11px] font-sans">
                    <div className="text-left">
                      <p className="font-bold text-white">Customs (ASYCUDA)</p>
                      <span className="text-[8px] font-mono text-slate-400">customs_valuation, HS_Code</span>
                    </div>
                    <span className="text-[10px] font-bold text-yellow-500 font-mono">1 :: 1</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1 shadow-md flex items-center justify-between text-[11px] font-sans">
                    <div className="text-left">
                      <p className="font-bold text-white">MoH Certificates</p>
                      <span className="text-[8px] font-mono text-slate-400">lab_findings, approved_by</span>
                    </div>
                    <span className="text-[10px] font-bold text-purple-500 font-mono">1 :: N</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1 shadow-md flex items-center justify-between text-[11px] font-sans">
                    <div className="text-left">
                      <p className="font-bold text-white">COSQC Standards</p>
                      <span className="text-[8px] font-mono text-slate-400">compliance_indicator</span>
                    </div>
                    <span className="text-[10px] font-bold text-sky-500 font-mono">1 :: N</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1 shadow-md flex items-center justify-between text-[11px] font-sans">
                    <div className="text-left">
                      <p className="font-bold text-white">CBI Payments (RTGS)</p>
                      <span className="text-[8px] font-mono text-slate-400">ISO 20022 pacs.008</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 font-mono">1 :: N</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1 shadow-md flex items-center justify-between text-[11px] font-sans">
                    <div className="text-left">
                      <p className="font-bold text-white">Audit Log Ledger</p>
                      <span className="text-[8px] font-mono text-slate-400">cbi_hsm_signature (Immutable)</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-400 font-mono">1 :: N</span>
                  </div>
                </div>

              </div>

              {/* Visual connection indicator */}
              <div className="mt-8 text-[10px] font-sans bg-emerald-950/40 text-emerald-400 border border-emerald-500/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'en' ? 'Click on "Table Schemas Explorer" in tabs to view actual field levels, types, and primary keys.' : lang === 'ar' ? 'انقر على "مستكشف الجداول الشامل" لعرض كافة تفاصيل الحقول والمفاتيح بمرونة كاملة.' : 'کلیک لەسەر "خشتەکان" بکە بۆ بینینی وردەکاری دەروازەکان.'}
                </span>
              </div>
            </div>

            {/* Mermaid output side panel */}
            <div className="md:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block border-b border-slate-900 pb-1">Mermaid Spec Notation</span>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {lang === 'en' ? 'Review or export the Mermaid code structure directly into your architectural documents (such as enterprise diagrams).' : lang === 'ar' ? 'راجع أو قم بتصدير البصمة الحسابية لكود Mermaid مباشرة في مذكرات الدوائر والوزارات.' : 'کۆدی مێرمەید بۆ پیشاندانی خێرا کۆپی بکە.'}
                </p>

                <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg overflow-x-auto">
                  <pre className="text-[11px] font-mono text-emerald-400 leading-relaxed max-h-[250px] overflow-y-auto">
                    {mermaidCode}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-900 mt-4 text-[11px] font-sans text-slate-400 leading-normal">
                {lang === 'en' ? 'The "1 :: N" notation lists one declaration leading to multiple inspection or billing records. Multi-tenancy is structured using metadata partition IDs.' : lang === 'ar' ? 'توضح دالة "1 :: N" ارتباط بيان واحد بطلبات سداد أو تقارير فحص متعددة من الدوائر الاتحادية لمنع التلاعب.' : 'تۆماری فرە مۆڵەتی پێکەوە گرێدراو.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'tech' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-sans font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'en' ? 'Hybrid Database Technology recommendations & Trade-off' : lang === 'ar' ? 'تقييم تقني لمزيج قواعد البيانات وتوصياتها للنافذة الواحدة' : 'ڕێنمایی تەکنەلۆجی جۆراوجۆری داتابەیسەکان'}</span>
            </h3>
            
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {lang === 'en' && 'To handle Iraq’s diverse trade payload requirements, we recommend a hybrid SQL + NoSQL architecture. Below is the solutions layout and justifications designed for high transactional consistency, rich attachment mapping, and sub-second analytical reporting.'}
              {lang === 'ar' && 'للاستجابة لمتطلبات التجارة العراقية المتنوعة، نوصي بهيكلية مزدوجة (SQL + NoSQL). يوضح المخطط أدناه التوزيع والتبرير الهندسي المصمم لضمان المعاملات المالية واستقرار النظام.'}
              {lang === 'ku' && 'دابینکردنی تەکنەلۆجیایەکی فەرمی بە گشتی کە پێکەوە بەستراون بۆ ئاسانی کۆنترۆڵی کارە جیاوازەکان.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {DATABASE_RECOMMENDATIONS.map((rec, idx) => {
                const IconComp = rec.icon;
                return (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
                        <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <IconComp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-emerald-500 block uppercase">RECOMMENDED STACK</span>
                          <h4 className="text-xs font-mono font-bold text-white">{rec.tech}</h4>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-sans font-semibold text-slate-400 block mb-1">Functional NSW Role:</span>
                        <p className="text-xs font-sans text-slate-200 font-medium">
                          {lang === 'en' ? rec.roleEn : lang === 'ar' ? rec.roleAr : rec.roleKu}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-sans font-semibold text-slate-400 block mb-1">Architectural Justification:</span>
                        <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                          {lang === 'en' ? rec.justificationEn : lang === 'ar' ? rec.justificationAr : rec.justificationKu}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900 bg-emerald-950/10 p-2.5 rounded-lg border border-emerald-900/20">
                      <span className="text-[9px] font-mono text-emerald-500 uppercase block mb-0.5">WCO / International Compliance:</span>
                      <p className="text-[10px] text-slate-300 font-sans leading-normal">
                        {lang === 'en' ? rec.wcoComplianceEn : lang === 'ar' ? rec.wcoComplianceAr : rec.wcoComplianceKu}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'sharding' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
              <DatabaseZap className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'en' ? 'Partitioning, Archival, & Disaster Recovery Strategy' : lang === 'ar' ? 'خطة التجزئة والأرشفة واستعادة البيانات للكوارث' : 'پلانی بەشکردنی داتا و چاکبوونەوە لە کارەساتەکان'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              {lang === 'en' ? 'Iraq National Single Window is projected to capture 100 Million+ audit and transaction records within 18 months. Highly specific range partitioning and regional sharding strategies are deployed to manage high volume.' : lang === 'ar' ? 'متوقع أن تسجل النافذة الوطنية أكثر من ١٠٠ مليون سجل فحص وتأكيدات جمركية في ظرف ١٨ شهراً. نعتمد خطة متقدمة لتجزئة البيانات لضمان السرعة الفائقة.' : 'پلانی پاراستنی خێرا بۆ زیاتر لە ١٠٠ ملیۆن فۆرم بە هاوسەنگی.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sharding Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-bl-full"></div>
              <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5 border-b border-slate-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>{lang === 'en' ? 'Sovereign Table Partitioning' : lang === 'ar' ? 'تجزئة وأقسام الجداول السيادية' : 'بەشکردنی خشتە نیشتمانییەکان'}</span>
              </h4>

              <div className="space-y-3 text-xs leading-relaxed font-sans text-slate-400">
                <div>
                  <span className="font-mono text-[10px] text-sky-400 uppercase font-bold block">Transactional partition key:</span>
                  <p className="text-[11px]">Range Partitioning based on <code className="font-mono text-white text-[10px]">fiscal_year</code> and List Partitioning by <code className="font-mono text-white text-[10px]">office_code</code>.</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-sky-400 uppercase font-bold block">Why is this used:</span>
                  <p className="text-[11px]">{lang === 'en' ? 'Isolates annual filings, keeping memory searches bound to the active year. Facilitates bulk truncation of older years during scheduled transitions.' : lang === 'ar' ? 'يعزل ملفات العمل للسنة الحالية، مما يبقي مساحة البحث محدودة بالسنة المالية النشطة. يتيح الحذف السريع للأرشيف المعتمد.' : 'کەمکردنەوەی جیاوازی داتاکان لە ناو یەک ساڵدا.'}</p>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800 text-[10px] font-mono whitespace-pre text-slate-300">
                  {`PARTITION BY RANGE (created_at)
(
  PARTITION yr_2026 VALUES FROM ('2026-01-01') TO ('2027-01-01'),
  PARTITION yr_2027 VALUES FROM ('2027-01-01') TO ('2028-01-01')
);`}
                </div>
              </div>
            </div>

            {/* Archival Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full"></div>
              <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5 border-b border-slate-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>{lang === 'en' ? '7-Year Corporate Legal Retention' : lang === 'ar' ? 'أرشفة البيانات والالتزام بـ 7 سنوات' : 'یاسای هێشتنەوەی فام بۆ ماوەی ٧ ساڵ'}</span>
              </h4>

              <div className="space-y-3 text-xs leading-relaxed font-sans text-slate-400">
                <div>
                  <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">Iraqi Customs Legal Requirement:</span>
                  <p className="text-[11px]">{lang === 'en' ? 'Federal Customs law mandates retaining active declaration metadata and invoices for 7 years.' : lang === 'ar' ? 'ينص القانون الجمركي العراقي على وجوب الاحتفاظ بالبيانات والتقارير المالية الجمركية لمدة ٧ سنوات كاملة للتدقيق اللاحق.' : 'یاسای گومرگی فیدراڵی عێراق پابەند دەکات بە هێشتنەوەی فۆرمەکان بۆ ٧ ساڵ.'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">Archival Pipeline:</span>
                  <p className="text-[11px]">{lang === 'en' ? 'Active database data older than 24 months is consolidated and moved automatically to read-only cold storage in Basra Backup Center (Google Cloud Glacier-equivalent local pools), saving up to 60% of storage cost.' : lang === 'ar' ? 'تُنقل السجلات المالية المشطوبة التي يبلغ عمرها أكثر من سنتين تلقائياً إلى وحدات التخزين الباردة في مركز البصرة لتقليل الكلفة بـ 60%.' : 'گواستنەوەی فایلی کۆن لە ناو ٢٤ مانگدا بۆ ناو ساردی پاشەکەوت.'}</p>
                </div>
              </div>
            </div>

            {/* Disaster Recovery Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full"></div>
              <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5 border-b border-slate-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{lang === 'en' ? 'Disaster Recovery (RPO < 15m, RTO < 1h)' : lang === 'ar' ? 'استعادة البيانات بالكوارث (أقل من ساعة)' : 'چاکبوونەوەی خێرا لە کارەسات لە ژێر کاژێرێکدا'}</span>
              </h4>

              <div className="space-y-3 text-xs leading-relaxed font-sans text-slate-400">
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">RPO Target (&lt; 15 Minutes):</span>
                  <p className="text-[11px]">{lang === 'en' ? 'Continuous multi-zone transaction streaming to Basra Hot Site prevents data losses.' : lang === 'ar' ? 'البث المستمر غير المتزامن لبيانات المعاملات الجمركية من بغداد للبصرة لمنع ضياع المعاملات.' : 'هاودەم کردنەوەی هەموو ١٥ چرکەیەک بۆ ناو بەسرە بۆ ڕێگری لە ونبوونی داتا.'}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">RTO Target (&lt; 1 Hour):</span>
                  <p className="text-[11px]">{lang === 'en' ? 'Automated load balancer DNS routing failover immediately switches operational connections from Baghdad to Basra DR Hall if infrastructure breaches occur.' : lang === 'ar' ? 'توجيه تلقائي للمخدم من بغداد للبصرة في حال انقطاع الشبكات الرئيسية ببغداد في أقل من ساعة.' : 'گواستنەوەی ئۆتۆماتیکی دەروازەکان بۆ بەسرە یەدەگ لە کاتی کێشەدا.'}</p>
                </div>
                <div className="bg-emerald-950/20 p-2 rounded border border-emerald-900/30 text-[10px] leading-relaxed text-emerald-400 text-center">
                  BAGHDAD (Active) ── mTLS Sync ──&gt; BASRA (DR Hot Site)
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeSubTab === 'queries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Query list selectors */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-800 pb-2 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Operational Query Blueprints' : lang === 'ar' ? 'أمثلة أكواد التشغيل الفعلي للمبرمجين' : 'کۆدی کارکردنی ڕاستەوخۆ'}</span>
            </h3>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              {lang === 'en' && 'Explore transactional DDL and CTE query blueprints executed by the Iraqi Single Window server nodes to enforce secure multi-ministry clearing and immutability.'}
              {lang === 'ar' && 'يمكنك استعراض وبناء الجداول والتقارير المالية السيادية المنفذة داخل مخدمات النافذة الوطنية للربط والتدقيق.'}
              {lang === 'ku' && 'کۆدە جیاوازەکان بناسە کە بۆ گواستنەوە و یەکگرتنی داتای بازرگانی عێراق بەکاردێن.'}
            </p>

            <div className="space-y-1.5 pt-2">
              {SQL_BLUEPRINTS.map((query, idx) => {
                const isActive = idx === activeSqlQueryIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSqlQueryIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950/25 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800'
                    }`}
                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                  >
                    <span className="truncate pr-2">
                      {lang === 'en' ? query.titleEn : lang === 'ar' ? query.titleAr : query.titleKu}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code execution terminal panel */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-mono text-slate-300">
                  {lang === 'en' ? activeQuery.titleEn : lang === 'ar' ? activeQuery.titleAr : activeQuery.titleKu}
                </span>
              </div>

              <button
                onClick={() => handleCopy(activeQuery.code, 'Query Code')}
                className="bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white font-mono text-[10px] px-3 py-1.5 rounded border border-slate-800 flex items-center gap-1 cursor-pointer transition-all"
              >
                <Copy className="w-3 h-3 text-emerald-400" />
                <span>Copy SQL Query</span>
              </button>
            </div>

            <div className="p-4 flex-1 space-y-4">
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {lang === 'en' ? activeQuery.descriptionEn : lang === 'ar' ? activeQuery.descriptionAr : queryDescKuParser(activeQuery)}
              </p>

              <div className="relative">
                <div className="bg-slate-950 border border-slate-900 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-emerald-400 leading-relaxed max-h-[300px] overflow-y-auto">
                    {activeQuery.code}
                  </pre>
                </div>
                <div className="absolute top-2 right-2 flex bg-slate-900 px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-600 border border-slate-850 uppercase pointer-events-none">
                  SQL Dialect
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'migration' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              <span>{lang === 'en' ? 'Legacy Digital Migration Roadmap (Extract-Transform-Load)' : lang === 'ar' ? 'خارطة هجرة البيانات التاريخية الورقية إلى الفضاء الرقمي الموحد' : 'ڕێگاکانی گواستنەوەی فایلە کاغەزییەکان'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              {lang === 'en' ? 'Migrating Iraq’s paper-based systems to the National Single Window requires a zero-downtime phased ETL framework, protecting data integrity and currency historic evaluations.' : lang === 'ar' ? 'تتطلب هجرة البيانات الجمركية الورقية القديمة في العراق للواجهة الرقمية خطة متطورة مقسمة على مراحل لحماية سلامة المعاملات.' : 'داڕشتنی ڕێگای گواستنەوەی بازرگانی کۆن بۆ مۆدێرن بەبێ بڕینی خزمەتگوزاری.'}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                titleEn: 'Data Classification & PII Sanitization',
                titleAr: 'أولاً: تصنيف البيانات وتغطية الخصوصية للأفراد الفاعلين',
                titleKu: '١. پۆلێنکردنی داتا و پاککردنەوەی کەسی',
                descEn: 'Identify historical taxpayer registrations, business files, and customs tariffs. Tag critical PII inputs (full names, corporate credentials) and apply AES-GCM-256 formatting with Central Bank HSM control keys.',
                descAr: 'تطبيق التشفير وحماية الخصوصية للبيانات المهاجرة باستخدام خوارزمية AES-GCM-256 ومفاتيح البنك المركزي العراقي.',
                descKu: 'دەستنیشان کردنی زانیارییە کەسییەکان و ڕێکخستنی مۆری نهێنی بەپێی سیستەم.'
              },
              {
                step: '02',
                titleEn: 'Cleansing & WCO Validation Filtering',
                titleAr: 'ثانياً: تصفية البيانات والامتثال لمعايير منظومة الجمارك العالمية',
                titleKu: '٢. پاککردنەوە و ڕێکخستنی مۆری نێودەوڵەتی WCO',
                descEn: 'Convert heterogeneous spreadsheet entries and legacy files into structured XML payloads mapping directly to the WCO Trade Data Model v3 and ASYCUDA World SQL tables.',
                descAr: 'تحويل الملفات الورقية القديمة والسجلات المتباينة إلى صيغ ملفات علاقاتية قياسية تتوافق مع تصاميم الأونكتاد الجمركية.',
                descKu: 'گۆڕینی هەموو فایلە تەقلیدییەکان بۆ زمانی جیهانی گومرگی هێمن.'
              },
              {
                step: '03',
                titleEn: 'Phased Gateway Dual-Run Rollout',
                titleAr: 'ثالثاً: التشغيل المتوازي التجريبي للبوابات والمنافذ الجمركية',
                titleKu: '٣. تاقیکردنەوەی دوولایەنەی زانیارییەکان لە مەرزەکان',
                descEn: 'Process all active entries inside the new single window while simultaneously writing log backups inside legacy platforms for 90 days. Safwan and Umm Qasr operate as primary validation sites before final switchover.',
                descAr: 'تطبيق التشغيل المشترك والتدريجي مع بوابات سفوان وأم قصر لمدة ٩٠ يوماً كبوابة تجريبية أولى قبل الانتقال الكامل والنهائي.',
                descKu: 'تاقیکردنەوەی ڕاستەوخۆی داتا لە مەرزی سەفوان و بەندەری ئوم قەسر بۆ ماوەی ٩٠ ڕۆژ.'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-900 hover:border-slate-800 p-4 rounded-xl flex items-start gap-4 transition-all">
                <span className="text-xl font-mono font-bold text-emerald-500 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  {step.step}
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-sans font-bold text-white">
                    {lang === 'en' ? step.titleEn : lang === 'ar' ? step.titleAr : step.titleKu}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {lang === 'en' ? step.descEn : lang === 'ar' ? step.descAr : step.descKu}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper safely handles Kurdish fallback missing query descriptions in SQL_BLUEPRINTS if needed
function queryDescKuParser(activeQuery: sqlSample) {
  return activeQuery.descriptionKu || "تۆمارکردنی حوسباتی گومرگی فەرمی بە زمانی نێودەوڵەتی.";
}
