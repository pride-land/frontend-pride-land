import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase';

export function signUp(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('User signed up:', userCredential.user)
    })
    .catch((error) => {
        console.error('Error:', error)
    });
}

export function logIn(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log('User logged in:', userCredential.user )
    })
    .catch((error) => {
        console.error('Error:', error)
    });
}

export function signOut(): Promise<void> {
    return firebaseSignOut(auth)
    .then(() => {
        console.log('User signed out');
    })
    .catch((error) => {
        console.error('Error:', error)
    })
};