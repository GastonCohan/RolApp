import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import SignUp from './Pages/SignUp/signUp';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
  );
}

export default App;
