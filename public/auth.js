import firebase from 'firebase/app';
import 'firebase/auth';

// Sign in
export const signIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await user.sendEmailVerification();
      console.log('Verification email sent!');
    }

    try {
      const idToken = await user.getIdToken(true);
      // You can now send this token to your server
    } catch (error) {
      console.log('Error getting token: ', error);
    }
  } catch (error) {
    console.log('Error signing in: ', error);
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log('Signed out!');
  } catch (error) {
    console.log('Error signing out: ', error);
  }
}

// Send password reset email
export const sendPasswordResetEmail = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    console.log('Password reset email sent!');
  } catch (error) {
    console.log('Error sending password reset email: ', error);
  }
}
