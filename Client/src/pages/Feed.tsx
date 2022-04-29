import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { useEffectOnce } from '../App.tsx';

import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';

// @ts-ignore
import styles from './Feed.module.css';
import { useRef, useState } from 'react';

function Feed(props) {
    const navigate = useNavigate();

    const code1 = useRef(null);

    useEffectOnce(() => {
        props.authentication(navigate, 0);
        let highlighting = hljs.highlightAuto(code1.current.innerHTML).value;

        // put line number in front of each line
        // highlighting = highlighting.split('\n').map((line, index) => `<span className=${styles.lineNumber}>${index + 1} | </span>` + line).join('\n');

        code1.current.innerHTML = highlighting;
    });

    return (
        <main>
            <nav className={styles.menuBar}>
                <div className={styles.logo}>Stack Underflow until we get a real name</div>
                {/* <div className={styles.search}>
                    <input className={styles.searchInput} type="text" placeholder="Search" />
                    <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" width="512" height="512"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/></g></svg>
                </div> */}
                <div className={styles.menuButtons}>
                    <svg className={styles.menuButton} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/></svg>
                </div>
            </nav>
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
                                    <div className={styles.optionsPaneSelectorSubItem}>
                                        <svg className={styles.optionsPaneSelectorSubIcon} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M21,24H18V19a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2v5H3V19a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,3Z"/></svg>
                                        James
                                    </div>
                                    <div className={styles.optionsPaneSelectorSubItem}>
                                        <svg className={styles.optionsPaneSelectorSubIcon} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M21,24H18V19a2,2,0,0,0-2-2H8a2,2,0,0,0-2,2v5H3V19a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,3Z"/></svg>
                                        Martha
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentGridCenter}>
                    <CreatePost />
                    <div className={styles.posts}>
                        <div className={styles.post}>
                            <span className={styles.postHeader}>Title</span>
                            <div className={styles.postAuthor}>
                                <span className={styles.postAuthorName}>Author</span>
                                <div className={styles.postAuthorProfile}></div>
                            </div>
                            <span className={styles.postBody}>
                                <div className={styles.postBodyText}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit vel at nostrum sapiente, maxime necessitatibus assumenda eius magnam in vero nesciunt debitis sequi, aliquid alias earum repellat, quas rem quisquam.
                                </div>
                                <pre className={styles.postBodyCode}>
                                    <code ref={code1}>
                                        {`function demoCode(argument) {
    return argument + 20;
}

// This is a very long line of code that is used to demonstrate the code block's functionality. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit vel at nostrum sapiente, maxime necessitatibus assumenda eius magnam in vero nesciunt debitis sequi, aliquid alias earum repellat, quas rem quisquam.

demoCode(10);`}
                                    </code>
                                </pre>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.contentGridRight}>
                    <div className={styles.contentSection}>
                        <span className={styles.contentSectionTitle}>Followed languages:</span>
                        <div className={styles.followedLanguages}>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Javascript</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Python</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>C#</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Typescript</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Ruby</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>C</span>
                                <div className={styles.followedLanguageRemove}>X</div>
                            </div>
                        </div>
                        <br />
                        <span className={styles.contentSectionTitle}>Recommended languages:</span>
                        <div className={styles.followedLanguages}>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Go</span>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Rust</span>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Java</span>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>Kotlin</span>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>C++</span>
                            </div>
                            <div className={styles.followedLanguage}>
                                <span className={styles.followedLanguageName}>C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Feed;

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
        
        let height = e.target.scrollHeight + 32;

        e.target.style.height = height + 'px';

        e.target.previousSibling.style.height = 'auto';
        e.target.previousSibling.style.height = height + 'px';
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

    const post = () => {
        let postData = {
            title: title.current.value,
            sections: showCreatePost
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