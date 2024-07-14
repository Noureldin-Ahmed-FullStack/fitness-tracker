import { useUser } from '@clerk/clerk-react';
import { createContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './FireBaseSetup';

// Create a context
interface MyContextProps {
  darkMode: boolean;
  setDarkmode: React.Dispatch<React.SetStateAction<boolean>>;
  userDbData: UserDbData | null;
  setUserDbData: React.Dispatch<React.SetStateAction<UserDbData | null>>;
  WorkOuts: Workouts[] | [];
  setWorkOuts: React.Dispatch<React.SetStateAction<Workouts[] | []>>;
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
interface NestedWorkouts {
  ExcerciseName: string;
  Img: string;
  Reps: number;
  Sets: number;
}
interface Workouts {
  id:string;
  WorkOuts: NestedWorkouts[];
  image: string;
  name: string;
  user: string;
}
export default function MyContextProvider(props: props) {
  const [userDbData, setUserDbData] = useState<UserDbData | null>(null);
  const [WorkOuts, setWorkOuts] = useState<Workouts[]>([]);
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

        const clerkUser: any = user
        fetchWorkOuts(clerkUser)
        return
      } else {

        const FireBaseUserDocRef = doc(db, 'Users', ClerkUser.id);
        await setDoc(FireBaseUserDocRef, {
          id: ClerkUser.id,
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
  const fetchWorkOuts = async (ClerkUser: any) => {
    try {
      const UserCollectionRef = collection(db, 'Workouts');
      const q = query(UserCollectionRef, where("user", "==", ClerkUser.id)); // Assuming userId property in Pets collection
      const data = await getDocs(q);

      // const workoutData = data.docs[0]?.data() as Workouts | undefined;
      
      const fetchedWorkouts: Workouts[] = [];
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()) {
          const data = doc.data() as Workouts
          data.id = doc.id
          fetchedWorkouts.push(data)
        }
      });
      if (fetchedWorkouts) {
        setWorkOuts(fetchedWorkouts)
      }

    } catch (error) {
      console.error(error)
    }

  }
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
    setUserDbData,
    WorkOuts,
    setWorkOuts
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  )
}
