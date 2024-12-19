import axios from 'axios'
import React, { useContext, useState } from 'react'
import {toast} from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function LoginCompo() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const loginUser = async (e) => {
        e.preventDefault();
        
        try {
            const {email, password} = data;

            if(!email || !password) {
                toast.error('Please fill all fields')
                return;
            }

            const response = await axios.post('/loginuser',{email, password});
            const userData = response.data;

            if(userData.error){
                toast.error(userData.error)
            } else{
                //update context and local storage
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));

                //clear form
                setData({
                    email: '',
                    password: ''
                });

                toast.success('Logged in successfully');

                //navigation
                switch (userData.role){
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'student':
                        navigate('/student');
                        break;
                    default:
                        navigate('/');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in. Please try again');
        } 
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }
  return (
    <div>
      <div>
        <h1>Login Page</h1>

        <div>
            <form onSubmit={loginUser}>
                <input 
                type='email'
                name='email'
                value={data.email}
                onChange={handleInputChange}
                id='email'
                placeholder='Email'></input>

                <input 
                type='password'
                name='password'
                value={data.password}
                onChange={handleInputChange}
                id='password'
                placeholder='Password'></input>

                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>

      </div>
    </div>
  )
}
