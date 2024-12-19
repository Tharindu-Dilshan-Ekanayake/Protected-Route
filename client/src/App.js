import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import UserContextProvider from './context/UserContext';
import AdminDash from './pages/AdminPages/AdminDash';
import StudentDash from './pages/StudentPages/StudentDash';
import ProtectedRoute from './protectedRouter/ProtectedRoute';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
        <Toaster position="top-right" toastOptions={{duration: 5000}}/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/admin" element={<ProtectedRoute><AdminDash/></ProtectedRoute>}/>
          <Route path="/student" element={<ProtectedRoute><StudentDash/></ProtectedRoute>}/>
        </Routes>
        </UserContextProvider>
      </BrowserRouter>  
    </div>
  );
}

export default App;
