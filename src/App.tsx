import './App.css'

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { SignedIn, SignedOut, SignIn, useUser } from '@clerk/clerk-react';
import CenteredPage from './Components/CenteredPage';

function App() {

  const { isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <CenteredPage>
        <h1>Loading....</h1>
      </CenteredPage>
    )
  }
  return (
    <div className='flex-grow-1 d-flex flex-column'>
      <Navbar />
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <CenteredPage>
          <SignIn />
        </CenteredPage>
      </SignedOut>
    </div>
  )
}

export default App
