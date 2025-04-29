// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjK2TRNqhifeJRfzICwVc1KupJVd7qnDo",
  authDomain: "bonfire-v0-3-0-alpha.firebaseapp.com",
  projectId: "bonfire-v0-3-0-alpha",
  storageBucket: "bonfire-v0-3-0-alpha.firebasestorage.app",
  messagingSenderId: "606338932003",
  appId: "1:606338932003:web:b6c6a2cdb933557d9f8096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para iniciar sesión con Google
export function signInWithGoogle() {
    console.log('signInWithGoogle called'); // Verificar que la función se llama
    const provider = new GoogleAuthProvider();
    console.log('Google provider created:', provider); // Verificar que el proveedor se crea
    
    signInWithPopup(auth, provider)
        .then((result) => {
            // El usuario ha iniciado sesión exitosamente
            const user = result.user;
            console.log('Usuario registrado con Google:', user);
            
            // Redirigir al formulario de perfil
            window.location.href = 'profile-setup.html';
        })
        .catch((error) => {
            console.error('Error al iniciar sesión con Google:', error);
            alert('Hubo un error al iniciar sesión con Google. Por favor, intenta de nuevo.');
        });
}

// Función para registrar usuario con email y contraseña
export function registerWithEmail(email, password) {
    console.log('registerWithEmail called with email:', email);
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User registered successfully in Firebase:', userCredential.user);
            return userCredential;
        })
        .catch((error) => {
            console.error('Error in registerWithEmail:', error);
            throw error;
        });
}

// Función para iniciar sesión con email y contraseña
export function signInWithEmailAndPassword(email, password) {
    console.log('signInWithEmailAndPassword called with email:', email);
    return firebaseSignInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed in successfully:', userCredential.user);
            return userCredential;
        })
        .catch((error) => {
            console.error('Error in signInWithEmailAndPassword:', error);
            throw error;
        });
}

// Observador de estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado:', user);
    } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
    }
}); 