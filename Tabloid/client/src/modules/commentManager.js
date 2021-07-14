import { getToken } from "./authManager";

const baseUrl = "/api/comment";

export const getAllCommentsByPost = (postId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An unknown error occurred while trying to get comments.");
            }
        });
    });
};