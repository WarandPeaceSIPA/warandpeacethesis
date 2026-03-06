# دليل نشر الموقع على GitHub Pages
# GitHub Pages Deployment Guide

## الخطوات بالعربية:

### 1. إنشاء حساب GitHub (إذا لم يكن لديك):
- اذهب إلى: https://github.com
- انقر على "Sign up"
- أكمل عملية التسجيل

### 2. إنشاء Repository جديد:
- انقر على زر "+" في الأعلى واختر "New repository"
- اسم الـ Repository: `warandpeacethesis`
- اجعله Public
- لا تضف README (لأنه موجود بالفعل)
- انقر "Create repository"

### 3. رفع الملفات:

#### الطريقة الأولى: عبر واجهة GitHub (الأسهل):
1. في صفحة الـ Repository الجديد، انقر "uploading an existing file"
2. اسحب جميع الملفات من المجلد `warandpeacethesis-github`:
   - index.html
   - script.js
   - styles.css
   - papers-database.json
   - package.json
   - README.md
   - .gitignore
3. انقر "Commit changes"

#### الطريقة الثانية: عبر Git Command Line:
```bash
cd /path/to/warandpeacethesis-github
git init
git add .
git commit -m "Initial commit: War and Peace Thesis website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/warandpeacethesis.git
git push -u origin main
```

### 4. تفعيل GitHub Pages:
1. اذهب إلى Settings في الـ Repository
2. في القائمة الجانبية، انقر "Pages"
3. في "Source"، اختر "main" branch
4. اختر "/ (root)" كمجلد
5. انقر "Save"

### 5. انتظر دقيقة واحدة:
- سيتم نشر الموقع تلقائياً
- الرابط سيكون: `https://YOUR_USERNAME.github.io/warandpeacethesis`

### 6. (اختياري) إضافة نطاق مخصص:
إذا كان لديك نطاق خاص (مثل warandpeacethesis.com):
1. في نفس صفحة GitHub Pages
2. أضف النطاق في خانة "Custom domain"
3. اتبع تعليمات إعداد DNS

---

## English Instructions:

### 1. Create GitHub Account (if you don't have one):
- Go to: https://github.com
- Click "Sign up"
- Complete registration

### 2. Create New Repository:
- Click "+" button at top, choose "New repository"
- Repository name: `warandpeacethesis`
- Make it Public
- Don't add README (already exists)
- Click "Create repository"

### 3. Upload Files:

#### Method 1: Via GitHub Interface (Easiest):
1. On new repository page, click "uploading an existing file"
2. Drag all files from `warandpeacethesis-github` folder:
   - index.html
   - script.js
   - styles.css
   - papers-database.json
   - package.json
   - README.md
   - .gitignore
3. Click "Commit changes"

#### Method 2: Via Git Command Line:
```bash
cd /path/to/warandpeacethesis-github
git init
git add .
git commit -m "Initial commit: War and Peace Thesis website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/warandpeacethesis.git
git push -u origin main
```

### 4. Enable GitHub Pages:
1. Go to Settings in your repository
2. In sidebar, click "Pages"
3. Under "Source", select "main" branch
4. Choose "/ (root)" as folder
5. Click "Save"

### 5. Wait 1 minute:
- Site will be published automatically
- URL will be: `https://YOUR_USERNAME.github.io/warandpeacethesis`

### 6. (Optional) Add Custom Domain:
If you have a custom domain (like warandpeacethesis.com):
1. In same GitHub Pages settings
2. Add domain in "Custom domain" field
3. Follow DNS setup instructions

---

## ملاحظات مهمة | Important Notes:

✅ الموقع سيكون متاحاً للعامة
✅ Site will be publicly accessible

✅ التحديثات تحدث تلقائياً عند رفع ملفات جديدة
✅ Updates happen automatically when uploading new files

✅ مجاني تماماً
✅ Completely free

✅ يدعم HTTPS تلقائياً
✅ HTTPS enabled automatically

---

## الدعم | Support:

إذا واجهت أي مشاكل، يمكنك:
- مراجعة توثيق GitHub Pages: https://docs.github.com/en/pages
- التواصل مع الباحث: zmalessi@dah.edu.sa

If you face any issues:
- Check GitHub Pages documentation: https://docs.github.com/en/pages
- Contact researcher: zmalessi@dah.edu.sa
