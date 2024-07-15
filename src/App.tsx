import './App.css'

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {

  return (
    <div className='flex-grow-1 d-flex flex-column'>
      <Navbar />
      <SignedIn>
      <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

export default App
