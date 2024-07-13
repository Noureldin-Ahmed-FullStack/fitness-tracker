import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './FireBaseSetup';

// Create a context
export let MyContext = createContext({});
interface props {
  children: React.ReactNode
}

export default function MyContextProvider(props: props) {
  const [userDbData, setUserDbData] = useState({})
  const { isLoaded, isSignedIn, user } = useUser();
  const fetchFirebaseUser = async (ClerkUser: any) => {

    try {
      const UserCollectionRef = collection(db, 'Users');
      console.log("clerk email " + ClerkUser.primaryEmailAddress?.emailAddress);

      const q = query(UserCollectionRef, where("email", "==", ClerkUser.primaryEmailAddress?.emailAddress)); // Assuming userId property in Pets collection
      const data = await getDocs(q);
      const UserData = data.docs[0]?.data()
      setUserDbData(data.docs[0]?.data())
      if (UserData) {
        console.log(UserData);
        return
      } else {
        const data = {
          userName: ClerkUser?.fullName,
          email: ClerkUser.primaryEmailAddress?.emailAddress
        }
        const userDocRef = await addDoc(UserCollectionRef,data);
        console.log(userDocRef);
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
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
