import { useEffect, useState } from 'react'
import { url } from '../../../utils/serverUrl'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import UserCardAdmin from '../../../components/admin/userCardAdmin'
//import AnimatedLayout from '../../../../animation/AnimatedLayout'
export async function loader({ request }) {
  const urL = new URL(request.url)
  const q = urL.searchParams.get('q')
  try {
    const response = await fetch( url + `/users/search?q=${q}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const items = await response.json()
    console.log(items)
    return [items, q]
  } catch (error) {
    return { error: error.message }
  }
}
export default function UserSearch() {
    const [users, q] = useLoaderData()
    const  [query, setQuery] = useOutletContext()
    const navigate = useNavigate()
    useEffect(()=> {
        users.length > 0 ? '' : navigate("/admin/users/view") 
        setQuery(q)
        if (query === '') navigate('/admin/users/view')
    })
    return ( <
     >
        {' '}
        <div className="w-full flex justify-center m-1">
          {' '}
          {users.length} resultats{' '}
        </div>{' '}
        {users.length > 0 ? (
          <div className="flex flex-col lg:flex-row space-x-5  items-center flex-wrap text-white w-full">
            {users.map((item) => (
              <UserCardAdmin item={item} key={item._id} />
            ))}
          </div>
        ) : (
          ''
        )}
      </>
    )
}