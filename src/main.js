// Main JavaScript for David Vargas Portfolio

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

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
    initMiniGame();
    initLanguageGame();
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

// Global variable for mini-game
let currentMiniGameLevel = 1;
let completedLevels = [];

// Mini-Game functionality
function initMiniGame() {
    console.log('Initializing mini-game');
    
    const yearsCodingElement = document.getElementById('years-coding');
    const miniGameModal = document.getElementById('mini-game-modal');
    const closeModal = document.querySelector('#mini-game-modal .close-modal');
    const runBtn = document.getElementById('run-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const feedbackElement = document.getElementById('feedback');
    const hintPanel = document.getElementById('hint-panel');
    const codeInput = document.getElementById('code-input');
    const consoleOutput = document.getElementById('console-output');
    const levelIndicators = document.querySelectorAll('.level-indicator');
    
    // Check if all elements exist
    if (!yearsCodingElement || !miniGameModal || !closeModal || !runBtn || 
        !resetBtn || !hintBtn || !nextLevelBtn || !feedbackElement || 
        !hintPanel || !codeInput || !consoleOutput) {
        console.error('Mini-game elements not found');
        return;
    }
    
    // Create debounced update function
    const debouncedUpdateLineNumbers = debounce(() => {
        updateLineNumbers();
        applySyntaxHighlighting();
    }, 100);
    
    // Make the Years Coding element clickable
    yearsCodingElement.style.cursor = 'pointer';
    
    // Open mini-game when Years Coding is clicked
    yearsCodingElement.addEventListener('click', () => {
        console.log('Years Coding element clicked');
        openMiniGame();
    });
    
    // Update line numbers when text changes
    codeInput.addEventListener('input', debouncedUpdateLineNumbers);
    codeInput.addEventListener('scroll', syncLineNumbersScroll);
    
    // Handle paste events to ensure plain text is pasted
    codeInput.addEventListener('paste', function(e) {
        e.preventDefault();
        
        // Get plain text from clipboard
        const text = e.clipboardData.getData('text/plain');
        
        // Insert the plain text at cursor position
        document.execCommand('insertText', false, text);
        
        // Update line numbers and syntax highlighting
        debouncedUpdateLineNumbers();
    });
    
    // Handle tab key, enter key, and space key in the code editor
    codeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            // Insert 4 spaces using execCommand for better cursor handling
            document.execCommand('insertText', false, '    ');
            
            // Update line numbers and syntax highlighting
            debouncedUpdateLineNumbers();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            
            // Store the current cursor position
            const selection = window.getSelection();
            let cursorPosition = 0;
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const preSelectionRange = range.cloneRange();
                preSelectionRange.selectNodeContents(codeInput);
                preSelectionRange.setEnd(range.startContainer, range.startOffset);
                cursorPosition = preSelectionRange.toString().length;
            }
            
            // Check for auto-indentation - determine if current line ends with colon BEFORE adding new line
            const lines = codeInput.innerText.split('\n');
            const currentLineIndex = lines.findIndex((line, index) => {
                const lineStart = lines.slice(0, index).join('\n').length + (index > 0 ? 1 : 0);
                const lineEnd = lineStart + line.length;
                return cursorPosition >= lineStart && cursorPosition <= lineEnd;
            });
            
            const shouldAutoIndent = currentLineIndex >= 0 && lines[currentLineIndex].trim().endsWith(':');
            
            // Insert a proper line break FIRST
            document.execCommand('insertLineBreak');
            
            // Find the inserted <br> element and ensure there's a text node after it
            setTimeout(() => {
                const brElements = codeInput.querySelectorAll('br');
                const lastBr = brElements[brElements.length - 1];
                
                if (lastBr) {
                    // Ensure there's a text node after the <br> for the cursor
                    let nextNode = lastBr.nextSibling;
                    if (!nextNode || nextNode.nodeType !== Node.TEXT_NODE) {
                        nextNode = document.createTextNode('');
                        lastBr.parentNode.insertBefore(nextNode, lastBr.nextSibling);
                    }
                    
                    // Position cursor at the start of the new line FIRST
                    const range = document.createRange();
                    range.setStart(nextNode, 0);
                    range.setEnd(nextNode, 0);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    
                    // THEN apply auto-indentation to the new line if needed
                    if (shouldAutoIndent) {
                        document.execCommand('insertText', false, '    ');
                    }
                    
                    // Update line numbers and syntax highlighting after all DOM changes
                    setTimeout(() => {
                        updateLineNumbers();
                        applySyntaxHighlighting();
                        
                        // Final cursor position adjustment
                        const newCursorPosition = cursorPosition + 1 + (shouldAutoIndent ? 4 : 0);
                        setTimeout(() => {
                            setCursorPosition(codeInput, newCursorPosition);
                        }, 10);
                    }, 10);
                } else {
                    debouncedUpdateLineNumbers();
                }
            }, 10);
        } else if (e.key === ' ') {
            e.preventDefault();
            
            // Insert a space using execCommand for better cursor handling
            document.execCommand('insertText', false, ' ');
            
            // No need to update line numbers for space, but update syntax highlighting
            applySyntaxHighlighting();
        }
    });
    
    // Function to open the mini-game
    function openMiniGame() {
        miniGameModal.classList.add('active');
        updateLevelIndicators();
        loadLevel(currentMiniGameLevel);
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        console.log('Close button clicked');
        miniGameModal.classList.remove('active');
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === miniGameModal) {
            console.log('Clicked outside modal content');
            miniGameModal.classList.remove('active');
        }
    });
    
    // Run button functionality
    runBtn.addEventListener('click', () => {
        console.log('Run button clicked');
        runCode();
    });
    
    // Reset button functionality
    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked');
        resetCode();
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    });
    
    // Hint button functionality
    hintBtn.addEventListener('click', () => {
        console.log('Hint button clicked');
        toggleHint();
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    });
    
    // Next level button functionality
    nextLevelBtn.addEventListener('click', () => {
        console.log('Next level button clicked');
        if (!completedLevels.includes(currentMiniGameLevel)) {
            completedLevels.push(currentMiniGameLevel);
        }
        currentMiniGameLevel++;
        loadLevel(currentMiniGameLevel);
        updateLevelIndicators();
        nextLevelBtn.style.display = 'none';
        runBtn.style.display = 'inline-flex';
        resetBtn.style.display = 'inline-flex';
        hintBtn.style.display = 'inline-flex';
        feedbackElement.classList.remove('show', 'success', 'error');
        hintPanel.classList.remove('show');
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    });
    
    // Function to update level indicators
    function updateLevelIndicators() {
        levelIndicators.forEach(indicator => {
            const level = parseInt(indicator.dataset.level);
            indicator.classList.remove('active', 'completed');
            
            if (level === currentMiniGameLevel) {
                indicator.classList.add('active');
            } else if (completedLevels.includes(level)) {
                indicator.classList.add('completed');
            }
        });
    }
    
    // Function to update line numbers
    function updateLineNumbers() {
        // Count lines based on innerText split by newlines
        const lines = codeInput.innerText.split('\n');
        let lineCount = lines.length;
        
        // Adjust for trailing empty lines (if the last line is empty, don't count it as an extra line)
        if (lines[lines.length - 1].trim() === '' && lines.length > 1) {
            lineCount--;
        }
        
        // Ensure at least one line
        lineCount = Math.max(1, lineCount);
        
        // Generate line numbers
        let lineNumbersHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            lineNumbersHTML += `${i}<br>`;
        }
        
        const lineNumbersDiv = document.querySelector('.line-numbers');
        lineNumbersDiv.innerHTML = lineNumbersHTML;
        
        // Sync heights and scroll position
        lineNumbersDiv.style.height = `${codeInput.offsetHeight}px`;
        lineNumbersDiv.scrollTop = codeInput.scrollTop;
    }
    
    // Function to apply syntax highlighting
    function applySyntaxHighlighting() {
        if (!codeInput) return;
        
        // Store cursor position
        const selection = window.getSelection();
        let cursorPosition = 0;
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(codeInput);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            cursorPosition = preSelectionRange.toString().length;
        }
        
        // Get the plain text content
        const code = codeInput.innerText;
        
        // Create a document fragment
        const fragment = document.createDocumentFragment();
        const lines = code.split('\n');
        
        // Process each line separately to maintain line breaks
        lines.forEach((line, lineIndex) => {
            // Handle empty lines - create an explicit empty text node to ensure cursor can be placed there
            if (line.trim() === '') {
                const emptyNode = document.createTextNode('');
                fragment.appendChild(emptyNode);
                
                // Add a line break if this isn't the last line
                if (lineIndex < lines.length - 1) {
                    fragment.appendChild(document.createElement('br'));
                }
                return;
            }
            
            // Create a temporary div to hold the highlighted line
            const tempDiv = document.createElement('div');
            tempDiv.style.display = 'inline';
            
            // Apply syntax highlighting to this line
            let highlightedLine = line;
            
            // Define regex patterns for different syntax elements
            const patterns = [
                { type: 'keyword', regex: /\b(if|elif|else|for|while|in|def|return|import|from|as|class|try|except|finally|with|not|and|or|True|False|None)\b/g },
                { type: 'function', regex: /\b(print|len|range|int|str|float|list|dict|set|tuple|sum|min|max|sorted|map|filter|zip|enumerate|open|input)\b(?=\s*\()/g },
                { type: 'string', regex: /(["'])((?:\\\1|(?!\1).)*)\1/g },
                { type: 'number', regex: /\b\d+(?:\.\d+)?\b/g },
                { type: 'comment', regex: /#.*/g }
            ];
            
            // Apply each pattern
            let lastIndex = 0;
            let segments = [];
            
            // Find all matches from all patterns and store them
            patterns.forEach(pattern => {
                const regex = new RegExp(pattern.regex.source, 'g');
                let match;
                while ((match = regex.exec(line)) !== null) {
                    segments.push({
                        index: match.index,
                        text: match[0],
                        type: pattern.type,
                        end: match.index + match[0].length
                    });
                }
            });
            
            // Sort segments by start index
            segments.sort((a, b) => a.index - b.index);
            
            // Filter out overlapping segments (keep the first one)
            const finalSegments = [];
            for (let i = 0; i < segments.length; i++) {
                if (i === 0 || segments[i].index >= finalSegments[finalSegments.length - 1].end) {
                    finalSegments.push(segments[i]);
                }
            }
            
            // Process line with segments
            let processedText = '';
            let currentIndex = 0;
            
            finalSegments.forEach(segment => {
                // Add any plain text before this segment
                if (segment.index > currentIndex) {
                    const plainText = line.substring(currentIndex, segment.index);
                    tempDiv.appendChild(document.createTextNode(plainText));
                }
                
                // Add the segment with appropriate styling
                if (segment.type !== 'plain') {
                    const span = document.createElement('span');
                    span.className = segment.type;
                    span.textContent = segment.text;
                    tempDiv.appendChild(span);
                } else {
                    tempDiv.appendChild(document.createTextNode(segment.text));
                }
                
                currentIndex = segment.index + segment.text.length;
            });
            
            // Add any remaining text
            if (currentIndex < line.length) {
                tempDiv.appendChild(document.createTextNode(line.substring(currentIndex)));
            }
            
            // Append the highlighted line to the fragment
            while (tempDiv.firstChild) {
                fragment.appendChild(tempDiv.firstChild);
            }
            
            // Add a line break if this isn't the last line
            if (lineIndex < lines.length - 1) {
                fragment.appendChild(document.createElement('br'));
            }
        });
        
        // Temporarily disable the input event to prevent infinite loop
        codeInput.removeEventListener('input', debouncedUpdateLineNumbers);
        
        // Clear the current content and add the new content
        codeInput.innerHTML = '';
        codeInput.appendChild(fragment);
        
        // Restore cursor position
        if (cursorPosition > 0) {
            setCursorPosition(codeInput, cursorPosition);
        }
        
        // Re-enable the input event
        codeInput.addEventListener('input', debouncedUpdateLineNumbers);
    }
    
    // Function to sync line numbers scroll with pre element
    function syncLineNumbersScroll() {
        const lineNumbers = document.querySelector('.line-numbers');
        lineNumbers.scrollTop = codeInput.scrollTop;
        
        // Ensure heights match
        lineNumbers.style.height = `${codeInput.offsetHeight}px`;
    }
    
    // Function to toggle hint
    function toggleHint() {
        hintPanel.classList.toggle('show');
    }
    
    // Function to reset code
    function resetCode() {
        const defaultCode = getDefaultCode(currentMiniGameLevel);
        codeInput.innerText = defaultCode;
        updateLineNumbers();
        
        // Reset console
        consoleOutput.innerHTML = '<span class="console-prompt">&gt;&gt;&gt; </span><span id="console-text">Code reset. Run your code to see the output.</span>';
        
        // Hide feedback
        feedbackElement.classList.remove('show', 'success', 'error');
    }
    
    // Function to get default code for a level
    function getDefaultCode(level) {
        switch (level) {
            case 1:
                return '# Write code to print "Hello World!"';
            case 2:
                return '# Create a variable and print its value';
            case 3:
                return '# Check if a number is positive, negative, or zero\nnum = 5';
            case 4:
                return '# Calculate the sum of numbers in a list\nnumbers = [1, 2, 3, 4, 5]\nsuma = 0\n\n# Write a for loop to add each number to suma\n# Then print suma outside the loop';
            default:
                return '# Write your code here';
        }
    }
    
    // Function to load a specific level
    function loadLevel(level) {
        console.log(`Loading level ${level}`);
        
        // Update game content based on level
        const gameContent = document.getElementById('game-content');
        const hintText = document.getElementById('hint-text');
        
        if (level === 1) {
            gameContent.innerHTML = `
                <h4>Year 1 Challenge: Introduction to Python</h4>
                <p>My coding journey began with the classic first program. Write a Python command to print "Hello World!" to the console.</p>
            `;
            hintText.textContent = 'Use the print() function with text in quotes: print("Hello World!")';
        } else if (level === 2) {
            gameContent.innerHTML = `
                <h4>Year 2 Challenge: Variables and Basic Operations</h4>
                <p>In my second year, I learned about variables. Create a variable with any value and print it to the console.</p>
            `;
            hintText.textContent = 'Assign a value to a variable with = and then print it: x = 10; print(x)';
        } else if (level === 3) {
            gameContent.innerHTML = `
                <h4>Year 3 Challenge: Conditional Statements</h4>
                <p>Write a program using <code>if</code>, <code>elif</code>, and <code>else</code> to check if the variable <code>num</code> (which is set to 5) is positive, negative, or zero. Print the appropriate message ("Positive", "Negative", or "Zero") for each case.</p>
            `;
            hintText.textContent = 'Use if, elif, and else: e.g., if num > 0: print("Positive")';
        } else if (level === 4) {
            gameContent.innerHTML = `
                <h4>Year 4 Challenge: Loops and Summing</h4>
                <p>Use a <code>for</code> loop to calculate the sum of numbers in the list <code>numbers = [1, 2, 3, 4, 5]</code>. Store the result in a variable <code>suma</code>, then print it outside the loop. The output should be <code>15</code>.</p>
            `;
            hintText.textContent = 'Use a for loop to iterate over the list, add each number to suma, then print suma outside the loop.';
        }
        
        // Set default code
        codeInput.innerText = getDefaultCode(level);
        debouncedUpdateLineNumbers();
        
        // Reset console
        consoleOutput.innerHTML = '<span class="console-prompt">&gt;&gt;&gt; </span><span id="console-text">Write and run your code to see the output.</span>';
        
        // Focus on code input
        codeInput.focus();
    }
    
    // Function to run code
    function runCode() {
        const code = codeInput.innerText.trim();
        console.log(`Running code: ${code}`);
        
        // Clear previous feedback
        feedbackElement.classList.remove('show', 'success', 'error');
        
        try {
            // Simulate code execution based on level
            let output = '';
            let isCorrect = false;
            
            if (currentMiniGameLevel === 1) {
                // Year 1: Print "Hello World!"
                if (code.includes('print') && (code.includes('"Hello World!"') || code.includes("'Hello World!'"))) {
                    output = 'Hello World!';
                    isCorrect = true;
                } else if (code.includes('print')) {
                    // They used print but with wrong text
                    const match = code.match(/print\s*\(\s*["'](.*)["']\s*\)/);
                    if (match && match[1]) {
                        output = match[1];
                    } else {
                        output = 'Error: SyntaxError: invalid syntax';
                    }
                } else {
                    output = 'Error: Missing print statement';
                }
            } else if (currentMiniGameLevel === 2) {
                // Year 2: Variables and assignment
                if (code.includes('x = 10') && code.includes('print(x)')) {
                    output = '10';
                    isCorrect = true;
                } else if (code.includes('x =') && code.includes('print(x)')) {
                    // They assigned something else to x
                    const match = code.match(/x\s*=\s*([0-9]+)/);
                    if (match && match[1]) {
                        output = match[1];
                    } else {
                        output = 'Error: Invalid variable assignment';
                    }
                } else if (code.includes('x =')) {
                    output = 'Error: You declared the variable, but did not print it';
                } else if (code.includes('print')) {
                    output = 'Error: You need to assign a value to a variable first';
                } else {
                    output = 'Error: Missing variable assignment and print statement';
                }
            } else if (currentMiniGameLevel === 3) {
                // Year 3: Conditionals
                const num = 5;  // The number to check
                
                if (code.includes('if') && code.includes('else') && 
                   (code.includes('num > 0') || code.includes('num >= 1')) && 
                   code.includes('print("Positive")')) {
                    output = 'Positive';
                    isCorrect = true;
                } else if (code.includes('if') && code.includes('num')) {
                    // They tried conditionals but got it wrong
                    if (code.includes('print("Positive")')) {
                        output = 'Positive';
                    } else if (code.includes('print("Negative")')) {
                        output = 'Negative';
                    } else if (code.includes('print("Zero")')) {
                        output = 'Zero';
                    } else {
                        output = 'Error: Not printing the correct message';
                    }
                } else if (code.includes('if')) {
                    output = 'Error: Your conditional is not checking "num"';
                } else {
                    output = 'Error: Missing if/elif/else conditionals';
                }
            } else if (currentMiniGameLevel === 4) {
                // Year 4: Loops and lists
                const hasForLoop = /for\s+\w+\s+in\s+numbers/.test(code) || 
                                  /for\s+\w+\s+in\s+range\s*\(\s*len\s*\(\s*numbers\s*\)\s*\)/.test(code);
                const hasSumaVar = /suma\s*=\s*0/.test(code);
                const hasAddition = /suma\s*\+=/.test(code) || /suma\s*=\s*suma\s*\+/.test(code);
                const hasPrintSuma = /print\s*\(\s*suma\s*\)/.test(code);
                
                const lines = code.split('\n');
                let forLoopLine = -1;
                let printLine = -1;
                let forLoopIndent = 0;
                let printIndent = 0;
                let hasIndentedCode = false;
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    const indentMatch = line.match(/^(\s*)/);
                    const indent = indentMatch ? indentMatch[1].length : 0;
                    
                    if (line.trim().startsWith('for') && line.trim().includes('in')) {
                        forLoopLine = i;
                        forLoopIndent = indent;
                    } 
                    else if (forLoopLine !== -1 && i > forLoopLine && indent > forLoopIndent) {
                        hasIndentedCode = true;
                    }
                    else if (line.trim().startsWith('print') && line.includes('suma')) {
                        printLine = i;
                        printIndent = indent;
                    }
                }
                
                // Check if print is outside the loop (less indented than the loop body)
                const printOutsideLoop = printLine > forLoopLine && printIndent <= forLoopIndent;
                
                if (hasSumaVar && hasForLoop && hasAddition && hasPrintSuma && printOutsideLoop && hasIndentedCode) {
                    output = '15';  // Sum of [1, 2, 3, 4, 5]
                    isCorrect = true;
                } else if (hasForLoop && hasAddition && hasPrintSuma) {
                    if (!printOutsideLoop) {
                        output = 'Make sure to print the suma outside the for loop (not indented).';
                    } else if (!hasSumaVar) {
                        output = 'Initialize suma to 0 before the loop.';
                    } else if (!hasIndentedCode) {
                        output = 'Make sure your loop has properly indented code inside it.';
                    } else {
                        output = 'Check your loop logic. Did you add each number to suma?';
                    }
                } else if (hasForLoop) {
                    output = 'Partial solution: You have the loop, but need to add each number to suma and print the result outside the loop.';
                } else {
                    output = 'Error: Use a for loop to iterate through the list, add each number to suma, and print suma outside the loop.';
                }
            }
            
            // Update console output
            if (output.startsWith('Error:')) {
                consoleOutput.innerHTML = `<span class="console-prompt">&gt;&gt;&gt; </span><span class="console-error">${output}</span>`;
            } else {
                consoleOutput.innerHTML = `<span class="console-prompt">&gt;&gt;&gt; </span><span class="console-success">${output}</span>`;
            }
            
            // Show feedback if correct
            if (isCorrect) {
                feedbackElement.textContent = getLevelSuccessMessage(currentMiniGameLevel);
                feedbackElement.classList.add('show', 'success');
                
                // Hide buttons immediately
                runBtn.style.display = 'none';
                resetBtn.style.display = 'none';
                hintBtn.style.display = 'none';
                
                // Check if this is the final level (Year 4)
                if (currentMiniGameLevel === 4) {
                    console.log('Year 4 completed! Showing final screen');
                    
                    // Use a short delay to ensure the user sees the success message first
                    setTimeout(() => {
                        // Get the modal content element directly
                        const modalContent = document.querySelector('#mini-game-modal .modal-content');
                        if (!modalContent) {
                            console.error('Cannot find modal content element');
                            return;
                        }
                        
                        // Store original content for restoration
                        const originalContent = modalContent.innerHTML;
                        if (!modalContent.dataset.originalContent) {
                            modalContent.dataset.originalContent = originalContent;
                        }
                        
                        // Replace content with final screen
                        console.log('Replacing modal content with final screen');
                        modalContent.innerHTML = `
                            <div class="final-screen">
                                <h3>Congratulations, Jorge!</h3>
                                <p>Wish the coding difficulty throughout the years was like this mini-game! Congrats on mastering these coding challenges—your journey as a developer is just getting started!</p>
                                <button id="close-mini-game-btn" class="game-btn">Close Mini-Game</button>
                            </div>
                        `;
                        
                        // Add event listener to the close button
                        const closeBtn = document.getElementById('close-mini-game-btn');
                        if (closeBtn) {
                            closeBtn.addEventListener('click', () => {
                                console.log('Close mini-game button clicked');
                                
                                // Close the modal
                                const miniGameModal = document.getElementById('mini-game-modal');
                                if (miniGameModal) {
                                    miniGameModal.classList.remove('active');
                                } else {
                                    console.error('Cannot find mini-game modal element');
                                }
                                
                                // Restore original content after a delay
                                setTimeout(() => {
                                    if (modalContent.dataset.originalContent) {
                                        modalContent.innerHTML = modalContent.dataset.originalContent;
                                    }
                                    
                                    // Reset game state for future plays
                                    currentMiniGameLevel = 1;
                                    completedLevels = [];
                                    updateLevelIndicators();
                                    
                                    // Reset button display
                                    runBtn.style.display = 'inline-flex';
                                    resetBtn.style.display = 'inline-flex';
                                    hintBtn.style.display = 'inline-flex';
                                    nextLevelBtn.style.display = 'none';
                                }, 300);
                            });
                        } else {
                            console.error('Cannot find close button element');
                        }
                    }, 1000);
                } else {
                    // Show next level button for non-final levels
                    nextLevelBtn.style.display = 'inline-flex';
                }
                
                // Play success sound
                try {
                    playSound('success');
                } catch (error) {
                    console.error('Error playing sound:', error);
                }
                
                // Add to completed levels if not already there
                if (!completedLevels.includes(currentMiniGameLevel)) {
                    completedLevels.push(currentMiniGameLevel);
                }
            }
        } catch (error) {
            console.error('Error running code:', error);
            consoleOutput.innerHTML = `<span class="console-prompt">&gt;&gt;&gt; </span><span class="console-error">Error: ${error.message}</span>`;
        }
    }
    
    // Function to get success message for a level
    function getLevelSuccessMessage(level) {
        switch (level) {
            case 1:
                return 'Great job! You\'ve successfully printed "Hello World!" to the console. This is the first step in every programmer\'s journey.';
            case 2:
                return 'Excellent! You\'ve created a variable and printed its value. Variables are fundamental building blocks in programming.';
            case 3:
                return 'Well done! You\'ve mastered conditional statements, which are essential for decision-making in programs.';
            case 4:
                return 'Amazing! You\'ve successfully used loops to process data in a list. This is a powerful technique used in data processing.';
            default:
                return 'Congratulations! You\'ve completed this level successfully.';
        }
    }
    
    // Initialize the mini-game
    updateLevelIndicators();
    console.log('Mini-game initialization completed');
}

// Chatbot functionality
function initChatbot() {
    console.log('Initializing chatbot');
    
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotFaceSvg = document.querySelector('.chatbot-face-svg'); // Updated for SVG
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotSuggestions = document.getElementById('chatbot-suggestions');
    const chatbotContext = document.getElementById('chatbot-context');
    
    if (!chatbotContainer || !chatbotToggle || !chatbotFaceSvg || !chatbotWindow || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotMessages || !chatbotSuggestions || !chatbotContext) {
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
    let chatbotOpen = false;
    
    // Store original position
    const originalRight = 30;
    const originalBottom = 30;
    
    // Set max movement range (px from original position)
    const maxRangeX = 100;
    const maxRangeY = 80;
    
    // Function to position the context bubble for fun facts
    function positionContextBubble() {
        console.log('Positioning context bubble for fun facts');
        // Create a style element for our dynamic styles
        const styleEl = document.createElement('style');
        
        // Remove any existing styles to avoid conflicts
        const existingStyle = document.getElementById('chatbot-context-styles');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Set an ID for the style element
        styleEl.id = 'chatbot-context-styles';
        
        // Add the fun-fact-bubble class styles
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
    }
    
    // Function to check if we're in the hero section
    function checkVisibleSection() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return false;
        
        const heroRect = heroSection.getBoundingClientRect();
        // Return true only if hero section takes up significant portion of viewport
        return heroRect.top < window.innerHeight / 2 && heroRect.bottom > window.innerHeight / 2;
    }
    
    // Function to check if we're in the About section specifically
    function isInAboutSection() {
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return false;
        
        const aboutRect = aboutSection.getBoundingClientRect();
        // Return true if the About section is the current visible section
        return aboutRect.top < window.innerHeight / 2 && aboutRect.bottom > window.innerHeight / 2;
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
            chatbotContainer.style.right = `${currentX}px`;
            chatbotContainer.style.bottom = `${currentY}px`;
            
            // Add some rotation based on velocity for dragging effect
            const rotation = Math.min(8, Math.max(-8, velocity.x * 0.2));
            const stretch = Math.max(0.9, Math.min(1.1, 1 + Math.abs(velocity.x) * 0.001));
            chatbotToggle.style.transform = `rotate(${rotation}deg) scaleX(${stretch})`;
            
            isMoving = true;
            lastMoveTime = Date.now();
            chatbotContainer.classList.remove('default-position');
            
            // Clear any existing timeout and set a new one
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                if (Date.now() - lastMoveTime > 300) {
                    isMoving = false;
                    // Return to normal rotation and scale
                    chatbotToggle.style.transform = 'rotate(0deg) scaleX(1)';
                    
                    // Add the default-position class when at rest in the default position
                    if (Math.abs(currentX - originalRight) < 2 && Math.abs(currentY - originalBottom) < 2) {
                        chatbotContainer.classList.add('default-position');
                    }
                }
            }, 300);
            
            requestAnimationFrame(updateChatbotPosition);
        } else {
            isMoving = false;
            velocity.x = 0;
            velocity.y = 0;
            chatbotToggle.style.transform = 'rotate(0deg) scaleX(1)';
            
            // Add the default-position class when at rest in the default position
            if (Math.abs(currentX - originalRight) < 2 && Math.abs(currentY - originalBottom) < 2) {
                chatbotContainer.classList.add('default-position');
            }
        }
    }
    
    // Function to show random expressions
    function showRandomExpression() {
        // Only show expressions when not moving and not too often
        if (!isMoving && Date.now() - lastExpression > 5000 && Math.random() < 0.3) {
            const expressions = [
                () => {
                    // Surprised expression
                    chatbotToggle.style.animation = 'surprised 0.5s ease-in-out';
                    setTimeout(() => {
                        chatbotToggle.style.animation = '';
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
        
        // Schedule the next check
        clearTimeout(expressionTimeout);
        expressionTimeout = setTimeout(showRandomExpression, 2000 + Math.random() * 3000);
    }
    
    // Function to show a random fun fact
    function showRandomFunFact() {
        if (Date.now() - lastFunFactTime > 8000 && isInHeroSection && !chatbotWindow.classList.contains('open')) {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            chatbotContext.textContent = randomFact;
            chatbotContext.classList.add('fun-fact-bubble');
            
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
        // Check if we're in the hero section
        isInHeroSection = checkVisibleSection();
        
        // Only follow mouse if not open and we're still in the hero section
        if (!chatbotOpen && isInHeroSection) {
            // Move the entire chatbot to follow the mouse across the screen
            // Map mouse position to screen coordinates with some padding
            const screenPadding = 80; // Padding from screen edges in pixels
            targetX = window.innerWidth - e.clientX;
            targetY = window.innerHeight - e.clientY;
            
            // Ensure we're within bounds (not too close to screen edges)
            targetX = Math.max(screenPadding, Math.min(window.innerWidth - screenPadding, targetX));
            targetY = Math.max(screenPadding, Math.min(window.innerHeight - screenPadding, targetY));
            
            // Remove the default position class when following mouse
            chatbotContainer.classList.remove('default-position');
            
            // Start the animation if not already running
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Show random fun facts in following mode
            showRandomFunFact();
        } else if (!chatbotOpen && !isInHeroSection) {
            // Reset to default position when scrolled past hero section
            targetX = originalRight;
            targetY = originalBottom;
            
            if (!isMoving) {
                updateChatbotPosition();
            }
        }
    });
    
    // Check scroll position to update chatbot visibility and behavior
    window.addEventListener('scroll', () => {
        // Get current state
        const wasInHeroSection = isInHeroSection;
        isInHeroSection = checkVisibleSection();
        const aboutSectionVisible = isInAboutSection();
        
        // If we just scrolled to the About section from hero, reset to default position
        if (aboutSectionVisible || (!isInHeroSection && wasInHeroSection)) {
            targetX = originalRight;
            targetY = originalBottom;
            
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Hide any fun facts when returning to default position
            chatbotContext.classList.remove('show');
        }
        
        // If we just scrolled back to hero section, allow following again
        if (isInHeroSection && !wasInHeroSection && !chatbotOpen) {
            // Next mousemove will handle positioning
            console.log("Back in hero section - chatbot will follow mouse again");
        }
    });
    
    // Ensure we only have one click handler for the toggle
    chatbotToggle.removeEventListener('click', toggleChatbot);
    
    // Define toggle function
    function toggleChatbot() {
        console.log("Toggle chatbot clicked");
        chatbotWindow.classList.toggle('open');
        chatbotOpen = chatbotWindow.classList.contains('open');
        
        // Reset to default position when opened
        if (chatbotOpen) {
            targetX = originalRight;
            targetY = originalBottom;
            
            if (!isMoving) {
                updateChatbotPosition();
            }
            
            // Hide context bubble when chat is open
            chatbotContext.classList.remove('show');
            
            // Reset to normal appearance
            chatbotToggle.style.animation = '';
            chatbotContainer.style.animation = '';
            
            // Focus the input field for immediate typing
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);
        }
    }
    
    // Add the click event listener
    chatbotToggle.addEventListener('click', toggleChatbot);
    
    // Close chatbot when clicking the close button
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
        chatbotOpen = false;
        
        // If we're in the hero section, allow following the mouse again
        if (isInHeroSection) {
            // The next mousemove will handle positioning
        } else {
            // Ensure we're in the default position
            targetX = originalRight;
            targetY = originalBottom;
            if (!isMoving) {
                updateChatbotPosition();
            }
        }
    });
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key press
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Click on suggestion chips
    chatbotSuggestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-chip')) {
            chatbotInput.value = e.target.textContent;
            sendMessage();
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
    
    // Sample fun facts about David
    const funFacts = [
        "I've built 4 robots from scratch!",
        "I speak 3 languages fluently!",
        "My code has helped over 10,000 users!",
        "I won the National Robotics Championship!",
        "I've contributed to 12 open-source projects!",
        "I play piano and write music in my free time!",
        "I've led teams of up to 15 developers!",
        "My favorite language is Python, but I'm falling for Rust!",
        "I've lived in 4 different countries!",
        "My first program was a simple game written at age 12!"
    ];
    
    // Context-aware messages for each section
    const contextMessages = {
        'hero': ["Let me tell you about David's projects and skills!", "Want to learn about David's expertise?", "Ask me anything about David's work!"],
        'about': ["David has an impressive background! Ask me about it.", "Curious about David's achievements?", "David has many interesting hobbies!"],
        'experience': ["David has worked on some cool projects!", "Ask me about David's work with Jobsi.", "David has great experience in AI and robotics!"],
        'skills': ["David is proficient in many programming languages!", "Ask me about David's technical skills!", "David specializes in AI and machine learning."],
        'projects': ["These projects showcase David's abilities!", "Ask me for details on any project.", "Which project interests you the most?"],
        'education': ["David has a strong educational background!", "Ask me about David's academic achievements!", "David's constantly learning new skills!"],
        'contact': ["Want to get in touch with David?", "David would love to hear from you!", "Need David's contact information?"]
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
            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.suggestion-chip',
                    translateY: [10, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    easing: 'easeOutQuad'
                });
            }
            
            suggestionsShown = true;
        }
    }
    
    // Add event listeners for scroll to detect current section
    window.addEventListener('scroll', updateCurrentSection);
    
    // Initialize with current section
    setTimeout(updateCurrentSection, 1000);
    
    
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
    
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Simple response patterns based on keywords
        if (message.includes('experience') || message.includes('work') || message.includes('jobsi')) {
            return "David has extensive experience in software development and robotics. He worked at Jobsi where he developed their web application using React and Node.js, improving user engagement by 32%. He also has experience in algorithm development and AI implementation.";
        } else if (message.includes('skills') || message.includes('programming') || message.includes('languages')) {
            return "David is skilled in JavaScript, Python, Java, C++, and is learning Rust. He has expertise in AI/ML frameworks like TensorFlow and PyTorch, as well as web technologies including React, Node.js, and various databases. His skills extend to robotics programming and hardware integration as well.";
        } else if (message.includes('project') || message.includes('robot') || message.includes('app')) {
            return "David has worked on several impressive projects, including a quadruped robot with custom gait algorithms, a web application for Jobsi that improved their user engagement, and various data visualization tools. Each project showcases his technical versatility and problem-solving skills.";
        } else if (message.includes('education') || message.includes('university') || message.includes('degree')) {
            return "David is pursuing a Bachelor's in Computer Science & AI at IE University, expected to graduate in 2026. He's maintaining an 8/10 GPA while taking advanced courses in Machine Learning, Data Analysis, Business Analytics, and Algorithms & Data Structures.";
        } else if (message.includes('contact') || message.includes('email') || message.includes('connect')) {
            return "You can contact David through the form in the Contact section, or reach out via LinkedIn or GitHub. He's always open to discussing new opportunities and collaborative projects!";
        } else if (message.includes('hobby') || message.includes('free time') || message.includes('football') || message.includes('piano')) {
            return "When not coding, David enjoys playing competitive football and piano. These activities help him maintain a creative and balanced perspective. He believes that diverse interests enhance problem-solving abilities in tech.";
        } else {
            // Generic responses for other queries
            const genericResponses = [
                "That's an interesting question about David. He's a Computer Science and AI student passionate about creating innovative tech solutions.",
                "David specializes in AI, robotics, and full-stack development. Is there something specific you'd like to know about his expertise?",
                "David combines technical expertise with creative problem-solving. His projects reflect his passion for innovation and practical solutions.",
                "David has experience in both software and hardware aspects of technology. His diverse background gives him a unique perspective on tech challenges."
            ];
            
            return genericResponses[Math.floor(Math.random() * genericResponses.length)];
        }
    }
    
    function showResponseSuggestions(userMessage) {
        // Clear previous suggestions
        chatbotSuggestions.innerHTML = '';
        chatbotSuggestions.style.display = 'flex';
        
        let newSuggestions = [];
        userMessage = userMessage.toLowerCase();
        
        // Determine follow-up suggestions based on the user's message
        if (userMessage.includes('experience') || userMessage.includes('work') || userMessage.includes('jobsi')) {
            newSuggestions = ['Tell me about specific projects', 'What skills did you use at Jobsi?', 'Leadership experiences'];
        } else if (userMessage.includes('skills') || userMessage.includes('programming')) {
            newSuggestions = ['AI/ML experience', 'Web development skills', 'Software engineering projects'];
        } else if (userMessage.includes('project') || userMessage.includes('robot')) {
            newSuggestions = ['Technical challenges', 'Technologies used', 'Other projects'];
        } else if (userMessage.includes('education') || userMessage.includes('university')) {
            newSuggestions = ['Relevant courses', 'Leadership programs', 'Academic achievements'];
        } else if (userMessage.includes('contact') || userMessage.includes('connect')) {
            newSuggestions = ['LinkedIn profile', 'Portfolio website', 'GitHub repositories'];
        } else {
            // Default suggestions if no specific topic detected
            newSuggestions = ['Tell me about your projects', 'What are your key skills?', 'Contact information'];
        }
        
        // Add suggestions to the DOM
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
        
        // Animate in the suggestions
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.suggestion-chip',
                translateY: [10, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
        }
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
    
    try {
        // Use the configuration directly instead of loading from a file
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 900
                    }
                },
                "color": {
                    "value": "#00D4B4"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.6,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2.5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 180,
                    "color": "#1A3C5A",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 180,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 150,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        console.log('Particles.js initialized successfully');
    } catch (error) {
        console.error('Error initializing particles.js:', error);
    }
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
        'kick': 'src/sounds/kick.mp3',
        'click': 'src/sounds/pop.mp3',
        'error': 'src/sounds/beep.mp3'
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

// Helper function to set cursor position in contentEditable element
function setCursorPosition(element, position) {
    if (!element) {
        console.error('Element is undefined in setCursorPosition');
        return false;
    }
    
    console.log(`Setting cursor position to ${position} in element`, element);
    const nodeStack = [element];
    let currentPos = 0;
    let found = false;
    
    // Walk through all text nodes to find the right position
    while (nodeStack.length > 0 && !found) {
        const currentNode = nodeStack.pop();
        
        if (currentNode.nodeType === Node.TEXT_NODE) {
            const nodeLength = currentNode.nodeValue.length;
            
            if (currentPos + nodeLength >= position) {
                // This is the node where the cursor should be
                const range = document.createRange();
                const offset = position - currentPos;
                
                // Make sure offset is within bounds
                const safeOffset = Math.min(Math.max(0, offset), nodeLength);
                
                try {
                    range.setStart(currentNode, safeOffset);
                    range.setEnd(currentNode, safeOffset);
                    
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    found = true;
                } catch (error) {
                    console.error('Error setting cursor position:', error);
                }
                break;
            }
            
            currentPos += nodeLength;
        } else {
            // Add child nodes to the stack in reverse order
            // so we process them in the correct order
            const children = Array.from(currentNode.childNodes);
            for (let i = children.length - 1; i >= 0; i--) {
                nodeStack.push(children[i]);
            }
        }
    }
    
    if (!found) {
        console.warn(`Could not find position ${position} in element. Current position reached: ${currentPos}`);
    }
    
    return found;
}

// Global variable for language game
let currentLanguageLevel = 1;
let completedLanguageLevels = [];
let selectedOption = null;

// Language game data
const languageData = [
    {
        language: "English",
        prompt: "How do you greet someone in English?",
        options: ["Hello", "Hola", "Bonjour", "Shalom"],
        correctAnswer: "Hello",
        hint: "This is the standard greeting in English, starting with H.",
        successMessage: "Excellent! In English, we say 'Hello' as a greeting."
    },
    {
        language: "Spanish",
        prompt: "What's the common greeting in Spanish?",
        options: ["Hello", "Hola", "Bonjour", "Shalom"],
        correctAnswer: "Hola",
        hint: "This greeting is common in Spain and Latin American countries.",
        successMessage: "¡Muy bien! 'Hola' is how we say hello in Spanish."
    },
    {
        language: "French",
        prompt: "Which word would you use to say hi in French?",
        options: ["Hello", "Hola", "Bonjour", "Shalom"],
        correctAnswer: "Bonjour",
        hint: "This formal French greeting literally means 'good day'.",
        successMessage: "Très bien! 'Bonjour' is the French greeting for hello."
    },
    {
        language: "Hebrew",
        prompt: "How would you welcome someone in Hebrew?",
        options: ["Hello", "Hola", "Bonjour", "Shalom"],
        correctAnswer: "Shalom",
        hint: "This Hebrew greeting also means 'peace'.",
        successMessage: "מצוין! (Excellent!) 'Shalom' is how we say hello in Hebrew."
    }
];

// Initialize language game
function initLanguageGame() {
    console.log('Initializing language game');
    
    const languagesSpokenElement = document.getElementById('languages-spoken');
    const languageGameModal = document.getElementById('language-game-modal');
    const closeModal = document.querySelector('#language-game-modal .close-modal');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const hintBtn = document.getElementById('language-hint-btn');
    const nextLevelBtn = document.getElementById('language-next-level-btn');
    const feedbackElement = document.getElementById('language-feedback');
    const challengeOptions = document.getElementById('challenge-options');
    
    // Check if all elements exist
    if (!languagesSpokenElement || !languageGameModal || !closeModal || 
        !checkAnswerBtn || !hintBtn || !nextLevelBtn || !feedbackElement || 
        !challengeOptions) {
        console.error('Language game elements not found');
        return;
    }
    
    // Make the Languages Spoken element clickable
    languagesSpokenElement.style.cursor = 'pointer';
    
    // Open language game when Languages Spoken is clicked
    languagesSpokenElement.addEventListener('click', () => {
        console.log('Languages Spoken element clicked');
        openLanguageGame();
    });
    
    // Function to open the language game
    function openLanguageGame() {
        languageGameModal.classList.add('active');
        updateLanguageLevelIndicators();
        loadLanguageLevel(currentLanguageLevel);
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        console.log('Close language game button clicked');
        languageGameModal.classList.remove('active');
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === languageGameModal) {
            console.log('Clicked outside language game modal content');
            languageGameModal.classList.remove('active');
        }
    });
    
    // Check answer button functionality
    checkAnswerBtn.addEventListener('click', () => {
        console.log('Check answer button clicked');
        checkAnswer();
    });
    
    // Hint button functionality
    hintBtn.addEventListener('click', () => {
        console.log('Language hint button clicked');
        showLanguageHint();
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    });
    
    // Next level button functionality
    nextLevelBtn.addEventListener('click', () => {
        console.log('Next language level button clicked');
        
        // Move to the next level or complete the game if all levels are done
        if (!completedLanguageLevels.includes(currentLanguageLevel)) {
            completedLanguageLevels.push(currentLanguageLevel);
        }
        
        if (currentLanguageLevel < languageData.length) {
            currentLanguageLevel++;
            loadLanguageLevel(currentLanguageLevel);
            nextLevelBtn.style.display = 'none';
        } else {
            // Game completed
            completeLanguageGame();
        }
        
        try {
            playSound('click');
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    });
    
    // Update level indicators based on current level and completed levels
    function updateLanguageLevelIndicators() {
        const levelIndicators = document.querySelectorAll('#language-game-modal .level-indicator');
        
        levelIndicators.forEach((indicator, index) => {
            const level = index + 1;
            
            // Reset all level indicators
            indicator.classList.remove('active', 'completed');
            
            // Mark completed levels
            if (completedLanguageLevels.includes(level)) {
                indicator.classList.add('completed');
            }
            
            // Mark current level
            if (level === currentLanguageLevel) {
                indicator.classList.add('active');
            }
        });
    }
    
    // Load a specific language level
    function loadLanguageLevel(level) {
        // Adjust level index (1-based to 0-based)
        const levelIndex = level - 1;
        
        if (levelIndex < 0 || levelIndex >= languageData.length) {
            console.error('Invalid language level:', level);
            return;
        }
        
        const levelData = languageData[levelIndex];
        
        // Update challenge prompt
        const promptElement = document.getElementById('challenge-prompt');
        if (promptElement) {
            promptElement.textContent = levelData.prompt;
        }
        
        // Clear options
        const optionsContainer = document.getElementById('challenge-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            // Add options
            levelData.options.forEach((option, index) => {
                const optionButton = document.createElement('div');
                optionButton.className = 'option-button';
                optionButton.textContent = option;
                optionButton.dataset.option = option;
                
                // Add click handler
                optionButton.addEventListener('click', () => {
                    // Remove selected class from all options
                    document.querySelectorAll('.option-button').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    
                    // Add selected class to this option
                    optionButton.classList.add('selected');
                    
                    // Store selected option
                    selectedOption = option;
                });
                
                optionsContainer.appendChild(optionButton);
            });
        }
        
        // Reset feedback
        const feedbackElement = document.getElementById('language-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
        }
        
        // Hide next level button
        const nextLevelButton = document.getElementById('language-next-level-btn');
        if (nextLevelButton) {
            nextLevelButton.style.display = 'none';
        }
        
        // Reset selected option
        selectedOption = null;
        
        // Update level indicators
        updateLanguageLevelIndicators();
    }
    
    // Show hint for current level
    function showLanguageHint() {
        const levelIndex = currentLanguageLevel - 1;
        
        if (levelIndex < 0 || levelIndex >= languageData.length) {
            return;
        }
        
        const hint = languageData[levelIndex].hint;
        const feedbackElement = document.getElementById('language-feedback');
        
        if (feedbackElement) {
            feedbackElement.textContent = hint;
            feedbackElement.className = 'feedback show';
        }
    }
    
    // Check answer
    function checkAnswer() {
        if (!selectedOption) {
            // No option selected
            const feedbackElement = document.getElementById('language-feedback');
            if (feedbackElement) {
                feedbackElement.textContent = 'Please select an option!';
                feedbackElement.className = 'feedback show error';
            }
            return;
        }
        
        const levelIndex = currentLanguageLevel - 1;
        
        if (levelIndex < 0 || levelIndex >= languageData.length) {
            return;
        }
        
        const correctAnswer = languageData[levelIndex].correctAnswer;
        const feedbackElement = document.getElementById('language-feedback');
        const nextLevelButton = document.getElementById('language-next-level-btn');
        
        // Mark selected option as correct or incorrect
        document.querySelectorAll('.option-button').forEach(btn => {
            if (btn.dataset.option === selectedOption) {
                if (selectedOption === correctAnswer) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                }
            }
            
            // Show correct answer if user got it wrong
            if (btn.dataset.option === correctAnswer && selectedOption !== correctAnswer) {
                setTimeout(() => {
                    btn.classList.add('correct');
                }, 500);
            }
        });
        
        if (selectedOption === correctAnswer) {
            // Correct answer
            if (feedbackElement) {
                feedbackElement.textContent = languageData[levelIndex].successMessage;
                feedbackElement.className = 'feedback show success';
            }
            
            // Show next level button
            if (nextLevelButton) {
                nextLevelButton.style.display = 'block';
            }
            
            // Celebrate
            try {
                playSound('success');
            } catch (error) {
                console.error('Error playing sound:', error);
            }
            
            // Trigger mascot animation
            const mascot = document.getElementById('language-mascot');
            if (mascot) {
                mascot.classList.add('celebrating');
                setTimeout(() => {
                    mascot.classList.remove('celebrating');
                }, 1000);
            }
            
            // Update stat number if all levels completed
            if (!completedLanguageLevels.includes(currentLanguageLevel)) {
                completedLanguageLevels.push(currentLanguageLevel);
                
                if (completedLanguageLevels.length === languageData.length) {
                    // All levels completed
                    const statNumber = document.querySelector('#languages-spoken .stat-number');
                    if (statNumber) {
                        statNumber.textContent = languageData.length;
                    }
                }
            }
        } else {
            // Incorrect answer
            if (feedbackElement) {
                feedbackElement.textContent = 'Incorrect. Try again!';
                feedbackElement.className = 'feedback show error';
            }
            
            try {
                playSound('error');
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        }
    }
    
    // Complete the language game
    function completeLanguageGame() {
        // Hide game content
        const gameContent = document.getElementById('language-game-content');
        if (gameContent) {
            gameContent.innerHTML = `
                <div class="game-completion">
                    <div class="completion-mascot">
                        <img src="public/images/duo-mascot.svg" alt="Language Assistant" class="celebrating">
                    </div>
                    <h3>Language Mission Complete!</h3>
                    <p class="multilingual-congrats">¡Felicidades! Congratulations! Félicitations! !ברכות</p>
                    <p>You've mastered greetings in all 4 languages!</p>
                    <p>Now we can have conversations in English, Spanish, French, and Hebrew!</p>
                    <div class="completion-flags">
                        <div class="flag-icon"><span>🇺🇸</span><span>Hello</span></div>
                        <div class="flag-icon"><span>🇪🇸</span><span>Hola</span></div>
                        <div class="flag-icon"><span>🇫🇷</span><span>Bonjour</span></div>
                        <div class="flag-icon"><span>🇮🇱</span><span>Shalom</span></div>
                    </div>
                </div>
            `;
        }
        
        // Hide game controls
        const gameControls = document.getElementById('language-game-controls');
        if (gameControls) {
            gameControls.style.display = 'none';
        }
        
        // Update the stat number
        const statNumber = document.querySelector('#languages-spoken .stat-number');
        if (statNumber) {
            statNumber.textContent = languageData.length;
        }
        
        // Play celebration sound
        try {
            playSound('success', 0.5);
        } catch (error) {
            console.error('Error playing sound:', error);
        }
        
        // Update the symbol in the mascot SVG to show completion
        try {
            const symbolText = document.getElementById('symbol-text');
            if (symbolText) {
                symbolText.textContent = "4";
            }
        } catch (error) {
            console.error('Error updating mascot:', error);
        }
    }
}

function loadLanguageGameLevel(level) {
    // This function is called from HTML onclick
    currentLanguageLevel = level;
    const levelIndicators = document.querySelectorAll('#language-game-modal .level-indicator');
    
    levelIndicators.forEach((indicator, index) => {
        // Reset all indicators first
        indicator.classList.remove('active');
        
        // Set the active indicator for the current level
        if (index + 1 === level) {
            indicator.classList.add('active');
        }
    });
    
    // Load the level content
    loadLanguageLevel(level);
}