import { useSharedData } from "../context";
import MainLayout from "../components/mainLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Pagination, Navigation]);
import Image from "next/image";
import React from "react";
import urlMonitor from "../utils/urlMonitor";

export default function Home() {
  // const state = useSharedData();
  React.useEffect(() => {
    urlMonitor();
  }, []);

  return (
    <MainLayout>
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SwiperSlide key={`slide${item}`}>
              <Image
                alt={`slide${item}`}
                src={`/slide${item}.jpg`}
                layout="fill"
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </MainLayout>
  );
}
