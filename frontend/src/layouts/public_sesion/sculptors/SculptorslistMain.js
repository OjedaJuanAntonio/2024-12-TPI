import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import SculptorCardMain from "./SculptorCardMain";

function AutoPlay() {
  const settings = {dots: true,infinite: true,slidesToShow: 4,slidesToScroll: 1,autoplay: true,speed: 1500,autoplaySpeed: 1500,cssEase: "linear"};
  return (
    <div className="slider-container" style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>Artistas Invitados</h2>
      <Slider {...settings}>
        <div>
          <SculptorCardMain/>
        </div>
        <div>
          <SculptorCardMain/>
        </div>
        <div>
          <SculptorCardMain/>
        </div>
        <div>
          <SculptorCardMain/>
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
