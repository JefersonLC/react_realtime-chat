import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'
import RootLayout from './layouts/RootLayout'
import Chat from './pages/Chat'
import Login from './pages/Login'
import './socket'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Chat />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  )
}

export default App
