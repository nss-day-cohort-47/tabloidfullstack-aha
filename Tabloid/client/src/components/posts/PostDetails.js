import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { PostContext } from "../../modules/PostManager.js";
import { UserProfileContext } from '../../modules/postUserProfileManager.js';
import { getSubscriptionStatus, deleteSubscription, addSubscription } from '../../modules/subscriptManager.js';


export const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { getPostById, deletePost } = useContext(PostContext);
    const history = useHistory();
    const { currentUserId } = useContext(UserProfileContext);
    const [isSubscribed, setIsSubscribed] = useState(false)

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

    const getSubscription = (postobject) => {
        if (postobject?.userProfileId) {
            getSubscriptionStatus(post.userProfileId)
                .then(sub => {
                    setIsSubscribed(sub)
                })
        }
    }
    console.log(post?.userProfileId)

    const handleSubscribe = () => {

        addSubscription(post.userProfileId).then(() => setIsSubscribed(true))
    }
    const handleUnSubscribe = () => {
        console.log(post.userProfileId)
        deleteSubscription(post.userProfileId).then(() => setIsSubscribed(false))
    }


    useEffect(() => {
        getSubscription(post)
    }, [isSubscribed])

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
                            {post.userProfile?.displayName}
                        </p>
                        <p>
                            <strong>Publication Date:</strong> {handleDate()}
                        </p>

                        <p>

                            <strong>Category:</strong> {post.category?.name}

                        </p>
                        <>
                            <button
                                className="fas fa-trash-alt fa-2x"
                                onClick={handleDelete}
                                style={{ cursor: 'pointer' }}
                            >Delete</button>
                            <button
                                className="far fa-edit fa-2x"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    history.push(`/edit/${post.id}`);
                                }}
                            >Edit</button>
                        </>
                    </div>


                    <p>{post.content}</p>
                    <Link to={`/comment/${post.id}`}>
                        <button>View Comments</button>
                    </Link>
                    {/* tags go here */}
                    <button onClick={() => history.push(`/posts/tag/${post.id}`)} >Manage Tags</button>
                    {isSubscribed ? <button onClick={handleUnSubscribe} >UnSubscribe</button> :
                        <button onClick={handleSubscribe} >Subscribe</button>
                    }
                </div>
            </div>
        </div>
    );
};
/*{currentUserId === post.userProfileId ? (
                            <i
                                className="fas fa-trash-alt fa-2x"
                                onClick={handleDelete}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        ) : null} */