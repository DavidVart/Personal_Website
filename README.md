# Personal Website with Three.js

An interactive personal portfolio website built with Three.js, featuring 3D models and animations to showcase projects, skills, and experience.

## Features

- Interactive 3D environment with particle effects
- Project showcase with clickable 3D models
- Skills visualization with interactive elements
- Smooth camera transitions between sections
- Responsive design for all devices

## Technologies Used

- Three.js for 3D rendering
- GSAP for animations
- Vite for development and building
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/personal-website-threejs.git
cd personal-website-threejs
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/
├── public/                  # Static assets
│   ├── models/              # 3D models (GLB/GLTF)
│   ├── textures/            # Textures for materials
│   └── draco/               # Draco decoder for model compression
├── src/
│   ├── core/                # Core functionality
│   │   ├── SceneManager.js  # Manages the Three.js scene
│   │   └── LoadingManager.js # Handles asset loading
│   ├── subjects/            # Scene subjects (modular components)
│   │   ├── EnvironmentSubject.js # Background environment
│   │   ├── ProjectsSubject.js    # Projects section
│   │   └── SkillsSubject.js      # Skills visualization
│   ├── styles/              # CSS styles
│   │   └── main.css         # Main stylesheet
│   └── main.js              # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## Customization

To customize this website for your own use:

1. Replace the placeholder project information in `src/subjects/ProjectsSubject.js`
2. Update skills in `src/subjects/SkillsSubject.js`
3. Modify the HTML content in `index.html` to reflect your personal information
4. Add your own 3D models to the `public/models/` directory
5. Customize colors and styling in `src/styles/main.css`

## Performance Optimization

This project follows Three.js best practices for performance:

- Uses BufferGeometry for all meshes
- Implements object pooling to reduce garbage collection
- Optimizes render loop to only render when necessary
- Implements level of detail (LOD) for complex models
- Uses Draco compression for 3D models

## License

MIT