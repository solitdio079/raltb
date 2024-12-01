import { useState, useEffect } from "react"
import { Link, useFetcher } from "react-router-dom"
import { url } from "../utils/serverUrl"
import toast, {Toaster} from 'react-hot-toast'
export async function action({request}) {
    const formData = await request.formData()
    try {
        const req = await fetch(url + '/users/', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: formData
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error: error.message}
    }
}
export default function Register() {
    const fetcher = useFetcher()
    const departmentFields = ['Etudiant', 'Employee']
    const [departmentSwitch, setDepartmentSwitch] = useState(true)
    //const navigate = useNavigate()
     const toastOptions = {
       duration: 5000,
       id: Math.round(Math.random() * 1e9),
     }
    useEffect(() => {
        
         toast.dismiss()

         fetcher.data
           ? fetcher.data.error
             ? toast.error(fetcher.data.error, toastOptions)
             : toast.success(fetcher.data.msg, toastOptions)
           : ''
    }, [fetcher.data])
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img
              className="mx-auto lg:mx-0 w-52 lg:w-72"
              src={'/logo.png'}
            ></img>
            <h1 className="text-2xl font-bold mt-6">
              Formulaire d&apos;application!
            </h1>
            <p className="py-6">
              Vous serez notifiez par email a propos du statut de votre
              application! Avez-vous un compte?
            </p>
            <Link to={'/login'} className="btn btn-info">
              Connectez-vous
            </Link>
          </div>
          {fetcher.data ? (
            fetcher.data.msg ? (
              toast.success(fetcher.data.msg, toastOptions)
            ) : (
              <Link className="btn btn-primary" to="/">
                {toast.error(fetcher.data.error, toastOptions)} Reesayer
              </Link>
            )
          ) : (
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <fetcher.Form
                className="card-body"
                method="post"
                encType="multipart/form-data"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom Complet</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Moussa Diarra"
                    className="input input-bordered"
                    name="fullName"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Pays de residence</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mali"
                    className="input input-bordered"
                    name="country"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Picture</span>
                  </label>
                  <input
                    type="file"
                    name="picture"
                    className="file-input file-input-bordered w-full max-w-xs"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label-text">Travail</label>
                  <select
                    name="job"
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => {
                      if (departmentFields.includes(e.target.value)) {
                        setDepartmentSwitch(false)
                      } else {
                        setDepartmentSwitch(true)
                      }
                    }}
                  >
                    <option disabled></option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Etudiant">Etudiant</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                <div className={departmentSwitch ? 'hidden' : 'form-control'}>
                  <label className="label-text">Filiere</label>
                  <input
                    type="text"
                    placeholder="Ingenierie"
                    defaultValue={''}
                    className="input input-bordered"
                    name="department"
                  />
                </div>
                <Toaster />

                <div className="form-control mt-6">
                  <button className="btn btn-primary">
                    {fetcher.state === 'idle' ? (
                      'Envoyer'
                    ) : (
                      <span className="loading loading-spinner"></span>
                    )}
                  </button>
                </div>
              </fetcher.Form>
            </div>
          )}
        </div>
      </div>
    )
}