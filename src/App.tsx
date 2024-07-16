import './App.css'

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import CenteredPage from './Components/CenteredPage';

function App() {

  return (
    <div className='flex-grow-1 d-flex flex-column'>
      <Navbar />
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        {/* <RedirectToSignIn /> */}
        <CenteredPage>
          <SignIn />
        </CenteredPage>
      </SignedOut>
    </div>
  )
}

export default App
