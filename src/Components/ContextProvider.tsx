import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react';
import {  doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './FireBaseSetup';

// Create a context
interface MyContextProps {
  darkMode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  userDbData: UserDbData | null;
  setUserDbData: React.Dispatch<React.SetStateAction<UserDbData | null>>;
}

export const MyContext = createContext<Partial<MyContextProps>>({});
interface props {
  children: React.ReactNode
}

interface UserDbData {
  id: string;
  userName: string;
  email: string;
}
export default function MyContextProvider(props: props) {
  const [userDbData, setUserDbData] = useState<UserDbData | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const fetchFirebaseUser = async (ClerkUser: any) => {

    try {
      // console.log("clerk email " + ClerkUser.id);
      
      // const UserCollectionRef = collection(db, 'Users');
      // const q = query(UserCollectionRef, where("email", "==", ClerkUser.primaryEmailAddress?.emailAddress)); // Assuming userId property in Pets collection
      // const data = await getDocs(q);

      const FireBaseUserDocRef = doc(db, 'Users', ClerkUser.id);
      const firebaseUserData = await getDoc(FireBaseUserDocRef);
      
      const UserData = firebaseUserData.data() as UserDbData | undefined;
      if (UserData) {
        setUserDbData(UserData)
        console.log(UserData);
        return
      } else {

        const FireBaseUserDocRef = doc(db, 'Users', ClerkUser.id);
        await setDoc(FireBaseUserDocRef, {
          userName: ClerkUser?.fullName,
          email: ClerkUser.primaryEmailAddress?.emailAddress
        })
        const firebaseUserData = await getDoc(FireBaseUserDocRef);
        const UserData = firebaseUserData.data() as UserDbData | undefined;
        if (UserData) {
          setUserDbData(UserData)
        }
      }
    } catch (error) {
      console.error("Error fetching Users data:", error);
    }

  };
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const clerkUser: any = user
      fetchFirebaseUser(clerkUser)
    }
  }, [user])

  const [darkMode, setDarkmode] = useState(true);
  const contextValue = {
    darkMode,
    setDarkmode,
    userDbData, 
    setUserDbData
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
