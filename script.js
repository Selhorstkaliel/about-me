// Browser functionality module
const BrowserManager = {
    init() {
        this.setupBrowserButtons();
        this.setupNavigationButtons();
        this.setupProjectInteractions();
    },

    setupBrowserButtons() {
        const closeButton = document.getElementById('closeButton');
        const minimizeButton = document.getElementById('minimizeButton');
        const fullscreenButton = document.getElementById('fullscreenButton');
        const browserContainer = document.querySelector('.browser-container');

        // Close button
        closeButton?.addEventListener('click', () => {
            if (confirm('Fechar esta janela?')) {
                window.close();
            }
        });

        // Minimize button (yellow button - toggle minimized state)
        minimizeButton?.addEventListener('click', () => {
            if (browserContainer) {
                browserContainer.classList.toggle('minimized');
            }
        });

        // Fullscreen button (green button)
        fullscreenButton?.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen?.();
            } else {
                document.exitFullscreen?.();
            }
        });

        // Restore from minimized state
        browserContainer?.addEventListener('click', function(e) {
            if (this.classList.contains('minimized') && e.target === this) {
                this.classList.remove('minimized');
            }
        });
    },

    setupNavigationButtons() {
        const backButton = document.getElementById('backButton');
        const forwardButton = document.getElementById('forwardButton');
        const refreshButton = document.getElementById('refreshButton');

        backButton?.addEventListener('click', () => {
            // Check if we're on any sub-page and go back to main portfolio
            if (window.location.pathname.includes('certificates.html') || 
                window.location.pathname.includes('about-me.html') || 
                window.location.pathname.includes('projects.html')) {
                window.location.href = 'index.html';
            } else {
                window.history.back();
            }
        });

        forwardButton?.addEventListener('click', () => {
            window.history.forward();
        });

        refreshButton?.addEventListener('click', () => {
            location.reload();
        });
    },

    setupProjectInteractions() {
        // Project hover effects
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            project.addEventListener('mouseover', function() {
                this.style.backgroundColor = '#2c2c2e';
                this.style.transition = 'background-color 0.3s ease';
            });
            project.addEventListener('mouseout', function() {
                this.style.backgroundColor = '';
            });
        });

        // Image modal for project images
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(image => {
            image.addEventListener('click', () => {
                // Avoid relying on 'this' binding; call directly on the manager
                BrowserManager.showImageModal(image.src);
            });
        });
    },

    showImageModal(src) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<img src="${src}" alt="Project preview">`;
        
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.body.appendChild(modal);
    }
};

// Portfolio specific functionality
const PortfolioManager = {
    init() {
        this.setupProfileLinks();
        this.setupCertificateNavigation();
    },

    setupProfileLinks() {
        const usernameLink = document.getElementById('usernameLink');
        usernameLink?.addEventListener('click', () => {
            window.open('https://www.instagram.com/selhorstkaliel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank');
        });
    },

    setupCertificateNavigation() {
        const certificatesProject = document.getElementById('certificatesProject');
        certificatesProject?.addEventListener('click', (e) => {
            e.preventDefault();
            // use a relative path to ensure the file is resolved from the current folder
            window.location.assign('./certificates.html');
        });

        const aboutMeProject = document.getElementById('aboutMeProject');
        aboutMeProject?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.assign('./about-me.html');
        });

        const projectsProject = document.getElementById('projectsProject');
        projectsProject?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.assign('./projects.html');
        });
    }
};

// Certificates page specific functionality
const CertificatesManager = {
    init() {
        this.setupBackNavigation();
        this.setupCertificateCards();
    },

    setupBackNavigation() {
        const backButtonLink = document.getElementById('backButtonLink');
        if (backButtonLink) {
            backButtonLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    },

    setupCertificateCards() {
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(255,255,255,0.1)';
            });
            card.addEventListener('mouseout', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
};

// Unified navigation manager for all pages
const NavigationManager = {
    init() {
        this.setupBackNavigation();
    },

    setupBackNavigation() {
        const backButtonLink = document.getElementById('backButtonLink');
        if (backButtonLink) {
            backButtonLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }
};

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    BrowserManager.init();
    NavigationManager.init(); // Always initialize navigation
    
    // Check current page and initialize appropriate manager
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        PortfolioManager.init();
    } else if (window.location.pathname.includes('certificates.html')) {
        CertificatesManager.init();
    } else if (window.location.pathname.includes('about-me.html')) {
        const AboutManager = {
            init() {
                // Additional about page functionality can go here
            }
        };
        AboutManager.init();
    } else if (window.location.pathname.includes('projects.html')) {
        const ProjectsManager = {
            init() {
                // Additional projects page functionality can go here
            }
        };
        ProjectsManager.init();
    }
});