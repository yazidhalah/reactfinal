import { Modal } from 'react-bootstrap';
import RatingStars from 'react-rating-stars-component';
import styles from "./RatingModal.module.css";
import axios from 'axios';
export default function RatingModal({ showModal, closeModal, TMObj, TMType }) {

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
                console.log(response);
                closeModal();
            }
        } catch (error) {
            console.log('Error rating movie:', error);
        }
    };

    return (
        <Modal show={showModal}
            onHide={closeModal}
            backdropClassName={styles.modalBackdrop}
            contentClassName={styles.modalContent}

        >
            <Modal.Body className={styles.bodyImage} style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + (TMObj ? TMObj.poster_path ? TMObj.poster_path : "" : "")})` }}>
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
    );
};