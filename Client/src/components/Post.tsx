import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';

// @ts-ignore
import styles from '../pages/Feed.module.css';

function Post(props) {
    return (
        <div className={styles.post}>
            <span className={styles.postHeader}>{props.data.title}</span>
            <div className={styles.postAuthor}>
                <span className={styles.postAuthorName}>{props.data.author}</span>
                <div className={styles.postAuthorProfile}></div>
            </div>
            <span className={styles.postBody}>
                {props.data.sections.map((section, index) => {
                    if(section.type === "Text") {
                        return <div className={styles.postBodyText} key={index}>{section.content}</div>;
                    } else if(section.type === "Code") {
                        return <pre className={styles.postBodyCode} key={index}>
                                    <code dangerouslySetInnerHTML={
                                        {__html: hljs.highlightAuto(section.content).value}
                                    }></code>
                                </pre>;
                    }
                })}
            </span>
        </div>
    )
}

export default Post;