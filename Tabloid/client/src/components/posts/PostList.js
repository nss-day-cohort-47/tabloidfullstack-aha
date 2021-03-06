import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../modules/PostManager.js';
import Post from './PostListCard';
import { Link } from 'react-router-dom';


const PostList = () => {
    const { posts, getAllPosts, getPostsByUserProfileId } = useContext(
        PostContext
    );
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            getAllPosts();
        } else {
            getPostsByUserProfileId(id);
        }
    }, [id]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <Link to="/create">
                        <button>New Post</button>
                    </Link>
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostList;