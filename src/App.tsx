import './App.css'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import MovieBrowser from './Components/Routes/MovieBrowser';
import NoMatch from './Components/Routes/NoMatch';
import Layout from './Components/Layout';
import UserMovies from './Components/Routes/UserMovies';
import AdminBoard from './Components/Routes/AdminBoard';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieBrowser />} />
        <Route path="movies" element={<UserMovies />} />
        <Route path="admin" element={<AdminBoard />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

export default App
