import { useState, useEffect } from 'react'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import AnimatedOutlet from '../../animation/animatedOutlet'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import { url } from '../utils/serverUrl'
export default function Root() {
   const navigate = useNavigate()
   const [user, setUser] = useState(null)
   const isConnected = Boolean(user)
   useEffect(() => {
     async function getUser() {
       try {
         const response = await fetch(url + '/auth/login/status', {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
         })
         const potUser = await response.json()
         //console.log(potUser);
         potUser.msg ? navigate('/login') : setUser(potUser)
       } catch (error) {
         return { msg: error.message }
       }
     }
     if (!isConnected) {
       getUser()
     }
   }, [isConnected, navigate])
    
  return (
    <>
      {isConnected ? (
        <UserContext.Provider value={user}>
          {' '}
          <Navbar user={user} />
          <AnimatedOutlet />
          <Footer />
        </UserContext.Provider>
      ) : (
        <div className="w-full flex flex-col justify-center mx-auto">
          <img src={'/logo.png'} className="m-5" width={120} />
          <Link to="/login" className="my-5 mx-auto btn btn-warning">
            Connectez-vous
          </Link>
        </div>
      )}
    </>
  )
}
