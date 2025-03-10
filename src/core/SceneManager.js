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
        
        // Initialize scene subjects
        this.createSceneSubjects();
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
        window.addEventListener('click', () => this.handleClick());
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
    
    focusOnSection(sectionIndex) {
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
        
        // Disable auto-rotation when focusing on a section
        this.controls.autoRotate = false;
        
        // Animate camera position
        if (sectionIndex < cameraPositions.length) {
            const position = cameraPositions[sectionIndex];
            const lookAt = lookAtPositions[sectionIndex];
            
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
    
    onWindowResize() {
        // Update camera aspect ratio
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer size
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    update() {
        // Update controls
        this.controls.update();
        
        // Update all subjects
        const elapsedTime = this.clock.getElapsedTime();
        for (const subject of this.subjects) {
            if (subject.update) {
                subject.update(elapsedTime);
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
} 