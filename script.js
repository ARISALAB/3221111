import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, avatar;

// Αρχικοποίηση 3D σκηνής
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Προσθήκη φωτισμού
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 5);
    scene.add(light);

    // Δημιουργία loader
    const loader = new GLTFLoader();

    // **ΔΙΟΡΘΩΣΗ URL** - Βάλε έγκυρο .glb αρχείο από το Ready Player Me
    const avatarUrl = 'https://models.readyplayer.me/YOUR_VALID_MODEL.glb';

    // Φόρτωση avatar
    loader.load(
        avatarUrl,
        function (gltf) {
            avatar = gltf.scene;
            avatar.position.set(0, -1, 0);
            scene.add(avatar);
            console.log("Μοντέλο φορτώθηκε επιτυχώς!");
        },
        function (xhr) {
            console.log(`Φόρτωση: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
        },
        function (error) {
            console.error('Σφάλμα φόρτωσης GLB:', error);
        }
    );

    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (avatar) {
        avatar.rotation.y += 0.01; // Περιστροφή για φυσικότητα
    }
    renderer.render(scene, camera);
}

// Εκκίνηση 3D σκηνής
init();
