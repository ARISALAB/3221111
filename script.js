let scene, camera, renderer, avatar;

// Αρχικοποίηση 3D σκηνής
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);

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
    const avatarUrl = 'https://models.readyplayer.me/67e0573b55c6887bf46d19a1.glb';

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

    // Ακρόαση για την κίνηση του ποντικιού
    document.addEventListener("mousemove", onMouseMove);

    animate();
}

// Παρακολούθηση του ποντικιού
function onMouseMove(event) {
    if (!avatar) return;

    // Μετατροπή της θέσης του ποντικιού σε συντεταγμένες Three.js
    let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Υπολογισμός της γωνίας περιστροφής
    let targetRotationY = mouseX * Math.PI * 0.5; // Περιορίζουμε το εύρος περιστροφής
    let targetRotationX = mouseY * Math.PI * 0.1; // Μικρή κλίση πάνω-κάτω

    // Ομαλή μετάβαση προς τη νέα γωνία
    avatar.rotation.y += (targetRotationY - avatar.rotation.y) * 0.1;
    avatar.rotation.x += (targetRotationX - avatar.rotation.x) * 0.1;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Εκκίνηση 3D σκηνής
init();

// Κουμπί για ομιλία
document.getElementById('speak-button').addEventListener('click', () => {
    const msg = new SpeechSynthesisUtterance("Γειά σου Αλέξανδρε. Τι κάνεις? Είσαι καλά? Εγώ νιώθω τέλεια. Πες στην μαμά σου πως είναι πολύ όμορφη!!");
    msg.lang = 'el-GR';
    window.speechSynthesis.speak(msg);
});
