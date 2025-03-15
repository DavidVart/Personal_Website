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
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
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
    console.log('Initializing chatbot');
    
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotToggle || !chatbotContainer || !chatbotClose || !chatbotMessages || !chatbotInput || !chatbotSend) {
        console.error('Chatbot elements not found');
        return;
    }
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        
        // Play open sound
        const openSound = new Howl({
            src: ['src/sounds/open.mp3'],
            volume: 0.3
        });
        openSound.play();
        
        // Focus input
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        
        // Play close sound
        const closeSound = new Howl({
            src: ['src/sounds/close.mp3'],
            volume: 0.3
        });
        closeSound.play();
    });
    
    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                let response;
                
                // Simple responses based on keywords
                if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                    response = "Hello! I'm David's AI assistant. How can I help you today?";
                } else if (message.toLowerCase().includes('project') || message.toLowerCase().includes('work')) {
                    response = "David has worked on several exciting projects in robotics and AI. Check out the Projects section to learn more!";
                } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('email')) {
                    response = "You can contact David via email at david.vargas@example.com or through the contact form on this page.";
                } else if (message.toLowerCase().includes('experience') || message.toLowerCase().includes('job')) {
                    response = "David has experience as a Lead Software Developer, Robotics Engineer, and Software Engineer Intern. His expertise includes Python, JavaScript, and robotics programming.";
                } else if (message.toLowerCase().includes('education') || message.toLowerCase().includes('study')) {
                    response = "David studied Computer Science with a focus on AI and Robotics. He has a strong academic background and has participated in various research projects.";
                } else if (message.toLowerCase().includes('skill') || message.toLowerCase().includes('know')) {
                    response = "David's key skills include Python, JavaScript, C++, Machine Learning, Robotics, and Web Development. He's particularly strong in AI applications.";
                } else {
                    response = "I'm a simple AI assistant. If you have specific questions about David's work or experience, please let me know!";
                }
                
                addMessage(response, 'bot');
            }, 1000);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        
        chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Play message sound
        const messageSound = new Howl({
            src: [`src/sounds/${sender === 'user' ? 'send' : 'receive'}.mp3`],
            volume: 0.3
        });
        messageSound.play();
    }
    
    // Send button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Enter key press
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
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
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x1A3C5A });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robotGroup.add(body);
    
    // Robot head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x00D4B4 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.25;
    robotGroup.add(head);
    
    // Robot eyes (small spheres)
    const eyeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.3, 0.4);
    robotGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.3, 0.4);
    robotGroup.add(rightEye);
    
    // Robot legs (cylinders)
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x00D4B4 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.4, -1.25, 0);
    robotGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.4, -1.25, 0);
    robotGroup.add(rightLeg);
    
    // Robot arms (cylinders)
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x00D4B4 });
    
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
                
                // Show speech bubble
                if (speechBubble) {
                    speechBubble.classList.add('active');
                }
            }
        } else {
            // Idle animation
            head.position.y = 1.25 + Math.sin(Date.now() * 0.002) * 0.05;
            robotGroup.position.y = Math.sin(Date.now() * 0.001) * 0.05;
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
            
            // Update speech bubble
            if (speechBubble) {
                speechBubble.querySelector('p').textContent = 'Explore my work below!';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
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