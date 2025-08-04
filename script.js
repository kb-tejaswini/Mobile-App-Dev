// Mobile-optimized JavaScript for Career Carve Home Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize page elements
    initializeEventListeners();
    addTouchFeedback();
    setupProgressAnimation();
    
    // Event Listeners
    function initializeEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.addEventListener('focus', handleSearchFocus);
            searchInput.addEventListener('input', handleSearchInput);
        }

        // Notification bell
        const notificationBell = document.querySelector('.notification-bell');
        if (notificationBell) {
            notificationBell.addEventListener('click', handleNotificationClick);
        }

        // Settings icon
        const settingsIcon = document.querySelector('.settings-icon');
        if (settingsIcon) {
            settingsIcon.addEventListener('click', handleSettingsClick);
        }

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', handleActionCardClick);
        });

        // Session card
        const sessionCard = document.querySelector('.session-card');
        if (sessionCard) {
            sessionCard.addEventListener('click', handleSessionClick);
        }

        // View all links
        const viewAllLinks = document.querySelectorAll('.view-all');
        viewAllLinks.forEach(link => {
            link.addEventListener('click', handleViewAllClick);
        });
    }

    // Touch feedback for better mobile experience
    function addTouchFeedback() {
        const interactiveElements = document.querySelectorAll(
            '.action-card, .session-card, .notification-bell, .settings-icon, .view-all'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.3s ease';
                }, 100);
            });
        });
    }

    // Animate progress bar on load
    function setupProgressAnimation() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            // Reset width to 0 initially
            progressFill.style.width = '0%';
            
            // Animate to 87% after a short delay
            setTimeout(() => {
                progressFill.style.width = '87%';
            }, 500);
        }
    }

    // Event Handlers
    function handleSearchFocus(e) {
        const searchBar = e.target.closest('.search-bar');
        searchBar.style.borderColor = '#667eea';
        searchBar.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        
        // Remove focus styles when input loses focus
        e.target.addEventListener('blur', function() {
            searchBar.style.borderColor = '#e9ecef';
            searchBar.style.boxShadow = 'none';
        });
    }

    function handleSearchInput(e) {
        const query = e.target.value.trim();
        if (query.length > 2) {
            // Simulate search suggestions (in a real app, this would call an API)
            console.log('Searching for:', query);
            // You could show search suggestions here
        }
    }

    function handleNotificationClick() {
        showToast('Notifications clicked! 🔔');
        // In a real app, this would open notifications panel
        
        // Remove notification badge temporarily
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.opacity = '0.5';
            setTimeout(() => {
                badge.style.opacity = '1';
            }, 1000);
        }
    }

    function handleSettingsClick() {
        showToast('Settings clicked! ⚙️');
        // In a real app, this would navigate to settings page
    }

    function handleActionCardClick(e) {
        const card = e.currentTarget;
        const actionTitle = card.querySelector('h4').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        showToast(`${actionTitle} selected! 🚀`);
        
        // In a real app, this would navigate to the specific action page
        console.log('Action selected:', actionTitle);
    }

    function handleSessionClick() {
        showToast('Joining session... 📹');
        // In a real app, this would navigate to the session details or join the session
    }

    function handleViewAllClick(e) {
        e.preventDefault();
        const section = e.target.closest('.section-header').querySelector('h3').textContent;
        showToast(`View all ${section.toLowerCase()} 👀`);
        // In a real app, this would navigate to the full list page
    }

    // Utility Functions
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        // Hide and remove toast
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2500);
    }

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle device orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate any dynamic heights or layouts if needed
            window.scrollTo(0, 0);
        }, 100);
    });

    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add pull-to-refresh simulation (visual feedback only)
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const pullThreshold = 80;

    document.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
        }
    });

    document.addEventListener('touchmove', function(e) {
        if (window.scrollY === 0 && startY > 0) {
            currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;
            
            if (pullDistance > 0 && pullDistance < pullThreshold) {
                // Visual feedback could be added here
                document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
                document.body.style.transition = 'none';
            }
        }
    });

    document.addEventListener('touchend', function(e) {
        if (pullDistance > pullThreshold) {
            showToast('Refreshing... 🔄');
            // In a real app, this would refresh the data
        }
        
        // Reset transform
        document.body.style.transform = '';
        document.body.style.transition = 'transform 0.3s ease';
        
        startY = 0;
        currentY = 0;
        pullDistance = 0;
    });

    console.log('Career Carve Mobile App initialized successfully! 🎉');
});