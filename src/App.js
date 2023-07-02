import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Movies from './components/Movies/Movies';
import Shows from './components/Shows/Shows';

function App() {

  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'movies/:id', element: <Movies /> },
        { path: 'shows/:id', element: <Shows /> }
      ]
    },
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { path: '*', element: <Notfound /> }
  ])

  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  );
}

export default App;
