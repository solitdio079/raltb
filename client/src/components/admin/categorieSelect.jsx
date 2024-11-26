/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'

export default function CategoriesSelect({ name, defaultValue }) {
  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data) fetcher.load('/loaders/categories')
  }, [fetcher.data])
  return (
    <>
      <select className="select w-full" name={name} defaultValue={defaultValue}>
        <option disabled>Pick a category</option>
        {fetcher.data && fetcher.data.length > 0
          ? fetcher.data.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))
          : ''}
      </select>
    </>
  )
}
