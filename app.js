// Noon Community Rishta — Google Sheets submission integration.
// Paste the deployed Google Apps Script Web App URL into SHEETS_WEB_APP_URL below.
const SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw0eeJtI4XiI2ZwU1TyGzBHJ0DWXvJWpd0NbtJHFseDba6l8kLA79W_-9wD0BHUWU1f/exec";
const words = {
en:{join:"Create Profile",eyebrow:"RESPECT • TRUST • FAMILY",heroTitle:"A meaningful connection starts here.",heroText:"A respectful matrimonial community for every caste, biradari and background. Meet with dignity, privacy and family values.",start:"Start your profile →",why:"A better way to find a life partner",whyText:"A welcoming space where every community is respected.",safe:"Admin-reviewed profiles",safeText:"Profiles stay pending until an administrator reviews them.",all:"All communities welcome",allText:"Search by preferences, city and background respectfully.",privacy:"Privacy first",privacyText:"Private contact details are not displayed on public profiles.",create:"Create your rishta profile",privacyNotice:"Your email and mobile number will be saved in Noon Community Rishta’s private Google Sheet for account and profile administration. They will not be shown on public profiles. Submit only if you agree.",name:"Display name",age:"Age (18+)",email:"Email address",mobile:"Mobile number (with country code)",city:"City",gender:"Profile for",education:"Education",profession:"Profession",community:"Biradari (optional)",looking:"Looking for",about:"Short introduction (do not include phone/address)",consent:"I agree that my email and mobile number will be stored privately in the service’s Google Sheet for managing my account and profile.",submitProfile:"Submit profile for review",profiles:"Featured profiles",profilesText:"Approved member profiles will appear here after review.",demo:"Example",sample:"Member profiles",sampleText:"Only profiles approved by the team should be shown here.",footer:"Respect • Privacy • Family",developedBy:"Developed by",emailLabel:"Email",rights:"All rights reserved.",result:"Your profile details were sent for review. Please contact the team if you do not receive confirmation.",setupError:"The Google Sheet connection is not configured yet. Please try again later.",requiredError:"Please complete all required fields and agree to the privacy notice."},
ur:{join:"پروفائل بنائیں",eyebrow:"احترام • اعتماد • خاندان",heroTitle:"اچھے رشتے کی شروعات یہاں سے۔",heroText:"ہر ذات، برادری اور پس منظر کے لیے باعزت رشتہ کمیونٹی۔",start:"پروفائل شروع کریں ←",why:"جیون ساتھی تلاش کرنے کا بہتر طریقہ",whyText:"ایسی جگہ جہاں ہر برادری کا احترام ہو۔",safe:"ایڈمن کی جانچ شدہ پروفائلز",safeText:"ایڈمن کی منظوری تک پروفائل زیرِ التوا رہے گی۔",all:"تمام برادریوں کا خیرمقدم",allText:"شہر اور ترجیحات کے مطابق تلاش کریں۔",privacy:"رازداری پہلے",privacyText:"ذاتی رابطے کی معلومات عوامی پروفائل پر نہیں دکھائی جائیں گی۔",create:"اپنا رشتہ پروفائل بنائیں",privacyNotice:"آپ کا ای میل اور موبائل نمبر اکاؤنٹ اور پروفائل کے انتظام کے لیے Noon Community Rishta کی نجی Google Sheet میں محفوظ ہوگا۔ یہ معلومات عوامی پروفائل پر نہیں دکھائی جائیں گی۔ صرف رضامندی کی صورت میں جمع کروائیں۔",name:"دکھانے والا نام",age:"عمر (کم از کم 18)",email:"ای میل ایڈریس",mobile:"موبائل نمبر (ملک کے کوڈ سمیت)",city:"شہر",gender:"پروفائل کس کے لیے",education:"تعلیم",profession:"پیشہ",community:"برادری (اختیاری)",looking:"رشتہ درکار",about:"مختصر تعارف (فون یا پتہ نہ لکھیں)",consent:"میں رضامند ہوں کہ میرا ای میل اور موبائل نمبر اکاؤنٹ اور پروفائل کے انتظام کے لیے سروس کی نجی Google Sheet میں محفوظ کیا جائے۔",submitProfile:"پروفائل منظوری کے لیے جمع کروائیں",profiles:"منتخب پروفائلز",profilesText:"منظوری کے بعد پروفائلز یہاں دکھائی جائیں گی۔",demo:"مثال",sample:"ممبر پروفائلز",sampleText:"یہاں صرف منظور شدہ پروفائلز دکھائی جانی چاہئیں۔",footer:"احترام • رازداری • خاندان",developedBy:"تیار کردہ",emailLabel:"ای میل",rights:"جملہ حقوق محفوظ ہیں۔",result:"آپ کی پروفائل کی معلومات جائزے کے لیے بھیج دی گئی ہیں۔ اگر تصدیق نہ ملے تو ٹیم سے رابطہ کریں۔",setupError:"Google Sheet ابھی منسلک نہیں ہوئی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",requiredError:"تمام ضروری خانے پُر کریں اور رازداری کی اطلاع سے اتفاق کریں۔"}
};
let lang = "en";
const $ = id => document.getElementById(id);
// Light/Dark mode with remembered preference; defaults to system theme.
const themeBtn = $("themeBtn");
const themeLabel = $("themeLabel");
const themeIcon = document.querySelector(".theme-icon");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if (themeLabel) themeLabel.textContent = dark ? "Light mode" : "Dark mode";
  if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeBtn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", dark ? "#0b1512" : "#063d30");
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("ncr-theme"); } catch (e) {}
const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (systemDark ? "dark" : "light"));
if (themeBtn) themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("ncr-theme", next); } catch (e) {}
});

