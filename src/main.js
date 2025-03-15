// Main JavaScript for David Vargas Portfolio

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    // Initialize all components
    initLoading();
    initNavigation();
    initMobileMenu();
    initProjectModals();
    initContactForm();
    initScrollAnimation();
    initCodeAnimation();
    initSkillsOrbit();
    initTimelineAnimation();
    initInteractiveStats();
    initChatbot();
    initBackToTop();
    initParticles();
    initEasterEgg();
    init3DRobot();
    
    console.log('All components initialized');
});

// Loading functionality
function initLoading() {
    console.log('Initializing loading animation');
    
    const loadingSpinner = document.querySelector('.loading-spinner');
    const progressBar = document.querySelector('.progress-bar');
    const mainContent = document.querySelector('main');
    
    if (!loadingSpinner || !progressBar || !mainContent) {
        console.error('Loading elements not found');
        return;
    }
    
    mainContent.style.display = 'none';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingSpinner.style.opacity = '0';
                setTimeout(() => {
                    loadingSpinner.style.display = 'none';
                    mainContent.style.display = 'block';
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 50);
                }, 500);
            }, 500);
        }
    }, 200);
}

// Navigation functionality
function initNavigation() {
    console.log('Initializing navigation');
    
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize neural network sphere
    initNeuralSphere();
}

// Mobile menu functionality
function initMobileMenu() {
    console.log('Initializing mobile menu');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuToggle || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Project modals functionality
function initProjectModals() {
    console.log('Initializing project modals');
    
    const projectCards = document.querySelectorAll('.project-card');
    const projectModals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const modal = document.querySelector(`.project-modal[data-project="${projectId}"]`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Announce for screen readers
                const modalTitle = modal.querySelector('h3').textContent;
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.textContent = `${modalTitle} modal opened`;
                document.body.appendChild(announcement);
                
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-modal');
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    });
    
    // Close modal when clicking outside
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        }
    });
}

// Contact form functionality
function initContactForm() {
    console.log('Initializing contact form');
    
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Simple validation
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
        }
        
        if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
        }
        
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            isValid = false;
        } else {
            messageInput.classList.remove('error');
        }
        
        if (isValid) {
            // Simulate sending message
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Message Sent!</h3><p>Thank you for reaching out. I\'ll get back to you soon.</p></div>';
                
                // Play success sound
                const successSound = new Howl({
                    src: ['src/sounds/success.mp3'],
                    volume: 0.5
                });
                successSound.play();
            }, 2000);
        }
    });
}

// Scroll animation functionality
function initScrollAnimation() {
    console.log('Initializing scroll animations');
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Code animation functionality
function initCodeAnimation() {
    console.log('Initializing code animation');
    
    const codeElement = document.querySelector('.code-animation code');
    
    if (!codeElement) {
        console.error('Code element not found');
        return;
    }
    
    const codeText = codeElement.textContent;
    codeElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < codeText.length) {
            codeElement.textContent += codeText.charAt(i);
            i++;
            
            // Typing sound
            if (i % 3 === 0) {
                const typingSound = new Howl({
                    src: ['src/sounds/typing.mp3'],
                    volume: 0.1
                });
                typingSound.play();
            }
            
            // Scroll to bottom of code container
            const codeContainer = codeElement.parentElement;
            codeContainer.scrollTop = codeContainer.scrollHeight;
        } else {
            clearInterval(typeInterval);
        }
    }, 30);
}

// Skills orbit functionality
function initSkillsOrbit() {
    console.log('Initializing skills orbit');
    
    const skillPlanets = document.querySelectorAll('.skill-planet');
    
    skillPlanets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            planet.classList.add('active');
            
            // Play hover sound
            const hoverSound = new Howl({
                src: ['src/sounds/hover.mp3'],
                volume: 0.2
            });
            hoverSound.play();
        });
        
        planet.addEventListener('mouseleave', () => {
            planet.classList.remove('active');
        });
    });
    
    // Animate orbits
    anime({
        targets: '.orbit',
        rotate: '1turn',
        easing: 'linear',
        duration: function(el, i) {
            return 15000 + (i * 5000);
        },
        loop: true
    });
}

