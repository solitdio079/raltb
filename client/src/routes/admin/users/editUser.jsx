import { useEffect, useState } from "react"
import { useFetcher, useLoaderData } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'
import { url } from "../../../utils/serverUrl"
import AnimatedLayout from "../../../../animation/AnimatedLayout"
export async function loader({params}) {
    const {id} = params 

    try {
        const req = await fetch( url + `/users/${id}`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()

        return response
    } catch (error) {
        return {error: error.message}
    }
    
}
export async function action({params,request}){
    const formData = await request.formData()
    let fetchMethod = "PUT"
    let fetcHeaders = {}
    const {id} = params
    let fetchBody = formData


    if (formData.get("picture").name === "") {
        fetchMethod = "PATCH"
        fetcHeaders = { 'Content-Type': 'application/json' }
        fetchBody = JSON.stringify(Object.fromEntries(formData))
    } 
    
  try {
     // console.log(fetchMethod, fetcHeaders)
        const req = await fetch(url + `/users/${id}`, {
            method: fetchMethod,
            mode: 'cors',
            credentials: 'include',
            headers: fetcHeaders,
            body: fetchBody
        }) 
        const response = await req.json()
        return response
    } catch (error) {
        return {error: error.message}
    }
}
export default function EditUser() {
    const fetcher = useFetcher()
  const user = useLoaderData()
   const departmentFields = ['Etudiant', 'Employee']
    const [departmentSwitch, setDepartmentSwitch] = useState(true)

     const toastOptions = {
       duration: 5000,
     }
     useEffect(() => {
       if (fetcher.data) {
         toast.dismiss()
         fetcher.data.msg
           ? toast.success(fetcher.data.msg, toastOptions)
           : toast.error(fetcher.data.error, toastOptions)
       }
       //if(editor) setEditorContent(editor.getJSON())
     }, [fetcher.data])
     
    return (
      <AnimatedLayout>
        <div className="flex flex-col justify-center w-full items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src={url + '/' + user.picture} />
            </div>
          </div>
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
                defaultValue={user.fullName}
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
                defaultValue={user.country}
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
                defaultValue={user.email}
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
              />
            </div>
            <div className="form-control">
              <label className="label-text">Travail</label>
              <select
                name="job"
                defaultValue={user.job}
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => {
                  if (departmentFields.includes(e.target.value)) {
                    setDepartmentSwitch(false)
                  } else {
                    setDepartmentSwitch(true)
                  }
                }}
              >
                <option disabled>Profession</option>
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
            <div className="form-control">
              <label className="label-text">Role</label>
              <input name="role" type="text" value={user.role} readOnly />
            </div>
            <Toaster />

            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {fetcher.state === 'idle' ? (
                  'Changer'
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
          </fetcher.Form>
        </div>
      </AnimatedLayout>
    )
}