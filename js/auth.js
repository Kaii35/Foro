// Configuración de Firebase
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

// Función para iniciar sesión con Google
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // El usuario ha iniciado sesión exitosamente
            const user = result.user;
            
            // Redirigir al formulario de perfil
            window.location.href = 'profile-setup.html';
        })
        .catch((error) => {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un error al iniciar sesión con Google. Por favor, intenta de nuevo.');
        });
}

// Observador de estado de autenticación
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', user);
    } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
    }
}); 