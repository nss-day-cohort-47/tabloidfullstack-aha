import React, { useState, useContext } from 'react';
import { UserProfileContext } from './postUserProfileManager';
import { getToken } from './authManager'

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
    const addPost = (post) => {
        return getToken().then((token) =>
            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
        );
    };

    const updatePost = (post) => {
        return getToken().then((token) =>
            fetch(`/api/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            })
        );
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

    const getPostByIdWithComments = (id) => {
        return getToken()
            .then((token) =>
                fetch(`/api/posts/comment/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
            .then((res) => res.json());
    };
    return (
        <PostContext.Provider
            value={{ posts, getAllPosts, getPostById, getPostsByUserProfileId, getPostByIdWithComments, deletePost, addPost, updatePost }}
        >
            {props.children}
        </PostContext.Provider>
    );
};
const baseUrl = '/api/posts';
export const getAllUserPosts = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetAllUserPosts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong on the way didn't it?");
            };
        })
    })
};

