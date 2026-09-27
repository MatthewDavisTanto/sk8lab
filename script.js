import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

console.log("SK8//LAB 3D SYSTEM LOADED");


// ====================
// FIND 3D CONTAINER
// ====================

const stage = document.querySelector(".skateboard-stage");

if (!stage) {

    console.error("SKATEBOARD STAGE NOT FOUND");

} else {

    // Hide old CSS skateboard
    const oldSkateboard =
        document.getElementById("skateboard");

    if (oldSkateboard) {
        oldSkateboard.style.display = "none";
    }


    // ====================
    // SCENE
    // ====================

    const scene = new THREE.Scene();


    // ====================
    // CAMERA
    // ====================

    const camera = new THREE.PerspectiveCamera(
        45,
        stage.clientWidth / stage.clientHeight,
        0.1,
        1000
    );

    camera.position.set(
        0,
        1.5,
        5
    );


    // ====================
    // RENDERER
    // ====================

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        stage.clientWidth,
        stage.clientHeight
    );

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "2";
    renderer.domElement.style.touchAction = "none";

    stage.appendChild(renderer.domElement);


    // ====================
    // LIGHTING
    // ====================

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            2
        );

    scene.add(ambientLight);


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    keyLight.position.set(
        5,
        8,
        5
    );

    scene.add(keyLight);


    const fillLight =
        new THREE.DirectionalLight(
            0xbfc8ff,
            1.5
        );

    fillLight.position.set(
        -5,
        3,
        -4
    );

    scene.add(fillLight);


    // ====================
    // ORBIT CONTROLS
    // ====================

    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableDamping = true;

    controls.enablePan = false;

    controls.minDistance = 2;

    controls.maxDistance = 8;

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


            // Add model
            scene.add(skateboard);


            // ====================
            // CENTER MODEL
            // ====================

            const box =
                new THREE.Box3().setFromObject(
                    skateboard
                );

            const center =
                box.getCenter(
                    new THREE.Vector3()
                );

            skateboard.position.sub(
                center
            );


            // ====================
            // SCALE MODEL
            // ====================

            const size =
                box.getSize(
                    new THREE.Vector3()
                );

            const maxSize =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );

            const desiredSize = 4.5;

            const scale =
                desiredSize / maxSize;

            skateboard.scale.setScalar(
                scale
            );


            // ====================
            // INITIAL ROTATION
            // ====================

            skateboard.rotation.x =
                THREE.MathUtils.degToRad(8);

            skateboard.rotation.z =
                THREE.MathUtils.degToRad(-18);


            // ====================
            // CONTROLS TARGET
            // ====================

            controls.target.set(
                0,
                0,
                0
            );

            controls.update();


            console.log(
                "SKATEBOARD MODEL LOADED"
            );

        },


        // ====================
        // LOADING PROGRESS
        // ====================

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


        // ====================
        // LOADING ERROR
        // ====================

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

        requestAnimationFrame(
            animate
        );

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

    function resizeRenderer() {

        const width =
            stage.clientWidth;

        const height =
            stage.clientHeight;

        if (
            width === 0 ||
            height === 0
        ) {
            return;
        }

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );

    }

    window.addEventListener(
        "resize",
        resizeRenderer
    );

}
