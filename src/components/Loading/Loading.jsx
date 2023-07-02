import React from 'react'
import styles from './Loading.module.css';
export default function Loading() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.main}>
                    <div className={`${styles.balls} ${styles.balls1}`}>
                        <div className={`${styles.ball} ${styles.ball1}`} />
                        <div className={`${styles.ball} ${styles.ball2}`} />
                        <div className={`${styles.ball} ${styles.ball3}`} />
                        <div className={`${styles.ball} ${styles.ball4}`} />
                    </div>
                    <div className={`${styles.balls} ${styles.balls2}`}>
                        <div className={`${styles.ball} ${styles.ball1}`} />
                        <div className={`${styles.ball} ${styles.ball2}`} />
                        <div className={`${styles.ball} ${styles.ball3}`} />
                        <div className={`${styles.ball} ${styles.ball4}`} />
                    </div>
                </div>
            </div>
        </>
    )
}
