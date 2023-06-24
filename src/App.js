import { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import ForgotPassword from './Components/ForgotPassword';
import Register from './Components/Register';

function App() {
  // const [username, setUsername] = useState('');
  const [login, setLogin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/passenger' element={login ? <Home login={login} /> : <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;