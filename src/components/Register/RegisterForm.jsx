import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Register.module.css';
import axios from 'axios';
import * as Yup from 'yup';

export default function RegisterForm({ setLoading }) {

    let [error, setError] = useState('');
    const RegisterCall = async (values) => {
        setLoading(true);
        await axios.post("https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup", values).then((res) => {
            //console.log(res);
            if (res.data.message === "Done") {
                console.log("Done");
            } else {
                setError(res.data.message);
            }
        }).catch((err) => {
            setError(err.response.data.message);
        })

        setLoading(false);
    }

    const schema = Yup.object({
        userName: Yup.string().required("Name Is Required"),
        email: Yup.string().required("Email Is Required").email('Email not Valid Format!'),
        password: Yup.string().required("Password Is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])/,
            'Password must contain at least one uppercase and one lowercase letter'),
        cPassword: Yup.string().required("Confirm Password Is Required").oneOf([Yup.ref('password')], 'Password not Match!!')
    });
    let formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
            cPassword: "",
        }, onSubmit: RegisterCall,
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
                <h2>Register</h2>
                {formik.errors.userName ? <p className='text-danger'> &#x2022; {formik.errors.userName}</p> : <></>}
                {formik.errors.email ? <p className='text-danger'> &#x2022; {formik.errors.email}</p> : <></>}
                {formik.errors.password ? <p className='text-danger'> &#x2022; {formik.errors.password}</p> : <></>}
                {formik.errors.cPassword ? <p className='text-danger'> &#x2022; {formik.errors.cPassword}</p> : <></>}
                {error !== '' ? <p className='text-danger'> &#x2022; {error}</p> : <></>}
                <form>
                    <div className={style.userbox}>
                        <input type="text" value={formik.values.userName} name="userName" onChange={formik.handleChange} required />
                        <label>User Name</label>
                    </div>
                    <div className={style.userbox}>
                        <input type="text" value={formik.values.email} name="email" onChange={formik.handleChange} required />
                        <label>Email</label>
                    </div>
                    <div className={style.userbox}>
                        <input type="password" value={formik.values.password} name="password" onChange={formik.handleChange} required />
                        <label>Password</label>
                    </div>
                    <div className={style.userbox}>
                        <input type="password" value={formik.values.cPassword} name="cPassword" onChange={formik.handleChange} required />
                        <label>Confirm Password</label>
                    </div>
                    <a className='me-auto' onClick={formik.handleSubmit}>
                        <span />
                        <span />
                        <span />
                        <span />
                        Register
                    </a>
                    <Link to='/login' className={style.registera}>
                        SignIn
                    </Link>
                </form>
            </div>
        </>
    )
}
