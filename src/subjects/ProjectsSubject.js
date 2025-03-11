import * as THREE from 'three';
import { gsap } from 'gsap';

export default class ProjectsSubject {
    constructor(scene) {
        this.scene = scene;
        this.interactiveObjects = [];
        this.projectInfoPanels = {};
        
        this.init();
    }
    
    init() {
        // Create project models
        this.createProjectModels();
        
        // Create info panels for projects
        this.createInfoPanels();
    }
    
    createProjectModels() {
        // Since we don't have actual models yet, we'll create custom geometries
        // In a real project, you would load models using GLTFLoader
        
        // Project 1: Interactive Data Visualization
        const project1Geometry = new THREE.IcosahedronGeometry(0.8, 1);
        const project1Material = new THREE.MeshStandardMaterial({
            color: 0x2194ce,
            metalness: 0.3,
            roughness: 0.4,
            wireframe: true
        });
        this.project1 = new THREE.Mesh(project1Geometry, project1Material);
        this.project1.position.set(-3, 0, 0);
        this.project1.userData.id = 'project1';
        this.project1.userData.title = 'Interactive Data Visualisation';
        this.project1.userData.description = 'A web application that transforms complex datasets into interactive 3D visualisations.';
        this.project1.userData.technologies = 'Three.js, D3.js, React, Node.js';
        this.scene.add(this.project1);
        this.interactiveObjects.push(this.project1);
        
        // Add particles inside the wireframe for a data visualization effect
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 50;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 1.2;
            positions[i3 + 1] = (Math.random() - 0.5) * 1.2;
            positions[i3 + 2] = (Math.random() - 0.5) * 1.2;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            sizeAttenuation: true
        });
        
        this.project1Particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.project1.add(this.project1Particles);
        
        // Project 2: E-Commerce Platform
        const project2Geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
        const project2Material = new THREE.MeshStandardMaterial({
            color: 0xff6b6b,
            metalness: 0.5,
            roughness: 0.3,
        });
        this.project2 = new THREE.Mesh(project2Geometry, project2Material);
        this.project2.position.set(-1, 0, 0);
        this.project2.userData.id = 'project2';
        this.project2.userData.title = 'E-Commerce Platform';
        this.project2.userData.description = 'A full-featured online shopping platform with real-time inventory management.';
        this.project2.userData.technologies = 'React, Redux, Express, MongoDB';
        this.scene.add(this.project2);
        this.interactiveObjects.push(this.project2);
        
        // Project 3: AR Mobile Application
        // Create a more complex shape for the AR project
        const project3Group = new THREE.Group();
        project3Group.position.set(-5, 0, 0);
        
        // Base shape - a cylinder for the phone
        const phoneGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32, 1, true);
        const phoneMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.2,
            side: THREE.DoubleSide
        });
        const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
        phone.rotation.x = Math.PI / 2;
        project3Group.add(phone);
        
        // Screen
        const screenGeometry = new THREE.PlaneGeometry(0.6, 0.6);
        const screenMaterial = new THREE.MeshStandardMaterial({
            color: 0x64ffda,
            emissive: 0x64ffda,
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.01;
        screen.rotation.x = Math.PI / 2;
        project3Group.add(screen);
        
        // AR elements floating above the screen
        const arElementGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const arElementMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.5
        });
        
        for (let i = 0; i < 5; i++) {
            const arElement = new THREE.Mesh(arElementGeometry, arElementMaterial);
            arElement.position.set(
                (Math.random() - 0.5) * 0.4,
                0.3 + Math.random() * 0.3,
                (Math.random() - 0.5) * 0.4
            );
            project3Group.add(arElement);
        }
        
        this.project3 = project3Group;
        this.project3.userData.id = 'project3';
        this.project3.userData.title = 'AR Mobile Application';
        this.project3.userData.description = 'An augmented reality app that enhances user experience through interactive 3D elements.';
        this.project3.userData.technologies = 'Unity, ARKit, C#, Firebase';
        this.scene.add(this.project3);
        this.interactiveObjects.push(this.project3);
    }
    
    createInfoPanels() {
        // In a real implementation, we'll use DOM elements instead of 3D text
        // The actual display of project info will be handled by event listeners in main.js
    }
    
    getInteractiveObjects() {
        return this.interactiveObjects;
    }
    
    handleInteraction(object) {
        const projectId = object.userData.id;
        
        if (projectId) {
            // Animate the project
            if (projectId === 'project1') {
                // Rotate the data visualization project
                gsap.to(object.rotation, {
                    x: object.rotation.x + Math.PI,
                    y: object.rotation.y + Math.PI,
                    duration: 1.5,
                    ease: 'power2.inOut'
                });
                
                // Scale up the particles
                gsap.to(this.project1Particles.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    duration: 0.8,
                    ease: 'back.out',
                    yoyo: true,
                    repeat: 1
                });
            } else if (projectId === 'project2') {
                // Spin the e-commerce project
                gsap.to(object.rotation, {
                    y: object.rotation.y + Math.PI * 2,
                    duration: 1.5,
                    ease: 'power2.inOut'
                });
                
                // Pulse effect
                gsap.to(object.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 0.4,
                    ease: 'power1.inOut',
                    yoyo: true,
                    repeat: 1
                });
            } else if (projectId === 'project3') {
                // Float the AR project up
                gsap.to(object.position, {
                    y: object.position.y + 0.5,
                    duration: 0.8,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                });
                
                // Rotate slightly
                gsap.to(object.rotation, {
                    y: object.rotation.y + Math.PI / 2,
                    duration: 1.2,
                    ease: 'power1.inOut'
                });
            }
            
            // Show project info in the DOM by triggering a custom event
            const projectDetails = document.getElementById(`${projectId}-details`);
            if (projectDetails) {
                // Hide all project details first
                document.querySelectorAll('.project-details').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Show the selected project details
                projectDetails.classList.add('active');
            }
            
            // Create a DOM event to be handled by the main application
            const event = new CustomEvent('projectSelected', {
                detail: {
                    id: projectId,
                    title: object.userData.title,
                    description: object.userData.description,
                    technologies: object.userData.technologies
                }
            });
            window.dispatchEvent(event);
            
            console.log(`Project: ${object.userData.title}`);
            console.log(`Description: ${object.userData.description}`);
            console.log(`Technologies: ${object.userData.technologies}`);
        }
    }
    
    startAnimations() {
        // Animate projects with floating effect
        const animateProject = (project, delay) => {
            // Initial position
            const initialY = project.position.y;
            
            // Floating animation
            gsap.to(project.position, {
                y: initialY + 0.2,
                duration: 2,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            
            // Slow rotation
            gsap.to(project.rotation, {
                y: Math.PI * 2,
                duration: 15,
                repeat: -1,
                ease: 'none'
            });
            
            // For project 1, also animate the particles
            if (project === this.project1) {
                gsap.to(this.project1Particles.rotation, {
                    y: Math.PI * 2,
                    x: Math.PI * 2,
                    duration: 10,
                    repeat: -1,
                    ease: 'none'
                });
            }
        };
        
        // Start animations with different delays
        animateProject(this.project1, 0);
        animateProject(this.project2, 0.7);
        animateProject(this.project3, 0.3);
    }
    
    update(time) {
        // Additional updates for dynamic elements
        if (this.project1Particles) {
            // Make particles move slightly
            const positions = this.project1Particles.geometry.attributes.position.array;
            const count = positions.length / 3;
            
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                const z = positions[i3 + 2];
                
                // Apply subtle movement
                positions[i3] = x + Math.sin(time * 2 + i) * 0.002;
                positions[i3 + 1] = y + Math.cos(time * 2 + i) * 0.002;
                positions[i3 + 2] = z + Math.sin(time * 3 + i) * 0.002;
            }
            
            this.project1Particles.geometry.attributes.position.needsUpdate = true;
        }
    }
} 