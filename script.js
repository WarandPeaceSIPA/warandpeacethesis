// Global variables
let allPapers = [];
let filteredPapers = [];
let currentPage = 1;
const papersPerPage = 10;

// Load papers data
async function loadPapers() {
    try {
        const response = await fetch('papers-database.json');
        allPapers = await response.json();
        filteredPapers = [...allPapers];
        displayPapers();
        updatePapersCount();
        initializeChart();
    } catch (error) {
        console.error('Error loading papers:', error);
        document.getElementById('papersList').innerHTML = `
            <div class="bg-red-50 border-r-4 border-red-500 p-6 rounded-lg">
                <p class="text-red-700 font-semibold">
                    <i class="fas fa-exclamation-triangle ml-2"></i>
                    حدث خطأ في تحميل قاعدة البيانات. يُرجى المحاولة لاحقاً.
                </p>
            </div>
        `;
    }
}

// Display papers with pagination
function displayPapers() {
    const papersList = document.getElementById('papersList');
    const start = (currentPage - 1) * papersPerPage;
    const end = start + papersPerPage;
    const papersToShow = filteredPapers.slice(start, end);
    
    if (papersToShow.length === 0) {
        papersList.innerHTML = `
            <div class="bg-yellow-50 border-r-4 border-yellow-500 p-6 rounded-lg text-center">
                <i class="fas fa-search text-4xl text-yellow-600 mb-4"></i>
                <p class="text-yellow-700 font-semibold text-lg">
                    لم يتم العثور على أوراق تطابق معايير البحث
                </p>
            </div>
        `;
        return;
    }
    
    papersList.innerHTML = papersToShow.map(paper => `
        <div class="paper-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 fade-in">
            <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                <div class="flex-1">
                    <div class="flex items-start gap-3 mb-3">
                        <div class="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                            ${paper.id}
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                                ${highlightText(paper.title)}
                            </h3>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span class="text-sm text-gray-600">
                                    <i class="fas fa-user ml-1"></i>
                                    ${highlightText(paper.authors)}
                                </span>
                                <span class="text-sm text-gray-600">
                                    <i class="fas fa-calendar ml-1"></i>
                                    ${paper.year}
                                </span>
                                <span class="text-sm text-gray-600">
                                    <i class="fas fa-book ml-1"></i>
                                    ${paper.journal}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 leading-relaxed mb-3">
                        ${highlightText(paper.abstract)}
                    </p>
                    
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            <i class="fas fa-quote-right ml-1"></i>
                            ${paper.citations} استشهاد
                        </span>
                        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <i class="fas fa-star ml-1"></i>
                            صلة: ${paper.relevance_score}
                        </span>
                        ${paper.doi !== 'N/A' ? `
                            <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                <i class="fas fa-fingerprint ml-1"></i>
                                DOI
                            </span>
                        ` : ''}
                    </div>
                </div>
                
                <div class="flex flex-col gap-2">
                    ${paper.url !== '#' && paper.url !== 'N/A' ? `
                        <a href="${paper.url}" target="_blank" rel="noopener noreferrer" 
                           class="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors text-center whitespace-nowrap">
                            <i class="fas fa-external-link-alt ml-1"></i>
                            عرض الورقة
                        </a>
                    ` : ''}
                    <button onclick="showPaperDetails(${paper.id})" 
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors text-center whitespace-nowrap">
                        <i class="fas fa-info-circle ml-1"></i>
                        التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    displayPagination();
}

// Highlight search terms
function highlightText(text) {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// Display pagination
function displayPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <button onclick="changePage(${currentPage - 1})" 
                    class="px-4 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" 
                    class="px-4 py-2 ${i === currentPage ? 'bg-purple-600 text-white' : 'bg-white text-purple-600 border-2 border-purple-600'} rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition-colors">
                ${i}
            </button>
        `;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" 
                    class="px-4 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
    }
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    displayPapers();
    document.getElementById('papers').scrollIntoView({ behavior: 'smooth' });
}