const year = $("copyrightYear"); if (year) year.textContent = new Date().getFullYear();
$("langBtn").addEventListener("click", () => {
  lang = lang === "en" ? "ur" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => { const key=el.dataset.i18n; if(words[lang][key]) el.textContent=words[lang][key]; });
  $("langBtn").textContent = lang === "en" ? "اردو" : "English";
});
$("profileForm").addEventListener("submit", async e => {
  e.preventDefault();
  const result = $("result");
  const t = words[lang];
  if (!$("consent").checked || !$("profileForm").reportValidity()) { result.textContent=t.requiredError; result.classList.remove("hidden"); return; }
  if (!SHEETS_WEB_APP_URL.startsWith("https://script.google.com/macros/s/")) { result.textContent=t.setupError; result.classList.remove("hidden"); return; }
  const age = Number($("age").value);
  if(age < 18 || age > 100) return;
  const data = new URLSearchParams({
    displayName: $("displayName").value.trim(), age: String(age), email: $("email").value.trim(), mobile: $("mobile").value.trim(),
    city: $("city").value.trim(), gender: $("gender").value, education: $("education").value.trim(),
    profession: $("profession").value.trim(), community: $("community").value.trim(), lookingFor: $("lookingFor").value,
    aboutMe: $("aboutMe").value.trim(), consent: "yes", source: "Noon Community Rishta website"
  });
  const button = $("profileForm").querySelector('button[type="submit"]'); button.disabled=true; button.textContent=lang==="ur"?"جمع ہو رہا ہے…":"Submitting…";
  try {
    // Apps Script accepts URL-encoded form data. no-cors avoids preflight; browser cannot read response.
    await fetch(SHEETS_WEB_APP_URL, {method:"POST", mode:"no-cors", body:data});
    result.textContent=t.result; result.classList.remove("hidden");
    $("profileForm").reset();
  } catch(err) {
    result.textContent=lang==="ur"?"جمع نہیں ہو سکا۔ انٹرنیٹ اور Google Script URL چیک کریں۔":"Submission failed. Check your internet connection and Apps Script URL.";
    result.classList.remove("hidden");
  } finally { button.disabled=false; button.textContent=t.submitProfile; }
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
