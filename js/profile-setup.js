// Configuración de Firebase (debe ser la misma que en auth.js)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a Firestore
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const usernameInput = document.getElementById('username');
    const descriptionInput = document.getElementById('description');

    // Verificar si el usuario está autenticado
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Si no está autenticado, redirigir al inicio
            window.location.href = 'index.html';
            return;
        }

        // Verificar si el usuario ya tiene un perfil
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    // Si ya tiene perfil, redirigir al feed
                    window.location.href = 'feed.html';
                }
            })
            .catch((error) => {
                console.error('Error al verificar perfil:', error);
            });
    });

    // Manejar el envío del formulario
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!username || !description) {
            alert('Por favor, completa todos los campos');
            return;
        }

        // Verificar si el nombre de usuario ya existe
        const usernameExists = await db.collection('users')
            .where('username', '==', username)
            .get()
            .then((querySnapshot) => !querySnapshot.empty);

        if (usernameExists) {
            alert('Este nombre de usuario ya está en uso. Por favor, elige otro.');
            return;
        }

        // Obtener el usuario actual
        const user = firebase.auth().currentUser;

        // Guardar el perfil en Firestore
        db.collection('users').doc(user.uid).set({
            username: username,
            description: description,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            // Redirigir al feed después de guardar el perfil
            window.location.href = 'feed.html';
        })
        .catch((error) => {
            console.error('Error al guardar el perfil:', error);
            alert('Hubo un error al guardar tu perfil. Por favor, intenta de nuevo.');
        });
    });
}); 