/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import { useFetcher } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'
import { url } from '../../utils/serverUrl'
export default function UserCardAdmin({ item }) {
    const fetcher = useFetcher()
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
      <>
        <div className="card bg-primary w-96 shadow-xl m-2">
          <figure>
            <img src={url +"/"+ item.picture} alt="Shoes" />
          </figure>
          <div className="card-body text-white rounded-md">
            <h2 className="card-title">
              {item.fullName}
              <div className="badge badge-secondary"> {item.email} </div>
            </h2>
            <p> {item.country} </p>
            <p> {item.job} </p>
            <div className="card-actions justify-end">
              <fetcher.Form action={"/admin/actions/changeRole"} className="card-body bg-black rounded-md" method="post">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <input
                    type="text"
                    placeholder="President"
                                    className="input input-bordered text-black"
                                    defaultValue={item.role}
                    name="role"
                    required
                                />
                                <input type="hidden" name="id" value={item._id} />
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
          </div>
        </div>
      </>
    )
}