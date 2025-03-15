import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

// Import scene subjects
import ProjectsSubject from '../subjects/ProjectsSubject.js';
import SkillsSubject from '../subjects/SkillsSubject.js';
import EnvironmentSubject from '../subjects/EnvironmentSubject.js';

export default class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.subjects = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mousePosition = { x: 0, y: 0 };
        this.currentSection = 'about';
        this.transitionInProgress = false;
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#0a192f');
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.5, 4);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.physicallyCorrectLights = true;
        
        // Create controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 1.5;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 15;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;
        this.controls.target.set(0, 0, 0);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 2, 3);
        this.scene.add(directionalLight);
        
        // Add a subtle point light for highlights
        const pointLight = new THREE.PointLight(0x64ffda, 1, 10);
        pointLight.position.set(0, 2, 2);
        this.scene.add(pointLight);
        
        // Create particle system for effects
        this.createParticleSystem();
        
        // Initialize scene subjects
        this.createSceneSubjects();
    }
    
    createParticleSystem() {
        // Create a particle system for interactive effects
        const particleCount = 500;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const lifeTimes = new Float32Array(particleCount);
        
        // Initialize particles as inactive
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = 0;
            positions[i3 + 1] = 0;
            positions[i3 + 2] = 0;
            
            colors[i3] = 1.0;     // R
            colors[i3 + 1] = 1.0; // G
            colors[i3 + 2] = 1.0; // B
            
            sizes[i] = 0.1;
            lifeTimes[i] = 0; // Inactive
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Custom shader material for particles
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: new THREE.TextureLoader().load('/textures/particles/1.png') }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                    if (gl_FragColor.a < 0.1) discard;
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particleSystem);
        
        // Store references for animation
        this.particlePositions = positions;
        this.particleColors = colors;
        this.particleSizes = sizes;
        this.particleLifeTimes = lifeTimes;
        this.activeParticles = 0;
    }
    
    createSceneSubjects() {
        // Environment (stars, background, etc.)
        const environmentSubject = new EnvironmentSubject(this.scene);
        this.subjects.push(environmentSubject);
        
        // Projects section with 3D models
        const projectsSubject = new ProjectsSubject(this.scene);
        this.subjects.push(projectsSubject);
        
        // Skills section with 3D visualization
        const skillsSubject = new SkillsSubject(this.scene);
        this.subjects.push(skillsSubject);
    }
    
    setupEventListeners() {
        // Mouse move for hover effects
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Click for interaction
        window.addEventListener('click', (event) => {
            // Emit particles at click position
            this.emitParticles(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                20, // Number of particles
                0x64ffda // Color
            );
            
            // Handle object interaction
            this.handleClick();
        });
        
        // Keyboard navigation for 3D scene
        window.addEventListener('keydown', (event) => {
            // Only handle these keys when Alt is pressed to avoid conflicts with page navigation
            if (event.altKey) {
                event.preventDefault(); // Prevent default browser behavior
                this.updateKeyboardNavigation(event.key);
                
                // Toggle wireframe mode with Alt+W
                if (event.key === 'w' || event.key === 'W') {
                    this.toggleWireframe(true);
                }
                
                // Set scene complexity with Alt+1, Alt+2, Alt+3
                if (event.key === '1') this.setSceneComplexity('low');
                if (event.key === '2') this.setSceneComplexity('medium');
                if (event.key === '3') this.setSceneComplexity('high');
            }
        });
        
        // Reset wireframe mode on key up
        window.addEventListener('keyup', (event) => {
            if ((event.key === 'w' || event.key === 'W') && event.altKey) {
                this.toggleWireframe(false);
            }
        });
        
        // Add accessibility description to canvas
        this.canvas.setAttribute('aria-label', this.getSceneDescription());
        this.canvas.setAttribute('role', 'img');
        
        // Create a hidden button for screen readers to get scene description
        const descriptionButton = document.createElement('button');
        descriptionButton.textContent = 'Get 3D scene description';
        descriptionButton.className = 'sr-only';
        descriptionButton.addEventListener('click', () => {
            const description = this.getSceneDescription();
            
            // Create an aria-live region to announce the description
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = description;
            document.body.appendChild(announcement);
            
            // Remove after announcement
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 5000);
        });
        
        // Add the button after the canvas
        this.canvas.parentNode.insertBefore(descriptionButton, this.canvas.nextSibling);
    }
    
    handleClick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Get all interactive objects from subjects
        const interactiveObjects = this.subjects
            .filter(subject => subject.getInteractiveObjects)
            .flatMap(subject => subject.getInteractiveObjects());
        
        const intersects = this.raycaster.intersectObjects(interactiveObjects, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            
            // Create ripple effect at intersection point
            const point = intersects[0].point;
            this.createRippleEffect(point);
            
            // Find the subject that owns this object and call its interaction method
            for (const subject of this.subjects) {
                if (subject.handleInteraction && subject.getInteractiveObjects) {
                    const subjectObjects = subject.getInteractiveObjects();
                    
                    // Check if the object or its parent is in the subject's objects
                    let currentObj = object;
                    let found = false;
                    
                    while (currentObj) {
                        if (subjectObjects.includes(currentObj)) {
                            found = true;
                            subject.handleInteraction(currentObj);
                            break;
                        }
                        currentObj = currentObj.parent;
                    }
                    
                    if (found) break;
                }
            }
        }
    }
    
    createRippleEffect(position) {
        // Create a ripple effect at the given position
        const rippleGeometry = new THREE.RingGeometry(0.1, 0.2, 32);
        const rippleMaterial = new THREE.MeshBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
        ripple.position.copy(position);
        
        // Orient the ripple to face the camera
        ripple.lookAt(this.camera.position);
        
        this.scene.add(ripple);
        
        // Animate the ripple
        gsap.to(ripple.scale, {
            x: 5,
            y: 5,
            z: 5,
            duration: 1,
            ease: 'power2.out'
        });
        
        gsap.to(rippleMaterial, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                this.scene.remove(ripple);
                rippleGeometry.dispose();
                rippleMaterial.dispose();
            }
        });
    }
    
    emitParticles(x, y, count, color) {
        // Convert normalized coordinates to world space
        this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
        const direction = this.raycaster.ray.direction.clone();
        
        // Calculate a position in front of the camera
        const emitPosition = this.camera.position.clone().add(
            direction.multiplyScalar(3)
        );
        
        // Convert color to RGB components
        const r = ((color >> 16) & 255) / 255;
        const g = ((color >> 8) & 255) / 255;
        const b = (color & 255) / 255;
        
        // Activate particles
        for (let i = 0; i < count; i++) {
            if (this.activeParticles >= this.particleLifeTimes.length) break;
            
            const index = this.activeParticles++;
            const i3 = index * 3;
            
            // Set position
            this.particlePositions[i3] = emitPosition.x + (Math.random() - 0.5) * 0.5;
            this.particlePositions[i3 + 1] = emitPosition.y + (Math.random() - 0.5) * 0.5;
            this.particlePositions[i3 + 2] = emitPosition.z + (Math.random() - 0.5) * 0.5;
            
            // Set color
            this.particleColors[i3] = r;
            this.particleColors[i3 + 1] = g;
            this.particleColors[i3 + 2] = b;
            
            // Set size
            this.particleSizes[index] = Math.random() * 0.2 + 0.1;
            
            // Set lifetime (in seconds)
            this.particleLifeTimes[index] = 2.0;
        }
        
        // Update attributes
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.color.needsUpdate = true;
        this.particleSystem.geometry.attributes.size.needsUpdate = true;
    }
    
    triggerParticleEffect(type) {
        // Different particle effects based on type
        switch (type) {
            case 'cta':
                // Emit particles around the camera
                for (let i = 0; i < 5; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);
                    this.emitParticles(x * 0.5, y * 0.5, 5, 0x64ffda);
                }
                break;
                
            case 'skill':
                // Emit particles in a circle
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = Math.cos(angle);
                    const y = Math.sin(angle);
                    this.emitParticles(x * 0.3, y * 0.3, 3, 0xff61f6);
                }
                break;
                
            default:
                // Default particle burst
                this.emitParticles(0, 0, 20, 0xffffff);
        }
    }
    
    triggerGlowEffect(type) {
        // Find the environment subject
        const environmentSubject = this.subjects.find(subject => subject instanceof EnvironmentSubject);
        if (!environmentSubject) return;
        
        // Trigger a glow effect in the environment
        if (environmentSubject.triggerGlow) {
            environmentSubject.triggerGlow(type);
        }
    }
    
    highlightSkill(skillName) {
        // Find the skills subject
        const skillsSubject = this.subjects.find(subject => subject instanceof SkillsSubject);
        if (!skillsSubject) return;
        
        // Highlight the skill in the 3D visualization
        if (skillsSubject.highlightSkill) {
            skillsSubject.highlightSkill(skillName);
        }
        
        // Trigger particle effect
        this.triggerParticleEffect('skill');
    }
    
    focusOnProject(projectId) {
        // Find the projects subject
        const projectsSubject = this.subjects.find(subject => subject instanceof ProjectsSubject);
        if (!projectsSubject) return;
        
        // Focus on the project in the 3D visualization
        if (projectsSubject.focusOnProject) {
            projectsSubject.focusOnProject(projectId);
        }
    }
    
    updateMousePosition(x, y) {
        // Store normalized mouse position for use in animations
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }
    
    startAnimations() {
        // Start any initial animations
        this.subjects.forEach(subject => {
            if (subject.startAnimations) {
                subject.startAnimations();
            }
        });
        
        // Disable auto-rotation after a delay
        setTimeout(() => {
            this.controls.autoRotate = false;
        }, 10000);
    }
    
    focusOnSection(sectionIndex, animate = false) {
        // Camera positions for different sections
        const cameraPositions = [
            { x: 0, y: 1.5, z: 4 },      // About section
            { x: 0, y: 1, z: 6 },         // Experience section
            { x: 3, y: 1, z: 3 },         // Skills section
            { x: -3, y: 1, z: 3 },        // Projects section
            { x: 0, y: 0, z: 5 }          // Contact section
        ];
        
        // Camera look-at positions
        const lookAtPositions = [
            { x: 0, y: 0, z: 0 },         // About section
            { x: 0, y: 0, z: 0 },         // Experience section
            { x: 2, y: 0, z: 0 },         // Skills section
            { x: -2, y: 0, z: 0 },        // Projects section
            { x: 0, y: 0, z: 0 }          // Contact section
        ];
        
        // Section IDs mapped to indices
        const sectionIds = ['about', 'experience', 'skills', 'projects', 'contact'];
        
        // Disable auto-rotation when focusing on a section
        this.controls.autoRotate = false;
        
        // Set the appropriate background for the current section
        // Find the environment subject and update its background
        const environmentSubject = this.subjects.find(subject => subject instanceof EnvironmentSubject);
        if (environmentSubject && sectionIndex < sectionIds.length) {
            // If we're animating between sections, use transition effect
            if (animate && this.currentSection !== sectionIds[sectionIndex]) {
                this.transitionInProgress = true;
                
                // Trigger transition effect
                environmentSubject.transitionBackground(this.currentSection, sectionIds[sectionIndex]);
                
                // Update current section
                this.currentSection = sectionIds[sectionIndex];
                
                // End transition after animation completes
                setTimeout(() => {
                    this.transitionInProgress = false;
                }, 1000);
            } else {
                environmentSubject.setActiveBackground(sectionIds[sectionIndex]);
                this.currentSection = sectionIds[sectionIndex];
            }
        }
        
        // Animate camera position
        if (sectionIndex < cameraPositions.length) {
            const position = cameraPositions[sectionIndex];
            const lookAt = lookAtPositions[sectionIndex];
            
            // If animating, use a more dramatic camera movement
            if (animate) {
                // First move out slightly
                gsap.to(this.camera.position, {
                    x: this.camera.position.x * 1.2,
                    y: this.camera.position.y * 1.2,
                    z: this.camera.position.z * 1.2,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // Then move to the new position
                        gsap.to(this.camera.position, {
                            x: position.x,
                            y: position.y,
                            z: position.z,
                            duration: 1.5,
                            ease: 'power2.inOut'
                        });
                    }
                });
                
                // Animate the look-at target
                gsap.to(this.controls.target, {
                    x: lookAt.x,
                    y: lookAt.y,
                    z: lookAt.z,
                    duration: 2,
                    ease: 'power2.inOut'
                });
            } else {
                // Simple camera movement
                gsap.to(this.camera.position, {
                    x: position.x,
                    y: position.y,
                    z: position.z,
                    duration: 2,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        // Update camera target during animation
                        this.controls.target.set(lookAt.x, lookAt.y, lookAt.z);
                    }
                });
            }
        }
    }
    
    onWindowResize() {
        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    updateParticles(deltaTime) {
        if (this.activeParticles === 0) return;
        
        const positions = this.particlePositions;
        const colors = this.particleColors;
        const sizes = this.particleSizes;
        const lifeTimes = this.particleLifeTimes;
        
        let activeCount = 0;
        
        // Update each active particle
        for (let i = 0; i < this.particleLifeTimes.length; i++) {
            if (lifeTimes[i] <= 0) continue;
            
            // Decrease lifetime
            lifeTimes[i] -= deltaTime;
            
            if (lifeTimes[i] > 0) {
                const i3 = i * 3;
                
                // Move particle
                positions[i3] += (Math.random() - 0.5) * 0.1;
                positions[i3 + 1] += (Math.random() - 0.5) * 0.1;
                positions[i3 + 2] += (Math.random() - 0.5) * 0.1;
                
                // Fade out color and size based on remaining lifetime
                const lifeRatio = lifeTimes[i] / 2.0; // 2.0 is the initial lifetime
                sizes[i] = Math.max(0.05, sizes[i] * 0.99);
                colors[i3 + 3] = lifeRatio; // Alpha
                
                activeCount++;
            }
        }
        
        // Update the active count
        this.activeParticles = activeCount;
        
        // Update the geometry attributes
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.color.needsUpdate = true;
        this.particleSystem.geometry.attributes.size.needsUpdate = true;
    }
    
    update() {
        // Update controls
        this.controls.update();
        
        // Update all subjects
        const elapsedTime = this.clock.getElapsedTime();
        const deltaTime = this.clock.getDelta();
        
        // Update particle system
        this.updateParticles(deltaTime);
        
        // Apply subtle camera movement based on mouse position if not in transition
        if (!this.transitionInProgress) {
            this.camera.position.x += (this.mousePosition.x * 0.5 - this.camera.position.x) * 0.01;
            this.camera.position.y += (this.mousePosition.y * 0.5 - this.camera.position.y) * 0.01;
        }
        
        for (const subject of this.subjects) {
            if (subject.update) {
                subject.update(elapsedTime, deltaTime);
            }
        }
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    animate() {
        this.update();
        this.render();
        window.requestAnimationFrame(() => this.animate());
    }
    
    updateKeyboardNavigation(key) {
        // Handle keyboard navigation for 3D scene
        switch (key) {
            case 'ArrowUp':
                // Move camera up
                this.camera.position.y += 0.5;
                break;
            case 'ArrowDown':
                // Move camera down
                this.camera.position.y -= 0.5;
                break;
            case 'ArrowLeft':
                // Rotate camera left
                this.camera.position.x -= 0.5;
                break;
            case 'ArrowRight':
                // Rotate camera right
                this.camera.position.x += 0.5;
                break;
            case '+':
            case '=':
                // Zoom in
                this.camera.position.z -= 0.5;
                break;
            case '-':
            case '_':
                // Zoom out
                this.camera.position.z += 0.5;
                break;
            case 'r':
            case 'R':
                // Reset camera position
                this.resetCameraPosition();
                break;
        }
        
        // Update controls target
        this.controls.update();
    }
    
    resetCameraPosition() {
        // Reset camera to default position
        gsap.to(this.camera.position, {
            x: 0,
            y: 1.5,
            z: 4,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        // Reset controls target
        gsap.to(this.controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: 'power2.inOut'
        });
    }
    
    setSceneComplexity(level) {
        // Adjust scene complexity based on performance needs
        // level: 'high', 'medium', 'low'
        
        // Store current complexity level
        this.complexityLevel = level;
        
        // Adjust particle count
        if (this.particleSystem) {
            const visibleParticles = {
                'high': this.particleLifeTimes.length,
                'medium': Math.floor(this.particleLifeTimes.length * 0.6),
                'low': Math.floor(this.particleLifeTimes.length * 0.3)
            }[level];
            
            // Hide excess particles by setting their size to 0
            for (let i = 0; i < this.particleSizes.length; i++) {
                if (i < visibleParticles) {
                    // Keep original size
                    this.particleSizes[i] = Math.random() * 0.2 + 0.1;
                } else {
                    // Hide particle
                    this.particleSizes[i] = 0;
                }
            }
            
            // Update geometry
            this.particleSystem.geometry.attributes.size.needsUpdate = true;
        }
        
        // Adjust renderer quality
        switch (level) {
            case 'high':
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                break;
            case 'medium':
                this.renderer.setPixelRatio(1);
                break;
            case 'low':
                this.renderer.setPixelRatio(0.75);
                break;
        }
        
        // Notify subjects about complexity change
        for (const subject of this.subjects) {
            if (subject.setComplexity) {
                subject.setComplexity(level);
            }
        }
        
        console.log(`Scene complexity set to: ${level}`);
    }
    
    toggleWireframe(enabled) {
        // Toggle wireframe mode for all objects in the scene
        this.scene.traverse((object) => {
            if (object.isMesh && object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => {
                        material.wireframe = enabled;
                    });
                } else {
                    object.material.wireframe = enabled;
                }
            }
        });
        
        console.log(`Wireframe mode: ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    getSceneDescription() {
        // Generate a text description of the current scene for accessibility
        let description = "3D interactive scene with ";
        
        // Count objects by type
        let meshCount = 0;
        let lightCount = 0;
        let particleCount = 0;
        
        this.scene.traverse((object) => {
            if (object.isMesh) meshCount++;
            if (object.isLight) lightCount++;
            if (object.isPoints) particleCount++;
        });
        
        description += `${meshCount} 3D objects, ${lightCount} light sources, and `;
        description += `${particleCount} particle systems. `;
        description += `Current section: ${this.currentSection}. `;
        
        // Add navigation instructions
        description += "Use arrow keys to navigate the 3D scene. ";
        description += "Press R to reset camera position. ";
        description += "Press + or - to zoom in or out.";
        
        return description;
    }
} 