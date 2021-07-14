import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from "../../modules/PostManager.js";
import { UserProfileContext } from '../../modules/UserProfileManager.js';



export const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { getPostById, deletePost } = useContext(PostContext);
    const history = useHistory();
    const { currentUserId } = useContext(UserProfileContext);
    console.log(PostContext);

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    const handleDelete = () => {
        if (window.confirm('Are you sure?')) {
            deletePost(post.id).then(() => {
                history.push(`/posts/myposts/${currentUserId}`);
            });
        }
    };

    const handleDate = () => {
        let date = new Date(post.publishDateTime).toLocaleDateString('en-US');
        return date;
    };


    if (!post) {
        return null;
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <img src={post.imageLocation} />
                    <h1>{post.title}</h1>
                    <div
                        className="post-byline"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <p>
                            <strong>Author:</strong>{' '}
                            {post.userProfile.displayName}
                        </p>
                        <p>
                            <strong>Publication Date:</strong> {handleDate()}
                        </p>
                        <p>
                            <p>
                                <strong>Category:</strong> {post.category.name}
                            </p>
                        </p>
                        {currentUserId === post.userProfileId ? (
                            <i
                                className="fas fa-trash-alt fa-2x"
                                onClick={handleDelete}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        ) : null}
                    </div>    
                    

                    <p>{post.content}</p>
                    {/* tags go here */}
                </div>
            </div>
        </div>
    );
};