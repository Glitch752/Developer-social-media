import { useNavigate, useParams } from 'react-router-dom';

// @ts-ignore
import { useEffectOnce } from '../App.tsx';
// @ts-ignore
import Navbar from '../components/Navbar.tsx';

// @ts-ignore
import styles from './User.module.css';

// @ts-ignore
import Posts from '../components/Posts.tsx';

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
                    <div className={styles.userBanner}></div>
                    <div className={styles.userContent}>
                        <div className={styles.userContentUser}>
                            <div className={styles.userContentUserPicture}></div>
                            <div className={styles.userContentUserName}>{userID}</div>
                        </div>
                        <span className={styles.userContentTitle}>Recent Posts</span>
                        <div className={styles.postsContainer}>
                            <Posts color={true} differentApiLink={`getUserPosts/${userID}`} />
                        </div>
                    </div>
                </div>
                <div className={styles.contentGridRight}>
                    <div className={styles.contentSection}>
                        <span className={styles.contentSectionTitle}>Followed languages:</span>
                        <div className={styles.followedLanguages}>
                            {
                                ["Javascript", "Python", "C#", "Typescript", "Ruby"].map((language, index) => {
                                    return (
                                        <div className={styles.followedLanguage} key={index}>
                                            <span className={styles.followedLanguageName}>{language}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default User;