# 🚀 النشر السريع - موقع رسالة الماجستير

## ⚡ البدء السريع (3 دقائق)

### الطريقة 1: استخدام السكريبت التلقائي (الأسهل)

```bash
# 1. انتقل إلى مجلد الموقع
cd warandpeacethesis-github

# 2. شغّل السكريبت
./deploy.sh

# 3. اتبع التعليمات
```

السكريبت سيقوم بكل شيء تلقائياً! ✨

---

### الطريقة 2: رفع يدوي عبر GitHub Web

1. **افتح Repository:**
   - https://github.com/WarandPeaceSIPA/warandpeacethesis

2. **ارفع الملفات:**
   - اضغط `Add file` → `Upload files`
   - اسحب جميع الملفات
   - Commit message: `Deploy with correct logo and dashboard`
   - اضغط `Commit changes`

3. **فعّل GitHub Pages:**
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`, Folder: `/ (root)`
   - اضغط `Save`

4. **انتظر 2-5 دقائق**

5. **افتح الموقع:**
   - https://warandpeacesipa.github.io/warandpeacethesis/

---

### الطريقة 3: Git CLI

```bash
# Clone
git clone https://github.com/WarandPeaceSIPA/warandpeacethesis.git
cd warandpeacethesis

# نسخ الملفات
cp /path/to/warandpeacethesis-github/* .

# Push
git add .
git commit -m "Deploy with correct logo and dashboard"
git push origin main

# فعّل GitHub Pages من Settings
```

---

## 📂 الملفات المهمة

| الملف | الوصف |
|-------|-------|
| `index.html` | الصفحة الرئيسية (محدّثة مع الشعار الصحيح) |
| `dashboard.html` | لوحة التحكم التفاعلية (6 رسوم بيانية) |
| `dashboard-data.json` | بيانات Dashboard |
| `deploy.sh` | سكريبت النشر التلقائي |
| `GITHUB_PAGES_DEPLOYMENT_COMPLETE_GUIDE.md` | الدليل الشامل |
| `DEPLOYMENT_CHECKLIST.md` | قائمة التحقق |

---

## ✅ التحقق

بعد النشر، تأكد من:

- ✅ الشعار الصحيح يظهر
- ✅ لوحة التحكم تعمل
- ✅ قاعدة البيانات تعمل
- ✅ الموقع Responsive

---

## 🔗 الروابط

- **الموقع:** https://warandpeacesipa.github.io/warandpeacethesis/
- **Dashboard:** https://warandpeacesipa.github.io/warandpeacethesis/dashboard.html
- **Repository:** https://github.com/WarandPeaceSIPA/warandpeacethesis
- **Settings:** https://github.com/WarandPeaceSIPA/warandpeacethesis/settings/pages

---

## 📞 الدعم

مشكلة؟ راجع:
- `GITHUB_PAGES_DEPLOYMENT_COMPLETE_GUIDE.md` - دليل شامل
- `DEPLOYMENT_CHECKLIST.md` - قائمة تحقق تفصيلية

---

**تم بنجاح! 🎉**
