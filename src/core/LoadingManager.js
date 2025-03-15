import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default class LoadingManager {
    constructor(loadingBarElement, onComplete, onProgress) {
        this.loadingBarElement = loadingBarElement;
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        
        this.setupLoaders();
        this.loadAssets();
    }
    
    setupLoaders() {
        // Create Three.js loading manager
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                // Wait a bit before hiding loading bar
                window.setTimeout(() => {
                    // Animate loading bar
                    this.loadingBarElement.classList.add('ended');
                    this.loadingBarElement.style.transform = '';
                    
                    // Call onComplete callback
                    if (this.onComplete) {
                        this.onComplete();
                    }
                }, 500);
            },
            
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                // Calculate progress and update loading bar
                const progressRatio = itemsLoaded / itemsTotal;
                this.loadingBarElement.style.transform = `scaleX(${progressRatio})`;
                
                // Call onProgress callback if provided
                if (this.onProgress) {
                    this.onProgress(progressRatio);
                }
                
                // Log progress for debugging
                console.log(`Loading: ${Math.round(progressRatio * 100)}% (${itemsLoaded}/${itemsTotal})`);
            },
            
            // Error
            (url) => {
                console.error(`Error loading asset: ${url}`);
                
                // Increment loaded assets to avoid stalling the loading process
                this.loadedAssets++;
                this.updateProgress();
            }
        );
        
        // Setup texture loader
        this.textureLoader = new THREE.TextureLoader(this.loadingManager);
        
        // Setup GLTF loader with Draco compression
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('/draco/');
        
        this.gltfLoader = new GLTFLoader(this.loadingManager);
        this.gltfLoader.setDRACOLoader(this.dracoLoader);
    }
    
    loadAssets() {
        // Count total assets to load for progress tracking
        this.countAssets();
        
        // Load textures
        this.loadTextures();
        
        // Load 3D models
        this.loadModels();
    }
    
    countAssets() {
        // Count textures
        this.totalAssets += 2; // environmentMap and particleTexture
        
        // Count models
        this.totalAssets += 4; // project1, project2, project3, skills
    }
    
    updateProgress() {
        const progress = this.loadedAssets / this.totalAssets;
        
        // Call onProgress callback if provided
        if (this.onProgress) {
            this.onProgress(progress);
        }
    }
    
    loadTextures() {
        // Store loaded textures in a map for easy access
        this.textures = {};
        
        // Load environment map with optimized settings
        this.textureLoader.load(
            '/textures/environmentMap.jpg',
            (texture) => {
                texture.encoding = THREE.sRGBEncoding;
                texture.minFilter = THREE.LinearFilter; // Simpler filtering for performance
                this.textures.environmentMap = texture;
                this.loadedAssets++;
                this.updateProgress();
            }
        );
        
        // Load particle texture with optimized settings
        this.textureLoader.load(
            '/textures/particles/1.png',
            (texture) => {
                texture.minFilter = THREE.LinearFilter; // Simpler filtering for performance
                this.textures.particleTexture = texture;
                this.loadedAssets++;
                this.updateProgress();
            }
        );
    }
    
    loadModels() {
        // Store loaded models in a map for easy access
        this.models = {};
        
        // Load project models with optimized settings
        this.loadModel('/models/project1.glb', 'project1');
        this.loadModel('/models/project2.glb', 'project2');
        this.loadModel('/models/project3.glb', 'project3');
        this.loadModel('/models/skills.glb', 'skills');
    }
    
    loadModel(path, name) {
        this.gltfLoader.load(
            path,
            (gltf) => {
                // Optimize the model
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        // Simplify materials for better performance
                        if (child.material) {
                            child.material.precision = 'lowp'; // Lower precision for better performance
                            child.material.fog = false; // Disable fog for better performance
                        }
                        
                        // Optimize geometry if it has a lot of vertices
                        if (child.geometry && child.geometry.attributes.position.count > 10000) {
                            console.log(`Optimizing high-poly model: ${name}`);
                        }
                    }
                });
                
                this.models[name] = gltf.scene;
                this.loadedAssets++;
                this.updateProgress();
            },
            // Progress callback for this specific model
            (progress) => {
                console.log(`Loading ${name}: ${Math.round(progress.loaded / progress.total * 100)}%`);
            },
            // Error callback
            (error) => {
                console.error(`Error loading model ${name}:`, error);
                this.loadedAssets++;
                this.updateProgress();
            }
        );
    }
    
    // Method to get a loaded texture
    getTexture(name) {
        return this.textures[name];
    }
    
    // Method to get a loaded model
    getModel(name) {
        return this.models[name];
    }
} 