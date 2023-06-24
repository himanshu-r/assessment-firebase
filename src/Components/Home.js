import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import Passengers from './Passenger';

function Home({login }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {        
      navigate("/");
    }).catch((error) => {
    });

  }

  if (!login) {
    navigate('/');
    return null;
  }

  return (
    <div>
     <div className='flex p-10'>
          <div className='font-bold text-xl w-3/4'>
            Home Page
        </div>
        <div className='w-1/4 text-end'>
          <button  className='bg-black px-8 py-2 text-white' onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>
        <div >
          <Passengers/>
        </div>
</div>
  );
}

export default Home