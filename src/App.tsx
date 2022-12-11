import './App.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MovieBrowser from './Components/MovieBrowser';
import NoMatch from './NoMatch';
import Layout from './Components/Layout';
import UserMovies from './Components/UserMovies';
import Login from './Login';

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