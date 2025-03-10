import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SceneManager from './core/SceneManager.js';
import LoadingManager from './core/LoadingManager.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize the scene manager
const sceneManager = new SceneManager(document.querySelector('.webgl'));

// Initialize the loading manager
const loadingManager = new LoadingManager(
    document.querySelector('.loading-bar'),
    () => {
        // Start animations when loading is complete
        sceneManager.startAnimations();
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize event listeners
        initEventListeners();
    }
);

// Initialize scroll-based animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        // Create animation for each section
        gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: true
                }
            }
        );
        
        // Trigger camera movement based on scroll
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => sceneManager.focusOnSection(index),
            onEnterBack: () => sceneManager.focusOnSection(index)
        });
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        gsap.fromTo(
            category,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: category,
                    start: 'top 80%',
                    end: 'top 60%',
                    scrub: true
                }
            }
        );
    });
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.fromTo(
            item,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 65%',
                    scrub: true
                }
            }
        );
    });
}

// Initialize event listeners for 3D interactions
function initEventListeners() {
    // Listen for project selection events
    window.addEventListener('projectSelected', (event) => {
        const { id, title, description, technologies } = event.detail;
        
        // Update project details in the DOM
        const projectDetails = document.getElementById(`${id}-details`);
        if (projectDetails) {
            // Hide all project details first
            document.querySelectorAll('.project-details').forEach(el => {
                el.classList.remove('active');
            });
            
            // Show the selected project details
            projectDetails.classList.add('active');
            
            // Log for debugging
            console.log(`Selected project: ${title}`);
            console.log(`Description: ${description}`);
            console.log(`Technologies: ${technologies}`);
        }
    });
    
    // Listen for skill selection events
    window.addEventListener('skillSelected', (event) => {
        const { name, level, category } = event.detail;
        
        // Create a toast notification with skill info
        createToastNotification(`${name} - ${Math.round(level * 100)}%`, category);
        
        // Log for debugging
        console.log(`Selected skill: ${name}`);
        console.log(`Level: ${Math.round(level * 100)}%`);
        console.log(`Category: ${category}`);
    });
}

// Create a toast notification for skill info
function createToastNotification(title, subtitle) {
    // Check if a toast container exists, create one if not
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add styles to the container
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        toastContainer.style.display = 'flex';
        toastContainer.style.flexDirection = 'column';
        toastContainer.style.alignItems = 'flex-end';
        toastContainer.style.gap = '10px';
        toastContainer.style.pointerEvents = 'none';
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <h4>${title}</h4>
        <p>${subtitle}</p>
    `;
    
    // Style the toast
    toast.style.backgroundColor = 'rgba(17, 34, 64, 0.9)';
    toast.style.color = '#e6f1ff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.borderLeft = '4px solid #64ffda';
    toast.style.minWidth = '200px';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Animate the toast in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove the toast after a delay
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        
        // Remove from DOM after animation
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Handle window resize
window.addEventListener('resize', () => {
    sceneManager.onWindowResize();
});

// Start the animation loop
sceneManager.animate(); 