//import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import InfiniteScroll from 'react-infinite-scroll-component'
import { FaPlus } from 'react-icons/fa6'
import { url } from '../../../utils/serverUrl'
import PostCardAdmin from '../../../components/admin/postCardAdmin'
import InfiniteEntity from '../../../components/infiniteEntity'
import AnimatedLayout from '../../../../animation/AnimatedLayout'
//import AnimatedLayout from '../../animation/animatedLayout'
//import ProductCard from '../../components/productCard'

export default function GetAllPosts() {
  //const firstItems = useLoaderData()
  //const [items, setItems] = useState(firstItems)
  //const [cursor, setCursor] = useState(null)
  //const [hasMore, setHasMore] = useState(true)

  /*useEffect(() => {
    cursor ? fetchMoreData() : ''
  }, [cursor, firstItems])*/

  /*const fetchMoreData = async () => {
    try {
      const response = await fetch(
        url + `/admin/post/?cursor=${
          cursor || ''
        }&limit=${5}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const moreItems = await response.json()
      console.log(moreItems)
      setItems((prevItems) => [...prevItems, ...moreItems])

      moreItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error)
    }
  }*/
  return (
    <AnimatedLayout>
      <div className="flex flex-col justify-center w-full ">
        <div className="flex justify-center">
          <h1 className="text-3xl my-3 border-b-2 border-primary font-bold lg:text-5xl">
            {' '}
            All Posts
          </h1>
        </div>
        <Link
          to="/admin/posts/create"
          className="btn m-2 bg-primary hover:bg-secondary btn-lg text-white"
        >
          <FaPlus className="w-8 h-8" />
          Add New
        </Link>
        <InfiniteEntity
          loaderRoute={'/loaders/posts'}
          fetchMoreURL={url + '/posts/'}
          UnitEntity={PostCardAdmin}
        />
        {/*items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(items[items.length - 1]._id)}
          hasMore={hasMore}
          loader={<span className="loading loading-infinity loading-lg"></span>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className="text-white">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-col flex-wrap text-white w-full">
            {items.map((item) => (
             <PostCardAdmin item={item} key={item._id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p className='text-center text-white'>No Posts</p>
      )*/}
      </div>
    </AnimatedLayout>
  )
}
