import * as THREE from 'three';
import { gsap } from 'gsap';

export default class SkillsSubject {
    constructor(scene) {
        this.scene = scene;
        this.interactiveObjects = [];
        this.skillGroups = {};
        
        this.init();
    }
    
    init() {
        // Create skills visualization
        this.createSkillsVisualization();
    }
    
    createSkillsVisualization() {
        // Create a 3D visualization of skills
        // We'll create a circular arrangement of skill nodes
        
        // Define skills with categories
        const skills = [
            // Frontend skills
            { name: 'JavaScript', category: 'frontend', level: 0.95, color: 0xf1e05a },
            { name: 'React.js', category: 'frontend', level: 0.9, color: 0x61dafb },
            { name: 'Three.js', category: 'frontend', level: 0.85, color: 0x049EF4 },
            { name: 'HTML/CSS', category: 'frontend', level: 0.9, color: 0xe34c26 },
            
            // Backend skills
            { name: 'Node.js', category: 'backend', level: 0.85, color: 0x68a063 },
            { name: 'Python', category: 'backend', level: 0.8, color: 0x3572A5 },
            { name: 'MongoDB', category: 'backend', level: 0.75, color: 0x4DB33D },
            { name: 'SQL', category: 'backend', level: 0.8, color: 0x336791 },
            
            // Tools & Others
            { name: 'Git', category: 'tools', level: 0.9, color: 0xf34f29 },
            { name: 'Docker', category: 'tools', level: 0.75, color: 0x0db7ed },
            { name: 'AWS', category: 'tools', level: 0.7, color: 0xFF9900 },
            { name: 'UI/UX', category: 'tools', level: 0.8, color: 0xFF61F6 }
        ];
        
        // Create a group for all skills
        this.skillsGroup = new THREE.Group();
        this.skillsGroup.position.set(3, 0, 0);
        this.scene.add(this.skillsGroup);
        
        // Create category groups
        this.skillGroups.frontend = new THREE.Group();
        this.skillGroups.backend = new THREE.Group();
        this.skillGroups.tools = new THREE.Group();
        
        // Position category groups in a triangular formation
        this.skillGroups.frontend.position.set(0, 1.5, 0);
        this.skillGroups.backend.position.set(-1.5, -1, 0);
        this.skillGroups.tools.position.set(1.5, -1, 0);
        
        // Add category groups to main group
        Object.values(this.skillGroups).forEach(group => {
            this.skillsGroup.add(group);
        });
        
        // Create skill nodes
        skills.forEach((skill, index) => {
            // Create a sphere for each skill
            const size = 0.2 + skill.level * 0.2; // Size based on skill level
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: skill.color,
                metalness: 0.3,
                roughness: 0.4,
                emissive: skill.color,
                emissiveIntensity: 0.2
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Store skill data in userData
            mesh.userData.name = skill.name;
            mesh.userData.level = skill.level;
            mesh.userData.category = skill.category;
            
            // Position within category group
            const categoryGroup = this.skillGroups[skill.category];
            const skillsInCategory = skills.filter(s => s.category === skill.category).length;
            const angleStep = (2 * Math.PI) / skillsInCategory;
            const categoryIndex = skills.filter(s => s.category === skill.category).findIndex(s => s.name === skill.name);
            const angle = categoryIndex * angleStep;
            const radius = 1.2;
            
            mesh.position.x = Math.cos(angle) * radius;
            mesh.position.z = Math.sin(angle) * radius;
            
            // Add to category group
            categoryGroup.add(mesh);
            
            // Add to interactive objects
            this.interactiveObjects.push(mesh);
            
            // Add a text label (simulated with a small plane)
            this.createSkillLabel(mesh, skill.name, categoryGroup);
        });
        
        // Add connecting lines between skill groups
        this.createConnectingLines();
    }
    
    createSkillLabel(skillMesh, skillName, parentGroup) {
        // In a real implementation, you would use TextGeometry or HTML elements
        // For simplicity, we'll use a small plane as a placeholder
        const labelGeometry = new THREE.PlaneGeometry(0.5, 0.15);
        const labelMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.copy(skillMesh.position);
        label.position.y -= 0.3;
        label.rotation.x = Math.PI / 2;
        
        parentGroup.add(label);
    }
    
