const ar = {
  login: {
    signIn: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمه السر",
  },
  patientFile: {
    visitHistory: "سجل الزيارات",
    visitHistoryDescription: "سجل آخر زيارات المريض مع مقدم الرعاية الصحية",
    medicalHistory: "التاريخ الطبي",
    medicalHistoryDescription: "تاريخ طبي للمريض",
    complaint: "شكوى",
    complaintDescription: "شكوى المريض أو قلق طبي",
    examination: "فحص",
    examinationDescription: "فحوصات جسدية تمت في زيارات سابقة",
    medicine: "دواء",
    medicineDescription: "الدواء المصرح به للمريض",
  },
  newVisitScreen: {
    // thranslations of newVisit key values into arabic
    medicalHistory: "التاريخ الطبي",
    medicalHistoryDescription: "تاريخ طبي للمريض",
    complaint: "شكوى",
    complaintDescription: "شكوى المريض أو قلق طبي",
    vitals: "المعلومات الأساسية",
    vitalsDescription: "المعلومات الأساسية التي تمت جمعها خلال الزيارة",
    examination: "فحص",
    examinationDescription: "فحص المريض",
    medicineDispensed: "الدواء المصرح به",
    medicineDispensedDescription: "الدواء المصرح به للمريض",
    physiotherapy: "العلاج الطبيعي",
    physiotherapyDescription: "علاج طبيعي تم تقديمه للمريض",
    dentalTreatment: "علاج الأسنان",
    dentalTreatmentDescription: "علاج أسنان تم تقديمه للمريض",
    notes: "ملاحظات",
    notesDescription: "ملاحظات على المريض",
    covid19Screening: "فحص COVID-19",
    covid19ScreeningDescription: "استبيان فحص COVID-19",
  },
  patientList: {
    newPatient: "مريض جديد"
  },
  languageCode: "ar",
  male: "ذكر",
  female: "أنثى",
  signOut: "خروج",
  patients: "المرضى",
  PATIENTS: "المرضى",
  welcome: "مرحبا بعودتك",
  dob: "تاريخ الولادة",
  DOB: "تاريخ الولادة",
  sex: "جنس",
  gender: "جنس",
  GENDER: "جنس",
  patientSummary: "ملخص المريض",
  noContent: "لا يوجد محتوى حتى الآن",
  age: "عمر",
  edit: "تعديل",
  back: "رجع",
  save: "حفظ",
  confirm: "تؤكد",
  cancel: "إلغاء",
  yes: "نعم",
  no: "لا",
  firstName: "الاسم المعطى",
  surname: "الكنية",
  country: "بلد",
  hometown: "مسقط رأس",
  selectDob: "اختر تاريخ الميلاد",
  phone: "هاتف",
  patientSearch: "البحث عن اسم المريض",
  search: "بحث",
  minAge: "الحد الإدنى للعمر",
  maxAge: "العمر الأقصى",
  advancedFilters: "مرشحات متقدمة ▼",
  hideFilters: "إخفاء المرشحات",
  clearFilters: "إعادة تعيين الفلاتر",
  newPatient: "مريض جديد",
  newVisit: "زيارة جديدة",
  newEntry: "دخول جديد",
  camp: "مخيم",
  vitals: "الأعضاء الحيوية",
  examination: "فحص",
  notes: "ملاحظات",
  complaint: "شكوى",
  treatment: "علاج او معاملة",
  diagnosis: "التشخيص",
  medicineDispensed: "الأدوية المستغلة",
  prescriptions: "وصفات",
  allergies: "الحساسية",
  medicalHistory: "تاريخ طبى",
  covidScreening: "COVID-19 فحص",
  enterTextHere: "أدخل النص هنا",
  visitDate: "موعد زيارة",
  visitHistory: "زيارة التاريخ",
  visitEvents: "زيارة الأحداث",
  visitType: "نوع الزيارة",
  trends: "اتجاهات",
  eventType: "نوع الحدث",
  datePrescribed: "التاريخ المحدد",
  provider: "طبيب",
  severity: "خطورة",
  onsetDate: "تاريخ البداية",
  departure: "مغادرة",
  to: "إلى",
  return: "إرجاع",
  fever: "حمى أم قشعريرة؟",
  dryCough: "سعال جاف؟",
  diffBreathing: "صعوبة في التنفس؟",
  soreThroat: "التهاب بالحلق أو سيلان  بالأنف؟",
  nausea: "غثيان، قيء، او إسهال؟",
  chestPain: "ألم في الصدر؟",
  confusion: "اضطراب إدراكي حديث؟",
  bluish: "الشفاه الزرقاء أم الوجه؟",
  fatigue: "إعياء؟",
  aches: "اوجاع والآم؟",
  headache: "صداع الراس؟",
  changeTasteSmell: "تغير في الطعم أو الرائحة؟",
  diabetes: "داء السكري؟",
  cardioDisease: "أمراض القلب والأوعية الدموية؟",
  pulmonaryDisease: "المرض الرئوي؟",
  renalDisease: "امراض الكلى؟",
  malignancy: "خباثة؟",
  pregnant: "حامل أو أسبوعين بعد الولادة؟",
  immunocompromised: "المنقوصي المناعة؟",
  exposureKnown: "مخالطة أفراد مصابين او مشتبهين بالإصابة بفيروس كوفيد-١٩؟",
  travel: "السفر خارج البلاد بالآونة الأخيرة؟",
  symptomsDate: "تاريخ ظهور الأعراض الأولى؟",
  riskFactors: "عوامل الخطر",
  hideRiskFactors: "إخفاء عوامل الخطر",
  testIsolate: "اختبار وعزل المريض",
  seekCare: "احصل على رعاية الطوارئ واعزل نفسك",
  noAction: "لا رد فعل",
  syncFailure: "فشل مزامنة قاعدة البيانات",
  syncFailureConnection: "تحقق من اتصال الإنترنت",
  syncFailureSystem: "اتصل بمسؤول النظام",
  syncSuccess: "نجاح مزامنة قاعدة البيانات",
  surgeryHx: "العمليات السابقة",
  chronicConditions: "الامراض المزمنة",
  currentMedications: "الأدوية الحالية",
  vaccinations: "التطعيمات ",
  generalObservations: "مراقبة عامة",
  covid19: "كوفيد-١٩",
  referral: "تحويل الى مختص",
  medicine: "طب",
  medication: "دواء",
  type: "نوع",
  tablet: "قرص",
  syrup: "شراب",
  ampule: "امبولة",
  suppository: "تحميلة",
  cream: "مرهم",
  drops: "قطرات",
  bottle: "زجاجة",
  spray: "رذاذ",
  gel: "جل",
  lotion: "غسول",
  dosage: "جرعة",
  days: "ايام",
  dentalTreatment: "العناية بالاسنان",
  physiotherapy: "العلاج الطبيعي",
  previousTreatment: "جلسات العلاج الطبيعي السابقة",
  findings: "نتائج الفحص",
  treatmentPlan: "خطة العلاج ",
  treatmentSession: "جلسة العلاج",
  recommendations: "توصيات",
  patientSnapshot: "صفحة المريض",
  logOut: "تسجيل خروج",
  sync: "مزامنة",
}

// TODO: Arabic translations have to be updated for:
// login screen
//

export default ar
export type Translations = typeof ar
