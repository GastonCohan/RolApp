import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const handleLogout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
