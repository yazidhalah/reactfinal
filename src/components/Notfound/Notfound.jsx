import React from 'react'
import styles from './Notfound.module.css';
import { useNavigate } from 'react-router-dom';

export default function Notfound() {

    let navigate = useNavigate();
    const backtohome = () => {
        navigate('/');
    }
    return (
        <>
            <div className={styles.body}>
                <div className={styles.div}>
                    <p className={styles.error}>E<span>r</span>ror</p>
                    <p className={styles.code}>4<span>0</span><span>4</span></p>
                </div>
                <div className={styles.divBack}>
                    <button className={styles.btnBack} onClick={backtohome}>Back to Home</button>
                </div>
            </div>
        </>
    )
}
