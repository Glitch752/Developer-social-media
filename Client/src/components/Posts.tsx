import { useState } from 'react';
// @ts-ignore
import { useEffectOnce } from '../App.tsx';

// @ts-ignore
import Post from './Post.tsx';

const APIlink = "http://localhost:25564/api/v1/";

function Posts(props) {
    const [posts, setPosts] = useState([]);

    useEffectOnce(() => {
        getPostData();
    });

    const getPostData = async () => {
        const data = await fetch(APIlink + (props.differentApiLink ? props.differentApiLink : "getFeedPosts"), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await data.json();

        setPosts(json.data.posts);
    };

    return (
        <>
            {
                posts ? posts.map((post, index) => {
                    return <Post color={props.color ? true : false} data={post} key={index} />
                }) : null
            }
        </>
    )
}

export default Posts;