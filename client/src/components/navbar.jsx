/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {FaBars} from 'react-icons/fa6'
import {NavLink, Form} from 'react-router-dom'
export default function Navbar({user}) {
    return (
      <div className="navbar bg-base-100 ">
        <div className="navbar-start flex items-center">
          <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                <FaBars className="w-5 h-5 text-white" />
              </label>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-primary text-white min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <NavLink to={'/home'} className="hover:bg-secondary">
                    Accueil
                  </NavLink>
                </li>

                <li>
                  <a className="hover:bg-secondary">Tweets</a>
                </li>
                <li>
                  <NavLink to={'/admin'} className="hover:bg-secondary">
                    Mon Compte
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">
            <img width={120} src={'/logo.png'} alt={'logo'} />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={'/home'} className="hover:bg-secondary">
                Accueil
              </NavLink>
            </li>

            <li>
              <a>Tweets</a>
            </li>
            <li>
              <NavLink to={'/admin'} className="hover:bg-secondary">
                Mon Compte
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <Form method="post" action={'/auth/logout'}>
              <button className="btn bg-red-600 text-white border-white">
                Logout
              </button>
            </Form>
          ) : (
            ''
          )}
        </div>
      </div>
    )
}