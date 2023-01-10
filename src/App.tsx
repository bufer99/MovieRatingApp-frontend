import './App.css'
import { Routes, Route, Outlet, Link, Navigate, useLocation } from "react-router-dom";
import MovieBrowser from './Components/Routes/MovieBrowser';
import NoMatch from './Components/Routes/NoMatch';
import Layout from './Components/Layout';
import UserMovies from './Components/Routes/UserMovies';
import AdminBoard from './Components/Routes/AdminBoard';
import { useAppSelector } from './state/store';


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieBrowser />} />
        <Route path="movies" element={
          <PrivateRoute>
            <UserMovies />
          </PrivateRoute>
        } >
        </Route>
        <Route path="admin" element={
          <PrivateAdminRoute>
            <AdminBoard />
          </PrivateAdminRoute>
        } >
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}




function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector(state => state.auth.user);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}


function PrivateAdminRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector(state => state.auth.user);
  let location = useLocation();

  if (!user?.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}