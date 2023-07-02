import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ImageSlider({ movList }) {

    useEffect(() => {
        const handleResize = () => {
            const sliderWrapper = document.getElementById('image-slider-wrapper');
            if (sliderWrapper) {
                const height = window.innerHeight || document.documentElement.clientHeight;
                sliderWrapper.style.height = `${height}px`;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
    };

    return (
        <>

            <div id="image-slider-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: -1, opacity: 0.25 }}>
                <Slider {...settings}>
                    {movList.length > 0 ? (
                        movList.map((mov, index) => (
                            <div key={index}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${mov.poster_path}`}
                                    alt={`Slide ${index + 1}`}
                                    style={{ objectFit: 'fill', width: '100%', height: '100vh' }}
                                />
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </Slider>
            </div>

        </>
    );
}
