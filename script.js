import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

console.log("THREE.JS LOADED");

// ====================
// 3D SCENE
// ====================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// ====================
// TEST OBJECT
// ====================

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// ====================
// ANIMATION
// ====================

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
