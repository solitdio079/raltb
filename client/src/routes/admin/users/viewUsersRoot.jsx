import {useState} from 'react'
import { Outlet, Form, useSubmit } from 'react-router-dom'
import AnimatedLayout from '../../../../animation/AnimatedLayout'
export default function ViewUsersRoot() {
    const submit = useSubmit()
    const [query, setQuery] = useState(null)
  return (
    <AnimatedLayout>
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full p-10 justify-center">
          <h1 className="text-3xl my-3 border-b-2 border-primary font-bold lg:text-5xl">
            {' '}
            Tous les Membres
          </h1>
          <Form action="/admin/users/view/search">
            <div className="form-control">
              <input
                type="text"
                name="q"
                defaultValue={query ? query : ''}
                placeholder="Search"
                className="input input-bordered w-auto"
                onChange={(event) => {
                  setQuery(event.target.value)
                  const isFirstSearch = query == null
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  })
                }}
              />
            </div>
          </Form>
        </div>

        <Outlet context={[query, setQuery]} />
      </div>
    </AnimatedLayout>
  )
}
