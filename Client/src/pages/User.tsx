import { useNavigate, useParams } from 'react-router-dom';

// @ts-ignore
import { useEffectOnce } from '../App.tsx';
// @ts-ignore
import Navbar from '../components/Navbar.tsx';

// @ts-ignore
import styles from './User.module.css';

function User(props) {
    const navigate = useNavigate();

    const { userID } = useParams();

    useEffectOnce(() => {
        props.authentication(navigate, 0);
    });

    return (
        <main>
            <Navbar />
            <div className={styles.contentGrid}>
                <div className={styles.contentGridLeft}>

                </div>
                <div className={styles.contentGridCenter}>
                    <div className={styles.userContent}>
                        <div className={styles.userContentUser}>
                            <div className={styles.userContentUserPicture}></div>
                            <div className={styles.userContentUserName}>{userID}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentGridRight}>
                    
                </div>
            </div>
        </main>
    )
}

export default User;