import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

console.log("THREE.JS + ORBIT CONTROLS LOADED");


// ====================
// SCENE
// ====================

const scene = new THREE.Scene();


// ====================
// CAMERA
// ====================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1, 5);


// ====================
// RENDERER
// ====================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "9999";

document.body.appendChild(renderer.domElement);


// ====================
// LIGHT
// ====================

const light = new THREE.HemisphereLight(
    0xffffff,
    0x222222,
    3
);

scene.add(light);


// ====================
// TEST CUBE
// ====================

const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshStandardMaterial({
    color: 0xdfff00
});

const cube = new THREE.Mesh(
    geometry,
    material
);

scene.add(cube);


// ====================
// ORBIT CONTROLS
// ====================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.enablePan = false;

controls.minDistance = 3;

controls.maxDistance = 8;

controls.target.set(0, 0, 0);

controls.update();


// ====================
// ANIMATION
// ====================

function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();


// ====================
// RESIZE
// ====================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
