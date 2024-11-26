import { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'
import CategorieCardClient from './categoryCardClient'
export default function CategoryList() {
  const fetcher = useFetcher()
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/loaders/categories')
    }
  })
  return (
    <div className="flex flex-wrap">
      {fetcher.data ? (
        fetcher.data.map((item) => (
          <CategorieCardClient key={item._id} item={item} />
        ))
      ) : (
        <span className="loading loading-infinity"></span>
      )}
    </div>
  )
}
