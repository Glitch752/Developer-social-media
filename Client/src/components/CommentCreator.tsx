import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// @ts-ignore
import styles from '../pages/Feed.module.css';

function CommentCreator() {
    const [creatingComment, setCreatingComment] = useState(false);

    const comment = useRef(null);
    const errorMessage = useRef(null);

    const error = (message: string) => {
        errorMessage.current.innerHTML = message;
    }

    const post = () => {
        if(comment.current.value.replace(/\s/g, '').length === 0) {
            error('Comment cannot be empty');
            return;
        }

        error("");

        // TODO: post comment
        
        setCreatingComment(false);
    }

    useEffect(() => {
        if(comment.current) {
            comment.current.style.height = 'auto';
            comment.current.style.height = comment.current.scrollHeight + 'px';
        }
    })

    const createComment = () => {
        setCreatingComment(true);
    }

    const resizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    return (
        <>
            <div className={styles.createComment}>
                <svg className={styles.createCommentIcon} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M21.546,0H2.454A2.457,2.457,0,0,0,0,2.454V20H6.938l4.049,3.387A1.591,1.591,0,0,0,12,23.744a1.629,1.629,0,0,0,1.032-.369L17.062,20H24V2.454A2.457,2.457,0,0,0,21.546,0ZM21,17H15.972L12,20.322,8.028,17H3V3H21Z"/><rect x="6" y="6" width="6" height="3"/><rect x="6" y="11" width="12" height="3"/></svg>
                <span className={styles.createCommentText} onClick={() => createComment()}>Comment</span>
            </div>
            {
                creatingComment ? <div className={styles.createCommentForm}>
                    <span className={styles.createCommentError} ref={errorMessage}></span>
                    <textarea className={styles.createCommentComment} ref={comment} placeholder="Comment here..." onChange={resizeTextArea}></textarea>
                    <div className={styles.createCommentButtons}>
                        <button className={styles.createCommentButton} onClick={() => post()}>Submit</button>
                    </div>
                </div> : null
            }
        </>
    );
}

export default CommentCreator;