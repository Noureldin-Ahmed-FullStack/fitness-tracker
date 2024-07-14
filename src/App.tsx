import './App.css'

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {

  return (
    <div className='flex-grow-1 d-flex flex-column'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
