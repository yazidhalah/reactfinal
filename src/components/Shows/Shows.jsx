import React, { useEffect, useState } from 'react'
import styles from '../../MovieCard.module.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import DetailsModal from '../DetailsModal/DetailsModal';
import ImageSlider from '../ImageSlider/ImageSlider';
import axios from 'axios';
import Paging from '../Paging/Paging';

export default function Shows() {

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [movie, setMovie] = useState({})
    const [tvList, setTvList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(500);
    const [genre, setGenre] = useState(0);
    let params = useParams();

    useEffect(() => {
        if (params) {
            setGenre(params.id);
            setPage(1); // Reset the page number when the genre changes
        }
    }, [params]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setSuccess(false);
            await axios
                .get(`https://api.themoviedb.org/3/discover/tv`, {
                    params: {
                        api_key: "4dc0a40e67ccc092899835b67beb1bfd",
                        page: page,
                        with_genres: genre,
                    },
                })
                .then((res) => {
                    setTvList(res.data.results);
                    setLoading(false);
                    setSuccess(true);
                    //setLastPage(res.data.total_pages);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        fetchData();
    }, [page, genre]);

    const openDetailsModal = (obj) => {

        setMovie(obj);
        setShowDetailsModal(true);
    }
    const closeDetailsModal = () => {
        setMovie(null);
        setShowDetailsModal(false);
    }

    const { token } = useSelector(({ token }) => token);
    let navigate = useNavigate();
    if (token === '') {
        navigate("/login")
    }

    //const { data, isLoading, isSuccess } = useGetTopRatedTVQuery();

    return (
        <>
            {
                !isLoading && isSuccess ?
                    <div className="container mt-5">
                        <div className={styles.pagingDiv}>
                            <h3 className='text-light'>Top TV Shows</h3>
                            <Paging setPage={setPage} page={page} lastPage={lastPage} />
                        </div>
                        <div className="row">
                            {
                                tvList.length > 0 ? tvList.map((mov, index) =>
                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 my-4 text-center" onClick={() => openDetailsModal(mov)}>
                                        <div className={styles.moviecard}>
                                            <div className={styles.moviedetails}>
                                                <h2 className={styles.movietitle}>{mov.name}</h2>
                                                <p className={styles.movierating}>{mov.overview}</p>
                                            </div>
                                            <span className={styles.ratebutton} >{(parseFloat(mov.vote_average) * 10).toFixed(2)}</span>
                                            <img src={"https://image.tmdb.org/t/p/original" + mov.poster_path} alt="Movie Poster" />
                                        </div>
                                    </div>
                                ) : <></>
                            }

                            {showDetailsModal && <DetailsModal showModal={showDetailsModal} closeModal={closeDetailsModal} TMObj={movie} TMType={movie ? movie.title ? 'movie' : 'tv' : ''} />}
                        </div>
                        <ImageSlider movList={tvList} />
                    </div>
                    : <Loading />}
        </>
    )
}