// Timeline animation functionality
function initTimelineAnimation() {
    console.log('Initializing timeline animation...');
    
    const timelinePath = document.querySelector('.timeline-path path');
    const robotIcon = document.querySelector('.robot-icon');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const funFactButtons = document.querySelectorAll('.fun-fact-button');
    
    if (!timelinePath || !robotIcon || !timelineItems.length) {
        console.warn('Timeline elements not found');
        return;
    }
    
    // Set up Intersection Observer for the timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation when timeline is visible
                animateRobotAlongPath();
                timelineObserver.disconnect(); // Only trigger once
            }
        });
    }, { threshold: 0.2 });
    
    timelineObserver.observe(document.querySelector('.timeline-container'));
    
    // Function to animate robot along the SVG path
    function animateRobotAlongPath() {
        // Get the total length of the path
        const pathLength = timelinePath.getTotalLength();
        
        // Set up the animation
        let startTime = null;
        const duration = 8000; // 8 seconds for the full animation
        
        // Animation function
        function animateRobot(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Get point at the current position along the path
            const point = timelinePath.getPointAtLength(progress * pathLength);
            
            // Position the robot at that point
            robotIcon.style.left = `${point.x}px`;
            robotIcon.style.top = `${point.y}px`;
            
            // Activate timeline items as the robot passes them
            timelineItems.forEach((item, index) => {
                const itemPosition = (index + 1) / timelineItems.length;
                if (progress >= itemPosition - 0.1) {
                    item.classList.add('active');
                    
                    // Add a small delay before playing the sound
                    setTimeout(() => {
                        playSound('beep');
                    }, 300);
                }
            });
            
            // Continue the animation if not complete
            if (progress < 1) {
                requestAnimationFrame(animateRobot);
            } else {
                // Animation complete - add a small bounce to the robot
                robotIcon.style.animation = 'bounce 0.5s ease';
                setTimeout(() => {
                    robotIcon.style.animation = '';
                }, 500);
            }
        }
        
        // Start the animation
        requestAnimationFrame(animateRobot);
    }
    
    // Set up fun fact buttons
    funFactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Find the tooltip associated with this button
            const tooltip = button.parentElement.querySelector('.timeline-tooltip');
            
            // Close any open tooltips
            document.querySelectorAll('.timeline-tooltip.active').forEach(tip => {
                if (tip !== tooltip) {
                    tip.classList.remove('active');
                }
            });
            
            // Toggle this tooltip
            tooltip.classList.toggle('active');
            
            // Play sound
            playSound('pop');
            
            // Add a small animation to the robot when a fun fact is revealed
            robotIcon.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                robotIcon.style.animation = '';
            }, 500);
        });
    });
    
    // Add keyframe animation for bounce if it doesn't exist
    if (!document.querySelector('style#robot-animations')) {
        const style = document.createElement('style');
        style.id = 'robot-animations';
        style.textContent = `
            @keyframes bounce {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Interactive stats functionality
function initInteractiveStats() {
    console.log('Initializing interactive stats');
    
    const statItems = document.querySelectorAll('.stat-item');
    const football = document.querySelector('.football');
    const pianoKeys = document.querySelector('.piano-keys');
    
    if (!statItems.length) {
        console.error('Stat items not found');
        return;
    }
    
    let revealedCount = 0;
    
    // Create sound effects
    const typingSound = new Howl({
        src: ['src/sounds/typing.mp3'],
        volume: 0.3
    });
    
    const successSound = new Howl({
        src: ['src/sounds/success.mp3'],
        volume: 0.3
    });
    
    const pianoSound = new Howl({
        src: ['src/sounds/piano.mp3'],
        volume: 0.3
    });
    
    // Set up intersection observer to reveal stats when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the reveal sequence after a delay
                setTimeout(() => {
                    revealStats();
                }, 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the first stat item to trigger the sequence
    if (statItems.length > 0) {
        observer.observe(statItems[0]);
    }
    
    // Function to reveal stats one by one
    function revealStats() {
        statItems.forEach((item, index) => {
            setTimeout(() => {
                revealStat(item);
            }, index * 1500); // Reveal each stat with a delay
        });
    }
    
    // Function to reveal a single stat
    function revealStat(item) {
        const statNumber = item.querySelector('.stat-number');
        const targetValue = parseInt(item.getAttribute('data-value'));
        const soundType = item.getAttribute('data-sound');
        
        // Play the appropriate sound
        if (soundType === 'typing') {
            typingSound.play();
        } else if (soundType === 'success') {
            successSound.play();
        } else if (soundType === 'piano') {
            pianoSound.play();
        }
        
        // Animate the stat circle
        if (soundType === 'typing') {
            // Typing animation for years coding
            item.classList.add('revealed');
            animateTyping(statNumber, targetValue);
        } else if (soundType === 'success') {
            // Bounce animation for projects completed
            item.classList.add('revealed');
            animateBounce(item);
            animateCounter(statNumber, targetValue);
        } else if (soundType === 'piano') {
            // Scale animation for languages spoken
            item.classList.add('revealed');
            animateScale(item);
            animateCounter(statNumber, targetValue);
            
            // Spin the globe
            const globe = item.querySelector('.languages-globe');
            if (globe) {
                globe.classList.add('spin');
            }
        }
        
        // Increment revealed count
        revealedCount++;
        
        // If all stats are revealed, show the easter egg
        if (revealedCount === statItems.length) {
            setTimeout(() => {
                showEasterEgg();
            }, 1000);
        }
    }
    
    // Function to animate typing effect
    function animateTyping(element, value) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < value.toString().length) {
                element.textContent += value.toString().charAt(i);
                i++;
                typingSound.play();
            } else {
                clearInterval(typeInterval);
            }
        }, 300);
    }
    
    // Function to animate counter
    function animateCounter(element, targetValue) {
        let currentValue = 0;
        
        const interval = setInterval(() => {
            if (currentValue < targetValue) {
                currentValue++;
                element.textContent = currentValue;
            } else {
                clearInterval(interval);
            }
        }, 200);
    }
    
    // Function to animate bounce
    function animateBounce(element) {
        anime({
            targets: element,
            translateY: [
                { value: -20, duration: 300, easing: 'easeOutQuad' },
                { value: 0, duration: 500, easing: 'easeInQuad' }
            ],
            loop: 1
        });
    }
    
    // Function to animate scale
    function animateScale(element) {
        anime({
            targets: element,
            scale: [
                { value: 1.2, duration: 300, easing: 'easeOutQuad' },
                { value: 1, duration: 500, easing: 'easeInQuad' }
            ],
            loop: 1
        });
    }
    
    // Function to show easter egg
    function showEasterEgg() {
        // Show football rolling across
        if (football) {
            football.classList.add('active');
            
            // Play football sound
            const kickSound = new Howl({
                src: ['src/sounds/kick.mp3'],
                volume: 0.3
            });
            kickSound.play();
        }
        
        // Show piano keys after football animation
        setTimeout(() => {
            if (pianoKeys) {
                pianoKeys.classList.add('active');
                
                // Play piano sound
                pianoSound.play();
            }
        }, 2000);
    }
    
    // Add click event to each stat item
    statItems.forEach(item => {
        item.addEventListener('click', () => {
            const soundType = item.getAttribute('data-sound');
            
            // Play the appropriate sound
            if (soundType === 'typing') {
                typingSound.play();
            } else if (soundType === 'success') {
                successSound.play();
            } else if (soundType === 'piano') {
                pianoSound.play();
                
                // Spin the globe
                const globe = item.querySelector('.languages-globe');
                if (globe) {
                    globe.classList.add('spin');
                    setTimeout(() => {
                        globe.classList.remove('spin');
                    }, 1000);
                }
            }
        });
    });
}

// Chatbot functionality
function initChatbot() {
    console.log('Initializing AI chatbot');
    
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotContext = document.getElementById('chatbot-context');
    const chatbotSuggestions = document.getElementById('chatbot-suggestions');
    const chatbotFace = document.querySelector('.chatbot-face');
    const chatbotContainer = document.querySelector('.chatbot-container');
    
    if (!chatbotToggle || !chatbotWindow || !chatbotMessages || !chatbotInput || !chatbotSend || !chatbotContainer) {
        console.error('Chatbot elements not found');
        return;
    }
    
    // Face and chatbot following mouse functionality
    let isInHeroSection = true;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let targetX = 30; // Default position (right: 30px)
    let targetY = 30; // Default position (bottom: 30px)
    let currentX = 30;
    let currentY = 30;
    let isMoving = false;
    let lastMoveTime = 0;
    let moveTimeout;
    let expressionTimeout;
    let lastExpression = Date.now();
    let velocity = { x: 0, y: 0 }; // For dragging effect
    let lastFunFactTime = 0;
    
    // Store original position
    const originalRight = 30;
    const originalBottom = 30;
    
    // Set max movement range (px from original position)
    const maxRangeX = 100;
    const maxRangeY = 80;

    // Fun facts about the profile
    const funFacts = [
        "Did you know David built a quadruped robot?",
        "David is fluent in Python, JavaScript, and C++!",
        "David has experience in AI and machine learning!",
        "David worked as a Lead Software Developer at Jobsi!",
        "David is studying Computer Science & AI at IE University!",
        "David has leadership experience through Taglit Excel!",
        "David loves combining robotics with software development!",
        "David has worked on data visualization tools!",
        "Click me to chat with David's AI assistant!",
        "David has experience in full-stack development!"
    ];
    
    // Position the context bubble properly
    function positionContextBubble() {
        console.log('Positioning context bubble for fun facts');
        
        // Add a class to style the context bubble differently
        chatbotContext.classList.add('fun-fact-bubble');
        
        // Remove any existing styles first to avoid conflicts
        const existingStyles = document.getElementById('chatbot-context-styles');
        if (existingStyles) {
            existingStyles.remove();
        }
        
        // Add CSS to the head
        const styleEl = document.createElement('style');
        styleEl.id = 'chatbot-context-styles';
        styleEl.textContent = `
            .chatbot-context.fun-fact-bubble {
                position: absolute;
                bottom: auto !important;
                left: auto !important;
                top: -100px !important; /* Position it higher above the face */
                right: -20px !important; /* Offset to the right */
                width: 180px !important; /* Fixed width for better text wrapping */
                max-width: 180px !important;
                background-color: var(--accent-color);
                color: white;
                border-radius: 10px;
                padding: 10px 12px;
                font-size: 13px;
                line-height: 1.3;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transform-origin: bottom right;
                z-index: 1000;
                pointer-events: none; /* Prevent blocking clicks */
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
                transform: scale(0.8) translateY(10px);
                word-wrap: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
                text-align: center;
            }
            
            .chatbot-context.fun-fact-bubble:after {
                content: '';
                position: absolute;
                bottom: -8px;
                right: 30px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid var(--accent-color);
            }
            
            .chatbot-context.fun-fact-bubble.show {
                opacity: 1 !important;
                transform: scale(1) translateY(0) !important;
            }
        `;
        document.head.appendChild(styleEl);
        
        // Apply direct styles to ensure they take effect
        chatbotContext.style.position = 'absolute';
        chatbotContext.style.bottom = 'auto';
        chatbotContext.style.left = 'auto';
        chatbotContext.style.top = '-100px';
        chatbotContext.style.right = '-20px';
        chatbotContext.style.width = '180px';
        chatbotContext.style.maxWidth = '180px';
        chatbotContext.style.fontSize = '13px';
        chatbotContext.style.lineHeight = '1.3';
        chatbotContext.style.padding = '10px 12px';
        chatbotContext.style.textAlign = 'center';
        chatbotContext.style.wordWrap = 'break-word';
        chatbotContext.style.overflowWrap = 'break-word';
        chatbotContext.style.hyphens = 'auto';
        chatbotContext.style.zIndex = '1000';
        chatbotContext.style.pointerEvents = 'none';
        
        console.log('Context bubble styles applied');
    }
    
    // Function to check if we're in the hero section
    function checkVisibleSection() {
        const heroSection = document.getElementById('hero');
        const aboutSection = document.getElementById('about');
        
        if (!heroSection || !aboutSection) return true; // Default to visible if sections not found
        
        const heroRect = heroSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        
        // Only follow in hero section, return to default position when about section is visible
        return heroRect.bottom > 0 && aboutRect.top > window.innerHeight * 0.5;
    }
    
    // Function to update chatbot position with spring physics for smooth, goofy movement
    function updateChatbotPosition() {
        // Spring physics for smooth, bouncy movement
        const springFactor = 0.08; // Lower = more delay and bounce
        const friction = 0.9; // Friction to slow down movement
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Calculate velocity with momentum
        velocity.x = velocity.x * friction + dx * springFactor;
        velocity.y = velocity.y * friction + dy * springFactor;
        
        // Only move if we're more than 1px away from target or have significant velocity
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1 || Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
            currentX += velocity.x;
            currentY += velocity.y;
            
            // Apply the position
            chatbotContainer.style.transform = `translate(${-currentX}px, ${-currentY}px)`;
            
            // Add some rotation based on velocity for dragging effect
            const rotation = Math.min(8, Math.max(-8, velocity.x * 0.2));
            const stretch = Math.max(0.9, Math.min(1.1, 1 + Math.abs(velocity.x) * 0.001));
            chatbotToggle.style.transform = `rotate(${rotation}deg) scaleX(${stretch})`;
            
            isMoving = true;
            lastMoveTime = Date.now();
            
            // Clear any existing timeout and set a new one
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                if (Date.now() - lastMoveTime > 300) {
                    isMoving = false;
                    // Return to normal rotation and scale
                    chatbotToggle.style.transform = 'rotate(0deg) scaleX(1)';
                }
            }, 300);
            
            requestAnimationFrame(updateChatbotPosition);
        } else {
            isMoving = false;
            velocity.x = 0;
            velocity.y = 0;
            chatbotToggle.style.transform = 'rotate(0deg) scaleX(1)';
        }
    }
    
    // Function to show random expressions
    function showRandomExpression() {
        // Only show expressions when not moving and not too often
        if (!isMoving && Date.now() - lastExpression > 5000 && Math.random() < 0.3) {
            const expressions = [
                () => {
                    // Surprised expression
                    chatbotFace.style.animation = 'surprised 0.5s ease-in-out';
                    setTimeout(() => {
                        chatbotFace.style.animation = '';
                    }, 500);
                },
                () => {
                    // Wobble
                    chatbotToggle.style.animation = 'wobble 0.5s ease-in-out';
                    setTimeout(() => {
                        chatbotToggle.style.animation = '';
                    }, 500);
                },
                () => {
                    // Bounce
                    chatbotContainer.style.animation = 'bounce 0.5s ease-in-out';
                    setTimeout(() => {
                        chatbotContainer.style.animation = '';
                    }, 500);
                }
            ];
            
            // Pick a random expression
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            randomExpression();
            
            lastExpression = Date.now();
        }
        
        // Schedule next expression check
        expressionTimeout = setTimeout(showRandomExpression, 1000);
    }

    // Function to show a random fun fact
    function showRandomFunFact() {
        if (Date.now() - lastFunFactTime > 8000 && checkVisibleSection() && !chatbotWindow.classList.contains('open')) {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            chatbotContext.textContent = randomFact;
            
            // Ensure positioning is correct before showing
            chatbotContext.style.top = '-100px';
            chatbotContext.style.right = '-20px';
            chatbotContext.style.bottom = 'auto';
            chatbotContext.style.left = 'auto';
            chatbotContext.style.width = '180px';
            chatbotContext.style.maxWidth = '180px';
            
            // Show the fun fact
            chatbotContext.classList.add('show');
            console.log('Showing fun fact:', randomFact);
            
            setTimeout(() => {
                chatbotContext.classList.remove('show');
            }, 5000);
            
            lastFunFactTime = Date.now();
        }
    }

    // Initialize the context bubble positioning
    positionContextBubble();

    // Add mouse move event listener for face and chatbot following
    document.addEventListener('mousemove', (e) => {
        // Only follow mouse when not in chat mode and in hero section
        const shouldFollowMouse = !chatbotWindow.classList.contains('open') && checkVisibleSection();
        
        if (shouldFollowMouse) {
            // Calculate mouse position
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Update last mouse position
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            
            // Calculate eye positions with reduced movement (more steady)
            const leftEyeX = 18 + (mouseX - 0.5) * 6;  // Reduced from 15 to 6
            const leftEyeY = 20 + (mouseY - 0.5) * 6;  // Reduced from 15 to 6
            const rightEyeX = 18 + (mouseX - 0.5) * 6; // Reduced from 15 to 6
            const rightEyeY = 20 + (mouseY - 0.5) * 6; // Reduced from 15 to 6
            
            // Update face position with reduced movement
            const faceLeftPos = 15 + (mouseX - 0.5) * 8;  // Reduced from 20 to 8
            const faceBottomPos = 18 + (mouseY - 0.5) * 8; // Reduced from 20 to 8
            
            // Update face position directly with CSS variables
            chatbotFace.style.setProperty('--face-left', `${faceLeftPos}px`);
            chatbotFace.style.setProperty('--face-bottom', `${faceBottomPos}px`);
            
            // Update eye positions via CSS variables
            chatbotToggle.style.setProperty('--eye-left-x', `${leftEyeX}px`);
            chatbotToggle.style.setProperty('--eye-left-y', `${leftEyeY}px`);
            chatbotToggle.style.setProperty('--eye-right-x', `${rightEyeX}px`);
            chatbotToggle.style.setProperty('--eye-right-y', `${rightEyeY}px`);
            
            // Move the entire chatbot to follow the mouse across the screen
            // Map mouse position to screen coordinates with some padding
            const screenPadding = 80; // Padding from screen edges in pixels
            targetX = window.innerWidth - e.clientX;
            targetY = window.innerHeight - e.clientY;
            
            // Ensure we're within bounds (not too close to screen edges)
            targetX = Math.max(screenPadding, Math.min(window.innerWidth - screenPadding, targetX));
            targetY = Math.max(screenPadding, Math.min(window.innerHeight - screenPadding, targetY));
            
            // Start the animation if not already running
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Show random fun facts in following mode
            showRandomFunFact();
        } else {
            // Reset to default position when chat is open or scrolled past hero section
            targetX = originalRight;
            targetY = originalBottom;
            
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Reset face and eyes to center
            chatbotFace.style.setProperty('--face-left', '15px');
            chatbotFace.style.setProperty('--face-bottom', '18px');
            chatbotToggle.style.setProperty('--eye-left-x', '18px');
            chatbotToggle.style.setProperty('--eye-left-y', '20px');
            chatbotToggle.style.setProperty('--eye-right-x', '18px');
            chatbotToggle.style.setProperty('--eye-right-y', '20px');
        }
    });
    
    // Check scroll position to update chatbot visibility and behavior
    window.addEventListener('scroll', () => {
        const shouldFollowMouse = checkVisibleSection();
        
        // If we've scrolled past the hero section, reset to default position
        if (!shouldFollowMouse) {
            targetX = originalRight;
            targetY = originalBottom;
            
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Hide any fun facts when returning to default position
            chatbotContext.classList.remove('show');
        }
    });
    
    // Start random expressions
    showRandomExpression();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        clearTimeout(moveTimeout);
        clearTimeout(expressionTimeout);
    });
    
    // Context awareness variables
    let currentSection = '';
    let hasInteracted = false;
    let suggestionsShown = false;
    const contextMessages = {
        'hero': [
            "Welcome to David's portfolio! Would you like to learn more about his projects or skills?",
            "I can help you navigate the site. What would you like to explore first?"
        ],
        'about': [
            "David is a Computer Science & AI student with expertise in software development and robotics.",
            "Interested in knowing more about David's background or achievements?"
        ],
        'experience': [
            "David has experience as a Lead Software Developer at Jobsi and as a Robotics Engineer.",
            "Want to learn more about his professional journey?"
        ],
        'skills': [
            "David's core skills include Python, JavaScript, C++, and machine learning.",
            "His expertise spans across AI, robotics, and full-stack development."
        ],
        'projects': [
            "Check out David's projects like the Quadruped Robot and Jobsi Web App.",
            "Would you like details about a specific project?"
        ],
        'education': [
            "David is pursuing a Bachelor's in Computer Science & AI at IE University.",
            "He also has leadership experience through programs like Taglit Excel."
        ],
        'contact': [
            "You can get in touch with David through the contact form or his social profiles.",
            "Need David's contact information or want to send him a message?"
        ]
    };
    
    const suggestions = {
        'hero': ['Tell me about your work', 'What are your skills?', 'Show me your projects'],
        'about': ['What are your achievements?', 'Tell me more about your background', 'What activities do you enjoy?'],
        'experience': ['Tell me about Jobsi', 'Robotics experience', 'Software development projects'],
        'skills': ['Machine learning expertise', 'Programming languages', 'Technical skills'],
        'projects': ['Quadruped Robot details', 'Jobsi Web App', 'Data Visualization Tool'],
        'education': ['Academic background', 'Leadership programs', 'Courses taken'],
        'contact': ['How can I contact you?', 'Social profiles', 'Send a message']
    };
    
    // Check which section is currently in view
    function updateCurrentSection() {
        const sections = document.querySelectorAll('section');
        let inView = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Element is considered in view if it's in the viewport
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                inView = section.id;
            }
        });
        
        if (inView && inView !== currentSection) {
            currentSection = inView;
            
            // Only show context message if user hasn't interacted with chatbot yet
            if (!chatbotWindow.classList.contains('open') && !hasInteracted) {
                showContextMessage();
            }
            
            // Update suggestions based on current section
            if (chatbotWindow.classList.contains('open')) {
                updateSuggestions();
            }
        }
    }
    
    function showContextMessage() {
        if (currentSection && contextMessages[currentSection] && Math.random() > 0.7) {
            const message = contextMessages[currentSection][Math.floor(Math.random() * contextMessages[currentSection].length)];
            chatbotContext.textContent = message;
            chatbotContext.classList.add('show');
            
            setTimeout(() => {
                chatbotContext.classList.remove('show');
            }, 5000);
        }
    }
    
    function updateSuggestions() {
        if (!suggestionsShown && currentSection && suggestions[currentSection]) {
            chatbotSuggestions.innerHTML = '';
            
            suggestions[currentSection].forEach(suggestion => {
                const chip = document.createElement('div');
                chip.className = 'suggestion-chip';
                chip.textContent = suggestion;
                chip.addEventListener('click', () => {
                    chatbotInput.value = suggestion;
                    sendMessage();
                });
                chatbotSuggestions.appendChild(chip);
            });
            
            // Animate suggestions in
            anime({
                targets: '.suggestion-chip',
                translateY: [10, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
            
            suggestionsShown = true;
        }
    }
    
    // Add event listeners for scroll to detect current section
    window.addEventListener('scroll', updateCurrentSection);
    
    // Initialize with current section
    setTimeout(updateCurrentSection, 1000);
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('open');
        chatbotToggle.classList.toggle('active');
        
        if (chatbotWindow.classList.contains('open')) {
            updateSuggestions();
            chatbotInput.focus();
            
            // Add typing animation for welcome message
            if (!hasInteracted) {
                // Clear existing messages
                chatbotMessages.innerHTML = '';
                
                // Add typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message bot-message typing-indicator';
                typingIndicator.innerHTML = '<span class="message-dot"></span><span class="message-dot"></span><span class="message-dot"></span>';
                chatbotMessages.appendChild(typingIndicator);
                
                // Replace with actual message after delay
                setTimeout(() => {
                    chatbotMessages.removeChild(typingIndicator);
                    
                    // Use contextual welcome message based on current section
                    let welcomeMessage = "Hi! I'm David's AI assistant. What would you like to know about his work?";
                    if (currentSection && contextMessages[currentSection]) {
                        welcomeMessage = contextMessages[currentSection][0];
                    }
                    
                    addMessage(welcomeMessage, 'bot');
                }, 1500);
            }
        } else {
            // Reset suggestions shown flag when closing
            suggestionsShown = false;
        }
        
        hasInteracted = true;
    });
    
    // Close chatbot window
    chatbotClose.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotWindow.classList.remove('open');
        chatbotToggle.classList.remove('active');
        suggestionsShown = false;
    });
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send user message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Hide suggestions after user sends a message
            chatbotSuggestions.style.display = 'none';
            
            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<span class="message-dot"></span><span class="message-dot"></span><span class="message-dot"></span>';
            chatbotMessages.appendChild(typingIndicator);
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Process the message and respond after a delay
            setTimeout(() => {
                // Remove typing indicator
                chatbotMessages.removeChild(typingIndicator);
                
                // Generate response based on user message
                const response = generateResponse(message);
                
                // Add bot response
                addMessage(response, 'bot');
                
                // Show new contextual suggestions
                showResponseSuggestions(message);
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }
    }
    
    // Function to generate response based on user message
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Check for keywords and generate appropriate responses
        if (message.includes('project') || message.includes('work')) {
            return "David has worked on some amazing projects including a Quadruped Robot, Jobsi Web App, and Data Visualization Tool. Each demonstrates his skills in different areas of technology. Which one would you like to know more about?";
        } else if (message.includes('robot') || message.includes('quadruped')) {
            return "The Quadruped Robot was built with optimized movement algorithms using PyTorch and has remote control capabilities via Raspberry Pi. It can navigate various terrains and showcases David's robotics engineering skills.";
        } else if (message.includes('jobsi') || message.includes('web app')) {
            return "The Jobsi Web App is a full-stack application with AI integration that revolutionizes the job application process. It launched with over 2,000 users on day one and features a responsive UI for optimal user experience.";
        } else if (message.includes('data') || message.includes('visualization')) {
            return "The Data Visualization Tool creates interactive dashboards for complex data analysis, enabling clients to make data-driven decisions more efficiently. It improved decision-making processes by 20%.";
        } else if (message.includes('skill') || message.includes('expertise')) {
            return "David's core skills include Python, JavaScript, C++, AI, and robotics engineering. He also has experience in full-stack development, data analysis, and machine learning.";
        } else if (message.includes('contact') || message.includes('get in touch')) {
            return "You can contact David through the contact form in the Contact section, or reach out via his LinkedIn and GitHub profiles linked at the bottom of the page.";
        } else if (message.includes('education') || message.includes('study')) {
            return "David is pursuing a Bachelor's in Computer Science & AI at IE University, expected to graduate in July 2026. His studies focus on machine learning, data analysis, and algorithms.";
        } else if (message.includes('experience')) {
            return "David has experience as a Lead Software Developer at Jobsi, a Robotics Engineer at the Robotics & AI Lab, a Software Engineer Intern at Axonius, and a Web Intern at BProto Organization.";
        } else if (message.includes('hello') || message.includes('hi')) {
            return "Hello! I'm David's AI assistant. How can I help you today?";
        } else {
            return "That's an interesting question! David's portfolio showcases his work in AI, robotics, and software development. Is there something specific you'd like to know about those areas?";
        }
    }
    
    // Function to show contextual suggestions based on the previous exchange
    function showResponseSuggestions(userMessage) {
        let newSuggestions = [];
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('project') || userMessage.includes('work')) {
            newSuggestions = ['Tell me about the robot', 'Jobsi Web App details', 'Data visualization project'];
        } else if (userMessage.includes('robot') || userMessage.includes('quadruped')) {
            newSuggestions = ['How was it built?', 'Other projects', 'Technical skills used'];
        } else if (userMessage.includes('jobsi') || userMessage.includes('web app')) {
            newSuggestions = ['Technologies used', 'User metrics', 'Other web projects'];
        } else if (userMessage.includes('skill') || userMessage.includes('expertise')) {
            newSuggestions = ['Programming languages', 'AI knowledge', 'Software development'];
        } else if (userMessage.includes('contact')) {
            newSuggestions = ['LinkedIn profile', 'GitHub projects', 'Send a message'];
        } else {
            newSuggestions = ['Projects', 'Experience', 'Skills', 'Contact info'];
        }
        
        // Add suggestions
        chatbotSuggestions.innerHTML = '';
        chatbotSuggestions.style.display = 'flex';
        
        newSuggestions.forEach(suggestion => {
            const chip = document.createElement('div');
            chip.className = 'suggestion-chip';
            chip.textContent = suggestion;
            chip.addEventListener('click', () => {
                chatbotInput.value = suggestion;
                sendMessage();
            });
            chatbotSuggestions.appendChild(chip);
        });
        
        // Animate suggestions
        anime({
            targets: '.suggestion-chip',
            translateY: [10, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });
    }
    
    // Function to add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = text;
        
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Play sound effect for new messages
        if (sender === 'bot') {
            playSound('message', 0.2);
        }
    }
    
    // Automatically show chatbot after 10 seconds of inactivity, but only once
    let chatbotTimer;
    let hasShownAutomatically = false;
    
    function resetChatbotTimer() {
        clearTimeout(chatbotTimer);
        if (!hasInteracted && !hasShownAutomatically) {
            chatbotTimer = setTimeout(() => {
                showContextMessage();
                hasShownAutomatically = true;
            }, 10000);
        }
    }
    
    // Reset timer on user interaction
    ['mousemove', 'click', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, resetChatbotTimer);
    });
    
    // Start the timer initially
    resetChatbotTimer();
}

// Back to top button functionality
function initBackToTop() {
    console.log('Initializing back to top button');
    
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) {
        console.error('Back to top button not found');
        return;
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Play whoosh sound
        const whooshSound = new Howl({
            src: ['src/sounds/whoosh.mp3'],
            volume: 0.3
        });
        whooshSound.play();
    });
}

// Particles.js functionality
function initParticles() {
    console.log('Initializing particles');
    
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) {
        console.error('Particles container not found');
        return;
    }
    
    // Load particles.js config
    particlesJS.load('particles-js', 'src/particles-config.js', function() {
        console.log('Particles.js loaded');
    });
}

// Easter egg functionality
function initEasterEgg() {
    console.log('Initializing easter egg');
    
    const logo = document.querySelector('.logo');
    const easterEggContainer = document.querySelector('.easter-egg');
    
    if (!logo || !easterEggContainer) {
        console.error('Easter egg elements not found');
        return;
    }
    
    let clickCount = 0;
    
    logo.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            // Activate easter egg
            easterEggContainer.style.display = 'block';
            
            // Create matrix effect
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            easterEggContainer.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            
            // Matrix characters
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            
            // Array to store character position
            const drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            // Play matrix sound
            const matrixSound = new Howl({
                src: ['src/sounds/matrix.mp3'],
                volume: 0.3,
                loop: true
            });
            matrixSound.play();
            
            // Draw matrix
            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#00D4B4';
                ctx.font = `${fontSize}px monospace`;
                
                for (let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            const matrixInterval = setInterval(drawMatrix, 33);
            
            // Close easter egg after 10 seconds
            setTimeout(() => {
                clearInterval(matrixInterval);
                easterEggContainer.style.display = 'none';
                matrixSound.stop();
                clickCount = 0;
            }, 10000);
        }
    });
}

// Initialize 3D robot model
function init3DRobot() {
    console.log('Initializing 3D robot model');
    
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded');
        
        // Fallback to a simple robot animation
        createSimpleRobot();
        return;
    }
    
    const container = document.getElementById('robot-container');
    const speechBubble = document.getElementById('robot-speech-bubble');
    const robotControls = document.getElementById('robot-controls');
    const robotProjects = document.getElementById('robot-projects');
    const robotContact = document.getElementById('robot-contact');
    
    if (!container) {
        console.error('Robot container not found');
        return;
    }
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Make background transparent
    container.appendChild(renderer.domElement);
    
    // Create lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a simple robot model
    const robotGroup = new THREE.Group();
    
    // Robot body (box)
    const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 0.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1A3C5A,
        specular: 0x050505,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);
    
    // Robot head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00D4B4,
        specular: 0x050505,
        shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.25;
    robotGroup.add(head);
    
    // Robot eyes (small spheres)
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.5
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.3, 0.4);
    robotGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.3, 0.4);
    robotGroup.add(rightEye);
    
    // Robot legs (cylinders)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00D4B4,
        specular: 0x050505,
        shininess: 100
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.4, -1.25, 0);
    robotGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.4, -1.25, 0);
    robotGroup.add(rightLeg);
    
    // Robot arms (cylinders)
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00D4B4,
        specular: 0x050505,
        shininess: 100
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.rotation.z = Math.PI / 2;
    leftArm.position.set(-0.9, 0.25, 0);
    robotGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.rotation.z = -Math.PI / 2;
    rightArm.position.set(0.9, 0.25, 0);
    robotGroup.add(rightArm);
    
    // Add robot to scene
    robotGroup.position.set(-3, 0, 0);
    scene.add(robotGroup);
    
    // Animation variables
    let walkingComplete = false;
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Walking animation
        if (!walkingComplete) {
            if (robotGroup.position.x < 0) {
                robotGroup.position.x += 0.05;
                
                // Leg animation
                leftLeg.rotation.x = Math.sin(Date.now() * 0.005) * 0.5;
                rightLeg.rotation.x = Math.sin(Date.now() * 0.005 + Math.PI) * 0.5;
                
                // Arm animation
                leftArm.rotation.z = Math.PI / 2 + Math.sin(Date.now() * 0.005) * 0.2;
                rightArm.rotation.z = -Math.PI / 2 + Math.sin(Date.now() * 0.005 + Math.PI) * 0.2;
                
                // Body animation
                robotGroup.position.y = Math.sin(Date.now() * 0.01) * 0.1;
            } else {
                walkingComplete = true;
                
                // Reset leg and arm positions
                leftLeg.rotation.x = 0;
                rightLeg.rotation.x = 0;
                leftArm.rotation.z = Math.PI / 2;
                rightArm.rotation.z = -Math.PI / 2;
                
                // Show speech bubble and controls
                if (speechBubble) {
                    speechBubble.classList.add('active');
                }
                
                if (robotControls) {
                    setTimeout(() => {
                        robotControls.classList.add('active');
                    }, 1000);
                }
            }
        } else {
            // Idle animation
            head.position.y = 1.25 + Math.sin(Date.now() * 0.002) * 0.05;
            robotGroup.position.y = Math.sin(Date.now() * 0.001) * 0.05;
            
            // Eye blinking animation
            if (Math.random() < 0.005) {
                leftEye.scale.y = 0.1;
                rightEye.scale.y = 0.1;
                
                setTimeout(() => {
                    leftEye.scale.y = 1;
                    rightEye.scale.y = 1;
                }, 150);
            }
        }
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Add hover interaction
    container.addEventListener('mouseenter', () => {
        if (walkingComplete) {
            // Jump animation
            anime({
                targets: robotGroup.position,
                y: 0.5,
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    anime({
                        targets: robotGroup.position,
                        y: 0,
                        duration: 500,
                        easing: 'easeInQuad'
                    });
                }
            });
            
            // Wave animation for right arm
            anime({
                targets: rightArm.rotation,
                z: -Math.PI / 4,
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    anime({
                        targets: rightArm.rotation,
                        z: -Math.PI / 2,
                        duration: 300,
                        delay: 200,
                        easing: 'easeInOutQuad'
                    });
                }
            });
            
            // Update speech bubble with helpful text
            if (speechBubble) {
                speechBubble.querySelector('p').textContent = 'Hi there! Click one of the buttons below to explore!';
            }
        }
    });
    
    // Add mouse leave interaction
    container.addEventListener('mouseleave', () => {
        if (walkingComplete && speechBubble) {
            speechBubble.querySelector('p').textContent = "Hi, I'm David's robot assistant! I can help you navigate.";
        }
    });
    
    // Add click functionality to buttons
    if (robotProjects) {
        robotProjects.addEventListener('click', () => {
            // Animate head nod
            anime({
                targets: head.rotation,
                x: -0.3,
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    anime({
                        targets: head.rotation,
                        x: 0,
                        duration: 300,
                        easing: 'easeInOutQuad'
                    });
                }
            });
            
            // Smoothly scroll to projects section
            document.querySelector('#projects').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
            
            // Update speech bubble
            if (speechBubble) {
                speechBubble.querySelector('p').textContent = 'Check out these amazing projects!';
            }
        });
    }
    
    if (robotContact) {
        robotContact.addEventListener('click', () => {
            // Animate arm wave
            anime({
                targets: rightArm.rotation,
                z: -Math.PI / 4,
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    anime({
                        targets: rightArm.rotation,
                        z: -Math.PI / 2,
                        duration: 300,
                        easing: 'easeInOutQuad'
                    });
                }
            });
            
            // Smoothly scroll to contact section
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
            
            // Update speech bubble
            if (speechBubble) {
                speechBubble.querySelector('p').textContent = 'Get in touch with David!';
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initNeuralSphere() {
    console.log('Initializing neural sphere with direct mouse connections');

    const container = document.getElementById('neural-sphere-container');
    if (!container) {
        console.error('Neural sphere container not found');
        return;
    }

    // Clear any existing content
    container.innerHTML = '';

    // Create the neural sphere element
    const neuralSphere = document.createElement('div');
    neuralSphere.className = 'neural-sphere';
    container.appendChild(neuralSphere);

    // Create nodes
    const nodes = [];
    const numNodes = 60;

    // Create nodes in a spherical pattern
    for (let i = 0; i < numNodes; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        // Use spherical coordinates for even distribution
        const phi = Math.acos(-1 + (2 * i) / numNodes);
        const theta = Math.sqrt(numNodes * Math.PI) * phi;
        
        // Random radius between 150-250px
        const radius = 150 + Math.random() * 100;
        
        // Convert to Cartesian coordinates
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        node.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        
        nodes.push({
            element: node,
            x: x,
            y: y,
            z: z
        });
        
        neuralSphere.appendChild(node);
    }

    // Create static connections between nodes
    const connections = [];
    const connectionDistance = 120;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const node1 = nodes[i];
            const node2 = nodes[j];
            
            const dx = node1.x - node2.x;
            const dy = node1.y - node2.y;
            const dz = node1.z - node2.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < connectionDistance) {
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                // Calculate rotation angles
                const rotY = Math.atan2(dz, dx);
                const rotX = Math.atan2(Math.sqrt(dx * dx + dz * dz), dy);
                
                // Set connection style
                connection.style.width = `${distance}px`;
                connection.style.transform = `translate3d(${node1.x}px, ${node1.y}px, ${node1.z}px) rotateY(${rotY}rad) rotateX(${rotX}rad)`;
                
                neuralSphere.appendChild(connection);
                connections.push({
                    element: connection,
                    node1: node1,
                    node2: node2
                });
            }
        }
    }

    // Create mouse connections (one for each node)
    const mouseConnections = [];
    const mouseNode = { x: 0, y: 0, z: 50 }; // Mouse position in 3D space
    const mouseConnectionDistance = 180; // Distance threshold for mouse connections
    
    // Create connection elements for each node to mouse
    for (let i = 0; i < nodes.length; i++) {
        const connection = document.createElement('div');
        connection.className = 'mouse-connection';
        connection.style.opacity = '0'; // Start invisible
        neuralSphere.appendChild(connection);
        
        mouseConnections.push({
            element: connection,
            node: nodes[i],
            active: false
        });
    }

    // Function to update mouse connections
    function updateMouseConnections() {
        let activeCount = 0;
        
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const connection = mouseConnections[i];
            
            // Calculate distance from node to mouse
            const dx = mouseNode.x - node.x;
            const dy = mouseNode.y - node.y;
            const dz = mouseNode.z - node.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            // Check if node is close enough to mouse
            if (distance < mouseConnectionDistance) {
                // Calculate rotation angles
                const rotY = Math.atan2(dz, dx);
                const rotX = Math.atan2(Math.sqrt(dx * dx + dz * dz), dy);
                
                // Update connection style
                connection.element.style.width = `${distance}px`;
                connection.element.style.transform = `translate3d(${node.x}px, ${node.y}px, ${node.z}px) rotateY(${rotY}rad) rotateX(${rotX}rad)`;
                connection.element.style.opacity = '1';
                
                // Highlight connected node
                node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, ${node.z}px) scale(1.5)`;
                node.element.style.boxShadow = '0 0 15px var(--accent-color)';
                
                connection.active = true;
                activeCount++;
            } else if (connection.active) {
                // Hide connection if it was previously active
                connection.element.style.opacity = '0';
                
                // Reset node appearance
                node.element.style.transform = `translate3d(${node.x}px, ${node.y}px, ${node.z}px) scale(1)`;
                node.element.style.boxShadow = '0 0 8px var(--accent-color)';
                
                connection.active = false;
            }
        }
        
        console.log(`Active mouse connections: ${activeCount}`);
    }

    // Handle mouse movement
    function handleMouseMove(e) {
        // Get container position
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Convert mouse position to neural sphere coordinates
        mouseNode.x = (e.clientX - centerX) * 0.8;
        mouseNode.y = (e.clientY - centerY) * 0.8;
        
        // Debug info
        console.log(`Mouse position: ${mouseNode.x.toFixed(0)}, ${mouseNode.y.toFixed(0)}, ${mouseNode.z}`);
        
        // Rotate the sphere slightly based on mouse position
        const rotateX = (e.clientY - centerY) / rect.height * 20;
        const rotateY = (e.clientX - centerX) / rect.width * 20;
        neuralSphere.style.transform = `translate(-50%, -50%) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Update mouse connections
        updateMouseConnections();
    }

    // Add event listeners for mouse movement
    document.addEventListener('mousemove', handleMouseMove);
    
    // Also handle touch events for mobile
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }, { passive: true });

    // Initial update
    updateMouseConnections();
    
    console.log(`Neural sphere initialized with ${nodes.length} nodes and ${connections.length} static connections`);
}

// Fallback to a simple robot animation if Three.js is not available
function createSimpleRobot() {
    console.log('Creating simple robot animation');
    
    const container = document.getElementById('robot-container');
    const speechBubble = document.getElementById('robot-speech-bubble');
    
    if (!container) {
        console.error('Robot container not found');
        return;
    }
    
    // Create a simple robot using HTML and CSS
    const robotHTML = `
        <div class="simple-robot">
            <div class="robot-head"></div>
            <div class="robot-body">
                <div class="robot-eye left"></div>
                <div class="robot-eye right"></div>
            </div>
            <div class="robot-arm left"></div>
            <div class="robot-arm right"></div>
            <div class="robot-leg left"></div>
            <div class="robot-leg right"></div>
        </div>
    `;
    
    container.innerHTML = robotHTML;
    
    // Show speech bubble after a delay
    setTimeout(() => {
        if (speechBubble) {
            speechBubble.classList.add('active');
        }
    }, 2000);
    
    // Add hover interaction
    container.addEventListener('mouseenter', () => {
        const robot = container.querySelector('.simple-robot');
        if (robot) {
            robot.classList.add('jump');
            setTimeout(() => {
                robot.classList.remove('jump');
            }, 1000);
            
            // Update speech bubble
            if (speechBubble) {
                speechBubble.querySelector('p').textContent = 'Explore my work below!';
            }
        }
    });
}

// Sound effects functionality
function playSound(soundName, volume = 0.3) {
    console.log(`Playing sound: ${soundName}`);
    
    // Define sound paths
    const soundPaths = {
        'typing': 'src/sounds/typing.mp3',
        'success': 'src/sounds/success.mp3',
        'piano': 'src/sounds/piano.mp3',
        'beep': 'src/sounds/beep.mp3',
        'pop': 'src/sounds/pop.mp3',
        'kick': 'src/sounds/kick.mp3'
    };
    
    // Check if the sound exists
    if (!soundPaths[soundName]) {
        console.warn(`Sound "${soundName}" not found`);
        return;
    }
    
    // Create audio element
    const audio = new Audio(soundPaths[soundName]);
    audio.volume = volume;
    
    // Play the sound
    audio.play().catch(error => {
        console.warn(`Error playing sound: ${error.message}`);
    });
} 