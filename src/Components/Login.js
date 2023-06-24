import { useState } from 'react';
import { auth } from '../firebaseConfig'
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {


    const navigate = useNavigate();
    const [values, setvalues] = useState({
        email: "",
        pass: ""
    })

    const [error, seterror] = useState('') 

    const handleLogin = () => {
        if (!values.email || !values.pass) {
            seterror("Please Fill  All Feilds");
            return;
        }
        seterror('');
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then((response) => {
                navigate('/passenger')
                // console.log(response)
            }).catch((error) => {
                seterror(error.message)
                // console.log(error)
            })
    }

    return (
        <div className='container flex justify-center items-center max-w-screen h-screen'>
            <div className='shadow-2xl rounded-lg'>

                <div className='p-10'>

                        <h3 className="text-2xl text-center pb-10">LogIn Page</h3>

                        <input className='w-full p-2.5 border-solid border-2 my-2' label='Email address' id='emailId' type='email'  placeholder='Enter Email'

                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, email: e.target.value }))
                            }} />
                        <input className='w-full p-2.5 border-solid border-2 my-2' label='Password' id='password' type='password'  placeholder='Enter Password'
                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, pass: e.target.value }))
                            }} />

                        <div>
                            <p className='text-orange-700'>{error}</p>
                        </div>

                        <button className="bg-black px-8 py-2 text-white mt-5" onClick={handleLogin} >Login</button>
                        <p className="my-3 font-bold decoration-solid"> <Link to='/forgotpassword'>Forgot password ? </Link></p>
                        <p className='my-3'>Don't have an account?{' '}<Link to="/register" className='font-bold decoration-solid'>Register here</Link></p>


                </div>

            </div>

        </div>
    );
}

export default Login;