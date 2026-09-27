import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

console.log("SK8//LAB 3D SYSTEM LOADED");


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

camera.position.set(0, 2, 6);


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
// LIGHTING
// ====================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(directionalLight);


// ====================
// CONTROLS
// ====================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.enablePan = false;

controls.minDistance = 2;

controls.maxDistance = 10;

controls.target.set(
    0,
    0,
    0
);

controls.update();


// ====================
// LOAD SKATEBOARD
// ====================

const loader = new GLTFLoader();

loader.load(
    "skateboard.glb",

    function (gltf) {

        const skateboard = gltf.scene;

        skateboard.scale.set(
            2,
            2,
            2
        );

        scene.add(skateboard);

        console.log("SKATEBOARD MODEL LOADED");

    },

    function (xhr) {

        if (xhr.total) {

            const progress =
                (xhr.loaded / xhr.total) * 100;

            console.log(
                "LOADING:",
                Math.round(progress) + "%"
            );

        }

    },

    function (error) {

        console.error(
            "SKATEBOARD MODEL FAILED TO LOAD",
            error
        );

    }
);


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
// WINDOW RESIZE
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
