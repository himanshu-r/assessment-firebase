import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const [values, setvalues] = useState({
        name: "",
        email: "",
        pass: ""
    })

    const [error, seterror] = useState('') 
    const [submitdisabel, setsubmitdisable] = useState(false)  

    const handleSubmit = () => {
        if (!values.name || !values.email || !values.pass) {
            seterror("Please Fill  All Feilds");
            return;
        }
        seterror('');

        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then((res) => {
                const user = res.user;
                 updateProfile(user, {
                    displayName: values.name
                });
                console.log(res)
                navigate('/')
            }).catch((err) => {
                seterror(err.message)
            })
    }

    return (
            <div className='container flex justify-center items-center max-w-screen h-screen'>
                <div className='shadow-2xl rounded-lg p-10'>
                    <div>
                        <h2 className="font-bold text-center mb-5">Create an account</h2>
                        <input  className='w-full p-2.5 border-solid border-2 my-2' label='Your Name' id='name' type='text' placeholder='Enter Name'
                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, name: e.target.value }))
                            }}
                        />
                        <input className='w-full p-2.5 border-solid border-2 my-2' label='Email address' size='lg' id='emailId' type='email' placeholder='Enter Email'
                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, email: e.target.value }))
                            }} />
                        <input className='w-full p-2.5 border-solid border-2 my-2' label='Password' size='lg' id='password' type='password' placeholder='Enter Password'
                            onChange={(e) => {
                                setvalues((prev) => ({ ...prev, pass: e.target.value }))
                            }}
                        />
                        <div>
                            <p className='text-orange-700'>{error}</p>
                        </div>
                        <button className="bg-black px-8 py-2 text-white mt-5" onClick={handleSubmit} >Register</button>
                        <div className="mt-3 text-center">
                                Already have an account ?{' '}
                                <Link to='/' className='font-bold'>Sign In </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Register;