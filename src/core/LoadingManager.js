import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default class LoadingManager {
    constructor(loadingBarElement, onComplete) {
        this.loadingBarElement = loadingBarElement;
        this.onComplete = onComplete;
        
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
        // Load textures
        this.loadTextures();
        
        // Load 3D models
        this.loadModels();
    }
    
    loadTextures() {
        // Store loaded textures in a map for easy access
        this.textures = {};
        
        // Load environment map
        this.textures.environmentMap = this.textureLoader.load('/textures/environmentMap.jpg');
        this.textures.environmentMap.encoding = THREE.sRGBEncoding;
        
        // Load other textures as needed
        this.textures.particleTexture = this.textureLoader.load('/textures/particles/1.png');
    }
    
    loadModels() {
        // Store loaded models in a map for easy access
        this.models = {};
        
        // Load project models
        // Note: These will be placeholder paths until actual models are created
        this.gltfLoader.load(
            '/models/project1.glb',
            (gltf) => {
                this.models.project1 = gltf.scene;
            }
        );
        
        this.gltfLoader.load(
            '/models/project2.glb',
            (gltf) => {
                this.models.project2 = gltf.scene;
            }
        );
        
        this.gltfLoader.load(
            '/models/project3.glb',
            (gltf) => {
                this.models.project3 = gltf.scene;
            }
        );
        
        // Load skill models or icons
        this.gltfLoader.load(
            '/models/skills.glb',
            (gltf) => {
                this.models.skills = gltf.scene;
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