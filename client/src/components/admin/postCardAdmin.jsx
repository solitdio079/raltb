/* eslint-disable react/prop-types */
import { FaClock, FaPencil, FaShapes } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
export default function PostCardAdmin({ item }) {
  return (
    <div className="flex flex-col border-primary text-gray-800 border-b-2 p-2 w-full my-3">
      <div className="flex justify-between">
        <Link
          to={`/home/post/${item._id}`}
          className="text-2xl text-black lg:text-3xl font-bold"
        >
          {' '}
          {item.title}
        </Link>
        <Link
          to={`/admin/posts/edit/${item._id}`}
          className="btn  border-white btn-outline btn-sm hover:btn-warning"
        >
          <FaPencil />
          Edit
        </Link>
      </div>
      <div className="flex">
        <span className="flex items-center text-sm justify-between  my-2">
          {' '}
          <FaShapes className="mr-2" /> {item.category.name}{' '}
        </span>
        <span className="flex text-sm items-center justify-between  my-2 ml-4">
          {' '}
          <FaClock className="mr-2" />{' '}
          {new Date(item.createdAt).toLocaleDateString()}{' '}
        </span>
      </div>
    </div>
  )
}
