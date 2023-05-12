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

import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

interface AuthContextType {
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
  // const router = useRouter();

  async function createAccount(email: string, name: string, password: string) {
    const account = createUserWithEmailAndPassword(auth, email, password)
      .then((cred: any) => {
        updateProfile(cred.user, {
          displayName: name,
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

  async function logInWithGoogle() {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result.user) {
      createUserStorage(result.user);
      return { success: result };
    } else {
      return { error: result };
    }
  }

  const createUserStorage = async (user: any) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   console.log("No such document!");
    //   // doc.data() will be undefined in this case
    //   setDoc(userRef, {
    //     // settings: defaultSettings,
    //     collection: [],
    //   });
    // }
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
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [rerender]);

  const value = {
    currentUser,
    signIn,
    createAccount,
    logInWithGoogle,
    logOut,
    changeUserDisplayName,
    changeUserEmail,
    changeUserPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
