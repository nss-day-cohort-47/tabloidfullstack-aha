import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/comment";

export const getAllCommentsByPost = (postId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json());
    });
};

export const addComment = (comment) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to add a new comment.");
            }
        });
    });
};

export const deleteComment = (commentId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    });
};