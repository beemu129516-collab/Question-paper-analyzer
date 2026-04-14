// Q-Insight - Question Paper Analyzer JavaScript
// Advanced Frontend Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeThemeToggle();
    initializeFileUpload();
    initializeSearch();
    initializeFilters();
    initializeModals();
    initializeCharts();
    initializeForms();

    // Hide loading overlay
    setTimeout(() => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }, 1000);
});

// Navigation Functions
function initializeNavigation() {
    // Sticky navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksArray = document.querySelectorAll('.nav-links a, .sidebar-nav-link');

    navLinksArray.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .stat-card, .testimonial-card, .card').forEach(card => {
        observer.observe(card);
    });
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');

    // Set initial icon
    updateThemeIcon(savedTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';

        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', newTheme);

        // Update icon
        updateThemeIcon(!isDark);
    });
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';
    }
}

// File Upload Functionality
function initializeFileUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-input');

    if (!uploadArea || !fileInput) return;

    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.classList.add('dragover');
    }

    function unhighlight() {
        uploadArea.classList.remove('dragover');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        [...files].forEach(uploadFile);
    }

    function uploadFile(file) {
        // Simulate file upload
        showNotification(`Uploading ${file.name}...`, 'info');

        // Show progress
        const progressBar = document.querySelector('.progress-bar');
        const progressFill = document.querySelector('.progress-fill');

        if (progressBar && progressFill) {
            progressFill.style.width = '0%';
            let progress = 0;

            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    showNotification(`${file.name} uploaded successfully!`, 'success');

                    // Trigger analysis if on analyze page
                    if (window.location.pathname.includes('analyze.html')) {
                        setTimeout(() => {
                            performAnalysis(file);
                        }, 500);
                    }
                }
                progressFill.style.width = progress + '%';
            }, 200);
        }
    }
}

// Analysis Functionality
function performAnalysis(file) {
    // Hide upload area and show results
    const uploadSection = document.querySelector('.upload-section');
    const resultsSection = document.querySelector('.results-section');

    if (uploadSection && resultsSection) {
        uploadSection.style.display = 'none';
        resultsSection.style.display = 'block';

        // Simulate analysis delay
        setTimeout(() => {
            generateAnalysisResults();
        }, 2000);
    }
}

function generateAnalysisResults() {
    // Generate random analysis results
    const totalQuestions = Math.floor(Math.random() * 50) + 20;
    const repeatedQuestions = Math.floor(totalQuestions * (Math.random() * 0.4 + 0.1));
    const difficultyLevels = ['Easy', 'Medium', 'Hard'];
    const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

    const importantUnits = [
        'Unit 1: Introduction to Programming',
        'Unit 2: Data Structures',
        'Unit 3: Algorithms',
        'Unit 4: Database Management',
        'Unit 5: Web Development'
    ];

    const randomUnits = importantUnits.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Update results
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('repeated-questions').textContent = repeatedQuestions;
    document.getElementById('difficulty-level').textContent = difficulty;
    document.getElementById('important-units').innerHTML = randomUnits.map(unit =>
        `<li>${unit}</li>`
    ).join('');

    // Generate insights
    const insights = [
        `Unit 3 has appeared in ${Math.floor(Math.random() * 5) + 1} out of 5 papers.`,
        `${Math.floor(Math.random() * 30) + 10}% questions are from Database concepts.`,
        `Long Answer Questions dominate ${Math.floor(Math.random() * 40) + 20}% of the paper.`,
        `Previous year questions have ${Math.floor(Math.random() * 20) + 5}% similarity.`,
        `Focus on ${randomUnits[0].split(':')[0]} for better preparation.`
    ];

    document.getElementById('ai-insights').innerHTML = insights.map(insight =>
        `<div class="insight-card">
            <i class="fas fa-lightbulb text-warning"></i>
            <span>${insight}</span>
        </div>`
    ).join('');

    // Animate progress bars
    animateProgressBars();

    // Show charts
    initializeCharts();

    showNotification('Analysis completed successfully!', 'success');
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = Math.floor(Math.random() * 40) + 30; // 30-70%
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.searchable-item');

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Filter Functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            const items = document.querySelectorAll('.filterable-item');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Modal Functionality
function initializeModals() {
    // Modal triggers
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-modal]')) {
            const modalId = e.target.getAttribute('data-modal');
            showModal(modalId);
        }

        if (e.target.matches('.modal') || e.target.matches('.modal-close')) {
            hideModal();
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.classList.remove('show'));
    document.body.style.overflow = 'auto';
}

// Charts and Visualizations
function initializeCharts() {
    // Bar chart animation
    const chartBars = document.querySelectorAll('.chart-bar-fill');

    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            const height = Math.floor(Math.random() * 80) + 20; // 20-100%
            bar.style.height = height + '%';
        }, index * 100);
    });

    // Circular progress animation
    const circularProgresses = document.querySelectorAll('.circular-progress-fill');

    circularProgresses.forEach(progress => {
        const percentage = Math.floor(Math.random() * 40) + 30; // 30-70%
        const circumference = 283; // 2 * π * r (r = 45)
        const offset = circumference - (percentage / 100) * circumference;

        progress.style.strokeDashoffset = offset;
    });
}

// Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.innerHTML = '<div class="loading"></div> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                if (form.id === 'contact-form') {
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                } else if (form.id === 'settings-form') {
                    showNotification('Settings saved successfully!', 'success');
                } else {
                    showNotification('Form submitted successfully!', 'success');
                }
            }, 2000);
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="d-flex align-center">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
            };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Generate sample data for history and insights
function generateSampleData() {
    const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const examTypes = ['Mid-term', 'Final', 'Quiz', 'Assignment'];

    return {
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
        examType: examTypes[Math.floor(Math.random() * examTypes.length)],
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        questions: Math.floor(Math.random() * 50) + 20,
        repeatedTopics: Math.floor(Math.random() * 10) + 1
    };
}

// Export functions for global use
window.showNotification = showNotification;
window.showModal = showModal;
window.hideModal = hideModal;
window.generateSampleData = generateSampleData;