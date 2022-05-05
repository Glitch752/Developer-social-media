// @ts-ignore
import styles from '../pages/Feed.module.css';

function Comments(props) {
    let comments = [
        {
            id: 1,
            author: "Author name",
            content: "This is a comment",
            comments: [
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: []
                }
            ]
        }
    ];

    function getComments(comments) {
        if(comments.length === 0) return null;
        return (
            comments.map((comment, index) => {
                return (
                    <div className={styles.comment} key={index}>
                        <div className={styles.commentAuthor}>
                            <span className={styles.commentAuthorName}>{comment.author}</span>
                            <div className={styles.commentAuthorProfile}></div>
                        </div>
                        <div className={styles.commentText}>{comment.content}</div>
                        <div className={styles.commentReplies}>
                            {getComments(comment.comments)}
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div className={styles.comments}>
            {
                getComments(comments)
            }
        </div>
    )
}

export default Comments;