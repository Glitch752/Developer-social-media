import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { useEffectOnce } from '../App.tsx';

// @ts-ignore
import styles from './Feed.module.css';

// @ts-ignore
import Posts from '../components/Posts.tsx';
// @ts-ignore
import CreatePost from '../components/CreatePost.tsx';
// @ts-ignore
import Navbar from '../components/Navbar.tsx';

function Feed(props) {
    const navigate = useNavigate();

    useEffectOnce(() => {
        props.authentication(navigate, 0);
    });

    return (
        <main>
            <Navbar />
            <div className={styles.contentGrid}>
                <div className={styles.contentGridLeft}>
                    <div className={styles.contentSection}>
                        <div className={styles.optionsPaneSelector}>
                            <div className={styles.optionsPaneSelectorItem}>
                                <div className={styles.optionsPaneSelectorGroup}>
                                    <svg className={styles.optionsPaneSelectorIcon} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M21,24H18V19a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2v5H3V19a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,3Z"/></svg>
                                    You
                                </div>
                            </div>
                            <div className={styles.optionsPaneSelectorItem}>
                                <div className={styles.optionsPaneSelectorGroup}>
                                    <svg className={styles.optionsPaneSelectorIcon} xmlns="http://www.w3.org/2000/svg" id="Layer_1" height="512" viewBox="0 0 24 24" width="512" data-name="Layer 1"><path d="m7.5 13a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-6a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5-1.5zm7.5 13.5a5.506 5.506 0 0 0 -5.5-5.5h-4a5.506 5.506 0 0 0 -5.5 5.5v3.5h3v-3.5a2.5 2.5 0 0 1 2.5-2.5h4a2.5 2.5 0 0 1 2.5 2.5v3.5h3zm2.5-11.5a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-6a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5-1.5zm6.5 13.5a5.506 5.506 0 0 0 -5.5-5.5h-3.5v3h3.5a2.5 2.5 0 0 1 2.5 2.5v3.5h3z"/></svg>
                                    Friends
                                </div>
                                <div className={styles.optionsPaneSelectorSub}>
                                    {
                                        ["James", "Martha"].map((name, index) => (
                                            <div className={styles.optionsPaneSelectorSubItem} key={index}>
                                                <svg className={styles.optionsPaneSelectorSubIcon} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M21,24H18V19a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2v5H3V19a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,3Z"/></svg>
                                                {name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentGridCenter}>
                    <CreatePost />
                    <div className={styles.posts}>
                        <Posts />
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
                                            <div className={styles.followedLanguageRemove}>X</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br />
                        <span className={styles.contentSectionTitle}>Recommended languages:</span>
                        <div className={styles.followedLanguages}>
                            {
                                ["Go", "Rust", "Java", "Kotlin", "C++", "C"].map((language, index) => {
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

export default Feed;