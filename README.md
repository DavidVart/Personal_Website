# David Vargas - Interactive Portfolio Website

A modern, interactive portfolio website showcasing David Vargas's skills, projects, and experience in software development, robotics, and AI.

## Features

- **Interactive UI**: Modern design with smooth animations and transitions
- **Particle Background**: Dynamic particle system in the hero section
- **Code Animation**: Typewriter-style code animation showcasing programming skills
- **Skills Orbit**: Interactive visualization of skills as orbiting planets
- **Experience Timeline**: Interactive timeline with robot animation
- **Interactive Statistics**: Animated statistics with sound effects
- **Project Showcases**: 3D flip cards for project details
- **AI Chatbot**: Simple AI assistant to help visitors learn more
- **Responsive Design**: Fully responsive layout for all devices
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Easter Egg**: Hidden matrix animation (click the logo 5 times)

## Technologies Used

- HTML5
- CSS3 (with CSS variables and animations)
- JavaScript (ES6+)
- Particles.js for background effects
- Anime.js for animations
- Typed.js for typing effects
- Howler.js for sound effects
- Font Awesome for icons

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/david-vargas-portfolio.git
   cd david-vargas-portfolio
   ```

2. Open the project in your favorite code editor.

3. For local development, you can use a simple HTTP server:
   ```
   # If you have Python installed
   python -m http.server
   
   # If you have Node.js installed
   npx serve
   ```

4. Open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal).

## Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   ├── sounds/             # Sound effect files
│   ├── particles-config.js # Particles.js configuration
│   └── main.js             # Main JavaScript file
└── README.md               # This file
```

## Customization

- **Colors**: Edit the CSS variables in `src/styles/main.css` to change the color scheme
- **Content**: Update the content in `index.html` to reflect your own information
- **Particles**: Modify `src/particles-config.js` to change the particle effect
- **Sounds**: Replace the sound files in `src/sounds/` with your own

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contact

David Vargas - david.vargas@example.com