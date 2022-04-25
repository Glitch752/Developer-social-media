import { useNavigate } from 'react-router-dom';

// @ts-ignore
import styles from './NotFound.module.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <main>
            <div className={styles.container}>
                <h2>404 - Not Found</h2>
                <button className={styles.goBackButton} onClick={() => navigate('/')}>Go home</button>
            </div>
        </main>
    )
}

export default NotFound;