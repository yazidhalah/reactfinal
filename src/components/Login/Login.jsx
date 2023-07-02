import React from 'react'
import style from './Login.module.css';
import FallingDots from '../FallingDots/FallingDots';
import LoginForm from './LoginForm';
import { useState } from 'react';
import Loading from '../Loading/Loading';

export default function Login() {
    let [isLoading, setLoading] = useState(false);
    return (
        <>
            <div className={style.body}>
                {isLoading ? <Loading /> : <></>}
                <FallingDots />
                <LoginForm setLoading={setLoading} />
            </div>
        </>
    )
}
