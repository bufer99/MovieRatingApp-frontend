import './App.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MovieBrowser from './Components/Routes/MovieBrowser';
import NoMatch from './Components/Routes/NoMatch';
import Layout from './Components/Layout';
import UserMovies from './Components/Routes/UserMovies';
import Login from './Components/Routes/Login';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieBrowser />} />
        <Route path="movies" element={<UserMovies />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App

/*
routes:
  Home
  myMovies
  Movie
*/