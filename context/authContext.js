import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);  //For CurrentUsers
    const [isLoading, setIsLoading] = useState(true);   // Loader in every changes into the page.

    //Signout method for firebase authentcation here signOut as authsignOut
    const signOut = () => {
        // Sign-out successful.
        authSignOut(auth).then(() => clear())
    };

    // Its a clear mehtod to reset the state
    const clear = async () => {
        try {
            //Check if currentUser isNotOnline then the condition will false
            if (currentUser) {
                await updateDoc(doc(db, "users", currentUser.uid), {
                    isOnline: false,
                });
            }
            setIsLoading(false);
            setCurrentUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    // Its a authStateChanged method to check if the user is not render to login then its clear all the state.
    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
            clear();
            return;
        }
        // Check if user isExists then get the isOnline is True!.
        const userDocExsist = await getDoc(doc(db, "users", user.uid));
        if (userDocExsist.exists()) {
            await updateDoc(doc(db, "users", user.uid), {
                isOnline: true,
            });
        }

        // get all the data from Firestore DB using getDoc() method
        const userDoc = await getDoc(doc(db, "users", user.uid), {

        })
        setCurrentUser(userDoc.data());
        setIsLoading(false);
    }

    //its check if the user is not login its change the state and render to the /login page .
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe;
    }, [])

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            isLoading,
            setIsLoading,
            signOut,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext);