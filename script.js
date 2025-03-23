let scene, camera, renderer, avatar;

// Αρχικοποίηση 3D σκηνής
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Προσθήκη φωτισμού
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 5);
    scene.add(light);

    // Δημιουργία loader
    const loader = new THREE.GLTFLoader();

    // **Βάλε σωστό URL για το GLB αρχείο σου**
const avatarUrl = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';

    // Φόρτωση avatar
    loader.load(
        avatarUrl,
        function (gltf) {
            avatar = gltf.scene;
            avatar.position.set(0, -0.1, 0);
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
document.getElementById('speak-button').addEventListener('click', () => {
    const msg = new SpeechSynthesisUtterance("Γεια σου! Είμαι ένας αστροναύτης.");
    msg.lang = 'el-GR';
    window.speechSynthesis.speak(msg);
});

