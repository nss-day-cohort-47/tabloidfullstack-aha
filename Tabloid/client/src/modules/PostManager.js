import React, { useState, useContext } from 'react';
import { UserProfileContext } from './postUserProfileManager';

export const PostContext = React.createContext();

export const PostManager = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        return getToken()
            .then((token) =>
                fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json())
            .then(setPosts);
    };

    const getPostById = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/posts/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };

    const getPostsByUserProfileId = (id) => {
        return getToken().then((token) =>
            fetch(`/api/posts/userprofileid/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setPosts)
        );
    };
    const deletePost = (id) => {
        return getToken().then((token) =>
            fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        );
    };
    return (
        <PostContext.Provider
            value={{ posts, getAllPosts, getPostById, getPostsByUserProfileId, deletePost }}
        >
            {props.children}
        </PostContext.Provider>
    );
};