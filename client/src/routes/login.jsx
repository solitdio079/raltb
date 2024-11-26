import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import { url } from '../utils/serverUrl'
import toast, { Toaster } from 'react-hot-toast'
export async function action({ request }) {
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)
  try {
    const req = await fetch(url + '/auth/login/email', {
      method: 'POST',
      credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj),
    })
    const response = await req.json()
    return response
  } catch (error) {
    return { error: error.message }
  }
}
export default function Login() {
    const fetcher = useFetcher()
      useEffect(() => {
        const toastOptions = {
          duration: 5000,
          id: Math.round(Math.random() * 1e9),
        }
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
          <img className="mx-auto lg:mx-0 w-52 lg:w-72" src={'/logo.png'}></img>
          <h1 className="text-2xl font-bold mt-6">
           Connectez-vous!
          </h1>
          <p className="py-6">
            Vous serez notifiez par email!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <fetcher.Form
            className="card-body"
            method="post"
          >
            
           
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
           
            
            
            <Toaster />

            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {fetcher.state === 'idle' ? (
                  'Se Connecter'
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  )
}
