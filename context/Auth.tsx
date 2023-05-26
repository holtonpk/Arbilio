"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth, app } from "@/firebase";
// import nookies from "nookies";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  signInWithPopup,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { CollectionType } from "@/types";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";

import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

interface AuthContextType {
  userPlan: "base" | "standard" | "premium" | undefined;
  currentUser: FirebaseUser | undefined;
  signIn: (email: string, password: string) => Promise<any>;
  createAccount: (
    email: string,
    name: string,
    password: string
  ) => Promise<any>;
  logInWithGoogle: () => Promise<any>;
  logOut: () => Promise<void>;
  changeUserPassword: (currentPassword: string, newPassword: string) => any;
  changeUserEmail: (currentPassword: string, newEmail: string) => any;
  changeUserDisplayName: (newName: string) => any;
  resetPassword: () => any;
  uploadProfilePicture: (file: File) => any;
  changeProfilePicture: (url: string) => any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const emailRef = React.createRef();

export function useAuth() {
  return useContext(AuthContext);
}

export const db = getFirestore(app);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(true);
  const [userCollections, setUserCollections] = useState<CollectionType[]>([]);
  const [userPlan, setUserPlan] = useState<
    "base" | "standard" | "premium" | undefined
  >(undefined);
  // const router = useRouter();

  const defaultProfilePictures: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F1.png?alt=media&token=2fa64355-bc2d-485e-bc6b-3bd5ac6aaa05",
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F2.png?alt=media&token=0a370360-d7e8-463e-8173-d27b9ba104b6",
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F3.png?alt=media&token=94ed0bda-533a-48bb-b4a5-6120156c47e6",
  ];

  // Function to pick a random image URL from the array
  function getRandomImageUrl(): string {
    const randomIndex = Math.floor(
      Math.random() * defaultProfilePictures.length
    );
    return defaultProfilePictures[randomIndex] as string;
  }

  async function createAccount(email: string, name: string, password: string) {
    const account = createUserWithEmailAndPassword(auth, email, password)
      .then((cred: any) => {
        const profileUrl = getRandomImageUrl() as string;
        updateProfile(cred.user, {
          displayName: name,
          photoURL: profileUrl,
        });
        // createUserStorage(cred?.user);
        return { success: cred };
      })
      .catch((error) => {
        return { error: error.code };
      });

    return account;
  }

  function signIn(email: string, password: string) {
    const login = signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        return { success: value };
      })
      .catch((error) => {
        console.log("error((((", error);
        return { error: error.code };
      });
    return login;
  }

  function logOut() {
    setCurrentUser(undefined);
    return signOut(auth);
  }

  async function logInWithGoogle(): Promise<{ success?: any; error?: any }> {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        createUserStorage(result.user);
        return { success: result };
      } else {
        return { error: result };
      }
    } catch (error: any) {
      return { error };
    }
  }

  const createUserStorage = async (user: any) => {
    if (!user.photoURL) {
      const profileUrl = getRandomImageUrl() as string;
      updateProfile(user, {
        photoURL: profileUrl,
      });
    }
  };

  const uploadProfilePicture = async (file: any) => {
    if (!currentUser) return;
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
    // Create a upload task
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: "image/jpeg", // Manually set the MIME type
    });

    // Create a promise to handle the upload task
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // You may want to use these to provide feedback to the user
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  };

  const changeProfilePicture = async (url: string) => {
    if (!currentUser) return;
    updateProfile(currentUser, {
      photoURL: url,
    });
  };

  // import {
  //   getAuth,
  //   EmailAuthProvider,
  //   reauthenticateWithCredential,
  //   updatePassword
  // } from "firebase/auth";

  async function changeUserPassword(
    currentPassword: string,
    newPassword: string
  ) {
    if (!auth.currentUser || !auth.currentUser.email) {
      return { error: "No user is currently signed in" };
    }

    // Create a credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    // Re-authenticate the user.
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (error) {
      return { error: "Current password is incorrect" };
    }

    // Update the user's password.
    try {
      await updatePassword(auth.currentUser, newPassword);
      return { success: "Password updated successfully" };
    } catch (error) {
      return { error: "Error updating password: " + error };
    }
  }

  function resetPassword() {
    if (!currentUser || !currentUser.email)
      return { error: "No user is signed in" };
    const reset = sendPasswordResetEmail(auth, currentUser.email)
      .then((result) => {
        return "success";
      })
      .catch((error) => {
        console.log("error(((((", error);
        return error.code;
      });

    return reset;
  }

  async function changeUserDisplayName(newDisplayName: string) {
    if (!currentUser) return { error: "No user is signed in" };
    try {
      await updateProfile(currentUser, {
        displayName: newDisplayName,
      });
      return { success: "Display name updated successfully" };
    } catch (error) {
      return { error: error };
    }
  }

  async function changeUserEmail(newEmail: string, currentPassword: string) {
    if (!currentUser) return { error: "No user is signed in" };
    // Re-authenticate the user
    console.log("currentPassword", currentPassword);
    const credential = EmailAuthProvider.credential(
      currentUser.email as string,
      currentPassword
    );
    console.log("credential", credential);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      // Change the email
      await updateEmail(currentUser, newEmail);
      return { success: "Email updated successfully" };
    } catch (error) {
      return { error: error };
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        const token = await user.getIdToken();
        // nookies.set(undefined, "token", token, { path: "/" });
      }
      if (user) {
        setCurrentUser(user);
        await auth.currentUser?.getIdToken(true);
        const decodedToken = await auth.currentUser?.getIdTokenResult();
        setUserPlan(decodedToken?.claims?.stripeRole);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [rerender]);

  const value = {
    userPlan,
    currentUser,
    signIn,
    createAccount,
    logInWithGoogle,
    logOut,
    changeUserDisplayName,
    changeUserEmail,
    changeUserPassword,
    resetPassword,
    uploadProfilePicture,
    changeProfilePicture,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
