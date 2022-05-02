import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';

import { useRef, useState } from 'react';

// @ts-ignore
import styles from '../pages/Feed.module.css';

const APIlink = "http://localhost:25564/api/v1/";

function CreatePost() {
    let [showCreatePost, setShowCreatePost] = useState(null);

    const title = useRef(null);
    const errorMessage = useRef(null);

    const defaultPostSections = [{type: "Text", content: ""}];

    const getPostSections = () => {
        return showCreatePost.map((section, index) => {
            return (
                <div className={styles.createPostSection} key={index}>
                    <div className={styles.createPostSectionDelete} onClick={() => deleteSection(index)}>X</div>
                    {getSectionContent(section, index)}
                </div>
            );
        });
    }

    const changeText = async (e) => {
        const element = e.target;
        const previous = e.target.previousSibling;
        previous.innerHTML = hljs.highlightAuto(element.value).value;
    }

    const updateContent = async (value, index) => {
        const newPostSections = [...showCreatePost];
        newPostSections[index].content = value;

        showCreatePost = newPostSections;
    }

    const getSectionContent = (section, index) => {
        switch (section.type) {
            case "Text":
                return <textarea className={styles.createPostTextarea} onChange={(e) => {
                    resizeTextArea(e);
                    updateContent(e.target.value, index);
                }} placeholder="Text content here..." defaultValue={section.content}></textarea>;
            case "Code":
                return <pre className={styles.postBodyCode}>
                    {/* Not sure, but this might allow for XSS. From my testing, it does not. */}
                    <code className={styles.codeHighlight} dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(section.content).value }}></code>
                    {/* TODO: Change this to a better editor. It has a few problems. */}
                    <textarea className={styles.codeEditor} onChange={async (e) => {
                        resizeCodeArea(e);
                        changeText(e);
                        updateContent(e.target.value, index);
                    }} spellCheck="false" placeholder="Code content here..." defaultValue={section.content}></textarea>
                </pre>
        }
    }

    const createPost = () => {
        setShowCreatePost(defaultPostSections);
    }

    const resizeCodeArea = async (e) => {
        e.target.style.height = 'auto';
        
        let height = e.target.scrollHeight;

        e.target.style.height = height + 'px';
        e.target.parentElement.style.height = height - 32 + 'px';
    }

    const resizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    const addSection = (type) => {
        setShowCreatePost([...showCreatePost, {type: type, content: ""}]);
    }

    const deleteSection = (index) => {
        setShowCreatePost(showCreatePost.filter((_, i) => i !== index));
    }

    const post = async () => {
        let postData = {
            title: title.current.value,
            sections: showCreatePost
        }

        // Regex for allowed characters
        let allowedCharactersRegex = new RegExp(/[^ -~]+/);

        // Find the first character that doesn't match the regex
        let oldTitle = postData.title;
        postData.title = postData.title.replace(allowedCharactersRegex, "");
        if (postData.title !== oldTitle) {
            error("Title contains invalid character: " + oldTitle.match(allowedCharactersRegex));
            return;
        }

        // Check if the post has a title
        if (postData.title.replace(/\s/g, '') === "") {
            error("Post must have a title");
            return;
        }

        // Check if the post has at least one section
        if (postData.sections.length === 0) {
            error("Post must have at least one section");
            return;
        }

        // Check if all sections have content
        for (let section of postData.sections) {
            if (section.content.replace(/\s/g, '') === "") {
                error("All sections must have content");
                return;
            }
        }

        error("");

        // Send the post to the server
        let data = postData;

        const response = await fetch(APIlink + "createPost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();

        console.log(json);

        if(json.success) {
            closePostMenu();
        }
    }

    const closePostMenu = () => {
        setShowCreatePost(null);
    }

    const error = (message: string) => {
        errorMessage.current.innerHTML = message;
    }

    return (
        <>
            <div className={styles.createPost} onClick={() => createPost()}>Create post</div>
            {
                showCreatePost ? (
                    <div className={styles.createPostForm}>
                        <span className={styles.createPostError} ref={errorMessage}></span>
                        <input className={styles.createPostTitle} ref={title} placeholder="Title" />
                        <div className={styles.postAuthor}>
                            <span className={styles.postAuthorName}>Author</span>
                            <div className={styles.postAuthorProfile}></div>
                        </div>
                        <div className={styles.createPostBody}>
                            {getPostSections()}
                        </div>
                        <div className={styles.createPostBottom}>
                            <div className={styles.createPostSectionAdds}>
                                <div className={styles.createPostSectionAdd} onClick={() => addSection("Text")}>
                                    <span className={styles.createPostSectionAddPlus}>+</span>
                                    <span className={styles.createPostSectionAddText}>Abc...</span>
                                </div>
                                <div className={styles.createPostSectionAdd} onClick={() => addSection("Code")}>
                                    <span className={styles.createPostSectionAddPlus}>+</span>
                                    <span className={styles.createPostSectionAddText}>Code()</span>
                                </div>
                            </div>
                            <div className={styles.createPostSubmit} onClick={() => post()}>Submit</div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default CreatePost;