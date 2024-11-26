/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

export default function CategorieCardClient({ item }) {
  return (
    <Link
      to={`/category/${item.name}`}
      className="btn m-2 hover:bg-primary btn-sm text-white bg-black"
    >
      {item.name}
    </Link>
  )
}
