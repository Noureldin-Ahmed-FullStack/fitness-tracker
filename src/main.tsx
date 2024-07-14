import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ClerkProvider } from '@clerk/clerk-react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthenticationPage from './Components/AuthenticationPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import CenteredPage from './Components/CenteredPage';
import Layout from './Components/Layout';
import MyContextProvider from './Components/ContextProvider';
import MyWorkouts from './Components/MyWorkouts.tsx'
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Layout /> },
      { path: "/Fitness-Tracker", element: <Layout /> },
      { path: "/My-Workouts", element: <MyWorkouts /> },
      { path: "/sign-in", element: <CenteredPage><SignUp forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage> },
      { path: "/sign-up", element: <CenteredPage><SignIn forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage> },

    ]
  }
])
const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider theme={theme}>
        <MyContextProvider>
          {/* <Router>
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
              <Route path="/Fitness-Tracker" element={<>
                <SignedIn>
                  <Layout />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>} />
              <Route path="/sign-up" element={<CenteredPage><SignUp forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage>} />
              <Route path="/sign-in" element={<CenteredPage><SignIn forceRedirectUrl={'/Fitness-Tracker'} /></CenteredPage>} />
              <Route path="/My-Workouts" element={<AuthenticationPage />} />
              <Route path="/about" element={<AuthenticationPage />} />
              <Route path="/contact" element={<AuthenticationPage />} />
              <Route path="*" element={<h1>lol wrong route</h1>} />
            </Routes>
          </Router> */}

          <RouterProvider router={router} />
        </MyContextProvider>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
