/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { useEffect } from "react"
import { useFetcher } from "react-router-dom"
import {
  Pagination,
  Autoplay,
  Navigation,
  Scrollbar,
  Mousewheel,
} from 'swiper/modules'
import { url } from '../utils/serverUrl'
export default function UserAvatar({loaderRoute}) {
    const fetcher = useFetcher()
    useEffect(() => {
        if (!fetcher.data && fetcher.state === 'idle') fetcher.load(loaderRoute)
        console.log(fetcher.data)
    }, [fetcher.data])
    return (
      <div className="p-10">
        <Swiper
          modules={[Pagination, Autoplay, Scrollbar, Mousewheel, Navigation]}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 3,
            },
            865: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
            1500: {
              slidesPerView: 6,
            },
            1700: {
              slidesPerView: 8,
            },
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
         
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="m-5"
        >
          {fetcher.data
            ? fetcher.data.map((item) => (
                <SwiperSlide
                  key={item._id}
                  className="flex flex-col justify-center items-center"
                >
                  <div className="avatar mx-auto">
                    <div className="w-32 rounded-full">
                      <img src={url + '/' + item.picture} />
                    </div>
                  </div>
                  <p className='m-2 '> {item.fullName} </p>
                  <p className="badge text-white mx-4 badge-primary"> {item.role} </p>
                </SwiperSlide>
              ))
            : ''}
        </Swiper>
      </div>
    )
}