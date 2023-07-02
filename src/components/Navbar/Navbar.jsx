import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { removeToken } from '../../redux/features/Auth/AuthSlice';
import { useGetMoviesCategoriesQuery, useGetTVCategoriesQuery } from '../../redux/services/MoviesAPI';
export default function Navbar() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const logout = () => {
        dispatch(removeToken());
        navigate('/login');
    }
    const MovieCat = useGetMoviesCategoriesQuery();
    const TVCat = useGetTVCategoriesQuery()
    //console.log(TVCat);
    return (
        <nav className="navbar navbar-expand-lg text-light fixedNav">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="">Yazid's Project</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-light" aria-current="page" to="">Home</Link>
                        </li>
                        <li>
                            <a href="#">Movies ▾</a>
                            <ul className="dropdown height-100vh overflow-auto">
                                {MovieCat.isSuccess && !MovieCat.isLoading ? MovieCat.data.genres.map((ele) =>
                                    <li key={ele.id}><Link to={`movies/${ele.id}`}>{ele.name}</Link></li>
                                ) : <></>}
                            </ul>
                        </li>
                        <li>
                            <a href="#">TV Shows ▾</a>
                            <ul className="dropdown height-100vh overflow-auto">
                                {TVCat.isSuccess && !TVCat.isLoading ? TVCat.data.genres.map((ele) =>
                                    <li key={ele.id}><Link to={`shows/${ele.id}`}>{ele.name}</Link></li>
                                ) : <></>}
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link cursor-pointer text-light" onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
