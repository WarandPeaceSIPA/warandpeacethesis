#!/bin/bash

################################################################################
# 🚀 سكريبت النشر التلقائي على GitHub Pages
# 
# الوصف: سكريبت شامل لنشر موقع رسالة الماجستير على GitHub Pages
# التاريخ: 5 مارس 2026
# الإصدار: 2.0
################################################################################

# الألوان للطباعة
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# رموز للحالات
SUCCESS="✅"
ERROR="❌"
WARNING="⚠️"
INFO="ℹ️"
ROCKET="🚀"
GEAR="⚙️"
CHECK="🔍"

################################################################################
# دوال مساعدة
################################################################################

print_header() {
    echo -e "${PURPLE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}  ${ROCKET} ${CYAN}$1${NC}"
    echo -e "${PURPLE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${BLUE}${INFO} $1${NC}"
}

print_step() {
    echo -e "${CYAN}${GEAR} $1${NC}"
}

################################################################################
# التحقق من المتطلبات
################################################################################

check_requirements() {
    print_header "التحقق من المتطلبات"
    
    # التحقق من Git
    if command -v git &> /dev/null; then
        print_success "Git مثبت: $(git --version)"
    else
        print_error "Git غير مثبت. يرجى تثبيت Git أولاً"
        exit 1
    fi
    
    # التحقق من الملفات المطلوبة
    print_step "التحقق من الملفات المطلوبة..."
    
    REQUIRED_FILES=(
        "index.html"
        "dashboard.html"
        "dashboard-data.json"
        "script.js"
        "styles.css"
        "papers-database.json"
    )
    
    MISSING_FILES=()
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "موجود: $file"
        else
            print_error "مفقود: $file"
            MISSING_FILES+=("$file")
        fi
    done
    
    if [ ${#MISSING_FILES[@]} -gt 0 ]; then
        print_error "ملفات مفقودة: ${MISSING_FILES[*]}"
        print_info "يرجى التأكد من وجود جميع الملفات في المجلد الحالي"
        exit 1
    fi
    
    echo ""
}

################################################################################
# إعداد Repository
################################################################################

setup_repository() {
    print_header "إعداد Repository"
    
    # طلب معلومات المستخدم
    read -p "أدخل اسم المستخدم على GitHub (الافتراضي: WarandPeaceSIPA): " GITHUB_USER
    GITHUB_USER=${GITHUB_USER:-WarandPeaceSIPA}
    
    read -p "أدخل اسم Repository (الافتراضي: warandpeacethesis): " REPO_NAME
    REPO_NAME=${REPO_NAME:-warandpeacethesis}
    
    REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"
    
    print_info "Repository: $REPO_URL"
    
    # التحقق من وجود مجلد .git
    if [ -d ".git" ]; then
        print_warning "مجلد .git موجود بالفعل"
        read -p "هل تريد إعادة التهيئة؟ (y/n): " REINIT
        if [ "$REINIT" = "y" ]; then
            rm -rf .git
            git init
            print_success "تم إعادة تهيئة Git"
        fi
    else
        git init
        print_success "تم تهيئة Git"
    fi
    
    echo ""
}

################################################################################
# إضافة الملفات
################################################################################

add_files() {
    print_header "إضافة الملفات"
    
    print_step "إضافة جميع الملفات..."
    git add .
    
    if [ $? -eq 0 ]; then
        print_success "تم إضافة الملفات بنجاح"
    else
        print_error "فشل في إضافة الملفات"
        exit 1
    fi
    
    # عرض الملفات المضافة
    print_info "الملفات المضافة:"
    git status --short
    
    echo ""
}

################################################################################
# Commit التغييرات
################################################################################

commit_changes() {
    print_header "Commit التغييرات"
    
    # رسالة commit افتراضية
    DEFAULT_MESSAGE="Deploy website with correct Dar Al Hekma logo and interactive dashboard"
    
    read -p "أدخل رسالة commit (اضغط Enter للاستخدام الافتراضي): " COMMIT_MESSAGE
    COMMIT_MESSAGE=${COMMIT_MESSAGE:-$DEFAULT_MESSAGE}
    
    print_step "إنشاء commit..."
    git commit -m "$COMMIT_MESSAGE"
    
    if [ $? -eq 0 ]; then
        print_success "تم إنشاء commit بنجاح"
    else
        print_error "فشل في إنشاء commit"
        exit 1
    fi
    
    echo ""
}

################################################################################
# Push إلى GitHub
################################################################################

push_to_github() {
    print_header "Push إلى GitHub"
    
    # إضافة remote
    print_step "إضافة remote..."
    git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
    
    # تحديد البرانش
    BRANCH="main"
    git branch -M "$BRANCH"
    
    print_step "Push إلى GitHub..."
    print_warning "قد يطلب منك إدخال اسم المستخدم وكلمة المرور أو Personal Access Token"
    
    git push -u origin "$BRANCH"
    
    if [ $? -eq 0 ]; then
        print_success "تم Push بنجاح إلى GitHub"
    else
        print_error "فشل في Push إلى GitHub"
        print_info "تأكد من:"
        print_info "  1. صحة اسم المستخدم وكلمة المرور"
        print_info "  2. وجود Repository على GitHub"
        print_info "  3. لديك صلاحيات Push"
        exit 1
    fi
    
    echo ""
}

################################################################################
# تفعيل GitHub Pages
################################################################################

enable_github_pages() {
    print_header "تفعيل GitHub Pages"
    
    print_info "لتفعيل GitHub Pages، اتبع الخطوات التالية:"
    echo ""
    echo "1. افتح: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
    echo "2. في Source، اختر: Deploy from a branch"
    echo "3. في Branch، اختر: $BRANCH"
    echo "4. في Folder، اختر: / (root)"
    echo "5. اضغط Save"
    echo ""
    
    print_warning "انتظر 2-5 دقائق حتى يتم نشر الموقع"
    
    echo ""
}

################################################################################
# عرض النتائج
################################################################################

show_results() {
    print_header "النتائج"
    
    SITE_URL="https://$GITHUB_USER.github.io/$REPO_NAME/"
    DASHBOARD_URL="${SITE_URL}dashboard.html"
    
    print_success "تم النشر بنجاح!"
    echo ""
    
    print_info "الروابط:"
    echo -e "${CYAN}  📄 الصفحة الرئيسية:${NC} $SITE_URL"
    echo -e "${CYAN}  📊 لوحة التحكم:${NC} $DASHBOARD_URL"
    echo -e "${CYAN}  💻 Repository:${NC} https://github.com/$GITHUB_USER/$REPO_NAME"
    echo -e "${CYAN}  ⚙️  الإعدادات:${NC} https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
    echo ""
    
    print_warning "ملاحظة: قد يستغرق الموقع 2-5 دقائق حتى يصبح متاحاً"
    
    echo ""
    print_info "الخطوات التالية:"
    echo "  1. افتح صفحة الإعدادات وتأكد من تفعيل GitHub Pages"
    echo "  2. انتظر حتى يظهر الموقع"
    echo "  3. افتح الرابط وتحقق من عمل جميع الميزات"
    echo "  4. اختبر لوحة التحكم"
    echo "  5. تحقق من ظهور الشعار الصحيح"
    echo ""
}

################################################################################
# اختبار الموقع
################################################################################

test_website() {
    print_header "اختبار الموقع"
    
    SITE_URL="https://$GITHUB_USER.github.io/$REPO_NAME/"
    
    print_step "انتظار نشر الموقع..."
    
    read -p "هل تريد اختبار الموقع الآن؟ (y/n): " TEST_NOW
    
    if [ "$TEST_NOW" = "y" ]; then
        print_step "فتح الموقع في المتصفح..."
        
        # محاولة فتح في المتصفح حسب نظام التشغيل
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open "$SITE_URL" 2>/dev/null || firefox "$SITE_URL" 2>/dev/null || google-chrome "$SITE_URL" 2>/dev/null
        elif [[ "$OSTYPE" == "darwin"* ]]; then
            open "$SITE_URL"
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
            start "$SITE_URL"
        fi
        
        if [ $? -eq 0 ]; then
            print_success "تم فتح الموقع في المتصفح"
        else
            print_warning "لم نتمكن من فتح المتصفح تلقائياً"
            print_info "افتح الرابط يدوياً: $SITE_URL"
        fi
    else
        print_info "يمكنك فتح الموقع لاحقاً: $SITE_URL"
    fi
    
    echo ""
}

################################################################################
# الدالة الرئيسية
################################################################################

main() {
    clear
    
    print_header "سكريبت النشر التلقائي على GitHub Pages"
    
    print_info "هذا السكريبت سيقوم بـ:"
    echo "  1. التحقق من المتطلبات"
    echo "  2. إعداد Git Repository"
    echo "  3. إضافة جميع الملفات"
    echo "  4. إنشاء Commit"
    echo "  5. Push إلى GitHub"
    echo "  6. توجيهك لتفعيل GitHub Pages"
    echo ""
    
    read -p "هل تريد المتابعة؟ (y/n): " CONTINUE
    
    if [ "$CONTINUE" != "y" ]; then
        print_warning "تم الإلغاء من قبل المستخدم"
        exit 0
    fi
    
    echo ""
    
    # تنفيذ الخطوات
    check_requirements
    setup_repository
    add_files
    commit_changes
    push_to_github
    enable_github_pages
    show_results
    test_website
    
    # الخلاصة النهائية
    print_header "تم بنجاح!"
    
    echo -e "${GREEN}"
    echo "  ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗"
    echo "  ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝"
    echo "  ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ "
    echo "  ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  "
    echo "  ██║  ██║███████╗██║  ██║██████╔╝   ██║   "
    echo "  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝   "
    echo -e "${NC}"
    
    print_success "تم نشر الموقع بنجاح على GitHub Pages!"
    print_info "شكراً لاستخدام السكريبت"
    
    echo ""
}

################################################################################
# تشغيل السكريبت
################################################################################

# التحقق من أننا في المجلد الصحيح
if [ ! -f "index.html" ]; then
    print_error "يرجى تشغيل السكريبت من مجلد الموقع (حيث يوجد index.html)"
    exit 1
fi

# تشغيل الدالة الرئيسية
main

exit 0
