import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import EventcardMain from './EventcardMain';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


function EventlistMain() {
    return (
      <>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Proximos Eventos</h2>
        <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={3} coverflowEffect={{rotate: 50,stretch: 0,depth: 100,modifier: 1,slideShadows: false, }}pagination={true}modules={[EffectCoverflow, Pagination]}className="mySwiper" style={{ margin: '0 auto' }}>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EventcardMain />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EventcardMain />
          </SwiperSlide>
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <EventcardMain />
          </SwiperSlide>
        </Swiper>
      </>
    );
  }

export default EventlistMain;
