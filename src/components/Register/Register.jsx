
import React, { useState } from 'react'
import style from './Register.module.css';
import Loading from '../Loading/Loading';
import FallingDots from '../FallingDots/FallingDots';
import RegisterForm from './RegisterForm';

export default function Register() {

    let [isLoading, setLoading] = useState(false);

    return (
        <>
            <div className={style.body} >
                {isLoading ? <Loading /> : <></>}
                <FallingDots />
                <RegisterForm setLoading={setLoading} />
            </div>
        </>
    )
}
