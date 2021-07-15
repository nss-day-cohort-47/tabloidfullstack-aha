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