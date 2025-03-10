import * as THREE from 'three';
import { gsap } from 'gsap';

export default class EnvironmentSubject {
    constructor(scene) {
        this.scene = scene;
        this.init();
    }
    
    init() {
        this.createStars();
        this.createParticles();
        this.createGrid();
        this.createAmbientElements();
    }
    
    createStars() {
        // Create a star field in the background
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1500;
        
        // Create positions for stars
        const positions = new Float32Array(starCount * 3);
        const scales = new Float32Array(starCount);
        const colors = new Float32Array(starCount * 3);
        
        const color1 = new THREE.Color(0x64ffda);
        const color2 = new THREE.Color(0xffffff);
        const color3 = new THREE.Color(0xff61f6);
        
        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            
            // Random positions far away from the center
            positions[i3] = (Math.random() - 0.5) * 150;
            positions[i3 + 1] = (Math.random() - 0.5) * 150;
            positions[i3 + 2] = (Math.random() - 0.5) * 150;
            
            // Random sizes
            scales[i] = Math.random();
            
            // Random colors between three options
            const colorChoice = Math.random();
            let color;
            
            if (colorChoice < 0.6) {
                color = color2; // White (most stars)
            } else if (colorChoice < 0.8) {
                color = color1; // Primary color
            } else {
                color = color3; // Accent color
            }
            
            color.toArray(colors, i3);
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Star material
        const starMaterial = new THREE.PointsMaterial({
            size: 0.15,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        // Create the star points
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }
    
    createParticles() {
        // Create floating particles for a more dynamic environment
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 300;
        
        // Create positions for particles
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);
        
        const color1 = new THREE.Color(0x64ffda);
        const color2 = new THREE.Color(0x0a192f);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions closer to the center
            positions[i3] = (Math.random() - 0.5) * 30;
            positions[i3 + 1] = (Math.random() - 0.5) * 30;
            positions[i3 + 2] = (Math.random() - 0.5) * 30;
            
            // Random sizes
            scales[i] = Math.random() * 0.5 + 0.5;
            
            // Gradient color based on position
            const mixRatio = (positions[i3 + 1] + 15) / 30; // -15 to 15 normalized to 0-1
            const particleColor = color1.clone().lerp(color2, mixRatio);
            particleColor.toArray(colors, i3);
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Particle material with custom shader for glowing effect
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: new THREE.TextureLoader().load('/textures/particles/1.png') },
                time: { value: 0.0 }
            },
            vertexShader: `
                attribute float scale;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // Add subtle wave movement
                    pos.y += sin(time * 0.5 + position.x * 0.5) * 0.5;
                    pos.x += cos(time * 0.3 + position.z * 0.5) * 0.3;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = scale * 3.0 * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        // Create the particle points
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }
    
    createGrid() {
        // Create a grid for the floor
        const gridSize = 20;
        const gridDivisions = 20;
        const gridColor = 0x64ffda;
        const gridOpacity = 0.15;
        
        const grid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
        grid.position.y = -5;
        grid.material.transparent = true;
        grid.material.opacity = gridOpacity;
        
        this.scene.add(grid);
        
        // Create a second grid for a more complex effect
        const grid2 = new THREE.GridHelper(gridSize * 2, gridDivisions / 2, gridColor, gridColor);
        grid2.position.y = -5;
        grid2.material.transparent = true;
        grid2.material.opacity = gridOpacity * 0.5;
        grid2.rotation.x = Math.PI / 6;
        
        this.scene.add(grid2);
    }
    
    createAmbientElements() {
        // Create some floating geometric elements for visual interest
        
        // Create a group for all ambient elements
        this.ambientGroup = new THREE.Group();
        this.scene.add(this.ambientGroup);
        
        // Create a few floating geometric shapes
        const shapes = [
            new THREE.TorusGeometry(2, 0.5, 16, 50),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TetrahedronGeometry(1.2, 0)
        ];
        
        const positions = [
            new THREE.Vector3(-10, 5, -15),
            new THREE.Vector3(15, -3, -12),
            new THREE.Vector3(8, 8, -20)
        ];
        
        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x64ffda, 
                wireframe: true,
                transparent: true,
                opacity: 0.3
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xff61f6, 
                wireframe: true,
                transparent: true,
                opacity: 0.2
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xffffff, 
                wireframe: true,
                transparent: true,
                opacity: 0.15
            })
        ];
        
        // Create each shape and add to the group
        shapes.forEach((geometry, i) => {
            const mesh = new THREE.Mesh(geometry, materials[i]);
            mesh.position.copy(positions[i]);
            this.ambientGroup.add(mesh);
            
            // Store initial position for animations
            mesh.userData.initialPosition = positions[i].clone();
        });
    }
    
    startAnimations() {
        // Animate particles with subtle movement
        gsap.to(this.particles.rotation, {
            y: Math.PI * 2,
            duration: 100,
            repeat: -1,
            ease: 'none'
        });
        
        // Animate ambient elements
        if (this.ambientGroup) {
            this.ambientGroup.children.forEach((mesh, index) => {
                // Floating animation
                gsap.to(mesh.position, {
                    y: mesh.userData.initialPosition.y + 2,
                    duration: 8 + index * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
                
                // Rotation animation
                gsap.to(mesh.rotation, {
                    x: Math.PI * 2,
                    y: Math.PI * 2,
                    duration: 30 + index * 10,
                    repeat: -1,
                    ease: 'none'
                });
            });
        }
    }
    
    update(time) {
        // Update time uniform for particle shader
        if (this.particles && this.particles.material.uniforms) {
            this.particles.material.uniforms.time.value = time;
        }
        
        // Rotate stars slowly
        if (this.stars) {
            this.stars.rotation.y = time * 0.03;
            this.stars.rotation.x = Math.sin(time * 0.01) * 0.1;
        }
        
        // Make particles move in a wave pattern
        if (this.particles) {
            this.particles.rotation.y = time * 0.05;
        }
    }
} 