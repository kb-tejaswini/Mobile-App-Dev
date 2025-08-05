// Mobile App Interactive Functionality

// DOM elements
const featureCards = document.querySelectorAll('.feature-card');
const actionButtons = document.querySelectorAll('.action-btn');
const navItems = document.querySelectorAll('.nav-item');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addTouchFeedback();
    preloadComingSoonPage();
});

// Add event listeners for all interactive elements
function initializeEventListeners() {
    // Feature cards click events
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.dataset.feature;
            handleFeatureCardClick(feature);
        });
    });

    // Action buttons click events
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            handleActionButtonClick(action);
        });
    });

    // Navigation items click events
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function() {
            handleNavigationClick(this);
        });
    });

    // Header icons click events
    document.querySelector('.notification-icon').addEventListener('click', function() {
        showComingSoon('Notifications');
    });

    document.querySelector('.profile-icon').addEventListener('click', function() {
        showComingSoon('Profile');
    });
}

// Handle feature card clicks
function handleFeatureCardClick(feature) {
    // Add click animation
    const clickedCard = document.querySelector(`[data-feature="${feature}"]`);
    clickedCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        clickedCard.style.transform = '';
        // Navigate to coming soon page
        navigateToComingSoon(getFeatureName(feature));
    }, 150);
}

// Handle action button clicks
function handleActionButtonClick(action) {
    const actionNames = {
        'scan': 'QR Code Scanner',
        'pay': 'Payment',
        'share': 'Share Feature'
    };
    
    showComingSoon(actionNames[action] || action);
}

// Handle navigation clicks
function handleNavigationClick(clickedNavItem) {
    // Remove active class from all nav items
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    clickedNavItem.classList.add('active');
    
    // Get the nav label
    const navLabel = clickedNavItem.querySelector('.nav-label').textContent;
    
    // Handle navigation based on item
    if (navLabel !== 'Home') {
        setTimeout(() => {
            showComingSoon(navLabel);
        }, 200);
    }
}

// Get feature name for display
function getFeatureName(feature) {
    const featureNames = {
        'marketplace': 'Marketplace',
        'social': 'Social Hub',
        'entertainment': 'Entertainment Center',
        'fitness': 'Fitness Tracker',
        'education': 'Learning Platform',
        'travel': 'Travel Planner'
    };
    
    return featureNames[feature] || feature;
}

// Navigate to coming soon page
function navigateToComingSoon(featureName) {
    // Create overlay with coming soon content
    const overlay = document.createElement('div');
    overlay.className = 'coming-soon-overlay';
    overlay.innerHTML = `
        <div class="coming-soon-content">
            <div class="coming-soon-icon">🚀</div>
            <h2>Coming Soon!</h2>
            <p><strong>${featureName}</strong> is under development</p>
            <p>We're working hard to bring you this amazing feature. Stay tuned!</p>
            <button class="back-btn" onclick="closeComingSoon()">
                <span>←</span> Back to Home
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
}

// Show coming soon modal
function showComingSoon(featureName) {
    navigateToComingSoon(featureName);
}

// Close coming soon overlay
function closeComingSoon() {
    const overlay = document.querySelector('.coming-soon-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Add touch feedback for better mobile experience
function addTouchFeedback() {
    const interactiveElements = [...featureCards, ...actionButtons, ...navItems];
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Preload coming soon page styles
function preloadComingSoonPage() {
    const style = document.createElement('style');
    style.textContent = `
        .coming-soon-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .coming-soon-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .coming-soon-content {
            background: white;
            border-radius: 25px;
            padding: 40px 30px;
            text-align: center;
            max-width: 320px;
            margin: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: translateY(30px);
            transition: transform 0.3s ease;
        }
        
        .coming-soon-overlay.show .coming-soon-content {
            transform: translateY(0);
        }
        
        .coming-soon-icon {
            font-size: 48px;
            margin-bottom: 20px;
            animation: float 2s ease-in-out infinite;
        }
        
        .coming-soon-content h2 {
            font-size: 28px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 15px;
            letter-spacing: -0.5px;
        }
        
        .coming-soon-content p {
            font-size: 16px;
            color: #7f8c8d;
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .coming-soon-content p strong {
            color: #667eea;
            font-weight: 600;
        }
        
        .back-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 15px;
            padding: 15px 25px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 20px auto 0;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        
        .back-btn span {
            font-size: 18px;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    document.head.appendChild(style);
}

// Add ripple effect to cards
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to feature cards
featureCards.forEach(card => {
    card.addEventListener('click', createRipple);
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .feature-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(rippleStyle);

// Performance optimization: Debounce rapid clicks
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

// Apply debouncing to prevent rapid clicks
const debouncedCardClick = debounce(handleFeatureCardClick, 300);
const debouncedActionClick = debounce(handleActionButtonClick, 300);