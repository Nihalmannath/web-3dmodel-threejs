// Import Three.js and necessary modules
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// Create the Three.js Scene
const scene = new THREE.Scene();

// Create the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 25); // Position the camera

// Create the Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // General light
scene.add(ambientLight);

// Add Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Sun-like light
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Add Orbit Controls for Camera Interaction
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera motion
controls.dampingFactor = 0.05;
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 100; // Maximum zoom distance
controls.target.set(0, 5, 0); // Set the focus point (inside the apartment)

// Load the GLTF Model
const loader = new GLTFLoader();
loader.load(
  'models/Appartment/scene.gltf', // Path to the GLTF file
  function (gltf) {
    // Add the loaded model to the scene
    const object = gltf.scene;
    scene.add(object);
    console.log("Model loaded successfully!");

    // Optional: Adjust object position or scale if needed
    object.position.set(0, 0, 0);
    object.scale.set(1, 1, 1);
  },
  function (xhr) {
    // Show loading progress in the console
    console.log((xhr.loaded / xhr.total * 100) + "% loaded");
  },
  function (error) {
    // Log an error if the model fails to load
    console.error("Error loading model:", error);
  }
);

// Handle Window Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update Orbit Controls
  renderer.render(scene, camera); // Render the scene
}
animate();
