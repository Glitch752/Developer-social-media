import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { useEffectOnce } from '../App.tsx';
// @ts-ignore
import Navbar from '../components/Navbar.tsx';

// @ts-ignore
import styles from './User.module.css';

function User(props) {
    const navigate = useNavigate();

    useEffectOnce(() => {
        props.authentication(navigate, 0);
    });

    return (
        <main>
            <Navbar />
            <span>
                User content
            </span>
        </main>
    )
}

export default User;