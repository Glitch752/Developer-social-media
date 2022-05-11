import { useState } from "react";

// @ts-ignore
import styles from './Comments.module.css';
// @ts-ignore
import CommentCreator from './CommentCreator.tsx';

function Comments(props) {
    let comments = [
        {
            id: 1,
            author: "Author name",
            content: "This is a really long comment. This line should be able to wrap to the next line since it is so long. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
            comments: [
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: [
                        {
                            id: 2,
                            author: "Author name 2",
                            content: "This is a reply to a comment",
                            comments: []
                        },]
                },
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: []
                },
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: [
                        {
                            id: 2,
                            author: "Author name 2",
                            content: "This is a reply to a comment",
                            comments: [
                                {
                                    id: 2,
                                    author: "Author name 2",
                                    content: "This is a reply to a comment",
                                    comments: []
                                },]
                        },]
                },
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: []
                },
                {
                    id: 2,
                    author: "Author name 2",
                    content: "This is a reply to a comment",
                    comments: []
                },
            ]
        },
        {
            id: 2,
            author: "Author name 2",
            content: "This is a reply to a comment",
            comments: []
        },
    ];

    return (
        <>
            <CommentCreator showButton={true} />
            <div className={styles.comments}>
                {
                    getComments(comments)
                }
            </div>
        </>
    )
}
export default Comments;

function getComments(comments) {
    if(comments.length === 0) return null;
    return (
        comments.map((comment, index) => {
            return (
                <Comment key={index} comment={comment} />
            )
        })
    )
}

function Comment(props) {
    const [isReplying, setIsReplying] = useState(false);

    const reply = () => {
        setIsReplying(true);
    }

    return (
        <div className={styles.comment}>
            <div className={styles.commentAuthor}>
                <span className={styles.commentAuthorName}>{props.comment.author}</span>
                <div className={styles.commentAuthorProfile}></div>
            </div>
            <div className={styles.commentText}>{props.comment.content}</div>
            <div className={styles.commentButtons}>
                <div className={styles.commentButton} onClick={() => reply()}>Reply</div>
                <div className={styles.commentButton}>Report</div>
            </div>
            { isReplying ? <CommentCreator showButton={false} /> : null }
            <div className={styles.replyLine}></div>
            <div className={styles.commentReplies}>
                {getComments(props.comment.comments)}
            </div>
        </div>
    )
}