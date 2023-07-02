import React from 'react'
import style from './Login.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createToken } from '../../redux/features/Auth/AuthSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function LoginForm({ setLoading }) {

    let navigate = useNavigate();
    let [error, setError] = useState('');
    const dispatch = useDispatch();

    const LoginCall = async (values) => {
        setLoading(true);
        await axios.post("https://king-prawn-app-3mgea.ondigitalocean.app/auth/login", values).then((res) => {
            if (res.data.message) {
                dispatch(createToken(res.data.access_token));
                //localStorage.setItem('userToken', res.data.access_token);
                navigate('/');
            }
        }).catch((err) => {
            setError(err.response.data.message);
        })
        setLoading(false);
    }

    const schema = Yup.object({
        email: Yup.string().required("Email Is Required").email('Email not Valid Format!'),
        password: Yup.string().required("Password Is Required")
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, onSubmit: LoginCall,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: schema
    })
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            formik.handleSubmit();
        }
    };
    return (
        <>

            <div className={style.loginbox} onKeyPress={handleKeyPress}>
                <h2>Login</h2>
                {formik.errors.email ? <p className='text-danger'> &#x2022; {formik.errors.email}</p> : ""}
                {formik.errors.password ? <p className='text-danger'> &#x2022; {formik.errors.password}</p> : ""}
                {error !== '' ? <p className='text-danger'> &#x2022; {error}</p> : <></>}

                <form>
                    <div className={style.userbox}>
                        <input type="text" name="email" required
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                        <label>Email</label>
                    </div>
                    <div className={style.userbox}>
                        <input type="password" name="password" required
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                        <label>Password</label>
                    </div>
                    <a className='me-auto' onClick={formik.handleSubmit}>
                        <span />
                        <span />
                        <span />
                        <span />
                        Login
                    </a>
                    <Link to='/register' className={style.registera}>
                        SignUp
                    </Link>
                </form>
            </div></>
    )
}
