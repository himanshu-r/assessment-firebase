import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';



function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate()


    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent to your Email.');
            setErrorMsg('')
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    return (
            
                <div className='container flex justify-center items-center max-w-screen h-screen'>
                    <div className='shadow-2xl rounded-lg p-10'>
                        <h2 className="font-bold">Forgot Password</h2>

                        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                        <input className='w-full p-2.5 border-solid border-2 my-2' placeholder='Enter Email' label='Email'  id='emailId' type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className='bg-black px-8 py-2 text-white mt-5' onClick={handleForgetPassword} >Send Link</button>
                        <Link to='/'> <button className='bg-black px-8 py-2 text-white mt-5' >Back to Login</button></Link>
                    </div>
                </div>
            


        )
}

export default ForgotPassword;