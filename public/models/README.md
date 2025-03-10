# 3D Models Directory

This directory should contain the 3D models for your personal website. The project is set up to use glTF (.glb or .gltf) files with Draco compression for optimal performance.

## Required Models

The following models are referenced in the code:

1. `project1.glb` - Represents the first project (Web Development)
2. `project2.glb` - Represents the second project (Mobile App)
3. `project3.glb` - Represents the third project (Data Visualization)
4. `skills.glb` - Represents the skills visualization

## Creating Models

You can create these models using 3D modeling software like Blender:

1. Create your model in Blender
2. Export as glTF 2.0 (.glb)
3. Enable Draco compression in the export settings for better performance

## Using Placeholder Models

If you don't have custom models yet, you can:

1. Use simple geometric shapes (the code already creates these as fallbacks)
2. Download free models from sites like:
   - [Sketchfab](https://sketchfab.com/features/free-3d-models)
   - [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free)
   - [CGTrader](https://www.cgtrader.com/free-3d-models)

## Model Optimization Tips

For best performance:

- Keep polygon count low (aim for under 10,000 triangles per model)
- Use Draco compression
- Optimize textures (use power-of-two dimensions, e.g., 512x512)
- Combine materials where possible
- Remove unnecessary details that won't be visible 