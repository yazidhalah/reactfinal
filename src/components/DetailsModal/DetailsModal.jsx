import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import RatingStars from 'react-rating-stars-component';
import styles from "./DetailsModal.module.css";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ErrorImg from '../../No_Image_Available.jpg'
export default function DetailsModal({ showModal, closeModal, TMObj, TMType }) {

    let [imgArr, setImgArr] = useState([]);
    let [castArr, setCastArr] = useState([]);
    const createtokenApi = async () => {
        var ss = '';
        await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new', {
            params: {
                "api_key": "4dc0a40e67ccc092899835b67beb1bfd"
            }
        }).then((res) => {
            ss = res.data.guest_session_id;
        }).catch((err) => {
            console.log("error");
            console.log(err);
        })
        return ss;
    }

    const handleRatingChange = async (newRating) => {
        try {
            var sId = await createtokenApi();
            if (sId !== '') {
                const response = await axios.post(
                    `https://api.themoviedb.org/3/${TMType}/${TMObj.id}/rating`,
                    {
                        value: newRating
                    },
                    {
                        params: {
                            api_key: '4dc0a40e67ccc092899835b67beb1bfd',
                            guest_session_id: sId
                        }
                    }
                );
                //console.log(response);
                closeModal();
            }
        } catch (error) {
            console.log('Error rating movie:', error);
        }
    };

    const getImages = async () => {
        try {
            await axios.get(`https://api.themoviedb.org/3/${TMType}/${TMObj.id}/images`, {
                params: {
                    api_key: '4dc0a40e67ccc092899835b67beb1bfd'
                }
            }).then((res) => {

                setImgArr(res.data.backdrops);
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {

        }
    }


    const getCast = async () => {
        await axios.get(`https://api.themoviedb.org/3/${TMType}/${TMObj.id}/credits`, {
            params: {
                api_key: '4dc0a40e67ccc092899835b67beb1bfd'
            }
        }).then((res) => {
            //console.log(res.data.cast);
            setCastArr(res.data.cast);
            //setImgArr(res.data.backdrops);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getCast()
        getImages()
    }, [])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (

        <Modal show={showModal}
            onHide={closeModal}
            backdropClassName={styles.modalBackdrop}
            contentClassName={styles.modalContent}
            dialogClassName={styles.modalDialog}
        >
            <Modal.Body className={styles.bodyImage}>
                <div className='row'>
                    <div className={`col-8 overflow-auto ${styles.h32vw}`}>

                        <h3 className='text-center mb-4'>{TMObj ? TMObj.title ? TMObj.title : TMObj.name : ""} <span> {TMObj.release_date} </span></h3>
                        <p>{TMObj ? TMObj.overview : ""}</p>
                        <div className='row'>
                            {castArr.length > 0 ? castArr.slice(0, 12).map((actor, index) => {
                                return (
                                    <div className='col-2' key={index}>
                                        <img className='w-100 h-75 object-fit-fill border rounded'
                                            src={actor.profile_path !== null ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : ErrorImg}
                                            alt="" />
                                        <h6>{actor.name} <br /> <small>{actor.character}</small></h6>
                                    </div>
                                )
                            }) : <></>}
                        </div>
                    </div>
                    <div className='col-4'>
                        <Slider {...settings}>
                            {
                                imgArr.length > 0 ? imgArr.slice(0, 20).map((img) =>
                                    <div key={img.file_path}>
                                        <img className='w-100 object-fit-fill border rounded' src={`${"https://image.tmdb.org/t/p/original" + img.file_path}`} alt='' />
                                    </div>
                                ) : <></>
                            }
                        </Slider>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <RatingStars
                    count={10}
                    size={50}
                    value={0}
                    onChange={handleRatingChange}
                />
            </Modal.Footer>
        </Modal>
    )
}
