import React from 'react'
import styles from "./FallingDots.module.css"

export default function FallingDots() {

    const randomNumbersArray = Array.from({ length: 25 }, () => Math.floor(Math.random() * 50) + 1);
    const randomNumbersArray2 = Array.from({ length: 25 }, () => Math.floor(Math.random() * 50) + 1);

    return (
        <>
            <div className={styles.container1}>
                <div className={styles.bubbles}>
                    {randomNumbersArray.map((number, index) =>
                        <span className={styles.span1} key={`${index}_${number}`} style={{ '--ii': number }}></span>
                    )}
                    {randomNumbersArray2.map((number, index) =>
                        <span className={styles.span2} key={`${index}_${number}`} style={{ '--i': number }}></span>
                    )}
                </div>
            </div>
        </>
    )
}