    createConnectingLines() {
        // Create lines connecting the skill categories
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.3
        });
        
        // Get the world positions of the category groups
        const frontendPos = new THREE.Vector3();
        const backendPos = new THREE.Vector3();
        const toolsPos = new THREE.Vector3();
        
        this.skillGroups.frontend.getWorldPosition(frontendPos);
        this.skillGroups.backend.getWorldPosition(backendPos);
        this.skillGroups.tools.getWorldPosition(toolsPos);
        
        // Create lines between categories
        const lines = [
            [frontendPos, backendPos],
            [backendPos, toolsPos],
            [toolsPos, frontendPos]
        ];
        
        lines.forEach(([start, end]) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
            const line = new THREE.Line(geometry, lineMaterial);
            this.skillsGroup.add(line);
        });
    }
    
    getInteractiveObjects() {
        return this.interactiveObjects;
    }
    
    handleInteraction(object) {
        // When a skill is clicked, show information about it
        if (object.userData.name) {
            // Highlight the selected skill
            gsap.to(object.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 0.3,
                ease: 'back.out',
                onComplete: () => {
                    // Return to normal size
                    gsap.to(object.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.5,
                        delay: 1,
                        ease: 'power2.out'
                    });
                }
            });
            
            // Emit an event with skill information
            const event = new CustomEvent('skillSelected', {
                detail: {
                    name: object.userData.name,
                    level: object.userData.level,
                    category: object.userData.category
                }
            });
            window.dispatchEvent(event);
            
            // Show skill details in the DOM
            this.showSkillDetails(object.userData);
        }
    }
    
    showSkillDetails(skillData) {
        // Find all project detail elements and hide them
        const projectDetails = document.querySelectorAll('.project-details');
        projectDetails.forEach(el => el.classList.remove('active'));
        
        // Format the skill level as a percentage
        const skillLevel = Math.round(skillData.level * 100);
        
        // Create a description based on the skill
        let description = '';
        switch(skillData.name) {
            case 'JavaScript':
                description = 'Expert in modern JavaScript (ES6+) with extensive experience in building complex web applications.';
                break;
            case 'React.js':
                description = 'Proficient in building scalable applications with React, Redux, and related ecosystem tools.';
                break;
            case 'Three.js':
                description = 'Experienced in creating interactive 3D visualizations and immersive web experiences.';
                break;
            case 'HTML/CSS':
                description = 'Strong foundation in semantic HTML and advanced CSS techniques including animations and responsive design.';
                break;
            case 'Node.js':
                description = 'Built robust backend services and RESTful APIs using Express and other Node.js frameworks.';
                break;
            case 'Python':
                description = 'Used for data analysis, automation scripts, and backend development with Django/Flask.';
                break;
            case 'MongoDB':
                description = 'Designed and implemented NoSQL database solutions for various web applications.';
                break;
            case 'SQL':
                description = 'Experience with relational database design, optimization, and complex queries.';
                break;
            case 'Git':
                description = 'Advanced version control workflows including branching strategies and collaborative development.';
                break;
            case 'Docker':
                description = 'Containerization of applications for consistent development and deployment environments.';
                break;
            case 'AWS':
                description = 'Deployed and managed applications using various AWS services including EC2, S3, and Lambda.';
                break;
            case 'UI/UX':
                description = 'Designed intuitive user interfaces with a focus on user experience and accessibility.';
                break;
            default:
                description = `Experienced with ${skillData.name} in various projects.`;
        }
        
        // Log skill info (in a real app, you'd update the DOM)
        console.log(`Skill: ${skillData.name}`);
        console.log(`Level: ${skillLevel}%`);
        console.log(`Category: ${skillData.category}`);
        console.log(`Description: ${description}`);
    }
    
    startAnimations() {
        // Rotate each category group
        Object.entries(this.skillGroups).forEach(([category, group], index) => {
            // Rotate at different speeds and directions
            const duration = 30 + index * 5;
            const direction = index % 2 === 0 ? 1 : -1;
            
            gsap.to(group.rotation, {
                y: direction * Math.PI * 2,
                duration: duration,
                repeat: -1,
                ease: 'none'
            });
        });
        
        // Rotate the entire skills group slowly
        gsap.to(this.skillsGroup.rotation, {
            y: Math.PI * 2,
            duration: 60,
            repeat: -1,
            ease: 'none'
        });
    }
    
    update(time) {
        // Pulse effect for skill nodes
        if (this.interactiveObjects.length > 0) {
            this.interactiveObjects.forEach((object, index) => {
                // Subtle pulsing effect
                const pulseScale = 1 + Math.sin(time * 2 + index * 0.5) * 0.05;
                object.scale.set(pulseScale, pulseScale, pulseScale);
            });
        }
    }
} 