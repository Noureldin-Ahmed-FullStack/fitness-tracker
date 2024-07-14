import './App.css'

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {

  return (
    <div className='flex-grow-1'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
