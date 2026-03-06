#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
#  🚀 سكريبت النشر السريع لموقع War & Peace Thesis
# ═══════════════════════════════════════════════════════════════════════════════

echo "════════════════════════════════════════════════════════════════"
echo "  🚀 بدء عملية النشر على GitHub Pages"
echo "════════════════════════════════════════════════════════════════"
echo ""

# الانتقال إلى مجلد المشروع
cd /home/sandbox/warandpeacethesis-github

# التحقق من وجود الملفات
echo "📁 التحقق من الملفات..."
if [ ! -f "index.html" ]; then
    echo "❌ خطأ: ملف index.html غير موجود!"
    exit 1
fi

echo "✅ جميع الملفات موجودة"
echo ""

# تهيئة Git إذا لم يكن موجوداً
if [ ! -d ".git" ]; then
    echo "🔧 تهيئة مستودع Git..."
    git init
    git branch -M main
    echo "✅ تم تهيئة Git"
else
    echo "✅ مستودع Git موجود بالفعل"
fi
echo ""

# إضافة جميع الملفات
echo "📦 إضافة الملفات للمستودع..."
git add .
echo "✅ تمت إضافة جميع الملفات"
echo ""

# إنشاء Commit
echo "💾 إنشاء Commit..."
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Update: Analytics system added - $TIMESTAMP" 2>/dev/null || git commit -m "Initial commit with analytics - $TIMESTAMP"
echo "✅ تم إنشاء Commit"
echo ""

# إضافة Remote إذا لم يكن موجوداً
echo "🔗 التحقق من Remote Repository..."
if ! git remote get-url origin &>/dev/null; then
    echo "⚠️  يجب إضافة Remote URL يدوياً:"
    echo ""
    echo "   git remote add origin https://github.com/WarandPeaceSIPA/warandpeacethesis.git"
    echo ""
    echo "   ثم قم بتشغيل:"
    echo "   git push -u origin main --force"
    echo ""
else
    echo "✅ Remote موجود: $(git remote get-url origin)"
    echo ""
    
    # محاولة Push
    echo "🚀 رفع التحديثات إلى GitHub..."
    echo "⚠️  قد يُطلب منك إدخال بيانات الدخول..."
    echo ""
    
    git push -u origin main --force
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "════════════════════════════════════════════════════════════════"
        echo "  ✅ تم النشر بنجاح!"
        echo "════════════════════════════════════════════════════════════════"
        echo ""
        echo "🌐 رابط الموقع:"
        echo "   https://warandpeacesipa.github.io/warandpeacethesis/"
        echo ""
        echo "⏱️  انتظر 2-3 دقائق حتى يتم تحديث الموقع"
        echo ""
        echo "📊 لا تنسى إعداد Google Analytics و Microsoft Clarity!"
        echo "   راجع: ANALYTICS_SETUP_GUIDE_دليل_إعداد_الإحصائيات.txt"
        echo ""
        echo "════════════════════════════════════════════════════════════════"
    else
        echo ""
        echo "❌ فشل الرفع إلى GitHub"
        echo ""
        echo "💡 الحلول الممكنة:"
        echo "   1. تأكد من أنك مسجل دخول في Git"
        echo "   2. تأكد من صلاحياتك على المستودع"
        echo "   3. جرب الأمر التالي يدوياً:"
        echo ""
        echo "      cd /home/sandbox/warandpeacethesis-github"
        echo "      git push -u origin main --force"
        echo ""
    fi
fi
