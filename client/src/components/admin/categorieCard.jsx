/* eslint-disable react/prop-types */
import { FaX } from 'react-icons/fa6'
import { Form } from 'react-router-dom'
export default function CategorieCard({ name, id }) {
  return (
    <button className="btn m-2 hover:bg-primary btn-sm text-white bg-black">
      {name}
      <Form method="post" action={`/admin/categories/delete/${id}`}>
        <button
          className="btn btn-xs btn-outline text-white border-white hover:bg-red-700"
          type="submit"
        >
          <FaX className="w-3 h-3" />
        </button>
      </Form>
    </button>
  )
}
