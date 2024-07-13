import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthenticationPage from './Components/AuthenticationPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import CenteredPage from './Components/CenteredPage';
import Layout from './Components/Layout';
import MyContextProvider from './Components/ContextProvider';
const theme = createTheme({
  palette: {
    mode: 'dark'
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <MyContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<>
              <SignedIn>
                <Layout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>} />
            <Route path="/sign-up" element={<CenteredPage><SignUp forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage>} />
            <Route path="/sign-in" element={<CenteredPage><SignIn forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage>} />
            <Route path="/gallery" element={<AuthenticationPage />} />
            <Route path="/about" element={<AuthenticationPage />} />
            <Route path="/contact" element={<AuthenticationPage />} />
            <Route path="*" element={<h1>lol wrong route</h1>} />
          </Routes>
        </Router>
      </MyContextProvider>

    </ThemeProvider>
  )
}

export default App