// Update papers count
function updatePapersCount() {
    const count = document.getElementById('papersCount');
    count.innerHTML = `
        <i class="fas fa-file-alt ml-1"></i>
        عرض ${filteredPapers.length} من أصل ${allPapers.length} ورقة أكاديمية
    `;
}

// Search papers
function searchPapers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredPapers = [...allPapers];
    } else {
        filteredPapers = allPapers.filter(paper => 
            paper.title.toLowerCase().includes(searchTerm) ||
            paper.authors.toLowerCase().includes(searchTerm) ||
            paper.abstract.toLowerCase().includes(searchTerm) ||
            paper.journal.toLowerCase().includes(searchTerm)
        );
    }
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    const yearFilter = document.getElementById('yearFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    // Apply year filter
    if (yearFilter) {
        const [startYear, endYear] = yearFilter.split('-').map(Number);
        filteredPapers = filteredPapers.filter(paper => {
            const year = parseInt(paper.year);
            return year >= startYear && year <= endYear;
        });
    }
    
    // Apply sort
    switch (sortFilter) {
        case 'citations':
            filteredPapers.sort((a, b) => {
                const citA = parseInt(a.citations.replace(/\D/g, '')) || 0;
                const citB = parseInt(b.citations.replace(/\D/g, '')) || 0;
                return citB - citA;
            });
            break;
        case 'year-desc':
            filteredPapers.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            break;
        case 'year-asc':
            filteredPapers.sort((a, b) => parseInt(a.year) - parseInt(b.year));
            break;
        case 'relevance':
        default:
            filteredPapers.sort((a, b) => a.relevance_score - b.relevance_score);
            break;
    }
    
    currentPage = 1;
    displayPapers();
    updatePapersCount();
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('sortFilter').value = 'relevance';
    filteredPapers = [...allPapers];
    currentPage = 1;
    displayPapers();
    updatePapersCount();
}

// Show paper details (modal)
function showPaperDetails(paperId) {
    const paper = allPapers.find(p => p.id === paperId);
    if (!paper) return;
    
    alert(`
عنوان الورقة: ${paper.title}

المؤلفون: ${paper.authors}

السنة: ${paper.year}

المجلة: ${paper.journal}

عدد الاستشهادات: ${paper.citations}

DOI: ${paper.doi}

الملخص: ${paper.abstract}
    `);
}

// Initialize convergence chart
function initializeChart() {
    const ctx = document.getElementById('convergenceChart');
    if (!ctx) return;
    
    // Generate data for convergence rate visualization
    const timePoints = [];
    const convergenceData = [];
    const delta0 = 0.3; // Initial divergence
    const tau2 = 0.01; // Signal noise
    const sigma2 = 0.04; // Prior uncertainty
    
    for (let t = 0; t <= 20; t++) {
        timePoints.push(t);
        const convergence = delta0 * (tau2 / (tau2 + t * sigma2));
        convergenceData.push(convergence);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timePoints,
            datasets: [{
                label: 'معدل التقارب (Δₜ)',
                data: convergenceData,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }, {
                label: 'العتبة الحرجة (δ)',
                data: Array(timePoints.length).fill(0.05),
                borderColor: '#ef4444',
                borderWidth: 2,
                borderDash: [10, 5],
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 14
                        },
                        usePointStyle: true,
                        padding: 20
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Cairo',
                        size: 14
                    },
                    bodyFont: {
                        family: 'Cairo',
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(4);
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'الزمن (t)',
                        font: {
                            family: 'Cairo',
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Cairo',
                            size: 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'تباين التوقعات',
                        font: {
                            family: 'Cairo',
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Cairo',
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load papers
    loadPapers();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Search button
    document.getElementById('searchBtn').addEventListener('click', searchPapers);
    
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPapers();
        }
    });
    
    // Filter changes
    document.getElementById('yearFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
    
    // Reset filters button
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // Mobile menu button
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Scroll to top on page load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});