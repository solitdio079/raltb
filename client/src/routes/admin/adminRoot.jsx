import { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaEnvelopeOpenText, FaShapes, FaUsers, FaUser } from 'react-icons/fa6'
import AnimatedOutlet from '../../../animation/animatedOutlet'
import { UserContext } from '../contexts/UserContext'
import { url } from '../../utils/serverUrl'
export default function AdminRoot() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const isConnected = Boolean(user)
    useEffect(() => {
      async function getUser() {
        try {
          const response = await fetch(
            url + '/auth/login/status',
            {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
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
          <Navbar user={user} />{' '}
          <div className="flex flex-col lg:flex-row p-5">
            <ul className="menu menu-horizontal w-full justify-center lg:justify-start lg:w-96 lg:menu-vertical text-white rounded-box">
              {user.isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to={'/admin/posts/view'}
                      className="btn btn-outline bg-primary text-white border-white m-2 hover:bg-secondary"
                    >
                      <FaEnvelopeOpenText className="h-5 w-5" />
                      Posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/admin/categories/view'}
                      className="btn btn-outline bg-primary m-2 text-white border-white hover:bg-secondary"
                    >
                      <FaShapes className="h-5 w-5" />
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={'/admin/users/view'}
                      className="btn btn-outline bg-primary m-2 text-white border-white hover:bg-secondary"
                    >
                      <FaUsers className="h-5 w-5" />
                      Users
                    </NavLink>
                  </li>
                </>
              ) : (
                ''
              )}

              <li>
                <NavLink
                  to={`/admin/profile/${user._id}`}
                  className="btn btn-outline bg-primary m-2 text-white border-white hover:bg-secondary"
                >
                  <FaUser className="h-5 w-5" />
                  Profile
                </NavLink>
              </li>
            </ul>
            <AnimatedOutlet />
          </div>
          <Footer />
        </UserContext.Provider>
      ) : (
          <div className="w-full flex flex-col justify-center mx-auto">
            <img src={"/logo.png"} className='m-5' width={120} />
          <Link to="/login" className="my-5 mx-auto btn btn-warning">
            Connectez-vous
          </Link>
        </div>
      )}
    </>
  )
}
