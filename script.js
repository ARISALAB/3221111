let scene, camera, renderer, avatar;

// Αρχικοποίηση 3D σκηνής
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Φως
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 5);
    scene.add(light);

    // Φόρτωση avatar από ReadyPlayerMe
    const loader = new THREE.GLTFLoader();
    loader.load('https://models.readyplayer.me/1234567.glb', function (gltf) {
        avatar = gltf.scene;
        avatar.position.set(0, -1, 0);
        scene.add(avatar);
    });

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

// Μιλάει το avatar με animation στο στόμα
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);

    // Προσθέτουμε animation στο στόμα
    if (avatar) {
        let mouth = new Mouth();
        avatar.add(mouth);
        mouth.talk();
        
        utterance.onend = () => {
            mouth.stop();
        };
    }
}

// Εκκίνηση 3D σκηνής
init();

// Κουμπί για να μιλήσει το avatar
document.getElementById("speak-button").addEventListener("click", function () {
    speak("Γεια σας! Είμαι εδώ για να σας βοηθήσω με τον γάμο σας!");
});
